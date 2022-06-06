# v1.10 Resource Upgrade Guide

> This article describes the considerations for migrating the old version Creator project to v1.10 in detail. If you have never used an older version, you do not need to read this article.

In the [Acquire and load asset](https://github.com/cocos/cocos-docs/blob/8271be5dee58e7281ba4b5c3e434f47418995dc1/en/scripting/load-assets.md) document before v1.10, we have mentioned that Creator resources are divided into `Asset` and `RawAsset`. At that time this division was mainly to try to reuse the existing Cocos2d-x base modules, and lowering the barriers for Cocos2d-x users. But we still want to replace all the `RawAsset` into the standard `Asset`, with the development of Creator these two years, it is time to do a round of refactoring. Refactoring simplifies the processing of resources by editors and engines, reduces the volume of `settings.js` files after publication, and improves the user's development experience.

To bring a smooth upgrade experience, we will maintain compatibility with `RawAsset` for a period of time. Starting with v1.10, the new API will be supported first, and warn of deprecated usage, and ask the user to adjust the code to a new usage based on warnings and instructions in this documents. The compatibility of RawAsset will not be completely removed until v2.1 published.

For the **artist and designer**, all resources in your project (e.g. scenes, animations, prefab) do not need to be modified or upgraded.<br>
For **programmers**, resources originally represented in the code with a URL string need to be directly referenced to the actual resource object after loading. The APIs for resource operations in Creator are also changed from passing resource URLs to passing resource objects. The related content will be described in detail in this document.

## Frequently asked questions

### Do I need to manually upgrade?

You need to upgrade if you have the following:

- You declare these types directly in your game code: `cc.Texture2D`, `cc.RawAsset`, `cc.AudioClip` and `cc.ParticleAsset`.
- You have extended the engine or editor. And defines a new class inherited from `cc.RawAsset`.
- You have loaded the '.json' suffix file under the `resources` folder through `cc.loader.loadRes`.

Maybe you need to upgrade if you have the following:

- You call `cc.audioEngine` or `cc.textureCache` directly in your game code.
- You use `cc.loader` to load text and particle on remote server.

### I'm not really sure what to upgrade?

Cocos Creator is an engine that attaches great importance to compatibility, and all the parts of the code that need to be upgraded will be warned when the editor or game is running. But you only need to adjust the API usage based on the error messages.

### The old project did some special operations on resources management, What should I do?

RawAsset adjusts to Asset, essentially turning strings from the engine level into objects. Just make sure that you're using an object when interacting with the engine. It is also possible to continue using strings within the original project. All you have to do is after getting the object from the engine, convert the object to a string. And convert the string to an object before passing the string to the engine.

- Asset convert to String

  For Texture2D, RawAsset, AudioClip and Particle asset types of resources, you can get the original URL directly through `.nativeUrl`. If it cannot be obtained, it means that this is another type of Asset object, other types of objects do not need to be upgraded. Therefore, no modification is required.

  ```js
  var url = this.file.nativeUrl || this.file;
  ```

- String convert to Asset

  ```js
  cc.loader.loadRes(musicURL, cc.AudioClip, function (err, audioClip) {
      cc.log(typeof audioClip);  // 'object'
  });
  ```

## Upgrade step

- Rename the directory where the old Cocos Creator is located, and install a new version of Cocos Creator. In this way, old and new versions can coexist.
- **After backing up the old version of the project**, open the original project with the new Cocos Creator, Creator will re-import impacted resources, it takes a little more time to upgrade for the first time, and the main editor window opens when the import is complete.
- When the project is open, a bunch of yellow warnings may appear, and warnings generally do not affect the preview release of the game, but it is strongly recommended that it be resolved as soon as possible.

  ![](raw-asset-migration/warning.png)

  - "Please change the definition of property 'audio_bgMusic' in class 'FOO'..."

    This is the most common error in the upgrade process. Where FOO is the class name of the CCClass you declare, which is the name of the file, audio_bgMusic is your property name. You need to find the definition of audio_bgMusic in `FOO.js`, and then modify it according to the following information. The following message is assumed to be:

  - "The use of declaring a property in CCClass as a URL has been deprecated..."

    This means that you specified the `url` type when declaring the `audio_bgMusic` attribute, and that `url` is no longer supported. By looking for `FOO.js` in your project, you can find a way to define something like this:

    ```js
    // FOO.js

    audio_bgMusic: {
        default: ***,
        url: cc.AudioClip,
    },
    ```

    Change the URL to type and make sure that default is null.

    ```js
    audio_bgMusic: {
        default: null,
        type: cc.AudioClip,  // use 'type:' to define Asset object directly
    },
    ```

    In this way, after the game scene is loaded, audio_bgMusic will be an AudioClip type object instead of the original audio string. To ensure that the game logic does not go wrong, continue searching globally for audio_bgMusic in your project. Make sure that you do not make any string-related calls to this variable such as `substring`, `replace`, etc., otherwise please get the real URL through the `audio_bgMusic.nativeUrl` first.

    Attention! If you originally defined the type as `cc.RawAsset`, In addition to modifying the url to type, the associated type should also be changed to `cc.Asset`.

    If it turns out to be:

    ```js
    // When declaring
    manifest: {
        default: ***,
        url: cc.RawAsset
    },

    // On Access
    this._am = new jsb.AssetsManager(this.manifest, storagePath);
    ```

    Please amend it to:

    ```js
    // When declaring
    manifest: {
        default: null,
        type: cc.Asset
    },

    // On Access
    this._am = new jsb.AssetsManager(this.manifest.nativeUrl, storagePath);
    ```

  - "properties in CCClass can not be abbreviated if they are of type RawAsset"

    In addition to the warning messages mentioned earlier, you may also see this warning. What this sentence means is, When you declare the `audio_bgMusic` attribute, you use a convenient form that may cause ambiguity in the future, These abbreviations are temporarily abandoned and will not be re-supported until most of the projects are upgraded smoothly. By looking for `FOO.js` in your project, you can find a way to define something like this:

    ```js
    audio_bgMusic: cc.AudioClip,
    ```

    You need to use the type + default to make a full statement with reference to the previous modification:

    ```js
    audio_bgMusic: {
        default: null,
        type: cc.AudioClip,
    },
    ```

    In this way, after the game scene is loaded, `audio_bgMusic` will be the object of a AudioClip type, rather than the original audio string. The relevant attention is consistent with the previous, here no longer repeat.

  - "textureCache.addImage(url) - The type of the url should be string, not Texture2D..."

    This warning is usually caused by the following code:

    ```js
    // Follow the above document to upgrade the wording
    tex: {
        default: null,
        type: cc.Texture2D,
    },

    // Original code to get texture
    var texture = cc.textureCache.addImage(this.tex);
    ```

    This warning means that when you call `addImage`, you are already passing in a Texture2D object, so just use the object directly and not need to load again. Because the upgraded `tex` is already a Texture2D. That means you only have to:

    ```js
    var texture = this.tex;
    ```

  - "Since 1.10, `cc.audioEngine.play` accept cc.AudioClip instance directly, not a URL string..."

    This warning is usually caused by the following code:

    ```js
    var url = cc.url.raw('resources/bg.mp3');
    cc.audioEngine.play(url);
    ```

    Please amend it to:

    ```js
    cc.loader.loadRes('bg', cc.AudioClip, function (err, clip) {
        cc.audioEngine.play(clip);
    });
    ```

## Protobuf related adjustments

If you have adapted protobuf before, you may have trouble loading the `.proto` file after upgrading to 1.10. Just make the following adjustments. The code shown below may not be the same as the protobuf you are using, but the principle is the same.

Assuming that the `.proto` was originally loaded with such code:

```js
ProtoBuf.loadProtoFile(cc.url.raw('resources/data.proto'), ...);
```

Because **paths are converted to `cc.url.raw`, they will no longer be available for relative path parsing**, so protobuf may fail to load associated files internally. Please change to use directly:

```js
ProtoBuf.loadProtoFile('data.proto', ...);
```

Then modify the implementation of loadProtoFile, adjust the code that was originally loaded using methods such as cc.loader.load to:

```js
ProtoBuf.loadProtoFile = function (filename, callback, builder) {
    ...
    cc.loader.loadRes(filename, function (error, res) {
        ...
        ProtoBuf.loadProto(res.text, builder, filename);
    });
});
```

## Other adjustments

### Added `cc.TextAsset` for loading text files

Starting with 1.10, common text formats such as `.txt`, `.plist`, `.xml`, `.json`, `.yaml`, `.ini`, `.csv`, `.md` will be imported as `cc.TextAsset`. You can access TextAsset like this:

```js
// Declaration
file: {
    default: null,
    type: cc.TextAsset,
},

// Read
var text = this.file.text;
```

### Added `cc.JsonAsset` for loading JSON files

Starting with 1.10, all the `.json` files under the project's `assets` folder (excluding the released `imports` directory) are imported as `cc.JsonAsset`. You must adjust the loader related code, otherwise you will get errors at runtime. For example, originally:

```js
cc.loader.loadRes('configs/npc', function (err, json) {
    loadNpc(json);
});
```

Need to change to:

```js
cc.loader.loadRes('configs/npc', function (err, asset) {
    loadNpc(asset.json);
});
```

In addition, you can read directly:

```js
// Declaration
npcList: {
    default: null,
    type: cc.JsonAsset,
},

// Read
var json = this.npcList.json;
loadNpc(json);
```

### The other unknown types are also all imported as `cc.Asset` by default

For an unknown type of file imported from the editor, originally imported as an untyped `cc.RawAsset`, it will now be imported as `cc.Asset`. The declaration method is the same as above, changing `url: cc.RawAsset` to `type: cc.Asset`. The original URL can also be accessed in the same manner as `asset.nativeUrl`. The original url can also be accessed in the same manner as `asset.nativeUrl`.

### If you need to compress the built textures

Starting with v1.10, built textures are named with their UUID, which causes you to not be able to directly determine the location of the asset in the project from the filename. This requires some customization of your build process, please refer to the example: <https://github.com/cocos-creator/demo-process-build-textures>.
