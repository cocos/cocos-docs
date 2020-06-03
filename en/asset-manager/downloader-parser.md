# Downloader And Parser

> Author：Santy-Wang

The Asset Manager uses multiple loading pipelines to load resources, each of which uses two modules, `downloader` and `parser`, which you can access through `cc.assetManager.downloader` and `cc.assetManager.parser`.

## Downloader

The downloader is a global single instance with **failure retry**, **download priority**, **download limit** and other features.

## Failure retry.

When a download resource fails in the downloader, it will be retried automatically, and you can control the failed retries with two attributes.

1. You can set the `maxRetryCount` property to control how many times the maximum number of attempts will be made to return the error when the downloaded resource fails, 3 retries by default, or 0 if you don't need to retrieve it, it will return immediately when it fails, for example.

```js
    cc.assetManager.downloader.maxRetryCount = 0;
```

2. You can set the `retryInterval` property to control the retry interval, which defaults to 2000 ms, i.e. when the download fails, it will wait 2000 ms before retrying. For example. 

```js
    cc.assetManager.downloader.retryInterval = 4000;
```

### Download priority.

When downloading resources, the downloader will sort them according to download priority, and resources with high priority will be downloaded first. There are four built-in priorities in the Creator.

1. All preloaded resources have a priority of -1.
2. the user manually loads resources with a priority of 0.
3. when loading scenes, the priority of resources in all scenes is 1.
4. When loading a script or Asset Bundle, priority is 2.

Scripts and Asset Bundle will have the highest priority; followed by scenes that can be guaranteed to load quickly; followed by normal loading resources; and finally preloading, which will have a lower priority because preloading is more about loading resources in advance and the time requirements are not very tight.

You can control the load order by passing a priority using optional parameters to override the default settings.

### Set the number of concurrent

Limitations such as the maximum number of download concurrency can be set in the downloader, which you can do by `cc.assetManager.downloader.maxConcurrency` and `cc.assetManager.downloader.maxRequestsPerFrame`, for example.

```js
cc.assetManager.downloader.maxConcurrency = 10;

cc.assetManager.downloader.maxRequestsPerFrame = 6;
```
`maxConcurrency`, used to control the maximum number of concurrent connections, when the current number of connections is exceeded, will enter the waiting queue; `maxRequestsPerFrame`, used to control the number of requests that can be initiated per frame, so as to spread the CPU overhead of initiating requests evenly, avoiding too much jams in a single frame, if the number of connections initiated in this frame has reached the limit, will delay the initiation of requests until the next frame.

### Set by optional parameters

The options in the downloader are all global, but when you need to control a resource, the global settings can be cumbersome, you can specify the optional parameters in the interface with the optional parameters and the loading pipeline will pass them to the downloader, for example.

```js
    cc.resources.loadScene('test', { priority: 2, maxRetryCount: 1, maxConcurrency: 10 }, callback);
```
### Set by preset

In addition to the above, you can also set each preset via `cc.assetManager.presets`. Note that the restrictions can be different for each preset, so `presets` is a table and you need to pass the name of the preset to access the corresponding options, for example.

```js
    let preset = cc.assetManager.presets.default;
```

The engine has six built-in presets, as follows:

```js
{
    'default': {
        priority: 0,
    },

    'preload': {
        maxConcurrency: 2, 
        maxRequestsPerFrame: 2,
        priority: -1,
    },

    'scene': {
        maxConcurrency: 8, 
        maxRequestsPerFrame: 8,
        priority: 1,
    },

    'bundle': {
        maxConcurrency: 8, 
        maxRequestsPerFrame: 8,
        priority: 2,
    },

    'remote': {
        maxRetryCount: 4
    },

    'script': {
        priority: 2
    }
}
```

Six presets are used for different usage scenarios, namely normal loading, preloading, scene loading, Asset Bundle loading, remote resource loading, script loading. Preloading is more restrictive and has a smaller maximum number of concurrency because of performance concerns, and you can modify the built-in presets, or you can add presets and pass them in with the optional parameter `preset`.

```js
    // Modify built-in presets
    cc.assetManager.presets.default.maxConcurrency = 10;

    // Custom presets
    cc.assetManager.presets.mypreset = { maxConcurrency: 10, maxRequestsPerFrame: 6 };
    cc.resources.loadScene('test', { preset: 'mypreset' }, callback);
```

## Custom handlers

Both the downloader and the parser have a registration table. When you use `downloader` or `parser`, the downloader and parser will look for the corresponding download and parsing methods in the registry based on the incoming suffix name, and pass the parameters into the corresponding handler, so you can extend the engine by registering the custom handlers when you need to add a custom format to your project, or modify the handlers of the current format. Both the downloader and the parser provide `register` interfaces for registration handlers, which are used as follows.

```js
    cc.assetManager.downloader.register('.myformat', function (url, options, callback) {
        // Download the resource
    });

    cc.assetManager.parser.register('.myformat', function (file, options, callback) {
        // Parsing a downloaded file
    });
```

A custom handler needs to receive three parameters, the first is the processing object, which is the URL in the downloader and the file in the parser; the second is an optional parameter, which can be specified when you call the loading interface; and the third is the completion callback, which you need to call when you complete your handler and pass in an error message or result.

When the handler is registered, the corresponding handler is used when the downloader and the loader encounter a request with the same extension, and these custom handlers are available to all loading pipelines globally. For example.

```js
    cc.assetManager.loadAny({ url: 'http://example.com/myAsset.myformat' }, callback);
```

Note that the processing can receive incoming optional parameters, which you can use to implement your own extensions, see [optional parameters](options.md#Expansion%20Engine) for details.