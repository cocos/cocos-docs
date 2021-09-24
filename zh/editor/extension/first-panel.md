# 第一个面板

[第一个扩展包](./first.md) 中介绍了怎么创建一个最简单的插件。接下来我们将在这篇文档继续学习如何创建一个面板并与之通信。

## 在描述文件 package.json 内定义面板

在使用面板之前，需要先在 `package.json` 里进行定义，增加 `"panels"` 字段，并在 `contributions.messages` 里增加一条消息 `"open-panel"`，以及一个 `"menu"`：

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

panel 字段含义可以参考 [扩展面板](./panel.md)。

### 增加 panels/default.js 面板文件

上个步骤我们在 panel 数据里定义了入口为 `panels/default.js` 文件，需要将它新建出来：

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

更多的参数请参考 [编写面板](./panel-boot.md)。

### 在 browser 上增加 openPanel 方法

接下来需要在 browser.js 的 methods 中新增一个 openPanel 方法：

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

openPanel 方法里调用了 Editor.Panel.open 方法，传入参数是 **插件名字** + **.** + **面板名**，如果是 default 则可忽略，例如：

```javascript
Editor.Panel.open('hello-world');
Editor.Panel.open('hello-world.simple');
```

## 刷新扩展

以上修改完成并保存后，再次打开 Cocos Creator，找到并打开顶部菜单栏中的 **扩展 -> 扩展管理器**，在面板上选择扩展位置（**全局** 或者 **项目**）。然后找到对应插件并点击刷新按钮，Creator 便会重新加载插件内容使之生效。

然后便可以在顶部菜单栏的 **面板 -> Custom** 中看到新增了 **Open Hello World** 按钮，点击即可打开我们创建的第一个面板。
