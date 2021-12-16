# 实验性功能：简化版本的使用 JavaScript 调用 Java 方法

## 背景

在以往通过反射机制从 [`JavaScript` 调用 `OC`/`JAVA`](./java-reflection.md) 的方法中，我们不仅需要严格声明包名，和函数签名，还需要严格校对参数数量保证能够正常运行，步骤较多调试困难。为此我们提供了另外一种实验性方法，来简化脚本层到原生层的调用。这是一种通道，或者说是一个桥梁，在引入其他脚本系统前，我们将其命名为 `JsbBridge` 。意为通过 `Jsb` 绑定来沟通脚本和原生APP的桥梁。

## JS 接口介绍

在脚本层的接口只有两个，分别是 `sendToNative` 和 `onNative` ，分别传输和接收原生层参数。需要注意的有几点:

- 由于现在这个功能还在实验阶段，所以只支持string的传输，如果需要传输包含多种参数的对象，请考虑将其转化为Json形式进行传输并在不同层级解析。
- `onNative` 同一时间只会记录一个函数，当再次set该属性的时候会覆盖原先的 `onNative` 方法。
- `sendToScript` 方法是单向通信，其不会关心下层的返回情况，也不会告知 `JavaScript` 操作成功或者失败。开发者需要自行处理操作情况。

```js
//JavaScript
export namespace bridge{
    /**
     * send to native with at least one argument.
     */
    export function sendToNative(arg0: string, arg1?: string): void;
    /**
     * save your own callback controller with a js function,
     * use jsb.bridge.onNative = (arg0: String, arg1: String | null)=>{...}
     * @param args : received from native
     */
    export function onNative(arg0: string, arg1?: string | null): void;
}
```

### Objective-C 接口介绍

对应的 `ObjC` 接口同样以两个为主，`onScript` 命名对应 `onNative`，来表示收到脚本信息后的响应行为。通过创建为 `ICallback` 来封装，并且使用 `setCallback` 来启用该接口函数。`sendToScript` 对应 `sendToNative`，表示需要传输到 `JavaScript` 的参数。

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

### 触发 Objective-C 的回调

假设我们的广告接口设置在原生层，那么当玩家点击打开广告的按钮时，理应触发 `ObjC` 打开广告的操作。

我们会将打开广告的接口写成以下脚本

```ObjC
static ICallback cb = ^void (NSString* _arg0, MSString* _arg1){
    //open Ad
}
```

这时候我们需要先将打开广告的事件注册起来。

```ObjC
JsbBridge* m = [JsbBridge sharedInstance];
[m setCallback:cb];
```

并且在js层脚本中对按钮的点击事件进行打开操作

```ts
public static onclick(){
    //usrName and defaultAdUrl are both string
    jsb.bridge.sendToNative(usrName, defaultAdUrl);
} 
```

这样就可以通过 `Jsb.Bridge` 这个通道将需要的信息发送到 `ObjC` 层进行操作了

### 触发Js的回调

假设我们的动画播放操作记录在Js层，并且希望在 Java 层播放这个动画，我们也可以将它注册起来。我们首先定义该函数。

```ts
public void playAnimation(animationName: string, isLoop: boolean){
    //Code to play Animation
}
```

然后在 `onNative` 中记录该方法

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

`Objc` 代码示范：

```Objc
JsbBridge* m = [JsbBridge sharedInstance];
[m sendToScript:@"Animation1" arg1:@"true"];
```

就可以调用到JS的播放操作了。

## 示例工程：简单的多事件调用

开发者可以通过 [3.4/native-script-bridge](https://github.com/cocos-creator/example-3d/tree/v3.4/native-script-bridge) 示例工程来学习应用。
