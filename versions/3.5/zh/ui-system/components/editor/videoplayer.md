# VideoPlayer 组件参考

VideoPlayer 是一种视频播放组件，可通过该组件播放本地和远程视频。

**播放本地视频**：

![video-player](videoplayer/videoplayer.png)

**播放远程视频**：

![video-player-remote](videoplayer/videoplayer-remote.png)

点击 **属性检查器** 下面的 **添加组件** 按钮，然后从 **UI 组件** 中选择 **VideoPlayer**，即可添加 VideoPlayer 组件到节点上。

VideoPlayer 的脚本接口请参考 [VideoPlayer API](%__APIDOC__%/zh/class/VideoPlayer)。

## VideoPlayer 属性

| 属性                  | 功能说明            |
| -------------------- | ------------------ |
| Resource Type        | 视频来源的类型，目前支持本地（LOCAL）视频和远程（REMOTE）视频 URL |
| Remote URL           | 当 Resource Type 为 REMOTE 时显示的字段，填入远程视频的 URL |
| Clip                 | 当 Resource Type 为 LOCAL 时显示的字段，拖拽本地视频的资源到此处来使用 |
| Play On Awake        | 视频加载后是否自动开始播放？|
| Current Time         | 指定从哪个时间点开始播放视频 |
| Volume               | 视频的音量（0.0 ~ 1.0）|
| Mute                 | 是否静音视频。静音时设置音量为 0，取消静音时恢复原来的音量 |
| Keep Aspect Ratio    | 是否保持视频原来的宽高比  |
| Full Screen On Awake | 是否全屏播放视频  |
| Stay On Bottom       | 永远在游戏视图最底层（该属性仅在 Web 平台生效）|
| Video Player Event   | 视频播放回调函数，该回调函数会在特定情况被触发，比如播放中，暂时，停止和完成播放。详情见下方的 **VideoPlayer 事件** 章节或者 [VideoPlayerEvent API](%__APIDOC__%/zh/class/VideoPlayer?id=videoPlayerEvent)。|

> **注意**：在 **Video Player Event** 属性的 **Node** 中，应该填入的是一个挂载有用户脚本组件的节点，在用户脚本中便可以根据用户需要使用相关的 VideoPlayer 事件。

## VideoPlayer 事件

### VideoPlayerEvent 事件

| 属性             | 功能说明 |
| --------------- | ---------------    |
| target          | 带有脚本组件的节点。  |
| component       | 脚本组件名称。       |
| handler         | 指定一个回调函数，当视频开始播放后，暂停时或者结束时都会调用该函数，该函数会传一个事件类型参数进来。|
| customEventData | 用户指定任意的字符串作为事件回调的最后一个参数传入。 |

详情可参考 API 文档 [Component.EventHandler](%__APIDOC__%/zh/class/EventHandler)

### 事件回调参数

| 名称            | 功能说明 |
| -------------- | -----------|
| PLAYING        | 表示视频正在播放中。|
| PAUSED         | 表示视频暂停播放。|
| STOPPED        | 表示视频已经停止播放。|
| COMPLETED      | 表示视频播放完成。|
| META_LOADED    | 表示视频的元信息已加载完成，你可以调用 getDuration 来获取视频总时长。 |
| READY_TO_PLAY  | 表示视频准备好了，可以开始播放了。|
| ERROR          | 处理视频时触发的错误 |
| CLICKED        | 表示视频被用户点击了。（只支持 Web 平台）|

> **注意**：在 iOS 平台的全屏模式下，点击视频无法发送 CLICKED 事件。如果需要让 iOS 全屏播放并正确接受 CLICKED 事件，可以使用 Widget 组件把视频控件撑满。

详情可参考 [VideoPlayer 事件](%__APIDOC__%/zh/class/VideoPlayer?id=videoPlayerEvent)。

