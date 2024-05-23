# 扩展面板

在实现一个功能的同时，很可能需要界面上的 UI 交互，Cocos Creator 3.0 也提供了扩展功能。

## 在扩展里声明面板

在 `package.json` 里可以定义 panels 字段：

```json
{
    "name": "hello-world",
    "panels": {
        "default": {
            "title": "world panel",
            "type": "dockable",
            "main": "./panels/default.js",
            "icon": "./static/default.png"
        },
        "list": {
            "title": "world list",
            "type": "simple",
            "main": "./panels/list.js",
            "icon": "./static/list.png",

            "flags": {},
            "size": {}
        }
    }
}
```

这个字段是个 object，定义如下：

```typescript
// panels 定义
interface PanelMap {
    [name: string]: PanelInfo;
}

// 每个 panel 的定义
interface PanelInfo {
    // 面板标题，支持 i18n:key 格式
    title: string;
    // 面板入口，一个相对路径
    main: string;
    // 面板图标，一个相对路径
    icon?: string;
    // 面板类型，默认 dockable
    type?: 'dockable' | 'simple';

    flags?: PanelFlags;
    size?: PanelSize;
}

// panel 里的一些标记
interface PanelFlags {
    // 是否允许缩放，默认 true
    resizable?: boolean;
    // 是否需要保存，默认 false
    save?: boolean;
}

// panel 的一些尺寸限制
interface PanelSize {
    width?: number;
    height?: number;
    'min-width'?: number;
    'min-height'?: number;
}
```

## 编写面板

上面我们注册的时候定义了 panel 入口文件 `panels/default.js`：

```javascript
'use strict';

// 监听面板事件
exports.listeners = {
    // 面板显示的时候触发的钩子
    show() {},
    // 面板隐藏的时候触发的钩子
    hide() {},
};

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

// 面板准备关闭的时候会触发的函数，return false 的话，会终止关闭面板
exports.beforeClose = function() {};

// 面板关闭后的钩子函数
exports.close = function() {};
```

另外我们还定义了一个 list 面板，也需要按照上面的格式编写一个 `list.js` 文件。
