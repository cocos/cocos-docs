# 简介

由于之前的jsJavaBridge的调用方式比较复杂，不太好复用，故提供一种更简便的使用方法。以下是说明文档和示例。

## 接口介绍

在脚本层的接口只有两个，分别是sendToNative和onNative，分别传输和接收原生层参数。需要注意的有几点:

- 由于现在这个功能还在实验阶段，所以只支持string的传输，如果需要传输包含多种参数的对象，请考虑将其转化为Json形式进行传输并在不同层级解析。
- onNative同一时间只会记录一个函数，当再次set该属性的时候会覆盖原先的onNative方法。
- sendToScript 方法是单向通信，其不会关心下层的返回情况，也不会告知js代码操作成功或者失败。
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
对应的暴露给原生层的同样为两个接口。功能对称。
```JAVA
//JAVA
public class JsbBridge {
    public interface ICallback{
        /**
         * Applies this callback to the given argument.
         *
         * @param arg0 as input
         * @param arg1 as input
         */
        void onScript(String arg0, String arg1);
    }
    /**Add a callback which you would like to apply
     * @param f ICallback, the method which will be actually applied. multiple calls will override
     * */
    public static void setCallback(ICallback f);
    /**
     * Java dispatch Js event, use native c++ code
     * @param arg0 input values
     */
    public static void sendToScript(String arg0, String arg1);
    public static void sendToScript(String arg0);
}
```
```objc
//Objective-c
typedef void (^ICallback)(NSString*, NSString*);
//typedef int64_t strFunc;

@interface JsbBridge : NSObject
+(instancetype)sharedInstance;
-(bool)setCallback:(ICallback)cb;
-(bool)callByScript:(NSString*)arg0 arg1:(NSString*)arg1;
-(void)sendToScript:(NSString*)arg0 arg1:(NSString*)arg1;
-(void)sendToScript:(NSString*)arg0;
@end

```
## 基本使用

### 触发Java的回调
假设我们的广告接口设置在原生层比如 Java-Android 广告，那么当玩家点击打开广告的按钮时，理应触发 Java 打开广告的操作。

我们会将打开广告的接口写成以下脚本

```JAVA
public void openAd(String adUrl){
    //Code to open ad
}
```
这时候我们需要先将打开广告的事件注册起来。
```JAVA
JsbBridge.setCallback(new JsbBridge.ICallback() {
        @Override
        public void onScript(String usrName, String url) {
            //Check usr
            //Open Ad
            openAd(url);
        }
    });
```
并且在js层脚本中对按钮的点击事件进行打开操作
```ts
public static onclick(){
    //usrName and defaultAdUrl are both string
    jsb.bridge.sendToNative(usrName, defaultAdUrl);
} 
```
这样就可以通过 Jsb.Bridge 这个通道将需要的信息发送到 Java 层进行操作了
### 触发Js的回调

假设我们的动画播放操作记录在Js层，并且希望在 Java 层播放这个动画，我们也可以将它注册起来。我们首先定义该函数。
```ts
public void playAnimation(animationName: string, isLoop: boolean){
    //Code to play Animation
}
```
然后在onNative中记录该方法
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
仍然以安卓项目为例，Java 代码示范：
```JAVA
JsbBridge.sendToScript("SkeletonAnim001", "true");
```
就可以调用到JS的播放操作了。

## 示例工程：简单的多事件调用

开发者可以通过 [3.4/native-script-bridge](https://github.com/cocos-creator/example-3d/tree/v3.4/native-script-bridge) 示例工程来学习应用。