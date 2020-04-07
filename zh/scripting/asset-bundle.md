# Asset Bundle 加载

> 文：Santy-Wang

随着游戏玩法越来越丰富，游戏中的资源数量越来越多，开发者对于拆分包体的需求越来越强烈，只将必要的内容放在首包中，减少首包的大小，而其他的内容则放在外部动态获取。所以从 v2.4 开始，Cocos Creator 推出了 **Asset Bundle** 功能，该功能支持 **代码** 和 **资源**，**场景** 的分包加载。

开发者可将自己的资源包括代码，资源，场景等内容划分到不同的包中，在首次启动的时候只下载必要的包，这个必要的包称为 **主包**，开发者可以在主包内触发下载其他 Asset Bundle，这样可以有效降低首次启动的消耗时间。

关于 Asset Bundle 的介绍，详细请参考 [Asset Bundle](../asset-manager/bundle.md) 。

## 配置方法

Cocos Creator 的分包是以文件夹为单位来配置的，当我们选中一个文件夹时，在 **属性检查器** 中会出现文件夹的相关配置选项：

![bundle](./subpackage/inspector.png)

选择 Bundle 类型为 **Normal Bundle** 或 **Shared Bundle** 后，点击右上方的 **应用**，这个文件夹下的资源（包含代码和其他资源）以及这些资源关联依赖的文件夹外部的资源都会被当做是 bundle 的内容了。比如场景 A 放在 bundle a 文件夹下，将 bundle a 设置为 **Normal Bundle** 并确定。则场景 A 以及他依赖的资源都会被合并到 bundle a 中。

**Bundle 类型** 选项请参考 [Asset Bundle](../asset-manager/bundle.md) 中的详细说明。

**Bundle 名称** 选项影响 bundle 构建后的名称，默认会使用这个文件夹的名字。

**配置为子包** 选项将决定是否将构建后的 Asset Bundle 配置为子包，因为 Asset Bundle 可以放在远程服务器上，或者本地，或者子包（微信子包，百度子包）中。你在选择为 Asset Bundle 后依然可以将其设置为子包。

**注意**：
1. 不能使用 **Bundle 名称** 作为加载 bundle 时的参数。
2. 所有的工程都内置了3个 bundle：resources，internal，main，请不要使用这三个名称作为 **Bundle 名称** 的设置。
3. 如果你将 Asset Bundle 勾选为子包后，在构建后请不要将其移出目录，对应平台比如微信小游戏会做相关处理。

## 构建

Asset Bundle 的作用只会在项目构建后才会体现，预览的时候你无法加载除内置 Asset Bundle 外的其他还未构建出去的 Asset Bundle。项目构建后会在发布包目录下的 **assets** 生成对应的 Asset Bundle 文件夹。每一个文件夹为一个 Asset Bundle。你可以将 Asset Bundle 的文件夹放在远程服务器上或者本地，以及配置到某些平台比如微信小游戏的子包中。

**例如**：将 example 工程中的 **cases/01_graphics** 文件夹配置为 Asset Bundle，那么项目构建后将会在发布包目录下的 **assets** 生成 **01_graphics** 文件夹。

  ![asset-bundle](./subpackage/asset-bundle.png)

## 子包设置

如果你想将 Asset Bundle 配置到子包中，请勾选上面提到的 **配置为子包** 功能。如果发布平台支持子包功能，比如在微信小游戏的构建中，子包的配置也会按照规则自动生成到微信小游戏发布包目录下的 **game.json** 配置文件中。

![profile](subpackage/profile.png)

**注意**：微信小游戏需要特定的版本才能支持分包功能。微信 6.6.7 客户端，2.1.0 及以上基础库开始支持，请更新至最新客户端版本，开发者工具请使用 1.02.1806120 及以上版本。更新了开发者工具后不要忘记修改开发者工具中的 **详情 -> 项目设置 -> 调试基础库** 为 2.1.0 及以上：

![subpackage2](./subpackage/subpackage2.png)

### 分包加载包大小的限制

目前微信小游戏分包大小有以下限制：

- 整个微信小游戏所有分包大小不超过 **8M**
- 单个子包/主包大小不能超过 **4M**

