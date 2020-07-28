# 发布到字节小游戏

字节小游戏的运行环境是字节小程序的扩展，在小程序环境的基础上提供了 WebGL 接口的封装，使得渲染能力和性能有了大幅度提升。不过由于这些接口都是字节团队通过自研的原生实现封装的，所以并不可以等同为浏览器环境。

Cocos Creator 从 v2.4.1 开始支持将项目发布到字节小游戏平台。  

作为引擎方，为了尽可能简化开发者的工作量，我们为开发者完成的主要工作包括：

- 引擎框架适配字节小游戏 API，纯游戏逻辑层面，开发者不需要任何额外的修改
- Cocos Creator 编辑器提供了快捷的打包流程，直接发布为字节小游戏
- 自动加载远程资源，缓存资源以及缓存资源版本控制

关于字节小游戏接入的细节，可参考 [字节小游戏接入指南](https://microapp.bytedance.com/docs/zh-CN/mini-game/introduction/plugin-reference/registration)。

## 使用 Cocos Creator 发布字节小游戏

1. 在 [字节小游戏官方文档](https://microapp.bytedance.com/docs/zh-CN/mini-app/develop/developer-instrument/developer-instrument-update-and-download) 下载字节跳动开发者工具

2. 登录字节小程序开发者平台，找到 appid

    ![](./publish-bytedancegame/appid.png)

3. 在 **构建发布** 面板的 **发布平台** 中选择 **字节跳动小游戏**，填入小游戏 appid，然后点击 **构建**

    ![](./publish-bytedancegame/build.png)

4. 按照这样的流程，项目的 build 目录下就会生成一个字节小游戏的发布包 **bytedance** 文件夹，其中已经包含了字节小游戏环境的配置文件：`game.json` 和 `project.config.json`

    ![](./publish-bytedancegame/package.png)

5. 使用 **字节开发者工具** 打开构建生成的 **bytedance** 文件夹，即可打开字节小游戏项目及预览调试游戏内容。**字节开发者工具** 的使用方式请参考 [字节开发者工具文档](https://microapp.bytedance.com/docs/zh-CN/mini-game/develop/developer-instrument/development-assistance/developer-instrument-introduction)。

    ![](./publish-bytedancegame/preview.png)

## 字节小游戏环境的资源管理

字节小游戏与微信小游戏类似，都存在着包体限制，超过 4MB 的额外资源，必须通过网络请求下载。

我们建议开发者在小游戏包内只保存脚本文件，其他的资源都从远程服务器下载。Cocos Creator 已经帮开发者做好了远程资源的下载、缓存和版本管理。具体的实现逻辑和操作步骤都与微信小游戏类似，请参考 [微信小游戏资源管理](./publish-wechatgame.md#%E5%B0%8F%E6%B8%B8%E6%88%8F%E7%8E%AF%E5%A2%83%E7%9A%84%E8%B5%84%E6%BA%90%E7%AE%A1%E7%90%86)。

## 平台 SDK 接入

除了纯游戏内容以外，其实字节小游戏环境还提供了非常强大的原生 SDK 接口，其中最重要的就是用户、社交、录屏等，这些接口都是只存在于字节小游戏环境中的，等同于其他平台的第三方 SDK 接口。这类 SDK 接口的移植工作在现阶段还是需要开发者自己处理。下面列举一些字节小游戏所提供的强大 SDK：

1. 用户接口：登录，授权，用户信息等
2. 游戏内录屏与分享
3. 转发以及获得转发信息
4. 媒体：图片、录音、相机等
5. 其他：位置、设备信息、扫码、NFC 等等

## 接入字节小游戏的开放数据域

字节小游戏为了保护其社交关系链数据，支持了 **开放数据域** 。这是一个单独的游戏执行环境。开放数据域中的资源、引擎、程序，都和主游戏完全隔离，开发者只有在开放数据域中才能访问字节提供的 `tt.getCloudStorageByRelation()` 和 `tt.getUserCloudStorage()` 两个 API，用于实现一些例如排行榜的功能。

如果需要通过 Cocos Creator 发布开放数据域工程，请参考 [接入字节小游戏的开放数据域](../publish/publish-bytedance-sub-domain.md)。

## 字节小游戏已知问题：

字节小游戏平台暂时不支持以下功能模块：

- VideoPlayer
- WebView
- 分包加载

## 参考链接

- [字节小游戏接入指南](https://microapp.bytedance.com/docs/zh-CN/mini-game/introduction/plugin-reference/registration)
- [小游戏 API 文档](https://microapp.bytedance.com/docs/zh-CN/mini-app/develop/api/foundation/tt-can-i-use)
- [字节开发者工具下载](https://microapp.bytedance.com/docs/zh-CN/mini-app/develop/developer-instrument/developer-instrument-update-and-download)
- [字节小游戏多端支持情况](https://microapp.bytedance.com/docs/zh-CN/mini-game/develop/multi-server-support/using-restriction)
