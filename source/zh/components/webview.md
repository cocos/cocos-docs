# WebView 组件参考

WebView 是一种显示网页的组件，该组件让你可以在游戏里面集成一个小的浏览器。


![webview](./webview/webview.png)


点击**属性检查器**下面的`添加组件`按钮，然后从`添加 UI 组件`中选择`WebView`，即可添加 WebView 组件到节点上。

WebView 的脚本接口请参考 [WebView API](../api/classes/WebView.html)。

## WebView 属性

| 属性 | 功能说明
|-------- | ----------- |
| Url | 指定一个 URL 地址，这个地址以 HTTP 或者 HTTPS 开头，请填写一个有效的 URL 地址 。
| WebViewEvents | WebView 的回调事件，当 webview 在加载网页过程中，加载网页结束后或者加载网页出错时会调用此函数。

## WebView 事件

### WebViewEvents 事件
| 属性 |   功能说明
| -------------- | ----------- |
|Target| 带有脚本组件的节点。
|Component| 脚本组件名称。
|Handler| 指定一个回调函数，当网页加载过程中、加载完成后或者加载出错时会被调用，该函数会传一个事件类型参数进来。详情见`WebView 事件回调参数` 章节

### WebView 事件回调参数

| 名称 |   功能说明
| -------------- | ----------- |
| LOADING | 表示网页正在加载过程中。
| LOADED| 表示网页加载已经完毕。
| ERROR| 表示网页加载出错了。

## 详细说明
目前此组件只支持Web（PC 和手机）、iOS 和 Android 平台，Mac 和 Windows 平台暂时还不支持，如果在场景中使用此组件，
那么在 PC 的模拟器里面预览的时候可能看不到效果。

此控件暂时不支持加载指定 HTML 文件或者执行 Javascript 脚本。

<hr>
