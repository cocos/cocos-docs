# Cocos Creator v1.9 用户手册

欢迎使用 Cocos Creator 用户手册！本手册包括详尽的使用说明、面向不同职能用户的工作流程和 step by step 的新手教程。能够帮您快速掌握使用 Cocos Creator 开发跨平台游戏的方法。

> **注意**：请在右上角根据您使用的 Cocos Creator 版本选择相应的手册版本。

## 产品线简介

Cocos（雅基软件）经过多年发展，已发布过若干和 Cocos Creator 关联性较强的产品线，为避免混淆，这里进行简要介绍。
- Cocos Creator：2016 年初发布；功能全面升级，完美支持 Web 和小游戏平台，经过大量商业项目验证，是 Cocos 引擎家族的核心产品。
  - Cocos Creator 3.x：特指 Cocos Creator 的 3.x 版本；3.0 于 2021 年初发布，彻底抛弃 Cocos2d-x 底层，采用全新高性能跨平台 3D 内核，标志 Cocos Creator 正式发展为全面的泛移动端 3D 游戏引擎。由于 3.x 底层已完全重写，Cocos Creator 不再被视为 Cocos2d-x 的直接扩展和升级版本。
  - Cocos Creator 2.x：特指 Cocos Creator 的 1.x 和 2.x 版本，最初从 Cocos2d-x 继承了原生平台的底层运行时，但随后进行了大量重写和升级。2.4 于 2020 年中发布，2023 年发布 2.4.12 后停止更新，因此新项目建议使用[最新的 Cocos Creator 3.x](https://www.cocos.com/creator-download)。
- Cocos Creator 3D：2017 年立项，2019 年底以 Cocos Creator 3D 的身份在中国进行了一年多的小规模测试，后正式合并至 Cocos Creator 3.0。由于已被 Cocos Creator 3.x 取代较长时间且不再单独更新，提及 Cocos Creator 3D 时通常指代 Cocos Creator 本身的 3D 能力，而非此特定版本。
- [Cocos2d-x](https://www.cocos.com/cocos2d-x)：2010 发布，是 Cocos2d 社区最活跃的分支，目前已停止更新。

Cocos Creator 3.x 经多年快速发展，与 Cocos Creator 2.x 在用法上已有较大差异，二者的 API 也不完全兼容。因此，开发者在查阅文档、API 及教程时请注意辨别目标版本是 2.x 还是 3.x，以免因版本不一致导致错误。

## 特别推荐

 <!--
 - 从 v1.10 开始，Cocos Creator 对底层资源类型进行了重构，绝大多数项目不受影响，但有些项目可能会收到一些警告，详情请查阅 [v1.10 资源升级指南](release-notes/raw-asset-migration.md)。
 -->
- 从 v1.9 开始，Cocos Creator 支持发布到 [Facebook Instant Games](publish/publish-fb-instant-games.md) 及 [QQ 玩一玩](publish/publish-qqplay.md)。
- 从 v1.8 开始，Cocos Creator 支持发布到微信小游戏平台，请参阅 [发布到微信小游戏平台](publish/publish-wechatgame.md)。
- Cocos Creator 还支持导出场景和 UI 到 Cocos2d-x，请参阅 [C++/Lua 引擎支持](advanced-topics/cpp-lua.md)。

## 总导读

- [Cocos Creator 入门](getting-started/index.md)
- [资源工作流程](asset-workflow/index.md)
- [场景制作工作流程](content-workflow/index.md)
- [图像和渲染](render/index.md)
- [UI 系统](ui/index.md)
- [编程开发指南](scripting/index.md)
- [动画系统](animation/index.md)
- [碰撞系统](physics/collision/index.md)
- [音乐和音效](audio/index.md)
- [发布跨平台游戏](publish/index.md)
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
