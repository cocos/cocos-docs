# Loading and Preloading

> Author: Santy-Wang, Xunyi

In order to minimize download times, most of the loading interfaces in Asset Manager, including `load`, `loadDir`, and `loadScene` have their own corresponding preloaded versions. The parameters used for the loading interfaces and the preloading interfaces are exactly the same, with the following differences:

1. Preloading will only download the resources and will not parse or initialize them.
2. Preloading will be more limited during the loading process, e.g.: the maximum number of download concurrently will be smaller.
3. Preloading has a lower priority, and when multiple resources are waiting to be downloaded, the preloaded resources will be downloaded last.
4. Since the preload does not do any parsing, no available resources are returned when all the preloads load are complete.

Compared to previous versions of Creator v2.4, these optimizations reduce the preloading performance loss and ensure a smooth gaming experience. You can make full use of the network bandwidth during the game to reduce the loading time of subsequent resources.

Since the preload does not parse the resources, you need to parse and initialize the resources with the loading interface to complete the resource loading after the preload is complete. For example:

```typescript
resources.preload('images/background/spriteFrame', SpriteFrame);

// Wait for while 
resources.load('images/background/spriteFrame', SpriteFrame, function (err, spriteFrame) {
    spriteFrame.addRef();
    self.getComponent(Sprite).spriteFrame = spriteFrame;
});
```

> **Note**: loading does not need to wait until the preload is complete, you can load at any time. The normal loading interface will directly reuse the content that was already downloaded during the preload process, reducing the load time
