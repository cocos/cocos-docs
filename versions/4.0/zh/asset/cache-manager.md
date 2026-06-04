# 缓存管理器

> 文：Santy-Wang、Xunyi

在 Web 平台，资源下载完成之后，缓存是由浏览器进行管理，而不是引擎。<br>
而在某些非 Web 平台，比如微信小游戏，这类平台具备文件系统，可以利用文件系统对一些远程资源进行缓存，但并没有实现资源的缓存机制。此时需要由引擎实现一套缓存机制用于管理从网络上下载下来的资源，包括缓存资源、清除缓存资源、查询缓存资源等功能。

从 v2.4 开始，Creator 在所有存在文件系统的平台上都提供了缓存管理器，以便对缓存进行增删改查操作，开发者可以通过 `assetManager.cacheManager` 进行访问。

## 资源的下载、缓存及版本管理

引擎下载资源的逻辑如下：

1. 判断资源是否在游戏包内，如果在则直接使用；

2. 如果不在则查询资源是否在本地缓存中，如果在则直接使用；

3. 如果不在则查询资源是否在临时目录中，如果在则直接使用（原生平台没有临时目录，跳过该步骤）；

4. 如果不在就从远程服务器下载资源，资源下载到临时目录后直接使用（原生平台是将资源下载到缓存目录）；

5. 后台缓慢地将临时目录中的资源保存到本地缓存目录中，以便再次访问时使用（原生平台跳过该步骤）；

6. 当缓存空间占满后资源会保存失败，此时会使用 LRU 算法删除比较久远的资源（原生平台的缓存空间没有大小限制，跳过该步骤，开发者可以手动调用清理）。

对小游戏平台来说，一旦缓存空间占满，所有需要下载的资源都无法保存，只能使用下载保存在临时目录中的资源。而当退出小游戏时，所有的临时目录都会被清理，再次运行游戏时，这些资源又会被再次下载，如此循环往复。

> **注意**：缓存空间超出限制导致文件保存失败的问题不会在微信小游戏的 **微信开发者工具** 上出现，因为微信开发者工具没有限制缓存大小，所以测试缓存时需要在真实的微信环境中进行测试。

当开启引擎的 **md5Cache** 功能后，文件的 URL 会随着文件内容的改变而改变，这样当游戏发布新版本后，旧版本的资源在缓存中就自然失效了，只能从服务器请求新的资源，也就达到了版本控制的效果。

### 上传资源到远程服务器

当包体过大时，需要将资源上传到远程服务器，请将资源所在的 Asset Bundle 配置为远程包。接下来我们以微信小游戏为例，来看一下具体的操作步骤：

1. 合理分配资源，将需要模块化管理的资源文件夹（例如 `resources` 文件夹）配置为 Asset Bundle，并勾选 **配置为远程包**，具体可参考文档 [配置 Asset Bundle](./bundle.md#%E9%85%8D%E7%BD%AE%E6%96%B9%E6%B3%95)。

    ![bundle_is_remote](./cache-manager/remote-bundle.png)

2. 如果主包需要配置为远程包，请在 **构建发布** 面板中勾选 **配置主包为远程包**。

3. 在 **构建发布** 面板中勾选 **MD5 Cache**，设置 **资源服务器地址**，然后点击 **构建**。

4. 构建完成后将发布包目录下的 `remote` 文件夹完整地上传到上一步填写的服务器上。

5. 删除本地发布包目录下的 `remote` 文件夹。

> **注意**：微信小游戏在测试阶段时，开发者可能无法将项目部署到正式服务器，那就需要在本地服务器测试，请在微信开发者工具的菜单栏中打开 **工具 -> 详情 -> 本地设置** 页面，勾选 **不校验安全域名、web-view（业务域名）、TLS 版本以及 HTTPS 证书** 选项。
>
> ![details](./cache-manager/details.png)

### 查询缓存文件

缓存管理器提供了 `getCache` 接口以查询所有的缓存资源，开发者可以通过传入资源的原路径来查询缓存路径。

```typescript
resources.load('images/background/texture', Texture2D, function (err, texture) {
    const cachePath = assetManager.cacheManager.getCache(texture.nativeUrl);
    console.log(cachePath);
});
```

### 查询临时文件

当资源下载到本地后，可能会以临时文件的形式存储在临时目录中。缓存管理器提供了 `tempFiles` 接口以查询所有下载到临时目录中的资源，开发者可以通过传入资源的原路径进行查询。

```typescript
assetManager.loadRemote('http://example.com/background.jpg', function (err, texture) {
    const tempPath = assetManager.cacheManager.getTemp(texture.nativeUrl);
    console.log(tempPath);
});
```

## 缓存资源

缓存管理器中提供了一些参数用于控制资源的缓存：

- `cacheManager.cacheDir` —— 控制缓存资源的存储目录。
- `cacheManager.cacheInterval` —— 控制缓存单个资源的周期，默认 500ms 缓存一次。
- `cacheManager.cacheEnabled` —— 控制是否要缓存资源，默认为缓存。另外，开发者也可以通过指定可选参数 `cacheEnabled` 来覆盖全局设置，例如：

  ```typescript
  assetManager.loadRemote('http://example.com/background.jpg', {cacheEnabled: true}, callback);
  ```

### 清除缓存资源

如果缓存资源超出限制，开发者需要手动清除资源，可以使用缓存管理器 `assetManager.cacheManager` 提供的 `removeCache`, `clearCache`, `clearLRU` 来清除缓存资源。

- `clearCache` —— 清除缓存目录下的所有缓存资源，请慎重使用。
- `clearLRU` —— 清除缓存目录下比较久远的资源。小游戏平台会在缓存空间满了后自动调用 `clearLRU`。
- `removeCache` —— 清除单个缓存资源，使用时需要提供资源的原路径，例如：

  ```typescript
  assetManager.loadRemote('http://example.com/background.jpg', function (err, texture) {
      assetManager.cacheManager.removeCache(texture.nativeUrl);
  });
  ```

当开发者升级引擎版本后，留在本地的缓存资源还是之前旧版本引擎对应的资源，并不会自动清空。这可能会导致资源加载出错或渲染错误等问题。解决方案有以下两种：

1. 构建时在 **构建发布** 面板勾选 **MD5 Cache** 选项，这将确保使用最新版本的资源。
2. 手动清空之前缓存的资源。
    - 在 **真机** 上通过 `assetManager.cacheManager.clearCache()` 清空缓存。
    - 微信小游戏在 **微信开发者工具** 中点击菜单栏的 **工具 -> 清除缓存 -> 全部清除** 来清空缓存。
