# 加载 Asset Bundle

> 文：Santy-Wang

随着游戏玩法越来越丰富，游戏中的资源数量越来越多，开发者对于拆分包体的需求越来越强烈，只将必要的内容放在首包中，减少首包的大小，而其他的内容则放在外部动态获取。所以从 v2.4 开始，Cocos Creator 推出了 **Asset Bundle** 功能，该功能支持 **代码** 和 **资源**，**场景** 的分包加载。

开发者可将项目中场景、资源、代码等内容划分到不同的 Asset Bundle 中，这些 bundle 不会在游戏启动时加载，而是交由开发者在游戏过程中手动加载，从而有效降低游戏启动的耗时，尽可能做到按需加载。

关于 Asset Bundle 的介绍，详细请参考 [Asset Bundle](../asset-manager/bundle.md)。

## 配置方法

Cocos Creator 的分包是以文件夹为单位来配置的，当我们选中一个文件夹时，在 **属性检查器** 中会出现文件夹的相关配置选项：

![bundle](./subpackage/inspector.png)

勾选文件夹的 `Is Bundle` 选项后，点击右上方的 **应用**，这个文件夹下的资源（包含代码和其他资源）以及这些资源关联依赖的文件夹外部的资源都会被当做是 bundle 的内容了。比如场景 A 放在 a 文件夹下，将 a 勾选 `Is Bundle` 并确定。则场景 A 以及他依赖的资源都会被合并到 bundle a 中。

