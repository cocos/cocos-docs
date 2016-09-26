# JavaScript 标准支持

Creator 使用的是标准的 JavaScript，JavaScript 目前常见的标准是几乎所有平台都支持的 ES5，如果你还想要使用更高版本的特性，需要先确认支持情况：

- 运行时部分需要考虑目标平台是否支持，幸福的是，Creator 集成了 [babel](https://babeljs.io/) 编译器，能够自动转译项目里除了插件以外的所有 JavaScript 脚本。这步操作会将一部分常用的 ES2015(ES6) 特性翻译为原生的 ES5，这样开发者就不用担心跨平台的兼容性。ES2015 入门教程及 Creator 支持的特性列表请参考 [Learn ES2015](https://babeljs.io/docs/learn-es2015/)（在这份列表中，标记为“Support via polyfill”的部分暂不支持）。

    > 转译是静态操作，不影响运行时效率，不影响源文件。

- 编辑器部分支持到常用的 ES2015。

    > 具体支持程度取决于 Creator 采用的 Node.js 引擎，截至 Creator 1.1，支持到了 Node.js 5.1.1（[详情](http://node.green/)）。<br>
    > 在 Creator 的控制台中输入 `process.versions.node` 可以显示当前的 Node.js 版本号。
