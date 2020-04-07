# 获取和加载资源

Cocos Creator 有一套统一的资源管理机制，在本篇教程，我们将介绍

- 资源属性的声明
- 如何在 **属性检查器** 里设置资源
- 动态加载资源
- 加载远程资源和设备资源
- 资源的依赖和释放

## 资源属性的声明

在 Creator 中，所有继承自 `cc.Asset` 的类型都统称资源，如 `cc.Texture2D`, `cc.SpriteFrame`, `cc.AnimationClip`, `cc.Prefab` 等。它们的加载是统一并且自动化的，相互依赖的资源能够被自动预加载。

> 例如，当引擎在加载场景时，会先自动加载场景关联到的资源，这些资源如果再关联其它资源，其它也会被先被加载，等加载全部完成后，场景加载才会结束。

脚本中可以这样定义一个 Asset 属性：

```javascript
// NewScript.js

cc.Class({
    extends: cc.Component,
    properties: {

        spriteFrame: {
            default: null,
            type: cc.SpriteFrame
        },

    }
});
```

## 如何在属性检查器里设置资源

只要在脚本中定义好类型，就能直接在 **属性检查器** 很方便地设置资源。假设我们创建了这样一个脚本：

```javascript
// NewScript.js

cc.Class({
    extends: cc.Component,
    properties: {

        texture: {
            default: null,
            type: cc.Texture2D
        },
        spriteFrame: {
            default: null,
            type: cc.SpriteFrame
        },

    }
});
```

将它添加到节点后，在 **属性检查器** 中是这样的：

![asset-in-properties-null](load-assets/asset-in-inspector-null.png)

接下来我们从 **资源管理器** 里面分别将一张 Texture 和一个 SpriteFrame 拖到 **属性检查器** 的对应属性中：

![asset-in-properties-dnd](load-assets/asset-in-inspector-dnd.png)

结果如下：

![asset-in-properties-dnd](load-assets/asset-in-inspector.png)

这样就能在脚本里直接拿到设置好的资源：

```javascript
    onLoad: function () {
        var spriteFrame = this.spriteFrame;
        var texture = this.texture;

        spriteFrame.setTexture(texture);
    }
```

在 **属性检查器** 里设置资源虽然很直观，但资源只能在场景里预先设好，没办法动态切换。如果需要动态切换，你需要看看下面的内容。

## 动态加载

从 v2.4 开始， Creator 支持 Asset Bundle 功能，即可以支持两种动态加载资源的方式：1. 通过将资源放在 `resources` 目录下，配合 `loadRes` 等接口动态加载资源；2. 通过 Asset Bundle 实现动态加载。本篇仅关注第一种方式，第二种方式请参考 [Asset Bundle](asset-bundle.md) 。 

使用第一种方式动态加载资源要注意两点，一是所有需要通过脚本动态加载的资源，都必须放置在 `resources` 文件夹或它的子文件夹下。`resources` 需要在 assets 文件夹中手工创建，并且必须位于 assets 的根目录，就像这样：

![asset-in-properties-null](load-assets/resources-file-tree.png)

> **resources** 文件夹中的资源，可以引用文件夹外部的其它资源，同样也可以被外部场景或资源引用到。项目构建时，除了已在 **构建发布** 面板勾选的场景外，**resources** 文件夹中的所有资源，连同它们关联依赖的 **resources** 文件夹外部的资源，都会被导出。
>
> 如果一份资源仅仅是被 resources 中的其它资源所依赖，而不需要直接被 `cc.assetManager.loadRes` 调用，那么 **请不要** 放在 resources 文件夹里。否则会增大 config.json 的大小，并且项目中无用的资源，将无法在构建的过程中自动剔除。同时在构建过程中，JSON 的自动合并策略也将受到影响，无法尽可能将零碎的 JSON 合并起来。

第二个要注意的是 Creator 相比之前的 Cocos2d-JS，资源动态加载的时候都是 **异步** 的，需要在回调函数中获得载入的资源。这么做是因为 Creator 除了场景关联的资源，没有另外的资源预加载列表，动态加载的资源是真正的动态加载。

**注意** ：从 v2.4 开始，`cc.loader` 等接口已经不再建议使用，请使用最新的 `cc.assetManager` 相关接口，升级文档请参考 [资源加载升级指南](../release-notes/asset-manager-upgrade-guide.md) 。

### 动态加载 Asset

