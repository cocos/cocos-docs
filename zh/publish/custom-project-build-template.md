# 定制项目构建流程

## 自定义发布模版

Creator 支持对每个项目分别定制发布模板，只需要在项目路径下添加一个 `build-templates` 目录，里面按照平台路径划分子目录，然后里面的所有文件在构建结束后都会自动按照对应的目录结构复制到构建出的工程里。

结构类似：

```
project-folder
 |--assets
 |--build
 |--build-templates
      |--web-mobile
            |--index.html
      |--jsb-binary
            |--main.js
      |--jsb-default
            |--main.js
```

这样如果当前构建的平台是 `web-mobile` 的话，那么 `build-templates/web-mobile/index.html` 就会在构建后被拷贝到 `build/web-mobile/index.html`。

## 扩展构建流程

要扩展构建流程，需要在**扩展包**中实现。如果你对扩展包还不了解，可参考 [这篇文档](../extension/your-first-extension.md) 来快速创建一个扩展包。

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

上面注册的事件是 `'before-change-files'`，这个事件会在构建结束**之前**触发，此时除了计算文件 MD5、原生平台的加密脚本以外，大部分构建操作都已执行完毕。你可以在这个事件中对已经构建好的文件做进一步处理。

上面的 `onBeforeBuildFinish` 是 `'before-change-files'` 的事件响应函数。你可以注册任意多个响应函数，它们会依次执行。该函数被调用时，将传入两个参数。第一个参数是一个对象，包含了此次构建的相关参数，例如构建的平台、构建目录、是否调试模式等。第二个参数是一个回调函数，你需要在响应函数所做的操作完全结束后手动调用这个回调，这样后续的其它构建过程才会继续进行，也就是说你的响应函数可以是异步的。

此外，你可以监听的事件还有 `'build-start'` 和 `'build-finished'`，分别对应的触发时机是构建开始和完全结束，它们的用法也是一样的，这里不再赘述。
