# Skeletal Animation Assets (Spine)

Skeletal animation assets in Creator are exported from [Spine](http://esotericsoftware.com/), which currently supports the [JSON](http://esotericsoftware.com/spine-export/#JSON) and [binary](http://esotericsoftware.com/spine-export/#%E4%BA%8C%E8%BF%9B%E5%88%B6) data formats.

The supported Spine versions for each Creator version are as follows:

| Creator Version | Spine Version |
| :---------- | :-------- |
| v3.0 and above | v3.8 (v3.8.75 is not supported on the native platform) |
| v2.3 and above | v3.8 |
| v2.2 | v3.7 |
| v2.0.8 to v2.1 | v3.6 |
| v2.0.7 and below | v2.5 |

## Import Skeletal Animation Assets

The assets required for skeletal animation are:

- `.json/.skel` skeletal data
- `.png` atlas textures
- `.txt/.atlas` atlas data

  ![spine](spine/import.png)

## Create Skeletal Animation

Drag the skeletal animation asset from the **Assets** panel to the `SkeletonData` property of the spine component in the **Inspector** panel.

![spine](spine/set_skeleton.png)

## How to load Spine remotely from a server

### Load the Spine assets in json format

```ts
let comp = this.getComponent('sp.Skeleton') as sp.Skeleton;

let image = "http://localhost/download/spineres/1/1.png";
let ske = "http://localhost/download/spineres/1/1.json";
let atlas = "http://localhost/download/spineres/1/1.atlas";
assetManager.loadAny([{ url: atlas, ext: '.txt' }, { url: ske, ext: '.txt' }], (error, assets) => {
    assetManager.loadRemote(image, (error, texture: Texture2D) => {
        let asset = new sp.SkeletonData();
        asset.skeletonJson = assets[1];
        asset.atlasText = assets[0];
        asset.textures = [texture];
        asset.textureNames = ['1.png'];
        asset._uuid = ske; // Any string can be passed in, but it cannot be empty.
        skeleton.skeletonData = asset;
    });
});
```

### Load the Spine assets in binary format

```ts
let comp = this.getComponent('sp.Skeleton') as sp.Skeleton;

let image = "http://localhost/download/spineres/1/1.png";
let ske = "http://localhost/download/spineres/1/1.skel";
let atlas = "http://localhost/download/spineres/1/1.atlas";
assetManager.loadAny([{ url: atlas, ext: '.txt' }, { url: ske, ext: '.bin' }], (error, assets) => {
    assetManager.loadRemote(image, (error, texture: Texture2D) => {
        let asset = new sp.SkeletonData();
        asset._nativeAsset = assets[1];
        asset.atlasText = assets[0];
        asset.textures = [texture];
        asset.textureNames = ['1.png'];
        asset._uuid = ske; // Any string can be passed in, but it cannot be empty.
        asset._nativeURL = ske; // Pass in a binary path to be used as the 'filePath' parameter when using 'initSkeleton'.
        comp.skeletonData = asset;
        let ani = comp.setAnimation(0, 'walk', true);
    });
});
```
