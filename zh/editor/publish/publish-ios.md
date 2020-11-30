# 发布到 iOS

## 环境配置

发布原生平台需要配置一些必要的环境，详情请参考 [原生环境配置](setup-native-development.md)。

## 构建选项

一些通用构建参数的配置，请参照 [通用构建参数介绍](build-options.md)。

![native platform](publish-native/native_platform.jpg)

部分原生平台通用的选项配置，请参照 [原生平台构建参数介绍](native-options.md)。

下面介绍一些平台特有以及通用选项内需要注意的点：

![iOS 平台选项](publish-native/ios_options.png)

### 渲染后端

目前支持 metal、gles3 两个选项，默认选择 metal。

### Bundle Identifier 包名

（也称作 Package Name 或 Bundle Identifier），通常以产品网站 url 倒序排列，如 `com.mycompany.myproduct`。

**注意**：包名中只能包含数字、字母和下划线，此外包名最后一部分必须以字母开头，不能以下划线或数字开头。

### Orientation 屏幕方向

- portrait: 屏幕直立，home 键在下
- landscapeLeft: 屏幕向左橫置，home 键在屏幕左侧的横屏
- landscapeRight: 屏幕向右橫置，home 键在屏幕右侧的横屏

## 编译/运行工程

### 使用构建面板上的编译、运行按钮

支持编译的平台构建，默认情况下会全部执行完毕。如果有需要单独执行编译任务的。可以在构建完成后，单独点击编译按钮即可。编译运行输出的 log 可以打开构建调试工具查看。

运行也是一样的道理，只需要将手机连接到电脑上，点击运行即可。

### 使用 Xcode 编译/运行

使用 Xcode 打开构建目录下的 `ios\proj\.xcodeproj` 文件，在 Xcode 面板 `General -> Signing` 中设置签名，在 Xcode 左上方选择连接的设备后点击编译按钮进行编译运行。

要了解如何在原生平台上调试，请参考 [原生平台 JavaScript 调试](debug-jsb.md)。
