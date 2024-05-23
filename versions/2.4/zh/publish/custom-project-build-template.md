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

除了以上方法，用户如果想要扩展构建流程的话，可以通过插件来实现，需要使用到 **扩展包**。如果用户对扩展包还不了解，可参考 [这篇文档](../extension/your-first-extension.md) 来快速创建一个扩展包

打开扩展包中的 `main.js` 脚本，在其中的 `load` 和 `unload` 方法中加入 `Editor.Builder` 的事件处理函数：

```js
// main.js

var path = require('path');
var fs = require('fs');

function onBeforeBuildFinish (options, callback) {
    Editor.log('Building ' + options.platform + ' to ' + options.dest); // 你可以在控制台输出点什么

    var mainJsPath = path.join(options.dest, 'main.js');  // 获取发布目录下的 main.js 所在路径
    var script = fs.readFileSync(mainJsPath, 'utf8');     // 读取构建好的 main.js
    script += '\n' + 'window.myID = "01234567";';         // 添加一点脚本到
    fs.writeFileSync(mainJsPath, script);                 // 保存 main.js

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

上面例子中，我们监听了 Builder 的 `'before-change-files'` 的事件，当事件触发时就会调用我们的 `onBeforeBuildFinish` 处理函数。目前能监听以下这些事件：

 - `'build-start'`：构建开始时触发。
 - `'before-change-files'`：在构建结束 **之前** 触发，此时除了计算文件 MD5、生成 settings.js、原生平台的加密脚本以外，大部分构建操作都已执行完毕。我们通常会在这个事件中对已经构建好的文件做进一步处理。
 - `'build-finished'`：构建完全结束时触发。

你可以注册任意多个处理函数，当函数被调用时，将传入两个参数。第一个参数是一个对象，包含了此次构建的相关参数，例如构建的平台、构建目录、是否调试模式等。第二个参数是一个回调函数，你需要在响应函数所做的操作完全结束后手动调用这个回调，这样后续的其它构建过程才会继续进行，也就是说你的响应函数可以是异步的。

### 获取构建结果

在 `'before-change-files'` 和 `'build-finished'` 事件的处理函数中，你还可以通过 `bundles` 对象获取一些构建结果。例子如下：

```js
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

module.exports = {
    load () {
        Editor.Builder.on('before-change-files', onBeforeBuildFinish);
    },
    unload () {
        Editor.Builder.removeListener('before-change-files', onBeforeBuildFinish);
    }
};
```

**注意**：从 v2.4 开始，options 中不再提供 `buildResults`，而是提供了一个 `bundles` 数组。`bundles` 数组中存储了所有 Asset Bundle 的相关信息，每一个 bundle 的定义如下：

```typescript
interface bundle {
    root: string,  // bundle 的根目录
    dest: string,  // bundle 的输出目录
    scriptDest: string, // 脚本的输出目录
    name: string, // bundle 的名称
    priority: number, // bundle 的优先级
    scenes: string[], // bundle 中包含的场景
    compressionType: 'subpackage'|'normal'|'none'|'merge_all_json'|'zip', // bundle 的压缩类型
    buildResults: BuildResults, // bundle 所构建出来的所有资源
    version: string, // bundle 的版本信息，由 config 生成
    config: any, // bundle 的 config.json 文件
    isRemote: boolean // bundle 是否是远程包
}
```

`bundle.buildResults` 的详细 API 如下：

```js

class BuildResults {
    /**
     * 指定的 uuid 资源是否包含在构建资源中
     * 
     * @param {String} uuid 需要检测的资源 uuid
     * @param {Boolean} [assertContains=false] 不包含时是否打印报错信息
     * @returns {Boolean}
     */
    containsAsset (uuid, assertContains) {}

    /**
     * 返回构建资源中包含的所有资源的 uuid
     *
     * @returns {String[]}
     */
    getAssetUuids () {}

    /**
     * 获取指定 uuid 资源中的所有依赖资源，返回的列表中不包含自身
     *
     * @param {String} uuid - 指定的 uuid 资源
     * @returns {String[]}
     */
    getDependencies (uuid) {}

    /**
     * 获取指定 uuid 的资源在引擎中定义的资源类型
     * 同时可以使用 cc.js.getClassByName(type) 进行获取资源的构造函数
     *
     * @param {String} uuid - 指定的 uuid 资源
     * @returns {String}
     */
    getAssetType (uuid) {}

    /**
     * 获取指定 uuid 资源（例如纹理）的存放路径（如果找不到，则返回空字符串）
     *
     * @param {String} uuid - 指定的 uuid 资源
     * @returns {String}
     */
    getNativeAssetPath (uuid) {}

    /**
     * 获取指定 uuid 资源（例如纹理）的所有存放路径（如果找不到，则返回空数组）
     * 例如：需要获取纹理多种压缩格式的存放资源路径时，即可使用该函数
     *
     * @param {String} uuid - 指定的 uuid 资源
     * @returns {String[]}
     */
    getNativeAssetPaths (uuid) {}
}
```

#### 范例 - 遍历构建后的图片

项目地址：[GitHub](https://github.com/cocos-creator/demo-process-build-textures) | [Gitee](https://gitee.com/mirrors_cocos-creator/demo-process-build-textures)

这个项目中包含了一个简单的构建插件，展示了如何在构建的过程中遍历项目中的各种类型的图片，并且输出它们构建后的路径，以便你对这些构建好的图片做进一步处理。
