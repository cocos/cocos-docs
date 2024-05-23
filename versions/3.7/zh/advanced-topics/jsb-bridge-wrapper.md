# JsbBridgeWrapper 基于原生反射机制的事件处理 

> **注意**：在 v3.6 之后，jsb 模块将会逐步废弃，接口将会迁移到 cc 命名空间下的 native 模块。

JsbBridgeWrapper 是基于事件机制，用于 JS 层与原生层进行通信的接口。

## 建立于 JsbBridge 上的事件分发机制

`JsbBridgeWrapper` 是封装在 `JsbBridge` 之上的事件派发机制，相对于 `JsbBridge` 而言它更方便易用。开发者不需要手动去实现一套消息收发机制就可以进行多事件的触发。但它不具有多线程稳定性或者是 100% 安全。如果遇到复杂需求场景，仍然建议自己实现对应的事件派发。

## JsbBridgeWrapper 接口介绍

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

`OnNativeEventListener` 是实际注册的 **回调（callback）** 类型，为了防止因为类型不匹配导致的低级错误，因此使用显示声明该类型。`addNativeEventListener` 中的第二个参数即为传入的 callback。当然也可以使用匿名函数代替。代码示例如下：

```js
import { native } from 'cc'
// 当事件 “A” 触发时， ‘this.A’ 方法会被调用
native.jsbBridgeWrapper.addNativeEventListener("A", (usr: string) => {
    this.A(usr);
});
```

> **注意**：这里是为了防止 this 指向不明确，所以使用匿名函数封装一层作用域。

### JsbBridgeWrapper 接口说明

#### addNativeEventListener

增加一个事件监听。

参数：

- eventName: string  事件名称
- listener: OnNativeEventListener 回调函数

#### dispatchEventToNative

派发一个事件到原生层。

参数：

- eventName: string 事件名称
- arg?: string 参数

#### removeNativeEventListener

删除事件监听。

参数：

- eventName: string 事件名称
- listener: OnNativeEventListener 要删除的回调函数

#### removeAllListeners

删除所有的事件监听。

## 原生平台 JsbBridgeWrapper 的实现

`JsbBridgeWrapper` 在不同平台有不同的实现，开发者可以通过下列方式进行查看：

- 在 Objective-C 端，可查看 [JsbBridgeWrapper.h](https://github.com/cocos/cocos-engine/blob/v3.7.0/native/cocos/platform/apple/JsbBridgeWrapper.h) ：

    ```objc
    //In Objective-C
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
    
- 安卓可查看 [JsbBridgeWrapper.java](https://github.com/cocos/cocos-engine/blob/v3.7.0/native/cocos/platform/android/java/src/com/cocos/lib/JsbBridgeWrapper.java)：

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

- Huawei HarmonyOS 也可以通过 [JsbBridgeWrapper.java](https://github.com/cocos/cocos-engine/blob/v3.7.0/native/cocos/platform/ohos/libcocos/src/main/java/com/cocos/lib/JsbBridgeWrapper.java) 查看其实现方式。

## 使用 JsbBridgeWrapper

常见的需求如数据存放在原生层，当需要将数据取至 JS 层时，可以通过 JsbBridgeWrapper 实现。

下文通过一个示例说明，如何通过原生的回调结果改变 label 内容，当原生层的事件被触发时，将目标文本字符回传给 JS 层。

### 注册 JS 事件

JS 层需要首先注册一个 `changeLabelContent` 事件监听。

```js
public changeLabelContent(user: string): void {
    console.log("Hello " + user + " I'm K");
    this.labelForContent!.string = "Hello " + user + " ! I'm K";
}
native.jsbBridgeWrapper.addNativeEventListener("changeLabelContent", (usr: string) => {
        this.changeLabelContent(usr);
});
```

当 JS 层的 `changeLabelContent` 事件被触发时，标签的内容会变成对应的字符串组合。接下来需要处理原生的事件注册。

### 原生事件注册与派发

- 在 Objective-C 端使用下列代码：

    ```Objc
    // Objective-C
    JsbBridgeWrapper* m = [JsbBridgeWrapper sharedInstance];
    OnScriptEventListener requestLabelContent = ^void(NSString* arg){
        JsbBridgeWrapper* m = [JsbBridgeWrapper sharedInstance];
        [m dispatchEventToScript:@"changeLabelContent" arg:@"Charlotte"];
    };
    [m addScriptEventListener:@"requestLabelContent" listener:requestLabelContent];
    ```

- 在 JAVA 端使用如下代码：

    ```JAVA
    // JAVA
    JsbBridgeWrapper jbw = JsbBridgeWrapper.getInstance();
    jbw.addScriptEventListener("requestLabelContent", arg ->{
        System.out.print("@JAVA: here is the argument transport in" + arg);
        jbw.dispatchEventToScript("changeLabelContent","Charlotte");
    });
    ```

    > **注意**：JAVA 可以通过匿名函数的方法来实现 interface 的需求，此处写法简化。

这里原生的返回值被设置成固定字符，但开发者可以根据需求实现异步亦或是延后的字符赋值，时机并非固定。简而言之，当原生收到 `requestLabelContent` 的事件时，原生将会反过来触发 JS 层的 `changeLabelContent` 的事件，并将字符作为事件触发的传参。

### 在场景中派发事件

最后一步，我们在场景中添加一个按钮和对应的事件。

```js
// 按钮点击事件 SAY HELLO
public sayHelloBtn() {
    native.jsbBridgeWrapper.dispatchEventToNative("requestLabelContent");
}
```

最终的效果和 JsbBridge 的测试例效果相同。点击 `SAY HELLO` 按钮，第一行的内容会改变为打过招呼的信息，否则即为失败。

使用 `JsbBridgeWrapper` 模块时，开发者不需要自己去维护多余的机制，只需要关心是否正确注册和取消注册即可。
