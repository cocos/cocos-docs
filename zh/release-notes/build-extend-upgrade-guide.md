# v2.4 定制项目构建流程升级指南

> 文：Santy-Wang、Xunyi

本文将详细介绍定制过项目构建流程的旧项目升级到 v2.4 时的注意事项。从 v2.4 开始，我们对项目构建流程做出了一些调整，事件回调时传入的参数也做了一定的改动。如果开发者在 v2.4 之前，有根据文档 [定制项目构建流程](https://github.com/cocos/cocos-docs/blob/e02ac31bab12d3ee767c0549050b0e42bd22bc5b/zh/publish/custom-project-build-template.md) 对项目进行过扩展，注册了 `before-change-files`、`build-finished` 事件来定制项目构建流程，那么：

- 对 **美术策划** 而言，项目中的所有资源，例如场景、动画、Prefab 都不需要修改，也不用升级。
- 对 **程序** 而言，影响主要体现在需要修改扩展包中注册事件的回调函数的参数。

## 升级步骤

- 备份旧项目的插件扩展包。
  - 全局（所有项目）插件扩展包位于 `C:\Users\用户\.CocosCreator\packages` 目录（Windows）或者 `用户/.CocosCreator/packages` 目录（Mac）。
  - 单个项目专用插件扩展包位于项目的 `packages` 目录下。
- 打开代码编辑器，进行代码升级。

### 参数变化

事件回调时传入的参数 `options` 中 **不再有** `buildResults`，而是提供了一个 `bundles` 数组。

```js
// 修改前
function onBeforeBuildFinish (options, callback) {
    var prefabUrl = 'db://assets/cases/05_scripting/02_prefab/MonsterPrefab.prefab';
    var prefabUuid = Editor.assetdb.urlToUuid(prefabUrl);

    // 通过 options.buildResults 访问 BuildResults
    var buildResults = options.buildResults;
    // 获得指定资源依赖的所有资源
    var depends = buildResults.getDependencies(prefabUuid);

    for (var i = 0; i < depends.length; ++i) {
        var uuid = depends[i];
        // 获得项目中的资源相对 URL（如果是自动图集生成的图片，由于项目中不存在对应资源，将返回空）
        var url = Editor.assetdb.uuidToUrl(uuid);
        // 获取资源类型
        var type = buildResults.getAssetType(uuid);
        // 获得项目中的资源绝对路径（如果是自动图集生成的图片，同样将返回空）
        var rawPath = Editor.assetdb.uuidToFspath(uuid);
        // 获得构建后的原生资源路径（原生资源有图片、音频等，如果不是原生资源将返回空）
        var nativePath = buildResults.getNativeAssetPath(uuid);

        Editor.log(`${prefabUrl} depends on: ${rawPath || nativePath} (${type})`);
    }

    callback();
}

// 修改后
function onBeforeBuildFinish (options, callback) {
    var prefabUrl = 'db://assets/cases/05_scripting/02_prefab/MonsterPrefab.prefab';
    var prefabUuid = Editor.assetdb.urlToUuid(prefabUrl);

    options.bundles.forEach(bundle => {
        // 通过 bundle.buildResults 访问 BuildResults
        var buildResults = bundle.buildResults;
        // 获得指定资源依赖的所有资源
        var depends = buildResults.getDependencies(prefabUuid);

        for (var i = 0; i < depends.length; ++i) {
            var uuid = depends[i];
            // 获得项目中的资源相对 URL（如果是自动图集生成的图片，由于项目中不存在对应资源，将返回空）
            var url = Editor.assetdb.uuidToUrl(uuid);
            // 获取资源类型
            var type = buildResults.getAssetType(uuid);
            // 获得项目中的资源绝对路径（如果是自动图集生成的图片，同样将返回空）
            var rawPath = Editor.assetdb.uuidToFspath(uuid);
            // 获得构建后的原生资源路径（原生资源有图片、音频等，如果不是原生资源将返回空）
            var nativePath = buildResults.getNativeAssetPath(uuid);

            Editor.log(`${prefabUrl} depends on: ${rawPath || nativePath} (${type})`);
        }
    });

    callback();
}
```

更多 `bundle` 中的对象，详细请参考 [定制项目构建流程](../publish/custom-project-build-template.md)。
