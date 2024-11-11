# 发布到微信小游戏

微信小游戏的运行环境是微信小程序环境的扩展，在小程序环境的基础上提供了 WebGL 接口的封装，使得渲染能力和性能有了大幅度提升。不过由于这些接口都是微信团队通过自研的原生实现封装的，所以并不可以等同为浏览器环境。

作为引擎方，为了尽可能简化开发者的工作量，我们为用户完成的主要工作包括：

- 引擎框架适配微信小游戏 API，纯游戏逻辑层面，用户不需要任何额外的修改
- Cocos Creator 编辑器提供了快捷的打包流程，直接发布为微信小游戏，并自动唤起小游戏的开发者工具
- 自动加载远程资源，缓存资源以及缓存资源版本控制

除此之外，小游戏的游戏提交、审核以及发布流程，和小程序是没有区别的，都需要遵守微信团队的要求和标准流程，具体信息可以参考 [微信小游戏开发文档](https://developers.weixin.qq.com/minigame/dev/guide/)。

## 环境配置

1. 在 [微信官方文档](https://mp.weixin.qq.com/debug/wxagame/dev/devtools/download.html) 下载微信开发者工具。

2. 在编辑器主菜单的 **Cocos Creator/File -> 偏好设置 -> [外部程序](../../editor/preferences/index.md#%E5%8E%9F%E7%94%9F%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83)** 中设置微信开发者工具路径。

    ![preference](./publish-wechatgame/preference.png)

3. 登录微信公众平台，找到 AppID。

    ![appid](./publish-wechatgame/appid.jpeg)

## 发布流程

1. 使用 Cocos Creator 打开需要发布的项目工程，从 **菜单栏 -> 项目** 中打开 **构建发布** 面板。在 **构建发布** 面板的 **发布平台** 中选择 **微信小游戏**。

    ![build](./publish-wechatgame/build.png)

    通用构建选项的设置请参考 [通用构建选项](build-options.md)，微信小游戏特有的构建选项如下，具体说明请参考下文 **构建选项** 部分的内容。

    ![build](./publish-wechatgame/wechat-build.png)

2. **构建发布** 面板的构建选项设置完成后，点击 **构建**。<br>
    构建完成后点击 **构建任务** 左下角的文件夹图标按钮打开项目发布包，可以看到在默认发布路径 `build` 目录下生成了 `wechatgame`（以具体的构建任务名为准）文件夹，其中已经包含了微信小游戏环境的配置文件：`game.json` 和 `project.config.json`。

    ![package](./publish-wechatgame/package.png)

3. 然后点击微信小游戏 **构建任务** 右下角的 **运行** 按钮，打开微信开发者工具。

    ![tool](./publish-wechatgame/tool.png)

    > **注意**：如果之前没有运行过微信开发者工具，可能会出现：`Please ensure that the IDE has been properly installed` 的报错，需要手动打开一次微信开发者工具，然后才能在 Cocos Creator 里直接点击 **运行** 调用。

### 主包设置

| 主包设置 | 说明 | 字段名（用于命令行发布） |
| :---- | :-- | :-- |
| 初始场景分包 | 勾选后，首场景及其相关的依赖资源会被构建到发布包目录 `assets` 下的内置 Asset Bundle — [start-scene](../../asset/bundle.md#%E5%86%85%E7%BD%AE-asset-bundle) 中，提高初始场景的资源加载速度。 | `startSceneAssetBundle` |
| 资源服务器地址 | 用于填写资源存放在远程服务器上的地址。开发者需要在构建后手动将发布包目录下的 `remote` 文件夹上传到所填写的资源服务器地址上。详情请参考 [上传资源到远程服务器](../../asset/cache-manager.md) | `remoteServerAddress` |

### 引擎设置

Cocos Creator 3.8 中，将引擎相关的构建选项统一到了**引擎设置**中，方便根据需求选择不同的引擎配置。

| 引擎设置 | 说明 | 字段名（用于命令行发布） |
| :---- | :-- | :-- |
| CLEANUP_IMAGE_CACHE | 是否在纹理数据上传 GPU 后，删除内存数据，删除后无法使用动态合图功能。 | - |
| 物理系统 | 选择不同的物理系统，发布后以当前选择的为准 | - |
| WebGL 2.0 | 选择不同的 WebGL 版本 | - |
| 原生代码打包模式 | 此选项会影响 Spine、物理等 Webassembly 模块的打包方式，将统一控制所有的 wasm/asmjs 模块，默认为最优值，若无特殊情况，不建议更改。| - |
| Wasm 3D 物理系统（基于 `ammo.js`） | 用于选择是否启用 Wasm，默认为开启，使用 **bullet（ammo.js）** 物理时生效。详情请参考下文 **WebAssembly 支持** 部分的内容。 | - |
| 引擎原生代码分包 | 将引擎的 WASM/Asm.js 代码放入子包，减少包体。| - |
| 启用 WASM Brotli 压缩 | 开启此选项会减少 WASM 模块大小，但会略微增加加载时的解压时间，根据需要开启 | - |

### 构建选项

| 构建选项 | 说明 | 字段名（用于命令行发布） |
| :--- | :--- | :--- |
| 设备方向 | 可选值包括 **Portrait** 和 **Landscape**。构建时会写入到发布包目录下的 `game.json` 文件中。| `orientation` |
| AppID | 微信小游戏的 AppID，必填项，面板中默认的 `wx6ac3f5090a6b99c5` 仅用于测试。构建时会写入到发布包目录下的 `project.config.json` 文件中。| `appid` |
| 生成开放数据域工程模板 | 用于接入开放数据域，详情请参考 [开放数据域](./build-open-data-context.md)。 | `buildOpenDataContextTemplate` |
| 引擎原生代码分包 | 将引擎的 WASM/Asm.js 代码模块放入小游戏分包，减少主包包体。| - |
| 分离引擎 | 是否使用微信小游戏引擎插件，详情请参考 [启用微信小游戏引擎插件](./wechatgame-plugin.md)。 | `separateEngine` |
| 高性能模式 | 是否开启微信的高性能模式 <br> 请参考 [高性能模式](https://developers.weixin.qq.com/minigame/dev/guide/performance/perf-high-performance.html) 获取更多信息 | - |

## 微信小游戏的资源管理

在微信小游戏环境中，资源管理是最特殊的部分，它和浏览器的不同包括以下几点：

- 小游戏的主包体积不能超过 4MB，包含所有代码和资源，额外的资源必须通过网络请求下载。<br>当包体过大时，可在 **构建发布** 面板配置 **资源服务器地址** 选项，将资源上传到远程服务器，详情请参考 [上传资源到远程服务器](../../asset/cache-manager.md)。
- 对于小游戏包内资源，小游戏环境内并不是按需加载的，而是一次性加载所有包内资源，然后再启动页面。
- 不可以从远程服务器下载脚本文件。

这里引出了两个关键的问题：

1. 远程资源的下载、缓存及版本管理，这部分内容 Creator 已经帮开发者做好了，详情请参考 [缓存管理器](../../asset/cache-manager.md)。

2. 首场景的加载速度。当主包资源放到远程服务器上时，如果要提高初始场景的加载速度，可以在构建时勾选 **构建发布** 面板中的 **初始场景分包** 选项。<br>
构建完成后，初始场景及其相关的依赖资源会被构建到发布包目录下的 `assets/start-scene` bundle 中。这个 bundle 不会放到远程服务器上，而是放在本地，引擎在启动阶段时就会自动从本地包内加载这个 bundle，从而加快初始场景的加载速度。

## 分包加载

微信小游戏的分包加载请参考 [小游戏分包](subpackage.md)

## 平台 SDK 接入

除了纯游戏内容以外，其实微信小游戏环境还提供了非常强大的原生 SDK 接口，其中最重要的就是用户、社交、支付等，这些接口都是仅存在于微信小游戏环境中的，等同于其他平台的第三方 SDK 接口。这类 SDK 接口的移植工作在现阶段还是需要开发者自己处理。下面列举一些微信小游戏所提供的强大 SDK 能力：

1. 用户接口：登陆，授权，用户信息等
2. 微信支付
3. 转发以及获得转发信息
4. 文件上传下载
5. 媒体：图片、录音、相机等
6. 其他：位置、设备信息、扫码、NFC、等等

## WebAssembly 支持

> **注意**：该部分内容在 v3.3.1 有较大的改动，v3.3.0 的内容请在页面右上角切换旧版本文档（例如 v3.2）查看。

从 Cocos Creator 3.0 开始，微信小游戏的构建选项中新增了 **Wasm 3D 物理系统（基于 `ammo.js`）**，当编辑器主菜单的 **项目 -> 项目设置 -> 功能裁剪 -> 3D -> 物理系统** 设置为 **bullet（ammo.js）** 时生效。

**Wasm 3D 物理系统** 默认开启，构建时会自动打包 `wasm` 模式的代码。若不开启则使用 `js` 模式。

> **注意**：
> 1. 微信小游戏引擎插件目前仅支持 `js` 模式。
> 2. 微信 WebAssembly 要求微信版本为 v7.0.17 及以上。
> 3. 微信 WebAssembly 要求微信开发者工具的调试基础库为 v2.12.0 及以上。

## 微信小游戏的限制

微信小游戏不支持 WebView。

## 参考链接

- [微信小游戏开发文档](https://developers.weixin.qq.com/minigame/dev/guide/)
- [微信公众平台](https://mp.weixin.qq.com/)
- [小游戏 API 文档](https://developers.weixin.qq.com/minigame/dev/api/)
- [微信开发者工具下载](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
- [微信开发者工具文档](https://developers.weixin.qq.com/miniprogram/dev/devtools/devtools.html)
