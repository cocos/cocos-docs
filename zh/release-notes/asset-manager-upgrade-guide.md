# v2.4 资源管理模块升级指南

> 文：Santy-Wang

> 本文将详细介绍旧版本 Creator 项目升级到 v2.4 时的注意事项。如果你不是 Creator 旧版本的用户，不需要阅读本文。

在 v2.4 之前的 [获取和加载资源](../scripting/load-assets.md) 文档中，我们有提到使用 `cc.loader` 模块包括 `cc.loader.load`，`cc.loader.loadRes`，`cc.loader.loadResDir` 等系列 API 来加载资源。当时的 `cc.loader` 主要作为加载资源的模块来使用，但随着 Creator 的不断发展，开发者对于资源管理的需求不断增加，此时原来的 `cc.loader` 已无法满足大量的资源管理需求，一个新的资源管理模块呼之欲出。新的资源管理模块能够为开发者提供更好的加载性能，更多的加载功能，以及更人性化的资源管理。大大提升开发者的使用体验。

为了带来平滑的升级体验，我们将在一段时间内保留对 `cc.loader` 常用 API 的兼容。也就是说，除个别无法兼容的模块必须进行升级外，其他内容仍旧可以以旧代码运行。考虑到模块改动太大，除个别无法兼容的功能会提示错误之外，其他已不建议使用的 API 将 **不会** 以警告形式提示升级方法，以避免整个控制台被警告填满。我们会在引擎源码中，代码提示中，以及官方 API 文档中提供升级方式。等到 v3.0 以上的某个版本，才会全面移除对 `cc.loader` 的兼容。

对 **美术策划** 而言，项目中的所有资源，例如场景、动画、Prefab 都不需要修改，也不用升级。<br>
对 **程序** 而言，影响主要体现在原先在代码中用 `cc.loader` 的系列 API，需要都改为使用 `cc.assetManager` 的系列 API。本文将详细介绍有关内容。
**注意**：因为 v2.4 支持 Asset Bundle 功能，工程中的子包设置需要进行升级，相关内容请参考 [分包升级指南](./subpackage-upgrade-guide.md) 。

## 常见问题

### 我需要手动升级吗？

如果有下列情况，你需要升级：
 - 你在自己的游戏代码中使用了以 `cc.loader` 开头的 API ，比如 `cc.loader.loaderRes`，`cc.loader.loadResDir`，`cc.loader.release` 等等 API 。
 - 你在自己的游戏代码中使用了以 `cc.AssetLibrary` 开头的 API ，比如 `cc.AssetLibrary.loadAsset` 等等 API 。
 - 你在自己的游戏代码中使用了 `cc.url` 开头的 API，比如 `cc.url.raw` 。
 - 你在自己的游戏代码中使用了 `cc.Pipeline`，`cc.LoadingItems` 等类型。
 - 你在自己的游戏代码中使用了 `cc.director.preloadScene` API 。
 - 你在自己的游戏代码中使用了 `cc.macro.DOWNLOAD_MAX_CONCURRENT` 属性。

## 升级步骤

 - 重命名旧版本 Cocos Creator 所在目录，然后安装新版本 Cocos Creator。这样新旧两个版本就能共存。
 - **备份好旧版本的工程后**，使用新版 Cocos Creator 打开原有工程，Creator 将对有影响的资源重新导入，第一次升级时会稍微多花一点时间，导入完毕后就会打开编辑器主窗口。此时可能会出现较多报错或警告。别担心，请打开代码编辑工具进行代码升级。

### 将 cc.loader 系列 API 替换为 cc.assetManager 系列 API

从 v2.4 开始，`cc.loader` 已不建议使用，并且会在后续的版本中被彻底移除，请使用新的资源管理模块 `cc.assetManager` 进行替换。

#### 加载相关接口替换

如果你在自己的游戏代码中使用了 `cc.loader.loadRes`，`cc.loader.loadResArray`，`cc.loader.loadResDir`，请使用 `cc.assetManager` 中的对应 API 进行替换。<br>
下面是详细的替换方式：

