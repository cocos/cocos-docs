# Subpackage upgrade guide

> Author: Santy-Wang, Xunyi
> This article details the considerations for upgrading mini game sub-package to the Asset Bundle.

Prior to v2.4, [Subpackage Loading](https://github.com/cocos-creator/creator-docs/blob/e02ac31bab12d3ee767c0549050b0e42bd22bc5b/en/scripting/subpackage.md) was only supported various mini game platforms, such as WeChat Mini Games, OPPO Mini Games, etc.. However, with the continuous development of Creator, developers' demands for subpackage have been increasing, such as multi-platform support, and the original subpackage loading is no longer enough. Therefore, starting from v2.4, Creator officially supports the more complete **Asset Bundle**.

- For the **Artist and Game Designer**, all resources in your project (e.g.: scenes, animations, prefab) do not need to be modified or upgraded.
- For **Programmers**, the `loader.downloader.loadSubpackage` needs to be changed to the `assetManager.loadBundle` from **Asset Manager**. The related content will be described in detail in this document.

> **Note**: if you used Subpackage Loading in your old project, that is, if you checked the **Subpackage** option in the **Properties** panel, then when the project is upgraded to the v3.0, it will automatically convert to an normal folder. You can configure the Asset Bundle as following reference.

[Configura Asset Bundle](bundle.md)

## Situations that require upgrading manually

Use the `loader.downloader.loadSubpackage` API to load the subpackage.

## Upgrade steps

- **Back up your old projects**
- Use Cocos Creator **v3.0** in the **Dashboard** to open an old project that needs to upgrade the subpackage, Creator will reimport the affected resources. The first import will take a little longer, and the main editor window will open after the import is complete. And then open the code editor to replace all `loader.downloader.loadSubpackage` with `assetManager.loadBundle`.

  ```typescript
  // before
  loader.downloader.loadSubpackage('sub1', (err) => {
    loader.loadRes('sub1/sprite-frames/background', SpriteFrame);
  });

  // after
  assetManager.loadBundle('sub1', (err, bundle) => {
    // The relative path to the Asset Bundle root
    bundle.load('sprite-frames/background/spriteFrame', SpriteFrame);
  });
  ```

## How to use the Asset Bundle

For details on how to use the **Asset Bundle**, please refer to the [Asset Bundle](bundle.md) documentation.

For APIs related to the **Asset Bundle**, please refer to the [Asset Bundle API](__APIDOC__/en/class/AssetManager.Bundle) documentation.
