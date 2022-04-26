# 扩展模板与编译构建

本文将详细介绍如何通过 Creator 提供的扩展模板创建一个带有面板的扩展并使用。

在编辑器主菜单上选择 **扩展 -> 创建扩展** 菜单，即可打开新建面板。

![create-extension-menu](./image/create-extension-menu.png)

![create-extension-panel](./image/create-extension-panel.png)

## 模板类型

Cocos Creator 提供了 4 种扩展模板，用于快速创建一个新的扩展项目。
- **Blank**：空扩展。
- **HTML Panel**：基于 HTML 的扩展模板，并带有一个弹出面板。
- **Vue2.x Panel**：基于 Vue2.x 的扩展模板，并带有一个弹出面板。
- **Vue3.x Panel**：基于 Vue3.x 的扩展模板，并带有一个弹出面板。

以上 4 种方式创建出来的扩展仅在工作量和技术选型上有差别，扩展可实现的能力无差别，开发者可根据自己的需求和技术背景自行选择。

> **注意**：每个模板创建出来的扩展都不一样，请在创建后参考对应扩展包目录下的 `README.md` 文件。

## 选项说明

| 扩展选项 | 功能说明 |
| :--- | :----- |
| **扩展名** | 创建的扩展名称，要求不能以 `_` 或 `.` 开头、不能含有大写字母。因为扩展名会成为 URL 的一部分，因此也不能含有 URL 的非法字符、不能含有 `.`、`'` 和 `,`。 |
| **作者** | 扩展的作者 |
| **依赖的编辑器版本** | 创建的扩展运行时要求的 Cocos Creator 版本。 |
| **扩展管理器中显示** | 若勾选该项，则扩展创建完成后，会自动打开 **扩展管理器**，并显示创建的扩展。<br>若不勾选该项，则扩展创建完成后，可点击编辑器顶部菜单栏中的 **扩展 -> 扩展管理器** 查看。 |
| **在文件夹中展示** | 若勾选该项，则扩展创建完成后会自动在系统文件管理器中打开扩展包。 |
| **扩展创建的位置** | 创建的扩展包所在目录，可选择 **项目（Project)** 或 **全局(Global)**。 |

## 扩展位置

### 项目（Project）

将扩展包应用到指定的 Cocos Creator 项目，**项目** 路径为：

- `${你的项目地址}/extensions`

### 全局（Global）

将扩展包应用到所有的 Cocos Creator 项目，**全局** 路径为：

- **Windows**：`%USERPROFILE%\.CocosCreator\extensions`

- **MacOS**：`$HOME/.CocosCreator/extensions`

> **注意**：可采用 `Editor.App.path` 打印全局路径。

## 依赖安装与编译构建

创建完成后打开扩展包所在目录，执行以下命令：

```bash
# 安装依赖模块
npm install
# 构建
npm run build
```

扩展会依赖 **Node.js** 的第三方库，所以在启用扩展之前需要先在扩展目录下执行 `npm install` 安装依赖模块才能正常编译。

TypeScript 在编写时能够带上完整的代码提示，具备更强的工程性，因此 Cocos Creator 推荐使用基于 TypeScript 的工作流。

默认提供的扩展模版也都是基于 TypeScript，需需要执行 `npm run build` 编译后才能运行。

> **注意**：扩展的 `tsconfig.json` 配置文件中开启了 `resolveJsonModule`，以便通过导入的扩展的 `package.json` 来获取扩展名称，因此 TypeScript 需要 **v4.3** 及以上版本，否则在导入根目录以外的 `json` 时会出现编译结果路径错误的问题。