`cc.assetManager.loadRes` 的参数与 `cc.loader.loadRes` 完全相同。替换方式如下：

```js
    // 修改前
    cc.loader.loadRes('images/a', cc.Texture2D, (err, asset) => console.log(asset));

    // 修改后
    cc.assetManager.loadRes('images/a', cc.Texture2D, (err, asset) => console.log(asset));
```

`cc.assetManager` 为了降低学习成本，将 `loadResArray` 与 `loadRes` 进行了合并，`cc.assetManager.loadRes` 的第一个参数可支持多个路径，所以可以使用 `cc.assetManager.loadRes` 进行替换：

```js
    // 修改前
    cc.loader.loadResArray(['images/a', 'images/b', 'images/c'], cc.Texture2D, (err, assets) => console.log(assets));

    // 修改后
    cc.assetManager.loadRes(['images/a', 'images/b', 'images/c'], cc.Texture2D, (err, assets) => console.log(assets));
```

**注意** ：出于简化接口的考虑，`cc.assetManager.loadRes` 的第二个参数 **不再接受** 多个类型，只能接受单一类型，所以使用 `loadRes` 同时加载多个资源时，只能加载同类型的多个资源。如果你的代码中有使用如下形式，请修改为单独使用 `loadRes` 进行加载：

```js
    // 修改前
    cc.loader.loadResArray(['images/a', 'images/b', 'prefabs/a'], [cc.Texture2D, cc.SpriteFrame, cc.Prefab], (err, assets) => console.log(assets));

    // 修改后
    cc.assetManager.loadRes('images/a', cc.Texture2D, (err, asset) => console.log(asset));
    cc.assetManager.loadRes('images/b', cc.SpriteFrame, (err, asset) => console.log(asset));
    cc.assetManager.loadRes('prefabs/a', cc.Prefab, (err, asset) => console.log(asset));
```

`cc.assetManager.loadResDir` 的参数与 `cc.loader.loadResDir` 完全相同。

```js
    // 修改前
    cc.loader.loadResDir('images', cc.Texture2D, (err, assets) => console.log(assets));

    // 修改后
    cc.assetManager.loadResDir('images', cc.Texture2D, (err, assets) => console.log(assets));
```

**注意**：出于简化接口的考虑，`cc.assetManager.loadResDir` 的加载完成回调将 **不再提供** urls 的列表。请避免如下使用方式：

```js
    cc.loader.loadResDir('images', cc.Texture2D, (err, assets, urls) => console.log(urls));
```

如果你的代码中使用了 `cc.loader.load` 来加载远程图片或远程音频，为了方便理解，在 `cc.assetManager` 中将有专门的 API 用于此项工作，如下所示：

加载远程图片：

```js
    // 修改前
    cc.loader.load('http://example.com/remote.jpg', (err, texture) => console.log(texture));

    // 修改后
    cc.assetManager.loadRemoteTexture('http://example.com/remote.jpg', (err, texture) => console.log(texture));
```
**注意**：如果图片是跨域图片，你可能会需要使用如下形式：

```js
    cc.assetManager.loadRemoteTexture('http://example.com/remote.jpg', { isCrossOrigin: true }, (err, texture) => console.log(texture));
```

加载远程音频：

```js
    // 修改前
    cc.loader.load('http://example.com/remote.mp3', (err, audioClip) => console.log(audioClip));

    // 修改后
    cc.assetManager.loadRemoteAudio('http://example.com/remote.mp3', (err, audioClip) => console.log(audioClip));
```

如果你代码中加载了远程文本，你会需要如下形式加载远程文本：

```js
    // 修改前
    cc.loader.load('http://example.com/equipment.txt', (err, text) => console.log(text));

    // 修改后
    cc.assetManager.load({ url: 'http://example.com/equipment.txt' }, (err, text) => console.log(text));
```