Creator 提供了 `cc.assetManager.loadRes` 这个 API 来专门加载那些位于 resources 目录下的 Asset。和 `cc.assetManager.load` 不同的是，你只要传入相对 resources 的路径即可，并且路径的结尾处 **不能** 包含文件扩展名。

```javascript
// 加载 Prefab
cc.assetManager.loadRes("test assets/prefab", function (err, prefab) {
    var newNode = cc.instantiate(prefab);
    cc.director.getScene().addChild(newNode);
});

// 加载 AnimationClip
var self = this;
cc.assetManager.loadRes("test assets/anim", function (err, clip) {
    self.node.getComponent(cc.Animation).addClip(clip, "anim");
});
```

#### 加载 SpriteFrame

图片设置为 Sprite 后，将会在 **资源管理器** 中生成一个对应的 SpriteFrame。但如果直接加载 `test assets/image`，得到的类型将会是 cc.Texture2D。你必须指定第二个参数为资源的类型，才能加载到图片生成的 cc.SpriteFrame：

```javascript
// 加载 SpriteFrame
var self = this;
cc.assetManager.loadRes("test assets/image", cc.SpriteFrame, function (err, spriteFrame) {
    self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
});
```

> 如果指定了类型参数，就会在路径下查找指定类型的资源。当你在同一个路径下同时包含了多个重名资源（例如同时包含 player.clip 和 player.psd），或者需要获取 “子资源”（例如获取 Texture2D 生成的 SpriteFrame），就需要声明类型。

#### 加载图集中的 SpriteFrame

对从 TexturePacker 等第三方工具导入的图集而言，如果要加载其中的 SpriteFrame，则只能先加载图集，再获取其中的 SpriteFrame。这是一种特殊情况。

```js
// 加载 SpriteAtlas（图集），并且获取其中的一个 SpriteFrame
// 注意 atlas 资源文件（plist）通常会和一个同名的图片文件（png）放在一个目录下, 所以需要在第二个参数指定资源类型
cc.assetManager.loadRes("test assets/sheep", cc.SpriteAtlas, function (err, atlas) {
    var frame = atlas.getSpriteFrame('sheep_down_0');
    sprite.spriteFrame = frame;
});
```

#### 资源释放

`loadRes` 加载进来的单个资源如果需要释放，可以调用 `cc.assetManager.releaseRes`，`releaseRes` 可以传入和 `loadRes` 相同的路径和类型参数。

```javascript
cc.assetManager.releaseRes("test assets/image", cc.SpriteFrame);
cc.assetManager.releaseRes("test assets/anim");
```

此外，你也可以使用 `cc.assetManager.release` 来释放特定的 Asset 实例。

```javascript
cc.assetManager.release(spriteFrame);
```

### 资源批量加载

`cc.assetManager.loadResDir` 可以加载相同路径下的多个资源：

```javascript
// 加载 test assets 目录下所有资源
cc.assetManager.loadResDir("test assets", function (err, assets) {
    // ...
});

// 加载 test assets 目录下所有 SpriteFrame，并且获取它们的路径
cc.assetManager.loadResDir("test assets", cc.SpriteFrame, function (err, assets) {
    // ...
});
```

### 加载场景

`cc.assetManager` 提供了 `loadScene` 方法用于加载场景。与 `cc.director.loadScene` 的区别在于，`cc.assetManager.loadScene` 只能加载构建面板所勾选的场景，而 `cc.director.loadScene` 还会尝试查找所有已加载的 Asset Bundle 中的场景。并且 `cc.assetManager.loadScene` 不会自动运行场景，需要搭配 `cc.director.runScene` 一起使用。

```js
cc.assetManager.loadScene('test', function (err, scene) {
    cc.director.runScene(scene);
});
```

## 预加载资源

从 v2.4 开始，除了场景能够预加载之外，其他资源也能够进行预加载。加载参数与正常加载时一样，但其只会去下载相关资源，并不会进行资源的反序列化和初始化工作，所以性能消耗更小，适合游戏运行中使用。
`cc.assetManager` 提供了 `preloadRes` , `preloadResDir` 用于预加载资源。  

```js
var task = cc.assetManager.preloadRes('test assets/image', cc.SpriteFrame, function (err) {
    // 传入预加载任务
    cc.assetManager.loadRes(task, function (err, spriteFrame) {
        self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
    })
})
```

