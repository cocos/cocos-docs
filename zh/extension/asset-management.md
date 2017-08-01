# 管理项目资源

## 管理场景

### 保存当前场景

在上一节 [调用引擎 API 和项目脚本](scene-script.md) 中我们介绍了通过场景脚本访问引擎 API 和用户项目脚本的方法，在对场景数据进行修改后可以使用以下接口保存当前场景。

`_Scene.save()`

其中 `_Scene` 是一个特殊的单例，用来控制场景编辑器里加载的场景实例。

### 加载其他场景

我们的扩展包可能需要遍历多个场景并依次操作和保存，要加载新场景，请使用

```js
_Scene.loadSceneByUuid(uuid, function(error) {
    //do more work
});
```

传入的参数是场景资源的 uuid，可以通过下面介绍的资源管理器接口来获取。


## 资源 URL 和 UUID 的映射

在 Cocos Creator 编辑器和扩展中，资源的 url 由形如

`db://assets/path/to/scene.fire`

这样的形式表示。其中 `db` 是 AssetDB 的简称。 项目中 `assets` 路径下的全部资源都会被 AssetDB 导入到资源库（library）中，并可以通过 uuid 来引用。

在扩展包的主进程中 url 和 uuid 之间可以互相转化：

- `Editor.assetdb.urlToUuid(url)`
- `Editor.assetdb.uuidToUrl(uuid)`

此外如果希望直接使用资源在本地文件系统中的绝对路径，也可以使用 `fspathToUuid` 和 `uuidToFspath` 接口，其中 `fspath` 就表示绝对路径。

## 管理资源

### 导入资源

要将新资源导入到项目中，可以使用以下接口

```js
//main process
Editor.assetdb.import(['/User/user/foo.js', '/User/user/bar.js'], 'db://assets/foobar', function ( err, results ) {
    results.forEach(function ( result ) {
    // result.uuid
    // result.parentUuid
    // result.url
    // result.path
    // result.type
    });
});


//renderer process
Editor.assetdb.import( [
    '/file/to/import/01.png',
    '/file/to/import/02.png',
    '/file/to/import/03.png',
], 'db://assets/foobar', callback);
```

### 创建资源

使用扩展包管理资源的一个常见误区，就是当扩展包需要创建新资源时直接使用了 Node.js 的 [fs 模块](https://nodejs.org/dist/latest-v6.x/docs/api/fs.html)，这样即使创建文件到了 `assets` 目录，也无法自动被资源管理器导入。正确的工作流程应该是使用 `create` 接口来创建资源。

```js
//main process or renderer process
Editor.assetdb.create( 'db://assets/foo/bar.js', data, function ( err, results ) {
    results.forEach(function ( result ) {
    // result.uuid
    // result.parentUuid
    // result.url
    // result.path
    // result.type
    });
});
```

传入的 `data` 就是该资源文件内容的字符串。在创建完成后会自动进行该资源的导入操作，回调成功后就可以在资源管理器中看到该资源了。

### 保存已有资源

要使用新的数据替换原有资源内容，可以使用以下接口

```js
//main process or renderer process
Editor.assetdb.saveExists( 'db://assets/foo/bar.js', data, function ( err, meta ) {
    // do something
});
```

如果要在保存前检查资源是否存在，可以使用

```js
//main process
Editor.assetdb.exists(url); //return true or false
```

在渲染进程，如果给定了一个目标 url，如果该 url 指向的资源不存在则创建，资源存在则保存新数据的话，可以使用

```js
//renderer process
Editor.assetdb.createOrSave( 'db://assets/foo/bar/foobar.js', data, callback);
```

### 刷新资源

当资源文件在 `assets` 中已经修改，而由于某种原因没有进行重新导入的情况下，会出现 `assets` 里的资源数据和数据库里展示的资源数据不一致的情况（如果使用 `fs` 模块直接操作文件内容就会出现），可以通过手动调用资源刷新接口来重新导入资源

```js
//main process or renderer process
Editor.assetdb.refresh('db://assets/foo/bar/', function (err, results) {});
```

### 移动和删除资源

由于资源导入后会生成对应的 `meta` 文件，所以单独删除和移动资源文件本身都会造成数据库中数据一致性受损，推荐使用专门的 AssetDB 接口来完成这些工作

```js
Editor.assetdb.move(srcUrl, destUrl);
Editor.assetdb.delete([url1, url2]);
```

关于这些接口的详情，请查阅 [AssetDB API Main](api/asset-db/asset-db-main.md) 和 [AssetDB API Renderer](api/asset-db/asset-db-renderer.md)。
