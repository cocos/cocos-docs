# FAQ

### on the MAC platform after the installation of Creator, open the project, the window can not be displayed

Drag the CocosCreator.app from the DMG into the application, and then open it.

### How do I configure the directory structure generated after build and automatically modify the contents of the built file

Please refer to [Custom Project Build Process](../publish/custom-project-build-template.md).

### The object associated with the component cannot be found after the build, or the warning cannot find the type

The specified module may be excluded, please check the **Module Config** in the `Main menu -> project -> Project Settings`.

### Load resources from CDN

Modify `libraryPath` and `rawAssetsBase` parameter in `main.js` to any path.

### How to take a screenshot in the browser

Screenshot method: monitor `cc.Director.EVENT_AFTER_DRAW` event, calling `cc._canvas.toDataURL()` In the callback to get a screenshot of the Base64 format.

### When it touches a third-party Android-brought WebView, the engine has an error.

Locate the call `cc.view.enableAutoFullScreen` in `main.js` and change the incoming parameters to `false`.

### If frame animations are different in size for each frame, an offset occurs when the animation is played

Please refer to: [Sprite Animation with offset](../asset-workflow/trim.md#sprite-animation-with-offset).

### After picture enlarged, edge white edge/black edge problem

This is due to the color channel and background colors did the interpolation when bilinear filtering, the simpler way is to use the pre-multiply. Pre-multiplication requires that the blending mode of the Sprite component be set to `SRC: ONE, DST: ONE_MINUS_SRC_ALPHA`, and then process the original image.

There are two ways to deal with the original, one is to add a black background under the color channel when the picture is exported, and the transparent channel remains unchanged. The other way is to call `texture.update({premultiplyAlpha: true})` to texture in code, if the call fails, it may be an older version of Creator and the old version needs to use `texture.handleLoadedTexture(true)`.

### How to control Prefab with plugins

Create Prefab:

```js
Editor.Ipc.sendToPanel('scene', 'scene:create-prefab', node.uuid, 'db://assets/xxx/xxx.prefab');
```

Enter Prefab edit mode:

```js
Editor.Ipc.sendToAll('scene:enter-prefab-edit-mode', assetUuid);
```

Save Prefab:

```js
Editor.Ipc.sendToPanel('scene', 'scene:apply-prefab', node.uuid);
```

### 1.8.2 version may have a JSC crash problem

Please upgrade to the version after 1.8.2.

### WeChat open data prompted wx.request can not find when loading avatar

When you load a picture, the URL is missing such as .png suffix, `cc.loader.load` needs to be changed to incoming `{ url: url, type: "png" }`.

### How to load dragonbones remotely from a server

```js
let animNode = new cc.Node();
animNode.parent = cc.find('Canvas');
let dragonDisplay = animNode.addComponent(dragonBones.ArmatureDisplay);

let image = 'http://localhost:7456/res/raw-assets/eee_tex-1529064342.png';
let ske = 'http://localhost:7456/res/raw-assets/eee_ske-1529065642.json';
let atlas = 'http://localhost:7456/res/raw-assets/eee_tex-1529065642.json';
cc.loader.load(image, () => {
    cc.loader.load({ url: atlas, type: 'txt' }, (error, atlasJson) => {
        cc.loader.load({ url: ske, type: 'txt' }, (error, dragonBonesJson) => {
            let atlas = new dragonBones.DragonBonesAtlasAsset();
            atlas.atlasJson = atlasJson;
            atlas.texture = image;

            let asset = new dragonBones.DragonBonesAsset();
            asset.dragonBonesJson = dragonBonesJson;

            dragonDisplay.dragonAtlasAsset = atlas;
            dragonDisplay.dragonAsset = asset;

            dragonDisplay.armatureName = 'eee';
            dragonDisplay.playAnimation('eee', -1);
        });
    });
});
```

### How to customize or directly disable the uglify process that comes with the editor

After the engine is customized, open the `engine/gulp/util/utils.js` script, at the bottom there is a `uglify` function. You can modify its parameters according to the requirements. If you want to completely skip the `uglify` operation, you can replace the contents of the `uglify` section directly with:

```js
const Es = require('event-stream');
return Es.through();
```