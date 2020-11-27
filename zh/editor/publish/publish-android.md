# 发布到安卓平台

## 环境配置

发布原生平台需要配置一些必要的环境，详情请参考 [原生环境配置](setup-native-development.md)。

## 构建选项

一些通用构建参数的配置，请参照 [通用构建参数介绍](build-options.md)。

![native platform](publish-native/native_platform.jpg)

部分原生平台通用的选项配置，请参照 [原生平台构建参数介绍](native-options.md)。

下面介绍一些平台特有以及通用选项内需要注意的点：

![Android 平台选项](publish-native/android_options.png)

### 渲染后端

目前支持 vukan、gles3、gles2 三个选项，默认勾选 gles3，选择多个选项的情况下运行时将会根据设备支持情况来选择实际渲染后端。

### 应用 ID 名称（Package Name）

（也称作 Package Name 或 Bundle Identifier），通常以产品网站 url 倒序排列，如 `com.mycompany.myproduct`。

**注意**：包名中只能包含数字、字母和下划线，此外包名最后一部分必须以字母开头，不能以下划线或数字开头。

### Target API Level

设置编译 Android 平台所需的 Target API Level。点击旁边的 `Set Android SDK` 按钮即可快速跳转到配置页，具体配置请参考 [原生环境配置](setup-native-development.md)。

### APP ABI

设置 Android 需要支持的 CPU 类型，可以选择一个或多个选项，分别有 **armeabi-v7a**、**arm64-v8a**、**x86** 三种类型。

**注意**：

- 当你选择一个 ABI 构建完成之后，在不 Clean 的情况下，构建另外一个 ABI，此时两个 ABI 的 so 都会被打包到 apk 中，这个是 Android Studio 默认的行为。若用 Android Studio 导入工程，选择一个 ABI 构建完成之后，先执行一下 **Build -> Clean Project** 再构建另外一个 ABI，此时只有后面那个 ABI 会被打包到 apk 中。

- 项目工程用 Android Studio 导入后，是一个独立的存在，不依赖于构建面板。如果需要修改 ABI，直接修改 **gradle.properties** 中的 **PROP_APP_ABI** 属性即可。

    ![modify abi](publish-native/modify_abi.png)

### 密钥库

Android 要求所有 APK 必须先使用证书进行数字签署，然后才能安装。Cocos Creator 提供了默认的密钥库，勾选 **使用调试密钥库** 就是使用默认密钥库，若用户需要自定义密钥库可去掉 **使用调试密钥库** 勾选。具体请参考 [官方文档](https://developer.android.google.cn/studio/publish/app-signing?hl=zh-cn)

### Orientation 屏幕方向

- portrait: 屏幕直立，home 键在下
- landscapeLeft: 屏幕向左橫置，home 键在屏幕左侧的横屏
- landscapeRight: 屏幕向右橫置，home 键在屏幕右侧的横屏

### 生成 App Bundle (Google Play)

勾选该项即可将游戏打包成 App Bundle 格式用于上传到 Google Play 商店。具体请参考 [官方文档](https://developer.android.google.cn/guide/app-bundle/) 。

## 编译/运行工程

### 使用构建面板上的编译、运行按钮

支持编译的平台构建，默认情况下会全部执行完毕。如果有需要单独执行编译任务的。可以在构建完成后，单独点击编译按钮即可。编译运行输出的 log 可以打开构建调试工具查看。

运行也是一样的道理，只需要将手机连接到电脑上，点击运行即可。

### 使用 Android Studio 编译/运行

使用 Android Studio 打开对应目录下的 proj 文件夹参考对应工具文档使用即可，如版本升级根据提示下载缺失的工具即可，再进行编译运行。

要了解如何在原生平台上调试，请参考 [原生平台 JavaScript 调试](debug-jsb.md)。
