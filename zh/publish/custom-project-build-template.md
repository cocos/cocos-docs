# 定制项目构建流程

## 自定义发布模版

Creator 支持对每个项目分别定制发布模板，用户如果需要新增或者替换文件只需要在项目路径下添加一个 `build-templates` 目录，里面按照平台路径划分子目录。在构建结束的时候，`build-templates` 目录下所有的文件都会自动按照对应的目录结构复制到构建生成的工程里。

结构类似：

```js
project-folder
 |--assets
 |--build
 |--build-templates
      |--web-mobile
            // 用户需要添加的文件，如 index.html
            |--index.html
      |--jsb-link
            // 用户需要添加的文件，如 main.js
            |--main.js
      |--jsb-default
            // 用户需要添加的文件，如 main.js
            |--main.js
```

这样如果当前构建的平台是 **web-mobile** 的话，那么 `build-templates/web-mobile/index.html` 就会在构建后被拷贝到 `build/web-mobile/index.html`。<br>
如果当前构建的是 **Android** 平台 **jsb-link** 模版的话，那么 `build-templates/jsb-link/main.js` 就会在构建后被拷贝到 `build/jsb-link/main.js`。

## 扩展构建流程

除了以上方法，用户如果想要扩展构建流程的话，可以通过插件来实现，需要使用到 **扩展包**。如果用户对扩展包还不了解，可参考 [这篇文档](../extension/your-first-extension.md) 来快速创建一个扩展包。

本文档基于 v2.0.7 编写。若用户使用的版本是 v2.0.0 ～ v2.0.6，请参考 [旧版本文档](https://github.com/cocos-creator/creator-docs/blob/7e50ccd4aab0f1b60fcc8fe029c650b6833e63d3/zh/publish/custom-project-build-template.md#%E6%89%A9%E5%B1%95%E6%9E%84%E5%BB%BA%E6%B5%81%E7%A8%8B)。

打开扩展包中的 `main.js` 脚本，在其中的 `load` 和 `unload` 方法中加入 `Editor.Builder` 的事件处理函数：

```js
// main.js

var path = require('path');
var fs = require('fs');

function onBeforeBuildFinish (event, options) {
    Editor.log('Building ' + options.platform + ' to ' + options.dest); // 你可以在控制台输出点什么

    var mainJsPath = path.join(options.dest, 'main.js');  // 获取发布目录下的 main.js 所在路径
    var script = fs.readFileSync(mainJsPath, 'utf8');     // 读取构建好的 main.js
    script += '\n' + 'window.myID = "01234567";';         // 添加一点脚本到
    fs.writeFileSync(mainJsPath, script);                 // 保存 main.js

    event.reply();                                        // 处理完的回调
    // event.reply(new Error('错误提示'));                 // 处理失败的回调
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

上面例子中，我们监听了 Builder 的 `'before-change-files'` 的事件，当事件触发时就会调用我们的 `onBeforeBuildFinish` 处理函数。目前能监听以下这些事件：

 - `'build-start'`：构建开始时触发。
 - `'before-change-files'`：在构建结束 **之前** 触发，此时除了计算文件 MD5、生成 settings.js、原生平台的加密脚本以外，大部分构建操作都已执行完毕。我们通常会在这个事件中对已经构建好的文件做进一步处理。
 - `'build-finished'`：构建完全结束时触发。

你可以注册任意多个处理函数，当函数被调用时，将传入两个参数。第一个参数是一个事件对象，主要用来确认发送方和调用回调，也就是说你的响应函数可以是异步的，当调用完成后，可以调用 `event.reply()` 完成当前流程。第二个参数是一个对象，包含了此次构建的相关参数，例如构建的平台、构建目录、是否调试模式等。

### 获取构建结果

在 `'before-change-files'` 和 `'build-finished'` 事件的处理函数中，你还可以通过 `BuildResults` 对象获取一些构建结果。例子如下：

```js
function onBeforeBuildFinish (event, options) {
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

    // 处理完的回调
    event.reply();
        
    // 处理失败的回调
    // event.reply(new Error('错误提示'));
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

BuildResults 的详细 API 如下：

```js
class BuildResults {
    constructor () {
        this._buildAssets = null;
        this._packedAssets = null;
    }

    /**
     * Returns true if the asset contains in the build.
     *
     * @param {boolean} [assertContains=false]
     * @returns {boolean}
     */
    containsAsset (uuid, assertContains) {
        var res = uuid in this._buildAssets;
        if (!res && assertContains) {
            Editor.error(`The bulid not contains an asset with the given uuid "${uuid}".`);
        }
        return res;
    }

    /**
     * Returns the uuids of all assets included in the build.
     *
     * @returns {string[]}
     */
    getAssetUuids () {
        return Object.keys(this._buildAssets);
    }

    /**
     * Return the uuids of assets which are dependencies of the input, also include all indirect dependencies.
     * The list returned will not include the input uuid itself.
     *
     * @param {string} uuid
     * @returns {string[]}
     */
    getDependencies (uuid) {
        if (!this.containsAsset(uuid, true)) {
            return [];
        }
        return Editor.Utils.getDependsRecursively(this._buildAssets, uuid, 'dependUuids');
    }

    /**
     * Get type of asset defined in the engine.
     * You can get the constructor of an asset by using `cc.js.getClassByName(type)`.
     *
     * @param {string} uuid
     * @returns {string}
     */
    getAssetType (uuid) {
        this.containsAsset(uuid, true);
        return getAssetType(uuid);
    }

    /**
     * Get the path of the specified native asset such as texture.
     * Returns empty string if not found.
     *
     * @param {string} uuid
     * @returns {string}
     */
    getNativeAssetPath (uuid) {
        if (!this.containsAsset(uuid, true)) {
            return '';
        }
        var result = this._buildAssets[uuid];
        if (typeof result === 'object') {
            return result.nativePath || '';
        }
        return '';
    }
}
```

#### 范例 - 遍历构建后的图片

项目地址：<https://github.com/cocos-creator/demo-process-build-textures>

这个项目中包含了一个简单的构建插件，展示了如何在构建的过程中遍历项目中的各种类型的图片，并且输出它们构建后的路径，以便你对这些构建好的图片做进一步处理。
