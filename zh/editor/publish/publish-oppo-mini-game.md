# 发布到 OPPO 小游戏

## 环境配置

- 下载 [OPPO 小游戏调试器](https://cdofs.oppomobile.com/cdo-activity/static/201810/26/quickgame/documentation/#/games/use)，并安装到 Android 设备上（建议 Android Phone 6.0 或以上版本）

- 全局安装 [nodejs-8.1.4](https://nodejs.org/zh-cn/download/) 或以上版本

- 根据用户自己的开发需求判断是否需要安装 [调试工具](https://cdofs.oppomobile.com/cdo-activity/static/201810/26/quickgame/documentation/games/use.html)。

## 构建参数介绍

一些通用的构建通用参数介绍，请参考 [通用构建参数介绍](build-options.md)。

选项名 | 可选 | 默认值 | 说明 | 字段名
| - | - | - | - | -
初始场景分包 | - | false | 勾选后，首场景及其相关的依赖资源会被构建到发布包目录 assets 下的内置 Asset Bundle — [start-scene](../../asset/bundle.md#内置-Asset-Bundle) 中，提高初始场景的资源加载速度。 | startSceneAssetBundle
资源服务器地址 | - | - | 若 **不填写** 该项，则发布包目录下的 `remote` 文件夹将会被打包到构建出来的 rpk 包中。填写则不会打包进 rpk,开发者需要在构建后手动将发布包目录下的 `remote` 文件夹上传到所填写的资源服务器地址上。具体的资源管理细节，请参考资源管理部分。 | remoteServerAddress
游戏包名 | 必填 | (项目名称) | 游戏包名，例如 com.example.demo | package
桌面图标 | 必填 | (Cocos Logo) | 桌面图标路径 | icon
应用版本名称 | 必填 | (Cocos 版本号) | 应用版本名称 是真实的版本，如：1.0.0 | versionName
应用版本号 | 必填 | 1201 | 纯数字，应用版本号，从 1 自增，每次重新上传包时务必 versionCode+1，否则将影响上架版本的更新。例如原版本为11，更新版本的 versionCode 需要为12。 | versionCode
支持的最小平台版本号 | 必填 | 1035 | 支持的最小平台版本号，原理同Android API Level。用于兼容性检查，避免上线后在低版本平台运行导致不兼容。游戏设定值必须大于等于 1035。 | minPlatformVersion
屏幕方向 | - | landscape | 设备方向，填写后将会写入在 `manifest.json` 内。| deviceOrientation
使用调试密钥库 | - | true |  勾选 **使用调试密钥库** 时，表示默认使用的是 Creator 自带的证书构建 rpk 包，仅用于 **调试** 时使用，用于提交审核时则构建时不要勾选该项。| useDebugKey
密钥证书路径 | - | - | 密钥库证书，上架华为应用市场的快游戏，必须使用 release 版本的证书做签名，同时在华为开发者联盟后台配置证书指纹。具体可以参考下面的 [生成签名文件](###生成签名文件) | privatePemPath、certificatePemPath

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
    >
## 将构建出来的 rpk 运行到手机上

将构建生成的小游戏 rpk 包（ dist 目录中）拷贝到手机 SD 卡的 **/sdcard/games/** 目录。然后在 Android 设备上打开之前已经安装完成的 **OPPO 小游戏调试器**，点击 **OPPO 小游戏** 栏目，然后找到填写游戏名相对应的图标即可，如没有发现，可点击右上角的更多按钮-刷新按钮进行刷新。

**注意：OPPO 小游戏调试器为 V3.2.0 及以上的需要将准备好的 rpk 拷贝到手机 sdcard 的 Android/data/com.nearme.instant.platform/files/games 中, 无 games 目录则需新建**

![](./oppo-mini-game/rpk_games.jpg)

## OPPO 小游戏环境的资源管理

OPPO 小游戏与微信小游戏类似，都存在着包体限制, OPPO 的主包包体限制是 **10MB**，超过的部分必须通过网络请求下载。

Cocos Creator 已经帮开发者做好了远程资源的下载、缓存和版本管理，详情请参考 [资源管理](../../asset/cache-manager.md#资源下载流程)。

## 分包加载

构建完成后，分包 rpk 在 dist 目录下。<br>
这时需要在 Android 设备的 **sdcard** 目录下，新建一个 **subPkg** 目录，然后把 dist 目录下的 **.rpk** 文件拷贝到 subPkg 目录中。<br>
然后切换到 **OPPO 小游戏调试器** 的 **分包加载** 栏目，点击右上方的刷新即可看到分包的游戏名称，点击 **秒开** 即可跟正常打包的 rpk 一样使用。

![](./oppo-mini-game/run_subpackage.jpg)

**注意**：

1. 分包 rpk 需要拷贝到 Android 设备的 **/sdcard/subPkg/** 目录，未分包的 rpk 需要拷贝到 Android 设备的 **/sdcard/games/** 目录，两者不可混用。

> 注意：OPPO 小游戏调试器为 V3.2.0 及以上的需要将准备好的 rpk 拷贝到手机 sdcard 的 Android/data/com.nearme.instant.platform/files/subPkg 中, 无 subPkg 目录则需新建

2. **快应用 & vivo 小游戏调试器** 从 **1051** 版本开始支持 vivo 小游戏分包加载。低于 1051 的版本虽然不支持分包加载，但是也做了兼容处理，如果使用了分包也不会影响游戏正常运行。具体可参考 [vivo 分包加载-运行时兼容](https://minigame.vivo.com.cn/documents/#/lesson/base/subpackage?id=%e8%bf%90%e8%a1%8c%e6%97%b6%e5%85%bc%e5%ae%b9)。

## 相关参考链接

- [OPPO 小游戏调试说明](https://cdofs.oppomobile.com/cdo-activity/static/201810/26/quickgame/documentation/games/debug.html)
- [OPPO 小游戏教程](https://cdofs.oppomobile.com/cdo-activity/static/201810/26/quickgame/documentation/games/quickgame.html)
- [OPPO 小游戏 API 文档](https://cdofs.oppomobile.com/cdo-activity/static/201810/26/quickgame/documentation/feature/account.html)
- [OPPO 小游戏工具下载](https://cdofs.oppomobile.com/cdo-activity/static/201810/26/quickgame/documentation/games/use.html)
