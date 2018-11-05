# 发布到 OPPO 小游戏平台

从 v2.0.5 版本开始，Cocos Creator 正式支持将游戏发布到 OPPO 小游戏平台。我们来看一下如何使用 Cocos Creator 一键发布到 OPPO 快游戏平台。

## 环境配置

- 下载 [快游戏调试器](https://cdofs.oppomobile.com/cdo-activity/static/201810/26/quickgame/documentation/resource/runtime.apk)，并安装到 Android 设备上（建议 Android Phone 6.0 或以上版本）

- 全局安装 [nodejs-8.1.4](https://nodejs.org/zh-cn/download/) 或以上版本

- 下载[quickgame-toolkit](http://cdofs.oppomobile.com/cdo-activity/static/quickgame/tools//0974ab43dc361f148189515ee254ff6d.zip)，并解压。
  下面这步为可选，可以先进去切换到压缩目录安装依赖，减少第一次用creator打包rpk的等待时间。操作如下：
 
  ```bash
   # 进入解压目录
   cd quickgame-toolkit
   # 安装项目的依赖
   npm install
  ```
 
- 根据用户自己的开发需求判断是否需要安装 [对战调试工具](https://cdofs.oppomobile.com/cdo-activity/static/201810/26/quickgame/documentation/resource/test.zip)

## 发布流程

一、使用 Cocos Creator 打开需要发布的项目工程，在 **构建发布** 面板的 **发布平台** 中选择 **OPPO Mini Game**。

  ![](./publish-oppo-instant-games/build_option.jpg)


   其中 **游戏包名**、**游戏名称**、**桌面图标**、**游戏版本名称**、**平台版本号**、**支持的最小引擎平台版本号**、**本地 npm 安装路径**、**本地 quickgame-toolkit路径**这些参数为必填项。而 **构建发布程序包**、**小包模式**、**小包模式服务器路径** 为选填项。相关参数配置具体的填写规则如下：

- **应用图标**

  **应用图标** 为必填项。构建时，应用图标将会构建到 OPPO 快游戏的工程中，请确保填写的应用图标路径下的图片真实存在。如：填写的应用图标路径为 /assets/image/logo.png，则在 Creator **资源管理器** 的 **Assets** 目录下需要存在 image 目录和 logo.png。
  
- **本地 npm 安装路径**

  **本地 npm 安装路径** 是必填项。
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
- **本地 quickgame-toolkit路径**

  **本地 quickgame-toolkit路径**为必填项，这里的quickgame-toolkit路径也需要注意：为解压后的quickgame-toolkit路径， 如quickgame.cmd路径 在mac系统下路径为

 
 ``` 
 /Users/hym/Documents/quickgame-toolkit/lib/bin/quickgame.cmd
 ```
  则本地quickgame-toolki安装路径需要填写为

 
 ``` 
 /Users/hym/Documents/quickgame-toolkit
 ```
  在windows系统路径为

  D:\quickgame-toolki\lib\bin\quickgame.cmd
  则本地quickgame-toolki安装路径需要填写为

 
  ``` 
  D:\quickgame-toolki
  ```
  
- **构建发布程序包**

  **构建发布程序包** 是选填项。勾选该项的目的是构建出可以直接发布的 rpk 包。<br>
  如果不勾选 **构建发布程序包**，则构建出的是用于测试的 rpk 包。

 - 添加 release 签名：

    在小游戏工程根目录中，添加 **build-templates/jsb-link/sign/release** 目录，然后在release 目录下放置你的私钥文件 **private.pem** 和证书文件 **certificate.pem**。如下图所示：
       
       
      ![](./publish-oppo-instant-games/release_sign.jpg)  


- 如何生成 release 签名

   用户需要通过 openssl 命令等工具生成签名文件 private.pem、certificate.pem。
    
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

  此时，构建出来的 quickgame 目录下将不再包含 res 目录，res 目录里的资源将通过网络请求从填写的 **小包模式服务器地址** 上下载。

二、**构建发布** 
    面板的相关参数设置完成后，点击 **构建**。构建完成后点击 **发布路径** 后面的 **打开** 按钮来打开构建发布包，可以看到在默认发布路径 build 目录下生成了 **quickgame** 目录，该目录就是导出的 OPPO 小游戏工程目录和rpk,rpk目录在/build/quickgame/dist 目录下。

![](./publish-oppo-instant-games/package.png)

三、将打包出来的 rpk 运行到手机上。
   将构建生成的小游戏 rpk 文件（位于小游戏工程 quickgame 目录下的 dist 目录中）拷贝到手机 SD 卡的/sdcard/games/目录。然后在 Android 设备上打开之前已经安装完成的 **快应用**，点击 **快游戏**栏目，然后找到填写游戏名相对应的图标即可，如没有发现，可点击右上角的更多按钮-刷新按钮进行刷新。
        
四、分包 rpk

分包 rpk 不是必项的。分包加载，即把游戏内容按一定规则拆分在几个包里，在首次启动的时候只下载必要的包，这个必要的包称为 主包，开发者可以在主包内触发下载其他子包，这样可以有效降低首次启动的消耗时间。开发者根据需求采用这功能。
在creator设置[配置方法](https://docs.cocos.com/creator/manual/zh/scripting/subpackage.html)后，打包时会自动分包。

构建完成后，分包的目录在/build/quickgame/quickgame/dist目录下。
这时需要在sd卡，新建个subPkg目录，然后把/build/quickgame/quickgame/dist目录下所有的文件和文件夹都拷贝到subPkg目录。


![](./publish-oppo-instant-games/subpackage.jpg)
  
  
   然后切换到**快应用**的**快游戏**栏目，点击刷新即可看到分包的主应用图标，点击即可跟正常打包一样使用。


![](./publish-oppo-instant-games/run_subpackage.jpg)


## 相关参考链接

- [OPPO 快游戏教程](https://cdofs.oppomobile.com/cdo-activity/static/201810/26/quickgame/documentation/games/quickgame.html)
- [OPPO 快游戏 API 文档](https://cdofs.oppomobile.com/cdo-activity/static/201810/26/quickgame/documentation/feature/account.html)
- [OPPO 快游戏工具下载](https://cdofs.oppomobile.com/cdo-activity/static/201810/26/quickgame/documentation/games/use.html)
- [cocos creator 分包](https://docs.cocos.com/creator/manual/zh/scripting/subpackage.html)

