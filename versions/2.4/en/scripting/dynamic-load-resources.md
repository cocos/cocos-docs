# Asset Loading

## Dynamic loading of resources

Usually we will place the resources that need to be dynamically loaded in the project in the `resources` directory, along with interfaces such as `cc.resources.load` to load them dynamically. You just need to pass in the path relative to `resources` directory, and the end of the path **must not** contain the file extension.

```javascript
// load Prefab
cc.resources.load("test assets/prefab", function (err, prefab) {
    var newNode = cc.instantiate(prefab);
    cc.director.getScene().addChild(newNode);
});

// load AnimationClip
var self = this;
cc.resources.load("test assets/anim", function (err, clip) {
    self.node.getComponent(cc.Animation).addClip(clip, "anim");
});
```

- All resources that need to be dynamically loaded by **script** must be placed in the `resources` folder or one of its subfolders. `resources` needs to be created manually in the `assets` folder and must be located in the `assets` root directory, like this:

  ![asset-in-properties-null](load-assets/resources-file-tree.png)

  > The assets in the `resources` folder can refer to other assets outside the folder, and can also be referenced by external scenes or assets. When the project is built, all assets in the `resources` folder, along with assets outside the `resources` folder they are associated with, will be exported, in addition to the scenes that have been checked in the **Build** panel.
  >
  > If an asset is only depended on by other assets in the `resources` and does not need to be called directly by `cc.resources.load`, then please don't put it in the `resources` folder. Otherwise, the size of `config.json` will increase, and useless assets in the project will not be automatically culled during the build process. At the same time, in the build process, the automatic merge strategy of JSON will also be affected, unable to merge the fragmented JSON as much as possible.

- The second to note is that compared to previous Cocos2d-JS, dynamic loading of resources in Creator is **asynchronous**, you need to get the loaded resources in the callback function. This is done because in addition to the resources associated with the scene, Creator has no additional resources preload list, and the dynamically loaded resources are really dynamically loaded.

  > **Note**: as of v2.4, the `cc.loader` interface is deprecated, please use `cc.assetManager` instead. You can refer to the [Asset Manager Upgrade Guide](../release-notes/asset-manager-upgrade-guide.md) documentation for details.

### Load SpriteFrame

After the image settings for the Sprite will be in the **Assets** to generate a corresponding SpriteFrame. But if `test assets/image` is loaded directly, and the type will be cc.Texture2D. You must specify the second parameter is the type of resource, then the generated SpriteFrame can be loaded.

```javascript
// load SpriteFrame
var self = this;
cc.resources.load("test assets/image", cc.SpriteFrame, function (err, spriteFrame) {
    self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
});
```

> If you specify a type parameter, you will find the specified resource type in the path. When you are in the same path includes multiple names simultaneously under a resource (for example, contains both `player.clip` and `player.psd`), or the need to obtain a "sub asset" (for example, gets Texture2D SpriteFrame generated), should need to declare types.

### Load SpriteFrames from Atlas

For an atlas imported from a third-party tool such as Texturepacker, if you want to load the SpriteFrame, you can only load the atlas first, and then get the SpriteFrame. This is a special case.

```js
// load SpriteAtlas, and get one of them SpriteFrame
// Note Atlas resource file (plist) usually of the same name and a picture file (PNG) placed in a directory,
// So should need to in the second parameter specifies the resource type.
cc.resources.load("test assets/sheep", cc.SpriteAtlas, function (err, atlas) {
    var frame = atlas.getSpriteFrame('sheep_down_0');
    sprite.spriteFrame = frame;
});
```

### Resource Release

`cc.resources.load` loaded in a single resource if you need to release, You can call `cc.resources.release`, `release` incoming one with `cc.resources.load` the same path and type parameter.

```javascript
cc.resources.release("test assets/image", cc.SpriteFrame);
cc.resources.release("test assets/anim");
```

