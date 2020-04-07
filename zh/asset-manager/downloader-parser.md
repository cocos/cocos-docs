# 下载器与解析器

> 文：Santy-Wang

Asset Manager 底层使用了多条加载管线来加载资源，每条管线中都使用了 `downloader` 与 `parser` 两个模块，你可以通过 `cc.assetManager.downloader` 与 `cc.assetManager.parser` 访问。Creator v2.4 中的下载器与解析器是独立于加载管线之外的公共模块。其不属于任何一个加载管线。你甚至可以在自己代码中使用下载器与解析器。例如：

```js
    cc.assetManager.downloader.download('myasset', 'http://example.com/background.jpg', '.jpg', {}, function (err, file) {
        cc.assetManager.parser.parse('myasset', file, '.jpg', {}, function (err, image) {
            var texture = new cc.Texture2D();
            texture.initWithElement(image);
        });
    });
```

下载器与解析器的作用是为加载管线提供下载资源和解析资源的功能。下载器与解析器中包括了许多种类资源的处理方式，处理方式的选用根据传入的资源后缀名，例如 `.jpg`，`.mp3` 来进行判断，例如：

```js
    cc.assetManager.downloader.download('test', 'http://example.com/music.mp3', '.mp3', {}, callback);
    cc.assetManager.parser.parse('test', file, '.mp3', {}, callback);
```

## 下载器

下载器是一个全局单例，`downloader.download` 存在 **失败重试**， **下载优先级排序**， **下载数限制**  等功能。

### 失败重试

下载器中下载资源失败时，将会自动进行重试，你可以通过两个属性来控制失败重试机制：

1. 你可以设置 `maxRetryCount` 属性来控制当下载资源失败时，将最多重试多少次后返回错误，默认重试 3 次，如果你不需要进行重试，则可设置为 0，则失败时立即返回，例如：

```js
    cc.assetManager.downloader.maxRetryCount = 0;
```

2. 你可以设置 `retryInterval` 属性来控制重试间隔，默认为 2000 ms，也就是当下载失败时将等待 2000 ms 再进行重试。例如： 

```js
    cc.assetManager.downloader.retryInterval = 4000;
```

### 下载优先级

下载器下载资源时会根据下载优先级进行排序，优先级大的资源将会优先下载。 Creator 中内置了三个优先级：

1. 所有预加载资源的优先级都是 -1 。
2. 除加载场景外的所有正常加载资源的优先级都是 0 。
3. 加载场景时，所有场景中的资源的优先级都是 1 。

也就是说，加载场景的优先级是最高的，能够保证场景能够最快加载；其次是正常加载资源；最后是预加载，因为预加载更多是提前加载资源，时间要求不是非常紧迫，所以其优先级会较低。

你可以利用可选参数传递一个优先级来覆盖默认设置，从而控制加载顺序。

### 设置并发数

下载器中可以设置最大下载并发数等限制，你可以通过 `cc.assetManager.downloader.maxConcurrent` 和 `cc.assetManager.downloader.maxRequestsPerFrame` 进行设置，例如：

```js
cc.assetManager.downloader.maxConcurrent = 10;

cc.assetManager.downloader.maxRequestsPerFrame = 6;
```
`maxConcurrent`，用于控制最大并发连接数，当当前连接数超过时，将会进入等待队列；`maxRequestsPerFrame`，用于控制每帧能发起的连接数，从而将发起请求的消耗均摊在多个帧时间中，避免单帧过多消耗，如果此帧发起的连接数已经达到上限，将延迟到下一帧发起请求。

除此之外，你也可以通过 `cc.assetManager.downloader.limitations` 对每种策略进行设置，需要注意的是，对每一种加载策略的限制可以不同，所以 `limitations` 是一个数组，你需要传入加载策略的索引来访问对应的限制，例如：

```js
    var limit = cc.assetManager.downloader.limitations[cc.AssetManager.LoadStrategy.NORMAL];
```

