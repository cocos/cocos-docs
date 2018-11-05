# 发布到 vivo 小游戏平台

从 v2.0.5 版本开始，Cocos Creator 正式支持将游戏发布到 vivo 小游戏平台。我们来看一下如何使用 Cocos Creator 一键发布到 vivo 小游戏平台。

## 环境配置

- 下载 [快应用 & vivo 小游戏调试器](https://dev.vivo.com.cn/documentCenter/doc/163) 和 [vivo 小游戏引擎](https://dev.vivo.com.cn/documentCenter/doc/163)，并安装到 Android 设备上（建议 Android Phone 6.0 或以上版本）

- 全局安装 [nodejs-8.1.4](https://nodejs.org/zh-cn/download/) 或以上版本

    **注意**：安装 nodejs 后，需要注意 npm 源地址是否为 https://registry.npmjs.org/

    ```bash
    # 查看当前 npm 源地址
    npm config get registry
    # 若不是，重新设置 npm 源地址
    npm config set registry https://registry.npmjs.org/
    ```

- 全局安装 qgame-toolkit。确定 npm 源地址后，安装 qgame-toolkit：

    ```bash
    npm install -g qgame-toolkit
    ```

- 根据用户自己的开发需求判断是否需要安装 [chrome 调试小游戏引擎版本](https://jerrymoon.github.io/kuai-you-xi-jiao-cheng/xia-zai-yu-geng-xin.html)

## 发布流程

一、使用 Cocos Creator 打开需要发布的项目工程，在 **构建发布** 面板的 **发布平台** 中选择 **vivo 小游戏**。

![](./publish-vivo-instant-games/build.png)

其中 **应用包名**、**应用名称**、**应用图标**、**应用版本名称**、**应用版本号**、**支持的最小引擎平台版本号**（注意：请填写 **1020**）这些参数为必填项。而 **本地 npm 安装路径**、**构建发布程序包**、**小包模式**、**小包模式服务器路径** 为选填项。相关参数配置具体的填写规则如下：

- **应用图标**

  **应用图标** 为必填项。构建时，应用图标将会构建到 vivo 小游戏的工程中，请确保填写的应用图标路径下的图片真实存在。如：填写的应用图标路径为 /assets/image/logo.png，则在 Creator **资源管理器** 的 **Assets** 目录下需要存在 image 目录和 logo.png。
  
- **本地 npm 安装路径**

  **本地 npm 安装路径** 是选填项。填写 npm 安装路径的目的是构建生成可运行的小游戏 rpk 包（rpk 包位于小游戏工程 qgame 下的 dist 目录）。如果不填写该项，则 Creator 只会导出小游戏工程目录，不会生成 rpk 包。

    - Mac 系统

    ```bash
    # 获取本地 npm 安装路径
    which npm
    # 如果输出结果为
    /Users/yourname/.nvm/versions/node/v8.1.4/bin/npm
    # 则本地 npm 安装路径填写为：
    /Users/yourname/.nvm/versions/node/v8.1.4/bin
    ```

    - Windows 系统

    ```bash
    # 获取本地 npm 安装路径
    which npm
    # 如果输出结果为
    C:\Program Files\nodejs\npm
    # 则本地 npm 安装路径填写为
    C:\Program Files\nodejs
    ```

- **构建发布程序包**

  **构建发布程序包** 是选填项。勾选该项的目的是构建出可以直接发布的 rpk 包。但有两个前提是需要填写 **本地 npm 安装路径** 以及添加 release 签名。<br>
  如果不勾选 **构建发布程序包**，则构建出的是用于测试的 rpk 包。

    - 添加 release 签名：

      在小游戏工程根目录中，添加 **build-templates/jsb-link/sign/release** 目录，然后在 release 目录下放置你的私钥文件 **private.pem** 和证书文件 **certificate.pem**。如下图所示：

      ![](./publish-vivo-instant-games/sign_release_path.png)

    - 如何生成 release 签名

      用户需要通过 openssl 命令等工具生成签名文件 private.pem、certificate.pem。其中在 build/qgame/sign/debug 目录下的证书仅供调试使用。

    ```bash
    # 命令行指定到刚才添加到小游戏根目录的 release 目录下
    cd E:\workspace\YourProject\build-templates\jsb-link\sign\release
    # 通过 openssl 命令工具生成签名文件
    openssl req -newkey rsa:2048 -nodes -keyout private.pem -x509 -days 3650 -out certificate.pem
    ```

  **注意**：openssl 工具在 linux 或 Mac 环境下可在终端直接打开，而在 Windows 环境下则需要安装 openssl 工具并且配置系统环境变量。

- **小包模式和小包模式服务器路径**

  该项为选填项。小游戏的包内体积包含代码和资源不能超过 4M，资源可以通过网络请求加载。**小包模式** 就是帮助用户将脚本文件保留在小游戏包内，其他资源则上传到远程服务器，根据需要从远程服务器下载。而远程资源的下载、缓存和版本管理，Creator 已经帮用户做好了。用户需要做的是以下两个步骤：

  1、构建时，勾选 **小包模式**，填写 **小包模式服务器路径**。然后点击 **构建**。

  2、构建完成后，点击 **发布路径** 后面的 **打开** 按钮，将发布路径下的 **jsb-link/res** 目录上传到小包模式服务器。例如：默认发布路径是 build，则需要上传 build/jsb-link/res 目录。

  此时，构建出来的 qgame 目录下将不再包含 res 目录，res 目录里的资源将通过网络请求从填写的 **小包模式服务器地址** 上下载。

二、**构建发布** 面板的相关参数设置完成后，点击 **构建**。构建完成后点击 **发布路径** 后面的 **打开** 按钮来打开构建发布包，可以看到在默认发布路径 build 目录下生成了 **qgame** 目录，该目录就是导出的 vivo 小游戏工程目录。

![](./publish-vivo-instant-games/package.png)

三、生成 rpk 包（如果在 **构建发布** 面板有填写了 **本地 npm 安装路径**，就可以跳过该步骤）。

```bash
# 命令行指定到 qgame 目录下
cd E:\workspace\YourProject\build\qgame
npm install
npm run build
```

然后在 /build/qgame/dist 目录下就会生成 rpk 包。

![](./publish-vivo-instant-games/rpk.png)

四、将打包出来的 rpk 运行到手机上。有以下两种方式可将 rpk 运行到手机上：

- **方法一**：

    利用 vivo 小游戏打包工具命令生成网址和二维码

    ```bash
    # 先把命令行指定到 qgame 目录下
    cd E:\workspace\YourProject\build\qgame
    # 生成网址和二维码
    npm run server
    ```

    然后在 Android 设备上打开之前已经安装完成的 **快应用 & vivo 小游戏调试器**

    ![](./publish-vivo-instant-games/vivo-instant_scan_install.jpg)

    最后点击 **扫码安装** 按钮，将第一步中生成的网址拷贝到浏览器，然后直接扫描网页上的二维码即可打开 rpk。

- **方法二**：

    将构建生成的小游戏 rpk 文件（位于小游戏工程 qgame 目录下的 dist 目录中）拷贝到手机 SD 卡中

    在 Android 设备上打开之前已经安装完成的 **快应用 & vivo 小游戏调试器**，点击 **本地安装**，然后从手机 SD 中找到 rpk 文件，选择打开即可。

    ![](./publish-vivo-instant-games/vivo-instant_native_install.jpg)
