# WebView 组件参考

WebView 是一种显示网页的组件，该组件让你可以在游戏里面集成一个小的浏览器。


![webview](./webview/webview.png)

点击**属性检查器**下面的`添加组件`按钮，然后从`添加 UI 组件`中选择`WebView`，即可添加 WebView 组件到节点上。

WebView 的脚本接口请参考 [WebView API](../api/classes/WebView.html)。

## WebView 属性

| 属性          | 功能说明      |
|---------------|-------------------------------------------------------------------------------------------------|
| Url           | 指定一个 URL 地址，这个地址以 HTTP 或者 HTTPS 开头，请填写一个有效的 URL 地址 。                |
| WebViewEvents | WebView 的回调事件，当 webview 在加载网页过程中，加载网页结束后或者加载网页出错时会调用此函数。 |

## WebView 事件

### WebViewEvents 事件

| 属性            | 功能说明 |
| --------------  | -----------  |
| Target          | 带有脚本组件的节点。   |
| Component       | 脚本组件名称。      |
| Handler         | 指定一个回调函数，当网页加载过程中、加载完成后或者加载出错时会被调用，该函数会传一个事件类型参数进来。详情见`WebView 事件回调参数` 章节 |
| CustomEventData | 用户指定任意的字符串作为事件回调的最后一个参数传入。 |

### WebView 事件回调参数

| 名称           | 功能说明     |
| -------------- | ----------- |
| LOADING        | 表示网页正在加载过程中。 |
| LOADED         | 表示网页加载已经完毕。   |
| ERROR          | 表示网页加载出错了。     |

## 详细说明

目前此组件只支持Web（PC 和手机）、iOS 和 Android 平台，Mac 和 Windows 平台暂时还不支持，如果在场景中使用此组件，
那么在 PC 的模拟器里面预览的时候可能看不到效果。

此控件暂时不支持加载指定 HTML 文件或者执行 Javascript 脚本。

### 通过脚本代码添加回调

#### 方法一

这种方法添加的事件回调和使用编辑器添加的事件回调是一样的，通过代码添加，
你需要首先构造一个 `cc.Component.EventHandler` 对象，然后设置好对应的 target, component, handler 和 customEventData 参数。

```js
var webviewEventHandler = new cc.Component.EventHandler();
webviewEventHandler.target = this.node; //这个 node 节点是你的事件处理代码组件所属的节点
webviewEventHandler.component = "cc.MyComponent"
webviewEventHandler.handler = "callback";
webviewEventHandler.customEventData = "foobar";

webview.webviewEvents.push(webviewEventHandler);

//here is your component file
cc.Class({
    name: 'cc.MyComponent'
    extends: cc.Component,

    properties: {
    },

	//注意参数的顺序和类型是固定的
    callback: function(webview, eventType, customEventData) {
        //这里 webview 是一个 WebView 组件对象实例
        // 这里的 eventType === cc.WebView.EventType enum 里面的值
        //这里的 customEventData 参数就等于你之前设置的 "foobar"
    }
});
```

#### 方法二

通过 `webview.node.on('loaded', ...)` 的方式来添加

```js
//假设我们在一个组件的 onLoad 方法里面添加事件处理回调，在 callback 函数中进行事件处理:

cc.Class({
    extends: cc.Component,

	
    properties: {
       webview: cc.WebView
    },
    
    onLoad: function () {
       this.webview.node.on('loaded', this.callback, this);
    },
    
    callback: function (event) {
       //这里的 event 是一个 EventCustom 对象，你可以通过 event.detail 获取 WebView 组件
       var webview = event.detail;
       //do whatever you want with webview
       //另外，注意这种方式注册的事件，也无法传递 customEventData
    }
});
```

同样的，你也可以注册 'loading', 'error' 事件，这些事件的回调函数的参数与 'loaded' 的参数一致。