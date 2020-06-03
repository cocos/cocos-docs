# v2.4 定制项目构建流程升级指南

> 文：Santy-Wang

> 本文将详细介绍旧版本 Creator 项目升级到 v2.4 时的注意事项。如果你使用的不是 Creator 旧版本或项目中没有定制过项目构建流程，则不需要阅读本文。

在 v2.4 之前的 [定制项目构建流程](https://github.com/cocos-creator/creator-docs/blob/e02ac31bab12d3ee767c0549050b0e42bd22bc5b/zh/publish/custom-project-build-template.md) 文档中，我们有提到使用扩展包注册 `build-start`，`before-change-files`，`build-finished` 事件来定制项目流程，随着 Asset Bundle 功能的推出，项目构建流程进行了调整，事件回调时传入的参数进行了改动。

对 **美术策划** 而言，项目中的所有资源，例如场景、动画、Prefab 都不需要修改，也不用升级。<br>
对 **程序** 而言，影响主要体现在需要修改扩展包中注册事件的回调函数。

## 常见问题

### 我需要手动升级吗？

如果有下列情况，你需要升级：
 - 你在扩展包的代码中注册了 `before-change-files`，`build-finished` 事件定制项目流程。

## 升级步骤

- 重命名旧版本的插件扩展包。这样新旧两个版本就能共存。
- 打开代码编辑器，进行代码升级。

### 参数变化 

事件回调时传入的参数 `options` 中 **不再有** `buildResults`，而是提供一个 `bundles` 数组。

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
        // 获得工程中的资源相对 URL（如果是自动图集生成的图片，由于工程中不存在对应资源，将返回空）
        var url = Editor.assetdb.uuidToUrl(uuid);
        // 获取资源类型
        var type = buildResults.getAssetType(uuid);
        // 获得工程中的资源绝对路径（如果是自动图集生成的图片，同样将返回空）
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
            // 获得工程中的资源相对 URL（如果是自动图集生成的图片，由于工程中不存在对应资源，将返回空）
            var url = Editor.assetdb.uuidToUrl(uuid);
            // 获取资源类型
            var type = buildResults.getAssetType(uuid);
            // 获得工程中的资源绝对路径（如果是自动图集生成的图片，同样将返回空）
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