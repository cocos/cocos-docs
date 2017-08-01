# 第三方 JavaScript 模块引用

本文已不推荐，仅作存档，如需导入插件请使用 [插件脚本](plugin-scripts.md)。

继续前往 [JavaScript 快速入门](javascript-primer.md) 或者返回 [脚本开发](index.md)。

<hr>

如果你还不了解模块化脚本的知识，你应该先阅读[模块化脚本](./modular-script.md)文档。

目前在 Cocos Creator 中，暂时只支持对第三方 npm 模块引用，当然，如果开发者编写的脚本，符合 Node.js 的标准，也是可以被引用的。这里不深入介绍 Node.js 和 npm，放上官方文档页面大家可以自己了解：

- [Node.js modules](https://nodejs.org/api/modules.html)
- [What is npm](https://docs.npmjs.com/getting-started/what-is-npm)

## 如何使用 npm 模块

当你找到需要的 npm 模块后，第一步需要在自己的项目目录中安装该模块（以 box2dweb-commonjs 为例）：

```
> cd /path/to/project
> npm install box2dweb-commonjs
```

（这一步要确保项目的所有父级目录下都不含 `node_modules` 文件夹，否则会优先安装到父目录下）

第二步只需要在你需要使用该模块的组件脚本中 `require` 这个模块即可开始使用：

```
var box2d = require('box2dweb-commonjs');
```

这样你的游戏就能加载到第三方模块，打包过程中，第三方模块也会被一起导出。

## 注意事项

1. **仅支持纯 JavaScript 模块**：npm 中包含诸多各式各样的模块，其中有很多使用了 Node.js 的 API，这样的模块是不支持的，因为组件最终的运行环境不在 Node.js。
2. **原生环境不支持 DOM API**：众所周知，浏览器中包含大量的 DOM API，比如 jQuery 就是著名的 DOM 操作库。使用这些 API 的模块虽然可以在 HTML5 环境中运行，但却不可以在原生环境中运行，因为原生环境中不包含提供 DOM API 的页面排版引擎。
3. **注意模块嵌套依赖**：npm 中的模块常常会嵌套依赖其它模块，这种嵌套层次有可能很深，导致大量的第三方模块都被加载进来。建议发生嵌套依赖时，小心检查依赖的模块是否都符合上面两点，并且小心依赖模块过多，导致编译时间过长，游戏体积过大。

## 未来其他可能的模块依赖方式

理论上，`require` 可以用来引用任何 JavaScript 脚本。虽然目前不建议通过这种方式引用第三方模块，不过以后会做到更好的支持。

另外，很多开发者习惯在 `index.html` 中引用外部 JavaScript 脚本，甚至离线脚本。目前 Cocos Creator 并没有开放如何使用 `index.html`，开发者只能在打包后的页面文件中手动添加引用，不过我们正在研究如何提供更友好的方式让开发者定制 `index.html`。
