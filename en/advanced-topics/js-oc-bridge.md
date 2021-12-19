# 简化使用 JavaScript 调用 Objective-C 方法（实验性功能）

## 背景

在 v3.4.0 之前，通过原生语言的反射机制在 [JavaScript 调用 Objective-C](./oc-reflection.md) 的方法中，我们不仅需要严格声明包名和函数签名，还需要严格校对参数数量以确保正常运行，步骤较为复杂。

因此在 v3.4.0 中我们额外提供了另外一种实验性方法，用于简化脚本层到原生层的调用。这是一种通道，或者说是一个桥梁，在引入其他脚本系统前，我们将其命名为 `JsbBridge`，意为通过 `JSB` 绑定作为沟通脚本和原生 APP 的桥梁。

> **注意**：这两种方式都是可以正常使用的，开发者可以根据实际需要选择使用。[JavaScript 调用 Objective-C](./oc-reflection.md)

## JavaScript 接口介绍

在脚本层的接口只有 `sendToNative` 和 `onNative` 两个，分别是 **传输** 和 **接收原生层** 参数。使用时需要注意以下几点：

- 由于现在这个功能还在实验阶段，所以只支持 `string` 的传输，如果需要传输包含多种参数的对象，请考虑将其转化为 `Json` 形式进行传输，并在不同层级解析。
- `onNative` 同一时间只会记录一个函数，当再次 `set` 该属性时会覆盖原先的 `onNative` 方法。
- `sendToScript` 方法是单向通信，不会关心下层的返回情况，也不会告知 `JavaScript` 操作成功或者失败。开发者需要自行处理操作情况。

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

### Objective-C 接口介绍

对应的 `ObjC` 接口同样以两个为主，包括 `sendToScript` 和 `onScript`：

- `sendToScript` 对应 `sendToNative`，表示需要传输到 `JavaScript` 的参数。
- `onScript` 对应 `onNative`，表示收到脚本信息后的响应行为。通过创建名为 `ICallback` 的接口来封装行为，并且使用 `setCallback` 来启用该接口函数。

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

## 基本使用

### JavaScript 触发 Objective-C 的回调

假设我们的广告接口设置在原生层，那么当玩家点击打开广告的按钮时，理应触发 `ObjC` 打开广告的操作。

打开广告的接口的代码示例如下：

```ObjC
static ICallback cb = ^void (NSString* _arg0, MSString* _arg1){
    //open Ad
}
```

这时候需要先注册打开广告的事件：

```ObjC
JsbBridge* m = [JsbBridge sharedInstance];
[m setCallback:cb];
```

并且在 JavaScript 层脚本中对按钮的点击事件执行打开操作：

```ts
public static onclick(){
    // 'usrName' and 'defaultAdUrl' are both string
    jsb.bridge.sendToNative(usrName, defaultAdUrl);
} 
```

这样就可以通过 `Jsb.Bridge` 这个通道将需要的信息发送到 `ObjC` 层进行操作了。

### Objective-C 触发 JavaScript 的回调

假设我们的动画播放操作记录在 JavaScript 层，并且希望在 Objective-C 层播放这个动画，也可以注册一个播放动画的事件。

首先需要定义一个播放动画的函数：

```ts
public void playAnimation(animationName: string, isLoop: boolean){
    // Code to play Animation
}
```

然后在 `onNative` 中记录该方法：

```ts
jsb.bridge.onNative = (animationName: string, isLoop: String | null):void=>{
    if(isLoop && isLoop == "true") {
        this.playAnimation(animationName, true);
        return;
    }
    this.playAnimation(animationName, false);
    return;
}
```

`ObjC` 代码示例如下：

```ObjC
JsbBridge* m = [JsbBridge sharedInstance];
[m sendToScript:@"Animation1" arg1:@"true"];
```

通过上述操作，便可以调用到 JavaScript 的播放操作了。

## 示例工程：简单的多事件调用

Creator 提供了 **native-script-bridge**（[GitHub](https://github.com/cocos-creator/example-3d/tree/v3.4/native-script-bridge) | [Gitee](https://gitee.com/mirrors_cocos-creator/example-3d/tree/v3.4/native-script-bridge)）范例，开发者可根据需要自行下载以参考使用。
