# Asset Manager 概览

> 文： Santy-Wang

`Asset Manager` 是 v2.3 之后， Creator 推出的新的资源管理模块，其具备加载资源，查找资源，销毁资源，缓存资源，Asset Bundle 等功能。 `Asset Manager` 拥有更加的性能，更易用的 API ，更强的扩展性。所有函数和方法可通过 `cc.assetManager` 进行访问，所有类型和枚举可通过 `cc.AssetManager` 命名空间进行访问。

## 加载资源

### 动态加载资源

除了在编辑场景时，将资源应用到对应组件上之外， Creator 还支持在游戏运行过程中动态加载资源并进行设置。Asset Manager 更提供了两种动态加载资源的方式：1. 通过将资源放在 resources 目录下实现动态加载，并配合 `cc.assetManager.loadRes` 等 API 进行加载，2. 开发者可以自己规划资源制作为 Asset Bundle ，再通过 Asset Bundle 的 `loadAsset` 系列 API 进行资源的加载。例如：

```js
cc.assetManager.loadRes('images/background', cc.SpriteFrame, function (err) {
    self.getComponent(cc.Sprite).spriteFrame = asset;
});
```

相关文档可参考：

[获取和加载资源](../scripting/load-assets.md)
[Asset Bundle](../scripting/asset-bundle.md)

所有加载到的资源会被缓存到 `cc.assetManager` 中。

### 加载管线

为了更方便地扩展资源加载流程，Asset Manager 底层使用名为 **管线与任务** ，**下载器与解析器** 的机制来完成资源的加载工作，其带来了巨大的灵活性和扩展性。如果你想扩展加载管线或自定义管线，可以参考：

[管线与任务](pipeline-task.md)
[下载器与解析器](downloader-parser.md)


### 预加载

为了降低下载的延迟，`cc.assetManager` 和 Asset Bundle 中除了提供加载资源的接口，每一个加载接口还提供了对应的预加载版本，开发者可在游戏中提前进行预加载工作，而在真正需要时完成加载，而预加载只会去下载必要资源，不会进行反序列化和初始化工作，所以性能消耗更小，适合在游戏过程中使用：

```js
var task = cc.assetManager.preloadRes('images/background', cc.SpriteFrame, function (err) {
    cc.assetManager.loadRes(task, function (err, asset) {
        self.getComponent(cc.Sprite).spriteFrame = asset;
    });
});
```

关于预加载更多内容请参考 [预加载与加载](preload-load.md) 。


### 可选参数

除此之外，为了增加灵活性和扩展空间，`cc.assetManager` 的大部分加载接口与 Asset Bundle 下的大部分加载接口都额外提供了一个 `options` 参数。可以利用 options 选项设置一些额外参数，如果你不需要更多的设置，建议你忽略 options 参数以及使用更为简单的 API 接口，比如 `cc.assetManager.loadRes` 等接口并跳过此部分介绍，如果你需要配置更多选项或者想扩展引擎加载功能，你可以参考如下：

```js
var options = { isCrossOrigin: true };
cc.assetManager.loadRemoteTexture('http://example.com/background.jpg', options, callback);

options = { ext: '.mp3' };
cc.assetManager.load({ url: 'http://example.com/music?user=anonymous' }, options, callback);
```

options 中除了可以指定 Creator 内置的参数之外，开发者还可以设计自己的参数配合下载器，解析器，加载管线用于扩展引擎功能。例如：

```js
cc.assetManager.downloader.register('.myformat', function (url, options, callback) {
    if (options.user === 'anonymous') {
        cc.assetManager.downloader.downloadFile(url + '?user=anonymous', callback);
    }
    else {
        cc.assetManager.downloader.downloadFile(url, callback);
    }
});

var options = { user: 'anonymous' };
cc.assetManager.load('http://example.com/skill.myformat', options, callback);
```

关于可选参数，详细请参考 [可选参数](custom-parameter.md) 。


## Asset Bundle

从 v2.3 开始， Creator 将支持 Asset Bundle ，开发者可以将自己的场景，资源，代码规划到 Asset Bundle ，并在运行时动态加载资源，从而实现资源的模块化，仅在需要时加载对应资源。例如：

```js
cc.assetManager.loadBundle('http://example.com/scene', function (err, bundle) {
    cc.director.loadScene('test');
});
```

更多 Asset Bundle 的介绍请参考 [bundle](bundle.md) 。

## 释放资源

从 v2.3 开始， Creator 提供了更为方便的资源释放机制，开发者在释放资源时只需关注该资源本身而不再需要关注其依赖资源，引擎会尝试对其依赖资源按引用数量进行释放，减少用户管理资源释放的复杂度。例如：

```js
cc.assetManager.loadRes('prefabs/enemy', cc.Prefab, function (err, asset) {
    cc.assetManager.release(asset);
});
```

更多详细内容请参考 [终结器](finalizer.md) 。

## 缓存管理器

在某些平台上，比如微信上，因为存在文件系统，所以可以利用文件系统对一些远程资源进行缓存。此时需要一个缓存管理器对所有缓存资源进行管理。包括缓存资源，清除缓存资源，修改缓存周期等。在 v2.3 上， Creator 在所有存在文件系统的平台上都提供了缓存管理器，能够对缓存进行增删改查操作。例如：

```js
// 查询是否存在某个资源的缓存
cc.assetManager.cacheManager.cachedFiles.has('http://example.com/bundle1/import/9a/9aswe123-dsqw-12xe-123xqawe12.json');

// 清除某个资源的缓存
cc.assetManager.cacheManager.cleanCache('http://example.com/bundle1/import/9a/9aswe123-dsqw-12xe-123xqawe12.json');
```

更多缓存管理器的介绍请参考 [缓存管理器](cache-manager.md) 。

---

继续前往 [Asset Bundle](bundle.md) 说明文档。

