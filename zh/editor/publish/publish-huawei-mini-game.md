# 发布到华为快游戏平台

## 环境配置

- 下载 [华为快应用加载器](https://developer.huawei.com/consumer/cn/doc/development/quickApp-Guides/quickapp-installtool)，并安装到 Android 设备上（建议 Android Phone 6.0 或以上版本）

- PC 端全局安装 [nodejs-8.1.4](https://nodejs.org/zh-cn/download/) 或以上版本

## 构建参数介绍

一些通用的构建通用参数介绍，请参考 [通用构建参数介绍](build-options.md)。

| 选项名 | 可选 | 默认值 | 说明 | 字段名 |
| :-- | :-- | :-- | :-- | :-- |
| 初始场景分包 | - | false | 勾选后，首场景及其相关的依赖资源会被构建到发布包目录 assets 下的内置 Asset Bundle — [start-scene](../../asset/bundle.md#%E5%86%85%E7%BD%AE-asset-bundle) 中，提高初始场景的资源加载速度。 | startSceneAssetBundle |
| 资源服务器地址 | - | - | 若 **不填写** 该项，则发布包目录下的 `remote` 文件夹将会被打包到构建出来的 rpk 包中。填写则不会打包进 rpk,开发者需要在构建后手动将发布包目录下的 `remote` 文件夹上传到所填写的资源服务器地址上。具体的资源管理细节，请参考资源管理部分。 | remoteServerAddress |
| 游戏包名 | 必填 | (项目名称) | 游戏包名，确保与原生应用的包名不一致，由数字、字母、"."组成，必须以字母开头，以数字或字母结尾，同时必须包含"."，长度不能超过255字节。例如 com.example.demo | package
| 桌面图标 | 必填 | (Cocos Logo) | 桌面图标路径 | icon |
| 应用版本名称 | 必填 | (Cocos 版本号) | 应用版本名称 是真实的版本，如：1.0.0 | versionName
| 应用版本号 | 必填 | 1201 | 纯数字，应用版本号，从 1 自增，每次重新上传包时务必 versionCode+1，否则将影响上架版本的更新。例如原版本为11，更新版本的 versionCode 需要为 12。 | versionCode |
| 支持的最小平台版本号 | 必填 | 1035 | 支持的最小平台版本号，原理同Android API Level。用于兼容性检查，避免上线后在低版本平台运行导致不兼容。游戏设定值必须大于等于 1035。 | minPlatformVersion
| 自定义 manifest 文件路径 | - | - | 该项为选填项。为华为快游戏扩展功能。使用时需要选择 json 文件，文件中的数据类型要求为 json 格式。注意：当 json 数据的 key 值为 `package、appType、name、versionName、versionCode、icon、minPlatformVersion、config、display` 时不可用。否则在构建时会被 应用包名、应用名称、应用图标、应用版本号、应用版本名称 等数据覆盖。 | manifestPath |
| 屏幕方向 | - | landscape | 设备方向，填写后将会写入在 `manifest.json` 内。| deviceOrientation |
| 是否全屏 | - | true | 是否是全屏模式，全屏模式下状态栏也会被覆盖。 | fullScreen |
| logLevel | - | 'log' | 日志等级 | logLevel |
| 使用调试密钥库 | - | true |  勾选 **使用调试密钥库** 时，表示默认使用的是 Creator 自带的证书构建 rpk 包，仅用于 **调试** 时使用，用于提交审核时则构建时不要勾选该项。| useDebugKey |
| 密钥证书路径 | - | - | 密钥库证书，上架华为应用市场的快游戏，必须使用 release 版本的证书做签名，同时在华为开发者联盟后台配置证书指纹。具体可以参考下面的 [生成签名文件](###生成签名文件) | privatePemPath、certificatePemPath |

### 生成签名文件

有以下两种方式可以生成签名文件：

- 通过 **构建发布** 面板 **certificate.pem 路径** 后的 **新建** 按钮生成

- 通过命令行生成 release 签名

    用户需要通过 openssl 命令等工具生成签名文件 private.pem、certificate.pem。

    ```bash
    # 通过 openssl 命令工具生成签名文件
    openssl req -newkey rsa:2048 -nodes -keyout private.pem -x509 -days 3650 -out certificate.pem
    ```

    > **注意**：openssl 工具在 linux 或 Mac 环境下可在终端直接打开。而在 Windows 环境下则需要安装 openssl 工具并且配置系统环境变量，配置完成后需重启 Creator。

## 华为快游戏环境的资源管理

华为快小游戏与微信小游戏类似，都存在着包体限制, 华为快游戏允许上传的代码包总大小为 **10MB**，超过的部分必须通过网络请求下载。

Cocos Creator 已经帮开发者做好了远程资源的下载、缓存和版本管理，详情请参考 [资源管理](../../asset/cache-manager.md#资源下载流程)。

## 运行测试快游戏

构建后的游戏包就是导出的华为快游戏工程目录，rpk 包在对应文件夹的 **dist** 目录下。

目前仅支持手动拷贝到手机上运行。将构建生成的 rpk 包拷贝到手机 sdcard 目录下。然后在手机上打开 **华为快应用加载器** 后，点击手机的返回键会弹出一个列表，选择第一个选项 **本地安装**，选择路径为放置 rpk 的路径，即可将 rpk 运行到手机上。

## 分包 rpk

分包 rpk 是根据开发者的需求选择是否使用。分包加载，即把游戏内容按一定规则拆分在几个包里，在首次启动的时候只下载必要的包，这个必要的包称为 **主包**，开发者可以在主包内触发下载其他子包，这样可以有效降低首次启动的消耗时间。

若要使用该功能需要在 Creator 编辑器中配置 [小游戏分包](subpackage.md)，设置完成后在构建时就会自动分包。构建完成后，会在 `build/huawei-mini-game/dist` 目录下生成 **.rpk** 文件。

> **注意**：目前华为不支持同时下载多个分包，需要下载多个分包时请按顺序下载。

## 相关参考链接

[华为快游戏开发文档](https://developer.huawei.com/consumer/cn/doc/development/quickApp-Guides/quickgame-develop-runtime-game)
