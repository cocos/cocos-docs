# 发布到 OPPO 小游戏

## 环境配置

- 下载 [OPPO 小游戏调试器](https://activity-cdo.heytapimage.com/cdo-activity/static/201810/26/quickgame/documentation/#/games/use?id=_2-%e5%ae%89%e8%a3%85-runtimeapk-%e5%8c%85%e5%88%b0-oppo-%e6%89%8b%e6%9c%ba%e4%b8%8a)，并安装到 OPPO 手机上（建议 Android Phone 6.0 或以上版本）

- 全局安装 [nodejs-8.1.4](https://nodejs.org/zh-cn/download/) 或以上版本

## 发布流程

使用 Cocos Creator 打开需要发布的项目工程，从 **菜单栏 -> 项目** 中打开 **构建发布** 面板，**发布平台** 选择 **OPPO 小游戏**。

![build](./publish-oppo-mini-games/oppo-build.png)

通用构建选项的设置请参考 [通用构建选项](build-options.md)，OPPO 小游戏特有的构建选项如下：

![build option](./publish-oppo-mini-games/build-option.png)

| 构建选项 | 可选 | 说明 | 字段名（用于命令行发布） |
| :------ | :--- | :--- | :--- |
| **初始场景分包** | 可选项 | 勾选后，首场景及其相关的依赖资源会被构建到发布包目录 `assets` 下的内置 Asset Bundle — [start-scene](../../asset/bundle.md#%E5%86%85%E7%BD%AE-asset-bundle) 中，提高初始场景的资源加载速度。 | `startSceneAssetBundle` |
| **资源服务器地址** | 可选项 | 该项用于填写资源存放在服务器上的地址。<br>若 **不填写** 该项，则发布包目录下的 `remote` 文件夹会被打包到构建出来的 rpk 包中。<br>若 **填写** 该项，则不会打包到 rpk 包中，开发者需要在构建后手动将发布包目录下的 `remote` 文件夹上传到所填写的资源服务器地址上。详情请参考 [上传资源到远程服务器](../../asset/cache-manager.md)。 | `remoteServerAddress` |
| **游戏包名** | 必填项 | 游戏包名，根据开发者的需求进行填写，例如 `com.example.demo`。 | `package` |
| **桌面图标** | 必填项 | 点击输入框后面的放大镜图标按钮选择所需的图标。构建时，图标将会被构建到 OPPO 小游戏的工程中。桌面图标建议使用 **png** 图片。 | `icon` |
| **游戏版本名称** | 必填项 | 游戏版本名称是真实的版本，如：1.0.0 | `versionName` |
| **游戏版本号** | 必填项 | **游戏版本号** 与 **游戏版本名称** 不同，**游戏版本号** 主要用于区别版本更新。每次提交审核时游戏版本号都要比上次提交审核的值至少 +1，一定不能等于或者小于上次提交审核的值，建议每次提交审核时游戏版本号递归 +1。<br>**注意**：**游戏版本号** 必须为正整数。 | `versionCode` |
| **支持的最小平台版本号** | 必填项 | 推荐使用 **1060**。该项用于兼容性检查，避免游戏上线后在低版本平台运行不兼容。具体内容可点击 [使用说明](https://cdofs.oppomobile.com/cdo-activity/static/201810/26/quickgame/documentation/#/games/use) 查看。 | `minPlatformVersion` |
| **屏幕方向** | 必填项 | 设备方向，可选值包括 `landscape` 和 `portrait`。构建时会写入到发布包目录下的 `manifest.json` 中。| `deviceOrientation` |
| **分离引擎** | 可选项 | 该功能是通过共享全局引擎，来减少每个小游戏的首包大小。启用后，如果引擎在手机中已有缓存，首包下载时将会自动剔除引擎文件。如果手机中没有缓存，将会加载完整首包，完整首包内会包含完整的引擎文件  | `separateEngine` |
| **密钥库** | - | 若勾选该项，表示构建 rpk 包时默认使用的是 Creator 自带的证书，仅用于 **调试** 时使用。若 rpk 包要用于提交审核，则构建时不要勾选该项。<br> 若不勾选该项，则需要手动配置签名证书。| `useDebugKey` |
| **certificate.pem 路径**<br>**private.pem 路径** | - | 如果不勾选 **密钥库**，则需要配置签名文件 **certificate.pem 路径** 和 **private.pem 路径**，此时构建后生成的是可以 **直接发布** 的 rpk 包。开发者可通过输入框右边的放大镜图标按钮来配置两个签名文件，或者也可以参考下方的 **生成签名文件**。<br>**注意**：这两个签名文件建议不要放在发布包 `build/oppo-mini-game` 目录下，否则每次构建时都会清空该目录，导致文件丢失。 | `privatePemPath`、`certificatePemPath` |

- **生成签名文件**

    有以下两种方式可以生成签名文件：

    - 通过 **构建发布** 面板 **certificate.pem 路径** 后的 **新建** 按钮生成

    - 通过命令行生成 release 签名

        开发者需要通过 openssl 命令等工具生成签名文件 `private.pem`、`certificate.pem`。

        ```bash
        # 通过 openssl 命令工具生成签名文件
        openssl req -newkey rsa:2048 -nodes -keyout private.pem -x509 -days 3650 -out certificate.pem
        ```

        > **注意**：openssl 工具在 linux 或 Mac 环境下可在终端直接打开。而在 Windows 环境下则需要安装 openssl 工具并且配置系统环境变量，配置完成后需重启 Creator。

### 构建

**构建发布** 面板的构建选项设置完成后，点击 **构建并生成** 按钮。<br>
完成后点击 **构建任务** 左下角的文件夹图标按钮打开项目发布包，可以看到在默认发布路径 `build` 目录下生成了 `oppo-mini-game`（以具体的构建任务名为准）文件夹，该文件夹就是导出的 OPPO 小游戏工程目录和 rpk，rpk 包在 `build/oppo-mini-game/dist` 目录下。

![package](./publish-oppo-mini-games/package.png)

若需要修改生成的 rpk 包，在修改完成后点击 **构建任务** 右下角的 **生成** 按钮，即可在不重新构建的情况下重新生成 rpk 包。

### 将构建出来的 rpk 运行到手机上

1. 将构建生成的小游戏 rpk 包（dist 目录中）拷贝到手机的 `/内部存储/games` 目录。

2. 在 OPPO 手机上打开之前已经安装完成的 **OPPO 小游戏调试器**，点击 **OPPO 小游戏** 栏目，然后找到填写游戏名相对应的图标即可，如果没有发现，可点击右上角的 **更多 -> 刷新** 按钮进行刷新。

    ![rpk games](./publish-oppo-mini-games/rpk_games.jpg)

> **注意**：
>
> 1. OPPO 小游戏调试器为 **v3.2.0** 及以上的需要将准备好的 rpk 拷贝到手机的 `/内部存储/Android/data/com.nearme.instant.platform/files/games` 中，如果没有 games 目录则需新建。具体内容可点击 [使用说明 — 新建目录](https://cdofs.oppomobile.com/cdo-activity/static/201810/26/quickgame/documentation/#/games/use?id=_3-%e6%96%b0%e5%bb%ba%e7%9b%ae%e5%bd%95) 查看。
>
> 2. 若使用了分包加载，则分包 rpk 需要拷贝到手机的 `/内部存储/subPkg` 目录下。同样的，若使用的 OPPO 小游戏调试器为 **v3.2.0** 及以上的，则需要将分包 rpk 拷贝到手机的 `/内部存储/Android/data/com.nearme.instant.platform/files/subPkg` 中。详情请参考下文 **分包加载** 部分的内容。

## 分包加载

分包加载，即把游戏内容按一定规则拆分成几个包，在首次启动的时候只下载必要的包，这个必要的包称为 **主包**，开发者可以在主包内触发下载其他子包，这样可以有效降低首次启动的消耗时间。若要使用该功能需要在 Creator 中设置 [小游戏分包](subpackage.md)，设置完成后构建时就会自动分包。

构建完成后，分包的目录在 `build/oppo-mini-game/dist` 目录下。<br>
这时需要在 OPPO 手机的内部存储目录下新建一个 `subPkg` 目录，然后把 `build/oppo-mini-game/dist` 目录下的 **.rpk** 文件拷贝到 `subPkg` 目录中。

然后切换到 **OPPO 小游戏调试器** 的 **分包加载** 栏目，点击右上方的刷新即可看到分包的游戏名称，点击 **秒开** 即可跟正常打包的 rpk 一样使用。

![run subpackage](./publish-oppo-mini-games/run_subpackage.jpg)

分包 rpk 需要拷贝到 OPPO 手机的 `/内部存储/subPkg` 目录，未分包的 rpk 需要拷贝到 OPPO 手机的 `/内部存储/games` 目录，两者不可混用。

> **注意**：OPPO 小游戏调试器为 **v3.2.0** 及以上的，需要将分包 rpk 拷贝到手机的 `/内部存储/Android/data/com.nearme.instant.platform/files/subPkg` 目录，如果没有 subPkg 目录则需新建。而未分包的 rpk 则是拷贝到手机的 `/内部存储/Android/data/com.nearme.instant.platform/files/games` 目录，两者同样不可混用。

更多内容请参考 [OPPO 小游戏 — 分包加载](https://activity-cdo.heytapimage.com/cdo-activity/static/201810/26/quickgame/documentation/#/subpackage/subpackage)。

## OPPO 小游戏环境的资源管理

OPPO 小游戏与微信小游戏类似，都存在着包体限制。OPPO 小游戏的主包包体限制是 **4MB**，超过的部分必须通过网络请求下载。<br>当包体过大时，可在 **构建发布** 面板配置 **资源服务器地址** 选项，将资源上传到远程服务器，详情请参考 [上传资源到远程服务器](../../asset/cache-manager.md)。

我们建议用户只保存脚本文件在小游戏包内，其他资源都从远程服务器下载。Cocos Creator 已经帮用户做好了远程资源的下载、缓存和版本管理，详情请参考 [缓存管理器](../../asset/cache-manager.md)。

## 相关参考链接

- [OPPO 开放平台](https://open.oppomobile.com/wiki/doc#id=10445)
- [OPPO 小游戏教程](https://activity-cdo.heytapimage.com/cdo-activity/static/201810/26/quickgame/documentation/#/games/quickgame)
- [OPPO 小游戏 API 文档](https://activity-cdo.heytapimage.com/cdo-activity/static/201810/26/quickgame/documentation/#/feature/account)
- [OPPO 小游戏工具下载](https://activity-cdo.heytapimage.com/cdo-activity/static/201810/26/quickgame/documentation/#/games/use)
- [OPPO 小游戏使用说明 — 新建目录](https://activity-cdo.heytapimage.com/cdo-activity/static/201810/26/quickgame/documentation/#/games/use?id=_3-%e6%96%b0%e5%bb%ba%e7%9b%ae%e5%bd%95)
