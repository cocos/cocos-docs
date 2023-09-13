# Cocos Creator 3.8 用户手册

欢迎使用 Cocos Creator 3.8！

Cocos Creator 既是一款高效、轻量、免费开源的跨平台 2D&3D 图形引擎，也是一个实时 2D&3D 数字内容创作平台。拥有 **高性能**、**低功耗**、**流式加载**、**跨平台** 等诸多优点，您可以用它来创作 **游戏**、**车机**、**XR**、**元宇宙** 等领域的项目。

本手册包括详尽的使用说明、面向不同职能用户的工作流程和新手教程，可以帮您快速掌握如何使用 Cocos Creator 以及其相关服务。

您可以将此文档从头读到尾，也可以在有需要的时候用来查阅。

如果您是第一次使用 Cocos Creator，可以从 [新手上路](getting-started/index.md) 和 [示例与教程](./cases-and-tutorials/index.md) 开始。

如果您已经熟悉其他引擎如 Unity，您可以查看 [Unity 开发者入门 Cocos Creator 快速指南](./guide/unity/index.md) 来快上上手 Cocos Creator。

## v3.8 新增功能

- 此版本中增加了 **程序化动画**、**高精度文本**、**全新的自定义渲染管线**、**角色控制器** 等全新特性。
- 完整的更新列表请前往 [发布说明](https://www.cocos.com/creator-download)
- 采用 Cocos Creator 旧版本的项目升级请参考 [升级指南](./release-notes/index.md)

## 用户手册主要模块

- [场景制作](concepts/scene/index.md)
- [资源系统](asset/index.md)
- [脚本指南及事件系统](scripting/index.md)
- [发布跨平台游戏](editor/publish/index.md)
- [图形渲染](module-map/graphics.md)
- [2D 渲染](2d-object/2d-render/index.md)
- [UI 系统](2d-object/ui-system/index.md)
- [动画系统](animation/index.md)
- [声音系统](audio-system/overview.md)
- [物理系统](physics/index.md)
- [粒子系统](particle-system/index.md)
- [缓动系统](tween/index.md)
- [地形系统](editor/terrain/index.md)
- [资源管理](asset/asset-manager.md)
- [本地化](editor/l10n/overview.md)
- [扩展编辑器](editor/extension/readme.md)
- [进阶主题](advanced-topics/index.md)

## 更多内容

- [Cocos 官方论坛](https://forum.cocos.org/) 可以提问、查找问题答案、与其他开发者交流
- [案例与教程](./cases-and-tutorials/index.md) 可以获得教程和官方示例项目
- [Cocos Store](https://store.cocos.com) 可以获得更多素材、学习案例以及源码

## 产品线简介

Cocos（雅基软件）多年来不断发展，已经发布了多个与 Cocos Creator 密切相关的产品线。为避免混淆，以下是对这些产品的简要介绍：
- **Cocos Creator 3.x**：发布于 2021 年初，是当前 Cocos Creator 的最新版本，已经过大量商业项目验证。3.x 完全摒弃了 Cocos2d-x 底层，采用全新高性能跨平台 3D 内核，标志着 Cocos Creator 正式发展为全面的泛移动端 3D 游戏引擎。由于 3.x 底层已经完全重写，Cocos Creator 不再被视为 Cocos2d-x 的直接扩展和升级版本。
- **Cocos Creator 2.x**：发布于 2018 年，2023 年停止更新。所有能力已被 Cocos Creator 3.x 继承，因此建议新项目使用[最新的 Cocos Creator 3.x](https://www.cocos.com/creator-download)。
- **Cocos Creator 3D**：2017 年立项，2019 年底以 Cocos Creator 3D 的身份在中国进行了一年多的小规模测试，后正式合并至 Cocos Creator 3.0。由于已被 Cocos Creator 3.x 替代且不再单独更新，提及 Cocos Creator 3D 时通常指代 Cocos Creator 本身的 3D 能力，而非此特定版本。
- **[Cocos2d-x](https://www.cocos.com/cocos2d-x)**：发布于 2010 年，2019 年停止更新。这是 Cocos2d 社区最活跃的分支，Cocos Creator 2.x 最初采用的底层运行时便是升级过后的 Cocos2d-x。
- **Cocos**：当 Cocos 作为引擎的名字单独出现时，通常代表 Cocos Creator 3.x，而不是 Cocos2d-x。

经过多年的快速发展，Cocos Creator 3.x 与 Cocos Creator 2.x 在用法上已经有所不同，二者的 API 也不完全兼容。因此，在查阅文档、API 和教程时，请开发者注意辨别目标版本是 2.x 还是 3.x，以免因版本不一致导致错误。
