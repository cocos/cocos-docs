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

<hr>
