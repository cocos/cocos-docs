# 缓存管理器

> 文：Santy-Wang，Xunyi

在 Web 平台，资源下载完成之后，缓存是由浏览器进行管理，而不是引擎。<br>
而在某些非 Web 平台，比如微信小游戏，这类平台具备文件系统，可以利用文件系统对一些远程资源进行缓存，但并没有实现资源的缓存机制。此时需要由引擎实现一套缓存机制用于管理从网络上下载下来的资源，包括缓存资源、清除缓存资源、查询缓存资源等功能。

从 v2.4 开始，Creator 在所有存在文件系统的平台上都提供了缓存管理器，以便对缓存进行增删改查操作，开发者可以通过 `cc.assetManager.cacheManager` 进行访问。

## 资源下载流程

引擎下载资源的逻辑如下：

1. 判断资源是否在游戏包内，如果在则直接使用；

2. 如果不在则查询资源是否在缓存中，如果在缓存中则直接使用；

3. 如果不在则查询资源是否在临时目录中，如果在临时目录中则直接使用（原生平台没有临时目录，跳过该步骤）；

4. 如果不在就从远程服务器下载资源，资源下载到临时目录后直接使用（原生平台则是将资源下载到缓存目录）；

5. 后台缓慢地将临时目录中的资源保存到本地缓存目录中（原生平台跳过该步骤）；

6. 当缓存空间占满后，此时会使用 LRU 算法删除比较久远的资源（原生平台的缓存空间没有大小限制，跳过该步骤，开发者可以手动调用清理）。

小游戏的资源管理可参考文档 [微信小游戏的资源管理](../publish/publish-wechatgame.md#%E5%BE%AE%E4%BF%A1%E5%B0%8F%E6%B8%B8%E6%88%8F%E7%9A%84%E8%B5%84%E6%BA%90%E7%AE%A1%E7%90%86)。

## 查询缓存文件

缓存管理器提供了 `getCache` 接口以查询所有的缓存资源，开发者可以通过传入资源的原路径来查询缓存路径。

```js
cc.resources.load('images/background', cc.Texture2D, function (err, texture) {
    var cachePath = cc.assetManager.cacheManager.getCache(texture.nativeUrl);
    console.log(cachePath);
});
```

## 查询临时文件

当资源下载到本地后，可能会以临时文件的形式存储在临时目录中。缓存管理器提供了 `tempFiles` 接口以查询所有下载到临时目录中的资源，开发者可以通过传入资源的原路径进行查询。

```js
cc.assetManager.loadRemote('http://example.com/background.jpg', function (err, texture) {
    var tempPath = cc.assetManager.cacheManager.getTemp(texture.nativeUrl);
    console.log(tempPath);
});
```

## 缓存资源

缓存管理器中提供了一些参数用于控制资源的缓存：

- `cacheManager.cacheDir` —— 控制缓存资源的存储目录。
- `cacheManager.cacheInterval` —— 控制缓存单个资源的周期，默认 500ms 缓存一次。
- `cacheManager.cacheEnabled` —— 控制是否要缓存资源，默认为缓存。另外，开发者也可以通过指定可选参数 `cacheEnabled` 来覆盖全局设置，例如：

  ```js
  cc.assetManager.loadRemote('http://example.com/background.jpg', {cacheEnabled: true}, callback);
  ```

## 清理缓存

缓存管理器提供了 `removeCache`, `clearCache`, `clearLRU` 这三个接口用于清理缓存资源：

- `removeCache` —— 清理单个缓存资源，使用时需要提供资源的原路径，例如：
  
  ```js
  cc.assetManager.loadRemote('http://example.com/background.jpg', function (err, texture) {
      cc.assetManager.cacheManager.removeCache(texture.nativeUrl);
  });
  ```

- `clearCache` —— 清理所有缓存资源，请慎重使用。
- `clearLRU` —— 清理比较久远的资源。小游戏平台会在缓存空间满了后自动调用 `clearLRU`。