**注意** ：
1. 如果你的代码中使用了 `cc.loader.downloader.loadSubpackage` 来加载分包，请参考 [分包升级指南](./subpackage-upgrade-guide.md) 进行升级。

2. 为了避免产生不必要的错误，`cc.loader.onProgress` 在 `cc.assetManager` 中没有对应实现，如果你需要注册全局进度回调，`cc.loader.onProgress` **仍然有效**，你可以正常使用，但随着后续版本 `cc.loader` 被彻底移除，`cc.loader.onProgress` 也将被移除，你可以自己实现全局回调机制，但建议你将回调传入到每个加载函数中，避免并发加载时互相干扰。

#### 释放相关接口替换

如果你在自己的游戏代码中使用了 `cc.loader.release`，`cc.loader.releaseAsset`，`cc.loader.releaseRes`，`cc.loader.releaseResDir` 请使用 `cc.assetManager` 中的对应 API 进行替换。<br>

下面是详细的替换方式：

`cc.loader.release` 可用 `cc.assetManager.release` 替换，**注意**： 为了避免用户关注资源的一些晦涩难懂的属性，`cc.assetManager.release` **不再接受** 数组，资源 UUID，资源 URL 进行释放，仅能接受通过资源本身进行释放

```js
    // 修改前
    cc.loader.release(texture);

    // 修改后
    cc.assetManager.release(texture);

    // 修改前
    cc.loader.release([texture1, texture2, texture3]);
    
    // 修改后
    cc.assetManager.release(texture1);
    cc.assetManager.release(texture2);
    cc.assetManager.release(texture3);

    // 修改前
    var uuid = texture._uuid;
    cc.loader.release(uuid);

    // 修改后
    cc.assetManager.release(texture);

    // 修改前
    var url = texture.url;
    cc.assetManager.release(url);

    // 修改后
    cc.assetManager.release(texture);
```

**注意**：为了增加易用性，在 `cc.assetManager` 中释放资源的依赖资源将 **不再需要** 手动获取资源的依赖项，在 `cc.assetManager.release` 内部将会自动去释放相关依赖资源，例如：

```js
    // 修改前
    var assets = cc.loader.getDependsRecursively(texture);
    cc.loader.release(assets);

    // 修改后
    cc.assetManager.release(texture);
```

`cc.loader.releaseAsset` 可直接使用 `cc.assetManager.release` 替换。

```js
    // 修改前
    cc.loader.releaseAsset(texture);

    // 修改后
    cc.assetManager.release(texture);
```

`cc.loader.releaseRes` 可直接使用 `cc.assetManager.releaseRes` 替换。

```js
    // 修改前
    cc.loader.releaseRes('images/a', cc.Texture2D);

    // 修改后
    cc.assetManager.releaseRes('images/a', cc.Texture2D);
```

`cc.loader.releaseAll` 可直接使用 `cc.assetManager.releaseAll` 替换。

```js
    // 修改前
    cc.loader.releaseAll();

    // 修改后
    cc.assetManager.releaseAll();
```

**注意** ：
1. 出于安全考虑，`cc.loader.releaseResDir` 在 `cc.assetManager` 中没有对应实现，请使用 `cc.assetManager.release` 或 `cc.assetManager.releaseRes` 进行单个资源释放。

2. 因为 `cc.assetManager.release` 中会去自动释放依赖资源，所以你不再需要显式调用 `cc.loader.getDependsRecursively`，如果你需要查找资源的相关依赖，请参考 `cc.assetManager.dependUtil` 中的相关 API。

3. 出于安全考虑，`cc.assetManager` 中移除了自动释放的部分功能，仅支持场景上设置的自动释放，`cc.assetManager` 中没有实现 `cc.loader.setAutoRelease`，`cc.loader.setAutoReleaseRecursively`，`cc.loader.isAutoRelease` API，如果你需要自动释放任意资源，`cc.loader` 中的相关 API **仍然有效**，你可以正常使用，但在之后的版本中，随着 `cc.loader` 的移除，这部分功能也将完全移除，你可以实现自己的自动释放机制。也可以完全依赖 `cc.assetManager` 中新的资源释放检查机制，详细请参考 [终结器](../asset-manager/finalizer.md)；

