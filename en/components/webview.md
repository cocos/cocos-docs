# WebView Component Reference

WebView is a component for displaying web pages, you could use this component to embed a mini web browser in your games.

![webview](./webview/webview.png)

Click `add component` at the bottom of **Properties** panel and select `WebView` from `add UI component` popup.
Then you could add WebView component to the node.

For more info about WebView API reference [WebView API](../api/classes/WebView.html)。

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
var webviewEventHandler = new cc.Component.EventHandler();
webviewEventHandler.target = this.node; // This node is the one that the component that contains your event handler code belongs to
webviewEventHandler.component = "cc.MyComponent"
webviewEventHandler.handler = "callback";
webviewEventHandler.customEventData = "foobar";

webview.webviewEvents.push(webviewEventHandler);

// here is your component file
cc.Class({
    name: 'cc.MyComponent'
    extends: cc.Component,

    properties: {
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

<hr>
