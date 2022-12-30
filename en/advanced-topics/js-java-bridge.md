# A Simpler Way to Call Java Methods with JavaScript (Experimental)

## Background

Prior to v3.4.0, the reflection mechanism in [Using JavaScript to Call Java](./java-reflection.md) static methods, not only needed to strictly declare package names and function signatures, but also needed to strictly check the number of parameters to ensure proper operation, which was a complicated step.

Additionally provided in v3.4.0 is another experimental method for simplifying calls from the scripting layer to the native layer. This is a kind of channel, or a bridge, named `JsbBridge` before introducing other scripting systems, meaning that it serves as a bridge to communicate between script and native APP via the `JSB` binding.

> **Note**: both ways are working fine, developers can choose to use them according to their actual needs. To use the previous way, please review the [Using JavaScript to Call Java](./java-reflection.md) documentation.

## JavaScript Interface Introduction

The only two interfaces at the scripting level are `sendToNative` and `onNative`, which are **transfer** and **receive native layer** parameters, respectively. The following points need to be noted when using them:

- This feature is still in the experimental stage, only `string` transfers are supported. To transfer objects containing multiple parameters, please consider converting them to the `JSON` format for transfer and parsing them at different levels.
- `onNative` will only record one function at a time, and will override the original `onNative` method when the property is `set` again.
- The `sendToScript` method is a one-way communication and does not care about the return of the lower level, nor does it tell `JavaScript` whether the operation succeeded or failed. The developer needs to handle the operation itself.

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

## Java Interface Introduction

The corresponding `JAVA` interfaces are also dominated by two, including `sendToScript` and `onScript`:

- `sendToScript` corresponds to `sendToNative` and represents the parameters to be transferred to `JavaScript`.
- `onScript` corresponds to `onNative`, which indicates the response behavior after receiving a script message. Wrap the behavior by creating an interface called `ICallback` and use `setCallback` to enable the interface function.

```JAVA
// JAVA
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
    /* Add a callback which you would like to apply
     * @param f ICallback, the method which will be actually applied. multiple calls will override
     * multiple calls will override */
    public static void setCallback(ICallback f);
    /*
     * Java dispatch Js event, use native c++ code
     * @param arg0 input values
     */
    public static void sendToScript(String arg0, String arg1);
    public static void sendToScript(String arg0);
}
```

## Basic Usage

### Using JavaScript to Trigger Java Methods

Assuming the ad interface is set in the native layer, then when the player clicks the button to open the ad, it is logical to trigger `JAVA` to open the ad.

The code example of the interface to open the ad is as follows:

```JAVA
public void openAd(String adUrl){
    // Code to open ad
}
```

Register the event that opens the ad first:

```JAVA
JsbBridge.setCallback(new JsbBridge.ICallback() {
        @Override
        public void onScript(String usrName, String url) {
            // Check usr
            // Open Ad
            openAd(url);
        }
    });
    
```

Perform the open action on the button's click event in `JavaScript`:

```ts
public static onclick(){
    // 'usrName' and 'defaultAdUrl' are both string
    jsb.bridge.sendToNative(usrName, defaultAdUrl);
} 
```

This will send the required information to the `Java` layer through the `Jsb.Bridge` channel.

### Using JAVA to Trigger JavaScript Methods

Assuming that the animation playback operation is recorded in JavaScript. To play this animation in the Java layer, register an event to play the animation.

First, define a function to play the animation:

```ts
public void playAnimation(animationName: string, isLoop: boolean){
    // Code to play Animation
}
```

Second, document the method in `onNative`:

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

Still using the Android project as an example, the `Java` code example is as follows:

```JAVA
JsbBridge.sendToScript("SkeletonAnim001", "true");
```

This will call the `JavaScript` playback operation.

## Sample project: simple multi-event calls

Creator provides the [native-script-bridge](https://github.com/cocos/cocos-example-projects/tree/v3.4/native-script-bridge) example, which developers can download for reference use as needed.
