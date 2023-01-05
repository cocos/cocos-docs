# Asset Manager 概述

> 文：Santy-Wang、Xunyi

在游戏的开发过程中，一般需要使用到大量的图片、音频等资源来丰富整个游戏内容，而大量的资源就会带来管理上的困难。所以 Creator 提供了 **Asset Manager** 资源管理模块来帮助开发者管理其资源的使用，大大提升开发效率和使用体验。

**Asset Manager** 是 Creator 在 v2.4 新推出的资源管理器，用于替代之前的 `loader`。新的 Asset Manager 资源管理模块具备加载资源、查找资源、销毁资源、缓存资源、Asset Bundle 等功能，相比之前的 `loader` 拥有更好的性能，更易用的 API，以及更强的扩展性。所有函数和方法可通过 `assetManager` 进行访问，所有类型和枚举可通过 `AssetManager` 命名空间进行访问。

**注意**：为了带来平滑的升级体验，我们会在一段时间内保留对 `loader` 的兼容，但还是建议新项目统一使用 **Asset Manager**。

你可以参考以下文章升级：

- [loader 升级 assetManager 指南](asset-manager-upgrade-guide.md)
- [子包升级 Asset Bundle 指南](subpackage-upgrade-guide.md)

## 加载资源

### 动态加载资源

除了在编辑场景时，可以将资源应用到对应组件上，Creator 还支持在游戏运行过程中动态加载资源并进行设置。而动态加载资源 Asset Manager 提供了以下两种的方式：

1. 通过将资源放在 resources 目录下，并配合 `resources.load` 等 API 来实现动态加载。
2. 开发者可以自己规划资源制作为 Asset Bundle，再通过 Asset Bundle 的 `load` 系列 API 进行资源的加载。例如：

    ```typescript
    resources.load('images/background/spriteFrame', SpriteFrame, (err, asset) => {
      this.getComponent(Sprite).spriteFrame = asset;
    });
    ```

相关的 API 列表如下：

| 类型 | 支持 | 加载 | 释放 | 预加载 | 获取 | 查询资源信息 |
| :-- | :-- | :-- | :-- | :-- | :-- | :-- |
| 单个资源 | Asset Bundle   | load       | release      | preload      | get | getInfoWithPath |
| 文件夹   | Asset Bundle   | loadDir    | releaseAsset | preloadDir   | N/A | getDirWithPath  |
| 场景     | Asset Bundle   | loadScene  | N/A          | preloadScene | N/A | getSceneInfo    |
| 单个资源 | `resources` | load       | release      | preload      | get | getInfoWithPath |
| 文件夹   | `resources` | loadDir    | releaseAsset | preloadDir   | N/A | getDirWithPath  |
| 远程     | Asset Manager  | loadRemote | releaseAsset | N/A          | N/A | N/A             |

相关文档可参考：

- [动态加载资源](dynamic-load-resources.md)

所有加载到的资源都会被缓存在 `assetManager` 中。

### 预加载

为了减少下载的延迟，`assetManager` 和 Asset Bundle 中不但提供了加载资源的接口，每一个加载接口还提供了对应的预加载版本。开发者可在游戏中进行预加载工作，然后在真正需要时完成加载。预加载只会下载必要的资源，不会进行反序列化和初始化工作，所以性能消耗更小，适合在游戏过程中使用。

```typescript
start () {
    resources.preload('images/background/spriteFrame', SpriteFrame);
    setTimeOut(this.loadAsset.bind(this), 10000);
}

loadAsset () {
    resources.load('images/background/spriteFrame', SpriteFrame, (err, asset) => {
        this.getComponent(Sprite).spriteFrame = asset;
    });
}
```

关于预加载的更多内容请参考 [预加载与加载](preload-load.md)。

## Asset Bundle

开发者可以将自己的场景、资源、代码划分成多个 Asset Bundle，并在运行时动态加载资源，从而实现资源的模块化，以便在需要时加载对应资源。例如：

```typescript
assetManager.loadBundle('testBundle', function (err, bundle) {
    bundle.load('textures/background', (err, asset) => {
        // ...
    });
});
```

更多关于 Asset Bundle 的介绍请参考 [bundle](bundle.md)。

## 释放资源

Asset Manager 提供了更为方便的资源释放机制，在释放资源时开发者只需要关注该资源本身而不再需要关注其依赖资源。引擎会尝试对其依赖资源根据引用数量进行释放，以减少用户管理资源释放的复杂度。例如：

```typescript
resources.load('prefabs/enemy', Prefab, function (err, asset) {
    assetManager.releaseAsset(asset);
});
```

Creator 还提供了引用计数机制来帮助开发者控制资源的引用和释放。例如：

- 当需要持有资源时，请调用 `addRef` 来增加引用，确保该资源不会被其他引用到的地方自动释放。

  ```typescript
  resources.load('textures/armor/texture', Texture2D, function (err, texture) {
      texture.addRef();
      this.texture = texture;
  });
  ```

- 当不再需要持有该资源时，请调用 `decRef` 来减少引用，`decRef` 还将根据引用计数尝试自动释放。

  ```typescript
  this.texture.decRef();
  this.texture = null;
  ```

更多详细内容请参考文档 [资源释放](release-manager.md)。

## 缓存管理器

在某些平台上，比如微信小游戏，因为存在文件系统，所以可以利用文件系统对一些远程资源进行缓存。此时需要一个缓存管理器来管理所有缓存资源，例如缓存资源、清除缓存资源、修改缓存周期等。从 v2.4 开始，Creator 在所有存在文件系统的平台上都提供了缓存管理器，以便对缓存进行增删改查操作。例如：

```typescript
// 获取某个资源的缓存
assetManager.cacheManager.getCache('http://example.com/bundle1/import/9a/9aswe123-dsqw-12xe-123xqawe12.json');

// 清除某个资源的缓存
assetManager.cacheManager.removeCache('http://example.com/bundle1/import/9a/9aswe123-dsqw-12xe-123xqawe12.json');
```

更多缓存管理器的介绍请参考 [缓存管理器](cache-manager.md)。

## 可选参数

`assetManager` 和 Asset Bundle 的部分接口都额外提供了 `options` 参数，可以极大地增加灵活性以及扩展空间。`options` 中除了可以配置 Creator 内置的参数之外，还可以自定义任意参数，这些参数将提供给下载器、解析器以及加载管线。

```typescript
bundle.loadScene('test', { priority: 3 }, callback);
```

更多关于 `options` 的内容可参考文档 [可选参数](options.md)。

如果不需要配置引擎内置参数或者自定义参数来扩展引擎功能，可以无视它，直接使用更简单的 API 接口，比如 `resources.load`。

## 加载管线

为了更方便地自定义资源加载流程，Asset Manager 底层使用了名为 **管线与任务**、**下载与解析** 的机制来完成资源的加载工作，极大地增加了灵活性和定制性。如果需要自定义加载管线或自定义管线，可以参考：

- [管线与任务](pipeline-task.md)
- [下载与解析](downloader-parser.md)

## 更多参考

- [Asset Bundle](bundle.md)
- [资源释放](release-manager.md)
- [下载与解析](downloader-parser.md)
- [加载与预加载](preload-load.md)
- [缓存管理器](cache-manager.md)
- [可选参数](options.md)
- [管线与任务](pipeline-task.md)
