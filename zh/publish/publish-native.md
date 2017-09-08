# 打包发布原生平台

打开主菜单的 `项目/构建发布`，打开构建发布窗口。

目前可以选择的原生平台包括 Android, iOS, Mac, Windows 四个，其中发布到 Mac 和 Windows 的选项只能在相应的操作系统中才会出现。

![native platform](publish-native/native_platform.png)

## 设置包名（Package Name）

选择一个原生平台后，构建发布窗口中会显示 **包名** 的输入框，在这里请输入您游戏的包名（也称作 Package Name 或 Bundle ID），通常以产品网站 url 倒序排列，如 `com.mycompany.myproduct`。

**注意**：

- 包名中只能包含数字、字母和下划线，此外包名最后一部分必须以字母开头，不能以下划线或数字开头。
- 如果使用的 xcode 的版本低于 7.2(目前测试到 7.2 以上版本不会有问题，其他版本不能保证)，那么包名包含下划线的话也可能会编译失败。

![package name](publish-native/package_name.png)

## 构建选项

### 合并图集中的 SpriteFrame

将图集中的全部 SpriteFrame 合并到同一个包中。默认关闭，启用后能够减少热更新时需要下载的 SpriteFrame 文件数量，但如果图集中的 SpriteFrame 数量很多，则可能会延长原生平台上的启动时间。

### 内联所有 SpriteFrame

自动合并资源时，将所有 SpriteFrame 与被依赖的资源合并到同一个包中。建议网页平台开启，启用后会略微增大总包体，多消耗一点点网络流量，但是能显著减少网络请求数量。建议原生平台关闭，因为会增大热更新时的体积。

## 选择源码或预编译库模板

接下来在 **模板** 下拉菜单里，我们可以从引擎模板中选择一个，下面是可用的三种选项：

- default，使用默认的 cocos2d-x 源码版引擎构建项目
- binary，使用预编译好的 cocos2d-x 库构建项目
- link，与 default 模板不同的是，link 模板不会拷贝 cocos2d-x 源码到构建目录下，而是使用共享的 cocos2d-x 源码。这样可以有效减少构建目录占用空间，以及对 cocos2d-x 源码的修改可以得到共享。

### 源码引擎和预编译库

在 v3.10 之后，cocos2d-x 引擎中现在包括源码引擎和预编译引擎（各个平台原生支持的二进制库格式）。他们适用的范围是：

- 源码引擎初次构建和编译某个工程时需要很长的时间编译 C++ 代码，视电脑配置而定，这个时间可能在 20 分钟到 1 小时。对于同一个项目，已经编译过一次之后，下次再编译需要的时间会大大缩短。
- 源码引擎构建出的工程，使用原生开发环境编译和运行（如 Eclipse，Xcode 等 IDE），是可以进行调试和错误捕获的。
- 预编译引擎库，由于事先已经把 cocos2d-x 引擎编译完成了，构建项目时将直接使用编译完的库，可以将编译时间大大缩短。
- 但是预编译引擎库不包含源码，因此也无法在原生工程中进行调试。

目前 Cocos Creator 安装目录下已经包含了自带的 cocos2d-x 源码引擎（v3.10+），如果您希望使用预编译引擎库进行日常构建和编译，可以通过主菜单的 `开发者/编译 cocos2d-x 预编译库` 来进行手动编译。

编译预编译库的过程会比较长，与此同时会占用大量的 CPU 资源，建议在不需要工作的时候再进行。另外编译的过程是在一个独立的进程中通过 Cocos Console 命令行进行的，如果您想了解编译的进度，请点击 **控制台** 面板的日志按钮，并选择 **Cocos Console 日志** 来打开相应的日志文件。

[cocos console log](publish-native/cocos-console-log.png)

编译完成后会在 **控制台** 输出成功的信息，之后您就可以在 **构建发布** 界面的 **模板** 选项里选择 `binary` 来使用预编译库构建和编译原生项目了。

## 构建原生工程

选择发布平台，设置了包名和初始场景后，就可以开始构建了，点击右下角的 **构建** 按钮，开始构建流程。

![build progress](publish-native/build_progress.png)

编译脚本和打包资源时会在窗口上方显示进度条，进度条到达 100% 后请继续等待 **控制台** 面板中的工程构建结束，成功的话会显示如下所示的日志：

```bash
Built to "/myProject/tutorial-blackjack/build/tutorial-blackjack" successfully
```

构建结束后，我们得到的是一个标准的 cocos2d-x 工程，和使用 Cocos Console 新建的工程有同样的结构。接下来我们可以选择通过 Cocos Creator 编辑器的进程进行编译，以及运行桌面预览，或手动在相应平台的 IDE 中打开构建好的原生工程，进行进一步的预览、调试和发布。

## 通过编辑器编译和预览

点击下方的 **编译** 按钮，进入编译流程，如果模板选择了 `default` 的源码版引擎，这个编译的过程将会花费非常久的时间。编译成功后会提示

`Compile native project successfully`

接下来就可以点击右下角的 **运行** 按钮，通过默认方式预览原生平台的游戏。

![preview](publish-native/preview.png)

其中 Mac/iOS/Windows 平台会使用 Cocos Simulator 模拟器在桌面运行预览，Android 平台必须通过 USB 连接真机，并且在真机上开启 USB 调试后才可以运行预览。

点击运行后，视平台不同可能还会继续进行一部分编译工作，请耐心等待或通过日志文件查看进展。

## 使用原生工程

![open project](publish-native/open_project.png)

点击发布路径旁边的 **打开** 按钮，就会在操作系统的文件管理器中打开构建发布路径。

这个路径中的 `jsb-default` 或 `jsb-binary` （根据选择模板不同）里就包含了所有原生构建工程。

![native projects](publish-native/native_projects.png)

图中红框所示的就是不同原生平台的工程，接下来您只要使用原生平台对应的 IDE （如 Xcode、Eclipse、Android Studio、Visual Studio）打开这些工程，就可以进行进一步的编译、预览、发布操作了。关于原生平台 IDE 的使用请搜索相关信息，这里就不再赘述了。

---

要了解如何在原生平台上调试，请继续前往 [原生平台调试](debug-native.md) 说明文档。

