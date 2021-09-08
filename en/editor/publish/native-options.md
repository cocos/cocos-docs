# Publish to Native Platforms

Click **Project -> Build** in the menu bar to open the Build panel.

The native platforms that can be selected currently include **Android**, **iOS**, **Mac**, and **Windows**. Among them, the options for publishing to **iOS**, **Mac**, and **Windows** only appear when using the corresponding operating system.

![native platform](publish-native/native-platform.png)

## Environment configuration

Publishing to the native platform requires installation and configuration of some necessary environments. For details, please refer to the[Installation and Configuration of Native Development Environment](setup-native-development.md) documentation.

## Build options

For the general build options of each platform, please refer to the [General Build Options](build-options.md) documentation.

### Generic build options for native platforms

Due to the adjustment of the current build mechanism, the processing of different platforms is built into the **Build** panel in the form of plug-ins.

After selecting the native platform to be built in the **Release Platform** of the **Build** panel, notice that in addition to the expanded options of the specific native platform, there is also an expanded option for **Native**. The build options in **Native** are the same on all native platforms.

![Native Options](publish-native/native-options.png)

#### Select the source code template (Template)

Starting from Cocos Creator 3.0, in order to have a consistent experience, the engine template that can be used in **Template** is **Link**, and the original **Default** template has been removed.

The Link template does not copy the Cocos2d-x source code to the build directory, but uses the shared Cocos2d-x source code. This can effectively reduce the space occupied by the build directory, and modifications to the Cocos2d-x source code can also be shared.

> **Notes**:
>
> **About the source code engine**
>
> The Cocos2d-x engine includes source code engines, and the scope of their application is:
> 1. When the source code engine first builds and compiles a project, it takes a long time to compile C++ code. Depending on the computer configuration, this time may be 5-20 minutes. For the same project, after it has been compiled once, the time required for the next compilation will be greatly reduced.
> 2. The project built by the source code engine is compiled and run using the native development environment (such as Android Studio, Xcode and other IDEs), which can be debugged and error captured.

The `resources\3d\cocos2d-x-lite` folder under the installation directory of Cocos Creator already contains the built-in Cocos2d-x source code engine. If you need to customize the engine, please refer to the [Engine Customization Workflow](../../advanced-topics/engine-customization.md) documentation for details.

#### Resource server address

When the package body is too large, the resource can be uploaded to the resource server and downloaded through the network. This item is used to fill in the address where the resource is stored on the remote server. Developers need to manually upload the `remote` folder in the release package directory to the filled resource server address after construction. For details, please refer to the [Upload resources to remote server](../../asset/cache-manager.md) documentation.

#### Polyfills

This item is a polyfills option for some new features supported by the scripting system, and currently only supports **asynchronous functions**. After checking, the generated project will bring the corresponding polyfills, that is, the package body will be enlarged, and the developer can choose whether to use it according to actual needs.

#### Generated immediately after build

If this option is checked, the **Generate** step will be executed automatically after the build is completed, and no manual operation is required.

#### Encrypted script

This item is used to encrypt the published script. The jsc file will be generated in the built-in `assets` directory, this file is encrypted. The js file will be backed up in the `script-backup` directory for debugging, and will not enter the APP during packaging.

**Script encryption key**: This value will be used as the key to encrypt the js file on the Native platform. It will be randomly generated when the project is created.

**Zip compression**: If checked, the script size can be reduced.

![encrypt js](publish-native/encrypt-js.png)

### Android 平台构建选项

Android 平台的构建选项如下：

![Android build options](publish-native/android-options.png)

#### 渲染后端

