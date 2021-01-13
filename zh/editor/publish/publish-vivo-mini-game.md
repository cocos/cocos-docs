# 发布到 vivo 小游戏

## 环境配置

- 下载 [快应用 & vivo 小游戏调试器](https://minigame.vivo.com.cn/documents/#/lesson/base/environment?id=%E5%AE%89%E8%A3%85vivo%E5%B0%8F%E6%B8%B8%E6%88%8F%E8%B0%83%E8%AF%95%E5%99%A8) 和 [vivo 小游戏引擎](https://minigame.vivo.com.cn/documents/#/lesson/base/environment?id=%E5%AE%89%E8%A3%85vivo%E5%B0%8F%E6%B8%B8%E6%88%8F%E5%BC%95%E6%93%8E)，并安装到 Android 设备上（建议 Android Phone 6.0 或以上版本）

- 全局安装 [nodejs-8.9.0](https://nodejs.org/zh-cn/download/) 或以上版本

    **注意**：安装 nodejs 后，需要注意 npm 源地址是否为 <https://registry.npmjs.org/>

    ```bash
    # 查看当前 npm 源地址
    npm config get registry
    # 若不是，重新设置 npm 源地址
    npm config set registry https://registry.npmjs.org/
    ```

- 全局安装 vivo-minigame/cli。确定 npm 源地址后，安装 `vivo-minigame/cli`：

    ```bash
    npm install -g @vivo-minigame/cli
    ```

    若 `vivo-minigame/cli` 安装失败，可能是因为 nodejs 版本过低导致的，请检查 node 版本并升级。

## 构建参数介绍

一些通用的构建通用参数介绍，请参考 [通用构建参数介绍](build-options.md)。

| 选项名 | 可选 | 默认值 | 说明 | 字段名 |
| :-- | :-- | :-- | :-- | :-- |
| 初始场景分包 | - | false | 勾选后，首场景及其相关的依赖资源会被构建到发布包目录 assets 下的内置 Asset Bundle — [start-scene](../../asset/bundle.md#%E5%86%85%E7%BD%AE-asset-bundle) 中，提高初始场景的资源加载速度。 | startSceneAssetBundle |
| 资源服务器地址 | - | - | 若 **不填写** 该项，则发布包目录下的 `remote` 文件夹将会被打包到构建出来的 rpk 包中。填写则不会打包进 rpk,开发者需要在构建后手动将发布包目录下的 `remote` 文件夹上传到所填写的资源服务器地址上。具体的资源管理细节，请参考资源管理部分。 | remoteServerAddress | |
| 游戏包名 | 必填 | (项目名称) | 游戏包名，例如 com.example.demo | package |
| 桌面图标 | 必填 | (Cocos Logo) | 桌面图标路径 | icon
| 应用版本名称 | 必填 | (Cocos 版本号) | 应用版本名称 是真实的版本，如：1.0.0 | versionName |
| 应用版本号 | 必填 | 1201 | 纯数字，应用版本号，从 1 自增，每次重新上传包时务必 versionCode+1，否则将影响上架版本的更新。例如原版本为11，更新版本的 versionCode 需要为12。 | versionCode |
| 支持的最小平台版本号 | 必填 | 1035 | 支持的最小平台版本号，原理同Android API Level。用于兼容性检查，避免上线后在低版本平台运行导致不兼容。游戏设定值必须大于等于 1035。 | minPlatformVersion |
| 屏幕方向 | - | landscape | 设备方向，填写后将会写入在 `manifest.json` 内。| deviceOrientation |
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
    >

## vivo 打包工具

构建导出的 vivo 小游戏工程原始目录，并不是编译目录。打开编辑器安装目录下的 `resources/tools/vivo-pack-tools` 的文件夹，该文件夹内存放了 vivo 的本地打包工具，每次构建会将项目里的信息生成到这里构建出 rpk 后再拷贝会源目录，如果想要自行编译项目需要在该目录下进行。目前也在构建面板上新增了**编译**按钮，可以在构建完单独点击重新生成 rpk。

![](./vivo-mini-game/package.png)

并且在 /build/vivo-mini-game/dist 目录下会生成 rpk 包。

![](./vivo-mini-game/rpk.png)

使用编辑器上的编译按钮也可以重新生成 rpk

## 运行 rpk

有以下三种方式可将 rpk 运行到手机上：

- **方法一**：

    在 **构建发布** 面板点击 **运行** 按钮，等待二维码界面生成

    ![play](./vivo-mini-game/play.jpg)

    然后在 Android 设备上打开之前已经安装完成的 **快应用 & vivo 小游戏调试器**，点击 **扫码安装** 按钮直接扫描二维码即可打开 rpk。

    ![vivo instant scan install](./vivo-mini-game/vivo-instant_scan_install.jpg)

- **方法二**：

    将构建生成的小游戏 rpk 文件（位于打包出的小游戏工程目录下的 dist 目录中）拷贝到手机 sdcard 目录下。

    在 Android 设备上打开之前已经安装完成的 **快应用 & vivo 小游戏调试器**，点击 **本地安装**，然后从手机 sdcard 目录中找到 rpk 文件，选择打开即可。

    ![vivo instant native install](./vivo-mini-game/vivo-instant_native_install.jpg)

- **方法三**：

    利用 vivo 小游戏打包工具命令生成网址和二维码

    ```bash
    # 先把命令行指定到编辑器安装目录下的 resources/tools/vivo-pack-tools 目录下
    cd ${CocosCreator}/resources/tools/vivo-pack-tools
    # 生成网址和二维码
    npm run server
    ```

    然后在 Android 设备上打开之前已经安装完成的 **快应用 & vivo 小游戏调试器**

    最后点击 **扫码安装** 按钮，将第一步中生成的网址拷贝到浏览器，然后直接扫描网页上的二维码即可打开 rpk。

## 分包加载

vivo 小游戏的分包加载，用法与微信小游戏类似，详情请参考 [小游戏分包](subpackage.md)。

## vivo 小游戏环境的资源管理

vivo 小游戏超过包体大小限制的部分必须通过网络请求下载。

Cocos Creator 已经帮开发者做好了远程资源的下载、缓存和版本管理，详情请参考 [资源管理](../../asset/cache-manager.md#资源下载流程)。

## 参考链接

- [vivo 小游戏开发文档](https://minigame.vivo.com.cn/documents/#/lesson/base/start)
- [vivo 小游戏 API 文档](https://minigame.vivo.com.cn/documents/#/api/system/life-cycle)
- [快应用 & vivo 小游戏调试器下载](https://minigame.vivo.com.cn/documents/#/download/debugger)
