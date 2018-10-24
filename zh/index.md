# Cocos Creator v2.0 用户手册

欢迎使用 Cocos Creator 用户手册！本手册包括详尽的使用说明、面向不同职能用户的工作流程和 step by step 的新手教程。能够帮您快速掌握使用 Cocos Creator 开发跨平台游戏的方法。

**注意**：请在右上角根据您使用的 Cocos Creator 版本选择相应的手册版本。

## 特别推荐

- 从 v2.1 开始，Cocos Creator 引入了 3D 的支持，3D 特性的加入可以大大丰富 2D 游戏的表现力，减轻 2D 游戏的资源开销。在 Creator 2.1 版本中，支持了 3D 模型渲染、3D Camera、3D 骨骼动画 等 3D 特性，同时编辑器原生支持解析 FBX 格式的 3D 模型文件，不需要额外的导入流程，请参阅 [3D 节点](3d/3d-node.md)。
- 从 v2.0.4 开始，Cocos Creator 支持发布到 [Google Play Instant](publish/publish-android-instant.md)。
- 从 v2.0.1 开始，Cocos Creator 升级了开放数据域解决方案，请参阅 [接入小游戏开放数据域](publish/publish-wechatgame-sub-domain.md)。
- [v2.0 升级指南](release-notes/upgrade-guide-v2.0.md)
- 从 v1.10 开始，Cocos Creator 对底层资源类型进行了重构，绝大多数项目不受影响，但有些项目可能会收到一些警告，详情请查阅 [v1.10 资源升级指南](release-notes/raw-asset-migration.md)。
- 从 v1.10 开始，Cocos Creator 支持微信小游戏平台代码分包，请参阅 [代码分包加载](scripting/subpackage.md)。
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
- [3D 系统](3d/index.md)

## 视频教程

前往[视频教程](video-tutorial/index.md)页面。

## 演示和范例项目

- [范例集合](https://github.com/cocos-creator/example-cases)：从基本的组件到交互输入，这个项目里包括了 case by case 的功能点用法介绍。
- [Star Catcher](https://github.com/cocos-creator/tutorial-first-game)：也就是 [快速上手](getting-started/quick-start.md) 文档里分步讲解制作的游戏。
- [腾讯合作开发的21点游戏](https://github.com/cocos-creator/tutorial-blackjack)
- [UI 展示 Demo](https://github.com/cocos-creator/demo-ui)
- [Duang Sheep](https://github.com/cocos-creator/tutorial-duang-sheep)：复制 FlappyBird 的简单游戏，不过主角换成了绵羊。
- [暗黑斩 Cocos Creator 复刻版](https://github.com/cocos-creator/tutorial-dark-slash)：由 Veewo Games 独家授权原版暗黑斩资源素材，在 Cocos Creator 里复刻的演示项目
- [i18n 游戏多语言支持范例](https://github.com/nantas/demo-i18n)

**注意**，这些项目会不定期跟随版本进行更新。它们在 GitHub 上的默认分支是 master，对应的一般是最新的 Cocos Creator 版本。如果仍在使用旧版本的 Cocos Creator，这些项目有可能会打不开，可尝试切换到和旧版本相同命名的分支。