4. 如果你想阻止某些常用资源被自动释放，你可以使用终结器中的 `lock` 接口锁定资源。

#### 扩展相关接口替换

**注意**：`cc.assetManager` 中对资源加载的扩展机制与 `cc.loader` 中有较大不同，详情请参考 [管线与任务](../asset-manager/pipeline-task.md) 。

如果你的代码中有使用 `cc.loader.insertPipe`，`cc.loader.insertPipeAfter`，`cc.loader.appendPipe`，`cc.loader.addDownloadHandlers`，`cc.loader.addLoadHandlers` 系列 API 对 `cc.loader` 的加载流程做过扩展，或者直接使用了 `cc.loader.assetLoader`，`cc.loader.md5Pipe`，`cc.loader.downloader`，`cc.loader.loader`，`cc.loader.subPackPipe` 中的方法，下面是详细的替换方式：

因为 `cc.assetManager` 为更通用的模块，不再继承自 `cc.Pipeline`，所以 `cc.assetManager` 不再实现 `cc.loader.insertPipe`，`cc.loader.insertPipeAfter`，`cc.loader.appendPipe` 。请使用以下形式替换：

```js
// 修改前
var pipe1 = {
    id: 'pipe1',
    handle: (item, done) => {
        console.log(item.uuid);
        done();
    }
};
var pipe2 = {
    id: 'pipe2',
    handle: (item, done) => {
        console.log(item.url);
        done();
    }
};
var pipe3 = {
    id: 'pipe2',
    handle: (item, done) => {
        console.log(item.id);
        done();
    }
};
cc.loader.insertPipe(pipe1, 1);
cc.loader.appendPipe(pipe2);
cc.loader.insertPipeAfter(pipe2, pipe3);

// 修改后
function pipe1 (task, done) {
    for (var i = 0; i < task.input.length; i++) {
        console.log(task.input[i].uuid);
    }
    done();
}
function pipe2 (task, done) {
    for (var i = 0; i < task.input.length; i++) {
        console.log(task.input[i].url);
    }
    done();
}
function pipe3 (task, done) {
    for (var i = 0; i < task.input.length; i++) {
        console.log(task.input[i].id);
    }
    done();
}
cc.assetManager.pipeline.insert(pipe1, 1);
cc.assetManager.pipeline.append(pipe2);
cc.assetManager.pipeline.insert(pipe3, 2);
```

**注意** ：
1. `cc.assetManager` **不再继承** 自 `Pipeline`，而是 `cc.assetManager` 下拥有多个 `Pipeline` 的实例。详情请参考 [管线与任务](../asset-manager/pipeline-task.md)。 

2. 出于易用性考虑，Pipe 的定义不再需要定义一个拥有 `handle` 方法和 `id` 的对象，只需要一个方法即可，详情请参考 [管线与任务](../asset-manager/pipeline-task.md)。 

3. 为了简化逻辑，提高性能，Pipe 中处理的内容不再是 `item`，而是 `task` 对象，详情请参考 [管线与任务](../asset-manager/pipeline-task.md)。 

4. 为了降低学习成本，`Pipeline` 中不再支持 `insertPipeAfter` 形式的 API，请使用 `insert` 插入指定的位置。

出于模块化考虑，`cc.assetManager` 中没有实现 `addDownloadHandlers`，`addLoadHandlers`，请使用以下方式替换：

```js
    // 修改前
    var customHandler = (item, cb) => {
        console.log(item.url);
        cb();
    };
    cc.loader.addDownloadHandlers({png: customHandler});

    // 修改后
    var customHandler = (url, options, cb) => {
        console.log(url);
        cb();
    }
    cc.assetManager.downloader.register({
        '.png': customHandler
    });
```

