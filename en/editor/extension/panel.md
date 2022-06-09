# Extension Panel

By default, extensions do not have an interface to display. If an extension needs to implement interface interaction, it needs to use the panel system related functions.

## Panel Definition

One or more panels can be defined in `package.json` in the `panels` field, as follows:

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

We define two panels: `defualt` and `list`. `default` is the default panel, which is used as the default action object when no specific panel is named.

The meaning of the fields in the panel is as follows.
- `title`: string - the title of the panel, supports i18n:key, required
- `main`: string - the relative directory of the panel source code, required
- `icon`: string - panel icon relative to directory, required
- `type`: string - Panel type (dockable | simple), optional
- `flags`: {} - flags, optional
    - resizable - if or not the size can be changed, default true, optional
    - save - if or not the panel needs to be saved, default false, optional
    - alwaysOnTop - if or not to keep the top level displayed, default flase, optional
- `size`: {} - size information, optional
    - min-width: Number - the minimum width, optional
    - min-height: Number - the minimum height, optional
    - width: Number - the default width of the panel, optional
    - height: Number - the default height of the panel, optional

## Writing Panels

Create two files `src/panels/default/index.ts` and `src/panels/list/index.ts` in the extension root directory, and paste the following minimal panel template code into each of the two `index.ts` files.

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

`listeners` - some event listeners for the panel
`template` - the panel's HTML layout file
`stype` - the panel's css file
`$` - global selector for quick access to some elements
`methods` - the external method interface for this panel
`ready` - called when the panel is opened
`beforeClose` - called before the panel is closed
`close` - called after the panel is closed

## Displaying panels

You can use the `Editor.Panel.open` method to open any panel (this extension's own panels and other extensions' panels).

Assuming the extension is `hello-world`, the default panel can be opened in either of the following ways:

```typescript
// Editor.Panel.open('hello-world.defualt');
Editor.Panel.open('hello-world');
```

Open other panels by:

```typescript
// Editor.Panel.open('{extension-name}.panelName');
Editor.Panel.open('hello-world.list');
```

## Communication Interaction

The Cocos Creator extension system is built based on Electron's multi-process approach. Each extension is a separate process, and each panel in the extension, is also a separate process. Therefore, the interaction between extensions and panels and between panels and panels can only be achieved through Inter-Process Communication (IPC). For details, please refer to the document [Message System](./messages.md).

### Panels send outgoing messages

Since the process also exits when the panel is closed, we usually use the extension as a carrier for in-memory data. The data and logical interfaces that are needed in the panel will usually be fetched from the extension's main process.

If you want to **query** and **set** the data located in the main process of the extension, assuming the extension defines two messages ``queryData` and `saveData`, we can use them as follows

```typescript
const data = await Editor.Message.request(pacakgeName, 'queryData', dataName);
await Editor.Message.request(pacakgeName, 'saveData', dataName,dataValue);
```

If you want to broadcast notifications to the entire extension system, you can do so using the **broadcast message** mechanism, see the documentation [Messaging System](./messages.md).

### Panel Receives Messages

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

The above message defines a log message, which is handled by the log method in the extended master process. Next we make a slight modification so that the recipient of the message is a panel:

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

`default.log` makes the message recipient a `default` panel, just implement a `log` method in the panel and you can handle this message smoothly.

## A better way to organize panel resources

In the minimalist panel template above, we have two lines of panel display-related code:

```typescript
module.exports = Editor.Panel.define({
    ...
    template: '<div>Hello</div>',
    style: 'div { color: yellow; }',
    ...
});
```

In most cases, panel layouts cannot be this simple. If you continue to write complex HTML layouts and css styles here, the code will become unmaintainable. You can refer to the project created in the document [Getting Started Example - Panels](./first-panel.md), we can separate the `html` and `css` code into separate files and put them in the `static` folder.

The resulting panel template code is shown below:

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

For more details on the panel utility, please refer to [Getting Started Example - Panel](./first-panel.md).
