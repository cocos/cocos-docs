# 缓存管理器

> 文： Santy-Wang

对于 H5 平台，资源在下载之后由浏览器来管理缓存，不需要由引擎进行管理。但在某些非 H5 平台，比如微信小游戏，这类平台具备文件系统，但没有实现资源的缓存机制，需要由引擎实现一套缓存机制用于管理从网络上下载下来的资源，包括缓存资源，清理缓存资源，查询缓存资源等功能。

在 v2.5 Creator 在小游戏平台实现了缓存管理机制，你可以通过 `cc.assetManager.cacheManager` 进行访问。

## 资源下载流程

当需要下载资源时，会进行一系列检查步骤如下：

1. 判断该资源是否在游戏包内，如果在则直接使用

2. 查询该资源是否在缓存中，如果在则直接使用

3. 查询该资源是否在临时目录中，如果在则直接使用

4. 下载远程资源到临时目录，直接使用临时目录的资源

5. 后台缓慢将临时目录中的资源缓存到缓存目录中

6. 当缓存空间占满后，此时会使用 LRU 算法删除比较久远的资源

## 查询缓存文件

缓存管理器提供了 `cachedFiles` 以查询所有缓存的资源，`cachedFiles` 是一个 `cc.AssetManager.Cache` 类的实例，你可以通过传入资源原路径查询该资源的缓存路径以及最近使用时间，例如：

```js
    cc.assetManager.loadRes('images/background', cc.Texture2D, function (err, texture) {
        var cache = cc.assetManager.cacheManager.cachedFiles.get(texture.nativeUrl);
        console.log(cache.url);
        console.log(cache.lastTime);
    });
```

## 查询临时文件

当资源被下载到本地之后，会以临时文件的形式存储到临时目录。缓存管理器提供了 `tempFiles` 以查询所有下载到临时目录的资源，你可以通过传入资源原路径进行查询，例如：

```js
    cc.assetManager.loadRemoteTexture('http://example.com/background.jpg', function (err, texture) {
        var tempPath = cc.assetManager.cacheManager.tempFiles.get(texture.nativeUrl);
        console.log(tempPath);
    });
```

## 缓存资源

缓存管理器中提供了一些控制参数用于控制资源的缓存：

1. `cacheManager.cacheDir` 控制了缓存资源的存储目录。
2. `cacheManager.cachePeriod` 控制缓存单个资源的周期，默认为 500 ms 缓存一次。
3. `cacheManager.saveFile` 控制是否缓存资源，默认为缓存资源。

另外，你可以通过指定可选参数 `saveFile` 来覆盖全局设置，例如：

```js
    cc.assetManager.loadRemoteTexture('http://example.com/background.jpg', { saveFile: true }, callback);
```

## 清理缓存

缓存管理器提供了三个接口清理缓存资源，分别是 `cleanCache`, `cleanAllCaches` , `cleanLRU` 接口，`cleanCache` 用于清理单个缓存资源， `cleanAllCaches` 用于清理所有缓存资源，请慎重使用，`cleanLRU` 用于清理较早使用的资源，`cleanLRU` 会在存储空间满了后自动调用。

`cleanCache` 需要提供资源的原路径进行清除，例如：

```js
cc.assetManager.loadRemoteTexture('http://example.com/background.jpg', function (err, texture) {
    cc.assetManager.cacheManager.cleanCache(texture.nativeUrl);
});
```
