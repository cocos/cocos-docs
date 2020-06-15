# v2.4 Subpackage Upgrade Guide

> Author：Santy-Wang

> This article describes the considerations for upgrading older versions of resource subpackage to v2.4. If you are not a user of an older version of Creator or do not use the subpackage feature in your project, you do not need to read this article.

The [subpackage](https://github.com/cocos-creator/creator-docs/blob/e02ac31bab12d3ee767c0549050b0e42bd22bc5b/en/scripting/subpackage.md) documentation before v2.4 mentioned subpackage loading, but at that time it only supported mini game platforms with subpackage loading, such as WeChat, OPPO, etc. Creator has made a layer of encapsulation on the corresponding subpackage function of the platform, but with the development of Creator, the demand for subpackage is increasing, and the original resource subpackage function is not enough, so in v2.4, Creator officially supports the more complete Asset Bundle function. Note that if you check the **subpackage** option in your project, it will automatically change to Asset Bundle after upgrading to v2.4.

For **Artist And Game Designer**, all resources in the project, such as scenes, animations, prefabs, do not need to be modified or upgraded. <br>
For **Programmer**, the impact is mainly in the need to modify the `cc.loader.downloader.loadSubpackage` API that was originally used in the code to be the corresponding interface in Asset Manager.

## Situations that require upgrading manually

You used the `cc.loader.downloader.loadSubpackage` API in your own code to load the subpackage.

## Upgrade steps

- **Back up older versions of the project**
- Using the new version of Cocos Creator in CocosDashboard to open the original project, Creator will re-import the affected resources, it will take a little more time for the first upgrade, and the main editor window will open after the import. Open the code editor and change all `cc.loader.downloader.loadSubpackage` to use `cc.assetManager.loadBundle`.

```js
// before
cc.loader.downloader.loadSubpackage('sub1', (err) => {
    cc.loader.loadRes('sub1/sprite-frames/background', cc.SpriteFrame);
});

// after
cc.assetManager.loadBundle('sub1', (err, bundle) => {
    // The relative path to the Asset Bundle root
    bundle.load('sprite-frames/background', cc.SpriteFrame);
});
```

**Note**
1. loading resources in Asset Bundle requires the use of the Asset Bundle's associated API. see [Asset Bundle](../../../api/en/classes/Bundle.html) documentation for the associated API.

## How do I load with the new version of the subpack?

For details on how to use Asset Bundle, see [Asset Bundle](../scripting/asset-bundle.md) documentation.


