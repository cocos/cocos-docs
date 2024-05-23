# Custom Project Build Process

## Custom Project Build Template

Creator support custom build template to project. If the user needs to add or replace files, they only need to add a folder `build-templates` in the project path, the sub-folder in `build-templates` should named with platform. Then all the files in the folder will be copied to build path according to the folder structure.

Folder Structure: 

```js
project-folder
 |--assets
 |--build
 |--build-templates
      |--web-mobile
            // Files that users need to add, such as index.html
            |--index.html
      |--jsb-link
            // Files that users need to add, such as main.js
            |--main.js
      |--jsb-default
            // Files that users need to add, such as main.js
            |--main.js
```

Example:

If current platform is `web-mobile`, then `build-templates/web-mobile/index.html` will be copied to `build/web-mobile/index.html`.

## Extend The Build Process

In addition to the above methods, if the user wants to extend the build process, it needs to be implemented in the **package**. If you are unfamiliar with the package, you can refer to [this document](../extension/your-first-extension.md) to quickly create a new package.

Open the `main.js` script in the package and add an event handler for `Editor.Builder` in the `load` and `unload` method:

```js
// main.js

var path = require('path');
var fs = require('fs');

function onBeforeBuildFinish (options, callback) {
    Editor.log('Building ' + options.platform + ' to ' + options.dest); // you can display a log in the Console panel

    var mainJsPath = path.join(options.dest, 'main.js');  // get path of main.js in build folder
    var script = fs.readFileSync(mainJsPath, 'utf8');     // read main.js
    script += '\n' + 'window.myID = "01234567";';         // append any scripts as you need
    fs.writeFileSync(mainJsPath, script);                 // save main.js

    callback();
}

module.exports = {
    load () {
        Editor.Builder.on('before-change-files', onBeforeBuildFinish);
    },

    unload () {
        Editor.Builder.removeListener('before-change-files', onBeforeBuildFinish);
    }
};
```

In the example above, we are listening the event `'before-change-files'` on the Builder, our `onBeforeBuildFinish` handler function is invoked when the event is triggered. The following events are currently being supported:
- `'build-start'`: Trigger at start of build.
- `'before-change-files'`: Which is triggered **before** the end of the build. In addition to computing the file MD5, generating settings.js, and encryption scripts for native platform, most build operations have been completed. We usually do some further work on the files that have been built in this event.
- `'build-finished'`: Triggered when the build is completely finished.

You can register as many processing functions as you want, and when the function is called, two arguments are passed in. The first argument is an object that contains the relevant options for this build, such as the build platform, build directory, debug mode, and so on. The second argument is a callback function that you need to manually invoke after the action of the response function completes, so that the subsequent build process continues, meaning that your response function can be asynchronous.

### Get the build results

In the `'before-change-files'` and `'build-finished'` event handler, you can also get some build results from the `bundles` object. Examples are as follows:

```js
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

module.exports = {
    load () {
        Editor.Builder.on('before-change-files', onBeforeBuildFinish);
    },
    unload () {
        Editor.Builder.removeListener('before-change-files', onBeforeBuildFinish);
    }
};
```

> **Note**: as of v2.4, `buildResults` are no longer provided in `options`, but rather an array of `bundles`.

`bundles` is an array that stores information about all Asset Bundles, each of which is defined as follows:

```typescript
interface bundle {
    root: string,  // root directory of the bundle
    dest: string,  // Output directory of the bundle
    scriptDest: string, // Output directory of the script
    name: string, // Name of the bundle
    priority: number, // Priority of the bundle
    scenes: string[], // Scenes included in the bundle
    compressionType: 'subpackage'|'normal'|'none'|'merge_all_json'|'zip', // Compression type of the bundle
    buildResults: BuildResults, // The build result of bundle
    version: string, // version of the bundle, generated by the config
    config: any, // config.json file for bundle
    isRemote: boolean // Is remote bundle
}
```

The detailed API for BuildResults is as follows:

```js
class BuildResults {
    /**
     * Returns true if the asset contains in the build.
     *
     * @param {String} uuid
     * @param {Boolean} [assertContains=false]
     * @returns {Boolean}
     */
    containsAsset (uuid, assertContains) {}

    /**
     * Returns the uuids of all assets included in the build.
     *
     * @returns {String[]}
     */
    getAssetUuids () {}

    /**
     * Return the uuids of assets which are dependencies of the input, also include all indirect dependencies.
     * The list returned will not include the input uuid itself.
     *
     * @param {String} uuid
     * @returns {String[]}
     */
    getDependencies (uuid) {}

    /**
     * Get type of asset defined in the engine.
     * You can get the constructor of an asset by using `cc.js.getClassByName(type)`.
     *
     * @param {String} uuid
     * @returns {String}
     */
    getAssetType (uuid) {}

    /**
     * Get the path of the specified native asset such as texture.
     * Returns empty string if not found.
     *
     * @param {String} uuid
     * @returns {String}
     */
    getNativeAssetPath (uuid) {}

    /**
     * Get the paths of the specified native asset such as texture.
     * Returns empty array if not found.
     * 
     * This function can be used to get the native asset path stored in all compressed formats of the texture.
     *
     * @param {String} uuid
     * @returns {String[]}
     */
    getNativeAssetPaths (uuid) {}
}
```

#### Example - Traverse built textures

Link: <https://github.com/cocos-creator/demo-process-build-textures>

This project contains a build plugin that shows you how to traverse the various types of textures in your project during the build process, and then output the paths they build so that you can further process these built textures.
