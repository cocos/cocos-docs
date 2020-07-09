# Asset Manager Overview

> Author：Santy-Wang, Xunyi

During the development of the game, it is generally necessary to use a large number of images, audio and other resources to enrich the entire game, and a large number of resources can cause management difficulties. That's why Creator provides the **Asset Manager** resource management module to help developers manage the use of their resources and greatly improve the development efficiency and experience.

**Asset Manager** is a new resource manager from Creator in v2.4 that replaces the previous `cc.loader`. The new **Asset Manager** resource management module has features for loading resources, finding resources, destroying resources, caching resources, Asset Bundle, and more. Compared with previous `cc.loader`, Asset Manager has better performance, easier-to-use APIs, and greater extensibility. All functions and methods are accessible via `cc.assetManager` and all types and enumerations are accessible via the `cc.AssetManager` namespace.

**Note**: We will maintain compatibility with `cc.loader` for a period of time, but we strongly recommend using **Asset Manager** consistently for new projects.

## Load Resources

### Dynamic Loading Of Resources

In addition to applying resources to the corresponding components while editing scenes, Creator also supports dynamic loading and setting up of resources while the game is running. Asset Manager provides two ways to dynamically load resources:

1. By placing resources in the `resources` directory, and working with APIs such as `cc.resources.load` to achieve dynamic loading.
2. developers can plan their own resource creation as Asset Bundle and load resources through the Asset Bundle's `load` family of APIs. For example:

    ```js
    cc.resources.load('images/background', cc.SpriteFrame, (err, asset) => {
      this.getComponent(cc.Sprite).spriteFrame = asset;
    });
    ```

The relevant APIs are listed below:

| Type | Support | Loading | Releasing | Preloading | Querying |
| :-- | :-- | :-- | :-- | :-- | :-- |
| Single Asset | Asset Bundle   | load       | release      | preload      | get |
| Directory    | Asset Bundle   | loadDir    | releaseAsset | preloadDir   | N/A |
| Scene        | Asset Bundle   | loadScene  | N/A          | preloadScene | N/A |
| Single Asset | `cc.resources` | load       | release      | preload      | get |
| Directory    | `cc.resources` | loadDir    | releaseAsset | preloadDir   | N/A |
| Script       | Asset Manager  | loadScript | N/A          | N/A          | N/A |
| Remote Asset | Asset Manager  | loadRemote | releaseAsset | N/A          | N/A |

References documentations：

- [Acquire and load asset](../scripting/load-assets.md)
- [Asset Bundle](../scripting/asset-bundle.md)

All loaded resources are cached in `cc.assetManager`.

### Preloading

To reduce download latency, `cc.assetManager` and Asset Bundle not only provides interfaces for loading resources, each interface also provides a corresponding preloaded version. You can preload in game and then finish loading when you really need it. Preloading will only download the necessary resources and will not perform deserialization or initialization. Therefore, it consumes less performance and is suitable for use during the game.

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

For more information on preloading, please refer to the [Preloading and Loading](preload-load.md) documentation.

## Asset Bundle

You can partition your scenes, resources, and code into multiple Asset Bundles and load resources dynamically at runtime, resulting in modularity of resources, so that you can load corresponding resources when needed. For example:

```js
cc.assetManager.loadBundle('testBundle', function (err, bundle) {
    bundle.load('textures/background', (err, asset) => {
        // ...
    });
});
```

Please refer to the [Asset Bundle](bundle.md) documentation for more information on Asset Bundle.

## Release of resources

Asset Manager provides a more convenient mechanism for releasing resources. When releasing a resource, you only need to focus on the resource itself and no longer on its dependent resources. The engine attempts to release its dependent resources based on the number of references, to reduce the complexity of managing resource releases for users. For example:

```js
cc.resources.load('prefabs/enemy', cc.Prefab, function (err, asset) {
    cc.assetManager.releaseAsset(asset);
});
```

Creator also provides a reference counting mechanism to help you control the reference and release of resources. For example:

- When you need to hold a resource, call `addRef` to add a reference to ensure that the resource is not automatically released by other references to it.

  ```js
  cc.resources.load('textures/armor', cc.Texture2D, function (err, texture) {
      texture.addRef();
      this.texture = texture;
  });
  ```

- When you no longer need to hold the resource, call `decRef` to reduce reference, `decRef` will also attempt an automatic release based on the reference count.

  ```js
  this.texture.decRef();
  this.texture = null;
  ```

Please refer to the [Release of Resources](release-manager.md) documentation for more details.

## Cache Manager

On some platforms, such as WeChat, it is possible to use the file system to cache some remote resources because a file system exists. In this case, a cache manager is required to manage all cache resources, such as caching resources, clearing cache resources, modifying cache cycles, etc. . As of v2.4, Creator provides a cache manager on all platforms where file systems exist, so that you can add, delete, change, and check the cache. For example:

```js
// Get the cache of a resource.
cc.assetManager.cacheManager.getCache('http://example.com/bundle1/import/9a/9aswe123-dsqw-12xe-123xqawe12.json');

// Clear the cache of a resource.
cc.assetManager.cacheManager.removeCache('http://example.com/bundle1/import/9a/9aswe123-dsqw-12xe-123xqawe12.json');
```

Please refer to the [Cache Manager](cache-manager.md) documentation for more information on Cache Manager.

## Optional Parameters

Some of the interfaces for `cc.assetManager` and Asset Bundle have an additional `options` parameter, which greatly increase the flexibility and extend the space. In addition to configuring the builtin parameters of Creator, you can also customize any of the parameters in `options`, and these parameters will be provided to the custom downloader, parser, and loading pipeline.

```js
bundle.loadScene('test', {priority: 3}, callback);
```

For more information on `options` parameter, please refer to the [Optional Parameters](options.md) documentation.

If you don't need to configure the engine's builtin parameters or custom parameters to extend the engine's functionality, you can ignore it and use the simpler API interfaces, such as `cc.resources.load`.

## Loading Pipeline

To make it easier to extend the resource loading process, the underlying layer of Asset Manager uses mechanisms called **Pipeline and Task** and **Downloader and Parser** to load resources, greatly increasing flexibility and scalability. If you want to expand the load pipeline or customize it, you can refer to the following documentation:

- [Pipeline And Task](pipeline-task.md)
- [Downloader And Parser](downloader-parser.md)

## More Reference

- [Asset Bundle](bundle.md)
- [Release Of Resources](release-manager.md)
- [Downloader And Parser](downloader-parser.md)
- [Loading and Preloading](preload-load.md)
- [Cache Manager](cache-manager.md)
- [Optional Parameters](options.md)
- [Pipeline And Task](pipeline-task.md)
