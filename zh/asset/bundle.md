# Asset Bundle 介绍

> 文：Santy-Wang、Xunyi

从 v2.4 开始，Creator 正式支持 Asset Bundle 功能。Asset Bundle 作为资源模块化工具，允许开发者按照项目需求将贴图、脚本、场景等资源划分在多个 Asset Bundle 中，然后在游戏运行过程中，按照需求去加载不同的 Asset Bundle，以减少启动时需要加载的资源数量，从而减少首次下载和加载游戏时所需的时间。

Asset Bundle 可以按需求放置在不同地方，比如可以放在远程服务器、本地、或者小游戏平台的分包中。

从 v3.8 开始，Bundle 的配置方案被转移到 **项目设置** -> **Bundle 配置** 分页内。您可以点击 **属性检查器** 上的 **编辑按钮** 或者通过 **项目** 菜单打开 **项目设置** 对 Bundle 进行配置。

## 内置 Asset Bundle

项目中除了自定义的 Asset Bundle 外，Creator 还有内置的 3 个 Asset Bundle。与其他自定义 Asset Bundle 一样，内置 Asset Bundle 也可以根据不同平台进行配置。

![builtinBundles](bundle/builtin-bundles.png)

| 内置 Asset Bundle | 功能说明 | 配置 |
| :--------------- | :-- | :-------- |
| `main`        | 存放所有在 **构建发布** 面板的 **参与构建场景** 中勾选的场景以及其依赖资源  | 通过配置 **构建发布** 面板的 **主包压缩类型** 和 **配置主包为远程包** 两项 |
| `resources`   | 存放 `resources` 目录下的所有资源以及其依赖资源  | 通过配置 **资源管理器** 中的 `assets -> resources` 文件夹 |
| `start-scene` | 如果在 **构建发布** 面板中勾选了 **初始场景分包**，则首场景将会被构建到 `start-scene` 中。  | 无法进行配置 |
| `internal`        | 引擎模块内置的一些默认资源 | 无法进行配置 |