Also, You can also use `cc.assetManager.releaseAsset` to release the instance of a specific Asset.

```javascript
cc.assetManager.releaseAsset(spriteFrame);
```

### Resource bulk loading

`cc.resources.loadDir` can load multiple resources under the same path:

```javascript
// loading all resource in the test assets directory
cc.resources.loadDir("test assets", function (err, assets) {
    // ...
});

// Load all SpriteFrames in the `test assets` directory and get their urls
cc.resources.loadDir("test assets", cc.SpriteFrame, function (err, assets, urls) {
    // ...
});
```

## Preload resources

Starting with v2.4, in addition to scenes that can be preloaded, other resources can also be preloaded. Preloading has the same loading parameters as normal loading, but it will only download the necessary resources, and will not perform deserialization or initialization. Therefore, it consumes less performance and is suitable for use during the game.

`cc.resources` provides `preload` and `preloadDir` for preloading resources.  

```js
cc.resources.preload('test assets/image', cc.SpriteFrame);
 // wait for while
cc.resources.load('test assets/image', cc.SpriteFrame, function (err, spriteFrame) {
    self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
});
```

You can use the preload related interface to load resources in advance, without waiting for the preload to finish, you can use the normal load interface to load, the normal load interface will directly reuse the content that has been downloaded during the preload process to shorten the load time.

For more information on preloading, please refer to the [Preloading and Loading](../asset-manager/preload-load.md) documentation.

## How to load remote assets or files in device

Currently in Cocos Creator, we support loading the remote image files, which is very useful to load user picture from social network websites. To load files from such urls, you should call `cc.assetManager.loadRemote`. At the same time you can use the same API to load resources on the local device storage. The `cc.resources.load` APIs mentioned above only apply to the application package resources and hot update resources. Here is how to load remote assets and local
device files:

```javascript
// Remote texture url with file extensions
var remoteUrl = "http://unknown.org/someres.png";
cc.assetManager.loadRemote(remoteUrl, function (err, texture) {
    // Use texture to create sprite frame
});

// Remote texture url without file extensions, then you need to define the file type explicitly
remoteUrl = "http://unknown.org/emoji?id=124982374";
cc.assetManager.loadRemote(remoteUrl, {type: 'png'}, function () {
    // Use texture to create sprite frame
});

// Use absolute path to load files on device storage
var absolutePath = "/dara/data/some/path/to/image.png"
cc.assetManager.loadRemote(absolutePath, function () {
    // Use texture to create sprite frame
});

// Remote Audio
remoteUrl = "http://unknown.org/sound.mp3";
cc.assetManager.loadRemote(remoteUrl, function (err, audioClip) {
    // play audio clip
});

// remote Text
remoteUrl = "http://unknown.org/skill.txt";
cc.assetManager.loadRemote(remoteUrl, function (err, textAsset) {
    // use string to do something
});
```

There still remains some restrictions currently, the most important are:

