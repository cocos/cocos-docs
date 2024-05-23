# v2.4 资源管理模块升级指南

> 文：Santy-Wang、Xunyi

> 本文将详细介绍旧项目升级到 v2.4 时的注意事项。

在 v2.4 之前，[获取和加载资源](https://github.com/cocos/cocos-docs/blob/e02ac31bab12d3ee767c0549050b0e42bd22bc5b/zh/scripting/load-assets.md) 是通过 `cc.loader` 模块（包括 `cc.loader.load`、`cc.loader.loadRes`、`cc.loader.loadResDir` 等系列 API）来实现的，`cc.loader` 模块主要用于加载资源。但随着 Creator 的不断发展，开发者对于资源管理的需求不断增加，原来的 `cc.loader` 已无法满足大量的资源管理需求，一个新的资源管理模块呼之欲出。

因此，Creator 在 v2.4 推出了全新的资源管理模块 —— **Asset Manager**。相较之前的 `cc.loader`，Asset Manager 不但提供了更好的加载性能，而且支持 Asset Bundle、预加载资源以及更加方便的资源释放管理。同时 Asset Manager 还拥有强大的扩展性，大大提升开发者的开发效率和使用体验，我们建议所有开发者都进行升级。

为了带来平滑的升级体验，我们仍保留了对 `cc.loader` 相关 API 的兼容。除个别项目使用了无法兼容的特殊用法的 API 必须手动升级外，大部分项目都可以照常运行。之后我们会在时机成熟时才逐渐完全移除对 `cc.loader` 的兼容。如果由于项目周期等原因暂时不方便升级，你可以在确保测试通过的情况下继续保留原来的写法。

目前在使用旧的 API 时，引擎会输出警告并提示升级方法。请你根据警告内容和本文的说明对代码进行调整，升级到新的用法。比较抱歉的是，由于底层经过了升级，我们遗留了个别无法兼容的 API，在运行时会输出错误信息。如果你已经决定好要进行升级，那么请仔细阅读以下内容。

- 对 **美术策划** 而言，项目中的所有资源，例如场景、动画、Prefab 都不需要修改，也不需要升级。
- 对 **程序** 而言，影响主要体现在原先代码中使用的 `cc.loader` 的所有 API，都需要改为 `cc.assetManager` 的 API。以下将详细介绍这部分内容。

> **注意**：因为 v2.4 支持 Asset Bundle，项目中的分包功能也需要进行升级，具体内容请参考 [分包升级指南](./subpackage-upgrade-guide.md)。

## 需要手动升级的情况

- 你在自己的代码中使用了以 `cc.loader` 开头的 API，比如 `cc.loader.loaderRes`、`cc.loader.loadResDir`、`cc.loader.release` 等。
- 你在自己的代码中使用了以 `cc.AssetLibrary` 开头的 API，比如 `cc.AssetLibrary.loadAsset`。
- 你在自己的代码中使用了 `cc.url` 开头的 API，比如 `cc.url.raw`。
- 你在自己的代码中使用了 `cc.Pipeline`，`cc.LoadingItems` 等类型。
- 你在自己的代码中使用了 `cc.macro.DOWNLOAD_MAX_CONCURRENT` 属性。

## 升级步骤

- **备份好旧项目**
- 在 Dashboard 中使用 Cocos Creator v2.4 打开需要升级的旧项目，Creator 将对有影响的资源重新导入，第一次导入时会稍微多花一点时间，导入完毕后就会打开编辑器主窗口。此时可能会出现较多的报错或警告信息，别担心，请打开代码编辑工具根据报错或警告信息对代码进行升级。

### 将 `cc.loader` 相关的 API 替换为 `cc.assetManager` 相关的 API

从 v2.4 开始，不建议使用 `cc.loader`，并且在后续的版本中也会逐渐被彻底移除，请使用新的资源管理模块 `cc.assetManager` 进行替换。

#### 加载相关接口的替换

如果你在自己的代码中使用了 `cc.loader.loadRes`、`cc.loader.loadResArray`、`cc.loader.loadResDir`，请使用 `cc.assetManager` 中对应的 API 进行替换。可参考下方的替换方式：

- **cc.loader.loadRes**

  `cc.resources.load` 的参数与 `cc.loader.loadRes` 完全相同。替换方式如下：

  ```js
  // 修改前
  cc.loader.loadRes(...);

  // 修改后
  cc.resources.load(...);
  ```

- **cc.loader.loadResArray**

  `cc.assetManager` 为了降低学习成本，将 `loadResArray` 与 `load` 进行了合并。`cc.resources.load` 的第一个参数可支持多个路径，所以可以使用 `cc.resources.load` 进行替换：

  ```js
  // 修改前
  cc.loader.loadResArray(...);

  // 修改后
  cc.resources.load(...);
  ```

- **cc.loader.loadResDir**

  `cc.resources.loadDir` 的参数与 `cc.loader.loadResDir` 完全相同：

  ```js
  // 修改前
  cc.loader.loadResDir(...);

  // 修改后
  cc.resources.loadDir(...);
  ```

  **注意**：为了简化接口，`cc.resources.loadDir` 的加载完成回调将 **不再提供** `paths` 的列表。请避免以下的使用方式：

  ```js
  cc.loader.loadResDir('images', cc.Texture2D, (err, assets, paths) => console.log(paths));
  ```

  如果你想要查询 `paths` 列表，可以使用以下方式：

  ```js
  var infos = cc.resources.getDirWithPath('images', cc.Texture2D);
  let paths = infos.map(function (info) {
      return info.path;
  });
  ```

- **cc.loader.load**

  如果你在自己的代码中使用了 `cc.loader.load` 来加载远程图片或远程音频，为了方便理解，在 `cc.assetManager` 中将有专门的 API 用于此项工作，如下所示：

  - 加载远程图片

    ```js
    // 修改前
    cc.loader.load('http://example.com/remote.jpg', (err, texture) => console.log(texture));

    // 修改后
    cc.assetManager.loadRemote('http://example.com/remote.jpg', (err, texture) => console.log(texture));
    ```

  - 加载远程音频

    ```js
    // 修改前
    cc.loader.load('http://example.com/remote.mp3', (err, audioClip) => console.log(audioClip));

    // 修改后
    cc.assetManager.loadRemote('http://example.com/remote.mp3', (err, audioClip) => console.log(audioClip));
    ```

  - 加载远程文本

    ```js
    // 修改前
    cc.loader.load('http://example.com/equipment.txt', (err, text) => console.log(text));

    // 修改后
    cc.assetManager.loadRemote('http://example.com/equipment.txt', (err, textAsset) => console.log(textAsset.text));
    ```

**注意**：

1. 如果你在自己的代码中使用了 `cc.loader.downloader.loadSubpackage` 来加载分包，请参考 [分包升级指南](./subpackage-upgrade-guide.md) 进行升级。

2. 为了避免产生不必要的错误，`cc.loader.onProgress` 在 `cc.assetManager` 中没有对应实现。你可以自己实现全局回调机制，但建议将回调传入到每个加载函数中，避免并发加载时互相干扰。

#### 释放相关接口的替换

如果你在自己的代码中使用了 `cc.loader.release`、`cc.loader.releaseAsset`、`cc.loader.releaseRes`、`cc.loader.releaseResDir`，请使用 `cc.assetManager` 中对应的 API 进行替换。可参考下方的替换方式：

- **cc.loader.release**

  `cc.loader.release` 可用 `cc.assetManager.releaseAsset` 替换。

  **注意**：为了避免开发者关注资源中一些晦涩难懂的属性，`cc.assetManager.releaseAsset` **不再接受** 数组、资源 UUID、资源 URL 进行释放，仅能通过资源本身进行释放。

  ```js
  // 修改前
  cc.loader.release(texture);
  // 修改后
  cc.assetManager.releaseAsset(texture);

  // 修改前
  cc.loader.release([texture1, texture2, texture3]);
  // 修改后
  [texture1, texture2, texture3].forEach(t => cc.assetManager.releaseAsset(t));

  // 修改前
  var uuid = texture._uuid;
  cc.loader.release(uuid);
  // 修改后
  cc.assetManager.releaseAsset(texture);

  // 修改前
  var url = texture.url;
  cc.loader.release(url);
  // 修改后
  cc.assetManager.releaseAsset(texture);
  ```

  **注意**：为了增加易用性，在 `cc.assetManager` 中释放资源的依赖资源将 **不再需要** 手动获取资源的依赖项，在 `cc.assetManager.releaseAsset` 内部将会尝试自动去释放相关依赖资源，例如：

  ```js
  // 修改前
  var assets = cc.loader.getDependsRecursively(texture);
  cc.loader.release(assets);

  // 修改后
  cc.assetManager.releaseAsset(texture);
  ```

- **cc.loader.releaseAsset**

  `cc.loader.releaseAsset` 可直接使用 `cc.assetManager.releaseAsset` 替换：

  ```js
  // 修改前
  cc.loader.releaseAsset(texture);

  // 修改后
  cc.assetManager.releaseAsset(texture);
  ```

- **cc.loader.releaseRes**

  `cc.loader.releaseRes` 可直接使用 `cc.resources.release` 替换：

  ```js
  // 修改前
  cc.loader.releaseRes('images/a', cc.Texture2D);

  // 修改后
  cc.resources.release('images/a', cc.Texture2D);
  ```

- **cc.loader.releaseAll**

  `cc.loader.releaseAll` 可直接使用 `cc.assetManager.releaseAll` 替换：

  ```js
  // 修改前
  cc.loader.releaseAll();

  // 修改后
  cc.assetManager.releaseAll();
  ```

**注意**：

1. 出于安全考虑，`cc.loader.releaseResDir` 在 `cc.assetManager` 中没有对应实现，请使用 `cc.assetManager.releaseAsset` 或 `cc.resources.release` 进行单个资源释放。

2. 因为 `cc.assetManager.releaseAsset` 会自动释放依赖资源，所以你不需要再显式调用 `cc.loader.getDependsRecursively`。如果需要查找资源的相关依赖，请参考 `cc.assetManager.dependUtil` 中相关的 API。

3. 出于安全考虑，`cc.assetManager` 仅支持在场景中设置的自动释放，其他的已移除。`cc.assetManager` 中没有实现 `cc.loader.setAutoRelease`、`cc.loader.setAutoReleaseRecursively`、`cc.loader.isAutoRelease` 这几个 API，建议你使用全新的基于引用计数的自动释放机制，详细请参考 [资源释放](../asset-manager/release-manager.md)。

#### 扩展相关接口的替换

- **cc.Pipeline**

  如果你的代码中有使用 `cc.loader.insertPipe`、`cc.loader.insertPipeAfter`、`cc.loader.appendPipe`、`cc.loader.addDownloadHandlers`、`cc.loader.addLoadHandlers` 系列 API 对 `cc.loader` 的加载流程做过扩展，或者直接使用了 `cc.loader.assetLoader`、`cc.loader.md5Pipe`、`cc.loader.downloader`、`cc.loader.loader`、`cc.loader.subPackPipe` 中的方法，请使用 `cc.assetManager` 中对应的 API 进行替换。

  因为 `cc.assetManager` 是更通用的模块，不再继承自 `cc.Pipeline`，所以 `cc.assetManager` 不再实现 `cc.loader.insertPipe`、`cc.loader.insertPipeAfter`、`cc.loader.appendPipe`。具体的替换方式如下：

  ```js
  // 修改前
  var pipe1 = {
    id: 'pipe1',
    handle: (item, done) => {
      let result = doSomething(item.uuid);
      done(null, result);
    }
  };

  var pipe2 = {
    id: 'pipe2',
    handle: (item, done) => {
      let result = doSomething(item.content);
      done(null, result);
    }
  };

  cc.loader.insertPipe(pipe1, 1);
  cc.loader.appendPipe(pipe2);

  // 修改后
  function pipe1 (task, done) {
    let output = [];
    for (var i = 0; i < task.input.length; i++) {
      let item = task.input[i];
      item.content = doSomething(item.uuid);
      output.push(item);
    }

    task.output = output;
    done(null);
  }

  function pipe2 (task, done) {
    let output = [];
    for (var i = 0; i < task.input.length; i++) {
      let item = task.input[i];
      item.content = doSomething(item.content);
      output.push(item);
    }

    task.output = output;
    done(null);
  }

  cc.assetManager.pipeline.insert(pipe1, 1);
  cc.assetManager.pipeline.append(pipe2);
  ```

  **注意**：

  1. `cc.assetManager` **不再继承** 自 `Pipeline`，而是 `cc.assetManager` 下拥有的多个 `Pipeline` 实例。详情请参考 [管线与任务](../asset-manager/pipeline-task.md)。

  2. 为了易用性，Pipe 的定义不再需要定义一个拥有 `handle` 方法和 `id` 的对象，只需要一个方法即可。详情请参考 [管线与任务](../asset-manager/pipeline-task.md)。

  3. 为了简化逻辑、提高性能，Pipe 中处理的内容不再是 `item`，而是 `task` 对象。详情请参考 [管线与任务](../asset-manager/pipeline-task.md)。

  4. 为了降低学习成本，`Pipeline` 中不再支持 `insertPipeAfter` 形式的 API，请使用 `insert` 插入指定的位置。

- **addDownloadHandlers、addLoadHandlers**

  出于模块化考虑，`cc.assetManager` 中没有实现 `addDownloadHandlers`、`addLoadHandlers`，请参考以下方式替换：

  ```js
  // 修改前
  var customHandler = (item, cb) => {
      let result = doSomething(item.url);
      cb(null, result);
  };

  cc.loader.addDownloadHandlers({png: customHandler});

  // 修改后
  var customHandler = (url, options, cb) => {
      let result = doSomething(url);
      cb(null, result);
  };

  cc.assetManager.downloader.register('.png', customHandler);
  ```

  或者：

  ```js
  // 修改前
  var customHandler = (item, cb) => {
      let result = doSomething(item.content);
      cb(null, result);
  };

  cc.loader.addLoadHandlers({png: customHandler});

  // 修改后
  var customHandler = (file, options, cb) => {
      let result = doSomething(file);
      cb(null, result);
  };

  cc.assetManager.parser.register('.png', customHandler);
  ```

  **注意**：

  1. 因为 **下载模块** 与 **解析模块** 都是依靠 **扩展名** 来匹配对应的处理方式，所以调用 `register` 时，传入的第一个参数需要以 `.` 开头。
 
  2. 出于模块化的考虑，自定义的处理方法将不再传入一个 `item` 对象，而是直接传入与其相关的信息。`downloader` 的自定义处理方法传入的是 **待下载的 URL**，`parser` 传入的则是 **待解析的文件**。具体的内容请参考 [下载与解析](../asset-manager/downloader-parser.md)。

  3. 新的拓展机制提供了一个额外的 `options` 参数，可以极大地增加灵活性。但如果你不需要配置引擎内置参数或者自定义参数，可以无视它。具体内容请参考文档 [可选参数](../asset-manager/options.md)。

- **downloader，loader，md5Pipe，subPackPipe**

  `cc.loader.downloader` 可由 `cc.assetManager.downloader` 代替，`cc.loader.loader` 可由 `cc.assetManager.parser` 代替。但其中的接口没有完全继承，具体内容请参考文档 [下载与解析](../asset-manager/downloader-parser.md) 或者 API 文档 [cc.assetManager.downloader](../../../api/zh/classes/AssetManager.html#downloader) 和 [cc.assetManager.parser](../../../api/zh/classes/AssetManager.html#parser)。

  **注意**：出于对性能、模块化和易读性的考虑，`cc.loader.assetLoader`、`cc.loader.md5Pipe`、`cc.loader.subPackPipe` 已经被合并到 `cc.assetManager.transformPipeline` 中，你应该避免使用这三个模块中的任何方法与属性。关于 `cc.assetManager.transformPipeline` 的具体内容可参考 [管线与任务](../asset-manager/pipeline-task.md)。

### 其他更新

`cc.url` 与 `cc.AssetLibrary` 在 **v2.4** 中已经被移除，请避免使用 `cc.url` 与 `cc.AssetLibrary` 中的任何方法和属性。

`cc.Pipeline` 可由 `cc.AssetManager.Pipeline` 进行替换，请参考以下方式进行替换：

```js
// 修改前
var pipe1 = {
    id: 'pipe1',
    handle: function (item, cb) {
        let result = doSomething(item);
        cb(null, result);
    }
}

var pipeline = new cc.Pipeline([pipe1]);

// 修改后
function pipe1 (task, cb) {
    task.output = doSomething(task.input);
    cb(null);
}

var pipeline = new cc.AssetManager.Pipeline('test', [pipe1]);
```

**注意**：`cc.LoadingItem` 在 `cc.assetManager` 中已经不支持，请避免使用这个类型。

为了支持更多加载策略，`cc.macro.DOWNLOAD_MAX_CONCURRENT` 已经从 `cc.macro` 中移除，你可以用以下方式替换：

```js
// 修改前
cc.macro.DOWNLOAD_MAX_CONCURRENT = 10;

// 修改后
cc.assetManager.downloader.maxConcurrency = 10;
```

或者

```js
// 修改前
cc.macro.DOWNLOAD_MAX_CONCURRENT = 10;

// 修改后（设置预设值）
cc.assetManager.presets['default'].maxConcurrency = 10;
```

具体内容可参考 [下载与解析](../asset-manager/downloader-parser.md)。
