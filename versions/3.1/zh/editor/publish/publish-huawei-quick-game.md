# 发布到华为快游戏

## 环境配置

- 下载 [华为快应用加载器](https://developer.huawei.com/consumer/cn/doc/Tools-Library/quickapp-ide-download-0000001101172926#section9347192715112)，并安装到华为手机上（建议 Android Phone 6.0 或以上版本）

- PC 端全局安装 [nodejs-8.1.4](https://nodejs.org/zh-cn/download/) 或以上版本

## 发布流程

使用 Cocos Creator 打开需要发布的项目工程，从 **菜单栏 -> 项目** 中打开 **构建发布** 面板。在 **构建发布** 面板的 **发布平台** 中选择 **华为快游戏**。

![build](./publish-huawei-quick-game/build.png)

通用构建选项的设置请参考 [通用构建选项](build-options.md)，华为快游戏特有的构建选项如下：

![huawei-options](./publish-huawei-quick-game/huawei-build.png)

| 构建选项 | 可选 | 说明 | 字段名（用于命令行发布）|
| :----- | :-- | :-- | :-- |
| 初始场景分包 | 可选项 | 勾选后，首场景及其相关的依赖资源会被构建到发布包目录 `assets` 下的内置 Asset Bundle — [start-scene](../../asset/bundle.md#%E5%86%85%E7%BD%AE-asset-bundle) 中，提高初始场景的资源加载速度。 | `startSceneAssetBundle` |
| 资源服务器地址 | 可选项 | 若 **不填写** 该项，则发布包目录下的 `remote` 文件夹将会被打包到构建后生成的 rpk 包中。<br>若 **填写**，则不会打包进 rpk。开发者需要在构建后手动将发布包目录下的 `remote` 文件夹上传到所填写的资源服务器地址上，详情请参考 [上传资源到远程服务器](../../asset/cache-manager.md)。 | `remoteServerAddress` |
| 游戏包名 | 必填项 | 确保与原生应用的包名不一致，由 **数字**、**字母**、**.** 组成。必须以字母开头，以数字或字母结尾，同时必须包含 **.**，长度不能超过 255 字节。例如 `com.example.demo` | `package` |
| 桌面图标 | 必填项 | 点击输入框后面的放大镜图标按钮选择所需的图标。构建时，图标将会被构建到华为快游戏的 rpk 中。桌面图标建议使用 png 图片。 | icon |
| 游戏版本名称 | 必填项 | 游戏版本名称是真实的版本，如：1.0.0 | `versionName` |
| 游戏版本号 | 必填项 | **游戏版本号** 与 **游戏版本名称** 不同，**游戏版本号** 主要用于区别版本更新。每次提交审核时游戏版本号都要比上次提交审核的值至少 +1，一定不能等于或者小于上次提交审核的值，建议每次提交审核时游戏版本号递归 +1<br>**注意**：**游戏版本号** 必须为正整数。 | `versionCode` |
| 支持的最小平台版本号 | 必填项 | 用于兼容性检查，避免上线后在低版本平台运行导致不兼容。根据华为快游戏的要求目前这个值必须大于或等于 1035。 | `minPlatformVersion` |
| 自定义 manifest 文件路径 | 可选项 | 华为快游戏扩展功能。使用时需要选择 json 文件，文件中的数据类型要求为 json 格式。<br>**注意**：当 json 数据的 key 值为 `package`、`appType`、`name`、`versionName`、`versionCode`、`icon`、`minPlatformVersion`、`config`、`display` 时不可用。否则在构建时会被 **应用包名**、**应用名称**、**应用图标**、**应用版本号**、**应用版本名称** 等数据覆盖。 | `manifestPath` |
| 屏幕方向 | 可选项 | 可选值包括 `landscape` 和 `portrait`。构建后会写入到发布包目录下的 `manifest.json` 中。| `deviceOrientation` |
| 是否全屏 | 可选项 | 若勾选，则应用运行后处于全屏模式，全屏模式下状态栏也会被覆盖。 | `fullScreen` |
| logLevel | 可选项 | 日志等级 | `logLevel` |
| 密钥库 | 可选项 | 若勾选该项，表示构建 rpk 包时默认使用的是 Creator 自带的证书，仅用于 **调试** 时使用。若 rpk 包要用于提交审核，则构建时不要勾选该项。<br> 若不勾选该项，则需要手动配置签名证书。| `useDebugKey` |
| certificate.pem 路径<br>private.pem 路径 | 可选项 | 如果不勾选 **密钥库**，则需要配置签名文件 **certificate.pem 路径** 和 **private.pem 路径**，此时构建后生成的是可以 **直接发布** 的 rpk 包。可通过输入框右边的放大镜图标按钮来选择对应的签名文件，或者也可以参考下方的 **生成签名文件**。<br>**注意**：这两个签名文件建议不要放在发布包 `build/huawei-quick-game` 目录下，否则每次构建时都会清空该目录，导致文件丢失。| `privatePemPath`、`certificatePemPath` |

- **生成签名文件**

    有以下两种方式可以生成签名文件：

    - 通过 **构建发布** 面板 **certificate.pem 路径** 后的 **新建** 按钮生成

    - 通过命令行生成 release 签名

        用户需要通过 openssl 命令等工具生成签名文件 private.pem、certificate.pem。

        ```bash
        # 通过 openssl 命令工具生成签名文件
        openssl req -newkey rsa:2048 -nodes -keyout private.pem -x509 -days 3650 -out certificate.pem
        ```

        > **注意**：openssl 工具在 linux 或 Mac 环境下可在终端直接打开。而在 Windows 环境下则需要安装 openssl 工具并且配置系统环境变量，配置完成后需重启 Creator。

### 构建

**构建发布** 面板的构建选项设置完成后，点击 **构建并生成** 按钮。<br>
完成后点击 **构建任务** 左下角的文件夹图标按钮打开项目发布包，可以看到在默认发布路径 `build` 目录下生成了 `huawei-quick-game`（以具体的构建任务名为准）文件夹，该文件夹就是导出的华为快游戏工程目录和 rpk，rpk 包在 `build/huawei-quick-game/dist` 目录下。

![package](./publish-huawei-quick-game/package.png)

若需要修改生成的 rpk 包，在修改完成后点击 **构建任务** 右下角的 **生成** 按钮，即可在不重新构建的情况下重新生成 rpk 包。

## 将打包出来的 rpk 运行到手机上

将打包出来的 rpk 运行到手机上有以下两种方式：

1. 点击 **构建任务** 右下角的 **调试** 按钮，会弹出一个 **快游戏调试工具** 面板。在 **手机列表** 栏目选择手机（如果连接了多台手机），然后在 **快游戏调试工具** 栏点击 **运行** 按钮。

    这时 rpk 会被推送到之前在手机上已安装完成的 **华为快应用加载器** 上（如有读写等权限弹出请允许），即可在手机上打开 rpk。

    ![play](./publish-huawei-quick-game/play.png)

2. 将构建生成的 rpk 包拷贝到手机内部存储目录下。然后在手机上打开 **华为快应用加载器** 后，点击手机的返回键会弹出一个列表，选择第一个选项 **本地安装**，选择路径为放置 rpk 的路径，即可将 rpk 运行到手机上。

## 分包 rpk

分包加载，即把游戏内容按一定规则拆分在几个包里，在首次启动的时候动的消耗时间。

若要使用该功能需要在 Creator 编辑器中配置 [小游戏分包](subpackage.md)，设置完成后在构建时就会自动分包。构建完成后，会在 `build/huawei-quick-game/dist` 目录下生成 **.rpk** 文件。

> **注意**：目前华为快游戏不支持同时下载多个分包，需只下载必要的包，这个必要的包称为 **主包**，开发者可以在主包内触发下载其他子包，这样可以有效降低首次启要下载多个分包时请按顺序下载。

## 华为快游戏环境的资源管理

华为快游戏与微信小游戏类似，都存在着包体限制, 华为快游戏允许上传的代码包总大小为 **10MB**，超过的部分必须通过网络请求下载。

当包体过大时，可在 **构建发布** 面板配置 **资源服务器地址** 选项，将低加载优先级的资源上传到远程服务器，详情请参考 [上传资源到远程服务器](../../asset/cache-manager.md)。

游戏启动之后引擎会自动下载远程服务器地址中的资源，资源下载后引擎的缓存管理器会记录资源的保存路径，用于在缓存空间不足时自动删除部分缓存的游戏资源。请参考 [缓存管理器](../../asset/cache-manager.md)。
## 相关参考链接

[华为快游戏开发文档](https://developer.huawei.com/consumer/cn/doc/quickApp-Guides/quickgame-dev-runtimegame-guide-0000001159778255)
