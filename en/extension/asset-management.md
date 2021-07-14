# Manage project assets

## Manage the scene

### New scene

Use the `Editor.Ipc` module to create the new scene:

`Editor.Ipc.sendToPanel('scene', 'scene:new-scene');`

### Save the current scene

After modifying the scene data, use the `Editor.Ipc` module to save the current scene:

`Editor.Ipc.sendToPanel('scene', 'scene:stash-and-save');`

### Load other scenes

Expansion packs may need to traverse multiple scenes and operate and save them sequentially. In the previous section [Call the engine API and project script](scene-script.md), the method of accessing the engine API and the user project script through the scenario script was introduced. To load a new scene, use:

```js
_Scene.loadSceneByUuid (uuid, function (error) {
    // do more work
});
```

Where `_Scene` is a special singleton that controls the scene instance loaded in the scene editor.

The incoming parameter is the uuid of the scene asset, which can be obtained by the asset manager interface described below.

## Mapping of asset URL and UUID

In the Cocos Creator editor and extension, the url of the asset is formed like this:

```
Db://assets/path/to/scene.fire
```

Where `db` is an abbreviation for AssetDB. All assets under the `asset` path in the project are imported into Asset Library and can be referenced by uuid.

In the main process of the expansion package between the url and uuid can be transformed from each other:

- `Editor.assetdb.urlToUuid (url)`
- `Editor.assetdb.uuidToUrl (uuid)`

In addition, to use the absolute path of the asset directly in the local file system, use the `fspathToUuid` and `uuidToFspath` interfaces, where `fspath` represents the absolute path.

## Manage assets

### Import assets

To import new assets into a project, use the following interfaces:

```js
// main process
Editor.assetdb.import (['/user/user/foo.js', '/User/user/bar.js'], 'db://assets/foobar', function (err, results) {
    Results.forEach (function (result) {
    // result.uuid
    // result.parentUuid
    // result.url
    // result.path
    // result.type
    });
});

// renderer process
Editor.assetdb.import ([
    '/file/to/import/01.png',
    '/file/to/import/02.png',
    '/file/to/import/03.png',
], 'Db://assets/foobar', callback);
```

### Create an asset

A common misuse of using extended package management assets is to use the [fs module](https://nodejs.org/dist/latest-v6.x/docs/api/fs.html) of the `Node.js` when the extension package needs to create new assets, so that even if the creation of the file to the `assets` directory, it can not be automatically imported by the **Assets**. The correct workflow should use the `create` interface to create the asset.

```js
// main process or renderer process
Editor.assetdb.create ('db://assets/foo/bar.js', data, function (err, results) {
    Results.forEach (function (result) {
    // result.uuid
    // result.parentUuid
    // result.url
    // result.path
    // result.type
    });
});
```

The incoming `data` is the string of the contents of the asset file. In the creation is completed automatically after the import operation of the asset, the callback can be successful in the asset manager to see the assets.

### Save existing assets

To replace the original asset using the new data, use the following interface:

```js
// main process or renderer process
Editor.assetdb.saveExists ('db://assets/foo/bar.js', data, function (err, meta) {
    // do something
});
```

If you want to check whether the asset exists before saving, use:

```js
// main process
Editor.assetdb.exists (url); // return true or false
```

In the rendering process, if given a target url, if the url points to the assets do not exist to create, the existence of assets to save the new data, you can use

```js
// renderer process
Editor.assetdb.createOrSave ('db://assets/foo/bar/foobar.js', data, callback);
```

### Refresh the asset

When the asset file has been modified in the `asset` and there is no reintroduction for some reason, the asset data in the `asset` and the asset data displayed in the database are inconsistent (if the `fs` module direct operation of the contents of the file will appear), you can manually call the asset refresh interface to re-import assets:

```js
// main process or renderer process
Editor.assetdb.refresh ('db://assets/foo/bar/', function (err, results) {});
```

### Move and delete assets

As the assets will be generated after the import of the corresponding `meta` file, so separate delete and move the asset file itself will result in data consistency in the database damage, it is recommended to use a dedicated AssetDB interface to complete these tasks:

```js
Editor.assetdb.move (srcUrl, destUrl);
Editor.assetdb.delete ([url1, url2]);
```

For more information about these interfaces, please refer to the [AssetDB API Main](api/asset-db/asset-db-main.md) and [AssetDB API Renderer](api/asset-db/asset-db-renderer.md) documentation.
