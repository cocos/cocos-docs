# Mac 平台构建选项

![build-options-mac](./images/build-options-mac.png)

## Bundle Identifier

包名，通常以产品网站 URL 倒序排列，如 `com.mycompany.myproduct`。

> **注意**：包名中只能包含数字（0~9）、字母（A~Z、a~z）、中划线（-）和点（.），此外包名最后一部分必须以字母开头，不能以下划线或数字开头。详情请参考 [包的唯一标识符](https://developer.apple.com/documentation/bundleresources/information_property_list/cfbundleidentifier)。

## 目标版本

该项主要用于指定发布 Mac 平台时的 macOS 系统版本，默认值为 **10.14**。构建后版本号会记录在发布包目录 `proj/cfg.cmake` 文件的 `TARGET_OSX_VERSION` 字段中。

## Support Apple Silicon

该项用于更好地提示一些已知的引擎模块在 Apple M1（Silicon）架构设备上的支持问题。

## 跳过 Xcode 工程的更新

默认情况下，项目构建时，会通过 `native/mac/` 下的 Xcode 工程模板更新工程，工程中的一些配置修改会用模板复原。

如果此选项勾选，则构建时，不会再更新 Xcode 工程配置。

这个选项对使用 CocoaPods, 或者需要持久化对 Xcode 工程的修改十分有用. 在没有勾选的情况下, 每次构建都会覆盖 `pod install` 的修改.  勾选之后就不用担心被覆盖了.

> **注意**：若勾选该项，后续若对配置进行了修改，也不会再更新 Xcode 工程。

### 渲染后端

**渲染后端** 目前支持 **METAL**，详情可参考官方文档 [Metal](https://developer.apple.com/cn/metal/)。