或

```js
    // 修改前
    var customHandler = (item, cb) => {
        console.log(item.content);
        cb();
    };
    cc.loader.addLoadHandlers({png: customHandler});

    // 修改后
    var customHandler = (file, options, cb) => {
        console.log(file);
        cb();
    }
    cc.assetManager.parser.register({
        '.png': customHandler
    });
```

**注意** ：
1. 因为下载模块与解析模块都是依靠扩展名来匹配对应的处理方式，所以 `register` 所接受的扩展名需以 `.` 作为起始。

2. 出于模块化的考虑，自定义的处理方法将不在传入一个 `item` 对象，而是直接传入与其相关的信息，`downloader` 的自定义处理方法传入的是待下载的 url，`parser` 的自定义处理方法传入的是待解析的文件。下载器与解析器详细请参考 [下载器与解析器](../asset-manager/downloader-parser.md) 。

3. 新的拓展机制提供了一个额外的 `options` 参数，可以增加极大的灵活性，但目前你可以先无视它，详细请参考 [下载器与解析器](../asset-manager/downloader-parser.md) 与 [可选参数](../asset-manager/custom-parameter.md) 。

`cc.loader.downloader` 可由 `cc.assetManager.downloader` 代替，`cc.loader.loader` 可由 `cc.assetManager.parser` 代替。但其中的接口没有完全继承，详细请参考 [下载器与解析器](../asset-manager/downloader-parser.md) 或对应的 API 文档。

**注意** ：
1. `cc.loader.downloader.loadSubpackage` API 已被移出 `downloader`，你可以使用新的加载分包 API `cc.assetManager.loadBundle` 来代替，详细可参考 [分包加载](../scripting/asset-bundle.md) 。

2. 出于性能，模块化，易读性考虑，`cc.loader.assetLoader`, `cc.loader.md5Pipe`, `cc.loader.subPackPipe` 已经被合并到 `cc.assetManager.transformPipeline` 中，你应该避免再使用这三个模块中的任何方法与属性。关于 `cc.assetManager.transformPipeline` 详细可参考 [管线与任务](../asset-manager/pipeline-task.md)。 


### 其他更新

`cc.url` 与 `cc.AssetLibrary` 在 v2.4 中被移除，请避免使用 `cc.url` 与 `cc.AssetLibrary` 下的任何方法和属性。

`cc.Pipeline` 可由 `cc.AssetManager.Pipeline` 进行替换。

```js
// 修改前
var pipe1 = {
    id: 'pipe1',
    handle: function (item, cb) {
        console.log(item);
        cb();
    }
}
var pipeline = new cc.Pipeline([pipe1]);

// 修改后
var pipe1 = (task, cb) => {
    console.log(task.input);
    cb();
}
var pipeline = new cc.AssetManager.Pipeline('test', [pipe1]);
```

**注意**：`cc.LoadingItem` 在 `cc.assetManager` 中已经不再支持，请避免使用这个类型。

为了提升 Asset Bundle 的易用性，`cc.assetManager` 中也可以加载与预加载场景，如果你的代码中有使用 `cc.director.preloadScene` 方法，请使用 `cc.assetManager.preloadScene` 替换。

```js
// 修改前
cc.director.preloadScene('scene1', () => {
    cc.director.loadScene('scene1');
});

// 修改后
cc.assetManager.preloadScene('scene1', () => {
    cc.director.loadScene('scene1');
});

```
详细可参考 [加载与预加载](../asset-manager/preload-load.md)。 

为了支持更多加载策略，`cc.macro.DOWNLOAD_MAX_CONCURRENT` 已被移除 `cc.macro` 中，你可以用以下方式替换：

```js
// 修改前
cc.macro.DOWNLOAD_MAX_CONCURRENT = 10;

// 修改后
cc.assetManager.downloader.maxConcurrent = 10;
```
详细请参考 [下载器与解析器](../asset-manager/downloader-parser.md) 。 