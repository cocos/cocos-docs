# 扩展编辑器面板

Cocos Creator 允许用户定义一份面板窗口做编辑器的 UI 交互。

## 定义方法

在插件的 package.json 文件中定义 `panel` 字段如下:

```json
{
  "name": "simple-package",
  "panel": {
    "main": "panel/index.js",
    "type": "dockable",
    "title": "Simple Panel",
    "width": 400,
    "height": 300
  }
}
```

通过定义 `panel` 字段，并申明面板 `type` 为 `dockable` 我们即可获得该份面板窗口。通过定义 `main`
字段我们可以为我们的面板窗口指定一份入口程序。

## 定义入口程序

要定义一份面板的入口程序，我们需要通过 `Editor.Panel.extend()` 函数来注册面板。如以下代码：

```javascript
// panel/index.js
Editor.Panel.extend({
  style: `
    :host { margin: 5px; }
    h2 { color: #f90; }
  `,

  template: `
    <h2>标准面板</h2>
    <ui-button id="btn">点击</ui-button>
    <hr />
    <div>状态: <span id="label">--</span></div>
  `,

  $: {
    btn: '#btn',
    label: '#label',
  },

  ready () {
    this.$btn.addEventListener('confirm', () => {
      this.$label.innerText = '你好';
      setTimeout(() => {
        this.$label.innerText = '--';
      }, 500);
    });
  },
});
```

在这份代码中，我们定义了面板的样式（style）和模板（template），并通过定义选择器 `$` 获得面板元素，最后在
ready 中对面板元素的事件进行处理。

在完成了上述操作后，我们就可以通过调用 `Editor.Panel.open('simple-package')` 激活我们的面板窗口。 关于 `Editor.Panel` 接口的用法请参考 [Panel API](api/editor-framework/main/panel.md)。

更多关于面板定义的选项，请阅读[面板定义参考](reference/panel-reference.md)。

## 在主菜单中添加打开面板选项

为了方便我们打开窗口，通常我们会将打开窗口的方法注册到主菜单中，并通过发消息给我们的插件主进程代码来完成。
要做到这些事情，我们需要在我们的 package.json 中注册主进程入口函数和主菜单选项:

```json
{
  "name": "simple-package",
  "main": "main.js",
  "main-menu": {
    "Panel/Simple Panel": {
      "message": "simple-package:open"
    }
  },
  "panel": {
    "main": "panel/index.js",
    "type": "dockable",
    "title": "Simple Panel",
    "width": 400,
    "height": 300
  }
}
```

在主进程函数中，我们做如下定义：

```javascript
'use strict';

module.exports = {
  load () {
  },

  unload () {
  },

  messages: {
    open() {
      Editor.Panel.open('simple-package');
    },
  },
};
```

一切顺利的话，你将可以通过主菜单，打开如下的面板：

![simple-panel](./assets/simple-panel.png)

更多关于面板注册的选项，请阅读[面板字段参考](reference/panel-json-reference.md)。

## 窗口面板与主进程交互

通常我们需要在窗口面板中设置一些 UI，然后通过发送 IPC 消息将任务交给主进程处理。这里我们可以通过
`Editor.Ipc` 模块来完成。在我们上面定义的 index.js 中，我们可以通过在 `ready()` 函数中处理
按钮消息来达成。

```javascript
  this.$btn.addEventListener('confirm', () => {
    Editor.Ipc.sendToMain('simple-package:say-hello', 'Hello, this is simple panel');
  });
```

当你点击按钮时，他将会给插件主进程发送 'say-hello' 消息，并附带对应的参数。你可以用任何你能想得到的前端
技术编辑你的窗口界面，还可以结合 Electron 的 内置 node 在窗口内 require 你希望的 node 模块，完成
任何你希望做的操作。
