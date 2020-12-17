# 可选参数

> 文：Santy-Wang，Xunyi

为了增加灵活性和可扩展性，Asset Manager 中大部分的加载接口包括 `assetManager.loadAny` 和 `assetManager.preloadAny` 都提供了 `options` 参数。`options` 除了可以配置 Creator 的内置参数，还可以自定义任意参数用于扩展引擎功能。如果开发者不需要配置引擎内置参数或者扩展引擎功能，可以无视它，直接使用更简单的 API 接口，比如 `resources.load`。

目前 `options` 中引擎已使用的参数包括：

`uuid`, `url`, `path`, `dir`, `scene`, `type`, `priority`, `preset`, `audioLoadMode`, `ext`,
`bundle`, `onFileProgress`, `maxConcurrency`, `maxRequestsPerFrame`, `maxRetryCount`, `version`, `xhrResponseType`,
`xhrWithCredentials`, `xhrMimeType`, `xhrTimeout`, `xhrHeader`, `reloadAsset`, `cacheAsset`, `cacheEnabled`

**注意**：请 **不要** 使用以上字段作为自定义参数的名称，避免与引擎功能发生冲突。

## 控制底层加载管线

可选参数是上层业务逻辑与底层加载管线之间的沟通工具。上层业务逻辑提供参数，用于控制下载器、解析器以及加载管线。

### 控制下载器和解析器

可选参数 `priority`, `maxConcurrency`, `maxRequestsPerFrame`, `maxRetryCount` 分别用于控制下载器对于下载请求的优先级排序、下载并发数限制、每帧能发起的请求数限制、最大重试次数。

```typescript
assetManager.loadAny({'path': 'image/background'}, {priority: 2, maxRetryCount: 10}, callback);
```

### 控制下载器和解析器的处理方法

下载器/解析器中的文本文件和二进制文件等资源的处理方法，可接受可选参数 `xhrResponseType`,
`xhrWithCredentials`, `xhrMimeType`, `xhrTimeout`, `xhrHeader`, `onFileProgress` 用于设置 XHR 的返回类型、头部以及下载进度回调等参数。

```typescript
// 获取 XHR 的下载进度回调
assetManager.loadAny({
    'path': 'image/background'
},
{
    onFileProgress: function (loaded, total) {
        console.log(loaded/total);
    }
}, callback);
```

而可选参数 `audioLoadMode` 则用于控制音频文件的处理方法是否使用 `WebAudio` 来加载音频。

```typescript
// 使用 WebAudio 远程加载音频
assetManager.loadRemote('http://example.com/background.mp3', {audioLoadMode: AudioClip.LoadMode.WEB_AUDIO}, callback);
```

**注意**：想要获取资源的加载进度必须在服务器端做好相关配置。

更多关于处理方法的介绍请参考 [下载与解析](downloader-parser.md)。

### 控制加载流程

可选参数 `reload`, `cacheAsset`, `cacheEnabled` 用于控制加载管线是否复用缓存中的资源、是否缓存资源、以及是否缓存文件。

```typescript
assetManager.loadRemote(url, {reload: true, cacheAsset: false, cacheEnabled: true}, (err, asset) => {});
```

而可选参数 `uuid`, `url`, `path`, `dir`, `scene`, `type`, `ext`, `bundle` 等，则是用于搜索资源。

```typescript
assetManager.loadAny({'path': 'images/background', type: SpriteFrame, bundle: 'resources'}, callback);

assetManager.loadAny({'dir': 'images', type: SpriteFrame, bundle: 'resources'}, callback);
```

这种方式完全等价于直接使用 `resources.load` 和 `resources.loadDir`。

## 扩展引擎

开发者可以通过在 [管线](pipeline-task.md) 和 [自定义处理方法](downloader-parser.md#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%A4%84%E7%90%86%E6%96%B9%E6%B3%95) 中使用可选参数来扩展引擎的加载功能。

```typescript
// 扩展管线
assetManager.pipeline.insert(function (task, done) {
    const input = task.input;
    for (let i = 0; i < input.length; i++) {
        if (input[i].options.myParam === 'important') {
            console.log(input[i].url);
        }
    }
    task.output = task.input;
    done();
}, 1);

assetManager.loadAny({'path': 'images/background'}, {'myParam': 'important'}, callback);

// 注册处理方法
assetManager.downloader.register('.myformat', function (url, options, callback) {
    // 下载对应资源
    const img = new Image();
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

assetManager.parser.register('.myformat', function (file, options, callback) {
    // 解析下载完成的文件
    callback(null, file);
});

assetManager.loadAny({'url': 'http://example.com/myAsset.myformat'}, {isCrossOrigin: true}, callback);
```

通过可选参数，再结合管线和自定义处理方法，引擎可以获得极大的扩展度。Asset Bundle 可以看做是使用可选参数扩展的第一个实例。
