# JsbBridgeWrapper - An Event Mechanism based on JsbBridge

> **Note**: After v3.6.0, `jsb` module is about to be deprecated, APIs will be moved to the `native` module of namespace `cc`.

## An eventify system based on JsbBridge

`JsbBridgeWrapper` is an eventify system based on `JsbBridge`, which is more convenient and easier to use. Developers can trigger multiple events without manually implementing one. But it is not mthread safe. If you're working on a complex situation, it is still recommended to implement the eventify system by yourself.

### JsbBridgeWrapper interface introduction

```js
/**
 * Listener for jsbBridgeWrapper's event.
 * It takes one argument as string which is transferred by jsbBridge.
 */
export type OnNativeEventListener = (arg: string) => void;
export namespace jsbBridgeWrapper {
    /** If there's no event registered, the wrapper will create one  */
    export function addNativeEventListener(eventName: string, listener: OnNativeEventListener);
    /**
     * Dispatch the event registered on Objective-C, Java etc.
     * No return value in JS to tell you if it works.
     */
    export function dispatchEventToNative(eventName: string, arg?: string);
    /**
     * Remove all listeners relative.
     */
    export function removeAllListenersForEvent(eventName: string);
    /**
     * Remove the listener specified
     */
    export function removeNativeEventListener(eventName: string, listener: OnNativeEventListener);
    /**
     * Remove all events, use it carefully!
     */
    export function removeAllListeners();
}
```

`OnNativeEventListener` is the type of callback to register here, yet you can also code with anonymous function, for example:

```js
import { native } from 'cc'
// When event ‘A’ is triggered, the function ‘this.A’ will be applied
native.jsbBridgeWrapper.addNativeEventListener("A", (usr: string) => {
    this.A(usr);
});
```

### Platform implementations

JsbBridgeWrapper has different implementations on different platforms.

As for Objective-C and Java, you will see `JsbBridgeWrapper` with a similar declaration.

- [Objective-C](https://github.com/cocos/cocos-engine/blob/v3.7.0/native/cocos/platform/apple/JsbBridgeWrapper.h):

    ```objc
    // In Objective-C
    typedef void (^OnScriptEventListener)(NSString*);

    @interface JsbBridgeWrapper : NSObject
    /**
     * Get the instance of JsbBridgetWrapper
     */
    + (instancetype)sharedInstance;
    /**
     * Add a listener to specified event, if the event does not exist, the wrapper will create one. Concurrent listener will be ignored
     */
    - (void)addScriptEventListener:(NSString*)eventName listener:(OnScriptEventListener)listener;
    /**
     * Remove listener for specified event, concurrent event will be deleted. Return false only if the event does not exist
     */
    - (bool)removeScriptEventListener:(NSString*)eventName listener:(OnScriptEventListener)listener;
    /**
     * Remove all listener for event specified.
     */
    - (void)removeAllListenersForEvent:(NSString*)eventName;
    /**
     * Remove all event registered. Use it carefully!
     */
    - (void)removeAllListeners;
    /**
     * Dispatch the event with argument, the event should be registered in javascript, or other script language in future.
     */
    - (void)dispatchEventToScript:(NSString*)eventName arg:(NSString*)arg;
    /**
     * Dispatch the event which is registered in javascript, or other script language in future.
     */
    - (void)dispatchEventToScript:(NSString*)eventName;
    @end

    ```
- [JAVA](https://github.com/cocos/cocos-engine/blob/v3.5.0/native/cocos/platform/android/java/src/com/cocos/lib/JsbBridgeWrapper.java) or [Huawei HarmonyOS](https://github.com/cocos/cocos-engine/blob/v3.5.0/native/cocos/platform/ohos/libcocos/src/main/java/com/cocos/lib/JsbBridgeWrapper.java):

    ```JAVA
    // In JAVA
    public class JsbBridgeWrapper {
        public interface OnScriptEventListener {
            void onScriptEvent(String arg);
        }
        /**
         * Add a listener to specified event, if the event does not exist, the wrapper will create one. Concurrent listener will be ignored
         */
        public void addScriptEventListener(String eventName, OnScriptEventListener listener);
        /**
         * Remove listener for specified event, concurrent event will be deleted. Return false only if the event does not exist
         */
        public boolean removeScriptEventListener(String eventName, OnScriptEventListener listener);
        /**
         * Remove all listener for event specified.
         */
        public void removeAllListenersForEvent(String eventName);
        /**
         * Remove all event registered. Use it carefully!
         */
        public void removeAllListeners() {
            this.eventMap.clear();
        }
        /**
         * Dispatch the event with argument, the event should be registered in javascript, or other script language in future.
         */
        public void dispatchEventToScript(String eventName, String arg);
        /**
         * Dispatch the event which is registered in javascript, or other script language in future.
         */
        public void dispatchEventToScript(String eventName);
    }
    ```

## Basic usage

### Register JS event, and using Objective-C/JAVA to trigger JavaScript event

We can still do with the simple demand: Change the label content with native callback result. once the native event is triggered, it will return the specified text to JavaScript. Before that, we should add an event listener for `changeLabelContent`.

#### Register JS event

```js
public changeLabelContent(user: string): void {
    console.log("Hello " + user + " I'm K");
    this.labelForContent!.string = "Hello " + user + " ! I'm K";
}
native.jsbBridgeWrapper.addNativeEventListener("changeLabelContent", (usr: string) => {
        this.changeLabelContent(usr);
});
```

#### Dispatch event to JS 

Once `changeLabelContent` event is triggered, label content will change to composition of specified strings. Before that, we should register the native event.

- Objective-C code sample:

    ```Objc
    // Objective-C
    JsbBridgeWrapper* m = [JsbBridgeWrapper sharedInstance];
    OnScriptEventListener requestLabelContent = ^void(NSString* arg){
        JsbBridgeWrapper* m = [JsbBridgeWrapper sharedInstance];
        [m dispatchEventToScript:@"changeLabelContent" arg:@"Charlotte"];
    };
    [m addScriptEventListener:@"requestLabelContent" listener:requestLabelContent];
    ```

- JAVA code sample:

    ```JAVA
    // JAVA
    JsbBridgeWrapper jbw = JsbBridgeWrapper.getInstance();
    jbw.addScriptEventListener("requestLabelContent", arg ->{
        System.out.print("@JAVA: here is the argument transport in" + arg);
        jbw.dispatchEventToScript("changeLabelContent","Charlotte");
    });
    ```

    > **Note**: You can also use anonymous function in JAVA too.

#### Dispatch event to native

The return value here is set to a const value, when JsbBridgeWrapper in Objective-C/JAVA receives the event notification of `requestLabelContent`, it will trigger `changeLabelContent` with a return value.

The final step, add a button to start our test. the code example is as follows:

```js
// Button click event for SAY HELLO
public sayHelloBtn() {
    native.jsbBridgeWrapper.dispatchEventToNative("requestLabelContent");
}
```

The effect is same as the test case of JsbBridge, click the `SAY HELLO` button, the label content will become a welcome message. Also, example case of JsbBridge is updated in repository.