使用方式可参考范例 **VideoPlayer**（[GitHub](https://github.com/cocos/cocos-test-projects/tree/v3.5/assets/cases/ui/21.video-player) | [Gitee](https://gitee.com/mirrors_cocos-creator/test-cases-3d/tree/v3.5/assets/cases/ui/21.video-player)）。

## 详细说明

VideoPlayer 支持的视频格式为 **mp4**。

### 通过脚本代码添加回调

#### 方法一

这种方法添加的事件回调和使用编辑器添加的事件回调是一样的。通过代码添加，首先你需要构造一个 `Component.EventHandler` 对象，然后设置好对应的 `target`、`component`、`handler` 和 `customEventData` 参数。

```ts
import { _decorator, Component, VideoPlayer } from 'cc';
const { ccclass, type } = _decorator;

@ccclass('MyComponent')
export class MyComponent extends Component {
    @type(VideoPlayer)
    videoPlayer = null;

    start () {
        const eventHandler = new Component.EventHandler();
        eventHandler.target = newTarget; // 这个对象是你的事件处理代码组件所属的节点
        eventHandler.component = "MyComponent";
        eventHandler.handler = "callback";
        eventHandler.customEventData = "foobar";
        this.videoplayer.videoPlayerEvent.push(eventHandler);
    }

    // 注意参数的顺序和类型是固定的
    callback: function(videoplayer, eventType, customEventData) {
        // 这里的 videoplayer 是一个 VideoPlayer 组件对象实例
        // 这里的 eventType === VideoPlayer.EventType enum 里面的值
        // 这里的 customEventData 参数就等于你之前设置的 "foobar"
    }
}
```

#### 方法二

通过 `videoplayer.node.on(VideoPlayer.EventType.READY_TO_PLAY, ...)` 的方式来添加

```ts
//假设我们在一个组件的 onLoad 方法里面添加事件处理回调，在 callback 函数中进行事件处理:
import { _decorator, Component, VideoPlayer } from 'cc';
const { ccclass, type } = _decorator;

@ccclass('VideoPlayerCtrl')
export class VideoPlayerCtrl extends Component {
    @type(VideoPlayer)
    videoPlayer = null;

    start () {
        this.videoplayer.node.on(VideoPlayer.EventType.READY_TO_PLAY, this.callback, this);
    }

    callback (videoplayer) {
        // 这里的 videoplayer 表示的是 VideoPlayer 组件
        // 对 videoplayer 进行你想要的操作
        // 另外，注意这种方式注册的事件，也无法传递 customEventData
    }
}
```

同样的，用户也可以注册 `meta-loaded`、`clicked`、`playing` 等事件，这些事件的回调函数的参数与 `ready-to-play` 的参数一致。

> **注意**：由于 VideoPlayer 是特殊的组件，所以它无法监听节点上的 **触摸** 和 **鼠标** 事件。

关于完整的 VideoPlayer 的事件列表，可以参考 [VideoPlayer API](%__APIDOC__%/zh/class/VideoPlayer)。

## 如何实现 UI 在 VideoPlayer 上渲染

可通过以下两个步骤实现 UI 在 VideoPlayer 上显示：

1. 确保 **项目设置 -> Macro Config** 中的 **ENABLE_TRANSPARENT_CANVAS** 为勾选状态（设置 Canvas 背景支持 alpha 通道）

    ![ENABLE_TRANSPARENT_CANVAS](videoplayer/ENABLE_TRANSPARENT_CANVAS.png)

2. 可在 **属性检查器** 中勾选 VideoPlayer 组件上的 **stayOnBottom** 属性。

    ![stayonbuttom](videoplayer/stayonbuttom.png)

> **注意**：
>
> 1. 该功能仅支持 **Web** 平台。
> 2. 各个浏览器具体效果无法保证一致，跟浏览器是否支持与限制有关。
> 3. 开启 **stayOnBottom** 后，将无法正常监听 `VideoPlayerEvent` 中的 `clicked` 事件。

详情可参考范例 **VideoPlayer**（[GitHub](https://github.com/cocos/cocos-test-projects/tree/v3.5/assets/cases/ui/21.video-player) | [Gitee](https://gitee.com/mirrors_cocos-creator/test-cases-3d/tree/v3.5/assets/cases/ui/21.video-player)）。

最终效果如下图所示：

![videoplayer-stayOnButton](videoplayer/videoplayer-stayonbuttom.png)

## 支持平台

由于不同平台对于 VideoPlayer 组件的授权、API、控制方式都不同，还没有形成统一的标准，所以目前只支持 Web、iOS、Android、微信小游戏、Facebook Instant Games 以及 Google Play Instant 平台。

### 关于自动播放的问题

一些移动端的浏览器或 **WebView** 不允许自动播放视频，用户需要在触摸事件中手动播放视频。

```ts
import { _decorator, Node, Component, find, VideoPlayer } from 'cc';
const { ccclass, type } = _decorator;

@ccclass('VideoPlayerCtrl')
export class VideoPlayerCtrl extends Component {
    @type(VideoPlayer)
    videoPlayer = null;

    start () {
        let canvas = find('Canvas');
        canvas.on(Node.EventType.TOUCH_START, this.playVideo, this);
    }

    playVideo () {
        this.videoplayer.play();
    }
}
```
