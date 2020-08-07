# 下载与解析

> 文：Santy-Wang、Xunyi

Asset Manager 底层使用了多条加载管线来加载和解析资源，每条管线中都使用了 `downloader` 和 `parser` 两个模块，也就是下载器和解析器。开发者可以通过 `cc.assetManager.downloader` 和 `cc.assetManager.parser` 来访问。

## 下载器

下载器是一个全局单例，包括 **下载失败重试**、**下载优先级排序** 和 **下载并发数限制** 等功能。

### 失败重试

下载器如果下载资源失败，会自动重试下载，开发者可以通过 `maxRetryCount` 和 `retryInterval` 属性来设置重试下载的相关参数。

- `maxRetryCount` 属性用于设置重试下载的最大次数，默认 3 次。若不需要重试下载，可设置为 0，则下载失败时会立即返回错误。

  ```js
  cc.assetManager.downloader.maxRetryCount = 0;
  ```

- `retryInterval` 属性用于设置重试下载的间隔时间，默认 2000 ms。若设置为 4000 ms，则下载失败时会等待 4000 ms，然后再进行重试。

  ```js
  cc.assetManager.downloader.retryInterval = 4000;
  ```

### 下载优先级

Creator 开放了四个下载优先级，下载器将会按照优先级 **从大到小** 的顺序来下载资源。

| 资源 | 优先级 | 说明 |
| :-- | :---- | :--- |
| 脚本或 Asset Bundle  | 2  | 优先级最高 |
| 场景资源             | 1  | 包括场景中的所有资源，确保场景能够快速加载 |
| 开发者手动加载的资源   | 0  |  |
| 预加载资源           | -1 | 优先级最低，因为预加载更多是提前加载资源，时间要求相对较为宽松 |

开发者也可以通过可选参数 `priority` 传递一个优先级来覆盖默认设置，从而控制加载顺序。详情可参考下方的“通过可选参数设置”部分。

### 设置下载并发数

开发者可以通过 `maxConcurrency` 和 `maxRequestsPerFrame` 来设置下载器的最大下载并发数等限制。

- `maxConcurrency` 用于设置下载的最大并发连接数，若当前连接数超过限制，将会进入等待队列。

  ```js
  cc.assetManager.downloader.maxConcurrency = 10;
  ```

- `maxRequestsPerFrame` 用于设置每帧发起的最大请求数，从而均摊发起请求的 CPU 开销，避免单帧过于卡顿。如果此帧发起的连接数已经达到上限，将延迟到下一帧发起请求。

  ```js
  cc.assetManager.downloader.maxRequestsPerFrame = 6;
  ```

## 解析器

解析器用于将文件解析为引擎可识别的资源，开发者可以通过 `cc.assetManager.parser` 来访问。

## 通过可选参数设置

在下载器和解析器中的设置都是全局设置，若开发者需要单独设置某个资源，可以通过 **可选参数** 传入专有设置来覆盖全局设置，例如：

```js
cc.assetManager.loadAny({'path': 'test'}, {priority: 2, maxRetryCount: 1, maxConcurrency: 10}, callback);
```

具体内容可参考文档 [可选参数](options.md)。

## 预设

Creator 预先对正常加载、预加载、场景加载、Asset Bundle 加载、远程资源加载、脚本加载这 6 种加载情况的下载/解析参数做了预设，其中预加载因为性能考虑，所以限制较大，最大并发数更小。如下图所示：

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

开发者可以通过 `cc.assetManager.presets` 对每种预设进行修改，使用时需要传入预设的名称来访问对应的参数项。

```js
// 修改预加载的预设优先级为 1
let preset = cc.assetManager.presets.preload;
preset.priority = 1;
```

也可以增加自定义预设，并通过可选参数 `preset` 传入。

```js
// 自定义预设，并通过可选参数 preset 传入
cc.assetManager.presets.mypreset = {maxConcurrency: 10, maxRequestsPerFrame: 6};
cc.assetManager.loadAny({'path': 'test'}, {preset: 'mypreset'}, callback);
```

**注意**：

- 预设中的参数值和加载器/解析器中的是分开存放的，不会互相影响。只是前者的优先级较高，在使用时会优先使用预设中的参数值，预设中没有的话再使用加载器中设置的值。

- 通过可选参数传入（针对特定资源）的参数值优先级高于预设和加载器中的，也就是说参数使用的优先级为：可选参数 > 预设 > 下载器/解析器。

## 自定义处理方法

下载器和解析器都拥有一张注册表，在使用 `downloader` 或 `parser` 时，下载器和解析器会根据传入的后缀名称去注册表中查找对应的下载方式和解析方式，并将参数传入对应的处理方式之中。当开发者需要修改目前格式的处理方式，或者在项目中增加一个自定义格式时，可以通过注册自定义的处理方式来实现扩展引擎。下载器与解析器都提供了 `register` 接口用于注册处理方法，使用方式如下：

```js
cc.assetManager.downloader.register('.myformat', function (url, options, callback) {
    // 下载对应资源
    ......
});

cc.assetManager.parser.register('.myformat', function (file, options, callback) {
    // 解析下载完成的文件
    ......
});
```

自定义的处理方法需要接收三个参数：
- 第一个参数为处理对象，在下载器中是 url，在解析器中是文件。
- 第二个参数是可选参数，可选参数可以在调用加载接口时指定。
- 第三个参数是完成回调，当注册完成处理方法时，需要调用该函数，并传入错误信息或结果。

当注册了处理方法之后，在下载器/解析器遇到带相同扩展名的请求时，会使用对应的处理方式，这些自定义的处理方式将供全局所有加载管线使用。例如：

```js
cc.assetManager.loadAny({ url: 'http://example.com/myAsset.myformat' }, callback);
```

需要注意的是，处理方式可以接收传入的可选参数，开发者可以利用可选参数实现自己的扩展，具体内容可查看文档 [可选参数](options.md#扩展引擎)。
