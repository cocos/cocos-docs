# Creating a Custom Panel

How a compose panel is defnined can be found by reading the [package.json](./panel.md) documentation.

Identify the main entry file in the panel definition and fill in its content. Example:

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

## Template

An HTML string. Example:

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

It is possible to read an HTML file directly. Example:

```javascript
const {readFileSync} = require('fs');
const {join} = require('path');
exports.template = readFileSync(join(__dirname,'../static/default.html'),'utf8');
```

The template is defined, when the panel is opened, the content of the template will be automatically rendered on the interface.

In addition, the editor also provides some custom elements, please refer to the [UI](../editor/extension/ui.md) documentation.

## Style

With HTML, it is possible to customize some styles. Style is a string style template. Example:

```javascript
exports.style = `
header {padding: 10px;}
`;
```

It is also posible to read a CSS file directly. Example:

```javascript
const {readFileSync} = require('fs');
const {join} = require('path');
exports.style = readFileSync(join(__dirname,'../static/default.css'),'utf8');
```

## $

This is an HTML element selector, directly call `querySelector` to find the specified element and use it as a shortcut. Example:

```javascript
exports.$ = {
    header:'header',
    test:'.test',
};
```

First, define the selector. After the template is rendered, the editor will automatically call `document.querySelector` to find the corresponding element and hang it on `this.$`. Example:

```javascript
exports.ready = function() {
    console.log(this.$.header); // <header>
    console.log(this.$.test); // <section class="test">
}
```

## Methods

The method defined on the panel. The external functions of the panel need to be encapsulated into methods and provided externally in units of functions. Messages can also directly trigger the methods on the panel. For details, please refer to the [Message Communication](./contributions-messages.md) documentation.

This object is full of functions, do not attach other types of objects here. Example:

```javascript
const packageJSON = require('./package.json');
exports.methods = {
    open() {
        Editor.Panel.open(packageJSON.name);
    },
};
```

## Listeners

After the basic layout is completed, it is sometimes necessary to update the status on some panels according to some situations. It is necessary to use the listeners function. Example:

```javascript
exports.listeners = {
    /**
     * Triggered when the panel is hidden
     */
    hide() {
        console.log(this.hidden);
    },
    /**
     * Triggered when the panel is displayed
     */
    show() {
        console.log(this.hidden);
    },
    /**
     * Triggered when the panel size changes
     */
    resize() {
        console.log(this.clientHeight);
        console.log(this.clientWidth);
    },
};
```

## beforeClose

When the panel tries to be closed, this function will be triggered. `BeforeClose` can be an async function that can be used for asynchronous judgment. If it returns `false`, the current closing operation will be terminated.

Do not execute the actual destruction and close-related logic code in this function. This step is just for inquiry. Please put the actual destruction in the close function.

> **Note**: **please use with caution**, if the judgment is wrong, the editor or panel window may not close normally.

## Close

When all the panels in the window are allowed to be closed, the panel close will be triggered. Once the close is triggered, the window will be forcibly closed after the end, please save the data in the close. If an abnormal close occurs, please make a backup of the data in order to restore data as much as possible when restarting.
