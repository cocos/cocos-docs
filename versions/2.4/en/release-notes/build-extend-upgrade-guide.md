# v2.4 Custom Project Build Process Upgrade Guide

> Author: Santy-Wang, Xunyi

This document will detail the considerations for upgrading to v2.4 for an older project that has customized the project build process. Starting with v2.4, we have made some adjustments to the project build process, and the parameters passed in during event callbacks have also been changed. If you have extended your project before v2.4 according to the [custom-project-build process](https://github.com/cocos/cocos-docs/blob/e02ac31bab12d3ee767c0549050b0e42bd22bc5b/en/publish/custom-project-build-template.md) documentation, and registered the `before-change-files`, `build-finished` events to customize the project build process. Then:

- For the **Artist and Game Designer**, all resources in your project (e.g. scenes, animations, prefab) do not need to be modified or upgraded.
- For **Programmers**, you need to modify the parameters of the callback function for registration events in the extension package. The related content will be described in detail in this document.

## Upgrade steps

- Back up the old project's plugin extension package.
  - The global (all project) plugin extension package is located in the directory `C:\Users\Administrator\.CocosCreator\packages` (Windows) or `Users/.CocosCreator/packages` (Mac).
  - The single project specific plugin extension package is located in the `packages` directory of the project.
- Open the code editor and perform code upgrades.

### Parameter changes 

The `options` parameter passed in during the event callback **no longer** has `buildResults` in it, but instead provides an array of `bundles`.

```js
// before
function onBeforeBuildFinish (options, callback) {
    var prefabUrl = 'db://assets/cases/05_scripting/02_prefab/MonsterPrefab.prefab';
    var prefabUuid = Editor.assetdb.urlToUuid(prefabUrl);

    // Accessing BuildResults via options.buildResults
    var buildResults = options.buildResults;
    // Obtain all resources that are dependent on the specified resource
    var depends = buildResults.getDependencies(prefabUuid);

    for (var i = 0; i < depends.length; ++i) {
        var uuid = depends[i];
        // Get relative URL of assets in project
        // (Will return null for auto atlas texture because there is no raw asset associated with it in the project)
        var url = Editor.assetdb.uuidToUrl(uuid);
        // Get resource type
        var type = buildResults.getAssetType(uuid);
        // Get the absolute path of assets in the project
        // (Will also return null for auto atlas texture)
        var rawPath = Editor.assetdb.uuidToFspath(uuid);
        // Get the exported path of a native asset
        // (Native assets include texture, audio, and other types. If not native assets will return null)
        var nativePath = buildResults.getNativeAssetPath(uuid);

        Editor.log(`${prefabUrl} depends on: ${rawPath || nativePath} (${type})`);
    }

    callback();
}

// after
function onBeforeBuildFinish (options, callback) {
    var prefabUrl = 'db://assets/cases/05_scripting/02_prefab/MonsterPrefab.prefab';
    var prefabUuid = Editor.assetdb.urlToUuid(prefabUrl);

    options.bundles.forEach(bundle => {
        // Accessing BuildResults via bundle.buildResults
        var buildResults = bundle.buildResults;
        // Obtain all resources that are dependent on the specified resource
        var depends = buildResults.getDependencies(prefabUuid);

        for (var i = 0; i < depends.length; ++i) {
            var uuid = depends[i];
            // Get relative URL of assets in project
            // (Will return null for auto atlas texture because there is no raw asset associated with it in the project)
            var url = Editor.assetdb.uuidToUrl(uuid);
            // Get resource type
            var type = buildResults.getAssetType(uuid);
            // Get the absolute path of assets in the project
            // (Will also return null for auto atlas texture)
            var rawPath = Editor.assetdb.uuidToFspath(uuid);
            // Get the exported path of a native asset
            // (Native assets include texture, audio, and other types. If not native assets will return null)
            var nativePath = buildResults.getNativeAssetPath(uuid);

            Editor.log(`${prefabUrl} depends on: ${rawPath || nativePath} (${type})`);
        }
    });

    callback();
}
```

For more details on objects in `bundle`, please refer to the [Custom Project Build Process](../publish/custom-project-build-template.md) documentation.
