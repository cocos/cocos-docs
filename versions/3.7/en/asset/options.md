# Optional Parameters

> Author: Santy-Wang, Xunyi

For added flexibility and extensibility, most of the load interfaces in Asset Manager, including `assetManager.loadAny` and `assetManager.preloadAny`, provide `options` parameters. In addition to configuring the built-in parameters of Creator, `options` also allows you to customize any parameters to extend engine functionality. If you do not need to configure the engine's built-in parameters or extend the engine's functionality, you can ignore it and just use the simpler API interfaces, such as `resources.load`.

Parameters that are currently used by the engine in `options` include the following:

`uuid`, `url`, `path`, `dir`, `scene`, `type`, `priority`, `preset`, `audioLoadMode`, `ext`,
`bundle`, `onFileProgress`, `maxConcurrency`, `maxRequestsPerFrame`, `maxRetryCount`, `version`, `xhrResponseType`,
`xhrWithCredentials`, `xhrMimeType`, `xhrTimeout`, `xhrHeader`, `reloadAsset`, `cacheAsset`, `cacheEnabled`,

**DO NOT** use the above fields as your custom parameter names to avoid conflicts with engine functions.
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
