# Extension Workflow

When developing an extension, usually registering a callback function and return the results of the callback is the typical procedure. There are several way to do this.

## Did jobs in entry point

If user input is not needed, and the taks did once in loading phase, put the code in the `load` callback of `main.js`:

```js
// main.js
module.exports = {
  load () {
    let fs = require('fs');
    let path = require('path');
    // automatically create a folder after package loaded
    fs.mkdirSync(Path.join(Editor.Project.path, 'myNewFolder'));
    Editor.success('New folder created!');
  }
}
```

Don't forget to use `Editor.log`, `Editor.success` (Reference at [Console API](api/editor-framework/main/console.md#)) to notify user when you done something automatically.

The `Editor.Project.path` in the example above will return the absolute path of current project, find the details in the [Editor API](api/editor-framework/main/editor.md).

An alternative way is put the logic in a menu item instead, For example in [Your First Extension](your-first-extension.md), define a `main-menu` field and the action for trigering IPC event in `package.json`:

```js
  messages: {
    start () {
    }
  }
```

For additional details, read the [Extends main menu](extends-main-menu.md) documentation.

## Did jobs in panel

[Node.js](http://nodejs.org/) programs can be run in main process. For complex operation, sometimes work needs to be done through the user interface in panel, communicating with the user via IPC messages.

To open a panel, consider the following:

```js
  messages: {
    'open' () {
      // open entry panel registered in package.json
      Editor.Panel.open('myPackage');
    }
  }
```

Here `myPackage` is the panel ID, in single panel extension, this ID is same as package name. User can define it by add `panel` field in `package.json`. For additional details, refer to the [Extend Panel](extends-panel.md) documentation.

After the panel is opened,  one can send or receive IPC via  `Editor.Ipc.sendToPanel`, and `Editor.Ipc.sendToMain`.

## Resources and components extensions

Cocos Creator use the Entity Component in the engine, it allow us extending the script by developing new Component. The extension package can used as the media for the components and resources. Also, it is possible to define the `runtime-resource` field, it will mapping the path under extension to project path, this will make the extensions join the build pipeline correctly.

```json
// package.json
  "runtime-resource": {
    "path": "path/to/runtime-resource",
    "name": "shared-resource"
  }
```

The above example will mapping the `projectPath/packages/myPackage/path/to/runtime-resource` to our assets path, shows as `[myPackage]-[shared-resource]`.

The resources under the path can be used by other components and scenes. Usually this package is used to package frequently used resources and components, and shares it almong the projects.

For additional details, please review the [Runtime-Resource Reference](reference/package-json-reference.md#runtime-resource-object-) documentation.
