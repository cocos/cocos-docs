# 第一个面板

上文介绍了怎么创建一个最简单的插件，并进行交互。在这篇文章内，我们将学习如何创建一个面板并与之通信。

## 在描述文件 package.json 内定义面板

在使用面板之前，我们先要在 package.json 里进行定义，增加 panels 字段，并在 contributions.messages 里增加一条消息 “open-panel”，以及一个 menu：

```json
{
    "name": "hello-world",
    "version": "1.0.0",
    "main": "./browser.js",
    "description": "一份简单的扩展",
    "panels": {
        "default": {
            "title": "simple panel",
            "main": "./panels/default.js"
        }
    },
    "contributions": {
        "menu": [
            {
                "path": "Develop",
                "label": "test",
                "message": "log"
            }, {
                "path": "i18n:menu.panel/Custom",
                "label": "Open Hello World",
                "message": "open-panel"
            }
        ],
        "messages": {
            "log": {
                "methods": ["log"]
            },
            "open-panel": {
                "methods": ["openPanel"]
            }
        }
    }
}
```

panel 字段含义可以参考 [扩展面板](editor/extension/panel.md)。

### 增加 panels/default.js 面板文件

我们在 panel 数据里定义了入口为 panels/default.js 文件，我们需要将它新建出来：

```javascript
'use strict';

// 面板的内容
exports.template = '<div>Hello</div>';

// 面板上的样式
exports.style = 'div { color: yellow; }';

// 快捷选择器
exports.$ = {
    elem: 'div',
};

// 面板启动后触发的钩子函数
exports.ready = function() {
    this.$.elem.innerHTML = 'Hello World';
};

// 面板关闭后的钩子函数
exports.close = function() {};
```

template 是面板的 html 内容，style 为自定义的 style。

更多的参数请参考 [编写面板](editor/extension/panel-boot.md)。

### 在 browser 上增加 openPanel 方法

然后我们需要在 browser.js 里的 methods 里新增一个 openPanel 的方法：

```javascript
'use strict';

// 扩展内定义的方法
exports.methods = {
    log() {
        console.log('Hello World');
    },
    openPanel() {
        Editor.Panel.open('hello-world');
    },
};

// 当扩展被启动的时候执行
exports.load = function() {};

// 当扩展被关闭的时候执行
exports.unload = function() {};
```

openPanel 方法里调用了 Editor.Panel.open 方法，传入参数是插件名字 + . + 面板名，如果是 default 则可忽略，例如：

```javascript
Editor.Panel.open('hello-world');
Editor.Panel.open('hello-world.simple');
```

## 刷新扩展

现在，我们可以打开 Cocos Creator，找到并打开顶部的 **扩展 -> 扩展管理器**，在面板上选择扩展位置（全局或者项目）。然后在对应插件内，找到刷新按钮，点击一下后，Creator 会重新加载插件内容使之生效。

接着我们就可以在顶部菜单里的 **面板 -> Custom** 里找到我们新增的 **Open Hello World** 按钮了，点击后，就能够打开我们创建的第一个面板。