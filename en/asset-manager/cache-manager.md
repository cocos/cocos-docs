# Cache Manager

> Author: Santy-Wang

For Web platforms, resources are cached and managed by the browser after download, not by the engine. However, in some non-Web platforms, such as WeChat Mini Game, these platforms have a file system, but do not implement a caching mechanism for resources, which requires the engine to implement a set of caching mechanisms for managing resources downloaded from the network, including caching resources, cleaning caching resources, querying caching resources and other functions.

In v2.4, Creator implements a cache management mechanism on all non-Web platforms, which you can access through `cc.assetManager.cacheManager`.

## Resource download process

When a resource needs to be downloaded, a series of check steps are performed as follows.

1. Determine if the resource is in the game pack, and if so, use it directly.

2. Check if the resource is in the cache, and if it is, use it directly.

3. Check if the resource is in the temporary directory, and if it is, use it directly (the native platform will skip this step).

4. Download remote resources to the temporary directory and use the resources in the temporary directory directly (the native platform will download resources directly to the cache directory).

5. The backend slowly caches resources from the temporary directory into the cached directory (the native platform will skip this step).

6. When the cache space is full, the older resources will be deleted using the LRU algorithm (the native platform will skip this step and you can call cleanup manually).

## Query cached files

The Cache Manager provides a `getCache` interface to query all cached resources, and you can query the cache path of a resource by passing in its original path, for example:

```js
cc.resources.load('images/background', cc.Texture2D, function (err, texture) {
    var cachePath = cc.assetManager.cacheManager.getCache(texture.nativeUrl);
    console.log(cachePath);
});
```

## Query temporary files

After the resource is downloaded locally, it may be stored as a temporary file in a temporary directory. The Cache Manager provides `tempFiles` to query all resources downloaded to a temporary directory, which you can do by passing in the original path of the resource, for example:

```js
cc.assetManager.loadRemote('http://example.com/background.jpg', function (err, texture) {
    var tempPath = cc.assetManager.cacheManager.getTemp(texture.nativeUrl);
    console.log(tempPath);
});
```

## Cache Asset

A number of control parameters are provided in the Cache Manager to control the caching of resources.

1. `cacheManager.cacheDir` controls the storage directory for cache resources.
2. `cacheManager.cacheInterval` controls the periodicity of caching a single resource, which defaults to 500ms cached once.
3. `cacheManager.cacheEnabled` controls whether or not to cache resources, which is the default.

Alternatively, you can override global settings by specifying the optional parameter `cacheEnabled`, for example:

```js
cc.assetManager.loadRemote('http://example.com/background.jpg', { cacheEnabled: true }, callback);
```

## Clear the cache.

The cache manager provides three interfaces to clean up cache resources: `removeCache`, `clearCache`, `clearLRU` interface, `removeCache` to clean up individual cache resources, `clearCache` to clean up all cache resources, please use carefully, `clearLRU` to clean up older resources, `clearLRU` will be called automatically when the storage space of the mini-game platform is full.

`removeCache` requires the original path of the resource to be provided for removal, for example:

```js
cc.assetManager.loadRemote('http://example.com/background.jpg', function (err, texture) {
    cc.assetManager.cacheManager.removeCache(texture.nativeUrl);
});
```
