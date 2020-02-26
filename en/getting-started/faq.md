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

For details, please refer to **07_capture_texture** in the [example-cases](https://github.com/cocos-creator/example-cases/tree/master/assets/cases/07_capture_texture), which shows how to take a screenshot and save on three different platforms.

### When it touches a third-party Android-brought WebView, the engine has an error.

Locate the call `cc.view.enableAutoFullScreen` in `main.js` and change the incoming parameters to `false`.

### If frame animations are different in size for each frame, an offset occurs when the animation is played

Please refer to: [Sprite Animation with offset](../asset-workflow/trim.md#sprite-animation-with-offset).

### After picture enlarged, edge white edge/black edge problem

This is due to the color channel and background colors did the interpolation when bilinear filtering, the simpler way is to use the pre-multiply. Pre-multiplication requires that the blending mode of the Sprite component be set to `SRC: ONE, DST: ONE_MINUS_SRC_ALPHA`, and then process the original image.

There are two ways to deal with the original, one is to add a black background under the color channel when the picture is exported, and the transparent channel remains unchanged. The other way is to call `texture.update({premultiplyAlpha: true})` to texture in code, if the call fails, it may be an older version of Creator and the old version needs to use `texture.handleLoadedTexture(true)`.

### How to control Prefab with plugins

**Create Prefab**:

```js
Editor.Ipc.sendToPanel('scene', 'scene:create-prefab', node.uuid, 'db://assets/xxx/xxx.prefab');
```

**Enter Prefab edit mode**:

```js
Editor.Ipc.sendToAll('scene:enter-prefab-edit-mode', assetUuid);
```

**Save Prefab**:

```js
Editor.Ipc.sendToPanel('scene', 'scene:apply-prefab', node.uuid);
```

### 1.8.2 version may have a JSC crash problem

Please upgrade to the version after 1.8.2.

### WeChat open data prompted wx.request can not find when loading avatar

When you load a picture, the URL is missing such as .png suffix, `cc.loader.load` needs to be changed to incoming `{ url: url, type: "png" }`.

For details, please refer to the **dragonBones/DragonMesh** in the [example-cases](https://github.com/cocos-creator/example-cases/tree/master/assets/cases/dragonbones).

### How to load DragonBones remotely from a server

#### Load the DragonBones resources in json format

```js
var animNode = new cc.Node();
animNode.parent = cc.find('Canvas');
var dragonDisplay = animNode.addComponent(dragonBones.ArmatureDisplay);

var image = 'http://localhost:7456/res/raw-assets/eee_tex-1529064342.png';
var ske = 'http://localhost:7456/res/raw-assets/eee_ske-1529065642.json';
var atlas = 'http://localhost:7456/res/raw-assets/eee_tex-1529065642.json';
cc.loader.load(image, (error, texture) => {
    cc.loader.load({ url: atlas, type: 'txt' }, (error, atlasJson) => {
        cc.loader.load({ url: ske, type: 'txt' }, (error, dragonBonesJson) => {
            var atlas = new dragonBones.DragonBonesAtlasAsset();
            atlas.atlasJson = atlasJson;
            atlas.texture = texture;

            var asset = new dragonBones.DragonBonesAsset();
            asset.dragonBonesJson = dragonBonesJson;

            dragonDisplay.dragonAtlasAsset = atlas;
            dragonDisplay.dragonAsset = asset;

            dragonDisplay.armatureName = 'box_anim';
            dragonDisplay.playAnimation('box_anim', 0);
        });
    });
});
```

#### Load the DragonBones resources in binary format

```js
var animNode = new cc.Node();
animNode.parent = cc.find('Canvas');
var dragonDisplay = animNode.addComponent(dragonBones.ArmatureDisplay);

var image = 'http://localhost:7456/res/raw-assets/eee_tex-1529064342.png';
var ske = 'http://localhost:7456/res/raw-assets/eee_ske-1529065642.dbbin';
var atlas = 'http://localhost:7456/res/raw-assets/eee_tex-1529065642.json';
cc.loader.load(image, (error, texture) => {
    cc.loader.load({ url: atlas, type: 'txt' }, (error, atlasJson) => {
        cc.loader.load({ url: ske, type: 'bin' }, (error, dragonBonesBin) => {
            var atlas = new dragonBones.DragonBonesAtlasAsset();
            atlas.atlasJson = atlasJson;
            atlas.texture = texture;

            var asset = new dragonBones.DragonBonesAsset();
            asset._nativeAsset = dragonBonesBin;

            dragonDisplay.dragonAtlasAsset = atlas;
            dragonDisplay.dragonAsset = asset;

            dragonDisplay.armatureName = 'box_anim';
            dragonDisplay.playAnimation('box_anim', 0);
        });
    });
});
```

### How to load spine remotely from a server

#### Load the Spine resources in json format

```js
var spineNode = new cc.Node();
var skeleton = spineNode.addComponent(sp.Skeleton);
this.node.addChild(spineNode);

var image = "http://localhost/download/spineres/1/1.png";
var ske = "http://localhost/download/spineres/1/1.json";
var atlas = "http://localhost/download/spineres/1/1.atlas";
cc.loader.load(image, (error, texture) => {
    cc.loader.load({ url: atlas, type: 'txt' }, (error, atlasJson) => {
        cc.loader.load({ url: ske, type: 'txt' }, (error, spineJson) => {
            var asset = new sp.SkeletonData();
            asset.skeletonJson = spineJson;
            asset.atlasText = atlasJson;
            asset.textures = [texture];
            asset.textureNames = ['1.png'];
            skeleton.skeletonData = asset;
        });
    });
});
```

#### Load the Spine resources in binary format

```js
var spineNode = new cc.Node();
var skeleton = spineNode.addComponent(sp.Skeleton);
this.node.addChild(spineNode);

var image = "http://localhost/download/spineres/1/1.png";
var ske = "http://localhost/download/spineres/1/1.skel";
var atlas = "http://localhost/download/spineres/1/1.atlas";
cc.loader.load(image, (error, texture) => {
    cc.loader.load({ url: atlas, type: 'txt' }, (error, atlasJson) => {
        cc.loader.load({ url: ske, type: 'bin' }, (error, spineBin) => {
            var asset = new sp.SkeletonData();
            asset._nativeAsset = spineBin;
            asset.atlasText = atlasJson;
            asset.textures = [texture];
            asset.textureNames = ['1.png'];
            skeleton.skeletonData = asset;
        });
    });
});
```

### How to load Atlas remotely from a server?

Please refer to this example: <https://github.com/cocos-creator/load-remote-plist>.

### How to customize or directly disable the uglify process that comes with the editor

After the engine is customized, open the `engine/gulp/util/utils.js` script, at the bottom there is a `uglify` function. You can modify its parameters according to the requirements. If you want to completely skip the `uglify` operation, you can replace the contents of the `uglify` section directly with:

```js
const Es = require('event-stream');
return Es.through();
```

### How to create an AssetDB resource in a plugin

In the main process, use `Editor.assetdb.create(url, data, callback)`. The first argument is `db://assets/xxx.png`, and the second argument is the buffer read by the .png file.

### How to refresh resources in AssetDB in the plugin

`Editor.assetdb.refresh()` provides a way to manually refresh the asset database.

### Creator package APK submitted to Google Play failed, prompt API level minimum 26

The Google Play statement began in August 2018, newly submitted app must be compiled with API level 26 and above. When Android builds, the three version numbers are set as follows:

- `compileSdkVersion` Compile version: The version of the SDK used to compile the Java code, regardless of the minimum supported version. Can be set to 26/27/28.
- `minSdkVersion` The minimum version supported: Decide to compile the minimum supported Android version of the app. Recommended set to 16 (Correspondence Android 4.0)
- `targetSdkVersion` Related to the behavior of the runtime. The recommended setting is consistent with `compileSdkVersion`, or it can be set to 22 to avoid [Request App Permissions](https://developer.android.com/training/permissions/requesting).

  ![](introduction/compile_version.png)

### The speed of physical Rigidbody is limited

You can [customize and recompile](../advanced-topics/engine-customization.md) the engine, in the engine `engine/external/box2d/box2d.js` script, the `b2_maxTranslation` parameter is the maximum linear velocity of Rigidbody, and the default value is **2**, which can be modified as needed.

### If a `TypeError: children[i]._onBatchCreated is not a function` error occurs when loading the scene

It is possible that the incorrect scene data was accidentally saved when the editor has an error, resulting in the value of `_children` in the scene file to be incorrectly saved as `null`. You can use the text editing tool to open the `.fire` file corresponding to the scene and change it to `[]`.

### Show a black screen when video is played by VideoPlayer

HTML only supports MP4 in H.264 encoding format, and it is recommended to use the video format converter to output MP4 video in AVC(H264) encoding format.

### When running or previewing, Creator's default debugging information color is not displayed clearly

You can [customize and recompile](../advanced-topics/engine-customization.md) the engine, to modify the color used in the engine debug information. Find the `generateNode` method in the `engine/cocos2d/core/utils/profiler/CCProfiler.js` script and modify the color of **LEFT-PANEL** and **RIGHT-PANEL** nodes in it.

### The position modified in the Widget component is not refreshed at the current frame

Note that you need to execute `widget.updateAlignment();` before immediately refreshing the node's position or size.

### Listen to multi-touch events, suppose there are two points A and B, hold down point B, after repeatedly clicking point A, release point B without responding to the `touchend` event

Just reassign a larger value to [cc.macro.TOUCH_TIMEOUT](../../../api/en/classes/macro.html#touchtimeout) in the outermost layer of any script in the project. Note that the assignment code is written in the outermost layer of the project script, not in class functions such as `onLoad` / `start`.

### Change a material's texture in script

The texture can be modified by the `setProperty` of the material:

```js
material.setProperty("diffuseTexture", texture);
```

For details, please refer to the [custom_material](https://github.com/cocos-creator/example-cases/tree/master/assets/cases/06_rendering/custom_material) in the example-cases.

### Scheduler cancel failed, still running

The parameters received by `this.unschedule(callBack, target)` must be consistent with those passed by `this.schedule(callBack, target)`. Where the `callBack` must be the same function object, and the `target` must also be the same object. If the parameters passed in are different, the Scheduler cannot be stopped properly.
