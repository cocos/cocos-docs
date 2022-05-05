# 资源管理模块升级指南

> 文：Santy-Wang、Xunyi
>
> 本文将详细介绍 Cocos Creator 3D 的 loader 升级到 assetManager 时的注意事项。v2.4 的资源管理与 v3.0 差别不大，无需升级。

在 Cocos Creator 2.4 以前，[获取和加载资源](https://github.com/cocos-creator/creator-docs/blob/e02ac31bab12d3ee767c0549050b0e42bd22bc5b/zh/scripting/load-assets.md) 是通过 `loader` 模块（包括 `loader.load`、`loader.loadRes`、`loader.loadResDir` 等系列 API）来实现的，`loader` 模块主要用于加载资源。但随着 Creator 的不断发展，开发者对于资源管理的需求不断增加，原来的 `loader` 已无法满足大量的资源管理需求，一个新的资源管理模块呼之欲出。

因此，Creator 在 v2.4 推出了全新的资源管理模块 —— **Asset Manager**。相较之前的 `loader`，Asset Manager 不但提供了更好的加载性能，而且支持 Asset Bundle、预加载资源以及更加方便的资源释放管理。同时 Asset Manager 还拥有强大的扩展性，大大提升开发者的开发效率和使用体验，我们建议所有开发者都进行升级。

为了带来平滑的升级体验，我们仍保留了对 `loader` 相关 API 的兼容。除个别项目使用了无法兼容的特殊用法的 API 必须手动升级外，大部分项目都可以照常运行。之后我们会在时机成熟时才逐渐完全移除对 `loader` 的兼容。如果由于项目周期等原因暂时不方便升级，你可以在确保测试通过的情况下继续保留原来的写法。

目前在使用旧的 API 时，引擎会输出警告并提示升级方法。请你根据警告内容和本文的说明对代码进行调整，升级到新的用法。比较抱歉的是，由于底层经过了升级，我们遗留了个别无法兼容的 API，在运行时会输出错误信息。如果你已经决定好要进行升级，那么请仔细阅读以下内容。

- 对 **美术策划** 而言，项目中的所有资源，例如场景、动画、Prefab 都不需要修改，也不需要升级。
- 对 **程序** 而言，影响主要体现在原先代码中使用的 `loader` 的所有 API，都需要改为 `assetManager` 的 API。以下将详细介绍这部分内容。

**注意**：因为 v2.4 支持 Asset Bundle，项目中的分包功能也需要进行升级，具体内容请参考 [分包升级指南](./subpackage-upgrade-guide.md)。

## 需要手动升级的情况

- 你在自己的代码中使用了以 `loader` 开头的 API，比如 `loader.loaderRes`、`loader.loadResDir`、`loader.release` 等。
- 你在自己的代码中使用了以 `AssetLibrary` 开头的 API，比如 `AssetLibrary.loadAsset`。
- 你在自己的代码中使用了 `url` 开头的 API，比如 `url.raw`。
- 你在自己的代码中使用了 `Pipeline`，`LoadingItems` 等类型。
- 你在自己的代码中使用了 `macro.DOWNLOAD_MAX_CONCURRENT` 属性。

## 升级步骤

- **备份好旧项目**
- 在 Dashboard 中使用 Cocos Creator v3.0 打开需要升级的旧项目，Creator 将对有影响的资源重新导入，第一次导入时会稍微多花一点时间，导入完毕后就会打开编辑器主窗口。此时可能会出现较多的报错或警告信息，别担心，请打开代码编辑工具根据报错或警告信息对代码进行升级。

### 将 `loader` 相关的 API 替换为 `assetManager` 相关的 API

从 v2.4 开始，不建议使用 `loader`，并且在后续的版本中也会逐渐被彻底移除，请使用新的资源管理模块 `assetManager` 进行替换。

#### 加载相关接口的替换

如果你在自己的代码中使用了 `loader.loadRes`、`loader.loadResArray`、`loader.loadResDir`，请使用 `assetManager` 中对应的 API 进行替换。可参考下方的替换方式：

- **loader.loadRes**

  `resources.load` 的参数与 `loader.loadRes` 完全相同。替换方式如下：

  ```typescript
  // 修改前
  loader.loadRes(...);

  // 修改后
  resources.load(...);
  ```

- **loader.loadResArray**

  `assetManager` 为了降低学习成本，将 `loadResArray` 与 `load` 进行了合并。`resources.load` 的第一个参数可支持多个路径，所以可以使用 `resources.load` 进行替换：

  ```typescript
  // 修改前
  loader.loadResArray(...);

  // 修改后
  resources.load(...);
  ```

- **loader.loadResDir**

  `resources.loadDir` 的参数与 `loader.loadResDir` 完全相同：

  ```typescript
  // 修改前
  loader.loadResDir(...);

  // 修改后
  resources.loadDir(...);
  ```

  **注意**：为了简化接口，`resources.loadDir` 的加载完成回调将 **不再提供** `paths` 的列表。请避免以下的使用方式：

  ```typescript
  loader.loadResDir('images', Texture2D, (err, assets, paths) => console.log(paths));
  ```

  如果你想要查询 `paths` 列表，可以使用以下方式：

  ```typescript
  const infos = resources.getDirWithPath('images', Texture2D);
  let paths = infos.map(function (info) {
      return info.path;
  });
  ```

- **loader.load**

  如果你在自己的代码中使用了 `loader.load` 来加载远程图片或远程音频，为了方便理解，在 `assetManager` 中将有专门的 API 用于此项工作，如下所示：

  - 加载远程图片

    ```typescript
    // 修改前
    loader.load('http://example.com/remote.jpg', (err, texture) => console.log(texture));

    // 修改后
    assetManager.loadRemote('http://example.com/remote.jpg', (err, texture) => console.log(texture));
    ```

  - 加载远程音频

    ```typescript
    // 修改前
    loader.load('http://example.com/remote.mp3', (err, audioClip) => console.log(audioClip));

    // 修改后
    assetManager.loadRemote('http://example.com/remote.mp3', (err, audioClip) => console.log(audioClip));
    ```

  - 加载远程文本

    ```typescript
    // 修改前
    loader.load('http://example.com/equipment.txt', (err, text) => console.log(text));

    // 修改后
    assetManager.loadRemote('http://example.com/equipment.txt', (err, textAsset) => console.log(textAsset.text));
    ```

**注意**：

1. 如果你在自己的代码中使用了 `loader.downloader.loadSubpackage` 来加载分包，请参考 [分包升级指南](./subpackage-upgrade-guide.md) 进行升级。

2. 为了避免产生不必要的错误，`loader.onProgress` 在 `assetManager` 中没有对应实现。你可以自己实现全局回调机制，但建议将回调传入到每个加载函数中，避免并发加载时互相干扰。

#### 释放相关接口的替换

如果你在自己的代码中使用了 `loader.release`、`loader.releaseAsset`、`loader.releaseRes`、`loader.releaseResDir`，请使用 `assetManager` 中对应的 API 进行替换。可参考下方的替换方式：

- **loader.release**

  `loader.release` 可用 `assetManager.releaseAsset` 替换。

  **注意**：为了避免开发者关注资源中一些晦涩难懂的属性，`assetManager.releaseAsset` **不再接受** 数组、资源 UUID、资源 URL 进行释放，仅能通过资源本身进行释放。

  ```typescript
  // 修改前
  loader.release(texture);
  // 修改后
  assetManager.releaseAsset(texture);

  // 修改前
  loader.release([texture1, texture2, texture3]);
  // 修改后
  [texture1, texture2, texture3].forEach(t => assetManager.releaseAsset(t));

  // 修改前
  const uuid = texture._uuid;
  loader.release(uuid);
  // 修改后
  assetManager.releaseAsset(texture);

  // 修改前
  const url = texture.url;
  loader.release(url);
  // 修改后
  assetManager.releaseAsset(texture);
  ```

  **注意**：为了增加易用性，在 `assetManager` 中释放资源的依赖资源将 **不再需要** 手动获取资源的依赖项，在 `assetManager.releaseAsset` 内部将会尝试自动去释放相关依赖资源，例如：

  ```typescript
  // 修改前
  const assets = loader.getDependsRecursively(texture);
  loader.release(assets);

  // 修改后
  assetManager.releaseAsset(texture);
  ```

- **loader.releaseAsset**

  `loader.releaseAsset` 可直接使用 `assetManager.releaseAsset` 替换：

  ```typescript
  // 修改前
  loader.releaseAsset(texture);

  // 修改后
  assetManager.releaseAsset(texture);
  ```

- **loader.releaseRes**

  `loader.releaseRes` 可直接使用 `resources.release` 替换：

  ```typescript
  // 修改前
  loader.releaseRes('images/a', Texture2D);

  // 修改后
  resources.release('images/a', Texture2D);
  ```

- **loader.releaseAll**

  `loader.releaseAll` 可直接使用 `assetManager.releaseAll` 替换：

  ```typescript
  // 修改前
  loader.releaseAll();

  // 修改后
  assetManager.releaseAll();
  ```

**注意**：

1. 出于安全考虑，`loader.releaseResDir` 在 `assetManager` 中没有对应实现，请使用 `assetManager.releaseAsset` 或 `resources.release` 进行单个资源释放。

2. 因为 `assetManager.releaseAsset` 会自动释放依赖资源，所以你不需要再显式调用 `loader.getDependsRecursively`。如果需要查找资源的相关依赖，请参考 `assetManager.dependUtil` 中相关的 API。

3. 出于安全考虑，`assetManager` 仅支持在场景中设置的自动释放，其他的已移除。`assetManager` 中没有实现 `loader.setAutoRelease`、`loader.setAutoReleaseRecursively`、`loader.isAutoRelease` 这几个 API，建议你使用全新的基于引用计数的自动释放机制，详细请参考 [资源释放](release-manager.md)。

#### 扩展相关接口的替换

- **Pipeline**

  如果你的代码中有使用 `loader.insertPipe`、`loader.insertPipeAfter`、`loader.appendPipe`、`loader.addDownloadHandlers`、`loader.addLoadHandlers` 系列 API 对 `loader` 的加载流程做过扩展，或者直接使用了 `loader.assetLoader`、`loader.md5Pipe`、`loader.downloader`、`loader.loader`、`loader.subPackPipe` 中的方法，请使用 `assetManager` 中对应的 API 进行替换。

  因为 `assetManager` 是更通用的模块，不再继承自 `Pipeline`，所以 `assetManager` 不再实现 `loader.insertPipe`、`loader.insertPipeAfter`、`loader.appendPipe`。具体的替换方式如下：

  ```typescript
  // 修改前
  const pipe1 = {
    id: 'pipe1',
    handle: (item, done) => {
      let result = doSomething(item.uuid);
      done(null, result);
    }
  };

  const pipe2 = {
    id: 'pipe2',
    handle: (item, done) => {
      let result = doSomething(item.content);
      done(null, result);
    }
  };

  loader.insertPipe(pipe1, 1);
  loader.appendPipe(pipe2);

  // 修改后
  function pipe1 (task, done) {
    let output = [];
    for (let i = 0; i < task.input.length; i++) {
      let item = task.input[i];
      item.content = doSomething(item.uuid);
      output.push(item);
    }

    task.output = output;
    done(null);
  }

  function pipe2 (task, done) {
    let output = [];
    for (let i = 0; i < task.input.length; i++) {
      let item = task.input[i];
      item.content = doSomething(item.content);
      output.push(item);
    }

    task.output = output;
    done(null);
  }

  assetManager.pipeline.insert(pipe1, 1);
  assetManager.pipeline.append(pipe2);
  ```

  **注意**：

  1. `assetManager` **不再继承** 自 `Pipeline`，而是 `assetManager` 下拥有的多个 `Pipeline` 实例。详情请参考 [管线与任务](pipeline-task.md)。

  2. 为了易用性，Pipe 的定义不再需要定义一个拥有 `handle` 方法和 `id` 的对象，只需要一个方法即可。详情请参考 [管线与任务](..pipeline-task.md)。

  3. 为了简化逻辑、提高性能，Pipe 中处理的内容不再是 `item`，而是 `task` 对象。详情请参考 [管线与任务](pipeline-task.md)。

  4. 为了降低学习成本，`Pipeline` 中不再支持 `insertPipeAfter` 形式的 API，请使用 `insert` 插入指定的位置。

- **addDownloadHandlers、addLoadHandlers**

  出于模块化考虑，`assetManager` 中没有实现 `addDownloadHandlers`、`addLoadHandlers`，请参考以下方式替换：

  ```typescript
  // 修改前
  const customHandler = (item, cb) => {
      let result = doSomething(item.url);
      cb(null, result);
  };

  loader.addDownloadHandlers({png: customHandler});

  // 修改后
  const customHandler = (url, options, cb) => {
      let result = doSomething(url);
      cb(null, result);
  };

  assetManager.downloader.register('.png', customHandler);
  ```

  或者：

  ```typescript
  // 修改前
  const customHandler = (item, cb) => {
      let result = doSomething(item.content);
      cb(null, result);
  };

  loader.addLoadHandlers({png: customHandler});

  // 修改后
  const customHandler = (file, options, cb) => {
      let result = doSomething(file);
      cb(null, result);
  };

  assetManager.parser.register('.png', customHandler);
  ```

  **注意**：

  1. 因为 **下载模块** 与 **解析模块** 都是依靠 **扩展名** 来匹配对应的处理方式，所以调用 `register` 时，传入的第一个参数需要以 `.` 开头。

  2. 出于模块化的考虑，自定义的处理方法将不再传入一个 `item` 对象，而是直接传入与其相关的信息。`downloader` 的自定义处理方法传入的是 **待下载的 URL**，`parser` 传入的则是 **待解析的文件**。具体的内容请参考 [下载与解析](downloader-parser.md)。

  3. 新的拓展机制提供了一个额外的 `options` 参数，可以极大地增加灵活性。但如果你不需要配置引擎内置参数或者自定义参数，可以无视它。具体内容请参考文档 [可选参数](options.md)。

- **downloader，loader，md5Pipe，subPackPipe**

  `loader.downloader` 可由 `assetManager.downloader` 代替，`loader.loader` 可由 `assetManager.parser` 代替。但其中的接口没有完全继承，具体内容请参考文档 [下载与解析](downloader-parser.md) 或者 API 文档 [assetManager.downloader](__APIDOC__/zh/class/AssetManager?id=downloader) 和 [assetManager.parser](__APIDOC__/zh/class/AssetManager?id=parser)。

  **注意**：出于对性能、模块化和易读性的考虑，`loader.assetLoader`、`loader.md5Pipe`、`loader.subPackPipe` 已经被合并到 `assetManager.transformPipeline` 中，你应该避免使用这三个模块中的任何方法与属性。关于 `assetManager.transformPipeline` 的具体内容可参考 [管线与任务](pipeline-task.md)。

### 其他更新

`url` 与 `AssetLibrary` 在 **v2.4** 中已经被移除，请避免使用 `url` 与 `AssetLibrary` 中的任何方法和属性。

`Pipeline` 可由 `AssetManager.Pipeline` 进行替换，请参考以下方式进行替换：

```typescript
// 修改前
const pipe1 = {
    id: 'pipe1',
    handle: function (item, cb) {
        let result = doSomething(item);
        cb(null, result);
    }
}

const pipeline = new Pipeline([pipe1]);

// 修改后
function pipe1 (task, cb) {
    task.output = doSomething(task.input);
    cb(null);
}

const pipeline = new AssetManager.Pipeline('test', [pipe1]);
```

**注意**：`LoadingItem` 在 `assetManager` 中已经不支持，请避免使用这个类型。

为了支持更多加载策略，`macro.DOWNLOAD_MAX_CONCURRENT` 已经从 `macro` 中移除，你可以用以下方式替换：

```typescript
// 修改前
macro.DOWNLOAD_MAX_CONCURRENT = 10;

// 修改后
assetManager.downloader.maxConcurrency = 10;
```

或者

```typescript
// 修改前
macro.DOWNLOAD_MAX_CONCURRENT = 10;

// 修改后（设置预设值）
assetManager.presets['default'].maxConcurrency = 10;
```

具体内容可参考 [下载与解析](downloader-parser.md)。
