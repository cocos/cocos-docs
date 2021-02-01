# Optional Parameters

> Author: Santy-Wang, Xunyi

For added flexibility and extensibility, most of the load interfaces in Asset Manager, including `assetManager.loadAny` and `assetManager.preloadAny`, provide `options` parameters. In addition to configuring the built-in parameters of Creator, `options` also allows you to customize any parameters to extend engine functionality. If you do not need to configure the engine's built-in parameters or extend the engine's functionality, you can ignore it and just use the simpler API interfaces, such as `resources.load`.

Parameters that are currently used by the engine in `options` include the following:

`uuid`, `url`, `path`, `dir`, `scene`, `type`, `priority`, `preset`, `audioLoadMode`, `ext`,
`bundle`, `onFileProgress`, `maxConcurrency`, `maxRequestsPerFrame`, `maxRetryCount`, `version`, `xhrResponseType`,
`xhrWithCredentials`, `xhrMimeType`, `xhrTimeout`, `xhrHeader`, `reloadAsset`, `cacheAsset`, `cacheEnabled`,

**DO NOT** use the above fields as your custom parameter names to avoid conflicts with engine functions.

## Control loading pipeline

The optional parameters serve as a communication tool between the upper level business logic and the lower level load pipeline. The upper level business logic provides parameters to control the operation of the lower level load pipeline.

### Controls downloader and parser

The optional parameters `priority`, `maxConcurrency`, `maxRequestsPerFrame`, `maxRetryCount` are used to control the downloader's prioritization of download requests, the limit on the number of concurrent loads, the limit on the number of requests that can be initiated per frame, and the maximum number of retries, respectively. For example:

```typescript
assetManager.loadAny({'path': 'image/background'}, {priority: 2, maxRetryCount: 10}, callback);
```

### Controls the handler of downloader and parser

The handler for resources such as text files and binary files in the downloader/parser, accepting optional parameters `xhrResponseType`, `xhrWithCredentials`, `xhrMimeType`, `xhrTimeout`, `xhrHeader`, `onFileProgress` to set the XHR's return type, header, download progress callback and other parameters.

```typescript
// Get a download progress callback for XHR
assetManager.loadAny({
    'path': 'image/background'
},
{
    onFileProgress: function (loaded, total) {
        console.log(loaded/total);
    }
}, callback);
```

While the optional parameter `audioLoadMode` controls whether or not the audio file's handler uses `WebAudio` to load audio.

```typescript
// Load audio remotely using WebAudio.
assetManager.loadRemote('http://example.com/background.mp3', {audioLoadMode: AudioClip.LoadMode.WEB_AUDIO}, callback);
```

> **Note**: loading progress of the resources must be configured on the server if you want to get it.

For more information about the handler, please refer to document [Download and Parse](downloader-parser.md).

### Control loading process

The optional parameters `reload`, `cacheAsset`, and `cacheEnabled` are used to control the loading pipeline whether to reuse the resources in the cache, whether to cache the resources, and whether to cache the files.

```typescript
assetManager.loadRemote(url, {reload: true, cacheAsset: false, cacheEnabled: true}, (err, asset) => {});
```

While the optional parameters `uuid`, `url`, `path`, `dir`, `scene`, `type`, `ext`, `bundle`, etc. are used to search for resources.

```typescript
assetManager.loadAny({'path': 'images/background', type: SpriteFrame, bundle: 'resources'}, callback);

assetManager.loadAny({'dir': 'images', type: SpriteFrame, bundle: 'resources'}, callback);
```

This approach is exactly equivalent to using `resources.load` and `resources.loadDir` directly.

## Engine Extension

You can extend the loading capabilities of the engine by using optional parameters in the [Pipeline](pipeline-task.md) and [Custom Handlers](downloader-parser.md#custom-handlers). For example:

```typescript
// Extend the pipeline
assetManager.pipeline.insert(function (task, done) {
    let input = task.input;
    for (let i = 0; i < input.length; i++) {
        if (input[i].options.myParam === 'important') {
            console.log(input[i].url);
        }
    }
    task.output = task.input;
    done();
}, 1);

assetManager.loadAny({'path': 'images/background'}, {'myParam': 'important'}, callback);

// Register the handler
assetManager.downloader.register('.myformat', function (url, options, callback) {
    // Download the resource
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
    // Parse the downloaded file
    callback(null, file);
});

assetManager.loadAny({'url': 'http://example.com/myAsset.myformat'}, {isCrossOrigin: true}, callback);
```

The engine can be extremely extensible by using optional parameters, combined with pipelines and custom handlers, and Asset Bundle can be seen as the first instance of extension using optional parameters.
