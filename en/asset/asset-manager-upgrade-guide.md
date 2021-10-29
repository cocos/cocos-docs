# Asset Manager Upgrade Guide

> This article details what to expect when upgrading from loader to assetManager.

Before Creator v2.4, [Acquire and load asset](https://github.com/cocos-creator/creator-docs/blob/e02ac31bab12d3ee767c0549050b0e42bd22bc5b/en/scripting/load-assets.md) was implemented through the `loader` module (including the APIs `loader.load`, `loader.loadRes`, `loader.loadResDir`, etc.), which was primarily used to load resources. However, with the continuous development of Creator, developers' demands for resource management have been increasing. The original `loader` module has been unable to meet a large number of resource management needs, and a new resource management module is in the air.

Therefore, Creator in **v2.4** introduced a new resource management module -- **Asset Manager**. Compared to the previous `loader` module, **Asset Manager** not only provides better loading performance, but also supports **Asset Bundle**, preload resources and more convenient resource release management. And **Asset Manager** also has strong extensibility, which greatly improves the development efficiency and user experience of developers. We recommend that all developers upgrade.

To bring a smooth upgrade experience, we will maintain compatibility with `loader` related APIs, and most of the game project can run as usual, except for a few that use incompatible special usage APIs that must be manually upgraded. And we will only remove full compatibility with `loader` when the time comes. If developers are temporarily uncomfortable upgrading due to the project cycle, etc., keep the original writing while making sure the test passes.

Currently, when using those old APIs, the engine will output warnings and suggestions for upgradation. Please adjust the code according to the warnings and the instructions in this document and upgrade to the new usage. Unfortunately, due to an upgrade of the underlying layer, we have left behind a few incompatible APIs that will output error messages while running. If deciding to make the upgrade, please read the following carefully:

- For the **Artist and Game Designer**, all resources in your project (e.g.: scenes, animations, prefab) do not need to be modified or upgraded.
- For **Programmers**, all APIs in the `loader` module that were used in the original code need to be changed to APIs from `assetManager`. The related content will be described in detail in this document.

> **Note**: as v2.4 supports **Asset Bundle**, the subpackage feature in the project also needs to be upgraded, please refer to the [Subpackage Upgrade Guide](./subpackage-upgrade-guide.md) documentation for details.

## Situations that require upgrading manually

- Using APIs that start with `loader` in custom code, such as `loader.loaderRes`, `loader.loadResDir`, `loader.release`, etc.
- Using APIs that start with `AssetLibrary` in custom code, such as `AssetLibrary.loadAsset`.
- Using an API that starts with `url` in custom code, such as `url.raw`.
- Using types such as `Pipeline`, `LoadingItems` in custom code.
- Using the `macro.DOWNLOAD_MAX_CONCURRENT` property in custom code.

## Upgrade steps

- **Back up your old projects**
- Use Cocos Creator **v2.4** in the **Dashboard** to open the project that needs to be upgraded, Creator will reimport the affected resources. The first import will take a little longer, and the main editor window will open after the import is complete. And more error or warning may appear on the **Console** panel, don't worry, open the code editor to update your code according to the error or warning message.

### Replace the `loader` related API with the `assetManager` related API

As of v2.4, `loader` is no longer recommended and will be completely removed in subsequent releases, please replace it with the new resource management module `assetManager`.

#### The relevant interface replacement about loading

If using `loader.loadRes`, `loader.loadResArray`, `loader.loadResDir` in custom code, use the corresponding API in `assetManager` for the replacement. Refer to the following replacements:

- **loader.loadRes**

  The parameters of `resources.load` are exactly equal to `loader.loadRes`. Replace with the following:

  ```typescript
  // before
  loader.loadRes(...);

  // after
  resources.load(...);
  ```

- **loader.loadResArray**

  For reducing learning costs, `loadResArray` has been merged with `load` and the first parameter of `resources.load` can support multiple paths, use `resources.load` to replace.

  ```typescript
  // before
  loader.loadResArray(...);

  // after
  resources.load(...);
  ```

- **loader.loadResDir**

  The parameters of `resources.loadDir` are equal to those of `loader.loadResDir`.

  ```typescript
  // before
  loader.loadResDir(...);

  // after
  resources.loadDir(...);
  ```

  > **Note**: to simplify the interface, the load completion callback for `resources.loadDir` will **no longer** provide a list of paths. Please avoid using the following:

  ```typescript
  loader.loadResDir('images', Texture2D, (err, assets, paths) => console.log(paths));
  ```

  If you want to query the paths list, use the following form:

  ```typescript
  const infos = resources.getDirWithPath('images', Texture2D);
  let paths = infos.map(function (info) {
      return info.path;
  });
  ```

- **loader.load**

  If using `loader.load` to load remote images or audios in custom code, there is a special API for this in the `assetManager` for ease of understanding, as follows:

  - **Loading remote images**

    ```typescript
    // before
    loader.load('http://example.com/remote.jpg', (err, texture) => console.log(texture));

    // after
    assetManager.loadRemote('http://example.com/remote.jpg', (err, texture) => console.log(texture));
    ```

  - **Loading remote audio**

    ```typescript
    // before
    loader.load('http://example.com/remote.mp3', (err, audioClip) => console.log(audioClip));

    // after
    assetManager.loadRemote('http://example.com/remote.mp3', (err, audioClip) => console.log(audioClip));
    ```

  - **Loading remote text**

    ```typescript
    // before
    loader.load('http://example.com/equipment.txt', (err, text) => console.log(text));

    // after
    assetManager.loadRemote('http://example.com/equipment.txt', (err, textAsset) => console.log(textAsset.text));
    ```

> **Notes**:
> 1. If using `loader.downloader.loadSubpackage` in custom code to load a subpackage, please refer to the [Subpackage Upgrade Guide](./subpackage-upgrade-guide.md) to upgrade it.
> 2. To avoid unnecessary errors, `loader.onProgress` has no equivalent implementation in `assetManager`. To implement a custom global callback mechanism, but it is recommended to pass callbacks to each load function to avoid interfering with each other during concurrent loading.

#### The relevant interface replacement about releasing

If using `loader.release`, `loader.releaseAsset`, `loader.releaseRes`, `loader.releaseResDir` in custom code, please use the corresponding API in `assetManager` for replacement. Refer to the following replacements:

- **loader.release**

  `loader.release` can be replaced with `assetManager.releaseAsset`.

  > **Note**: in order to avoid user attention to some obscure properties of the resource, `assetManager.releaseAsset` **no longer** accepts arrays, resource UUIDs, resource URLs for release, only the resource itself can be accepted for release.

  ```typescript
  // before
  loader.release(texture);
  // after
  assetManager.releaseAsset(texture);

  // before
  loader.release([texture1, texture2, texture3]);
  // after
  [texture1, texture2, texture3].forEach(t => assetManager.releaseAsset(t));

  // before
  const uuid = texture._uuid;
  loader.release(uuid);
  // after
  assetManager.releaseAsset(texture);

  // before
  const url = texture.url;
  loader.release(url);
  // after
  assetManager.releaseAsset(texture);
  ```

  > **Note**: to increase ease of use, releasing resource dependencies in `assetManager` will **no longer require** manual access to resource dependencies, and an attempt will be made within `assetManager.releaseAsset` to automatically release the associated dependencies, for example:

  ```typescript
  // before
  const assets = loader.getDependsRecursively(texture);
  loader.release(assets);

  // after
  assetManager.releaseAsset(texture);
  ```

- **loader.releaseAsset**

  `loader.releaseAsset` can be replaced directly with `assetManager.releaseAsset`.

  ```typescript
  // before
  loader.releaseAsset(texture);

  // after
  assetManager.releaseAsset(texture);
  ```

- **loader.releaseRes**

  `operator.releaseRes` can be replaced directly with `resources.release`.

  ```typescript
  // before
  loader.releaseRes('images/a', Texture2D);

  // after
  resources.release('images/a', Texture2D);
  ```

- **loader.releaseAll**

  `loader.releaseAll` can be replaced directly with `assetManager.releaseAll`.

  ```typescript
  // before
  loader.releaseAll();

  // after
  assetManager.releaseAll();
  ```

> **Notse**:
> 1. For security reasons, `loader.releaseResDir` does not have a corresponding implementation in `assetManager`, please use `assetManager.releaseAsset` or `resources.release` for individual resource releases.
> 2. Since the `assetManager.releaseAsset` automatically releases dependent resources, it is no longer necessary to explicitly call `loader.getDependsRecursively`. If needing to find the dependency of the resource, please refer to the relevant API in `assetManager.dependUtil`.
> 3. For security reasons, `assetManager` only supports the Auto Release property set in the scene, and `loader.setAutoRelease`, `loader.setAutoReleaseRecursively`, `loader.isAutoRelease` APIs have been removed. It is recommended to use the new auto-release mechanism based on reference counting. Please refer to the [Release Of Resources](release-manager.md) documentation for details.

#### Extension-related interface replacements

- **Pipeline**

  If using methods in custom code that use `loader.insertPipe`, `loader.insertPipeAfter`, `loader.appendPipe`, `loader.addDownloadHandlers`, `loader.addLoadHandlers` series APIs to extend the loading process of `loader`, or directly use `loader.assetLoader`, `loader.md5Pipe`, `loader.downloader`, `loader.loader`, `loader.subPackPipe`, here are the detailed alternatives.

  Because `assetManager` is a more general module and no longer inherits from `Pipeline`, `assetManager` no longer implements `handler.insertPipe`, `handler.insertPipeAfter`, `handler.appendPipe`. Please replace with the following code:

  ```typescript
  // before
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

  // after
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

  > **Notes**:
  > 1. `assetManager` **no longer** inherits by `Pipeline`, but by multiple `Pipeline` instances owned under `assetManager`. Please refer to the [Pipeline and Task](pipeline-task.md) documentation for details.
  > 2. For ease of use, the definition of Pipe no longer requires the definition of an object with a `handle` method and an `id`, just a single method. See [Pipeline and Task](pipeline-task.md) documentation for details.
  > 3. In order to simplify the logic and improve performance, what is processed in Pipe is no longer a `item` but a `task` object, see [Pipeline and Task](pipeline-task.md) documentation for details.
  > 4. In order to reduce learning costs, APIs in the form of `insertPipeAfter` are no longer supported in `Pipeline`, so please use `insert` to insert the specified location.

- **addDownloadHandlers, addLoadHandlers**

  For modularity reasons, `addDownloadHandlers` and `addLoadHandlers` are not implemented in `assetManager`, please refer to the following for replacement:

  ```typescript
  // before
  const customHandler = (item, cb) => {
    let result = doSomething(item.url);
    cb(null, result);
  };

  loader.addDownloadHandlers({png: customHandler});

  // after
  const customHandler = (url, options, cb) => {
    let result = doSomething(url);
    cb(null, result);
  };

  assetManager.downloader.register('.png', customHandler);
  ```

  Or:

  ```typescript
  // before
  const customHandler = (item, cb) => {
    let result = doSomething(item.content);
    cb(null, result);
  };

  loader.addLoadHandlers({png: customHandler});

  // after
  const customHandler = (file, options, cb) => {
    let result = doSomething(file);
    cb(null, result);
  };

  assetManager.parser.register('.png', customHandler);
  ```

  > **Notes**:
  > 1. Since both the **download module** and the **parsing module** rely on **extensions** to match the corresponding processing method. So when calling `register`, the incoming first parameter needs to start with `.`.
  > 2. For the sake of modularity, the custom processing method will no longer pass in an `item` object, but will pass in its associated information directly. The custom processing method of `downloader` passes in **the URL to be downloaded**, and `parser` passes in **the file to be parsed**. For more information about `downloader` and `parser`, please refer to the [Download and Parse](downloader-parser.md) documentation.
  > 3. The new expansion mechanism provides an additional `options` parameter that can greatly increase flexibility. However, if it is not necessary to configure the engine's built-in or custom parameters, ignore it. Please refer to the [Optional parameter](options.md) documentation for details.

- **downloader, loader, md5Pipe, subPackPipe**

  `loader.downloader` can be replaced by `assetManager.downloader`, and `loader.loader` can be replaced by `assetManager.parser`. For details, see [Download and Parse](downloader-parser.md) documentation or the corresponding API documentation [assetManager.downloader](__APIDOC__/en/classes/asset_manager.assetmanager.html#downloader) and [assetManager.parser](__APIDOC__/en/classes/asset_manager.assetmanager.html#parser).

  > **Note**: for performance, modularity and readability reasons, `loader.assetLoader`, `loader.md5Pipe`, `loader.subPackPipe` have been merged into `assetManager.transformPipeline`. Remember to avoid using any of the methods and properties in these three modules. Details about `assetManager.transformPipeline` can be found in [Pipeline and Tasks](pipeline-task.md) documentation.

### Other changes

The `url` and `AssetLibrary` have been removed, so avoid using any methods and properties of `url` and `AssetLibrary`.

`Pipeline` can be replaced by `AssetManager.Pipeline`:

```typescript
// before
const pipe1 = {
    id: 'pipe1',
    handle: function (item, cb) {
        let result = doSomething(item);
        cb(null, result);
    }
}

const pipeline = new Pipeline([pipe1]);

// after
function pipe1 (task, cb) {
    task.output = doSomething(task.input);
    cb(null);
}

const pipeline = new AssetManager.Pipeline('test', [pipe1]);
```

> **Note**: `LoadingItem` is no longer supported in `assetManager`, please avoid using this type.

To support more loading strategies, `macro.DOWNLOAD_MAX_CONCURRENT` has been removed from `macro` and replace it with the following:

```typescript
// before
macro.DOWNLOAD_MAX_CONCURRENT = 10;

// after
assetManager.downloader.maxConcurrency = 10;
```

Or:

```typescript
// before
macro.DOWNLOAD_MAX_CONCURRENT = 10;

// after (set a preset value)
assetManager.presets['default'].maxConcurrency = 10;
```

Please refer to the [Download and Parse](downloader-parser.md) documentation for details.
