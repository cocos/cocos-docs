# 发布到百度小游戏

百度小游戏是基于手机百度 app 上的智能小程序进行扩展的小游戏，它不仅提供了强大的游戏能力，还和智能小程序一样，提供了大量的原生接口，比如支付，文件系统，位置，分享等。相当于同时结合了 WEB 易于传播以及 Native 功能丰富的优势。

百度小游戏的运行环境和微信小游戏类似，基本思路也是封装必要的 WEB 接口提供给用户，尽可能追求和 WEB 同样的开发体验。百度小游戏在智能小程序环境的基础上提供了 WebGL 接口的封装，使得渲染能力和性能有了大幅度提升。不过由于这些接口都是百度团队通过自研的原生实现封装的，所以并不可以等同为浏览器环境。

作为引擎方，为了尽可能简化开发者的工作量，我们为用户完成的主要工作包括：

- 引擎框架适配百度小游戏 API，纯游戏逻辑层面，用户不需要任何额外的修改
- Cocos Creator编辑器提供了快捷的打包流程，直接发布为百度小游戏
- 自动加载远程资源，缓存资源以及缓存资源版本控制

具体百度小游戏的申请入驻，开发准备，游戏提交，审核和发布流程可以参考 [百度小游戏注册指导文档](https://smartprogram.baidu.com/docs/game/)。

## 准备工作

- 下载 [百度开发者工具](https://smartprogram.baidu.com/docs/game/tutorials/howto/dev/) 并安装。
- 在手机的应用商店中下载并安装百度应用
- 登录 [智能小程序平台](https://smartprogram.baidu.com/developer/index.html)，找到 AppID。

    ![appid](./publish-baidugame/appid.png)

## 发布流程

使用 Cocos Creator 打开需要发布的项目工程，从 **菜单栏 -> 项目** 中打开 **构建发布** 面板，**发布平台** 选择 **百度小游戏**。填入 AppID，然后点击 **构建**。

![build](./publish-baidugame/build.png)

通用构建选项的设置请参考 [通用构建选项](build-options.md)，百度小游戏特有的构建选项如下：

| 构建选项 | 可选 | 说明 | 字段名（用于命令行发布） |
| :------ | :--- | :--- | :--- |
| 初始场景分包 | 可选项 | 勾选后，首场景及其相关的依赖资源会被构建到发布包目录 `assets` 下的内置 Asset Bundle — [start-scene](../../asset/bundle.md#%E5%86%85%E7%BD%AE-asset-bundle) 中，提高初始场景的资源加载速度。 | `startSceneAssetBundle` |
| 设备方向 | 必填项 | 可选值包括 `landscape` 和 `portrait`。构建时会写入到发布包目录下的 `game.json` 中。| `orientation` |
| AppID | 必填项 | 百度小游戏的 AppID，构建时会写入到发布包目录下的 `project.swan.json` 中。| `appid` |
| 资源服务器地址 | 可选项 | 用于填写资源存放在远程服务器上的地址。开发者需要在构建后手动将发布包目录下的 `remote` 文件夹上传到所填写的资源服务器地址上。详情请参考 [上传资源到远程服务器](../../asset/cache-manager.md) | `remoteServerAddress` |
| 生成开放数据域工程模板 | 可选项 | 用于接入开放数据域，详情可以参考 [开放数据域](./build-open-data-context.md) | `buildOpenDataContextTemplate` |

### 运行预览

构建完成后点击 **构建任务** 左下角的文件夹图标按钮打开项目发布包，可以看到在默认发布路径 `build` 目录下生成了 `baidu-mini-game`（以具体的构建任务名为准）的百度小游戏工程文件夹，其中已经包含了百度小游戏环境的配置文件：`game.json` 和 `project.swan.json`

![package](./publish-baidugame/package.png)

使用 **百度开发者工具** 打开构建生成的 `baidu-mini-game` 文件夹，即可打开百度小游戏项目及预览调试游戏内容。**百度开发者工具** 的使用方式请参考 [百度开发者工具文档](https://smartprogram.baidu.com/docs/game/tutorials/howto/dev/)。

![preview](./publish-baidugame/preview.png)

> **注意**：预览调试时若出现了 **当前版本的开发者工具无法发布小程序，请更新最新的开发者工具** 的提示，说明填写的 AppID 是小程序的 AppID，不是小游戏的 AppID，请重新申请一个小游戏 AppID。

## 百度小游戏环境的资源管理

百度小游戏存在着包体限制，超过 **4MB** 的额外资源，必须通过网络请求下载。<br>当包体过大时，可在 **构建发布** 面板配置 **资源服务器地址** 选项，将资源上传到远程服务器，详情请参考 [上传资源到远程服务器](../../asset/cache-manager.md)。

我们建议用户只保存脚本文件在小游戏包内，其他资源都从远程服务器下载。Cocos Creator 已经帮用户做好了远程资源的下载、缓存和版本管理，详情请参考 [缓存管理器](../../asset/cache-manager.md)。

> **注意**：目前百度小游戏在真机上只支持通过 HTTPS 从远程服务器加载资源，所以必须将资源文件放在 HTTPS 服务器上，否则会出现资源加载失败的情况。

## 分包加载

百度小游戏的分包加载方式和微信小游戏类似，其包体限制如下：

- 所有包的总大小不超过 **8MB**
- 单个分包/主包大小不超过 **4MB**

具体的分包加载机制请参考 [小游戏分包](subpackage.md)。

## 平台 SDK 接入

除了纯游戏内容以外，百度小游戏环境还提供了非常强大的原生 SDK 接口，这些接口都是仅存在于百度小游戏环境中的，等同于其他平台的第三方 SDK 接口。这类 SDK 接口的移植工作在现阶段还是需要开发者自己处理。下面列举一些百度小游戏所提供的强大 SDK 能力：

1. 用户接口：登陆，授权，用户信息等
2. 百度收银台支付
3. 转发信息
4. 文件上传下载
5. 其他：图片、位置、广告、设备信息等等

## 接入百度小游戏的开放数据域

类似微信小游戏，百度小游戏为了保护其社交关系链数据，也实现了一个 **开放数据域**，可以获取到同玩且双向关注的好友信息。这是一个单独的游戏执行环境。开放数据域中的资源、引擎、程序，都和主游戏完全隔离，开发者只有在开放数据域中才能访问百度小游戏提供的 API `swan.getUserInfo()`、`swan.getUserCloudStorage()` 和 `swan.getFriendCloudStorage()`，用于获取相应的用户数据。

详细的百度小游戏开放域发布流程，请参考 [接入开放数据域](build-open-data-context.md)。

## 百度小游戏已知问题

目前 Cocos Creator 对百度小游戏的适配工作还未完全结束，暂时还不支持以下组件：

- VideoPlayer
- WebView

## 参考链接

- [百度小游戏注册指导文档](https://smartprogram.baidu.com/docs/game/)
- [百度开发者工具文档](https://smartprogram.baidu.com/docs/game/tutorials/howto/dev/)
- [百度小游戏 API 文档](https://smartprogram.baidu.com/docs/game/api/openApi/authorize/)
- [百度小游戏分包加载](https://smartprogram.baidu.com/docs/game/tutorials/subpackages/sub/)
