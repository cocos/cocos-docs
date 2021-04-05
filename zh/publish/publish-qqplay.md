# 发布到 QQ「玩一玩」平台

QQ「玩一玩」与微信小游戏类似，内置于 QQ 中，无需下载游戏就能玩转多款热门手游。玩一玩的底层 runtime 并不是真正的 HTML 浏览器内核，而是玩一玩自研的 Bricks 游戏引擎。Cocos Creator 从 v1.9 版本开始就支持游戏内容跨平台发布到 QQ「玩一玩」。
 
作为跨平台游戏引擎方，Creator 为用户完成的主要工作包括：

- 引擎负责适配 QQ「玩一玩」平台，用户的游戏逻辑代码不需要任何额外的修改
- Cocos Creator 编辑器提供打包流程，可直接发布为符合 QQ「玩一玩」技术规范的游戏
- 支持 QQ「玩一玩」平台标准的远程资源加载、缓存，以及缓存资源的版本控制

## 使用 Cocos Creator 一键发布手机 QQ「玩一玩」

**准备工作**：

- 获取 Bricks 引擎工程（这个工程暂时不能对外公开，开发者可向腾讯申请 bitbucket 库读取权限）

**发布流程**：

1、使用 Creator 打开需要发布的项目工程，在构建发布面板中选择 **QQ Play** 平台。`远程服务器地址` 选项，若有需要可自行设置。然后点击 **构建**。

![](./publish-qqplay/build.jpeg)

构建完成后访问项目文件夹，在 build 目录下就会生成一个 qqplay 的发布包：

![](./publish-qqplay/package.jpeg)

2、将 qqplay 文件夹中的内容拷贝到 Bricks 引擎工程的 Res 文件夹中：

![](./publish-qqplay/paste.jpeg)

3、打开 Bricks 引擎中的 Xcode 工程，就可以直接进行玩一玩的编译调试了。具体可查看 [Bricks 引擎官方调试文档](http://hudong.qq.com/docs/engine/debug/intro.html)。

与这篇文档搭配的还有一段教学视频，可以结合视频中的操作来理解，更加直观。

{% raw %}

<iframe frameborder="0" width="100%" height="440" src="https://v.qq.com/iframe/player.html?vid=m055288q7cl&tiny=0&auto=0" allowfullscreen></iframe>

{% endraw %}

<br>

## QQ「玩一玩」已知问题：

目前暂时仅支持在 Mac 上使用 Xcode 进行编译开发。<br>
此外，我们对 QQ「玩一玩」的适配工作还未完全结束，目前仍不支持以下模块：

- Label：不支持 TTF，系统字体也只能使用默认字体
- 粒子系统：不支持 plist 中存储贴图数据，只支持贴图 URL
- WebView
- VideoPlayer
- DeviceMotion

以上功能预计在以后的更新中会逐步支持，我们也将持续与 QQ「玩一玩」工程师们紧密沟通，不断优化适配效果。

## 接入注意事项

- 首包必须在 10M 以内，后续的资源可以部署在腾讯 CDN 上用 https 进行加载。
- 上线前需要软件著作权，并提供版号申请证明，回执或者受理截图。
- 除腾讯工作室外开发的游戏外，名称不允许出现 QQ、腾讯、天天、全民、欢乐等官方字眼。
- 游戏必须有自己的大厅，大厅需要具备开始游戏（含邀请好友）、道具商城、活动入口。
- 游戏内需要具备分享至 QQ 好友 / QQ 空间的能力。
- 游戏需要使用自建后台，必须接 openkey 鉴权。

## 参考链接

更多内容可参考 [QQ「玩一玩」官方文档](https://hudong.qq.com/docs/access/)。
