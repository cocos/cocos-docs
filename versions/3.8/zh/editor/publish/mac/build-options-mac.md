# Mac 平台构建选项

![build-options-mac](./images/build-options-mac.png)

## 可执行文件名

用于指定应用程序主执行文件名称的字段，这个字段被存储在应用的 Info.plist 文件中。如果未填写，系统将根据应用名称字段生成默认值。值的设定只能包含数字、字母、下划线(_)以及减号(-)。

## Bundle Identifier

包名，通常以产品网站 URL 倒序排列，如 `com.mycompany.myproduct`。

> **注意**：包名中只能包含数字（0~9）、字母（A~Z、a~z）、中划线（-）和点（.），此外包名最后一部分必须以字母开头，不能以下划线或数字开头。详情请参考 [包的唯一标识符](https://developer.apple.com/documentation/bundleresources/information_property_list/cfbundleidentifier)。

## 目标版本

该项主要用于指定发布 Mac 平台时的 macOS 系统版本，默认值为 **10.14**。构建后版本号会记录在发布包目录 `proj/cfg.cmake` 文件的 `TARGET_OSX_VERSION` 字段中。

## Support Apple Silicon

该项用于更好地提示一些已知的引擎模块在 Apple M1（Silicon）架构设备上的支持问题。

## 跳过 Xcode 工程的更新

在默认情况下，每次构建都会执行 CMake 命令以生成 Xcode 工程。然而，如果对生成的 Xcode 工程进行了修改或配置，例如通过 CocoaPods 集成了 SDK，这可能会引起问题，因为这些修改在下次构建时会被还原。

如果选中这个选项，后续的构建将不再更新或覆盖 Xcode 工程的配置。

要注意的是，与 CMake 相关的其他修改，例如添加C++源代码，也不会再触发 Xcode 工程的重新生成。


### 渲染后端

**渲染后端** 目前支持 **METAL**，详情可参考官方文档 [Metal](https://developer.apple.com/cn/metal/)。
