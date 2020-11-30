# 发布到 Windows 平台

## 环境配置

发布原生平台需要配置一些必要的环境，详情请参考 [原生环境配置](setup-native-development.md)。

## 构建选项

一些通用构建参数的配置，请参照 [通用构建参数介绍](build-options.md)。

![native platform](publish-native/native_platform.jpg)

部分原生平台通用的选项配置，请参照 [原生平台构建参数介绍](native-options.md)。

### 渲染后端

目前支持 vukan、gles3、gles2 三个选项，默认勾选 gles3，选择多个选项的情况下运行时将会根据设备支持情况来选择实际渲染后端。

## 编译/运行工程

### 使用构建面板上的编译、运行按钮

支持编译的平台构建，默认情况下会全部执行完毕。如果有需要单独执行编译任务的。可以在构建完成后，单独点击编译按钮即可。编译运行输出的 log 可以打开构建调试工具查看。

点击运行就能直接打开执行编译好的 win32 工程。

### 使用 vs 编译运行

使用 Visual Studio（推荐使用 Visual Studio 2017）打开构建目录下的 `windows\proj\xxx.sln` 文件或者直接双击该文件，即可编译运行。在安装 Visual Studio 时，请注意需要勾选安装 Windows 8.1 版本 SDK。

**注意**：在 MIUI 10 系统上运行 debug 模式构建的工程可能会弹出 “Detected problems with API compatibility” 的提示框，这是 MIUI 10 系统自身引入的问题，使用 release 模式构建即可。

要了解如何在原生平台上调试，请参考 [原生平台 JavaScript 调试](debug-jsb.md)。
