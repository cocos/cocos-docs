# Loading And Preloading

> Author：Santy-Wang

Most of the loading interfaces in Asset Manager, including `load`, `loadDir`, and `loadScene`, have their corresponding preloaded versions in order to minimize download time. The parameters used for the loading interface and the preloaded interface are exactly the same, with the difference that.

1. The preload only does the downloading of the resource, not the parsing and initialization of the resource.
2. Preloading is more limited in the process, for example, the maximum number of downloads and concurrency will be smaller.
3. Preloading has a lower priority, and while multiple resources are waiting to be downloaded, the preloaded resources will be placed last.
4. Since no parsing is done on the preload, no resources are returned when all preloads are completed.

Compared to previous versions of Creator v2.4, these optimizations reduce the preload performance loss and ensure that the game itself is a smooth experience. Developers can leverage network bandwidth during play to reduce load times for subsequent resources.

Since the preload does not parse the resource, the resource needs to be parsed and initialized with the loading interface to complete the resource loading after the preload. For example.

```js
    cc.resources.preload('images/background', cc.SpriteFrame);

    // wait for while 
    cc.resources.load('images/background', cc.SpriteFrame, function (err, spriteFrame) {
        spriteFrame.addRef();
        self.getComponent(cc.Sprite).spriteFrame = spriteFrame;
    });
```

**Note**: Loading does not have to wait for the preload to complete, you can load at any time, the normal loading interface will directly reuse the content already downloaded in the preload process, reducing the loading time.