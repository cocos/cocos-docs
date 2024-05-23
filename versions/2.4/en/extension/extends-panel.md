# Extends Editor Panel

Cocos Creator allows user customization to the panel UI.

## Registering an Editor Panel

Define the `panel` field in `package.json`:

```json
{
  "name": "simple-package",
  "panel": {
    "main": "panel/index.js",
    "type": "dockable",
    "title": "Simple Panel",
    "width": 400,
    "height": 300
  }
}
```

Currently, extensions are allowed to define a single user defined panel in the `package.json`. The `main` field is the entry point of the panel, it is similar to the entry point of the package.

Also, the `type` field:

- `dockable`: the panel can be docked in the workspace.
- `simple`: simple web page, a standalone window that loads a simple HTML page. For more information, please review the [Define Simple Panel](define-simple-panel.md) documentation.

For additional panel field references, please review the [Panel Json Reference](reference/panel-json-reference.md) documentation.

## Defining the panel's entry point

To define the panel's entry point, use `Editor.Panel.extend()`:

```javascript
// panel/index.js
Editor.Panel.extend({
  style: `
    :host { margin: 5px; }
    h2 { color: #f90; }
  `,

  template: `
    <h2>Panel</h2>
    <ui-button id="btn">点击</ui-button>
    <hr />
    <div>State: <span id="label">--</span></div>
  `,

  $: {
    btn: '#btn',
    label: '#label',
  },

  ready () {
    this.$btn.addEventListener('confirm', () => {
      this.$label.innerText = 'Hello World';
      setTimeout(() => {
        this.$label.innerText = '--';
      }, 500);
    });
  },
});
```

`Editor.Panel.extend()` accepts an object which will descript the style and methods of the panel.

In the examples above, the style, template and selector `$` are defined. The `ready` method is used to init the panel. After using the above code, the panel can be executed by executing `Editor.Panel.open('simple-package')`.

For additional details, please refer to the [Panel API](api/editor-framework/main/panel.md) and [Panel Reference](reference/panel-reference.md) documentation.

## Opening the panel in the main menu

At times it may be necessary to quickly access a panel, usually we do this by registering a menu item in the main menu. To do this, define menu item in `package.json` and write the action in main process:

```json
{
  "name": "simple-package",
  "main": "main.js",
  "main-menu": {
    "Panel/Simple Panel": {
      "message": "simple-package:open"
    }
  },
  "panel": {
    "main": "panel/index.js",
    "type": "dockable",
    "title": "Simple Panel",
    "width": 400,
    "height": 300
  }
}
```

```javascript
// use strict

module.exports = {
  load () {
  },

  unload () {
  },

  messages: {
    open() {
      Editor.Panel.open('simple-package');
    },
  },
};
```

Once it is done, the panel can be opened:

![simple-panel](./assets/simple-panel.png)

For additional information about the `package.json` field, please refer to the [Panel Json Reference](reference/panel-json-reference.md) documentation.

## Communication between a Panel and the Main Process

Usually there are UI elements in a panel. Users interact with the panel and send IPC message to the main process. Using `Editor.Ipc` achieves this. For example:

```javascript
this.$btn.addEventListener('confirm', () => {
    Editor.Ipc.sendToMain('simple-package:say-hello', 'Hello, this is simple panel');
});
```

When click the button, it will send a 'say-hello' message to the main process with arguments. Use any front end techinque to program the panel UI. It is also possible to use the node technique as Creator is built on top of Electron.

For more about IPC communication between panels and the main process, please refer to the [Ipc Workflow](ipc-workflow.md) documentation.