具体请参考 [微信小游戏分包加载官方文档](https://developers.weixin.qq.com/minigame/dev/guide/base-ability/sub-packages.html)。

### vivo 小游戏

在 vivo 小游戏的构建中，子包的配置也会按照规则自动生成到 vivo 小游戏发布包 qgame/src 目录下的 **manifest.json** 配置文件中。

![profile](./subpackage/vivo_profile.png)

**注意**：

- Creator **v2.1.3** 开始支持 vivo 小游戏分包加载。
- **快应用 & vivo 小游戏调试器** 从 **1051** 版本开始支持 vivo 小游戏分包加载。低于 1051 的版本虽然不支持分包加载，但是也做了兼容处理，如果勾选了分包也不会影响游戏正常运行。具体可参考 [vivo 分包加载-运行时兼容](https://minigame.vivo.com.cn/documents/#/lesson/base/subpackage?id=%e8%bf%90%e8%a1%8c%e6%97%b6%e5%85%bc%e5%ae%b9)。

  ![](./subpackage/vivo_subpackage.png)

### 分包加载包大小的限制

目前 vivo 小游戏分包大小有以下限制：

- 整个小游戏的所有分包及主包大小不超过 **8M**（打包完成后的整个压缩包包含整包不超过 **12M**，详情可参考 [vivo 分包加载-编译时兼容](https://minigame.vivo.com.cn/documents/#/lesson/base/subpackage?id=%e7%bc%96%e8%af%91%e6%97%b6%e5%85%bc%e5%ae%b9)）
- 单个分包/主包大小不能超过 **4M**

具体请参考 [vivo 小游戏分包加载官方文档](https://minigame.vivo.com.cn/documents/#/lesson/base/subpackage)。

## 加载 Asset Bundle

引擎提供了一个统一的 api `cc.assetManager.loadBundle` 来加载 Asset Bundle。`loadBundle` 需要传入一个 Asset Bundle 的 url。

当 Asset Bundle 加载完成后，Asset Bundle 中的脚本将被执行，并触发回调，返回错误信息和一个 `cc.AssetManager.Bundle` 类的实例，你可以用这个实例加载该 bundle 中的各类资源。 

```javascript
// 如果将构造之后的 Asset Bundle 放在远程服务器上
cc.assetManager.loadBundle('http://examples.com/01_graphics', function (err, bundle) {
    if (err) {
        return console.error(err);
    }
    console.log('load bundle successfully.');
});

// 如果将构造之后的 Asset Bundle 放在本地或微信子包
cc.assetManager.loadBundle('assets/01_graphics', function (err, bundle) {
    if (err) {
        return console.error(err);
    }
    console.log('load bundle successfully.');
});
```
**注意**：Asset Bundle 放在本地和配置到子包中的加载参数是相同的，Creator 会帮你处理 bundle 在子包内的情况。

### Asset Bundle 的版本

有时你可能需要更新远程服务器上的 Asset Bundle，此时需要机制能够绕过已存在缓存文件，Asset Bundle 在更新上延续了 Cocos Creator 的 MD5 方案，当你需要对 Asset Bundle 进行更新时，请在构建面板勾选 **MD5 Cache** 选项，此时构建出来的 Asset Bundle 中的 `config` 文件的文件名会附带 Hash 值。如图所示：

![md5 cache](subpackage/bundle_md5.png)

当你加载 Asset Bundle 时你 **不需要** 额外提供对应的 Hash 值，Creator 会在 `settings.js` 中查询对应的 Hash 值，并自动做出调整，但如果你想要将相关 Hash 存储在服务器上，动态获取以实现动态更新 asset bundle，你也可以手动指定一个版本 Hash 值传入到 `loadBundle` 中，此时将会以传入的 Hash 值为准：

```js
cc.assetManager.loadBundle('http://examples.com/01_graphics', { ver: 'fbc07' }, function (err, bundle) {
    if (err) {
        return console.error(err);
    }
    console.log('load bundle successfully.');
});
```

此时就能绕过缓存中的老版本文件，重新下载最新版本的 Asset Bundle。

## 通过 Asset Bundle 动态加载资源

通过加载 Asset Bundle，我们将获得一个 `cc.AssetManager.Bundle` 类的实例。你可以通过这个实例去动态加载 Asset Bundle 中的各类资源。加载方式与加载 `resources` 目录下的资源方式相似。

假设在工程中配置了一个 Asset Bundle，如图所示：

![bundle1](subpackage/bundle1.png)

### 动态加载 Asset

Asset Bundle 中提供了 `loadAsset` 方法用于加载位于设置为 Asset Bundle 的目录下的资源，此方法的参数与 `cc.assetManager.loadRes` 相似，你只要传入资源相对 Asset Bundle 目录的路径即可，并且路径的结尾处 **不能** 包含文件扩展名。

```js
cc.assetManager.loadBundle('http://examples.com/bundle1', function (err, bundle) {
    if (err) {
        return console.error(err);
    }
    // 加载 prefab
    bundle.loadAsset(`prefab`, function (err, prefab) {
        var newNode = cc.instantiate(prefab);
        cc.director.getScene().addChild(newNode);
    });

    // 加载 texture
    bundle.loadAsset(`image`, function (err, texture) {
        console.log(texture)
    });
});
```

与 `cc.assetManager.loadRes` 类似，`loadAsset` 方法可以提供一个类型参数，这在存在同名资源或加载 SpriteFrame 时十分有效。例如：

```js
    bundle.loadAsset(`image`, cc.SpriteFrame, function (err, spriteFrame) {
        console.log(spriteFrame);
    });
```

### 批量加载资源

Asset Bundle 中提供了 `loadDir` 方法用于批量加载相同路径下的多个资源，此方法的参数与 `cc.assetManager.loadResDir` 相似，你只要传入相对 Asset Bundle 目录的目录路径即可。

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

Asset Bundle 中提供了 `loadScene` 方法用于加载 Asset Bundle 中的场景，此方法的参数与 `cc.assetManager.loadScene` 相似，你只要传入场景名即可。`loadScene` 与 `cc.director.loadScene` 不同的地方在于 `loadScene` 只会加载本 bundle 内的场景，并且不会运行场景，你还需要使用 `cc.director.runScene` 来运行场景。

```js
    bundle.loadScene('test', function (err, scene) {
        cc.director.runScene(scene);
    });
```

另一种动态加载资源的方式，请参考 [加载 resources 下的资源](load-assets.md) 。 

## 预加载资源

除了场景能够预加载之外，其他资源也能够进行预加载。加载参数与正常加载时一样，但其只会去下载相关资源，并不会进行资源的反序列化和初始化工作，所以消耗的性能更小，适合在游戏过程中使用。 Asset Bundle 中提供了 `preloadAsset`，`preloadDir` 接口用于预加载 bundle 中的资源。 

```js
    var task = bundle.preloadAsset('test assets/image', cc.SpriteFrame, function (err) {
        // 传入预加载任务
        bundle.loadAsset(task, function (err, spriteFrame) {
            self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        })
    })
```

当你使用预加载相关接口时，会返回一个 `cc.AssetManager.Task` 的实例，保存了此次预加载任务的所有数据，你可以等待预加载结束后，使用正常加载接口加载此任务，便可以正常完成加载需求。

关于预加载的说明，请参考 [预加载与加载](../asset-manager/preload-load.md) 。

## 释放 Asset Bundle 中的资源

在加载完资源之后，所有的资源都会临时被缓存到 `cc.assetManager` 中，以避免重复加载资源时发送无意义的 http 请求，当然，缓存的内容都会占用内存，有些资源可能用户不再需要了，想要释放它们，这里介绍一下在做资源释放时需要注意的事项。

Asset Bundle 中的资源可以使用三种方式进行释放，第一种是使用常规的 `cc.assetManager.release` 方法进行释放。

```js
    bundle.loadAsset(`image`, cc.SpriteFrame, function (err, spriteFrame) {
        cc.assetManager.release(spriteFrame);
    });
```

第二种方式是 Asset Bundle 中的 `releaseAsset` 方法，此方法与 `cc.assetManager.releaseRes` 相似，通过传入路径和类型进行释放，只能释放该 bundle 中的资源, 参数可以使用与 `loadAsset` 一样的参数。

```js
    bundle.loadAsset(`image`, cc.SpriteFrame, function (err, spriteFrame) {
        bundle.releaseAsset(`image`, cc.SpriteFrame);
    });
```

第三种方式是 Asset Bundle 中的 `releaseAll` 方法，此方法与 `cc.assetManager.releaseAll` 相似，`releaseAll` 方法会释放该 Asset Bundle 中所有已经被加载的资源，请慎重使用。

```js
    bundle.loadAsset(`image`, cc.SpriteFrame, function (err, spriteFrame) {
        bundle.releaseAll();
    });
```

**注意**：当你释放资源时，Creator 同时会去处理该资源的依赖资源，你不必对依赖项进行管理。

关于释放资源的详细介绍请参考 [终结器](../asset-manager/finalizer.md) 。

## 销毁 Asset Bundle

当加载了 Asset Bundle 之后，此 bundle 会一直存在游戏过程中，除非你手动销毁该 bundle。你不必重复加载已经加载的 bundle，你可以到缓存中查找所有已加载的 bundle 。`cc.assetManager.bundles` 缓存了游戏中的所有 bundle。当你不再需要某个 bundle 时，你可以手动销毁它，则它将被移除缓存，下次使用必须重新加载一次。

```js
cc.assetManager.bundles.get('bundle1').destroy();
```

**注意**：销毁 Asset Bundle 并不会释放该 bundle 中已经加载的资源。如果你想释放所有已加载资源，请先使用 `releaseAll`。

```js
var bundle = cc.assetManager.bundles.get('bundle1');
bundle.releaseAll();
bundle.destroy();
```

---

继续前往 [插件脚本](plugin-scripts.md) 说明文档。