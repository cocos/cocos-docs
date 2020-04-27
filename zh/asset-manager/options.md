# 可选参数

> 文：Santy-Wang

为了增加灵活性和更多的扩展性，Asset Manager 中大部分加载接口包括 `cc.assetManager.loadAny`，`cc.assetManager.preloadAny` 都提供了 options 参数，你可以配置引擎内置参数，也可以自定义自己的参数用于扩展引擎功能。如果你不需要设置更多参数或者扩展引擎，你可以忽略 options 参数并使用更为简单的 API 比如 `cc.resources.load`，并跳过此文章。 

目前 options 中引擎已使用的参数包括：

`uuid`，`url`，`path`，`dir`，`scene`，`type`，`priority`，`preset`，`audioLoadMode`，`ext`，`bundle`，`onFileProgress`，`maxRetryCount`，`maxConcurrent`, `maxRequestsPerFrame`, `version`，`isCrossOrigin`，`responseType`，`withCredentials`，`mimeType`，`timeout`，`header`，`reload`，`cacheAsset`，`cacheEnabled`

请 **不要** 使用以上的字段作为你自定义的参数名称，避免和引擎功能发生冲突。

可选参数作为上层业务逻辑与底层加载管线的沟通工具，可以实现由上层业务逻辑提供参数来控制底层加载管线的运作：

1. 控制下载器和解析器，`priority`，`maxConcurrent`, `maxRequestsPerFrame`，`maxRetryCount` 参数用于控制下载器对于下载请求的优先级排序，加载并行数限制，每帧能发起的请求限制，最大重试次数。例如你可以如此使用：

```js
    cc.assetManager.loadAny({ 'path': 'image/background' }, { priority: 2, maxRetryCount: 10 }, callback);
```

2. 控制下载器和解析器的处理方法，下载器与解析器的处理方法可以接收到业务逻辑设置的可选参数，下载器中文本文件，二进制文件等资源的处理方法可接受 `responseType`，`withCredentials`，`mimeType`，`timeout`，`header`，`onFileProgress` 的可选参数，用于设置 XHR 的返回类型，头部，下载进度回调等参数；图片格式的处理方法则接受 `isCrossOrigin` 参数，用于确定图片是否跨域；而音频文件的处理方法则接受 `audioLoadMode` 参数，用于控制是否使用 `WebAudio` 的方式来加载音频。你可以如下使用：

```js
    // 获取下载进度回调
    cc.assetManager.loadAny({ 'path': 'image/background' }, { onFileProgress: function (loaded, total) {
        console.log(loaded/total);
    } }, callback);

    // 跨域图片
    cc.assetManager.loadRemote('http://example.com/background.jpg', { isCrossOrigin: true }, callback);

    // 使用 web audio 形式加载音频
    cc.assetManager.loadRemote('http://example.com/background.mp3', { audioLoadMode: cc.AudioClip.LoadMode.WEB_AUDIO }, callback);
```

**注意** ：想要获取资源的加载进度必须在服务器端做好相关配置。

更多关于处理方法的介绍请参考 [下载器与解析器](downloader-parser.md) 。

3. 控制加载流程，加载管线接受 `reload`，`cacheAsset`，`cacheEnabled` 可选参数用于控制是否复用缓存中的资源和是否缓存资源和是否缓存文件。`uuid`，`url`，`path`，`dir`，`scene`，`type`，`ext`，`bundle` 等参数则是用于搜索资源。你可以如下使用：

```js
    cc.assetManager.loadAny({ path: 'images/background', type: cc.SpriteFrame, bundle: 'resources' }, callback);

    cc.assetManager.loadAny({ dir: 'images', type: cc.SpriteFrame, bundle: 'resources' }, callback);
```

这种方式完全等价于直接使用 `cc.resources.load` 和 `cc.resources.loadDir`。

## 扩展引擎

当你需要扩展引擎的加载功能时，你可以在 [管线](pipeline-task.md)，[自定义处理方式](downloader-parser.md) 中使用可选参数。例如：

```js
    // 扩展管线
    cc.assetManager.pipeline.insert(function (task, done) {
        var input = task.input;
        for (var i = 0; i < input.length; i++) {
            if (input[i].options.myParam === 'important') {
                console.log(input[i].url);
            }
        }
        task.output = task.input;
        done();
    }, 1);

    cc.assetManager.loadAny({ path: 'images/background'}, { myParam: 'important' }, callback);

    // 注册处理方法
    cc.assetManager.downloader.register('.myformat', function (url, options, callback) {
        // 下载对应资源
        var img = new Image();
        if (options.isCrossOrigin) {
            img.crossOrigin = 'anonymous';
        }

        img.onload = function () {
            callback(null, img);
        };

        img.onerror = function () {
            callback(new Error('download failed'), null);
        };

        img.src = url;

    });

    cc.assetManager.parser.register('.myformat', function (file, options, callback) {
        // 解析下载回来的文件
        callback(null, file);
    });

    cc.assetManager.loadAny({ url: 'http://example.com/myAsset.myformat' }, { isCrossOrigin: true }, callback);
```

通过结合管线，自定义处理方法，可选参数可以达到极大的扩展度。Asset Bundle 可以看做使用可选参数扩展的第一个实例。

## load, preload 批量设置可选参数

**特别需要注意** 的是，对于 `load` 与 `preload` 方法而言，可选参数的设置是批量设置的，例如当你如下加载 prefab 时：

```js
    cc.assetManager.loadAny({ path: 'prefabs/ui' }, { priority: 2 }, callback );
```

此时，除了 `prefabs/ui` 会以优先级 2 进行下载之外，该 prefab 的所有依赖资源，例如图片，音效等都会设置为优先级 2 。另外，当同时加载多个资源时，可选参数也会应用到所有的资源上，例如：

```js
    cc.assetManager.loadAny([{ path: 'prefabs/ui' }, { url: 'http://example.com/background.jpg' }], { priority: 2 }, callback);
```

此时，会同时加载两个资源，且两个资源以及他们的所有依赖资源都会以优先级 2 进行资源下载。

当你不需要将所有可选参数应用到所有资源时，你可以使用如下方式：

```js
    cc.assetManager.loadAny([{ path: 'prefabs/ui', priority: 2 }, { url: 'http://example.com/background.jpg', priority: 3 }], callback);
```

当你在该资源请求中设置可选参数时，只会应用到该资源本身。当资源请求中的可选参数与批量可选参数有重叠字段时，会以资源请求中的可选参数为准。例如：

```js
    cc.assetManager.loadAny([{ path: 'prefabs/ui', priority: 2 }, { url: 'http://example.com/background.jpg', priority: 2 }, { url: 'http://example.com/test.myformat' }], { priority: 3 }, callback);
```

此时除了前两个资源本身是优先级 2 之外，他们的依赖资源以及第三个资源都是优先级 3 。