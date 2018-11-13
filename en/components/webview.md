# WebView Component Reference

WebView is a component for displaying web pages, you could use this component to embed a mini web browser in your games.

![webview](./webview/webview.png)

Click `add component` at the bottom of **Properties** panel and select `WebView` from `add UI component` popup.
Then you could add WebView component to the node.

For more info about WebView API reference [WebView API](../../../api/en/classes/WebView.html)。

## WebView Attribute

| Attribute | Function Explanation
|-------- | ----------- |
| Url | A given URL to be loaded by the WebView, it should have a http or https prefix.
| WebViewEvents | The webview's event callback , it will be triggered when certain webview event occurs.

## WebView Event

### WebViewEvents Event

| Attribute |   Function Explanation
| -------------- | ----------- |
|Target| Node with the script component.
|Component| Script component name.
|Handler| Specify a callback, when the WebView is loading the web pages, or the loading is finished or there are errors occurred. The callback will be called. For more information, please refer to `Parameter of WebViewEvents`.

### Parameter of WebViewEvents

| Name |   Function Explanation
| -------------- | ----------- |
| LOADING | WebView is loading.
| LOADED| WebView is finished loading.
| ERROR| Errors occurred when loading web pages.

## Details Explanation
Currently this component is only available on Web(Both PC and Mobile), iOS and Android.

You can't use it on Mac or Windows which means if you preview WebView on these platforms, there is nothing to show.

This component doesn't support load HTML file or execute Javascript.

### Add a callback via script

#### Method one

This method uses the same API that editor uses to add an event callback on Button component. You need to construct a `cc.Component.EventHandler` object first, and then set the corresponding target, component, handler and customEventData parameters.

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
       webview: cc.WebView
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

Likewise, you can also register 'loading', 'error' events, and the parameters of the callback function for these events are consistent with the 'loaded' parameters.

## How to interact with WebView internal pages

##### Calling the WebView internal page

```js
cc.Class({
    extends: cc.Component,
    properties: {
        webview: cc.WebView
    },
    
    onLoad: function () {
        // The Test here is a global function defined in your webView's internal page code
        this.webview.evaluateJS('Test()');
    }
});
```
##### Note: Cross domain issues need on HTML5 to be resolved by yourself

##### WebView internal pages call external code

At present, the mechanism of Android and IOS is to determine whether the key of URL prefix is the same as that of the URL prefix by intercepting the jump, and then callback if the same.

1. Setting the URL prefix keyword through `setJavascriptInterfaceScheme`
2. The callback function is set by `setOnJSCallback`, and the function parameter is URL

```js
cc.Class({
    extends: cc.Component,
    
    properties: {
        webview: cc.WebView
    },
    
    onLoad: function () {
        var scheme = "TestKey";// Here are the keywords that are agreed with the internal page
        var jsCallback = function (url) {
            // The return value here is the URL value of the internal page, 
            // and it needs to parse the data it needs
            var str = url.replace(scheme + '://', '');
            var data = JSON.stringify(str);
        };
        
        this.webview.setJavascriptInterfaceScheme(scheme);
        this.webview.setOnJSCallback(jsCallback);
    }
});

// So when you need to interact with WebView through an internal page, 
// you should set the internal page URL: TestKey://(the data you want to callback to WebView later)
// WebView internal page code
<html>
<body>
    <dev>
        <input type="button" value="Trigger" onclick="onClick()"/>
    </dev>
</body>
<script>
    function onClick () {
        // One of them sets up the URL scheme
        document.location = 'TestKey://{a: 0, b: 1}';
    }
</script>
</html>
```

Because of the limitations of Web platform, it can not be implemented by this mechanism, but internal pages can interact with each other

```js
// WebView internal page code
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

##### Stressed once: Cross domain issues on HTML5 need need to be resolved by yourself

<hr>