目前支持 [VULKAN](https://www.vulkan.org/)、[GLES3](https://www.khronos.org/registry/OpenGL-Refpages/es3/) 和 [GLES2](https://www.khronos.org/registry/OpenGL-Refpages/es2.0/) 三种，默认勾选 **GLES3**。在同时勾选多个的情况下，运行时将会根据设备实际支持情况选择使用的渲染后端。

#### 应用 ID 名称

**应用 ID 名称**（Game Package Name）通常以产品网站 URL 倒序排列，如 `com.mycompany.myproduct`。

> **注意**：包名中只能包含数字、字母和下划线，此外包名最后一部分必须以字母开头，不能以下划线或数字开头。

#### Target API Level

设置编译 Android 平台时所需的 Target API Level。点击旁边的 **Set Android SDK** 按钮即可快速跳转到配置页，具体配置规则请参考 [配置原生发布环境路径](setup-native-development.md#%E9%85%8D%E7%BD%AE%E5%8E%9F%E7%94%9F%E5%8F%91%E5%B8%83%E7%8E%AF%E5%A2%83%E8%B7%AF%E5%BE%84)。

#### APP ABI

设置 Android 需要支持的 CPU 类型，可以选择一个或多个选项，目前包括 **armeabi-v7a**、**arm64-v8a**、**x86** 三种类型。

> **注意**：
>
> 1. 当你选择一个 ABI 构建完成之后，在不 Clean 的情况下，构建另外一个 ABI，此时两个 ABI 的 so 都会被打包到 apk 中，这个是 Android Studio 默认的行为。若用 Android Studio 导入工程，选择一个 ABI 构建完成之后，先执行一下 **Build -> Clean Project** 再构建另外一个 ABI，此时只有后面那个 ABI 会被打包到 apk 中。
>
> 2. 项目工程用 Android Studio 导入后，是一个独立的存在，不依赖于构建发布面板。如果需要修改 ABI，直接修改 **gradle.properties** 文件中的 **PROP_APP_ABI** 属性即可。
>
>     ![modify abi](publish-native/modify_abi.png)

#### 使用调试密钥库

Android 要求所有 APK 必须先使用证书进行数字签署，然后才能安装。Cocos Creator 提供了默认的密钥库，勾选 **使用调试密钥库** 就是使用默认密钥库。若开发者需要自定义密钥库可去掉 **使用调试密钥库** 勾选，详情请参考 [官方文档](https://developer.android.google.cn/studio/publish/app-signing?hl=zh-cn)。

#### 屏幕方向

屏幕方向目前包括 **Portrait**、**Landscape Left**、**Landscape Right** 三种。

- **Portrait**：屏幕直立，Home 键在下
- **Landscape Left**：屏幕横置，Home 键在屏幕左侧
- **Landscape Right**：屏幕横置，Home 键在屏幕右侧

#### Google Play Instant

勾选该项即可将游戏打包发布到 Google Play Instant。Google Play Instant 依赖于 Google Play，并不是一个新的分发渠道，而是更接近一种游戏微端方案。它能够实现游戏的免安装即开即玩，有利于游戏的试玩、分享和转化。

> **使用时需要注意以下几点**：
>
> 1. Android Studio 的版本要在 4.0 及以上
>
> 2. Android Phone 6.0 及以上。Android SDK 版本在 6.0 到 7.0 之间的设备需要安装 Google 服务框架，SDK 版本在 8.0 以上的则不需要，可直接安装使用。
>
> 3. 首次编译的话需要用 Android Studio 打开构建后的工程以下载 **Google Play Instant Development SDK（windows）** 或 **Instant Apps Development SDK（Mac）** 支持包。如果下载不成功的话建议设置一下 Android Studio 的 HTTP 代理。
>
>    ![Google Play Instant](publish-native/sdk-android-instant.png)

#### 生成 App Bundle（Google Play）

勾选该项即可将游戏打包成 App Bundle 格式用于上传到 Google Play 商店。具体请参考 [官方文档](https://developer.android.google.cn/guide/app-bundle/)。

### Windows 平台构建选项

Windows 平台的构建选项目前只有一个 **渲染后端**，包括 **VULKAN**、**GLES3** 和 **GLES2** 三种类型，默认勾选 **GLES3**。在同时勾选多个的情况下，运行时将会根据设备实际支持情况来选择使用的渲染后端。

![Windows build options](publish-native/windows-options.png)

### iOS 平台构建选项

iOS 平台的构建选项包括 **Bundle Identifier**、**屏幕方向** 和 **渲染后端**，其中 **屏幕方向** 的设置与 Android 平台一致。

![iOS build options](publish-native/ios-options.png)

#### Bundle Identifier

包名，通常以产品网站 URL 倒序排列，如 `com.mycompany.myproduct`。

> **注意**：包名中只能包含数字、字母和下划线，此外包名最后一部分必须以字母开头，不能以下划线或数字开头。

#### 渲染后端

**渲染后端** 目前支持 **METAL**。

### Mac 平台构建选项

Mac 平台的构建选项包括 **Bundle Identifier** 和 **渲染后端**，设置方法与 iOS 平台一致。

![Mac build options](publish-native/mac-options.png)

## 构建

构建选项设置完成后，就可以开始构建了，点击 **构建发布** 面板右下角的 **构建** 按钮，开始构建流程。

编译脚本和打包资源时会在 **构建发布** 面板的 **构建任务** 页面显示蓝色的进度条，构建成功的话进度条到达 100% 并显示为绿色：

![build progress](publish-native/build-progress-windows.png)

### 构建目录

构建结束后，我们得到的是一个标准的 Cocos2d-x 工程，和使用 Cocos Console 新建的工程有同样的结构。以 Windows 平台为例，导出的原生工程包 `windows` 的目录结构为：

![native directory](publish-native/native-directory.png)

- `assets`：存放项目资源
- `proj`：存放当前构建的原生平台工程，可用于对应平台的 IDE 执行编译任务，详情请参考下文介绍
- `cocos.compile.config.json`：本次构建的编译选项配置

因为原生平台（例如 Android、Windows）构建后生成的底层 C++ 代码是完全一致的，所以在 v3.0，我们将底层 C++ 代码单独提取出来放在项目目录下共享的 `native/engine/common` 文件夹中。这样在构建原生平台时，如果检测到已经存在该文件夹，这部分内容便不会再进行处理，加快构建速度。

![native-common](publish-native/native-common.png)

更多关于目录结构的说明，请参考 [构建目录差异 — 原生平台](../../release-notes/upgrade-guide-v3.0.md#%E5%8E%9F%E7%94%9F%E5%B9%B3%E5%8F%B0)

### 二次开发

v3.0 做了代码和配置的分离，将一部分代码和配置放入源码管理，位于项目目录下的 `native\engine\当前构建的平台名称` 文件夹中（例如 `native\engine\win32`、`native\engine\android`）。

![native-common](publish-native/native.png)

开发者可以在这里集成 SDK 或者做二次开发，删除构建后生成的发布包目录（例如 `build\windows`）不会影响已经集成的 SDK，但前提是需要在目录中添加代码引用：

- 若集成的是各原生平台通用的 SDK，需要在项目目录下的 `native\engine\common\CMakeLists.txt` 中添加引用。
- 若是基于 iOS、Mac、Windows 平台做二次开发，需要在项目目录下的 `native\engine\当前构建的平台名称\CMakeLists.txt` 中添加引用（例如 `native\engine\ios\CMakeLists.txt`）
- 若是基于 Android 平台做二次开发：
    - C++：需要在项目目录下的 `native\engine\android\CMakeLists.txt` 中添加引用。
    - Java：需要在项目发布包 `build\android\proj\build.gradle` 中添加引用。

更多关于 CMake 的使用，详情可参考 [CMake 使用简介](../../advanced-topics/cmake-learning.md)。

## 生成和运行

Cocos Creator supports **Make** and **Run Preview** steps via the editor or the corresponding IDE for each platform (e.g.: Xcode, Android Studio, Visual Studio).

### 通过编辑器

构建完成后，继续点击旁边的 **生成** 按钮，成功后会提示：

`make package YourProjectBuildPath success!`

> **注意**：首次生成 Android 平台或者版本升级后，建议通过 Android Studio 打开工程，根据提示下载缺失的工具，再进行编译运行。

**生成** 过程完成后，继续点击旁边的 **运行** 按钮，可能还会继续进行一部分编译工作，请耐心等待或通过日志文件查看进展。各平台的运行结果为：

- Mac/Windows 平台会直接在桌面运行预览
- Android 平台必须通过 USB 连接真机，并且在真机上开启 USB 调试后才可以运行预览
- iOS 平台会调用模拟器运行预览，但建议通过 Xcode 连接真机执行 **生成** 和 **运行**，可参考下文介绍。

### 通过 IDE

点击 **构建任务** 左下角的 **文件夹图标** 按钮，就会在操作系统的文件管理器中打开构建发布路径，这个路径中 `build` 目录下的 `proj` 里就包含了当前构建的原生平台工程。

Next, open these generated native projects using the IDE corresponding to the native platform (e.g.: Xcode, Android Studio, Visual Studio) and you can make further operations like compilation, preview and release.

- **Android**

  ![android xcode](publish-native/android-studio.png)

- **Windows**

  ![windows xcode](publish-native/windows-vs.png)

- **iOS** 和 **Mac**

  ![ios xcode](publish-native/ios-xcode.png)

> **注意**：请不要在这些原生平台工程中进行二次开发，否则重新构建时会被覆盖掉。

关于原生平台 IDE 的使用请搜索相关信息，这里就不再赘述了。若要了解如何在原生平台上调试，请参考 [原生平台 JavaScript 调试](debug-jsb.md)。

## 注意事项

1. 在 MIUI 10 系统上运行 debug 模式构建的工程可能会弹出 “Detected problems with API compatibility” 的提示框，这是 MIUI 10 系统自身引入的问题，使用 release 模式构建即可。

2. 打包 iOS 平台时，如果开发者在项目中未使用到 WebView 相关功能，请确保在 **项目 -> 项目设置 -> 功能裁剪** 中剔除 WebView 模块，以提高 iOS 的 App Store 机审成功率。如果开发者确实需要使用 WebView（或者添加的第三方 SDK 自带了 WebView），并因此 iOS 的 App Store 机审不通过，仍可尝试通过邮件进行申诉。

3. Android 平台通过编辑器和 Android Studio 编译后的结果有些区别：

    - 通过编辑器执行 **生成** 步骤后，会在发布路径下生成 `build` 目录，`.apk` 生成在 `build` 目录的 `app\build\outputs\apk` 目录下。

    - 通过 Android Studio 编译后，`.apk` 则生成在 `proj\app\build\outputs\apk` 目录下。

4. 在 Cocos Creator 3.0 中，Android 与 Android Instant 使用同一个构建模板，构建生成的工程都是在 `build\android\proj` 目录中。针对该目录请注意：

    - 如果是 Android 平台单独使用的代码请放入 `app\src` 目录，单独使用的第三方库请放入 `app\libs` 目录（若没有这两个目录可自行创建）。

    - 如果是 Android Instant 单独使用的代码和第三方库请分别放入 `instantapp\src` 和 `instantapp\libs` 目录（若没有这两个目录可自行创建）。

    - 如果是 Android 和 Android Instant 共用的代码和第三方库，请分别放入 `src` 和 `libs` 目录（若没有这两个目录可自行创建）。

    通过在 **构建发布** 面板点击 **生成** 按钮来编译 Android 时，会默认执行 `assembleRelease/Debug`，编译 Android Instant 时会默认执行 `instantapp:assembleRelease/Debug`。
