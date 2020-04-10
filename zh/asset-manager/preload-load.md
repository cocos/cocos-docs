# 加载与预加载

> 文：Santy-Wang

为了降低下载延时，Asset Manager 中支持两种加载方式，大部分加载接口包括 `load`，`loadDir`，`loadScene` 都有其对应的预加载版本。加载接口与预加载接口所用的参数是完全一样的，两者的区别在于：

1. 预加载只做了资源的下载，没有对资源进行解析与初始化操作。
2. 预加载在过程中受到更多限制，例如最大下载并发数会更小。
3. 预加载的优先级更低，当多个资源在等待下载时，预加载的资源将会放在最后下载。
4. 因为预加载没有做任何解析操作，所有预加载完成时无法返回任何可用资源。

因为这几点区别，所以预加载所带来的性能损耗更低，可以在游戏运行过程中使用预加载提前去下载资源。

因为预加载没有去解析资源，所以需要在预加载完成后配合加载接口进行资源的解析和初始化操作完成资源加载。例如：

```js
    var task = cc.resources.preload('images/background', cc.SpriteFrame, function (err) {
        cc.resources.load(task, function (err, spriteFrame) {
            self.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
    });

    var task = cc.assetManager.preloadAny({ url: 'http://example.com/background.jpg' }, function (err) {
        cc.assetManager.loadAny(task, function (err, image) {
            var texture = new cc.Texture2D();
            texture.initWithElement(image);
        });
    });
```

需要注意的是，加载任务必须等待预加载完成后才能传入到加载接口中完成加载。例如你不能如此使用：

```js
    var task = cc.resources.preload('images/background', cc.Texture2D);
    setTimeOut(() => {
        // 此时预加载任务未完成，无法使用 task
        cc.resources.load(task, function (err, texture) {

        });

    }, 10);
    
```

如果你迫切需要加载该资源，你依然可以使用正常加载接口加载该资源，例如：

```js
    cc.resources.preload('images/background', cc.Texture2D);
    setTimeOut(() => {
        cc.resources.load('images/background', cc.Texture2D, function (err, texture) {

        });
    }, 10);
    
```

此时，即使没有完成预加载，正常加载接口也能正常加载资源，正常加载接口会尽量复用预加载过程已经完成的缓存内容。

## 预加载管线

Asset Manager 中使用了两条管线来完成预加载工作，当你使用预加载接口时，任务会在下载管线中运行，所以只会进行下载操作。而在使用加载接口继续加载该任务时，任务会被传入到初始化管线中，初始化管线会将已下载的资源进行初始化操作，最后返回对应资源。

更多关于管线与任务的内容请参考 [管线与任务](pipeline-task.md) 。

---

继续前往 [下载器与解析器](downloader-parser.md) 说明文档。