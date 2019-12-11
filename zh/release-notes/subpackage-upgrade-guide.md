# v2.5 资源分包升级指南

> 文： Santy-Wang

> 本文将详细介绍旧版本 Creator 项目升级到 v2.5 时的注意事项。如果你不是 Creator 旧版本的用户或项目中没有使用分包功能，则不需要阅读本文。

在 v2.5 之前的 [分包加载](../scripting/subpackage.md) 文档中，我们有提到分包加载，但当时的分包加载功能仅支持具有分包加载的小游戏平台，如微信小游戏、OPPO 小游戏等。Creator 是在平台对应的分包功能上做了一层封装，但随着 Creator 的发展，对于分包的需求不断增加，原有的资源分包功能是远远不够的，所以在 V2.5 上， Creator 正式支持更为专业的 Asset Bundle 功能。需要注意的是， Asset Bundle 与 v2.5 之前的资源分包并没有任何对应关系，所以对于 v2.5 之前的工程做的所有分包加载的配置都将无效。工程将恢复到没有任何分包的状态。

对 **美术策划** 而言，项目中的所有资源，例如场景、动画、Prefab 都不需要修改，也不用升级。<br>
对 **程序** 而言，影响主要体现在需要移除原先在代码中使用的 `cc.loader.downloader.loadSubpackage` API 。

## 常见问题

### 我需要手动升级吗？

如果有下列情况，你需要升级：
 - 你在自己的代码中使用了 `cc.loader.downloader.loadSubpackage` API 来加载子包

## 升级步骤

- 重命名旧版本 Cocos Creator 所在目录，然后安装新版本 Cocos Creator。这样新旧两个版本就能共存。
- **备份好旧版本的工程后**，使用新版 Cocos Creator 打开原有工程，Creator 将对有影响的资源重新导入，第一次升级时会稍微多花一点时间，导入完毕后就会打开编辑器主窗口。打开代码编辑器，移除所有 `cc.loader.downloader.loadSubpackage` 的使用。

## 我该如何使用新版本的分包加载？

关于 Asset Bundle 的详细使用方式请参考 [Asset Bundle](../scripting/asset-bundle.md) 。


