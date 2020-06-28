# 下载器与解析器

> 文：Santy-Wang

Asset Manager 底层使用了多条加载管线来加载资源，每条管线中都使用了 `downloader` 与 `parser` 两个模块，你可以通过 `cc.assetManager.downloader` 与 `cc.assetManager.parser` 访问。

## 下载器

下载器是一个全局单例，`downloader` 存在 **失败重试**，**下载优先级排序**，**下载数限制** 等功能。

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

下载器下载资源时会根据下载优先级进行排序，优先级大的资源将会优先下载。Creator 中内置了四个优先级：

1. 所有预加载资源的优先级都是 -1。
2. 用户手动加载的资源优先级都是 0。
3. 加载场景时，所有场景中的资源的优先级都是 1。
4. 加载脚本或 Asset Bundle 时，优先级都是 2。

加载脚本和 Asset Bundle 的优先级是最高的；其次是场景，能够保证场景能够快速加载；其次是普通加载资源；最后是预加载，因为预加载更多是提前加载资源，时间要求不是非常紧迫，所以其优先级会较低。

你可以利用可选参数传递一个优先级来覆盖默认设置，从而控制加载顺序。

### 设置并发数

下载器中可以设置最大下载并发数等限制，你可以通过 `cc.assetManager.downloader.maxConcurrency` 和 `cc.assetManager.downloader.maxRequestsPerFrame` 进行设置，例如：

```js
cc.assetManager.downloader.maxConcurrency = 10;

cc.assetManager.downloader.maxRequestsPerFrame = 6;
```

`maxConcurrency` 用于控制最大并发连接数，当当前连接数超过时，将会进入等待队列；`maxRequestsPerFrame`，用于控制每帧能发起的请求数，从而均摊发起请求的 CPU 开销，避免单帧过于卡顿，如果此帧发起的连接数已经达到上限，将延迟到下一帧发起请求。

### 通过可选参数进行设置

下载器中的选项都是全局设置，但当你需要对某个资源进行控制时，全局设置的方式会较为麻烦，此时你可以利用可选参数传入对应设置来覆盖全局设置，例如：

```js
cc.resources.loadScene('test', { priority: 2, maxRetryCount: 1, maxConcurrency: 10 }, callback);
```

### 通过预设进行设置

除了上述的方式之外，你还可以通过 `cc.assetManager.presets` 对每种预设进行设置，需要注意的是，对每一种预设的限制可以不同，所以 `presets` 是一个表，你需要传入预设的名称来访问对应的选项，例如：

```js
let preset = cc.assetManager.presets.default;
```

引擎内置了六种预设，如下:

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

6种预设用于不同的使用场景，分别是正常加载，预加载，场景加载，Asset Bundle 加载，远程资源加载，脚本加载。预加载因为性能考虑，所以其限制更大，最大并发数更小，你可以修改内置预设，也可以增加预设，并通过可选参数 `preset` 传入。

```js
// 修改内置预设
cc.assetManager.presets.default.maxConcurrency = 10;

// 自定义预设
cc.assetManager.presets.mypreset = { maxConcurrency: 10, maxRequestsPerFrame: 6 };
cc.resources.loadScene('test', { preset: 'mypreset' }, callback);
```

## 自定义处理方法

下载器和解析器都拥有一张注册表，当你使用 `downloader` 或 `parser` 时，下载器和解析器会根据传入的后缀名称去注册表中查找对应的下载方式和解析方式，并将参数传入对应的处理方式之中。当你需要在项目中增加一个自定义格式，或者修改目前格式的处理方式时，你可以通过注册自定义的处理方式来实现扩展引擎。下载器与解析器都提供了 `register` 接口用于注册处理方法，使用方式如下：

```js
cc.assetManager.downloader.register('.myformat', function (url, options, callback) {
    // 下载对应资源
});

cc.assetManager.parser.register('.myformat', function (file, options, callback) {
    // 解析下载回来的文件
});
```

自定义的处理方法需要接收三个参数，第一个参数为处理对象，在下载器中是 url，在解析器中是文件；第二个参数是可选参数，可选参数可以在调用加载接口时指定；第三个参数是完成回调，当你完成你的处理方法时，你需要调用该函数，并将错误信息或结果传入。

当注册了处理方法之后，在下载器与加载器遇到带相同扩展名的请求时，会使用对应的处理方式，这些自定义的处理方式将供全局所有加载管线使用。例如：

```js
cc.assetManager.loadAny({ url: 'http://example.com/myAsset.myformat' }, callback);
```

需要注意的是，处理方式可以接收到传入的可选参数，你可以利用这些可选参数实现自己的扩展，详细内容可查看 [可选参数](options.md#扩展引擎)