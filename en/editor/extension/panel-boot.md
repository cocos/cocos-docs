# Creating a Custom Panel

We have already written the panel definition in [package.json](./panel.md), it's time to implement the panel's logical functionality.

It is time to identify the main entry file in the panel definition and fill it with the following content.

Javascript

```javascript
'use strict';

// html text
exports.template ='';
// style text
exports.style ='';
// html selector after rendering
exports.$ = {};
// method on the panel
exports.methods = {};
// event triggered on the panel
exports.listeners = {};

// Triggered when the panel is rendered successfully
exports.ready = async function() {};
// Triggered when trying to close the panel
exports.beforeClose = async function() {};
// Triggered when the panel is actually closed
exports.close = async function() {};
```

Typescript

```typescript
'use strict';

// html text
export const template = '';
// style text
export const style = '';
// html selector after rendering
export const $ = {};
// method on the panel
export const methods = {};
// event triggered on the panel
export const listeners = {};

// Triggered when the panel is rendered successfully
export async function ready() {};
// Triggered when trying to close the panel
export async function beforeClose() {};
// Triggered when the panel is actually closed
export async function close() {};
```

If we are using Typescript, when this is not correctly identified within functions such as ready, we can add the definition of this:

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

You can also use Editor.Pabel.define for common panel objects.

```typescript
module.exports = Editor.Panel.define({
    methods: {
        update() {},
    },
    ready() {
        this.update();
    },
});
```

`Editor.Panel.define` is a new interface added in v3.3.

## template

html text, e.g.

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

It is also possible to read an HTML file directly.

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

When the `template` is defined and the panel is opened, the content of the template will be automatically rendered to the interface.

In addition, the editor also provides some custom elements, which can be used in the [UI components](./ui.md).

## style

With HTML, you need to customize some styles and use style, which is a string like template.

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

Of course, it is also possible to read a css file:

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

This is an HTML element selector that is used as a shortcut after calling `querySelector` directly to find the specified element.

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

First define the selector and the editor will automatically call `document.querySelector` after the template is rendered to find the corresponding element and hang it on `this.$`.

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

Methods defined on the panel. The external functions of the panel need to be encapsulated as methods and made available to the public as functions. Messages can also trigger methods on the panel directly, see [custom messages](./contributions-messages.md).

This object is full of functions, please don't mount other types of objects to it.

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

After the basic layout is completed, we sometimes need to update the state on some panels according to some circumstances, and this time we need to use the listeners function.

Javascript

```javascript
exports.listeners = {
    /**
     * Triggered when the panel is hidden
     */
    hide() {
        console.log(`hide: ${this.hidden}`);
    },
    /**
     * Triggered when the panel is displayed
     */
    show() {
        console.log(`hide: ${this.hidden}`);
    },
    /**
     * Triggered when the panel size is changed
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
     * Triggered when the panel is hidden
     */
    hide(this: PanelInfo) {
        console.log(`hide: ${this.hidden}`);
    },
    /**
     * Triggered when the panel is displayed
     */
    show(this: PanelInfo) {
        console.log(`hide: ${this.hidden}`);
    },
    /**
     * Triggered when the panel size is changed
     */
    resize(this: PanelInfo) {
        console.log(`height: ${this.clientHeight}`);
        console.log(`width: ${this.clientWidth}`);
    },
};
```

## ready

This life cycle function will be triggered when the panel is ready.

## beforeClose

This function will be triggered when the panel tries to be closed. beforeClose can be an async function, which can make asynchronous judgments, and if return false, it will terminate the current close operation.

Please don't execute the actual destruction and close related logic code in this function, this step is just to ask, please put the actual destruction in the close function.

**Please use with caution** If you make a mistake, the editor or panel window may not close properly.

## close

When all panels in the window are allowed to close, it will trigger the close of the panel. Once the close is triggered, the window will be forcibly closed after the end, so please save the data in the close, and if there is an abnormal close, please make a backup of the data so that the data can be restored as much as possible when restarting.