1. This loading method supports only native resource types such as textures, audios, text, etc., and does not support direct loading and analysis of resources such as SpriteFrame, SpriteAtlas, Tilemap. (If you want to load all resources remotely, you can use the [Asset Bundle](asset-bundle.md#dynamically-load-resources-via-asset-bundle))
2. Remote loading ability on Web is limited by the browser's [CORS cross-domain policy restriction](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS). If the server forbid cross-domain access, loading request will fail, and due to WebGL security policy restrictions, even if the server allows CORS http request, textures loaded can not be rendered.

## Assets dependencies and how to release assets

After resources loaded, they will be cached to the `cc.assetManager `, in order to avoid sending meaningless http request and repeated loading of resources. Sure thing is that the contents of the cache will consume memory, during game process, some resources may no longer be needed, and you may want to release them, we will cover some important notices for asset releasing here.

**First and most important: Resources depends on each other.**

For example, in the following graph, the Prefab resource contains the Sprite component, the Sprite component depends on the SpriteFrame, the SpriteFrame resource depends on the Texture resource, then the Prefab, SpriteFrame, and Texture resources are all cached by the cc.loader. The advantage of doing so is that there may be another SpriteAtlas resource that depends on the same SpriteFrame and Texture, then when you manually load the SpriteAtlas, loader do not need to request the existing SpriteFrame and Texture again it will use the cache directly.

![](load-assets/asset-dep.png)

**Next core problem: We can not track object references in JavaScript.**

In a scripting language like JavaScript, memory management is often not included due to its weak typing characteristics, and for code convenience, the memory of all objects is managed by a garbage collection mechanism. This results in JS layer logic never knowing when an object will be released, which means that the engine cannot manage external object references to resources through a mechanism like reference counting, nor can it rigorously count whether a resource is no longer needed.

Prior to v2.4, Creator long chose to give developers control over the release of all resources, including the resource itself and its dependencies, and you had to manually get all the dependencies of the resource and select the dependencies that needed to be released, for example in the following form:

```javascript
// Release a texture which is no longer need
cc.loader.release(texture);
// Release all dependencies of a loaded prefab
var deps = cc.loader.getDependsRecursively('prefabs/sample');
cc.loader.release(deps);
// If there is no instance of this prefab in the scene, the prefab and its dependencies
// like textures, sprite frames, etc, will be freed up. If you have some other nodes
// share a texture in this prefab, you can remove it from the dependencies array
var deps = cc.loader.getDependsRecursively('prefabs/sample');
var index = deps.indexOf(texture2d._uuid);
if (index !== -1)
    deps.splice(index, 1);
cc.loader.release(deps);
```

This way gives the developer the most control and works well for smaller projects, but as Creator grows, the project grows in size and the resources referenced by the scene increase, while other scene may also reuse them, which causes the complexity of releasing resources to become more and more complex and the developer needs to master all the resources. To address this pain point, Asset Manager provides a resource release mechanism based on reference counting, allowing developers to simply and efficiently release resources without worrying about dramatic project size inflation.

What new mechanism does is to make an analytical record of resource dependencies and add references when resources are loaded through AssetManager. When releasing a resource through AssetManager, get the recorded dependent resource, dereference it, and try to automatically release the dependent resource based on the number of references. So this mechanism only analyzes static references to resources, which means that if the developer dynamically loads resources during game runtime and sets them to component or other resources, then these dynamically loaded resources are not recorded by the engine and need to be managed by the developer. Each asset provides two methods `addRef` and `decRef` that you can use to control references to dynamic resources, for example:

```js
cc.resources.load('image', cc.SpriteFrame, (err, spriteFrame) => {
    this.spriteFrame = spriteFrame;
    spriteFrame.addRef();
});
```

Since the texture is dynamically loaded in and not referenced by the component in the first place, the texture is unrecorded and his reference count is 0. To prevent the texture from being mistakenly released elsewhere, the developer needs to manually perform the `addRef` operation to add a reference to it. And when you no longer need to use this resource, you need to perform `decRef` to reduce it by one reference.

```js
this.spriteFrame.decRef();
this.spriteFrame = null;
```

For a detailed resource release mechanism, see [Release Of Resource](../asset-manager/release-manager.md) documentation.

**The last thing to keep in mind: JavaScript's garbage collection is not immediate.**

Imagine a situation where, after you release a resource, the game logic requests that resource again for ill-considered reasons. At this point garbage collection has not started (the timing of garbage collection is uncontrollable), when this happens, it means that this resource is still in memory, but is no longer accessible, so it will reload. This causes this resource to have two identical copies in memory. It's okay if it's just one resource, but if similar resources are numerous, or even reloaded more than once, the strain on memory can be high. If such an anomaly is observed in the memory curve used by the game, please check the game logic carefully to avoid releasing resources that will be reused in the near future, if not, the garbage collection mechanism will recover the memory normally.
