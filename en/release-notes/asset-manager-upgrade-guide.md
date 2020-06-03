# v2.4 Asset Manager Upgrade Guide

> Author：Santy-Wang

> This article will detail the considerations for upgrading older Creators projects to v2.4. If you are not a user of an older version of Creator, there is no need to read this article.

Before v2.4 [Acquire and load asset](https://github.com/cocos-creator/creator-docs/blob/e02ac31bab12d3ee767c0549050b0e42bd22bc5b/en/scripting/load-assets.md) documentation, we have mention of using the `cc.loader` module including the `cc.loader.load`, `cc.loader.loadRes`, `cc.loader.loadResDir` and other series APIs to load resources. At that time, the `cc.loader` was mainly used as a module to load resources, but as the Creator continued to develop, the demand for resource management increased, and the original `cc.loader` was no longer able to meet a large number of resource management needs, and a new resource management module was called for. In v2.4, Creator launched the new resource management module `Asset Manager`. Compared to the previous `cc.loader`, `Asset Manager` offers better loading performance, support for Asset Bundle, support for preloading resources, and easier resource release management, while Asset Manager also has strong scalability. Dramatically improve the development efficiency and experience for developers. We recommend that all developers upgrade.

In order to provide a smooth upgrade experience, we have retained compatibility with the `cc.loader` related APIs, and most of the game project can run as usual, except for some special uses that are not compatible and must be manually upgraded. We will then remove full compatibility with `cc.loader` when the time comes. If you are temporarily uncomfortable upgrading due to the project cycle, etc., you can keep the original writing while making sure the test passes.

Currently, when using those old APIs, the engine outputs a warning and suggests an upgrade method. Please adjust the code according to the warnings and upgrade to the new usage. Unfortunately, due to an upgrade of the underlying layer, we have left behind a few incompatible APIs that will output error messages while running. If you've already decided on an upgrade, then the following is what you need to read carefully.

For **Artist and Game Designer**, all resources in the project, such as scenes, animations, Prefab, do not need to be modified or upgraded. <br>
For **Programmers**, the impact is mainly in the fact that all APIs that were originally used in the code for `cc.loader` need to be changed to a series of APIs that use `cc.assetManager`, which is described in detail in this article.
**Note**: Since v2.4 supports Asset Bundle feature, the subpackage settings in the project need to be upgraded, please refer to [Subpackage Upgrade Guide](./subpackage-upgrade-guide.md).

## Frequently Asked Questions

### Do I need to upgrade manually?

You will need to upgrade if.
 - You use APIs that start with `cc.loader` in your own game code, such as `cc.loader.loaderRes`, `cc.loader.loadResDir`, `cc.loader.release`, etc.
 - You use APIs that start with `cc.AssetLibrary` in your own game code, such as `cc.AssetLibrary.loadAsset` and others.
 - You use an API that starts with `cc.url` in your own game code, such as `cc.url.raw`.
 - You use types such as `cc.Pipeline`, `cc.LoadingItems` in your own game code.
 - You have used the `cc.macro.DOWNLOAD_MAX_CONCURRENT` property in your own game code.

## Upgrade steps

 - **Back up older versions of the project**
 - Using the new version of Cocos Creator in CocosDashboard to open the original project, Creator will re-import the affected resources, it will take a little more time for the first upgrade, and the main editor window will open after the import. This may result in more errors or warnings. Don't worry, open the code editing tool for a code upgrade.

### Replace the cc.loader series API with the cc.assetManager series API

As of v2.4, `cc.loader` is no longer recommended and will be completely removed in subsequent releases, please replace it with the new resource management module `cc.assetManager`.

#### The relevant interface replacement about loading

If you use `cc.loader.loadRes`, `cc.loader.loadResArray`, `cc.loader.loadResDir` in your own game code, use the corresponding API in `cc.assetManager` for the replacement. <br>
Here are the detailed replacements.

##### cc.loader.loadRes

The parameters of `cc.resources.load` are equal to those of `cc.loader.loadRes`. Replace with the following.

```js
    // before
    cc.loader.loadRes(...);

    // after
    cc.resources.load(...);
```

##### cc.loader.loadResArray

For reducing learning costs, `loadResArray` has been merged with `load` and the first parameter of `cc.resources.load` can support multiple paths, so you can use `cc.resources.load` to replace.

```js
    // before
    cc.loader.loadResArray(...);

    // after
    cc.resources.load(...);
```

##### cc.loader.loadResDir

The parameters of `cc.resources.loadDir` are equal to those of `cc.loader.loadResDir`.

```js
    // before
    cc.loader.loadResDir(...);

    // after
    cc.resources.loadDir(...);
```

**Note**: In the interest of simplifying the interface, the load completion callback for `cc.resources.loadDir' will **no longer provide a list of **paths. Please avoid using the following.

```js
    cc.loader.loadResDir('images', cc.Texture2D, (err, assets, paths) => console.log(paths));
```
If you want to query the paths list, you can use the following form.

```js
    var infos = cc.resources.getDirWithPath('images', cc.Texture2D);
    let paths = infos.map(function (info) {
        return info.path;
    });
```

##### cc.loader.load

If you use `cc.loader.load` in your code to load remote pictures or remote audio, for ease of understanding, there will be a special API in `cc.assetManager` for this work, as follows.

Loading remote images.

```js
    // before
    cc.loader.load('http://example.com/remote.jpg', (err, texture) => console.log(texture));

    // after
    cc.assetManager.loadRemote('http://example.com/remote.jpg', (err, texture) => console.log(texture));
```

Loading remote audio.

```js
    // before
    cc.loader.load('http://example.com/remote.mp3', (err, audioClip) => console.log(audioClip));

    // after
    cc.assetManager.loadRemote('http://example.com/remote.mp3', (err, audioClip) => console.log(audioClip));
```

Loading remote text.

```js
    // before
    cc.loader.load('http://example.com/equipment.txt', (err, text) => console.log(text));

    // after
    cc.assetManager.loadRemote('http://example.com/equipment.txt', (err, textAsset) => console.log(textAsset.text));
```

**Note**.
1. If you use `cc.loader.downloader.loadSubpackage` in your code to load subpackages, please refer to [Subpackage Upgrade Guide] (. /subpackage-upgrade-guide.md) for the upgrade.

2. To avoid unnecessary errors, `cc.loader.onProgress` does not have a corresponding implementation in `cc.assetManager`, you can implement the global callback mechanism yourself, but it is recommended that you pass the callbacks into each load function to avoid interfering with each other during concurrent loading.

#### Release related interface replacement

If you use `cc.loader.release`, `cc.loader.releaseAsset`, `cc.loader.releaseRes`, `cc.loader.releaseResDir` in your own game code, please use the corresponding API in `cc.assetManager` for replacement.<br>

Here are the detailed replacements.

##### cc.loader.release

`cc.loader.release` can be replaced with `cc.assetManager.releaseAsset` **Note**: In order to avoid user attention to some obscure properties of the resource, `cc.assetManager.releaseAsset` ** no longer accepts ** arrays, resource UUIDs, resource URLs for release, only the resource itself can be accepted for release.

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

**Note**: To increase ease of use, releasing resource dependencies in `cc.assetManager` will **no longer require** manual access to resource dependencies, and an attempt will be made within `cc.assetManager.releaseAsset` to automatically release the associated dependencies, for example.

```js
    // before
    var assets = cc.loader.getDependsRecursively(texture);
    cc.loader.release(assets);

    // after
    cc.assetManager.releaseAsset(texture);
```
##### cc.loader.releaseAsset

`cc.loader.releaseAsset` can be replaced directly with `cc.assetManager.releaseAsset`.

```js
    // before
    cc.loader.releaseAsset(texture);

    // after
    cc.assetManager.releaseAsset(texture);
```

##### cc.loader.releaseRes

`cc.operator.releaseRes` can be replaced directly with `cc.resources.release`.

```js
    // before
    cc.loader.releaseRes('images/a', cc.Texture2D);

    // after
    cc.resources.release('images/a', cc.Texture2D);
```

##### cc.loader.releaseAll

`cc.loader.releaseAll` can be replaced directly with `cc.assetManager.releaseAll`.

```js
    // before
    cc.loader.releaseAll();

    // after
    cc.assetManager.releaseAll();
```

**Note**.
1. For security reasons, `cc.loader.releaseResDir` does not have a corresponding implementation in `cc.assetManager`, please use `cc.assetManager.releaseAsset` or `cc.resources.release` for individual resource releases.

2. Since the `cc.assetManager.releaseAsset` automatically releases dependent resources, you no longer need to explicitly call `cc.loader.getDependsRecursively`, if you need to find the dependency of the resource, please refer to the relevant API in `cc.assetManager.dependUtil`.

3. For security reasons, the original auto-release function has been removed from `cc.assetManager` and only the auto-release set on the scene is supported, `cc.assetManager` does not implement `cc.loader.setAutoRelease`, `cc.loader.setAutoReleaseRecursively`, `cc.loader.isAutoRelease` API.It is recommended that you use the new auto-release mechanism based on reference counting, see [Release Of Resources](../asset-manager/release-manager.md).

#### Extension-related interface replacement

##### cc.Pipeline

If you have methods in your code that use `cc.loader.insertPipe`, `cc.loader.insertPipeAfter`, `cc.loader.appendPipe`, `cc.loader.addDownloadHandlers`, `cc.loader.addLoadHandlers` series APIs to extend the loading process of `cc.loader`, or directly use `cc.loader.assetLoader`, `cc.loader.md5Pipe`, `cc.loader.downloader`, `cc.loader.loader`, `cc.loader.subPackPipe`, here are the detailed alternatives.

Because `cc.assetManager` is a more general module and no longer inherits from `cc.Pipeline`, `cc.assetManager` no longer implements `cc.handler.insertPipe`, `cc.handler.insertPipeAfter`, `cc.handler.appendPipe`. Please replace with the following form.

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

**Note**.
1. `cc.assetManager` ** no longer inherits** from `Pipeline`, but has multiple instances of `Pipeline` under `cc.assetManager`. For details, see [Pipeline and Task](../asset-manager/pipeline-task.md). 

2. For ease of use, the definition of a Pipe no longer requires the definition of an object with a `handle` method and an `id`, only a method, see [Pipeline and Task](../asset-manager/pipeline-task.md). 

3. In order to simplify the logic and improve performance, what is processed in Pipe is no longer a `item` but a `task` object, see [Pipeline and Task](../asset-manager/pipeline-task.md). 

4. In order to reduce learning costs, APIs in the form of `insertPipeAfter` are no longer supported in `Pipeline`, so please use `insert` to insert the specified location.

##### addDownloadHandlers，addLoadHandlers

For modularity reasons, `addDownloadHandlers`, `addLoadHandlers` are not implemented in `cc.assetManager` and should be replaced with the following.

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

Or

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
**NOTE**
1. Since both the download module and the parsing module rely on extensions to match the corresponding processing, the extension accepted by `register` must start with `. ` as the start of the accepted extension.

2. For the sake of modularity, custom processing methods will not feed an `item` object, but will directly feed the information associated with it, with the `downloader` custom processing method feeding the URL to be downloaded and the `parser` custom processing method feeding the file to be parsed. For details of the downloader and parser, see [Downloader and Parser](../asset-manager/downloader-parser.md).

3. The new extension mechanism provides an additional `options` parameter that adds great flexibility, but for now you can ignore it, see [Downloader And Parser](../asset-manager/downloader-parser.md) and [Optional parameter](../asset-manager/options.md).

##### downloader，loader，md5Pipe，subPackPipe

`cc.loader.downloader` can be replaced by `cc.assetManager.downloader` and `cc.loader.loader` can be replaced by `cc.assetManager.parser`. For details, see [Downloader And Parser](../asset-manager/downloader-parser.md) or the corresponding API documentation.

**Note**

For performance, modularity and readability reasons, `cc.loader.assetLoader`, `cc.loader.md5Pipe`, `cc.loader.subPackPipe` have been merged into `cc.assetManager.transformPipeline` and you should avoid using any of the methods and properties in these three modules. Details about `cc.assetManager.transformPipeline` can be found in [Pipeline And Tasks](../asset-manager/pipeline-task.md). 

### Other updates

The `cc.url` and `cc.AssetLibrary` were removed in v2.4, so avoid using any methods and properties under `cc.url` and `cc.AssetLibrary`.

`Pipeline` can be replaced by `cc.AssetManager.Pipeline`.

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

**Note**: `cc.LoadingItem` is no longer supported in `cc.assetManager`, please avoid using this type.

To support additional loading policies, `cc.macro.DOWNLOAD_MAX_CONCURRENT` has been removed from `cc.macro` and can be replaced with the following.

```js
// before
cc.macro.DOWNLOAD_MAX_CONCURRENT = 10;

// after
cc.assetManager.downloader.maxConcurrency = 10;
// Or set a preset value.
cc.assetManager.presets['default'].maxConcurrency = 10;
```
See [Downloader And Parser](../asset-manager/downloader-parser.md). 