在构建完成后，内置 Asset Bundle 会根据配置决定它所生成的位置，具体的配置方法以及生成规则请参考 [配置 Asset Bundle](bundle.md#%E9%85%8D%E7%BD%AE%E6%96%B9%E6%B3%95)。

内置 Asset Bundle 是在 `application.js` 中进行加载的，你可以通过自定义构建模板功能修改 `application.js` 中的加载代码，如下所示：

```typescript
// ...

function loadAssetBundle (hasResourcesBundle, hasStartSceneBundle) {
    let promise = Promise.resolve();
    const mainBundleRoot = 'http://myserver.com/assets/main';
    const resourcesBundleRoot = 'http://myserver.com/assets/resources';
    const bundleRoot = hasResourcesBundle ? [resourcesBundleRoot, mainBundleRoot] : [mainBundleRoot];
    return bundleRoot.reduce((pre, name) => pre.then(() => loadBundle(name)), Promise.resolve());
}

function loadBundle (name) {
    return new Promise((resolve, reject) => {
        assetManager.loadBundle(name, (err, bundle) => {
            if (err) {
                return reject(err);
            }
            resolve(bundle);
        });
    });
}

```

## 配置方法

自定义 Asset Bundle 是以 **文件夹** 为单位进行配置的。当我们在 **资源管理器** 中选中一个文件夹时，**属性检查器** 中就会出现一个 **配置为 Bundle** 的选项，勾选后会出现如下图的配置项：

![bundle](./subpackage/inspector.png)

| 配置项 | 功能说明 |
| :---  | :---- |
| Bundle 名称   | Asset Bundle 构建后的名称，默认会使用这个文件夹的名字，可根据需要修改。 |
| Bundle 优先级 | Creator 开放了 20 个可供配置的优先级，构建时将会按照优先级 **从大到小** 的顺序对 Asset Bundle 依次进行构建。具体内容请参考 [Asset Bundle - 优先级](bundle.md#%E4%BC%98%E5%85%88%E7%BA%A7)。 |
| 目标平台      | 不同平台可使用不同的配置，构建时将根据对应平台的设置来构建 Asset Bundle。支持通过下拉框选择不同的平台配置，目前为默认配置。开发者可以通过 **项目设置** -> **Bundle 配置** 自定义自己的配置方案 |
| 压缩类型      | 决定 Asset Bundle 最后的输出形式，包括 **合并依赖**、**无压缩**、**合并所有 JSON**、**小游戏分包**、**Zip** 5 种压缩类型。具体内容请参考 [Asset Bundle - 压缩类型](bundle.md#%E5%8E%8B%E7%BC%A9%E7%B1%BB%E5%9E%8B) |
| 配置为远程包  | 是否将 Asset Bundle 配置为远程包，不支持 Web 平台。<br>若勾选了该项，则 Asset Bundle 在构建后会被放到 **remote** 文件夹，你需要将整个 **remote** 文件夹放到远程服务器上。<br>构建 OPPO、vivo、华为等小游戏平台时，若勾选了该项，则不会将 Asset Bundle 打包到 rpk 中。 |
| **Bundle 资源过滤** | 资源过滤可以过滤掉 Bundle 内的某些资源，通过下方的 **预览** 按钮，可以查看 Bundle 最终会的资源列表，Bundle 过滤分为包含和排除两部分。详情请查看 [下文](./bundle.md#Bundle%20资源过滤)。|
| **构建 Bundle** | 构建 Bundle 可以针对当前选中的 Bundle 进行构建，详情请查看 [下文](./bundle.md#构建%20Bundle) |

配置完成后点击面板右上方的 **绿色打钩按钮**，这个文件夹就被配置为 Asset Bundle 的打包预设集合了，在放置需要的资源后，然后在 **构建发布** 面板选择对应的平台进行构建即可得到对应的 Asset Bundle。

**注意**：
1. Creator 有 4 个 [内置 Asset Bundle](bundle.md#%E5%86%85%E7%BD%AE-asset-bundle)，包括 **internal**、**resources**、**main**、**start-scene**，在设置 **Bundle 名称** 时请不要使用这三个名称。
2. [小游戏分包](../editor/publish/subpackage.md) 只能放在本地，不能配置为远程包。所以当 **压缩类型** 设置为 **小游戏分包** 时，**配置为远程包** 项不可勾选。
3. Zip 压缩类型主要是为了降低网络请求数量，如果放在本地，不用网络请求，则没什么必要。所以要求与 **配置为远程包** 搭配使用。
4. 设置为 Bundle 的文件夹配置是作为 Asset Bundle 的选项配置集合，我们不建议您非常直接地将资源都放置在其中。和之前版本的 resources 类似，Bundle 配置文件夹最好是放置 Scene、Prefab 等入口资源或者需要在脚本内动态加载的资源，最后在构建阶段将会根据依赖关系导出所有引用的资源文件最终填充整个 Asset Bundle。通过这样的方式，可以最大限度的较少不必要的资源导出。

## 优先级

当文件夹设置为 Asset Bundle 之后，会将文件夹中的资源以及文件夹外的相关依赖资源都合并到同一个 Asset Bundle 中。这样就有可能出现某个资源虽然不在 Asset Bundle 文件夹中，但因为同时被两个 Asset Bundle 所依赖，所以属于两个 Asset Bundle 的情况，如图所示：

![shared](bundle/shared.png)

另一种情况是某个资源在一个 Asset Bundle 文件夹中，但同时又被其他 Asset Bundle 所依赖，如图所示：

![shared2](bundle/shared2.png)

在这两种情况下，资源 c 既属于 Asset Bundle A，也属于 Asset Bundle B。那资源 c 究竟存在于哪一个 Asset Bundle 中呢？此时就需要通过调整 Asset Bundle 的优先级来指定了。<br>
Creator 开放了 20 个可供配置的优先级，编辑器在构建时将会按照优先级 **从大到小** 的顺序对 Asset Bundle 依次进行构建。

- 当同个资源被 **不同优先级** 的多个 Asset Bundle 引用时，资源会优先放在优先级高的 Asset Bundle 中，低优先级的 Asset Bundle 只会存储一条记录信息。此时低优先级的 Asset Bundle 会依赖高优先级的 Asset Bundle。<br>
如果你想在低优先级的 Asset Bundle 中加载此共享资源，必须在加载低优先级的 Asset Bundle **之前** 先加载高优先级的 Asset Bundle。
- 当同个资源被 **相同优先级** 的多个 Asset Bundle 引用时，资源会在每个 Asset Bundle 中都复制一份。此时不同的 Asset Bundle 之间没有依赖关系，可按任意顺序加载。所以请尽量确保共享的资源（例如 `Texture`、`SpriteFrame`、`Audio` 等）所在的 Asset Bundle 优先级更高，以便让更多低优先级的 Asset Bundle 共享资源，从而最小化包体。

四个内置 Asset Bundle 文件夹的优先级分别为：

| Asset Bundle | 优先级 |
| :--- | :--- |
| `main`        | 7  |
| `resources`   | 8  |
| `start-scene` | 20 |
| `internal`    | 21 |

当四个内置 Asset Bundle 中有相同资源时，资源会优先存储在优先级高的 Asset Bundle 中。建议其他自定义的 Asset Bundle 优先级 **不要高于** 内置的 Asset Bundle，以便尽可能共享内置 Asset Bundle 中的资源。

## 压缩类型

Creator 目前提供了 **合并依赖**、**无压缩**、**合并所有 JSON**、**小游戏分包**、**Zip** 这几种压缩类型用于优化 Asset Bundle。所有 Asset Bundle 默认使用 **合并依赖** 压缩类型，开发者可重新设置包括内置 Asset Bundle 在内的所有 Asset Bundle 的压缩类型。

| 压缩类型 | 功能说明 |
| :------ | :------ |
| **合并依赖**      | 构建 Asset Bundle 时会将相互依赖的资源的 JSON 文件合并在一起，从而减少运行时的加载请求次数  |
| **无压缩**        | 构建 Asset Bundle 时没有任何压缩操作 |
| **合并所有 JSON** | 构建 Asset Bundle 时会将所有资源的 JSON 文件合并为一个，从而最大化减少请求数量，但可能会增加单个资源的加载时间  |
| **小游戏分包**    | 在提供了分包功能的小游戏平台，会将 Asset Bundle 设置为对应平台上的分包。 |
| **Zip**          | 在部分小游戏平台，构建 Asset Bundle 时会将资源文件压缩成一个 Zip 文件，从而减少运行时的加载请求数量  |

如果开发者在不同平台对 Asset Bundle 设置了不同的压缩类型，那么在构建时将根据对应平台的设置来构建 Asset Bundle。

## Asset Bundle 的构建

在构建时，配置为 Asset Bundle 的文件夹中的资源（包含场景、代码和其他资源）以及文件夹外的相关依赖资源都会被合并到同一个 Asset Bundle 文件夹中。比如场景 A 放在 a 文件夹中，当 a 文件夹配置为 Asset Bundle 后，场景 A 以及它所依赖的资源都会被合并到 Asset Bundle a 文件夹中。

配置为 Asset Bundle 的文件夹中的所有 **代码** 和 **资源**，会进行以下处理：

- **代码**：文件夹中的所有代码会根据发布平台合并成一个 `index.js` 或 `game.js` 的入口脚本文件。
- **资源**：文件夹中的所有资源以及文件夹外的相关依赖资源都会放到 `import` 或 `native` 目录下。
- **资源配置**：所有资源的配置信息包括路径、类型、版本信息都会被合并成一个 `config.json` 文件。

构建后生成的 Asset Bundle 目录结构如下图所示：

![export](bundle/exported.png)

构建完成后，这个 Asset Bundle 文件夹会被打包到对应平台发布包目录下的 **assets** 文件夹中。但有以下两种特殊情况：
- 配置 Asset Bundle 时，若勾选了 **配置为远程包**，则这个 Asset Bundle 文件夹会被打包到对应平台发布包目录下的 **remote** 文件夹中。
- 配置 Asset Bundle 时，若设置了 **压缩类型** 为 **小游戏分包**，则这个 Asset Bundle 文件夹会被打包到对应平台发布包目录下的 **subpackages** 文件夹中。

**assets**、**remote**、**subpackages** 这三个文件夹中包含的每个文件夹都是一个 Asset Bundle。

例如：将 example 工程中的 **cases/01_graphics** 文件夹在 Web Mobile 平台配置为 Asset Bundle，那么项目构建后将会在发布包目录下的 **assets** 中生成 **01_graphics** 文件夹，**01_graphics** 文件夹就是一个 Asset Bundle。

![asset-bundle](./subpackage/asset-bundle.png)

### Asset Bundle 中的脚本

Asset Bundle 支持脚本分包。如果开发者的 Asset Bundle 中包含脚本文件，则所有脚本会被合并为一个 js 文件。在加载 Asset Bundle 时，就会去加载这个 js 文件。

**注意**：
1. 有些平台不允许加载远程的脚本文件，例如微信小游戏，在这些平台上，Creator 会将 Asset Bundle 的代码拷贝到 `src/bundle-scripts` 目录下，从而保证正常加载。
2. 不同 Asset Bundle 中的脚本建议最好不要互相引用，否则可能会导致在运行时找不到对应脚本。如果需要引用某些类或变量，可以将该类和变量暴露在一个你自己的全局命名空间中，从而实现共享。

## 加载 Asset Bundle

引擎提供了一个统一的 API `assetManager.loadBundle` 来加载 Asset Bundle，加载时需要传入 Asset Bundle 配置面板中的 **Bundle 名称** 或者 Asset Bundle 的 **url**。但当你复用其他项目的 Asset Bundle 时，则只能通过 **url** 进行加载。使用方法如下：

```typescript
assetManager.loadBundle('01_graphics', (err, bundle) => {
    bundle.load('xxx');
});

// 当复用其他项目的 Asset Bundle 时
assetManager.loadBundle('https://othergame.com/remote/01_graphics', (err, bundle) => {
    bundle.load('xxx');
});
```

`assetManager.loadBundle` 还支持传入用户空间中的路径来加载用户空间中的 Asset Bundle。通过对应平台提供的下载接口将 Asset Bundle 提前下载到用户空间中，然后再使用 `loadBundle` 进行加载，开发者就可以完全自己管理 Asset Bundle 的下载与缓存过程，更加灵活。例如：

```typescript
// 提前下载某个 Asset Bundle 到用户空间 pathToBundle 目录下。需要保证用户空间下的 Asset Bundle 和对应原始 Asset Bundle 的结构和内容完全一样
// ...

// 通过 Asset Bundle 在用户空间中的路径进行加载
// 原生平台
assetManager.loadBundle(jsb.fileUtils.getWritablePath() + '/pathToBundle/bundleName', (err, bundle) => {
    // ...
});

// 微信小游戏平台
assetManager.loadBundle(wx.env.USER_DATA_PATH + '/pathToBundle/bundleName', (err, bundle) => {
    // ...
});
```

**注意**：在配置 Asset Bundle 时，若勾选了 **配置为远程包**，那么构建时请在 **构建发布** 面板中填写 **资源服务器地址**。

在通过 API 加载 Asset Bundle 时，引擎并没有加载 Asset Bundle 中的所有资源，而是加载 Asset Bundle 的 **资源清单**，以及包含的 **所有脚本**。<br>
当 Asset Bundle 加载完成后，会触发回调并返回错误信息和 `AssetManager.Bundle` 类的实例，这个实例就是 Asset Bundle API 的主要入口，开发者可以使用它去加载 Asset Bundle 中的各类资源。

### Asset Bundle 的版本

Asset Bundle 在更新上延续了 Creator 的 MD5 方案。当你需要更新远程服务器上的 Asset Bundle 时，请在 **构建发布** 面板中勾选 **MD5 Cache** 选项，此时构建出来的 Asset Bundle 中的 `config.json` 文件名会附带 Hash 值。如图所示：

![md5 cache](subpackage/bundle_md5.png)

在加载 Asset Bundle 时 **不需要** 额外提供对应的 Hash 值，Creator 会在 `settings.json` 中查询对应的 Hash 值，并自动做出调整。<br>
但如果你想要将相关版本配置信息存储在服务器上，启动时动态获取版本信息以实现热更新，你也可以手动指定一个版本 Hash 值并传入 `loadBundle` 中，此时将会以传入的 Hash 值为准：

```typescript
assetManager.loadBundle('01_graphics', {version: 'fbc07'}, function (err, bundle) {
    if (err) {
        return console.error(err);
    }
    console.log('load bundle successfully.');
});
```

这样就能绕过缓存中的老版本文件，重新下载最新版本的 Asset Bundle。

## 加载 Asset Bundle 中的资源

在 Asset Bundle 加载完成后，返回了一个 `AssetManager.Bundle` 类的实例。我们可以通过实例上的 `load` 方法来加载 Asset Bundle 中的资源，此方法的参数与 `resources.load` 相同，只需要传入资源相对 Asset Bundle 的路径即可。但需要注意的是，路径的结尾处 **不能** 包含文件扩展名。

```typescript
// 加载 Prefab
bundle.load(`prefab`, Prefab, function (err, prefab) {
    let newNode = instantiate(prefab);
    director.getScene().addChild(newNode);
});

// 加载 Texture
bundle.load(`image/texture`, Texture2D, function (err, texture) {
    console.log(texture)
});
```

与 `resources.load` 相同，`load` 方法也提供了一个类型参数，这在加载同名资源或者加载 SpriteFrame 时十分有效。

```typescript
// 加载 SpriteFrame
bundle.load(`image/spriteFrame`, SpriteFrame, function (err, spriteFrame) {
    console.log(spriteFrame);
});
```

### 批量加载资源

Asset Bundle 提供了 `loadDir` 方法来批量加载相同目录下的多个资源。此方法的参数与 `resources.loadDir` 相似，只需要传入该目录相对 Asset Bundle 的路径即可。

```typescript
// 加载 textures 目录下的所有资源
bundle.loadDir("textures", function (err, assets) {
    // ...
});

// 加载 textures 目录下的所有 Texture 资源
bundle.loadDir("textures", Texture2D, function (err, assets) {
    // ...
});
```

### 加载场景

Asset Bundle 提供了 `loadScene` 方法用于加载指定 bundle 中的场景，你只需要传入 **场景名** 即可。<br>
`loadScene` 与 `director.loadScene` 不同的地方在于 `loadScene` 只会加载指定 bundle 中的场景，而不会运行场景，你还需要使用 `director.runScene` 来运行场景。

```typescript
bundle.loadScene('test', function (err, scene) {
    director.runScene(scene);
});
```

## 获取 Asset Bundle

当 Asset Bundle 被加载过之后，会被缓存下来，此时开发者可以使用 Asset Bundle 名称来获取该 bundle。例如：

```typescript
let bundle = assetManager.getBundle('01_graphics');
```

## 预加载资源

除了场景，其他资源也可以进行预加载。预加载的加载参数和正常加载时一样，不过因为预加载只会去下载必要的资源，并不会进行资源的反序列化和初始化工作，所以性能消耗更小，更适合在游戏过程中使用。

Asset Bundle 中提供了 `preload` 和 `preloadDir` 接口用于预加载 Asset Bundle 中的资源。具体的使用方式和 `assetManager` 一致，详情可参考文档 [预加载与加载](preload-load.md)。

## 释放 Asset Bundle 中的资源

在资源加载完成后，所有的资源都会被临时缓存到 `assetManager` 中，以避免重复加载。当然，缓存中的资源也会占用内存，有些资源如果不再需要用到，可以通过以下三种方式进行释放：

1. 使用常规的 `assetManager.releaseAsset` 方法进行释放。

    ```typescript
    bundle.load(`image/spriteFrame`, SpriteFrame, function (err, spriteFrame) {
        assetManager.releaseAsset(spriteFrame);
    });
    ```

2. 使用 Asset Bundle 提供的 `release` 方法，通过传入路径和类型进行释放，只能释放在 Asset Bundle 中的单个资源。参数可以与 Asset Bundle 的 `load` 方法中使用的参数一致。

    ```typescript
    bundle.load(`image/spriteFrame`, SpriteFrame, function (err, spriteFrame) {
        bundle.release(`image`, SpriteFrame);
    });
    ```

3. 使用 Asset Bundle 提供的 `releaseAll` 方法，此方法与 `assetManager.releaseAll` 相似，`releaseAll` 方法会释放所有属于该 bundle 的资源（包括在 Asset Bundle 中的资源以及其外部的相关依赖资源），请慎重使用。

    ```typescript
    bundle.load(`image/spriteFrame`, SpriteFrame, function (err, spriteFrame) {
        bundle.releaseAll();
    });
    ```

**注意**：在释放资源时，Creator 会自动处理该资源的依赖资源，开发者不需要对其依赖资源进行管理。

更多资源释放相关的内容，可参考文档 [资源释放](./release-manager.md)。

## 移除 Asset Bundle

在加载了 Asset Bundle 之后，此 bundle 会一直存在整个游戏过程中，除非开发者手动移除。当手动移除了某个不需要的 bundle，那么此 bundle 的缓存也会被移除，如果需要再次使用，则必须再重新加载一次。

```typescript
let bundle = assetManager.getBundle('bundle1');
assetManager.removeBundle(bundle);
```

**注意**：在移除 Asset Bundle 时，并不会释放该 bundle 中被加载过的资源。如果需要释放，请先使用 Asset Bundle 的 `release` / `releaseAll` 方法：

```typescript
let bundle = assetManager.getBundle('bundle1');
// 释放在 Asset Bundle 中的单个资源
bundle.release(`image`, SpriteFrame);
assetManager.removeBundle(bundle);

let bundle = assetManager.getBundle('bundle1');
// 释放所有属于 Asset Bundle 的资源
bundle.releaseAll();
assetManager.removeBundle(bundle);
```

## Bundle 资源过滤

资源过滤可以将选中的 Bundle 内的某些资源包括或者排除在 Bundle 内。

![D:\Develop\creator-docs\zh\asset\bundle](./bundle/filter.png)

### 过滤类型

过滤类型目前有两种，**Asset** 资源以及 **URL**。默认为 **URL**。

![filter-type](./bundle/filter-type.png)

- **Asset**：将资源作为过滤的类型，从 **资源管理器** 拖拽或者点击右侧的 ![lock.png](./bundle/lock.png) 图标从下拉菜单中选择资源，每次仅可以选择一个（或一个目录）。
- **URL**：根据后面的过滤规则过滤 Bundle 中的资源。过滤规则目前分为 4 种，分别为 **Glob 表达式**、**以 ... 开头**、**以 ... 结尾** 和 **包含 ...**。选择好过滤规则以后，在右侧的输入框内，输入对应的字符串来过滤对应的资源。

    ![filter-rule.png](./bundle/filter-rule.png)

| 规则 | 说明 |
| :---| :---|
| **Glob 表达式** | Glob 是一种类似正则的表达式，可以参考 [npm](https://www.npmjs.com/package/glob) 文档 |
| **以 ... 开头** | 过滤出以右侧输入框内内容为开头的资源 |
| **以 ... 结尾** | 过滤出以右侧输入框内内容为结尾的资源 |
| **包含 ...** | 过滤出包含右侧输入框内内容的资源 |

点击右侧的 “+” 号按钮可以添加新的过滤规则，“-” 将删除选中的规则，无选中时最后一个添加的规则。

### 包含

按照上述规则添加在 **包含** 规则内的资源将包含在 Bundle 内。

### 排除

按照上述规则添加在 **排除** 规则内的资源将 **不会** 包含在 Bundle 内。

### 预览

点击预览可以查看当前选中的 Bundle 内最终有哪些资源会打包进入 Bundle。

## 构建 Bundle

如果只是想更新某些 Bundle 而不是对整个游戏进行打包，引擎自 v3.8 开始提供了更方便的构建 Bundle 功能。

在 **属性检查器** 的下方找到 **构建 Bundle** 点击该按钮会弹出构建面板。

![bundle-build.png](./bundle/bundle-build.png)

必须拥有至少一个构建任务，才可以构建 Bundle。点击面上上的 **打开构建面板** 来创建新的构建任务。

![build-task.png](./bundle/build-task.png)

创建完成后，该面板才可以进行操作。

![build-budle-withtask.png](./bundle/build-budle-withtask.png)

通过下拉菜单 找到要构建的 bundle，点击 **构建** 按钮， 该 Bundle 会自动构建到 **发布路径** 内。

![select-bundle.png](./bundle/select-bundle.png)

**发布路径** 有两种：

![build-path.png](./bundle/build-path.png)

- file：选择要输出的绝对地址
- project：相对于项目目录下的相对路径

![select-open.png](./bundle/select-open.png)

点击右侧的选择路径 ![select.png](./bundle/select.png) 可以将 Bundle 发布到不同的位置，或者待构建完成后点击 ![open.png](./bundle/open.png) 可以定位到 Bundle 的输出目录。

通过 **发布配置** 右侧的列表，勾选该 Bundle 要发布的平台极其配置。

![task.png](./bundle/task.png)

点击 **构建按钮** 后开始构建，期间可以点击 **取消** 按钮取消构建任务。

![building.png](./bundle/building.png)

该面板的设计目的是针对较大的项目，或者某些耗时的 Bundle，开发者可以单独对其进行打包。例如要热更新某个包。可以有效的降低打包耗时。

## FAQ

- **Q**：Asset Bundle 与 v2.4 之前的资源分包有什么区别？
  **A**：
    1. 资源分包实际上是将一些图片和网格拆分出去单独放在一个包内，但这个包是不完整的、无逻辑的，无法复用。<br>
    Asset Bundle 是通过逻辑划分对资源进行模块化。Asset Bundle 中包含资源、脚本、元数据和资源清单，所以 Asset Bundle 是完整的、有逻辑的、可复用的，我们可以从 Asset Bundle 中加载出整个场景或其他任何资源。Asset Bundle 通过拆分，可以极大减少首包中的 json 数量以及 `settings.json` 的大小。<br><br>

    2. 资源分包本质上是由小游戏平台控制的一项基础功能。例如微信小游戏支持分包功能，Creator 就在此基础上做了一层封装，帮助开发者设置资源分包，如果微信小游戏不支持分包功能了，则 Creator 也不支持。<br>
    Asset Bundle 则完全由 Creator 设计实现，是一个帮助开发者对资源进行划分的模块化工具，与游戏平台无关，理论上可支持所有平台。<br><br>

    3. 资源分包与平台相关，意味着需要按照平台要求的方式设置，比如微信小游戏的分包无法放在远程服务器上，只能放在腾讯的服务器上。<br>
    而 Asset Bundle 不受这些限制，Asset Bundle 可以放在本地、远程服务器，甚至就放在微信小游戏的分包中。<br><br>

- **Q**：Asset Bundle 是否支持大厅加子游戏的模式？
  **A**：支持，子游戏的场景可以放在 Asset Bundle 中，在需要时加载。<br><br>

- **Q**：Asset Bundle 可以减少 `settings.json` 的大小吗？
  **A**：当然可以。实际上从 v2.4 开始，打包后的项目完全是基于 Asset Bundle 的，`settings.json` 不再存储跟资源相关的任何配置信息，所有的配置信息都会存储在每个 Asset Bundle 的 `config.json` 中。每一个 `config.json` 只存储各自 Asset Bundle 中的资源信息，也就减小了首包的包体。可以简单地理解为所有的 `config.json` 加起来等于之前的 `settings.json`。<br><br>

- **Q**：Asset Bundle 支持跨项目复用吗
  **A**：目前版本支持，但我们**不建议跨项目复用**，随着引擎的更新迭代，这可能会产生各类兼容性问题。在目前跨项目复用需要满足以下条件：
    1. 引擎版本相同。
    2. Asset Bundle 中引用到的所有脚本都要放在 Asset bundle 下。
    3. Asset Bundle 没有其他外部依赖 bundle，如果有的话，必须加载。
    4. Asset Bundle 之间尽可能不复用脚本<br><br>

- **Q**：Asset Bundle 支持分离首场景吗
  **A**：目前仅在部分平台支持。你可以在 **构建发布** 面板中勾选 **初始场景分包**，则首场景会被放到内置 Asset Bundle 的 `start-scene` 中，从而实现分离首场景。<br><br>

- **Q**：Asset Bundle 支持嵌套设置吗？比如 A 文件夹中有 B 文件夹，A 和 B 都可以设置为 Asset Bundle？
  **A**：Asset Bundle 不支持嵌套。<br><br>

- **Q**: 为什么在 Asset Bundle 内放置图集可能会引起包体变大？
  **A**：Asset Bundle 和最早之前的 resources 文件的放置规则是类似的，**当图集放置在其中时，则默认图集本身代表的资源 SpriteAtlas、图集大图 Image、图集文件夹内的小图 Image 资源等等都可能被脚本加载，按照既定规则会将 Bundle 内包含的所有资源都打包出来**。因而不建议直接将图集放在 Bundle 内，而是通过 Bundle 内资源对其的引用来自然的打包到最终的 Asset Bundle 内。目前在图集资源上有开放了一些剔除的配置，实在需要放置在 Bundle 文件夹内的，可以根据需要进行配置。
