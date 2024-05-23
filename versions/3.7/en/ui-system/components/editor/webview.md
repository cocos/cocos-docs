# WebView Component Reference

**WebView** is a component for displaying web pages, you could use this component to embed a mini web browser in your games. Because different platforms have different authorization, API and control methods for WebView component. And have not yet formed a unified standard, only **Web**, **iOS**, and **Android** platforms are currently supported.

![webview](./webview/webview.png)

Click **Add Component** at the bottom of **Properties** panel and select **WebView** from **UI Component** to add the WebView component to the node.

For more information, please refer to the [WebView API](__APIDOC__/en/class/WebView) documentation.

## WebView Properties

| Property | Function Explanation
|:-------- | :----------- |
| **URL** | A given URL to be loaded by the WebView, it should have a http or https prefix.
| **WebView Events** | The webview's event callback, it will be triggered when certain webview event occurs.

> **Note**: in the **Node** of the **WebView Events** property, you should fill in a Node that hangs the user script component, and in the user script you can use the relevant **WebView** event according to the user's needs.

## WebView Event

### WebViewEvents Event

| Property |   Function Explanation
| :-------------- | :----------- |
|**Target**| Node with the script component.
|**Component**| Script component name.
|**Handler**| Specify a callback, when the WebView is loading the web pages, or the loading is finished or there are errors occurred. The callback will be called. For more information, please refer to `Parameter of WebViewEvents`.
| **CustomEventData** | The user specifies that any string is passed in as the last parameter of the event callback. |

For more information, please refer to the [Component.EventHandler Class](__APIDOC__/en/class/EventHandler) documentation.

### Parameter of WebViewEvents

| Name |   Function Explanation
| :-------------- | :----------- |
| **LOADING** | WebView is loading.
| **LOADED**| WebView is finished loading.
| **ERROR**| Errors occurred when loading web pages.

For more information, please refer to the [WebView Events](__APIDOC__/en/class/WebView?id=webviewEvents) documentation or [22.webview example](https://github.com/cocos/cocos-test-projects/tree/v3.7/assets/cases/ui/22.webview) of the `test-cases-3d` samples bundled with Creator.

## Details Explanation

Currently, this component is only available on Web (Both PC and Mobile, iOS and Android (Not supported in the v2.0.0~2.0.6). It cannot be use on Mac or Windows which means if you preview **WebView** on these platforms, there is nothing to show.

> **Notes**:
> 1. This component doesn't support load HTML file or execute JavaScript.
> 2. If you don't use **WebView** related features in your project, please ensure that the **WebView** module is removed from the **Project -> Project Settings -> Module Config** to help your game approval go as smoothly as possible on iOS App Store. If you really needs to use WebView (or the added third-party SDK comes with **WebView**), and therefore if the game is rejected by App Store, you can still try to appeal through email.

### Add a callback via script

#### Method one

This method uses the same API that editor uses to add an event callback on Button component. You need to construct a `Component.EventHandler` object first, and then set the corresponding `target`, `component`, `handler` and `customEventData` parameters.

```ts
import { _decorator, Component, WebView } from 'cc';
const { ccclass, type } = _decorator;

@ccclass('MyComponent')
export class MyComponent extends Component {
    @type(WebView)
    webview = null;

    start () {
        const eventHandler = new Component.EventHandler();
        eventHandler.target = newTarget; // This node is the one that the component that contains your event handler code belongs to
        eventHandler.component = "MyComponent";
        eventHandler.handler = "callback";
        eventHandler.customEventData = "foobar";
        this.webview.webviewEvents.push(eventHandler);
    }

    // Note that the order and type of parameters are fixed
    callback: function(webview, eventType, customEventData) {
        // here webview is a WebView component instance
        // here the value of eventType === WebView.EventType enum
        // The customEventData parameter here is equal to the "foobar"
    }
}
```

#### Method two

Add event callback with `webview.node.on (WebView.EventType.LOADED, ...)`

```ts
// Suppose we add event handling callbacks in the onLoad method of a component and perform event handling in the callback function:
import { _decorator, Component, WebView } from 'cc';
const { ccclass, type } = _decorator;

@ccclass('WebViewCtrl')
export class WebViewCtrl extends Component {
    @type(WebView)
    webview = null;

    start () {
        this.webview.node.on(WebView.EventType.LOADED, this.callback, this);
    }

    callback (webview) {
        // The 'webview' here is a WebView component object
        // Do whatever you want with webview
        // Also, note that this way the registered event can not pass 'customEventData'
    }

}
```

Likewise, you can also register `WebView.EventType.LOADING`, `WebView.EventType.ERROR` events, and the parameters of the callback function for these events are consistent with the `WebView.EventType.LOADED` parameters.

## How to interact with WebView internal pages

### Calling the WebView internal page

```ts
import { _decorator, Component, WebView } from 'cc';
const { ccclass, type } = _decorator;

@ccclass('WebViewCtrl')
export class WebViewCtrl extends Component {
    @type(WebView)
    webview = null;

    start () {
        // The Test here is a global function defined in your webView's internal page code
        this.webview.evaluateJS('Test()');
    }
}
```

> **Note**: cross-domain issues on Web platform need to be resolved by yourself as __Cocos Creator__ does not assist with this.

### WebView internal pages call external code

The current mechanism used by Android and iOS is to determine if the keywords in the URL prefix are the same, and if they are, then a callback is made.

1. Setting the URL prefix keyword through `setJavascriptInterfaceScheme`
2. The callback function is set by `setOnJSCallback`, and the function parameter is URL

```ts
import { _decorator, Component, WebView } from 'cc';
const { ccclass, type } = _decorator;

@ccclass('WebViewCtrl')
export class WebViewCtrl extends Component {
    @type(WebView)
    webview = null;

    // Setting in onLoad will make the callback useless, so we must set the WebView callback in the start cycle.
    start () {
        // Here are the keywords that are agreed with the internal page
        // Please set the scheme with lower case, the native won't identify the uppercase char scheme.
        let scheme = "testkey";

        function jsCallback (target, url) {
            // The return value here is the URL value of the internal page, and it needs to parse the data it needs.
            let str = url.replace(scheme + '://', ''); // str === 'a=1&b=2'
            // webview target
            console.log(target);
        }

        this.webview.setJavascriptInterfaceScheme(scheme);
        this.webview.setOnJSCallback(jsCallback);
    }
}
```

When you need to interact with **WebView** through an internal page, you should set the internal page URL: `testkey://(the data you want to callback to WebView later)`. **WebView** internal page code:

```html
<html>
<body>
    <dev>
        <input type="button" value="Trigger" onclick="onClick()"/>
    </dev>
</body>
<script>
    function onClick () {
        // One of them sets up the URL scheme
        document.location = 'testkey://a=1&b=2';
    }
</script>
</html>
```

Due to limitations of the Web platform, it can not be implemented by this mechanism, but internal pages can interact in the following ways:

```html
<html>
<body>
    <dev>
        <input type="button" value="Trigger" onclick="onClick()"/>
    </dev>
</body>
<script>
    function onClick () {
        // If TestCode is defined on window, then
        parent.TestCode();
    }
</script>
</html>
```

> **Note**: cross-domain issues on Web platform need to be resolved by yourself as __Cocos Creator__ does not assist with this.
