# Optional parameters

> Author：Santy-Wang

For added flexibility and more scalability, most load interfaces in Asset Manager, including `cc.assetManager.loadAny` and `cc.assetManager.pre-loadAny`, provide options parameters that allow you to configure the engine's built-in parameters or customize your own parameters to extend the engine's functionality. If you don't need to set more parameters or extend the engine, you can ignore the options parameter and use a simpler API like `cc.resources.load` and skip this post.

The parameters that are currently used by the engine in OPTIONS include:

`uuid`, `url`, `path`, `dir`, `scene`, `type`, `priority`, `preset`, `audioLoadMode`, `ext`, `bundle`, `onFileProgress`, `maxRetryCount`, `maxConcurrency`, `maxRequestsPerFrame`, `version`, `responseType`, `withCredentials`, `mimeType`, `timeout`, `header`, `reload`, `cacheAsset`, `cacheEnabled`

Please **DO NOT** use the above fields as your custom parameter names to avoid conflicts with engine functions.

The optional parameters serve as a communication tool between the upper level business logic and the lower loading line, enabling the upper level business logic to provide parameters to control the operation of the lower loading line.

1. The parameters `priority`, `maxConcurrency`, `maxRequestsPerFrame`, `maxRetryCount` are used to control the downloader's prioritization of download requests, the limit on the number of parallel loads, the limit on the number of requests that can be initiated per frame and the maximum number of retries. For example, you could use the following:

    ```js
    cc.assetManager.loadAny({'path': 'image/background'}, {priority: 2, maxRetryCount: 10}, callback);
    ```

2. Control the processing of the downloader and parser, the handler of the downloader and parser can receive optional parameters set by the business logic, the handler of resources such as text files and binaries in the downloader can accept `responseType`, `withCredentials`, `mimeType`, `timeout`, `header`, `onFileProgress` optional parameters to set the XHR return type, header, download progress callback and other parameters, while the processing of audio files can accept `audioLoadMode` parameter to control whether to use `WebAudio` to load audio. You can use the following:

    ```js
    // Get download progress
    cc.assetManager.loadAny({'path': 'image/background'}, {onFileProgress: function (loaded, total) {
        console.log(loaded/total);
    } }, callback);

    // Loading audio using web audio form
    cc.assetManager.loadRemote('http://example.com/background.mp3', {audioLoadMode: cc.AudioClip.LoadMode.WEB_AUDIO}, callback);
    ```

    **Note**: The loading progress of the resource must be configured on the server side if you want to access it.

    For more information on how to handler, see [Downloader And Parser](downloader-parser.md) documentation.

3. To control the loading process, the loading pipeline accepts `reload`, `cacheAsset`, `cacheEnabled` optional parameters to control whether to reuse resources in the cache and whether to cache resources and whether to cache files. Parameters such as `uuid`, `url`, `path`, `dir`, `scene`, `type`, `ext`, `bundle` are used to search resources. You can use the following:

    ```js
    cc.assetManager.loadAny({'path': 'images/background', type: cc.SpriteFrame, bundle: 'resources'}, callback);

    cc.assetManager.loadAny({'dir': 'images', type: cc.SpriteFrame, bundle: 'resources'}, callback);
    ```

    This approach is exactly equivalent to using `cc.resources.load` and `cc.resources.loadDir` directly.

## Expand Engine

When you need to extend the loading capabilities of the engine, you can use optional parameters in [Pipeline And Task](pipeline-task.md), [Custom handlers](downloader-parser.md#Custom%20handlers). For example:

```js
// Expand pipeline
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

cc.assetManager.loadAny({'path': 'images/background'}, {myParam: 'important'}, callback);

// Register handler
cc.assetManager.downloader.register('.myformat', function (url, options, callback) {
    // download
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
    // Parsing a downloaded file
    callback(null, file);
});

cc.assetManager.loadAny({'url': 'http://example.com/myAsset.myformat'}, {isCrossOrigin: true}, callback);
```

By combining pipelines, customized handler and the optional parameters, the engine can be greatly expanded. the Asset Bundle can be seen as the first instance of expansion using optional parameters.
