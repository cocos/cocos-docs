# 加载与预加载

> 文：Santy-Wang，Xunyi

为了尽可能缩短下载时间，很多游戏都会使用预加载。Asset Manager 中的大部分加载接口包括 `load`、`loadDir`、`loadScene` 都有其对应的预加载版本。加载接口与预加载接口所用的参数是完全一样的，两者的区别在于：

1. 预加载只会下载资源，不会对资源进行解析和初始化操作。
2. 预加载在加载过程中会受到更多限制，例如最大下载并发数会更小。
3. 预加载的下载优先级更低，当多个资源在等待下载时，预加载的资源会放在最后下载。
4. 因为预加载没有做任何解析操作，所以当所有的预加载完成时，不会返回任何可用资源。

相比 Creator v2.4 以前的版本，以上优化手段充分降低了预加载的性能损耗，确保了游戏体验顺畅。开发者可以充分利用游戏过程中的网络带宽缩短后续资源的加载时间。

因为预加载没有去解析资源，所以需要在预加载完成后配合加载接口进行资源的解析和初始化，来完成资源加载。例如：

```js
cc.resources.preload('images/background', cc.SpriteFrame);

// wait for while 
cc.resources.load('images/background', cc.SpriteFrame, function (err, spriteFrame) {
    spriteFrame.addRef();
    self.getComponent(cc.Sprite).spriteFrame = spriteFrame;
});
```

**注意**：加载不需要等到预加载完成后再调用，开发者可以在任何时候进行加载。正常加载接口会直接复用预加载过程中已经下载好的内容，缩短加载时间。
