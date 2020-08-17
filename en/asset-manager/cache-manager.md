# Cache Manager

> Author: Santy-Wang, Xunyi

For Web platforms, resources cache are managed by the browser after download, not the engine.<br>
However, on some non-Web platforms, such as WeChat Mini Game, these platforms have a file system, which can be used to cache some remote resources, but do not implement a caching mechanism for resources. In this case, the engine needs to implement a set of caching mechanisms for managing resources downloaded from the network, including caching resources, cleaning cached resources, querying cached resources and other features.

As of v2.4, Creator provides a Cache Manager on all platforms where file systems exist, and you can access it via `cc.assetManager.cacheManager`.

## Resource download process

The logic of the engine downloading resources is as follows:

1. Determine if the resource is in the game package, if so, use it directly;

2. If not, check if the resource is in the cache, and if it is, use it directly;

3. If not, check if the resource is in a temporary directory, and if it is, use it directly (the native platform does not have the temporary directory and skips this step);

4. If not, download the resources from the remote server and use them directly after downloading them to the temporary directory (the native platform downloads the resources to the cache directory);

5. Slowly save the resources from the temporary directory to the local cache directory in the background (the native platform skips this step);

6. When the cache space is full, the older resources will be deleted using the LRU algorithm at this point (there is no size limit on the native platform's cache space, so skip this step, you can call manually for cleanup if needed).

Resource management for the mini game can be found in the document [Resource Management for the WeChat Mini Games](../publish/publish-wechatgame.md#resource-management-for-the-wechat-mini-games).

## Query cache files

The Cache Manager provides a `getCache` interface to query all cache resources, and you can query the cache path of a resource by passing in its original path, for example:

```js
cc.resources.load('images/background', cc.Texture2D, function (err, texture) {
    var cachePath = cc.assetManager.cacheManager.getCache(texture.nativeUrl);
    console.log(cachePath);
});
```

## Query temporary files

After a resource is downloaded locally, it may be stored as a temporary file in a temporary directory. The Cache Manager provides a `tempFiles` interface to query all resources downloaded to the temporary directory, which you can do by passing in the original path of the resource, for example:

```js
cc.assetManager.loadRemote('http://example.com/background.jpg', function (err, texture) {
    var tempPath = cc.assetManager.cacheManager.getTemp(texture.nativeUrl);
    console.log(tempPath);
});
```

## Cache resources

A number of parameters are provided in the Cache Manager to control the caching of resources.

1. `cacheManager.cacheDir` -- Controls the storage directory for cached resources.
2. `cacheManager.cacheInterval` -- Controls the period of caching a single resource, the default is once every 500ms.
3. `cacheManager.cacheEnabled` -- Controls whether or not to cache resources, which defaults to caching. Alternatively, you can override the global settings by specifying the optional parameter `cacheEnabled`, for example:

  ```js
  cc.assetManager.loadRemote('http://example.com/background.jpg', {cacheEnabled: true}, callback);
  ```

## Clear cache

The cache manager provides three interfaces `removeCache`, `clearCache` and `clearLRU` to clean up cache resources.

- `removeCache` -- Clean up a single cached resource, and you need to provide the original path of the resource when using it.
  
  ```js
  cc.assetManager.loadRemote('http://example.com/background.jpg', function (err, texture) {
      cc.assetManager.cacheManager.removeCache(texture.nativeUrl);
  });
  ```

- `clearCache` -- Clean up all cache resources, please use it carefully.
- `clearLRU` -- Clean up older resources. The mini game platform will automatically call `clearLRU` when the cache space is full.
