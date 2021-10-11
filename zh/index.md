# Cocos Creator v2.4 用户手册

欢迎使用 Cocos Creator 用户手册！本手册包括详尽的使用说明、面向不同职能用户的工作流程和 step by step 的新手教程。能够帮您快速掌握使用 Cocos Creator 开发跨平台游戏的方法。

> **注意**：请在右上角根据您使用的 Cocos Creator 版本选择相应的手册版本。

## 特别推荐

- 从 v2.4.2 开始，Cocos Creator 支持发布到 [字节跳动小游戏](publish/publish-bytedance.md)。
- 从 v2.4.1 开始，Cocos Creator 支持发布到 [HUAWEI AppGallery Connect](publish/publish-huawei-agc.md)。
- 从 v2.4.0 开始，Cocos Creator 重写了资源管理模块，兼容了大部分原有的 API。除个别项目使用了无法兼容的特殊用法的 API 必须手动升级外，大部分项目都可以照常运行。建议开发者都升级到最新的资源管理模块。详情请查阅 [v2.4 资源管理模块升级指南](release-notes/asset-manager-upgrade-guide.md) 和 [v2.4 资源分包升级指南](release-notes/subpackage-upgrade-guide.md)。
- 从 v2.4.0 开始，Cocos Creator 正式支持了 Asset Bundle，提供了更强大的远程资源加载能力、子项目动态加载能力，并进一步减小了首包的大小。详情请查阅 [Asset Bundle](scripting/asset-bundle.md)。
- 从 v2.4.0 开始，编辑器的构建流程将以 Asset Bundle 为单元。如果开发者在 v2.4 之前有在编辑器中使用插件扩展了构建流程，则需要对部分 API 的使用进行升级。详情请查阅 [定制构建流程升级指南](release-notes/build-extend-upgrade-guide.md)。
- 从 v2.3.4 开始，Cocos Creator 新增了对 [腾讯云服务](cocos-service/tcb.md) 的支持。
- 从 v2.3.0 开始，Cocos Creator 新增了对 [3D 物理与碰撞系统](physics-3d/index.md)、[3D 粒子](3d/particle-system-3d.md) 的支持，同时 [材质系统](render/index.md) 也升级到了正式版。
- [Spine 换装指南](components/spine.md#spine-%E6%8D%A2%E8%A3%85)。
- [DragonBones 换装指南](components/dragonbones.md)。
- 从 v2.1.4 开始，Cocos Creator 支持发布到 [支付宝小游戏](publish/publish-alipay-mini-games.md)。
- 从 v2.1 开始，Cocos Creator 引入了 3D 的支持。详情请查阅 [3D 节点](3d/index.md)。
- 从 v2.0.10 开始，Cocos Creator 支持发布到 [小米快游戏](publish/publish-xiaomi-quick-games.md) 及 [Cocos Play](publish/publish-cocosplay.md)。
- 从 v2.0.9 开始，Cocos Creator 支持发布到 [百度小游戏](publish/publish-baidugame.md)。
- 从 v2.0.7 开始，Cocos Creator 支持发布到 [华为快游戏](publish/publish-huawei-quick-games.md)。
- 从 v2.0.5 开始，Cocos Creator 支持发布到 [OPPO 小游戏](publish/publish-oppo-instant-games.md) 及 [vivo 小游戏](publish/publish-vivo-instant-games.md)。
- 从 v2.0.4 开始，Cocos Creator 支持发布到 [Google Play Instant](publish/publish-android-instant.md)。
- [v2.0 升级指南](release-notes/upgrade-guide-v2.0.md)
- 从 v1.10 开始，Cocos Creator 对底层资源类型进行了重构，绝大多数项目不受影响，但有些项目可能会收到一些警告，详情请查阅 [v1.10 资源升级指南](release-notes/raw-asset-migration.md)。

## 总导读

- [Cocos Creator 入门](getting-started/index.md)
- [资源工作流程](asset-workflow/index.md)
- [场景制作工作流程](content-workflow/index.md)
- [脚本开发指南](scripting/index.md)
- [发布跨平台游戏](publish/index.md)
- [图像和渲染](render/index.md)
- [UI 系统](ui/index.md)
- [动画系统](animation/index.md)
- [音乐和音效](audio/index.md)
- [2D 物理和碰撞系统](physics/index.md)
- [3D 系统](3d/index.md)
- [3D 物理与碰撞系统](physics-3d/index.md)
- [扩展编辑器](extension/index.md)
- [进阶主题](advanced-topics/index.md)
- [SDK 集成](sdk/index.md)

## 视频教程

前往 [视频教程](video-tutorial/index.md) 页面。

## 演示和范例项目

- **范例集合**（[GitHub](https://github.com/cocos-creator/example-cases) | [Gitee](https://gitee.com/mirrors_cocos-creator/example-cases)）：从基本的组件到交互输入，这个项目里包括了 case by case 的功能点用法介绍。
- **Star Catcher**（[GitHub](https://github.com/cocos-creator/tutorial-first-game) | [Gitee](https://gitee.com/mirrors_cocos-creator/tutorial-first-game)）：也就是 [快速上手](getting-started/quick-start.md) 文档里分步讲解制作的游戏。
- **腾讯合作开发的 21 点游戏**（[GitHub](https://github.com/cocos-creator/tutorial-blackjack) | [Gitee](https://gitee.com/mirrors_cocos-creator/tutorial-blackjack))
- **UI 展示 Demo**（[GitHub](https://github.com/cocos-creator/demo-ui) | [Gitee](https://gitee.com/mirrors_cocos-creator/demo-ui))
- **暗黑斩 Cocos Creator 复刻版**（[GitHub](https://github.com/cocos-creator/tutorial-dark-slash) | [Gitee](https://gitee.com/mirrors_cocos-creator/tutorial-dark-slash)）：由 Veewo Games 独家授权原版暗黑斩资源素材，在 Cocos Creator 里复刻的演示项目。

> **注意**：这些项目会不定期跟随版本进行更新。它们在 GitHub 上的默认分支是 master，对应的一般是最新的 Cocos Creator 版本。如果仍在使用旧版本的 Cocos Creator，这些项目有可能会打不开，可尝试切换到和旧版本相同命名的分支。
