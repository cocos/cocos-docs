# WebView Component Reference

WebView is a component for displaying web pages, you could use this component to embed a mini web browser in your games. Because different platforms have different authorization, API and control methods for WebView component. And have not yet formed a unified standard, only **Web**, **iOS**, and **Android** platforms are currently supported.

![webview](./webview/webview.png)

Click **Add Component** at the bottom of **Properties** panel and select **WebView** from **UI Component** to add the WebView component to the node.

For more information about WebView API, please refer to [WebView API](../../../api/en/classes/WebView.html) for details.

## WebView Properties

| property | Function Explanation
|-------- | ----------- |
| Url | A given URL to be loaded by the WebView, it should have a http or https prefix.
| Webview Events | The webview's event callback, it will be triggered when certain webview event occurs.

> **Note**: in **cc.Node** of the **Webview Events** property, you should fill in a Node that hangs the user script component, and in the user script you can use the relevant WebView event according to the user's needs.

## WebView Event

### WebViewEvents Event

| property |   Function Explanation
| -------------- | ----------- |
|Target| Node with the script component.
|Component| Script component name.
|Handler| Specify a callback, when the WebView is loading the web pages, or the loading is finished or there are errors occurred. The callback will be called. For more information, please refer to `Parameter of WebViewEvents`.
| CustomEventData | The user specifies that any string is passed in as the last parameter of the event callback. |

For more information, please refer to [Component.EventHandler Class](../../../api/en/classes/Component.EventHandler.html).

### Parameter of WebViewEvents

| Name |   Function Explanation
| -------------- | ----------- |
| LOADING | WebView is loading.
| LOADED| WebView is finished loading.
| ERROR| Errors occurred when loading web pages.

For more information, please refer to the [WebView Events](../../../api/en/classes/WebView.html#events) or [10_webview](https://github.com/cocos/example-projects/tree/master/assets/cases/02_ui/10_webview) of the example-cases samples bundled with Creator.

## Details Explanation

Currently this component is only available on Web (Both PC and Mobile), iOS and Android (Not supported in the v2.0.0~2.0.6). You can't use it on Mac or Windows which means if you preview WebView on these platforms, there is nothing to show.

**Note**:

- This component doesn't support load HTML file or execute Javascript.
- If you don't use WebView related features in your project, please ensure that the WebView module is removed from the **Project -> Project Settings -> Module Config** to help your game approval go as smoothly as possible on iOS App Store. If you really needs to use WebView (or the added third-party SDK comes with WebView), and therefore the game rejected by App Store, you can still try to appeal through email.

### Add a callback via script

#### Method one

This method uses the same API that editor uses to add an event callback on Button component. You need to construct a `cc.Component.EventHandler` object first, and then set the corresponding `target`, `component`, `handler` and `customEventData` parameters.

```js

// here is your component file
cc.Class({
    name: 'cc.MyComponent',
    extends: cc.Component,
    properties: {
        webview: cc.WebView,
    },

    onLoad: function() {
        var webviewEventHandler = new cc.Component.EventHandler();
        webviewEventHandler.target = this.node; // This node is the one that the component that contains your event handler code belongs to
        webviewEventHandler.component = "cc.MyComponent";
        webviewEventHandler.handler = "callback";
        webviewEventHandler.customEventData = "foobar";
        this.webview.webviewEvents.push(webviewEventHandler);
    },

    // Note that the order and type of parameters are fixed
    callback: function (webview, eventType, customEventData) {
        // here webview is a WebView component instance
        // here the value of eventType === cc.WebView.EventType enum
        // The customEventData parameter here is equal to the "foobar"
    }
});
```

#### Method two

Add event callback with `webview.node.on ('loaded', ...)`

```js
// Suppose we add event handling callbacks in the onLoad method of a component and perform event handling in the callback function:

cc.Class({
    extends: cc.Component,
    properties: {
       webview: cc.WebView,
    },

    onLoad: function () {
       this.webview.node.on('loaded', this.callback, this);
    },

    callback: function (event) {
       // The event here is an EventCustom object, and you can get the WebView component through event.detail
       var webview = event.detail;
       // do whatever you want with webview
       // Also, note that this way the registered event can not pass customEventData
    }
});
```

Likewise, you can also register `loading`, `error` events, and the parameters of the callback function for these events are consistent with the `loaded` parameters.

## How to interact with WebView internal pages

### Calling the WebView internal page

```js
cc.Class({
    extends: cc.Component,
    properties: {
        webview: cc.WebView,
    },

    onLoad: function () {
        // The Test here is a global function defined in your webView's internal page code
        this.webview.evaluateJS('Test()');
    }
});
```

#### Note: Cross domain issues on Web platform need to be resolved by yourself

### WebView internal pages call external code

At present, the mechanism of Android and IOS is to determine whether the key of URL prefix is the same as that of the URL prefix by intercepting the jump, and then callback if the same.

1. Setting the URL prefix keyword through `setJavascriptInterfaceScheme`
2. The callback function is set by `setOnJSCallback`, and the function parameter is URL

```js
cc.Class({
    extends: cc.Component,

    properties: {
        webview: cc.WebView,
    },
    // Setting in onLoad will make the callback useless, so we must set the cc.WebView callback in the start cycle.
    start: function () {
        // Here are the keywords that are agreed with the internal page
        // Please set the scheme with lower case, the native won't identify the uppercase char scheme.
        var scheme = "testkey";
        var jsCallback = function (target, url) {
            // The return value here is the URL value of the internal page, and it needs to parse the data it needs.
            var str = url.replace(scheme + '://', ''); // str === 'a=1&b=2'
            // webview target
            console.log(target);
        };

        this.webview.setJavascriptInterfaceScheme(scheme);
        this.webview.setOnJSCallback(jsCallback);
    }
});
```

So when you need to interact with WebView through an internal page, you should set the internal page URL: `testkey://(the data you want to callback to WebView later)`. WebView internal page code:

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

Because of the limitations of Web platform, it can not be implemented by this mechanism, but internal pages can interact in the following ways:

```html
<html>
<body>
    <dev>
        <input type="button" value="Trigger" onclick="onClick()"/>
    </dev>
</body>
<script>
    function onClick () {
        // The parent here is actually the window of the WebView layer, 
        // so that you can access the function defined in CC
        parent.cc.TestCode();
        // If TestCode is defined on window, then
        parent.TestCode();
    }
</script>
</html>
```

#### Stressed once: Cross domain issues on Web platform need to be resolved by yourself