引擎内置了两种加载策略，一种是正常加载，一种是预加载，预加载因为性能考虑，所以其限制更大，最大并发数更小，你可以自己增加加载策略，并通过可选参数传入。

每一个策略都包含了 `maxConcurrent` 和 `maxRequestsPerFrame` 你可以如下设置：

```js
    cc.assetManager.downloader.limitations[cc.AssetManager.LoadStrategy.NORMAL].maxConcurrent = 10;

    cc.assetManager.downloader.limitations[cc.AssetManager.LoadStrategy.NORMAL] = { maxConcurrent: 10, maxRequestsPerFrame: 6 };
```

### 通过可选参数进行设置

下载器中的选项都是全局设置，但当你需要对某个资源进行控制时，全局设置的方式会较为麻烦，此时你可以利用可选参数传入对应设置来覆盖全局设置，例如：

```js
    // 控制失败之后最多重试次数
    cc.assetManager.downloader.download('test', 'http://example.com/music.mp3', '.mp3', { maxRetryCount: 10 }, callback);

    // 控制下载优先级，默认值为 0
    cc.assetManager.downloader.download('test', 'http://example.com/music.mp3', '.mp3', { priority: 2 }, callback);

    // 通过加载策略控制下载的限制数，你可以自定义一个加载策略
    cc.assetManager.downloader.download('test', 'http://example.com/music.mp3', '.mp3', { loadStrategy: cc.AssetManager.LoadStrategy.PRELOAD }, callback);
```

同时，你也可以在使用 `cc.assetManager.load`，`cc.assetManager.preload` 等拥有可选参数的接口中指定这些可选参数，加载管线会将这些参数传递到下载器中，例如：

```js
    cc.assetManager.load({ 'path': 'image/background' }, { priority: 2, maxRetryCount: 1, loadStrategy: cc.AssetManager.LoadStrategy.PRELOAD }, callback);
```

## 自定义处理方法

下载器和解析器都拥有一张注册表，当你使用 `downloader.download` 或 `parser.parse` 时，下载器和解析器会根据传入的后缀名称去注册表中查找对应的下载方式和解析方式，并将参数传入对应的处理方式之中，当你需要在项目中增加一个自定义格式，或者修改目前格式的处理方式时，你可以通过注册自定义的处理方式来实现扩展引擎。下载器与解析器都提供了 `register` 接口用于注册处理方法，使用方式如下：

```js
    cc.assetManager.downloader.register('.myformat', function (url, options, callback) {
        // 下载对应资源
    });

    cc.assetManager.parser.register('.myformat', function (file, options, callback) {
        // 解析下载回来的文件
    });
```

你需要设定一个扩展名，并绑定一个自定义的处理方法。

自定义的处理方法需要定义三个参数，第一个参数为主要内容，在下载器中是 url，在解析器中是文件；第二个参数是可选参数，可选参数可以在使用加载接口时指定；第三个参数是完成回调，当你完成你的处理方法时，你需要调用该函数，并将错误信息或结果传入。

当注册了处理方式之后，在下载器与加载器遇到对应扩展名类型的请求时，会使用对应的处理方式，这些自定义的处理方式也供加载管线使用。例如：

```js
    cc.assetManager.load({ url: 'http://example.com/myAsset.myformat' }, callback);
```

需要注意的是，处理方式可以接收到传入的可选参数，你可以利用这些可选参数实现自己的扩展，例如：

```js
    cc.assetManager.downloader.register('.myformat', function (url, options, callback) {
        // 下载对应资源
        var img = new Image();
        if (options.isCrossOrigin) {
            img.isCrossOrigin = 'anonymous';
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

    cc.assetManager.load({ url: 'http://example.com/myAsset.myformat' }, { isCrossOrigin: true }, callback);
```

更多关于可选参数的介绍请参考 [可选参数](custom-parameter.md)。

---

继续前往 [加载与预加载](preload-load.md) 说明文档。