当你使用预加载相关接口时，会返回一个 `cc.AssetManager.Task` 的实例，保存了此次预加载任务的所有数据，你可以等待预加载结束后，使用正常加载接口加载此任务，便可以正常完成加载需求。

关于预加载的说明，请参考 [预加载与加载](../asset-manager/preload-load.md) 。

## 加载远程资源和设备资源

在目前的 Cocos Creator 中，我们支持加载远程贴图资源，这对于加载用户头像等需要向服务器请求的贴图很友好，需要注意的是，这需要开发者直接调用 `cc.assetManager.loadRemoteTexture` 或 `cc.assetManager.loadRemoteAudio` 或 `cc.assetManager.load` 方法。同时，如果开发者用其他方式下载了资源到本地设备存储中，也需要用同样的 API 来加载，上文中的 `loadRes` 等 API 只适用于应用包内的资源和热更新的本地资源。下面是这个 API 的用法：

```javascript
// 远程 url 带图片后缀名
var remoteUrl = "http://unknown.org/someres.png";
cc.assetManager.loadRemoteTexture(remoteUrl, function (err, texture) {
    // Use texture to create sprite frame
});

// 远程 url 不带图片后缀名，此时必须指定远程图片文件的类型
remoteUrl = "http://unknown.org/emoji?id=124982374";
cc.assetManager.loadRemoteTexture(remoteUrl, {ext: '.png'}, function () {
    // Use texture to create sprite frame
});

// 用绝对路径加载设备存储内的资源，比如相册
var absolutePath = "/dara/data/some/path/to/image.png"
cc.assetManager.loadRemoteTexture(absolutePath, function () {
    // Use texture to create sprite frame
});

// 远程音频
remoteUrl = "http://unknown.org/sound.mp3";
cc.assetManager.loadRemoteAudio(remoteUrl, function (err, audioClip) {
    // play audio clip
});

// 远程文本
remoteUrl = "http://unknown.org/skill.txt";
cc.assetManager.load({ url: remoteUrl }, function (err, str) {
    // use string to do something
});
```

如果图片的域与游戏不在同一个域，你可能还需要添加跨域选项：

```js
var remoteUrl = "http://unknown.org/someres.png";
cc.assetManager.loadRemoteTexture(remoteUrl, { isCrossOrigin: true }, function (err, texture) {
    // Use texture to create sprite frame
});
```

**注意** ：我们建议你使用更为简单的 API `cc.assetManager.loadRemoteTexture` 或 `cc.assetManager.loadRemoteAudio`，当然你也可以参考 [AssetManager](../asset-manager/asset-manager.md) 来使用更灵活的用法。

目前的此类手动资源加载还有一些限制，对开发者影响比较大的是：

1. 原生平台远程加载不支持图片文件以外类型的资源
2. 这种加载方式只支持图片、声音、文本等原生资源类型，不支持 SpriteFrame、SpriteAtlas、Tilemap 等资源的直接加载和解析
3. Web 端的远程加载受到浏览器的 [CORS 跨域策略限制](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS)，如果对方服务器禁止跨域访问，那么会加载失败，而且由于 WebGL 安全策略的限制，即便对方服务器允许 http 请求成功之后也无法渲染。

## 资源的依赖和释放

在加载完资源之后，所有的资源都会临时被缓存到 `cc.assetManager` 中，以避免重复加载资源时发送无意义的 http 请求，当然，缓存的内容都会占用内存，有些资源可能开发者不再需要了，想要释放它们，这里介绍一下在做资源释放时需要注意的事项。

**首先最为重要的一点就是：资源之间是互相依赖的。**

比如下图，Prefab 资源中的 Node 包含 Sprite 组件，Sprite 组件依赖于 SpriteFrame，SpriteFrame 资源依赖于 Texture 资源，而 Prefab，SpriteFrame 和 Texture 资源都被 cc.assetManager 缓存起来了。这样做的好处是，有可能有另一个 SpriteAtlas 资源依赖于同样的一个 SpriteFrame 和 Texture，那么当你手动加载这个 SpriteAtlas 的时候，就不需要再重新请求贴图资源了，cc.assetManager 会自动使用缓存中的资源。

![](load-assets/asset-dep.png)

**接下来要介绍问题的另一个核心：JavaScript 中无法跟踪对象引用。**

