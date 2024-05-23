# A Simpler Way to Call Objective-C Methods with JavaScript (Experimental)

## Background

Prior to v3.4.0, the reflection mechanism in [Using JavaScript to Call Objective-C](./oc-reflection.md) static methods, not only needed to strictly declare package names and function signatures, but also needed to strictly check the number of parameters to ensure proper operation, which was a complicated step.

Additionally provided in v3.4.0 is another experimental method for simplifying calls from the scripting layer to the native layer. This is a kind of channel, or a bridge, named `JsbBridge` before introducing other scripting systems, meaning that it serves as a bridge to communicate between script and native APP via the `JSB` binding.

> **Note**: both ways are working fine, developers can choose to use them according to their actual needs. To use the previous way, please review the  [Using JavaScript to Call Objective-C](./oc-reflection.md) documentation.

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

## Objective-C Interface Introduction

The corresponding `ObjC` interfaces are also dominated by two, including `sendToScript` and `onScript`:

- `sendToScript` corresponds to `sendToNative` and represents the parameters to be transferred to `JavaScript`.
- `onScript` corresponds to `onNative`, which indicates the response behavior after receiving a script message. Wrap the behavior by creating an interface called `ICallback` and use `setCallback` to enable the interface function.

```ObjC
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

## Basic Usage

### Using JavaScript to Trigger Objective-C Callbacks

Assuming the ad interface is set in the native layer, then when the player clicks the button to open the ad, it is logical to trigger `ObjC` to open the ad.

The code example of the interface to open the ad is as follows:

```ObjC
static ICallback cb = ^void (NSString* _arg0, MSString* _arg1){
    //open Ad
}
```

At this point, register the event that opens the ad first:

```ObjC
JsbBridge* m = [JsbBridge sharedInstance];
[m setCallback:cb];
```

Perform the open action on the button's click event in the `JavaScript` layer script:

```ts
public static onclick(){
    // 'usrName' and 'defaultAdUrl' are both string
    jsb.bridge.sendToNative(usrName, defaultAdUrl);
} 
```

This will send the required information to the `ObjC` layer through the `Jsb.Bridge` channel to perform the action of opening the ad.

### Using Objective-C to trigger JavaScript Callbacks

Assume that the animation playback operation is recorded in JavaScript. To play this animation in the Objective-C layer, register an event to play the animation.

First, define a function to play the animation:

```ts
public void playAnimation(animationName: string, isLoop: boolean){
    // Code to play Animation
}
```

Next, document the method in `onNative`:

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

The `ObjC` code example is as follows:

```ObjC
JsbBridge* m = [JsbBridge sharedInstance];
[m sendToScript:@"Animation1" arg1:@"true"];
```

This will call the `JavaScript` playback operation.

## Sample project: simple multi-event calls

Creator provides the [native-script-bridge](https://github.com/cocos/cocos-example-projects/tree/v3.4/native-script-bridge) example, which developers can download for reference use as needed.
