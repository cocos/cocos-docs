# Cocos Creator 3.0 用户手册

欢迎使用 Cocos Creator 3.0 用户手册！本手册包括详尽的使用说明、面向不同职能用户的工作流程和 step by step 的新手教程。能够帮您快速掌握使用 Cocos Creator 3.0 开发跨平台游戏的方法。

**注意：请在右上角根据您使用的 Cocos Creator 版本选择相应的手册版本。**

## 产品线简介

Cocos（雅基软件）多年来不断发展，已经发布了多个与 Cocos Creator 密切相关的产品线。为避免混淆，以下是对这些产品的简要介绍：
- **Cocos Creator 3.x**：发布于 2021 年初，是当前 Cocos Creator 的最新版本，已经过大量商业项目验证。3.x 完全摒弃了 Cocos2d-x 底层，采用全新高性能跨平台 3D 内核，标志着 Cocos Creator 正式发展为全面的泛移动端 3D 游戏引擎。由于 3.x 底层已经完全重写，Cocos Creator 不再被视为 Cocos2d-x 的直接扩展和升级版本。
- **Cocos Creator 2.x**：发布于 2018 年，2023 年停止更新。所有能力已被 Cocos Creator 3.x 继承，因此建议新项目使用[最新的 Cocos Creator 3.x](https://www.cocos.com/creator-download)。
- **Cocos Creator 3D**：2017 年立项，2019 年底以 Cocos Creator 3D 的身份在中国进行了一年多的小规模测试，后正式合并至 Cocos Creator 3.0。由于已被 Cocos Creator 3.x 替代且不再单独更新，提及 Cocos Creator 3D 时通常指代 Cocos Creator 本身的 3D 能力，而非此特定版本。
- **[Cocos2d-x](https://www.cocos.com/cocos2d-x)**：发布于 2010 年，2019 年停止更新。这是 Cocos2d 社区最活跃的分支，Cocos Creator 2.x 最初采用的底层运行时便是升级过后的 Cocos2d-x。
- **Cocos**：当 Cocos 作为引擎的名字单独出现时，通常代表 Cocos Creator 3.x，而不是 Cocos2d-x。

经过多年的快速发展，Cocos Creator 3.x 与 Cocos Creator 2.x 在用法上已经有所不同，二者的 API 也不完全兼容。因此，在查阅文档、API 和教程时，请开发者注意辨别目标版本是 2.x 还是 3.x，以免因版本不一致导致错误。

## 总导读

- [Cocos Creator 新手入门](getting-started/index.md)
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
- [扩展编辑器](editor/extension/readme.md)
- [进阶主题](advanced-topics/index.md)

## 演示和范例项目

- **展示范例集合**（[GitHub](https://github.com/cocos-creator/example-3d) | [Gitee](https://gitee.com/mirrors_cocos-creator/example-3d)）：从基本组件的使用到渲染效果的展示，这个项目里包括了多个侧重功能不同的场景及多个游戏 Demo 供用户参考
- **一步两步**（[GitHub](https://github.com/cocos-creator/tutorial-mind-your-step-3d) | [Gitee](https://gitee.com/mirrors_cocos-creator/tutorial-mind-your-step-3d)）：也就是 [快速上手](getting-started/first-game/index.md) 文档里分步讲解制作的游戏
- **物理测试范例**（[GitHub](https://github.com/cocos-creator/example-3d/tree/v3.0/physics-3d) | [Gitee](https://gitee.com/mirrors_cocos-creator/example-3d/tree/v3.0/physics-3d)）：包含了一些物理测试例和案例工程，如吞噬黑洞、简化小车、坠落小球等，介绍了一些基础的功能和使用方法，方便用户结合文档了解物理功能。
- **Simple-Games**（[GitHub](https://github.com/cocos-creator/example-3d/tree/v3.0/simple-games) | [Gitee](https://gitee.com/mirrors_cocos-creator/example-3d/tree/v3.0/simple-games)）：简单小游戏集合演示 Demo，用户可通过此案例学习完成一些简单并且常见的小游戏。
- **模块展示集合**（[GitHub](https://github.com/cocos/cocos-test-projects) | [Gitee](https://gitee.com/mirrors_cocos-creator/test-cases-3d)）：引擎各个功能的范例项目，基本涵盖了引擎的大部分功能模块，用户在使用功能时可参考此项目中的用法进行开发。
- **UI 展示 Demo**（[GitHub](https://github.com/cocos/cocos-example-ui/) | [Gitee](https://gitee.com/mirrors_cocos-creator/demo-ui/)）：各类 UI 组件组合使用的演示 Demo。
- **弹弹乐 3D**（[GitHub](https://github.com/cocos/cocos-example-ball) | [Gitee](https://gitee.com/mirrors_cocos-creator/demo-ball)）：用户可通过此项目制作弹弹球游戏。
- **快上车 3D**（[GitHub](https://github.com/cocos/cocos-tutorial-taxi-game) | [Gitee](https://gitee.com/mirrors_cocos-creator/tutorial-taxi-game)）：基于物理的游戏制作 demo，用户可通过此项目制作快上车游戏。

> **注意**：这些项目会不定期跟随版本进行更新。它们在 GitHub 上的默认分支是 master，对应的一般是最新的 Cocos Creator 及版本。如果仍在使用旧版本的 Cocos Creator，这些项目有可能会打不开，可尝试切换到和旧版本相同命名的分支。

## 视频教程

[快上车视频教程](https://space.bilibili.com/491120849/channel/detail?cid=116585)

更多视频教程可前往 [哔哩哔哩 — Cocos 官方](https://space.bilibili.com/491120849/dynamic)。
