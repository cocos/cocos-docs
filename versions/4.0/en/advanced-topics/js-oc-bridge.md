# JavaScript and Objective-C Communication using JsbBridge

## Background

[JavaScript and iOS/macOS Communication with Reflection](./oc-reflection.md), We need to carefully verify the number of parameters to ensure proper operation. The steps involved are quite complex.

Therefore, we provide an additional method to simplify the communication between the script and the native. This method acts as a channel or bridge, and we named it `JsbBridge`, which stands for a bridge between scripts and the native app through JSB binding.

> **Note**: Both methods can be used effectively, and developers can choose the one that suits their needs based on their specific requirements.

## JsbBridge Mechanism

### JavaScript API

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

As the names suggest, `sendToNative` is used to invoke code in the native layer, while `onNative` is used to respond to calls from the native layer.

When using these interfaces, please note the following:

- Since this feature is still in the experimental stage, it only supports the transmission of `string` data. If you need to transmit objects with multiple parameters, consider converting them to `Json` format for transmission and parse them before using.
- `onNative` Only one function is recorded at a time for `onNative`, and setting the property again will override the previously set `onNative` method.
- The `sendToScript` method is a one-way communication and does not have return value. It does not inform JavaScript of the success or failure of the operation. Developers need to handle the operation status themselves.

### Objective-C API

In `Objective-C`, there are also two corresponding interfaces: `sendToScript` and `callByScript`, defined as follows:

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

Among them, `sendToScript` is used to invoke code in the script layer, while `callByScript` is used to respond to calls from the script layer.

We need to implement the `ICallback` interface and use `setCallback` to register and respond to the specific behavior of `callByScript`.

## Basic Usage

### Calling Objective-C from JavaScript

Suppose we have written an Objective-C interface to open an advertisement, and when the player clicks the button to open the advertisement, it should be triggered by JavaScript calling the corresponding Objective-C interface.

First, we need to implement an `ICallback` interface to respond to the operation, and then register it with `JsbBridge` using the `setCallback` method.

Here is the Objective-C code:

```ObjC
#include "platform/apple/JsbBridge.h"

static ICallback cb = ^void (NSString* _arg0, NSString* _arg1){
    if([_arg0 isEqual:@"open_ad"]){
        //open Ad
    }
};

JsbBridge* m = [JsbBridge sharedInstance];
[m setCallback:cb];
```

In JavaScript, we can call it like this:

```ts
import { native } from 'cc'
public static onclick(){
    native.bridge.sendToNative('open_ad', defaultAdUrl);
} 
```

### Calling JavaScript from Objective-C

Suppose that after our advertisement finishes playing, we need to notify the JavaScript layer. We can do it as follows.

First, in JavaScript, use `onNative` to respond to the event:

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

> In actual projects, you can place the above code in the `onload` function of a script component that needs to be loaded when the program starts to ensure early listening to events from the native layer.

Then, in Objective-C, call it as follows:

```ObjC
#include "platform/apple/JsbBridge.h"

JsbBridge* m = [JsbBridge sharedInstance];
[m sendToScript:@"ad_close" arg1:@"finished"];
```

Through the above operations, we can notify JavaScript about the playback result of the advertisement.

## Best Practices

JsbBridge provides two string-type parameters, `arg0` and `arg1`, to pass information, which can be allocated according to different needs.

### 1. Both arg0 and arg1 used as parameters

If the communication requirements are relatively simple and do not require categorization, you can use `arg0` and `arg1` as parameters.

### 2. arg0 used as command type, arg1 used as a parameter

If the communication requirements are relatively complex, you can use arg0 as a command type to process different commands, and arg1 can be used as a parameter.

### 3. arg0 used as a command type, arg1 used as a JSON string

For particularly complex requirements where simple string-type parameters are not sufficient, you can convert the objects that need to be passed into a string using `JSON.stringify` and pass them through `arg1`. When using them, you can restore them to objects using `JSON.parse` for further processing.

> Since it involves serialization and deserialization operations of JSON, this usage is not recommended for frequent calls.

## Thread Safety

Note that if the related code involves native UI, you need to consider thread safety issues. For more details, please refer to:[Thread Safety](./thread-safety.md)。

## Sample: Multiple Event Calls

Cocos provides the [native-script-bridge](https://github.com/cocos/cocos-example-projects/tree/v3.8/native-script-bridge) example, which developers can download for reference use as needed.
