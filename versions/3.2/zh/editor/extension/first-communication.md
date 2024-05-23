# 第一次数据交互

我们在前面两篇文档 **第一个扩展包** 和 **第一个面板** 中介绍了怎么创建扩展，怎么在扩展中定义面板，接下来我们通过本篇文档来尝试一下它们之间的互相通讯。

## 在描述文件 package.json 内定义消息

首先我们需要在 `contributions.messages` 中增加一条消息 `"increasing"`，交给 browser 处理。再增加一条 `"hello-world:increasing"` 消息，交给 default 面板处理：

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
            },
            "increasing": {
                "methods": ["increasing"]
            },
            "query-num": {
                "methods": ["queryNum"]
            },
            "hello-world:increasing": {
                "methods": ["default.increasing"]
            }
        }
    }
}
```

hello-world:increasing 是指我们监听了一个 hello-world 上的 increasing 消息。"default.increasing" 指的是交给 default 面板的 "increasing" 方法处理。

panel 字段含义可以参考 [编写面板](./panel-boot.md)。

### 在 browser.js 里增加 increasing

然后需要在 `browser.js` 的 `methods` 中新增一个 `increasing` 方法，负责记录一个 `num`，并在每次触发的时候递增并广播出去：

```javascript
'use strict';

let num = 0;
// 扩展内定义的方法
exports.methods = {
    log() {
        console.log('Hello World');
    },
    openPanel() {
        Editor.Panel.open('hello-world');
    },
    queryNum() {
        return num;
    },
    increasing() {
        num++;
        Editor.Message.broadcast('hello-world:increasing', num);
    },
};

// 当扩展被启动的时候执行
exports.load = function() {};

// 当扩展被关闭的时候执行
exports.unload = function() {};
```

### 在 panel 里增加 increasing 按钮以及广播处理

接下来在界面上增加一个 **increasing** 按钮，以及展示 num 的区域和接受 num 变化的广播消息：

```javascript
'use strict';

// 面板的内容
exports.template = `
<div>Hello</div>
<div><ui-button>increasing</ui-button></div>
<div><span>Num: </span><span class="num">-</span></div>
`;

// 面板上的样式
exports.style = 'div { color: yellow; }';

// 快捷选择器
exports.$ = {
    elem: 'div',
    button: 'ui-button',
    num: '.num',
};

exports.methods = {
    increasing(num) {
        this.$.num.innerHTML = num;
    },
};

// 面板启动后触发的钩子函数
exports.ready = async function() {
    this.$.elem.innerHTML = 'Hello World';

    this.$.button.addEventListener('confirm', () => {
        Editor.Message.send('hello-world', 'increasing');
    });

    this.$.num.innerHTML = await Editor.Message.request('hello-world', 'query-num');
};

// 面板关闭后的钩子函数
exports.close = function() {};
```

## 刷新扩展

以上修改完成并保存后，再次打开 Cocos Creator，找到并打开顶部菜单栏中的 **扩展 -> 扩展管理器**，在面板上选择扩展位置（**全局** 或者 **项目**）。然后找到对应插件并点击刷新按钮，Creator 便会重新加载插件内容使之生效。

然后便可以在顶部菜单栏的 **面板 -> Custom** 中看到新增了 **Open Hello World** 选项，点击即可打开。
