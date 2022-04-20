# 编写面板

我们已经在 [package.json](./panel.md) 里写好了面板的定义，这时候就需要实现面板的逻辑功能了。

这时候就需要在 panel 定义中标识 main 入口文件，并填充其内容：

Javascript

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

Typescript

```typescript
'use strict';

// html 文本
export const template = '';
// 样式文本
export const style = '';
// 渲染后 html 选择器
export const $ = {};
// 面板上的方法
export const methods = {};
// 面板上触发的事件
export const listeners = {};

// 当面板渲染成功后触发
export async function ready() {};
// 尝试关闭面板的时候触发
export async function beforeClose() {};
// 当面板实际关闭后触发
export async function close() {};
```

如果使用的是 Typescript，这时候 ready 等函数内识别的 this 不正确，我们可以加上 this 定义：

```typescript
'use strict';

type Selector<$> = { $: Record<keyof $, HTMLElement | null> }

export const $ = {
    test: '.test',
};

export const methods = {
    update() {},
};

export async function ready(this: Selector<typeof $> & typeof methods) {
    this.update();
};
```

也可以使用 Editor.Pabel.define 常见 panel 对象：

```typescript
module.exprots = Editor.Panel.degine({
    methods: {
        update() {},
    },
    ready() {
        this.update();
    },
});
```

**Editor.Panel.define 是 3.3 新增的接口**

## template

html 字符串，例如：

Javascript

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

Typescript

```typescript
export const template = `
<header>
    Header
</header>
<section class="test">
    Section
</section>
`;
```

也可以直接读取一个 html 文件：

Javascript

```javascript
const { readFileSync } = require('fs');
const { join } = require('path');
exports.template = readFileSync(join(__dirname, '../static/default.html'), 'utf8');
```

Typescript

```typescript
import { readFileSync } from 'fs';
import { join } from 'path';
export const template = readFileSync(join(__dirname, '../static/default.html'), 'utf8');
```

当定义好 template 后，面板被打开的时候，将自动把 template 的内容渲染到界面上。

此外编辑器也提供了一些 custom element，可以参考 [UI 组件](./editor/extension/ui.md) 使用。

## style

有了 html，还需要自定义一些样式就需要使用 style 了，style 和 template 一样是一个字符串。

Javascript

```javascript
exports.style = `
header { padding: 10px; }
`;
```

Typescript

```typescript
export const style = `
header { padding: 10px; }
`;
```

当然，也可以读取一个 css 文件：

Javascript

```javascript
const { readFileSync } = require('fs');
const { join } = require('path');
exports.style = readFileSync(join(__dirname, '../static/default.css'), 'utf8');
```

Typescript

```typescript
import { readFileSync } from 'fs';
import { join } from 'path';
export const style = readFileSync(join(__dirname, '../static/default.css'), 'utf8');
```

## $

这是一个 html 元素选择器，直接调用 querySelector 查找到指定元素后，作为一个快捷方式使用。

Javascript

```javascript
exports.$ = {
    header: 'header',
    test: '.test',
};
```

Typescript

```typescript
export const $ = {
    header: 'header',
    test: '.test',
};
```

首先定义好选择器，编辑器会在 template 渲染完成后，自动调用 document.querySelector 找到对应的元素，并挂在 this.$ 上：

Javascript

```javascript
exports.ready = function() {
    console.log(this.$.header); // <header>
    console.log(this.$.test); // <section class="test">
}
```

Typescript

```typescript
export function ready() {
    console.log(this.$.header); // <header>
    console.log(this.$.test); // <section class="test">
}
```

## methods

面板上定义的方法。面板对外的功能都需要封装成方法，以函数为单位对外提供。消息也可以直接触发面板上的方法，详细请参考 [自定义消息](./contributions-messages.md)

这个对象里都是函数，请不要挂载其他类型的对象到这里。

Javascript

```javascript
const packageJSON = require('./package.json');
exports.methods = {
    open() {
        Editor.Panel.open(packageJSON.name);
    },
};
```

Typescript

```typescript
import { name } from './package.json';
export const methods = {
    open() {
        Editor.Panel.open(packageJSON.name);
    },
};
```

## listeners

基础的布局完成后，我们有时候需要根据一些情况，去更新一些面板上的状态，这时候就需要使用 listeners 功能了。

Javascript

```javascript
exports.listeners = {
    /**
     * 面板隐藏的时候触发
     */
    hide() {
        console.log(`hide: ${this.hidden}`);
    },
    /**
     * 面板显示的时候触发
     */
    show() {
        console.log(`hide: ${this.hidden}`);
    },
    /**
     * 面板大小更改的时候触发
     */
    resize() {
        console.log(`height: ${this.clientHeight}`);
        console.log(`width: ${this.clientWidth}`);
    },
};
```

Typescript

```typescript
interface PanelInfo {
    hidden: boolean;
    clientHeight: number;
    clientWidth: number;
}

export const listeners = {
    /**
     * 面板隐藏的时候触发
     */
    hide(this: PanelInfo) {
        console.log(`hide: ${this.hidden}`);
    },
    /**
     * 面板显示的时候触发
     */
    show(this: PanelInfo) {
        console.log(`hide: ${this.hidden}`);
    },
    /**
     * 面板大小更改的时候触发
     */
    resize(this: PanelInfo) {
        console.log(`height: ${this.clientHeight}`);
        console.log(`width: ${this.clientWidth}`);
    },
};
```

## ready

当面板启动完成的时候，将会触发这个生命周期函数。

## beforeClose

当面板尝试被关闭的时候，将会触发这个函数，beforeClose 可以是一个 async 函数，可以进行异步判断，如果 return false，则会终止当前的关闭操作。

请不要在这个函数里执行实际的销毁和关闭相关的逻辑代码，这一步骤只是进行询问，实际的销毁请放到 close 函数里。

**请谨慎使用** 如果判断错误，可能导致编辑器或者面板窗口无法正常关闭。

## close

当窗口内的所有面板允许关闭后，会触发面板的 close，一旦触发 close，结束后将强制关闭窗口，所以请在 close 进行数据的保存，如果出现异常关闭，请做好数据的备份，以便在重新启动的时候尽可能恢复数据。
