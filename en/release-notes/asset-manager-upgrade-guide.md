# v2.4 Asset Manager Upgrade Guide

> Author: Santy-Wang, Xunyi

> This document will detail the considerations for upgrading an older project to v2.4.

Before v2.4, [Acquire and load asset](https://github.com/cocos/cocos-docs/blob/e02ac31bab12d3ee767c0549050b0e42bd22bc5b/en/scripting/load-assets.md) was implemented through the `cc.loader` module (including the APIs `cc.loader.load`, `cc.loader.loadRes`, `cc.loader.loadResDir`, etc.), which was primarily used to load resources. However, with the continuous development of Creator, developers' demands for resource management have been increasing. The original `cc.loader` module has been unable to meet a large number of resource management needs, and a new resource management module is in the air.

Therefore, Creator in **v2.4** introduced a new resource management module -- **Asset Manager**. Compared to the previous `cc.loader` module, **Asset Manager** not only provides better loading performance, but also supports **Asset Bundle**, preload resources and more convenient resource release management. And **Asset Manager** also has strong extensibility, which greatly improves the development efficiency and user experience of developers. We recommend that all developers upgrade.

To bring a smooth upgrade experience, we will maintain compatibility with `cc.loader` related APIs, and most of the game project can run as usual, except for a few that use incompatible special usage APIs that must be manually upgraded. And we will only remove full compatibility with `cc.loader` when the time comes. If you are temporarily uncomfortable upgrading due to the project cycle, etc., you can keep the original writing while making sure the test passes.

Currently, when using those old APIs, the engine will output warnings and suggestions for upgradation. Please adjust the code according to the warnings and the instructions in this document and upgrade to the new usage. Unfortunately, due to an upgrade of the underlying layer, we have left behind a few incompatible APIs that will output error messages while running. If you have decided to make the upgrade, then please read the following carefully.

- For the **Artist and Game Designer**, all resources in your project (e.g. scenes, animations, prefab) do not need to be modified or upgraded.
- For **Programmers**, all APIs in the `cc.loader` module that were used in the original code need to be changed to APIs from `cc.assetManager`. The related content will be described in detail in this document.

> **Note**: as v2.4 supports **Asset Bundle**, the subpackage feature in the project also needs to be upgraded, please refer to the [Subpackage Upgrade Guide](./subpackage-upgrade-guide.md) documentation for details.

## Situations that require upgrading manually

- You use APIs that start with `cc.loader` in your own code, such as `cc.loader.loaderRes`, `cc.loader.loadResDir`, `cc.loader.release`, etc.
- You use APIs that start with `cc.AssetLibrary` in your own code, such as `cc.AssetLibrary.loadAsset`.
- You use an API that starts with `cc.url` in your own code, such as `cc.url.raw`.
- You use types such as `cc.Pipeline`, `cc.LoadingItems` in your own code.
- You have used the `cc.macro.DOWNLOAD_MAX_CONCURRENT` property in your own code.

## Upgrade steps

- **Back up your old projects**
- Use Cocos Creator **v2.4** in the **Dashboard** to open the project that needs to be upgraded, Creator will reimport the affected resources. The first import will take a little longer, and the main editor window will open after the import is complete. And more error or warning may appear on the **Console** panel, don't worry, open the code editor to update your code according to the error or warning message.

### Replace the `cc.loader` related API with the `cc.assetManager` related API.

As of v2.4, `cc.loader` is no longer recommended and will be completely removed in subsequent releases, please replace it with the new resource management module `cc.assetManager`.

#### The relevant interface replacement about loading

If you use `cc.loader.loadRes`, `cc.loader.loadResArray`, `cc.loader.loadResDir` in your own code, use the corresponding API in `cc.assetManager` for the replacement. You can refer to the following replacements.

- **cc.loader.loadRes**

  The parameters of `cc.resources.load` are exactly equal to `cc.loader.loadRes`. Replace with the following:

  ```js
  // before
  cc.loader.loadRes(...);

  // after
  cc.resources.load(...);
  ```

- **cc.loader.loadResArray**

  For reducing learning costs, `loadResArray` has been merged with `load` and the first parameter of `cc.resources.load` can support multiple paths, so you can use `cc.resources.load` to replace.

  ```js
  // before
  cc.loader.loadResArray(...);

  // after
  cc.resources.load(...);
  ```

- **cc.loader.loadResDir**

  The parameters of `cc.resources.loadDir` are equal to those of `cc.loader.loadResDir`.

  ```js
  // before
  cc.loader.loadResDir(...);

  // after
  cc.resources.loadDir(...);
  ```

  > **Note**: to simplify the interface, the load completion callback for `cc.resources.loadDir` will **no longer** provide a list of paths. Please avoid using the following:

  ```js
  cc.loader.loadResDir('images', cc.Texture2D, (err, assets, paths) => console.log(paths));
  ```

  If you want to query the paths list, you can use the following form:

  ```js
  var infos = cc.resources.getDirWithPath('images', cc.Texture2D);
  let paths = infos.map(function (info) {
      return info.path;
  });
  ```

- **cc.loader.load**

  If you use `cc.loader.load` to load remote images or audios in your own code, there is a special API for this in the `cc.assetManager` for ease of understanding, as follows:

  - **Loading remote images**

    ```js
    // before
    cc.loader.load('http://example.com/remote.jpg', (err, texture) => console.log(texture));

    // after
    cc.assetManager.loadRemote('http://example.com/remote.jpg', (err, texture) => console.log(texture));
    ```

  - **Loading remote audio**

    ```js
    // before
    cc.loader.load('http://example.com/remote.mp3', (err, audioClip) => console.log(audioClip));

    // after
    cc.assetManager.loadRemote('http://example.com/remote.mp3', (err, audioClip) => console.log(audioClip));
    ```

  - **Loading remote text**

    ```js
    // before
    cc.loader.load('http://example.com/equipment.txt', (err, text) => console.log(text));

    // after
    cc.assetManager.loadRemote('http://example.com/equipment.txt', (err, textAsset) => console.log(textAsset.text));
    ```

> **Notes**:
>
> 1. If you use `cc.loader.downloader.loadSubpackage` in your own code to load a subpackage, please refer to the [Subpackage Upgrade Guide](./subpackage-upgrade-guide.md) to upgrade it.
>
> 2. To avoid unnecessary errors, `cc.loader.onProgress` has no equivalent implementation in `cc.assetManager`. You can implement your own global callback mechanism, but it is recommended that you pass callbacks to each load function to avoid interfering with each other during concurrent loading.

#### The relevant interface replacement about releasing

If you use `cc.loader.release`, `cc.loader.releaseAsset`, `cc.loader.releaseRes`, `cc.loader.releaseResDir` in your own code, please use the corresponding API in `cc.assetManager` for replacement. You can refer to the following replacements.

- **cc.loader.release**

  `cc.loader.release` can be replaced with `cc.assetManager.releaseAsset`.
  
  > **Note**: in order to avoid user attention to some obscure properties of the resource, `cc.assetManager.releaseAsset` **no longer** accepts arrays, resource UUIDs, resource URLs for release, only the resource itself can be accepted for release.

  ```js
  // before
  cc.loader.release(texture);
  // after
  cc.assetManager.releaseAsset(texture);

  // before
  cc.loader.release([texture1, texture2, texture3]);
  // after
  [texture1, texture2, texture3].forEach(t => cc.assetManager.releaseAsset(t));

  // before
  var uuid = texture._uuid;
  cc.loader.release(uuid);
  // after
  cc.assetManager.releaseAsset(texture);

  // before
  var url = texture.url;
  cc.loader.release(url);
  // after
  cc.assetManager.releaseAsset(texture);
  ```

  > **Note**: to increase ease of use, releasing resource dependencies in `cc.assetManager` will **no longer require** manual access to resource dependencies, and an attempt will be made within `cc.assetManager.releaseAsset` to automatically release the associated dependencies, for example:
  >
  > ```js
  > // before
  > var assets = cc.loader.getDependsRecursively(texture);
  > cc.loader.release(assets);
  >
  > // after
  > cc.assetManager.releaseAsset(texture);
  > ```

- **cc.loader.releaseAsset**

  `cc.loader.releaseAsset` can be replaced directly with `cc.assetManager.releaseAsset`.

  ```js
  // before
  cc.loader.releaseAsset(texture);

  // after
  cc.assetManager.releaseAsset(texture);
  ```

- **cc.loader.releaseRes**

  `cc.operator.releaseRes` can be replaced directly with `cc.resources.release`.

  ```js
  // before
  cc.loader.releaseRes('images/a', cc.Texture2D);

  // after
  cc.resources.release('images/a', cc.Texture2D);
  ```

- **cc.loader.releaseAll**

  `cc.loader.releaseAll` can be replaced directly with `cc.assetManager.releaseAll`.

  ```js
  // before
  cc.loader.releaseAll();

  // after
  cc.assetManager.releaseAll();
  ```

> **Notes**:
>
> 1. For security reasons, `cc.loader.releaseResDir` does not have a corresponding implementation in `cc.assetManager`, please use `cc.assetManager.releaseAsset` or `cc.resources.release` for individual resource releases.
>
> 2. Since the `cc.assetManager.releaseAsset` automatically releases dependent resources, you no longer need to explicitly call `cc.loader.getDependsRecursively`. If you need to find the dependency of the resource, please refer to the relevant API in `cc.assetManager.dependUtil`.
>
> 3. For security reasons, `cc.assetManager` only supports the Auto Release property set in the scene, and `cc.loader.setAutoRelease`, `cc.loader.setAutoReleaseRecursively`, `cc.loader.isAutoRelease` APIs have been removed. It is recommended that you use the new auto-release mechanism based on reference counting. Please refer to the [Release Of Resources](../asset-manager/release-manager.md) documentation for details.

#### Extension-related interface replacements

- **cc.Pipeline**

  If you have methods in your code that use `cc.loader.insertPipe`, `cc.loader.insertPipeAfter`, `cc.loader.appendPipe`, `cc.loader.addDownloadHandlers`, `cc.loader.addLoadHandlers` series APIs to extend the loading process of `cc.loader`, or directly use `cc.loader.assetLoader`, `cc.loader.md5Pipe`, `cc.loader.downloader`, `cc.loader.loader`, `cc.loader.subPackPipe`, here are the detailed alternatives.

  Because `cc.assetManager` is a more general module and no longer inherits from `cc.Pipeline`, `cc.assetManager` no longer implements `cc.handler.insertPipe`, `cc.handler.insertPipeAfter`, `cc.handler.appendPipe`. Please replace with the following code:

  ```js
  // before
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

  // after
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

  > **Notes**:
  >
  > 1. `cc.assetManager` **no longer** inherits by `Pipeline`, but by multiple `Pipeline` instances owned under `cc.assetManager`. Please refer to the [Pipeline and Task](../asset-manager/pipeline-task.md) documentation for details.
  >
  > 2. For ease of use, the definition of Pipe no longer requires the definition of an object with a `handle` method and an `id`, just a single method. See [Pipeline and Task](../asset-manager/pipeline-task.md) documentation for details.
  >
  > 3. In order to simplify the logic and improve performance, what is processed in Pipe is no longer a `item` but a `task` object, see [Pipeline and Task](../asset-manager/pipeline-task.md) documentation for details.
  >
  > 4. In order to reduce learning costs, APIs in the form of `insertPipeAfter` are no longer supported in `Pipeline`, so please use `insert` to insert the specified location.

- **addDownloadHandlers, addLoadHandlers**

  For modularity reasons, `addDownloadHandlers` and `addLoadHandlers` are not implemented in `cc.assetManager`, please refer to the following for replacement:

  ```js
  // before
  var customHandler = (item, cb) => {
    let result = doSomething(item.url);
    cb(null, result);
  };

  cc.loader.addDownloadHandlers({png: customHandler});

  // after
  var customHandler = (url, options, cb) => {
    let result = doSomething(url);
    cb(null, result);
  };

  cc.assetManager.downloader.register('.png', customHandler);
  ```

  Or:

  ```js
  // before
  var customHandler = (item, cb) => {
    let result = doSomething(item.content);
    cb(null, result);
  };

  cc.loader.addLoadHandlers({png: customHandler});

  // after
  var customHandler = (file, options, cb) => {
    let result = doSomething(file);
    cb(null, result);
  };

  cc.assetManager.parser.register('.png', customHandler);
  ```

  > **Notes**:
  >
  > 1. Since both the **download module** and the **parsing module** rely on **extensions** to match the corresponding processing method. So when calling `register`, the incoming first parameter needs to start with `.`.
  >
  > 2. For the sake of modularity, the custom processing method will no longer pass in an `item` object, but will pass in its associated information directly. The custom processing method of `downloader` passes in **the URL to be downloaded**, and `parser` passes in **the file to be parsed**. For more information about `downloader` and `parser`, please refer to the [Download and Parse](../asset-manager/downloader-parser.md) documentation.
  >
  > 3. The new expansion mechanism provides an additional `options` parameter that can greatly increase flexibility. However, if you don't need to configure the engine's built-in or custom parameters, you can ignore it. Please refer to the [Optional parameter](../asset-manager/options.md) documentation for details.

- **downloader, loader, md5Pipe, subPackPipe**

  `cc.loader.downloader` can be replaced by `cc.assetManager.downloader`, and `cc.loader.loader` can be replaced by `cc.assetManager.parser`. For details, see [Download and Parse](../asset-manager/downloader-parser.md) documentation or the corresponding API documentation [cc.assetManager.downloader](../../../api/classes/AssetManager.html#downloader) and [cc.assetManager.parser](../../../api/en/classes/AssetManager.html#parser).

  > **Note**: for performance, modularity and readability reasons, `cc.loader.assetLoader`, `cc.loader.md5Pipe`, `cc.loader.subPackPipe` have been merged into `cc.assetManager.transformPipeline` and you should avoid using any of the methods and properties in these three modules. Details about `cc.assetManager.transformPipeline` can be found in [Pipeline and Tasks](../asset-manager/pipeline-task.md) documentation.

### Other changes

The `cc.url` and `cc.AssetLibrary` have been removed in v2.4, so avoid using any methods and properties of `cc.url` and `cc.AssetLibrary`.

`Pipeline` can be replaced by `cc.AssetManager.Pipeline`:

```js
// before
var pipe1 = {
    id: 'pipe1',
    handle: function (item, cb) {
        let result = doSomething(item);
        cb(null, result);
    }
}

var pipeline = new cc.Pipeline([pipe1]);

// after
function pipe1 (task, cb) {
    task.output = doSomething(task.input);
    cb(null);
}

var pipeline = new cc.AssetManager.Pipeline('test', [pipe1]);
```

> **Note**: `cc.LoadingItem` is no longer supported in `cc.assetManager`, please avoid using this type.

To support more loading strategies, `cc.macro.DOWNLOAD_MAX_CONCURRENT` has been removed from `cc.macro` and you can replace it with the following:

```js
// before
cc.macro.DOWNLOAD_MAX_CONCURRENT = 10;

// after
cc.assetManager.downloader.maxConcurrency = 10;
```

Or:

```js
// before
cc.macro.DOWNLOAD_MAX_CONCURRENT = 10;

// after (set a preset value)
cc.assetManager.presets['default'].maxConcurrency = 10;
```

Please refer to the [Download and Parse](../asset-manager/downloader-parser.md) documentation for details.
