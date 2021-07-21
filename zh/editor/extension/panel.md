# 面板结构

## 面板定义

依然是在 `package.json` 里定义面板，面板定义字段为 `panels`。面板定义分为两种：

1. 默认面板，用 `default` 字段声明。
2. 任意名面板，用自定义面板名字符声明。例如下方的 `list` 面板，面板名为 `world list`。

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

## 参数字段

```ts
// 每个 panel 的定义
interface PanelInfo {
    // 面板标题。支持 i18n:key 格式
    title: string;
    // 面板入口脚本。扩展相对路径
    main: string;
    // 面板图标。扩展相对路径
    icon?: string;
    // 面板类型。'dockable'：可悬停于其他面板。'simple'：不可悬停于其他面板。默认 dockable
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

## 面板入口文件结构

面板入口文件 `panels/default.js` 结构如下：

```javascript
'use strict';

// html 文本
exports.template = '';
// 样式文本
exports.style = '';
// 渲染后 html 选择器
exports.$ = {};
// 面板上的方法
exports.methods = {};
// 面板上触发的事件
exports.listeners = {};

// 当面板渲染成功后触发
exports.ready = async function() {};
// 尝试关闭面板的时候触发
exports.beforeClose = async function() {};
// 当面板实际关闭后触发
exports.close = async function() {};
```

另外我们还定义了一个 list 面板，也需要按照上面的格式编写一个 `list.js` 文件。

### 参数说明

#### template

界面结构编辑分为以下两种方法：

1. 直接通过 html 字符串编辑，例如：

    ```javascript
    exports.template = `
    <header>
        Header
    </header>
    <section class="test">
        Section
    </section>
    `;
    ```

2. 直接读取一个 html 文件：

    ```javascript
    const { readFileSync } = require('fs');
    const { join } = require('path');
    exports.template = readFileSync(join(__dirname, './panels/default.html'), 'utf8');
    ```

当定义好 template 后，面板被打开的时候，将自动把 template 的内容渲染到界面上。

此外编辑器也提供了一些 custom element，可以参考 [UI 组件](./ui.md) 使用。

#### style

有了面板之后，通常还会对面板进行布局，让面板看过去更加的美观。此时，就需要使用到 style 了。style 和 template 一样是一个字符串，可以通过两种方式定义：

1. 直接通过字符串编写样式

    ```javascript
    exports.style = `
    header { padding: 10px; }
    `;
    ```

2. 可以读取一个 css 文件：

    ```javascript
    const { readFileSync } = require('fs');
    const { join } = require('path');
    exports.style = readFileSync(join(__dirname, '../static/default.css'), 'utf8');
    ```

#### $

这是一个 html 元素选择器，直接调用 querySelector 查找到指定元素后，作为一个快捷方式使用。

```javascript
exports.$ = {
    header: 'header',
    test: '.test',
};
```

首先定义好选择器，编辑器会在 template 渲染完成后，自动调用 document.querySelector 找到对应的元素，并挂在 this.$ 上：

```javascript
exports.ready = function() {
    console.log(this.$.header); // <header>
    console.log(this.$.test); // <section class="test">
}
```

#### listeners

基础的布局完成后，我们有时候需要根据一些情况，去更新一些面板上的状态，这时候就需要使用 listeners 功能了。

```javascript
exports.listeners = {
    /**
     * 面板隐藏的时候触发
     */
    hide() {
        console.log(this.hidden);
    },
    /**
     * 面板显示的时候触发
     */
    show() {
        console.log(this.hidden);
    },
    /**
     * 面板大小更改的时候触发
     */
    resize() {
        console.log(this.clientHeight);
        console.log(this.clientWidth);
    },
};
```

#### methods

面板上定义的方法。面板对外的功能都需要封装成方法，以函数为单位对外提供。消息也可以直接触发面板上的方法，详细请参考 [消息系统](./messages.md)

这个对象里都是函数，请不要挂载其他类型的对象到这里。

```javascript
exports.methods = {
    open() {
        console.log('initData');
    },
};
```

#### ready

生命周期函数。当面板启动完成的时候，将会触发这个生命周期函数。

#### beforeClose

生命周期函数。当面板尝试被关闭的时候，将会触发这个函数，beforeClose 可以是一个 async 函数，可以进行异步判断，如果 return false，则会终止当前的关闭操作。

请不要在这个函数里执行实际的销毁和关闭相关的逻辑代码，这一步骤只是进行询问，实际的销毁请放到 close 函数里。

**请谨慎使用** 如果判断错误，可能导致编辑器或者面板窗口无法正常关闭。

#### close

生命周期函数。当窗口内的所有面板允许关闭后，会触发面板的 close，一旦触发 close，结束后将强制关闭窗口，所以请在 close 进行数据的保存，如果出现异常关闭，请做好数据的备份，以便在重新启动的时候尽可能恢复数据。

## 打开面板

面板开启的方式分为两种：

1. 默认面板开启（面板上定义的字段为 `default`）：**Editor.Panel.open('hello-world');**
2. 自定义面板字段面板开启（例如：面板上定义的字段为 'list'）：**Editor.Panel.open('hello-world.list');**。