**Bundle 优先级** 选项请参考 [Asset Bundle](../asset-manager/bundle.md#优先级) 中的详细说明。

**Bundle 名称** 选项影响 bundle 构建后的名称，默认会使用这个文件夹的名字。

**压缩类型** 选项将决定 Asset Bundle 最后的输出形式，详细选项请参考 [Asset Bundle](../asset-manager/bundle.md#压缩类型)。

**配置为远程包** 选项将决定 Asset Bundle 是否作为远程包，勾选之后，该 Asset Bundle 会在构建后会被放入 remote 文件夹下，你应该将整个 remote 文件夹放到远程服务器上。另外，如果勾选了此选项，在 OPPO, vivo, Huawei 等平台，该 bundle 不会被构建到 rpk 内。

**注意**：
1. Creator 内置了 4 个 bundle：resources，internal，main，start-scene 请不要使用这四个名称作为 **Bundle 名称** 的设置。
2. 如果你将 Asset Bundle 的压缩类型配置为小游戏分包后，在构建后请不要将其移出目录，对应平台比如微信小游戏会做相关处理。

## 构建

Asset Bundle 的作用只会在项目构建后才会体现，预览的时候你无法加载除内置 Asset Bundle 外的其他还未构建出去的 Asset Bundle。项目构建后会在发布包目录下的 **assets** 生成对应的 Asset Bundle 文件夹。每一个文件夹为一个 Asset Bundle。你可以将 Asset Bundle 的文件夹放在远程服务器上或者本地，以及配置到某些平台比如微信小游戏的分包中。

**例如**：将 example 工程中的 **cases/01_graphics** 文件夹配置为 Asset Bundle，那么项目构建后将会在发布包目录下的 **assets** 生成 **01_graphics** 文件夹。

  ![asset-bundle](./subpackage/asset-bundle.png)

## 加载 Asset Bundle

引擎提供了一个统一的 api `cc.assetManager.loadBundle` 来加载 Asset Bundle。`loadBundle` 需要传入一个 Asset Bundle 的名称或者 url。

**注意**：
1. **Bundle 名称** 和 bundle 的 url 一般情况下都可以作为加载 bundle 时的参数，但当复用其他项目的 bundle 时，仅能通过 url 进行加载。
2. 如果有 bundle 放在远程服务器上，请在构建时填写 **资源服务器地址**。

当 Asset Bundle 加载完成后，Asset Bundle 中的脚本将被执行，并触发回调，返回错误信息和一个 `cc.AssetManager.Bundle` 类的实例，你可以用这个实例加载该 bundle 中的各类资源。 

```javascript
cc.assetManager.loadBundle('01_graphics', function (err, bundle) {
    if (err) {
        return console.error(err);
    }
    console.log('load bundle successfully.');
});

// 如果复用其他项目的 bundle
cc.assetManager.loadBundle('https://othergame.com/remote/01_graphics', function (err, bundle) {
    if (err) {
        return console.error(err);
    }
    console.log('load bundle successfully.');
});
```

### Asset Bundle 的版本

有时你可能需要更新远程服务器上的 Asset Bundle，此时需要机制能够绕过已存在的缓存文件，Asset Bundle 在更新上延续了 Cocos Creator 的 MD5 方案，当你需要对 Asset Bundle 进行更新时，请在构建面板勾选 **MD5 Cache** 选项，此时构建出来的 Asset Bundle 中的 `config` 文件的文件名会附带 Hash 值。如图所示：

![md5 cache](subpackage/bundle_md5.png)

当你加载 Asset Bundle 时你 **不需要** 额外提供对应的 Hash 值，Creator 会在 `settings.js` 中查询对应的 Hash 值，并自动做出调整，**但如果你想要将相关版本配置信息存储在服务器上，启动时动态获取版本信息以实现热更新，你也可以手动指定一个版本 Hash 值传入到 `loadBundle` 中**，此时将会以传入的 Hash 值为准：

```js
cc.assetManager.loadBundle('01_graphics', { version: 'fbc07' }, function (err, bundle) {
    if (err) {
        return console.error(err);
    }
    console.log('load bundle successfully.');
});
```

此时就能绕过缓存中的老版本文件，重新下载最新版本的 Asset Bundle。

## 获取 Asset Bundle

当 Asset Bundle 已经被加载过之后，将被缓存下来，此时你可以使用名称来获取该 bundle。例如：

```js
let bundleA = cc.assetManager.getBundle('bundleA');
```

## 通过 Asset Bundle 动态加载资源

通过加载 Asset Bundle，我们将获得一个 `cc.AssetManager.Bundle` 类的实例。你可以通过这个实例去动态加载 Asset Bundle 中的各类资源。加载方式与加载 `resources` 目录下的资源方式相同，实际上 `cc.resources` 就是一个 Asset Bundle 的实例。

假设在工程中配置了一个 Asset Bundle，如图所示：

![bundle1](subpackage/bundle1.png)

### 动态加载 Asset

Asset Bundle 中提供了 `load` 方法用于加载位于设置为 Asset Bundle 的目录下的资源，此方法的参数与 `cc.resources.load` 相同，你只要传入资源相对 Asset Bundle 目录的路径即可，并且路径的结尾处 **不能** 包含文件扩展名。

```js
cc.assetManager.loadBundle('bundle1', function (err, bundle) {
    if (err) {
        return console.error(err);
    }
    // 加载 prefab
    bundle.load(`prefab`, cc.Prefab, function (err, prefab) {
        var newNode = cc.instantiate(prefab);
        cc.director.getScene().addChild(newNode);
    });

    // 加载 texture
    bundle.load(`image`, cc.Texture2D, function (err, texture) {
        console.log(texture)
    });
});
```

与 `cc.resources.load` 相同，`load` 方法可以提供一个类型参数，这在存在同名资源或加载 SpriteFrame 时十分有效。例如：

```js
    bundle.load(`image`, cc.SpriteFrame, function (err, spriteFrame) {
        console.log(spriteFrame);
    });
```

### 批量加载资源

Asset Bundle 中提供了 `loadDir` 方法用于批量加载相同路径下的多个资源，此方法的参数与 `cc.resources.loadDir` 相似，你只要传入相对 Asset Bundle 目录的目录路径即可。

```js
    // 加载 textures 目录下所有资源
    bundle.loadDir("textures", function (err, assets) {
        // ...
    });

    // 加载 textures 目录下所有 Texture 资源
    bundle.loadDir("textures", cc.Texture2D, function (err, assets) {
        // ...
    });
```

### 加载场景

Asset Bundle 中提供了 `loadScene` 方法用于加载 Asset Bundle 中的场景，你只要传入场景名即可。`loadScene` 与 `cc.director.loadScene` 不同的地方在于 `loadScene` 只会加载本 bundle 内的场景，并且不会运行场景，你还需要使用 `cc.director.runScene` 来运行场景。

```js
    bundle.loadScene('test', function (err, scene) {
        cc.director.runScene(scene);
    });
```

另一种动态加载资源的方式，请参考 [加载 resources 下的资源](load-assets.md)。 

## 预加载资源

除了场景能够预加载之外，其他资源也能够进行预加载。加载参数与正常加载时一样，但其只会去下载相关资源，并不会进行资源的反序列化和初始化工作，所以消耗的性能更小，适合在游戏过程中使用。 Asset Bundle 中提供了 `preload`，`preloadDir` 接口用于预加载 bundle 中的资源。具体的使用方式和 cc.assetManager 中的预加载一样，详见 [预加载与加载](../asset-manager/preload-load.md)。

## 释放 Asset Bundle 中的资源

在加载完资源之后，所有的资源都会临时被缓存到 `cc.assetManager` 中，以避免重复加载资源，当然，缓存的内容都会占用内存，有些资源可能用户不再需要了，想要释放它们，这里介绍一下在做资源释放时需要注意的事项。

Asset Bundle 中的资源可以使用三种方式进行释放，第一种是使用常规的 `cc.assetManager.releaseAsset` 方法进行释放。

```js
    bundle.load(`image`, cc.SpriteFrame, function (err, spriteFrame) {
        cc.assetManager.releaseAsset(spriteFrame);
    });
```

第二种方式是 Asset Bundle 中的 `release` 方法，通过传入路径和类型进行释放，只能释放该 bundle 中的资源, 参数可以使用与 `Bundle.load` 一样的参数。

```js
    bundle.load(`image`, cc.SpriteFrame, function (err, spriteFrame) {
        bundle.release(`image`, cc.SpriteFrame);
    });
```

第三种方式是 Asset Bundle 中的 `releaseAll` 方法，此方法与 `cc.assetManager.releaseAll` 相似，`releaseAll` 方法会释放该 Asset Bundle 中所有已经被加载的资源，请慎重使用。

```js
    bundle.load(`image`, cc.SpriteFrame, function (err, spriteFrame) {
        bundle.releaseAll();
    });
```

**注意**：当你释放资源时，Creator 同时会去处理该资源的依赖资源，你不必对依赖项进行管理。

关于释放资源的详细介绍请参考 [资源释放](../asset-manager/release-manager.md)。

## 销毁 Asset Bundle

当加载了 Asset Bundle 之后，此 bundle 会一直存在游戏过程中，除非你手动销毁该 bundle。当你不再需要某个 bundle 时，你可以手动销毁它，则它将被移除缓存，下次使用必须重新加载一次。

```js
cc.assetManager.removeBundle(bundle);
```

**注意**：销毁 Asset Bundle 并不会释放该 bundle 中已经加载的资源。如果你想释放所有已加载资源，请先使用 `Bundle.releaseAll`。

```js
var bundle = cc.assetManager.getBundle('bundle1');
bundle.releaseAll();
cc.assetManager.removeBundle(bundle);
```

---

继续前往 [插件脚本](plugin-scripts.md) 说明文档。