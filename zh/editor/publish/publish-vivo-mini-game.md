# 发布到 vivo 小游戏

## 环境配置

- 下载 [快应用 & vivo 小游戏调试器](https://minigame.vivo.com.cn/documents/#/lesson/base/environment?id=%E5%AE%89%E8%A3%85vivo%E5%B0%8F%E6%B8%B8%E6%88%8F%E8%B0%83%E8%AF%95%E5%99%A8) 和 [vivo 小游戏引擎](https://minigame.vivo.com.cn/documents/#/lesson/base/environment?id=%E5%AE%89%E8%A3%85vivo%E5%B0%8F%E6%B8%B8%E6%88%8F%E5%BC%95%E6%93%8E)，并安装到 Android 设备上（建议 Android Phone 6.0 或以上版本）

- 全局安装 [nodejs-8.9.0](https://nodejs.org/zh-cn/download/) 或以上版本

    **注意**：安装 nodejs 后，需要注意 npm 源地址是否为 https://registry.npmjs.org/

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

## 发布流程

一、使用 Cocos Creator 打开需要发布的项目工程，在 **构建发布** 面板的 **发布平台** 中选择 **vivo Mini Game**。

![](./vivo-mini-game/build_options.jpg)

相关参数配置具体的填写规则如下：

- **游戏包名**

  该项为必填项，根据用户的需求进行填写。

- **游戏名称**

  该项为必填项，是 vivo 小游戏的名称。

- **桌面图标**

  **桌面图标** 为必填项。点击输入框后面的按钮选择所需的图标。构建时，图标将会被构建到 vivo 小游戏的工程中。**桌面图标** 建议使用 **.png** 图片。

- **游戏版本名称**

  该项为必填项。**游戏版本名称** 是真实的版本，如：1.0.0

- **游戏版本号**

  该项为必填项。**游戏版本号** 与 **游戏版本名称** 不同，**游戏版本号** 主要用于区别版本更新。每次提交审核时应用版本号都要比上次提交审核的值至少 +1，一定不能等于或者小于上次提交审核的值，建议每次提交审核时应用版本号递归 +1。**注意**：**应用版本号** 必须为正整数。

- **支持的最小平台版本号**

  该项为必填项。具体填写值可通过点击 [更新记录](https://minigame.vivo.com.cn/documents/#/download/engine?id=%E6%9B%B4%E6%96%B0%E8%AE%B0%E5%BD%95%EF%BC%9A) 来查看最新的 vivo 引擎版本号。

- **小包模式**

  该项为选填项。小游戏的包内体积包含代码和资源不能超过 4M，资源可以通过网络请求加载。**小包模式** 就是帮助用户将脚本文件保留在小游戏包内，其他资源则上传到远程服务器，根据需要从远程服务器下载。而远程资源的下载、缓存和版本管理，Creator 已经帮用户做好了。用户需要做的是以下几个步骤：

  1. 构建时，勾选 **小包模式**，填写 **小包模式服务器路径**。
  
  2. **首屏游戏资源打包到游戏包**
  
      在小包模式下，由于首屏资源过多，下载和加载资源时间比较久，可能会导致首次进入游戏时出现短暂黑屏。如果在构建时勾选了 **首屏游戏资源打包到游戏包**，可以缩短首次进入游戏黑屏的时间。不过需要注意的是：res/import 资源暂不支持分割资源下载，整个 import 目录也会打包到首包。
  
      开发者可以根据自己的需要看是否勾选该项。然后点击 **构建**。

  3. 构建完成后，点击 **发布路径** 后面的 **打开** 按钮，将发布路径下的 **res** 目录上传到小包模式服务器。例如：默认发布路径是 build，构建任务名为 vivo-mini-game，则需要上传 /build/vivo-mini-game/res 目录。
  **注意**：如果是命令行编译小包模式，记得备份 **build/vivo-mini-game/res** 目录，然后删除 **build/vivo-mini-game/res** 目录，再进行命令行编译（npm run build）。

  此时，构建出来的 rpk 将不再包含 res 目录，res 目录里的资源将通过网络请求从填写的 **小包模式服务器路径** 上下载。

- **分包**

  该功能默认开启。

- **密钥库**

  勾选 **密钥库** 时，表示默认用的是 Creator 自带的证书构建 rpk 包，仅用于 **测试和调试** 时使用。<br>
  如果不勾选 **密钥库**，则需要配置签名文件 **certificate.pem 路径** 和 **private.pem 路径**，此时构建出的是可以 **直接发布** 的 rpk 包。用户可通过输入框右边的 **...** 按钮来配置两个签名文件。**注意**：这两个签名文件建议不要放在发布包 **build/qgame** 目录下，否则每次构建时都会清空该目录，导致文件丢失。

  有以下两种方式可以生成签名文件：

    - 通过 **构建发布** 面板 **certificate.pem 路径** 后的 **新建** 按钮生成。

    - 通过命令行生成 release 签名

      用户需要通过 openssl 命令等工具生成签名文件 private.pem、certificate.pem。

      ```bash
      # 通过 openssl 命令工具生成签名文件
      openssl req -newkey rsa:2048 -nodes -keyout private.pem -x509 -days 3650 -out certificate.pem
      ```

      **注意**：openssl 工具在 linux 或 Mac 环境下可在终端直接打开，而在 Windows 环境下则需要安装 openssl 工具并且配置系统环境变量。

二、**构建发布** 面板的相关参数设置完成后，点击 **构建**。构建完成后点击 **发布路径** 后面的 **打开** 按钮来打开构建发布包，可以看到在默认发布路径 build 目录下生成了与构建任务名称相同的目录例如 `vivo-mini-game`，该目录就是导出的 vivo 小游戏工程原始目录，但并不是编译目录。打开编辑器安装目录下的 `resources/tools/vivo-pack-tools` 的文件夹，该文件夹内存放了 vivo 的本地打包工具，每次构建会将项目里的信息生成到这里构建出 rpk 后再拷贝会源目录，如果想要自行编译项目需要在该目录下进行。

![](./vivo-mini-game/package.png)

并且在 /build/vivo-mini-game/dist 目录下会生成 rpk 包。

![](./vivo-mini-game/rpk.png)

三、将打包出来的 rpk 运行到手机上。有以下三种方式可将 rpk 运行到手机上：

- **方法一**：

    在 **构建发布** 面板点击 **运行** 按钮，等待二维码界面生成

    ![](./vivo-mini-game/play.jpg)

    然后在 Android 设备上打开之前已经安装完成的 **快应用 & vivo 小游戏调试器**，点击 **扫码安装** 按钮直接扫描二维码即可打开 rpk。

    ![](./vivo-mini-game/vivo-instant_scan_install.jpg)

- **方法二**：

    将构建生成的小游戏 rpk 文件（位于打包出的小游戏工程目录下的 dist 目录中）拷贝到手机 sdcard 目录下。

    在 Android 设备上打开之前已经安装完成的 **快应用 & vivo 小游戏调试器**，点击 **本地安装**，然后从手机 sdcard 目录中找到 rpk 文件，选择打开即可。

    ![](./vivo-mini-game/vivo-instant_native_install.jpg)

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

vivo 小游戏的分包加载，用法与微信小游戏类似。详情请参考 [分包加载](../../asset/subpackage.md)。

## 参考链接

- [vivo 小游戏开发文档](https://minigame.vivo.com.cn/documents/#/lesson/base/start)
- [vivo 小游戏 API 文档](https://minigame.vivo.com.cn/documents/#/api/system/life-cycle)
- [快应用 & vivo 小游戏调试器下载](https://minigame.vivo.com.cn/documents/#/download/debugger)