在 JavaScript 这种脚本语言中，由于其弱类型特性，以及为了代码的便利，往往是不包含内存管理功能的，所有对象的内存都由垃圾回收机制来管理。这就导致 JS 层逻辑永远不知道一个对象会在什么时候被释放，这意味着引擎无法通过类似引用计数的机制来管理外部对象对资源的引用，也无法严谨得统计资源是否不再被需要了。

在 v2.4 之前，Creator 很长时间里选择让开发者控制所有资源的释放，包括资源本身和它的依赖项，你必须手动获取资源所有的依赖项并选择需要释放的依赖项，例如如下形式：

```javascript
// 直接释放某个贴图
cc.loader.release(texture);
// 释放一个 prefab 以及所有它依赖的资源
var deps = cc.loader.getDependsRecursively('prefabs/sample');
cc.loader.release(deps);
// 如果在这个 prefab 中有一些和场景其他部分共享的资源，你不希望它们被释放，可以将这个资源从依赖列表中删除
var deps = cc.loader.getDependsRecursively('prefabs/sample');
var index = deps.indexOf(texture2d._uuid);
if (index !== -1)
    deps.splice(index, 1);
cc.loader.release(deps);
```

这种方案给予了开发者最大的控制权力，对于小型项目来说工作良好，但随着 Creator 的发展，项目的规模不断提升，场景所引用的资源不断增加，而其他场景可能也复用了这些资源，这会造成释放资源的复杂度越来越高，开发者需要掌握所有资源的使用非常困难。为了提升开发者使用的方便程度， Creator 设计实现了动态资源与静态资源分别计数的方案，用于帮助开发者在处理资源释放时更加方便。需要说明的是这套方案中引擎仅对静态资源做了准确的计数，但动态资源的计数还需要开发者进行控制以保证资源能够被正确释放。

在 v2.4，开发者不再需要关注资源的依赖项，你只需管理资源本身即可，Creator 会尝试自动释放其依赖资源。例如：

```js
cc.assetManager.release(texture);
```

这一套方案所做的工作是通过 AssetManager 加载资源时，对资源的依赖资源进行分析记录，并增加引用。而在通过 AssetManager 释放资源时，拿到记录的依赖资源，取消引用，并根据依赖资源的引用数，尝试去释放依赖资源。所以这个方案引擎只对静态的依赖资源引用进行了分析，也就是说如果开发者在游戏运行过程中动态加载了资源并设置给场景或其他资源，则这些动态加载出来的资源引擎是没有记录的，这些资源需要开发者进行管理管理。每一个资源对象都提供了两个方法 `addRef`，`removeRef`，你可以使用这两个接口来对动态资源的引用进行控制，比如说：

```js
cc.assetManager.loadRes('image', cc.SpriteFrame, (err, spriteFrame) => {
    this.spriteFrame = spriteFrame;
    spriteFrame.addRef();
});
```

因为 texture 是动态加载进来的，而不是一开始就被组件所引用，所以这个 texture 是没有记录的，他的引用计数是 0，为了避免这个 texture 被其他地方误释放，开发者需要手动执行 `addRef` 操作为其增加一个引用。而在你不再需要使用这个资源是，你需要执行 `removeRef` 为其减少一个引用，并且释放它：

```js
    this.spriteFrame.removeRef();
    cc.assetManager.release(this.spriteFrame);
    this.spriteFrame = null;
```

详细的资源释放机制请参考 [终结器](../asset-manager/finalizer.md) 。

**最后一个值得关注的要点：JavaScript 的垃圾回收是延迟的。**

想象一种情况，当你释放了 cc.assetManager 对某个资源的引用之后，由于考虑不周的原因，游戏逻辑再次请求了这个资源。此时垃圾回收还没有开始（垃圾回收的时机不可控），或者你的游戏逻辑某处，仍然持有一个对于这个旧资源的引用，那么意味着这个资源还存在内存中，但是 cc.assetManager 已经访问不到了，所以会重新加载它。这造成这个资源在内存中有两份同样的拷贝，浪费了内存。如果只是一个资源还好，但是如果类似的资源很多，甚至不止一次被重复加载，这对于内存的压力是有可能很高的。如果观察到游戏使用的内存曲线有这样的异常，请仔细检查游戏逻辑，是否存在泄漏，如果没有的话，垃圾回收机制是会正常回收这些内存的。

---

继续前往 [事件系统/发射和监听事件](events.md) 说明文档。
