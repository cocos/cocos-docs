# Google Play Games on PC

[Google Play Games （GPG）](https://play.google.com/googleplaygames#section-system-requirements) 是由谷歌开发，可以让您的移动端 APK 在 PC 上发布、游玩的相关技术。

自 v3.8 起，Cocos Creator 将提供发布到 GPG 的支持。这样将有助于您安卓版本游戏在 PC 平台发布以获取更多的增长。

在开始之前，我们建议您先阅读 [GPG 官方网站](https://developer.android.com/games/playgames/overview?hl=zh-cn) 以便快速介入 GPG SDK。

## 接入指南

1. 为了让游戏可以在 Windows 上运行（包括 intel 和 AMD 芯片），您需要采用 x86 架构进行构建。在 Cocos Creator 构建时，选中 [APP ABI](../native-options.md#app-abi) 并勾选 x86：

    ![ap](./index/app-abi.png)

2. GPG 采用的 OpenGL ES 版本是 3.0，请不要使用高于 3.0 版本。Cocos Creator 支持的最高版本的 OpenGL ES 是 3.0。
3. Vulkan 的版本是 1.1，对于 Cocos Creator 来说，只在构建选项中需要勾选 Vulkan 即可。
4. 需要去除相关的移动端平台的特性，例如 [不受支持的 Android 功能和权限](https://developer.android.com/games/playgames/pc-compatibility#unsupported-android-features) 以及 [Google Play 游戏电脑版的 PC 兼容性和优化](https://developer.android.com/games/playgames/pc-compatibility#unsupported-features-2)。对于已发布的安卓项目，可以参考 [去除相关特性]() 去除。
5. 删除安卓应用的权限对话框，[详情](https://developer.android.com/games/playgames/pc-compatibility#permissions-dialogs)。
6. 删除不支持的 Google Play API，[详情](https://developer.android.com/games/playgames/pc-compatibility#unsupported-google-apis)。
7. 启用分区存储，[详情](https://developer.android.com/games/playgames/pc-compatibility#scoped-storage)。
8. 添加可缩放 UI，对于大屏幕，游戏需要支持将 UI 缩放至合适的比例，[详情](https://developer.android.com/games/playgames/graphics?hl=zh-cn#ui-scaling)。
9. 支持所需纵横比，GPG 需要支持的宽高比为 21：9。为更好的游戏体验，游戏可以选择支持 16：9， 16：10，21：9 和 3：2。纵屏游戏只需支持 9：16，如无横屏模式，GPG 将以全屏模式渲染。
10. 适配窗口变换，GPG 游戏渲染的分辨率将在游戏启动时、窗口大小重设时、全屏和窗口模型切换时改变游戏的渲染分辨率，[详情](https://developer.android.com/games/playgames/graphics#dynamic-display)
11. 高分辨率资产和贴图处理，[详情](https://developer.android.com/games/playgames/graphics#large-screen-optimization)。
12. [集成 Input SDK](../gpg-input-sdk.md)。
13. 记入谷歌游戏服务，[详情](https://developer.android.com/games/pgs/start)。

## 发布流程

GPG 的发布流程和安卓的发布历程类似，您可以参考下列文档以获取发布支持。

- [安卓构建示例](../android/build-example.md)
- [原生发布](../native-options.md)

## 内容

- [集成 Input SDK](../gpg-input-sdk.md)
- [安卓构建示例](../android/build-example.md)
- [原生发布](../native-options.md)
- [手把手接入教程](./sample.md)

## 相关链接

- [GPG 官方网站](https://developer.android.com/games/playgames/overview?hl=zh-cn)
