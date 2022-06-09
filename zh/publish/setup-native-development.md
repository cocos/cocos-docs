# 安装配置原生开发环境

除了内置的 Web 版游戏发布功能外，Cocos Creator 使用基于 cocos2d-x 引擎的 JSB 技术实现跨平台发布原生应用。在使用 Cocos Creator 打包发布到原生平台之前，我们需要先配置好 cocos2d-x 相关的开发环境。

## Android 平台相关依赖

要发布到 Android 平台，需要安装以下全部开发环境依赖。

如果您没有发布到 Android 平台的计划，或您的操作系统上已经有完整的 Android 开发环境，可以跳过这个部分。

### 下载 Java SDK（JDK）

编译 Android 工程需要本地电脑上有完整的 Java SDK 工具，请到以下地址下载：

[Java SE Development Kit 8 Downloads](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

下载时注意选择和本机匹配的操作系统和架构，下载完成后运行安装程序即可。

安装后请检查 JAVA 环境，在 Mac 终端或者 Windows 命令行工具中输入下面代码来查看：

```
java -version
```

显示为 JAVA SE 则没有问题，如果系统中使用的是 JRE，则需要安装 [JAVA SE 运行环境](http://www.oracle.com/technetwork/java/javase/downloads/index.html)。

如果是 Windows 系统，请确认你的环境变量中包含 JAVA_HOME。可以通过右键点击我的电脑，选择属性，打开高级选项卡中来查看和修改环境变量。Windows 平台可能需要重启电脑才会生效。参考 [如何设置或更改 JAVA 系统环境变量](https://www.java.com/zh_CN/download/help/path.xml)

### 下载安装 Android Studio

从 v1.5 开始，我们支持最新版本的 Android Studio 和配套的构建工具，推荐使用 Android Studio 作为安卓平台的构建工具，并在 Android Studio 里下载所需的 SDK 和 NDK 包。首先请 [安装 Android Studio](http://www.android-studio.org/)。

### 下载发布 Android 平台所需的 SDK 和 NDK

安装 Android Studio 完成后，参考官方文档，打开 SDK Manager：

[SDK Manager 使用说明（需要使用 VPN）](https://developer.android.com/studio/intro/update.html#sdk-manager)

1. 在 SDK Platforms 分页栏，勾选你希望安装的 API Level，也就是支持安卓系统的版本，推荐选择最低兼容的 API Level 10（2.3.3) 和最主流的 API Level 17 (4.2) 以及 API Level 22 (5.1)。
2. 在 SDK Tools 分页栏，首先勾选右下角的 `Show package details`，显示分版本的工具选择。
3. 在 `Android SDK Build-Tools` 里，选择 25 以上的 build tools 版本。
4. 勾选 `Android SDK Platform-Tools`, `Android SDK Tools` 和 `Android Support Library`
5. 勾选 `NDK`，请使用 r10c 以上的版本，推荐 r10e。<br>
**注意**：NDK-r18 已经移除了 GNU 编译器，请 Creator v2.1 以下的版本 **不要** 将 NDK 更新到 r18，否则会导致编译报错。
6. 记住窗口上方所示的 Android SDK Location 指示的目录，稍后我们需要在 Cocos Creator 里填写这个 SDK 所在位置。
7. 点击 `OK`，根据提示完成安装。

![sdk manager](setup-native-development/sdk-manager.jpg)

### Android SDK 10 依赖

从 v1.2.2 开始，默认的 Android 项目模板将指定 `android-10` sdk platform 版本作为默认的 target，详情可见 [Pull Request Use API Level 10](https://github.com/cocos/engine-native/pull/316)。

如果编译 Android 工程时遇到 '未找到 android-10' 之类的报错，可以通过上文介绍的方式下载 Android SDK API Level 10。

如果需要更改 target 的 API Level，可以修改原生引擎目录下 `cocos/platform/android/java/project.properties` 文件中的

```java
target=android-10
```

将 `android-10` 修改为其他您需要的 API Level。

## 安装 C++ 编译环境

Cocos2d-x 自带的编译工具 Cocos Console 需要以下运行环境：

- Python 2.7.5+，[下载页](https://www.python.org/downloads/)，注意不要下载 Python 3.x 版本。
- Windows 下需要安装 Visual Studio 2015 或 2017 社区版，[下载页](https://www.visualstudio.com/downloads/download-visual-studio-vs)
- Mac 下需要安装 Xcode 和命令行工具，[下载页](https://developer.apple.com/xcode/download/)

## 配置原生发布环境路径

下载安装好开发环境依赖后，让我们回到 Cocos Creator 中配置构建发布原生平台的环境路径。在主菜单中选择 `CocosCreator -> 偏好设置`，打开偏好设置窗口：

![preference](../getting-started/basics/editor-panels/preferences/native-develop.jpg)

我们在这里需要配置以下三个路径：

- **Android SDK Root**：选择刚才在 SDK Manager 中记下的 `Android SDK Location` 路径（Android SDK 的目录下应该包含 build-tools、platforms 等文件夹），不需要编译 Android 平台的话这里可以跳过。
- **NDK Root**：选择 `Android SDK Location` 路径下的 `ndk-bundle` 文件夹（NDK 是其根目录），不需要编译 Android 平台的话这里可以跳过。
- **ANT Path**：请选择下载并解压完成的 Apache Ant 路径，需要设置到 ant 安装目录内的 bin 目录下，选定的路径中应该包括一个名叫 `ant` 的可执行文件。不需要编译 Android 平台的话这里可以跳过。

配置完成后点击 **保存** 按钮，保存并关闭窗口。

> **注意**：这里的配置会在编译 **原生工程** 的时候生效。如果没有生效（一些 Mac 机器有可能出现这个情况），可能需要您尝试到 **系统环境变量** 设置这些值：COCOS_CONSOLE_ROOT, ANT_ROOT, NDK_ROOT, ANDROID_SDK_ROOT。

## 注意事项

由于在公测版中收到了很多原生打包的问题反馈，这里补充一些可能的问题原因。

1. 检查 Xcode 和 Visual Studio

    打包 Mac 版本和 iOS 版本需要 Xcode 支持，打包 Windows 版本需要安装 Visual Studio。在安装 Visual Studio 时，默认并没有勾选 C++ 编译组件。如果没有安装，则需要重新安装并选择 C++ 相关编译组件。

2. 包名问题

    检查构建发布面板中的包名，包含空格，`-` 等都是非法的包名。

3. 不使用 Android Studio

    如果您使用 Cocos Creator v1.5 以前的版本，或由于某些原因无法使用 Android Studio，请安装 Eclipse 并使用旧的流程下载 SDK 和 NDK

    从以下链接下载和操作系统一致的 Android SDK 和 NDK：

    - [Android SDK Windows](http://cocostudio.download.appget.cn/android-sdk/android-sdk-win.zip)
    - [Android SDK Mac](http://cocostudio.download.appget.cn/Cocos/CocosStore/android22-sdk-macosx.zip)
    - [Android NDK Windows 32位](http://cocostudio.download.appget.cn/Cocos/CocosStore/android-ndk-r10d-windows-x86.zip)
    - [Android NDK Windows 64位](http://cocostudio.download.appget.cn/Cocos/CocosStore/android-ndk-r10e-Windows.zip)
    - [Android NDK Mac](http://cocostudio.download.appget.cn/Cocos/CocosStore/android-ndk-r10e-macosx.zip)

    下载之后解压到任意位置，我们之后需要设置 Android SDK 和 NDK 的路径，请记住以上文件的解压位置。

    下载 [Apache Ant](http://ant.apache.org) 是一种用来构建软件的 Java 程序库和可执行文件。我们在构建 Android 平台项目时需要这个软件的支持。

    前往 Apache Ant 的下载链接：

    [Apache Ant 下载](http://ant.apache.org/bindownload.cgi)

    选择稳定版的 `.zip` 压缩包并下载，下载完成后解压到任意目录，之后我们在进行设置时需要选择这个目录。

4. Android 6.0 SDK 的支持问题

    Android 6.0 SDK 去除了 Cocos2d-x 依赖的 HttpClient 库，所以会导致 Cocos Creator v1.5 以前的版本编译失败。旧版本用户的解决方案是：

    - 找到 Android SDK 目录下的 HttpClient 库：`platforms/android-23/optional/org.apache.http.legacy.jar`。
    - 如果使用源码引擎模版，需要拷贝到原生编译目录下的 `jsb/frameworks/cocos2d-x/cocos/platform/android/java/libs/` 目录下。如果使用预编译库引擎模版，需要拷贝到原生编译目录下的 `jsb/frameworks/runtime-src/proj.android/jars/` 目录下。
    - 重新编译。

5. Android 编译成功，但运行时提示 `dlopen failed: cannot locate symbol "xxxx" referenced by "libcocos2djs.so"...`

    请检查 NDK 和 Android SDK 的架构和版本是否和测试用的 Android 系统相对应，另外可以尝试使用本文所用的 NDK 和 Android SDK 版本来测试。

最后，如果依然打包失败，可以尝试创建一个标准的 Cocos2d-x 工程，并尝试编译，如果 Cocos2d-x 工程可以编译，而 Cocos Creator 无法打包，请将 bug 通过 [论坛](https://forum.cocos.org/c/27) 反馈给我们。

---

现在您已经完成了全部原生开发环境的配置，接下来请继续前往 [打包发布原生平台](publish-native.md) 说明文档。
