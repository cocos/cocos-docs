# 使用模板生成扩展

我们将通过本文学会如何利用模板创建一个含有面板的扩展，并且安装和启用这个扩展。

## 通过模板创建扩展并安装

首先我们点击顶部菜单的 **扩展 -> 创建扩展**

<img src="./image/create-extension-panel.png" alt="create-extension-panel" style="zoom:67%;" />

在这里，我们可以选择一个扩展模版，定义扩展名称、以及一些基本信息。
如图所示，我们选择了一个带有面板定义的扩展，并取名 `first-extension`，作者改为 `cocos`，扩展必须在 3.3.0 以上的编辑器运行。然后选择生成目录在项目内，并在创建后，打开所在目录。

### 构建这个扩展

扩展的开发环境是 `Node.js` 。
根据扩展的 `README` 的提示，我们在扩展的目录下执行以下命令。

```bash
# 安装依赖模块
npm install
# 构建
npm run build
```

我们生成的扩展是基于 `Typescript` 开发工作流的,开发有完整的提示，我们需要在修改代码后使用 `tsc` 编译代码，编辑器只能读取编译后的js代码，所以在每次修改后需要我们在扩展执行命令 `npm run build` 编译 `ts` 代码或者使用命令 `npm run watch` 在开启监听，在代码改动时自动编译。

### 启用这个扩展

在扩展的构建完成后，我们在扩展管理器的面板中找到 `first-extension` 扩展并且启用它。


## 使用这个扩展的功能

根据扩展的 `README` 文档，我们可以知道它的用法

依次点击顶部菜单的 `面板 -> first-extension -> 默认面板` 即可打开面板。

依次点击顶部菜单的 `开发者 -> first-extension -> 发送消息给面板` 即可发送消息给默认面板，如果此时存在默认面板，将会调用面板的 `hello` 方法。

点击 `发送消息给面板` 后，根据 `package.json` 中 `contributions.menu` 的定义将发送一条消息 `send-to-panel` 给扩展。根据 `package.json` 中 `contributions.messages` 的定义当扩展收到 `send-to-panel` 后将会使 `default` 面板调用 `hello` 方法。
