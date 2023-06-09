# 使用 JsbBridge 实现 JavaScript 与 Objective-C 通信

## 背景

[基于反射机制实现 JavaScript 与 iOS/macOS 系统原生通信](./oc-reflection.md) 的方法中，我们不仅需要严格声明包名和函数签名，还需要严格校对参数数量以确保正常运行，步骤较为复杂。

因此我们额外提供了另外一种方法，用于简化脚本层到原生层的调用。这是一种通道，或者说是一个桥梁，我们将其命名为 `JsbBridge`，意为通过 `JSB` 绑定作为沟通脚本和原生 APP 的桥梁。

> **注意**：两种方式都是可以正常使用的，开发者可以根据实际需要选择使用。

## 调用机制

### JavaScript 接口介绍

在脚本层只有 `sendToNative` 和 `onNative` 两个接口，定义如下：

```js
// JavaScript
export namespace bridge{
    /**
     * Send to native with at least one argument.
     */
    export function sendToNative(arg0: string, arg1?: string): void;
    /**
     * Save your own callback controller with a JavaScript function,
     * Use 'jsb.bridge.onNative = (arg0: String, arg1: String | null)=>{...}'
     * @param args : received from native
     */
    export function onNative(arg0: string, arg1?: string | null): void;
}
```

见名知义，`sendToNative` 用于调用原生层的代码，而 `onNative` 用于响应原生层的调用。

使用时需要注意以下几点：

- 由于现在这个功能还在实验阶段，所以只支持 `string` 的传输，如果需要传输包含多种参数的对象，请考虑将其转化为 `Json` 形式进行传输，并在不同层级解析。
- `onNative` 同一时间只会记录一个函数，当再次 `set` 该属性时会覆盖原先的 `onNative` 方法。
- `sendToScript` 方法是单向通信，不会关心下层的返回情况，也不会告知 `JavaScript` 操作成功或者失败。开发者需要自行处理操作情况。

### Objective-C 接口介绍

在 `Objective-C` 中，也有两对应的接口， `sendToScript` 和 `callByScript`，定义如下：

```objc
//Objective-c
typedef void (^ICallback)(NSString*, NSString*);

@interface JsbBridge : NSObject

+(instancetype)sharedInstance;
-(bool)setCallback:(ICallback)cb;
-(bool)callByScript:(NSString*)arg0 arg1:(NSString*)arg1;
-(void)sendToScript:(NSString*)arg0 arg1:(NSString*)arg1;
-(void)sendToScript:(NSString*)arg0;

@end
```

其中 `sendToScript` 用于调用脚本层代码，而 `callByScript` 用于响应脚本层的调用。

我们需要实现 `ICallback` 接口，并且使用 `setCallback` 注册，来响应 `callByScript` 的具体行为。

## 基本使用

### JavaScript 触发 Objective-C 的回调

假设我们用 Objective-C 写了一个打开广告的接口，当玩家点击打开广告的按钮时，应该由 JavaScript 调用对应的 Objective-C 接口，触发打开广告的操作。

我们需要先实现一个 ICallback 接口，用于响应操作，然后通过 `setCallback` 方法，注册到 `JsbBridge`。

Objective-C 代码如下：

```ObjC
#include "platform/apple/JsbBridge.h"

static ICallback cb = ^void (NSString* _arg0, MSString* _arg1){
    if([_arg0 isEqual:@"open_ad"]){
        //open Ad
    }
};

JsbBridge* m = [JsbBridge sharedInstance];
[m setCallback:cb];
```

在 JavaScript 脚本中，我们就可以像下面一样调用：

```ts
import { native } from 'cc'
public static onclick(){
    native.bridge.sendToNative('open_ad', defaultAdUrl);
} 
```

### Objective-C 触发 JavaScript 的回调

假设我们的广告播放完成后，需要通知 JavaScript 层，可以像下面这样操作。

首先，需要在 JavaScript 使用 `onNative` 响应事件：

```ts
native.bridge.onNative = (arg0:string, arg1: string):void=>{
    if(arg0 == 'ad_close'){
        if(arg1 == "finished") {
            //ad playback completed.
        }
        else{
            //ad cancel.
        }
    }
    return;
}
```

然后，在 `Objective-C` 中，用如下代码调用：

```ObjC
#include "platform/apple/JsbBridge.h"

JsbBridge* m = [JsbBridge sharedInstance];
[m sendToScript:@"ad_close" arg1:@"finished"];
```

通过上述操作，便可以通知 JavaScript 广告的播放结果了。

## 最佳实践

JsbBridge 提供了 arg0 和 arg1 两个 string 类型的参数用于传递信息，可以根据不同的需求进行分配。

### 1. arg0 和 arg1 均用于参数

如果通信需求比较简单，不需要进行分类处理，则可以将 arg0 和 arg1 用作参数传递。

### 2. arg0 用于分类标记, arg1 用于参数

如果通信需求相对复杂，可以使用 arg0 作为分类标记，根据 arg0 来分类处理， arg1  用于参数传递

### 3. arg0 用于分类标记，arg1 作为 JSON 字符串

对于特别复杂的需求， 单纯的 string 类型参数无法满足，此时可以将需要传递的对象通过 `JSON.stringfy` 转化为字符串，再通过 arg1 进行传递。 使用时，再利用 `JSON.parse` 还原为对象，做后续的处理。

> 由于涉及到 JSON 的序列化和反序列化操作，这种使用方式不建议高频调用。

## 线程安全

注意，如果相关代码涉及到原生 UI 的部分，就需要考虑线程安全问题，详情请参考：[线程安全](./thread-safety.md)。

## 示例工程：简单的多事件调用

Cocos Creator 提供了 **native-script-bridge**（[GitHub](https://github.com/cocos-creator/example-3d/tree/v3.7/native-script-bridge) | [Gitee](https://gitee.com/mirrors_cocos-creator/example-3d/tree/v3.7/native-script-bridge)）范例，开发者可根据需要自行下载以参考使用。
