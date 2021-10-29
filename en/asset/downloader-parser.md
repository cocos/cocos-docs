# Download and Parse

> Author: Santy-Wang, Xunyi

The underlying of the Asset Manager uses multiple loading pipelines to load and parse resources, each of which uses the `downloader` and `parser` modules, that is, the downloader and the parser. You can access them via `assetManager.downloader` and `assetManager.parser`.

## Downloader

The downloader is a global single instance with features such as download retry, download priority, and download concurrency limits.

### Download retry

If the downloader fails to download a resource, it will automatically retry the download, and you can set the parameters for the download retry via `maxRetryCount` and `retryInterval`.

- `maxRetryCount` is used to set the maximum number of retry downloads, the default is 3. If you do not need to retry the download, set to 0 and an error will be returned immediately if the download fails.

  ```typescript
  assetManager.downloader.maxRetryCount = 0;
  ```

- `retryInterval` is used to set the interval of retry downloads, the default is 2000 ms. If it is set to 4000 ms, it will wait for 4000 ms before re-downloading if the download fails.

  ```typescript
  assetManager.downloader.retryInterval = 4000;
  ```

### Download priority

Creator opens up four download priorities, and the downloader will download resources in **descending order** of priority.

| Resource | Priority | Explanation |
| :-- | :---- | :--- |
| **Script or Asset Bundle** | 2  | Highest priority first |
| **Scene resource**         | 1  | Include all resources in the scene, ensuring that the scene loads quickly |
| **Manually loaded resource**   | 0  |  |
| **Preload resource**           | -1 | The lowest priority, because preloading is more like loading resources in advance, and time requirements are relatively lenient |

You can also control the load order by passing a priority over the default setting with the optional parameter `priority`. For details, refer to the "Set by optional parameters" section below. 

### Set the number of concurrent downloads

You can set limits such as the maximum number of concurrent downloads in the downloader via `maxConcurrency` and `maxRequestsPerFrame`.

- `maxConcurrency` is used to set the maximum number of concurrent connections for the download, if the current number of connections exceeds the limit, a waiting queue will be entered.

  ```typescript
  assetManager.downloader.maxConcurrency = 10;
  ```

- `maxRequestsPerFrame` is used to set the maximum number of requests that can be initiated per frame, which spreads the CPU overhead of initiating requests, avoiding too much jams in a single frame. If the maximum number of connections initiated in this frame has been reached, the request will be delayed until the next frame.

  ```typescript
  assetManager.downloader.maxRequestsPerFrame = 6;
  ```

In addition, `downloader` uses an instance of the `jsb.Downloader` class to download resources from the server on **native platforms**. `jsb.Downloader` is similar to the Web's [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest). Currently the `jsb.Downloader` class instances have a default download concurrency limit of **32** and a default timeout of **30s**, if you want to change the default values, you can do so in `main.js`.

```typescript
// main.js
assetManager.init({ 
    bundleVers: settings.bundleVers,
    remoteBundles: settings.remoteBundles,
    server: settings.server,
    jsbDownloaderMaxTasks: 32, // Max concurrency
    jsbDownloaderTimeout: 60 // Timeout
});
```

## Parser

The parser is used to parse the files into the resources that can be recognized by the engine, and you can access them via `assetManager.parser`.

## Set by optional parameters

The settings in both the downloader and the parser are global, if you need to set up a resource individually, you can override the global settings by passing in the proprietary settings via the optional parameters. For example:

```typescript
assetManager.loadAny({'path': 'test'}, {priority: 2, maxRetryCount: 1, maxConcurrency: 10}, callback);
```

For details, refer to the [Optional Parameters](options.md) documentation.

## Preset

Creator presets the download/parsing parameters for the six load cases: normal loading, preloading, scene loading, Asset Bundle loading, remote resource loading, and script loading, and preloading is more restrictive because of performance considerations, and the maximum number of concurrency is smaller. As shown below:

```typescript
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

In addition to the above, you can also set each preset via `assetManager.presets`. Note that the restrictions can be different for each preset, so `presets` is a table and you need to pass the name of the preset to access the corresponding parameter options, for example:

```typescript
// Modify the preset priority of the preload to 1.
let preset = assetManager.presets.preload;
preset.priority = 1;
```

You can also add custom presets and pass them in with the optional parameter `preset`.

```typescript
// Customize the preset and pass it in with the optional parameter preset.
assetManager.presets.mypreset = {maxConcurrency: 10, maxRequestsPerFrame: 6};
assetManager.loadAny({'path': 'test'}, {preset: 'mypreset'}, callback);
```

> **Note**: parameters related to the download and parsing process (e.g.: number of download concurrent, number of download retries, etc.) can be set via optional parameters, presets, and the downloader/parser itself. When the same parameter is set in multiple ways, the engine selects to use it in the order of selectable **optional parameter > preset > downloader/parser**. That is, if the engine can't find the relevant settings in the optional parameter, it will look in the preset, and if it can't find them in the preset, it will look in the downloader/parser.

## Custom handlers

Both the downloader and the parser have a registration table. When you use `downloader` or `parser`, the downloader and parser will look for the corresponding download and parsing methods in the registry based on the incoming suffix name, and pass the parameters into the corresponding handler, in order to extend the engine by registering the custom handlers when you need to add a custom format to your project, or modify the handlers of the current format. Both the downloader and the parser provide `register` interfaces for registration handlers, which are used as follows:

```typescript
assetManager.downloader.register('.myformat', function (url, options, callback) {
    // Download the resource
    ......
});

assetManager.parser.register('.myformat', function (file, options, callback) {
    // Parsing a downloaded file
    ......
});
```

A custom handler needs to receive three arguments:

- The first argument is the handler object, which is the URL in the downloader and the file in the parser.
- The second argument is optional, and optional parameters can be specified when you call the load interface.
- The third argument is to complete the callback, which needs to be called when you register the handler and pass in an error message or result.

After registered the handler, the corresponding handler will be used if the downloader/parser encounters a request with the same extension, and these custom handlers will be available to all loading pipelines globally. For example:

```typescript
assetManager.loadAny({'url': 'http://example.com/myAsset.myformat'}, callback);
```

> **Note**: the handler can receive incoming optional parameters, which can be used to implement custom extensions, see the [Optional Parameters](options.md#expand-engine) documentation for details.
