# 面板系统

扩展默认情况下是没有界面显示的，如果一个扩展需要实现界面交互，就需要使用到面板系统相关功能。

## 面板的定义

在 `package.json` 里可以在 `panels` 字段定义一个或者多个面板，如下所示：

```json
{
    "name": "hello-world",
    "panels": {
        "default": {
            "title": "world panel",
            "type": "dockable",
            "main": "./dist/panels/default",
            "icon": "./static/default.png"
        },
        "list": {
            "title": "world list",
            "type": "simple",
            "main": "./dist/panels/list",
            "icon": "./static/list.png",

            "flags": {},
            "size": {}
        }
    }
}
```

我们定义了两个面板：`defualt` 和 `list`。`default` 为默认面板，当不指名特定面板的时候，它就做为默认操作对象。

面板各字段含义如下：
- `title`：string - 面板标题，支持 i18n:key，必填
- `main`：string - 面板源码相对目录，必填
- `icon`：string - 面板图标相对目录，必填
- `type`：string - 面板类型（dockable | simple），可选
- `flags`：{} - 标记，可选
    - resizable - 是否可以改变大小，默认 true，可选
    - save - 是否需要保存，默认 false，可选
    - alwaysOnTop - 是否保持顶层显示，默认 flase，可选
- `size`：{} - 大小信息，可选
    - min-width：Number - 最小宽度，可选
    - min-height：Number - 最小高度，可选
    - width：Number - 面板默认宽度，可选
    - height：Number - 面板默认高度，可选

## 编写面板

在扩展根目录下分别建立两个文件 `src/panels/default/index.ts` 和 `src/panels/list/index.ts`，并将下面的最简面板模板代码分别贴到两个 `index.ts` 文件中：

```typescript

module.exports = Editor.Panel.define({
    listeners: {
        show() { console.log('show'); },
        hide() { console.log('hide'); },
    },
    template: '<div>Hello</div>',
    style: 'div { color: yellow; }',
    $: {
        elem: 'div',
    },
    methods: {

    },
    ready() {

    },
    beforeClose() { },
    close() { },
});
```

`listeners` - 面板的一些事件监听
`template` - 面板的 HTML 布局文件
`stype` - 面板的 css 文件
`$` - 全局选择器，用于快速访问一些元素
`methods` - 此面板对外的方法接口
`ready` - 当面板被打开时会调用
`beforeClose` - 面板在关闭前会调用
`close` - 面板在关闭后会调用

## 显示面板

可以使用 `Editor.Panel.open` 方法打开任何面板（本扩展自己的面板以及其他扩展的面板）。

假设扩展为 `hello-world`，那以下两种方式都可以打开默认面板：

```typescript
// Editor.Panel.open('hello-world.defualt');
Editor.Panel.open('hello-world');
```

打开其它面板的方式为：

```typescript
// Editor.Panel.open('{extension-name}.panelName');
Editor.Panel.open('hello-world.list');
```

## 通信交互

Cocos Creator 扩展系统基于 Electron 的多进程方式构建，每一个扩展是一个独立的进程，扩展中的每一个面板，也是一个独立的进程。 因此，扩展与面板之间、面板与面板的交互只能通过进程间通信（IPC）实现。 详细信息请参考文档 [消息系统](./messages.md)。

### 面板向外发送消息

由于面板关闭后，进程也会退出，因此我们通常将扩展作为内存数据的载体。面板中需要用到的数据和逻辑接口一般会从扩展主进程里获取。

如果想 **查询** 和 **设置** 位于扩展主进程中的数据，假设扩展中定义了 `queryData` 和 `saveData` 两个消息，我们可以这样使用：

```typescript
const data = await Editor.Message.request(pacakgeName, 'queryData', dataName);
await Editor.Message.request(pacakgeName, 'saveData', dataName,dataValue);
```

如果想广播通知整个扩展系统，则可以利用 **广播消息** 机制实现，详细信息请参考文档 [消息系统](./messages.md)。

### 面板接收消息

```json5
// package.json
{
"contributions": {
        "messages": {
            "log": {
                "methods": ["log"]
            }
        }
    }
}
```

上面的消息定义了一个 log 消息，并由此扩展的主进程中的 log 方法处理。接下来我们稍作修改，使消息的接收方变成面板：

```json5
// package.json
{
"contributions": {
        "messages": {
            "log": {
                "methods": ["default.log"]
            }
        }
    }
}
```

`default.log` 使得消息接收方变成了 `default` 面板，只需要在面板中实现一个 `log` 方法，就能够顺利处理此消息了。

## 更好的面板资源组织方式

在上面的最简面板模板中，我们有两行面板显示相关的代码：

```typescript
module.exports = Editor.Panel.define({
    ...
    template: '<div>Hello</div>',
    style: 'div { color: yellow; }',
    ...
});
```

大部分情况下，面板布局不可能这么简单。如果继续将复杂的 HTML 布局和 css 样式写在这里，代码将变得不可维护。可以参考文档 [入门示例-面板](./first-panel.md) 中创建的项目，我们可以将 `html` 和 `css` 代码分离为独立的文件，放入 `static` 文件夹中。

最终形成的面板模板代码如下所示：

```typescript
import { readFileSync } from 'fs-extra';
import { join } from 'path';

module.exports = Editor.Panel.define({
    listeners: {
        show() { console.log('show'); },
        hide() { console.log('hide'); },
    },
    template: readFileSync(join(__dirname, '../../../static/template/default/index.html'), 'utf-8'),
    style: readFileSync(join(__dirname, '../../../static/style/default/index.css'), 'utf-8'),
    $: {
        app: '#app',
    },
    methods: {

    },
    ready() {

    },
    beforeClose() { },
    close() { },
});
```

更多面板实用详情请参考 [入门示例-面板](./first-panel.md)。
