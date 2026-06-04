# 资源分包升级指南

> 文：Santy-Wang、Xunyi
>
> 本文将详细介绍 Cocos Creator 3D 的小游戏子包升级到 Asset Bundle 的注意事项。v2.4 的资源分包与 v3.0 差别不大，无需升级。

在 v2.4 之前，[分包加载](https://github.com/cocos/cocos-docs/blob/e02ac31bab12d3ee767c0549050b0e42bd22bc5b/zh/scripting/subpackage.md) 功能仅支持各类小游戏平台，如微信小游戏、OPPO 小游戏等。但随着 Creator 的发展，开发者对分包的需求不断增加，例如多平台支持，原有的分包加载已经远远不能满足了。所以，Creator 从 v2.4 开始正式支持功能更为完整的 **Asset Bundle**。

- 对 **美术策划** 而言，项目中的所有资源，例如场景、动画、Prefab 都不需要修改，也不用升级。
- 对 **程序** 而言，影响主要体现在原先代码中使用的 `loader.downloader.loadSubpackage` 需要改为 Asset Manager 中的 `assetManager.loadBundle`。以下将详细介绍这部分内容。

> **注意**：如果你在旧项目中使用了分包功能，也就是在 **属性检查器** 中勾选了 **配置为子包** 选项，那么当项目升级到 v2.4 之后，将自动转变为一个普通文件夹。你可以参考这里进行 Asset Bundle 的配置：

[配置 Asset Bundle](bundle.md)

## 需要手动升级的情况

你在自己的代码中使用了 `loader.downloader.loadSubpackage` 来加载分包。

## 升级步骤

- **备份好旧项目**
- 在 Dashboard 中使用 Cocos Creator v3.0 打开需要升级分包的旧项目，Creator 会对有影响的资源重新导入。第一次导入时会稍微多花一点时间，导入完毕后就会打开编辑器主窗口。然后使用代码编辑器将所有 `loader.downloader.loadSubpackage` 替换为 `assetManager.loadBundle`。

  ```typescript
  // 修改前
  loader.downloader.loadSubpackage('sub1', (err) => {
    loader.loadRes('sub1/sprite-frames/background', SpriteFrame);
  });

  // 修改后
  assetManager.loadBundle('sub1', (err, bundle) => {
    // 传入该资源相对 Asset Bundle 根目录的相对路径
    bundle.load('sprite-frames/background/spriteFrame', SpriteFrame);
  });
  ```

  > **注意**：加载 Asset Bundle 中的资源需要使用 Asset Bundle 相关的 API，具体请查看 API 文档 [Asset Bundle](%__APIDOC__%/zh/class/AssetManager.Bundle)。

## Asset Bundle 的使用方式

关于 Asset Bundle 的具体使用方式，请参考文档 [Asset Bundle](bundle.md)。
