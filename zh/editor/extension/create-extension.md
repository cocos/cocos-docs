# 使用模板生成扩展

我们将通过本文学会如何利用模板创建一个含有面板的扩展，并且安装和启用这个扩展。

## 通过模板创建扩展并安装

首先我们点击顶部菜单的 **扩展 -> 创建扩展**

<img src="./image/create-extension-panel.png" alt="create-extension-panel" style="zoom:67%;" />

在这里，我们可以选择一个扩展模版，定义扩展名称、以及一些基本信息。
如图所示，我们选择了一个带有面板定义的扩展，并取名 `first-extension`，作者改为 `cocos`，扩展必须在 3.3.0 以上的编辑器运行。然后选择生成目录在项目内，并在创建后，打开所在目录。

### 构建这个扩展

扩展的开发环境是 `Node.js` 。
扩展的初始化可以参考每个插件里附带的 README 文件。如下:

```bash
# 安装依赖模块
npm install
# 构建
npm run build
```

Creator 推荐使用基于 Typescript 的工作流，Creator 内默认提供的大部分扩展模版也都是基于 Typescript。因为这样能够带上完整的代码提示。但 Typescript 需要编译后才能运行，所以需要执行 `npm run build` 进行编译。如果在开发过程中需要持续监听，可以使用 `npm run watch` 监听自动编译。
> **注意**：扩展的 `tsconfig.json` 开启了 `resolveJsonModule` ，以便通过导入了插件的 `package.json` 来获取插件名称，需要升级 typescript 到 4.3，否则会在导入 `rootDir` 目录以外的 `json` 会出现编译结果路径错误。

### 启用这个扩展

在扩展创建完成后，在 Creator 的扩展管理器里，能够找到 `first-extension` 扩展，我们可以在这个界面进行扩展的开关，重启等操作。

## 使用这个扩展的功能

扩展的用法请参考扩展的 `README` 文档。
