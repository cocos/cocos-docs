# Asset Manager Overview

> Author：Santy-Wang

`Asset Manager` is a new module from Creator in v2.4 with features such as load resources, find resources, destroy resources, cache resources, Asset Bundle and more. `Asset Manager` has better performance, an easier-to-use API, and greater scalability. All functions and methods are accessible via `cc.assetManager` and all types and enumerations are accessible via the `cc.AssetManager` namespace.

## Load Resources

### Dynamic Loading Of Resources

In addition to applying resources to the corresponding components while editing scenes, Creator also supports dynamic loading and setting up of resources during game runtime. Asset Manager provides two ways to dynamically load resources: 1. by placing resources in the resources directory and loading them with APIs such as `cc.resources.load`, 2. developers can plan their own resource creation as Asset Bundle and load resources through the Asset Bundle's `load` family of APIs. For example:

```js
cc.resources.load('images/background', cc.SpriteFrame, (err, asset) => {
    this.getComponent(cc.Sprite).spriteFrame = asset;
});
```

The relevant APIs are listed below:

Type | Support | Loading | Releasing | Preloading | Querying
-- | -- | -- | -- | -- | --
Single Asset | Asset Bundle | load | release | preload | get
Directory | Asset Bundle | loadDir | releaseAsset | preloadDir  | N/A
Scene | Asset Bundle | loadScene | N/A | preloadScene  | N/A
Single Asset | cc.resources | load | release  | preload  | get
Directory | cc.resources | loadDir | releaseAsset  | preloadDir  | N/A
Script | Asset Manager | loadScript | N/A  | N/A   | N/A
Remote Asset | Asset Manager | loadRemote  | releaseAsset  | N/A | N/A

References：

[Acquire and load asset](../scripting/load-assets.md)
[Asset Bundle](../scripting/asset-bundle.md)

All loaded resources are cached in `cc.assetManager`.

### Preloading

To reduce download latency, `cc.assetManager` and Asset Bundle, in addition to providing interfaces for loading resources, each loading interface also provides a corresponding preloaded version, which allows developers to preload in-game and complete the loading when really needed, while preloading only downloads the necessary resources, without deserialization and initialization, so the performance consumption is smaller and suitable for use during the game.

```js
start () {
    cc.resources.preload('images/background', cc.SpriteFrame);
    setTimeOut(this.loadAsset.bind(this), 10000);
}

loadAsset () {
    cc.resources.load('images/background', cc.SpriteFrame, (err, asset) => {
        this.getComponent(cc.Sprite).spriteFrame = asset;
    });
}
```

For more on preloading see [Preloading And Loading](preload-load.md) documentation.

## Asset Bundle

Developers can plan their scenarios, resources, code into the Asset Bundle and dynamically load resources at runtime, resulting in modularity of resources, loading corresponding resources only when needed. For example:

```js
cc.assetManager.loadBundle('testBundle', function (err, bundle) {
    bundle.load('textures/background', (err, asset) => {
        // ...
    });
});
```

See [Asset Bundle](bundle.md) documentation for more information on Asset Bundle.

## Release of resources

Starting from v2.4, Creator provides a more convenient resource release mechanism, where developers only need to focus on the resource itself when releasing a resource and not on its dependencies. The engine attempts to release its dependent resources by the number of references, reducing the complexity for users to manage resource releases. For example:

```js
cc.resources.load('prefabs/enemy', cc.Prefab, function (err, asset) {
    cc.assetManager.releaseAsset(asset);
});
```

Creator also provides a reference counting mechanism to help developers control the referencing and release of resources. For example:

When you need to hold a resource, call `addRef` to add a reference, which will ensure that the resource is not automatically released by other references.

```js
cc.resources.load('textures/armor', cc.Texture2D, function (err, texture) {
    texture.addRef();
    this.texture = texture;
});
```

When you no longer need to hold the resource, call `decRef` to reduce references, `decRef` will also attempt an automatic release based on the reference count.

```js
this.texture.decRef();
this.texture = null;
```

See [Release Of Resources](release-manager.md) documentation for more details.

## Cache Manager

On some platforms, such as WeChat, it is possible to use the file system to cache some remote resources because a file system exists. This requires a cache manager to manage all cache resources. This includes cache resources, clearing cached resources, modifying cache cycles, etc. On v2.4, Creator provides a cache manager on all platforms where a file system exists, allowing for additions and deletions to the cache. For example:

```js
// Get the cache of a resource.
cc.assetManager.cacheManager.getCache('http://example.com/bundle1/import/9a/9aswe123-dsqw-12xe-123xqawe12.json');

// Clear the cache of a resource.
cc.assetManager.cacheManager.removeCache('http://example.com/bundle1/import/9a/9aswe123-dsqw-12xe-123xqawe12.json');
```

See [Cache Manager](cache-manager.md) documentation for more information on Cache Manager.

## Optional Parameters

In addition to this, for added flexibility and expansion, an additional `options` parameter is provided for part of interface of `cc.assetManager` and Asset Bundle. If you don't need more settings, it is recommended that you ignore the options parameters and use simpler API interfaces such as "cc.resources.load" and skip this section. If you need to configure more options or want to extend the engine load function, you can refer to the following:

```js
bundle.loadScene('test', { priority: 3 }, callback);
```

In addition to the parameters built into the Creator, you can also specify any parameters that will be provided to the custom downloader, parser, and loading pipeline, see [Optional Parameters](options.md) documentation for details.

## Loading Pipeline

To make it easier to extend the resource loading process, the bottom layer of Asset Manager uses mechanisms called **Pipeline And Task** , **Downloader And Parser** to load resources, which offers great flexibility and scalability. If you want to extend the load line or customize the line, you can refer to.

[Pipeline And Task](pipeline-task.md)
[Downloader And Parser](downloader-parser.md)