# v2.4 资源分包升级指南

> 文：Santy-Wang

> 本文介绍旧版本的资源分包（子包）升级到 v2.4 时的注意事项。如果你使用的不是 Creator 旧版本或者项目中没有使用分包功能，则不需要阅读本文。

在 v2.4 之前的 [分包加载](../../../../2.3/manual/zh/scripting/subpackage.html) 功能仅支持各类小游戏平台，如微信小游戏、OPPO 小游戏等。Creator 是在平台对应的分包功能上做了一层封装，但随着 Creator 的发展，对于分包的需求不断增加，原有的资源分包功能是远远不够的，所以在 v2.4 上，Creator 正式支持更为完整的 Asset Bundle 功能。需要注意的是，如果你在项目中勾选了 **配置为子包** 选项，升级为 v2.4 之后，将自动转变为 Asset Bundle。

对 **美术策划** 而言，项目中的所有资源，例如场景、动画、Prefab 都不需要修改，也不用升级。<br>
对 **程序** 而言，影响主要体现在需要修改原先在代码中使用的 `cc.loader.downloader.loadSubpackage` API 为 Asset Manager 中的对应接口。

## 常见问题

### 我需要手动升级吗？

如果有下列情况，你需要升级：
 - 你在自己的代码中使用了 `cc.loader.downloader.loadSubpackage` API 来加载分包

## 升级步骤

- **备份好旧版本的工程**
- 在 CocosDashboard 中使用新版 Cocos Creator 打开原有工程，Creator 将对有影响的资源重新导入，第一次升级时会稍微多花一点时间，导入完毕后就会打开编辑器主窗口。打开代码编辑器，将所有 `cc.loader.downloader.loadSubpackage` 改为使用 `cc.assetManager.loadBundle`。

```js
    // 修改前
    cc.loader.downloader.loadSubpackage('sub1', (err) => {
        cc.loader.loadRes('sub1/sprite-frames/background', cc.SpriteFrame);
    });

    // 修改后
    cc.assetManager.loadBundle('sub1', (err, bundle) => {
        // 传入该资源相对 Asset Bundle 根目录的相对路径
        bundle.load('sprite-frames/background', cc.SpriteFrame);
    });
```

**注意**：
1. 加载 Asset Bundle 中的资源需要使用 Asset Bundle 的相关 API。相关 API 请查看 [Asset Bundle](../../../api/en/classes/Bundle.html)

## 我该如何使用新版本的分包加载？

关于 Asset Bundle 的详细使用方式请参考 [Asset Bundle](../scripting/asset-bundle.md)。


