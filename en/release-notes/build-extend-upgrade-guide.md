# v2.4 Custom Project Build Process Upgrade Guide

> Author：Santy-Wang

> This article will detail the considerations for upgrading older Creator projects to v2.4. If you are not a user of an older version of Creator or don't have a custom project build process in your project, you don't need to read this article.

In the [custom-project-build process](https://github.com/cocos-creator/creator-docs/blob/e02ac31bab12d3ee767c0549050b0e42bd22bc5b/en/publish/custom-project-build-template.md) documentation prior to v2.4, we have mentioned the use of extensions to register `build-start`, `before-change-files`, `build-finished` events to customize the project flow, and with the introduction of the Asset Bundle feature, the project build flow has been adjusted and the parameters passed in during event callbacks have been changed.

For **Artist and Game Designer**, all resources in the project, such as scenes, animations, prefab, do not need to be modified or upgraded. <br>
For the **Programmer**, the impact is mainly in the callback function that needs to be modified for the registration event in the extension package.

## Frequently Asked Questions

### Do I need to upgrade manually?

You will need to upgrade if.
 - You registered `before-change-files`, `build-finished` event custom project flow in the code of the extension package.

## Upgrade steps

- Rename older versions of plug-in extension packs. This way the old and new versions can co-exist.
- Open the code editor and perform code upgrades.

### Parameter changes 

In the `options` of the parameters passed in the event callback **there is no longer a** `buildResults`, but an array of `bundles`.

```js
// before
function onBeforeBuildFinish (options, callback) {
    var prefabUrl = 'db://assets/cases/05_scripting/02_prefab/MonsterPrefab.prefab';
    var prefabUuid = Editor.assetdb.urlToUuid(prefabUrl);

    // accessing BuildResults via options.buildResults
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
        // accessing BuildResults via bundle.buildResults
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

For more details on objects in `bundle`, see [Custom Project Build Process](../publish/custom-project-build-template.md).