# 扩展包工作流程模式

在设计和开发扩展包时，我们总是希望扩展包在我们给予一定的输入时，完成特定的工作并返回结果。这个过程可以由以下几种工作模式来完成：

## 入口程序完成全部工作

如果我们的插件不需要任何用户输入，而且只要一次性的执行一些主进程逻辑，我们可以将所有工作放在 `main.js` 的 `load` 生命周期回调里：

```js
// main.js
module.exports = {
  load () {
    let fs = require('fs');
    let path = require('path');
    // 插件加载后在项目根目录自动创建指定文件夹
    fs.mkdirSync(path.join(Editor.Project.path, 'myNewFolder'));
    Editor.success('New folder created!');
  }
}
```

如果你的插件会自动完成工作，别忘记通过 `Editor.log`, `Editor.success` 接口（上述接口可以在 [Console API](api/editor-framework/main/console.md#) 查看详情），来告诉用户刚刚完成了哪些工作。

示例中使用到的 `Editor.Project.path` 接口会返回当前打开项目的绝对路径，详情可以在 [Editor API](api/editor-framework/main/editor.md) 中找到。

这种工作模式的更推荐的变体是将执行工作的逻辑放在菜单命令后触发，如 [第一个扩展包](your-first-extension.md) 文档所示，我们在 `package.json` 里定义了 `main-menu` 字段和选择菜单项后触发的 IPC 消息，之后就可以在入口程序里监听这个消息并开始实际的业务逻辑：

```js
  messages: {
    'start' () {
      //开始工作！
    }
  }
```

关于菜单命令的声明，请参考 [扩展主菜单](extends-main-menu.md)。

## 入口程序和编辑器面板配合实现复杂交互功能

入口程序除了可以在主进程执行 [Node.js](http://nodejs.org/) 所有标准接口以外，还可以打开编辑器面板、窗口，并通过 IPC 消息在主进程的入口程序和渲染进程的编辑器面板间进行通讯，通过编辑器面板和用户进行复杂的交互，并在相关的进程中完成业务逻辑的处理。

要通过入口程序打开一个编辑器面板：

```js
  messages: {
    'open' () {
      // open entry panel registered in package.json
      Editor.Panel.open('myPackage');
    }
  }
```

其中 `myPackage` 是面板的 ID，在单面板的扩展程序中，这个面板 ID 和扩展包名是一致的。用户可以通过 `package.json` 里的 `panel` 字段声明自定义的编辑器面板。我们会在下一节的 [扩展编辑器面板](extends-panel.md) 文档中进行详细介绍。

启动面板后，在主进程和面板渲染进程间就可以通过 `Editor.Ipc.sendToPanel`，`Editor.Ipc.sendToMain` 等方法来进行进程间通讯，我们会在后面的文章中进行详细介绍。

## 插件只提供组件和资源

由于 Cocos Creator 本身采用的组件系统就有很高的扩展性和复用性，所以一些运行时相关的功能可以通过单纯开发和扩展组件的形式完成，而扩展包可以作为这些组件和相关资源（如 Prefab、贴图、动画等）的载体。通过扩展包声明字段 `runtime-resource` 可以将扩展包目录下的某个文件夹映射到项目路径下，并正确参与构建和编译等流程：

```json
//package.json
  "runtime-resource": {
    "path": "path/to/runtime-resource",
    "name": "shared-resource"
  }
```

上述声明会将 `projectPath/packages/myPackage/path/to/runtime-resource` 路径下的全部资源都映射到资源管理器中，显示为 `[myPackage]-[shared-resource]`。

这个路径下的内容（包括组件和其他资源）可以由项目中的其他场景、组件引用。使用这个工作流程，开发者可以将常用的控件、游戏架构以插件形式封装在一起，并在多个项目之间共享。

更多信息请阅读 [runtime-resource 字段参考](reference/package-json-reference.md#runtime-resource-object-)。