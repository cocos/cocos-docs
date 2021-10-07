# Asset Manager Overview

> Author: Santy-Wang, Xunyi

During the development of the game, it is generally necessary to use a large number of images, audio and other resources to enrich the entire game, and a large number of resources can cause management difficulties. That's why Creator provides the **Asset Manager** resource management module to help developers manage the use of their resources and greatly improve the development efficiency and experience.

**Asset Manager** is a new resource manager from Creator in v2.4 that replaces the previous `loader`. The new **Asset Manager** resource management module has features for loading resources, finding resources, destroying resources, caching resources, Asset Bundle, and more. Compared with previous `loader`, Asset Manager has better performance, easier-to-use APIs, and greater extensibility. All functions and methods are accessible via `assetManager` and all types and enumerations are accessible via the `AssetManager` namespace.

> **Note**: we will maintain compatibility with `loader` for a period of time, but we strongly recommend using **Asset Manager** consistently for new projects.

you can refer to the following articles for upgrading:
- [AssetManager Upgrade Guide](asset-manager-upgrade-guide.md)
- [Asset Bundle Upgrade Guide](subpackage-upgrade-guide.md)

## Load Resources

### Dynamic Loading of Resources

In addition to applying resources to the corresponding components while editing scenes, Creator also supports dynamic loading and setting up of resources while the game is running. Asset Manager provides two ways to dynamically load resources:

1. By placing resources in the `resources` directory, and working with APIs such as `resources.load` to achieve dynamic loading.
2. developers can plan their own resource creation as Asset Bundle and load resources through the Asset Bundle's `load` family of APIs. For example:

    ```typescript
    resources.load('images/background', SpriteFrame, (err, asset) => {
      this.getComponent(Sprite).spriteFrame = asset;
    });
    ```

The relevant APIs are listed below:

| Type | Support | Loading | Releasing | Preloading | Querying | Search |
| :-- | :-- | :-- | :-- | :-- | :-- |:-- |
| **Single Asset** | Asset Bundle   | load       | release      | preload      | get | getInfoWithPath |
| **Directory**    | Asset Bundle   | loadDir    | releaseAsset | preloadDir   | N/A | getDirWithPath  |
| **Scene**        | Asset Bundle   | loadScene  | N/A          | preloadScene | N/A | getSceneInfo    |
| **Single Asset** | `resources` | load       | release      | preload      | get | getInfoWithPath |
| **Directory**    | `resources` | loadDir    | releaseAsset | preloadDir   | N/A | getDirWithPath  |
| **Script**       | Asset Manager  | loadScript | N/A          | N/A          | N/A | N/A             |
| **Remote Asset** | Asset Manager  | loadRemote | releaseAsset | N/A          | N/A | N/A             |

References documentations:

- [Dynamic Load Asset](dynamic-load-resources.md)

All loaded resources are cached in `assetManager`.

### Preloading

To reduce download latency, `assetManager` and Asset Bundle not only provides interfaces for loading resources, each interface also provides a corresponding preloaded version. You can preload in game and then finish loading when you really need it. Preloading will only download the necessary resources and will not perform deserialization or initialization. Therefore, it consumes less performance and is suitable for use during the game.

```typescript
start () {
    resources.preload('images/background', SpriteFrame);
    setTimeOut(this.loadAsset.bind(this), 10000);
}

loadAsset () {
    resources.load('images/background', SpriteFrame, (err, asset) => {
        this.getComponent(Sprite).spriteFrame = asset;
    });
}
```

For more information on preloading, please refer to the [Preloading and Loading](preload-load.md) documentation.

## Asset Bundle

You can partition your scenes, resources, and code into multiple Asset Bundles and load resources dynamically at runtime, resulting in modularity of resources, so that you can load corresponding resources when needed. For example:

```typescript
assetManager.loadBundle('testBundle', function (err, bundle) {
    bundle.load('textures/background', (err, asset) => {
        // ...
    });
});
```

Please refer to the [Asset Bundle](bundle.md) documentation for more information on Asset Bundle.

## Release of Resources

Asset Manager provides a more convenient mechanism for releasing resources. When releasing a resource, you only need to focus on the resource itself and no longer on its dependent resources. The engine attempts to release its dependent resources based on the number of references, to reduce the complexity of managing resource releases for users. For example:

```typescript
resources.load('prefabs/enemy', Prefab, function (err, asset) {
    assetManager.releaseAsset(asset);
});
```

Creator also provides a reference counting mechanism to help you control the reference and release of resources. For example:

- When you need to hold a resource, call `addRef` to add a reference to ensure that the resource is not automatically released by other references to it.

  ```typescript
  resources.load('textures/armor', Texture2D, function (err, texture) {
      texture.addRef();
      this.texture = texture;
  });
  ```

- When you no longer need to hold the resource, call `decRef` to reduce reference, `decRef` will also attempt an automatic release based on the reference count.

  ```typescript
  this.texture.decRef();
  this.texture = null;
  ```

Please refer to the [Release of Resources](release-manager.md) documentation for more details.

## Cache Manager

On some platforms, such as WeChat, it is possible to use the file system to cache some remote resources because a file system exists. In this case, a cache manager is required to manage all cache resources, such as caching resources, clearing cache resources, modifying cache cycles, etc. . Creator provides a cache manager on all platforms where file systems exist, so that you can add, delete, change, and check the cache. For example:

```typescript
// Get the cache of a resource.
assetManager.cacheManager.getCache('http://example.com/bundle1/import/9a/9aswe123-dsqw-12xe-123xqawe12.json');

// Clear the cache of a resource.
assetManager.cacheManager.removeCache('http://example.com/bundle1/import/9a/9aswe123-dsqw-12xe-123xqawe12.json');
```

Please refer to the [Cache Manager](cache-manager.md) documentation for more information on Cache Manager.

## Optional Parameters

Some of the interfaces for `assetManager` and Asset Bundle have an additional `options` parameter, which greatly increase the flexibility and extend the space. In addition to configuring the builtin parameters of Creator, you can also customize any of the parameters in `options`, and these parameters will be provided to the downloader, parser, and loading pipeline.

```typescript
bundle.loadScene('test', {priority: 3}, callback);
```

For more information on `options` parameter, please refer to the [Optional Parameters](options.md) documentation.

If you don't need to configure the engine's builtin parameters or custom parameters to extend the engine's functionality, you can ignore it and use the simpler API interfaces, such as `resources.load`.

## Loading Pipeline

To make it easier to extend the resource loading process, the underlying layer of Asset Manager uses mechanisms called **Pipeline and Task** and **Download and Parse** to load resources, greatly increasing flexibility and scalability. If you want to expand the load pipeline or customize it, you can refer to the following documentation:

- [Pipeline and Task](pipeline-task.md)
- [Download and Parse](downloader-parser.md)

## Additional References

- [Asset Bundle](bundle.md)
- [Release Of Resources](release-manager.md)
- [Download and Parse](downloader-parser.md)
- [Loading and Preloading](preload-load.md)
- [Cache Manager](cache-manager.md)
- [Optional Parameters](options.md)
- [Pipeline and Task](pipeline-task.md)
