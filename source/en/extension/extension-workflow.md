# Extension Workflow

When we developing an extension, usually we would register some callback function and return the results. There are several way to do this:

## Did jobs in entry point

If we don't need any user input, and the taks did once in loading phase, we can put the code in the `load` callback of `main.js`:

```js
// main.js
module.exports = {
  load () {
    let fs = require('fs');
    let path = require('path');
    // automatically create a folder after package loaded
    fs.mkdirSync(Path.join(Editor.projectPath, 'myNewFolder'));
    Editor.success('New folder created!');
  }
}
```

Don't forget to use `Editor.log`, `Editor.success` (Reference at [Console API](api/editor-framework/main/console.md#)) to notify user when you done something automatically.

The `Editor.projectPath` in the example above will return the absolute path of current project, you can find the details in [Editor API](api/editor-framework/main/editor.md).

An alternative way is put the logic in a menu item instead, For example in [Your First Extension](your-first-extension.md), we define a `main-menu` field and the action for trigering IPC event in `package.json`:

```js
  messages: {
    start () {
    }
  }
```

Please read [Extends main menu](extends-main-menu.md) for more details.

## Did jobs in panel

We've known that we can run [Node.js](http://nodejs.org/) program in main process. For complex operation, sometimes we need user working through user interface in panel, that needs us communicate with user via IPC message.

To open a panel, we can write:

```js
  messages: {
    'open' () {
      // open entry panel registered in package.json
      Editor.Panel.open('myPackage');
    }
  }
```

Here `myPackage` is the panel ID, in single panel extension, this ID is same as package name. User can define it by add `panel` field in `package.json`. We will introduce it in the next session [Extend Panel](extends-panel.md).

After panel opened, we can send or recieve IPC via  `Editor.Ipc.sendToPanel`, `Editor.Ipc.sendToMain`.

## Resources and components extensions

Cocos Creator use the Entity Component in the engine, it allow us extends the script by developing new Component. The extension package can used as the media for the components and resources. Also, we can define the `rutnime-resource` field, it will mapping the path under extension to project path, this will make the extensions join the build pipeline correctly.

```json
//package.json
  "runtime-resource": {
    "path": "path/to/runtime-resource",
    "name": "shared-resource"
  }
```

The above example will mapping the `projectPath/packages/myPackage/path/to/runtime-resource` to our assets path, shows as `[myPackage]-[shared-resource]`.

The resources under the path can be used by other components and scenes. Ususally we use this to package our frequently used resources and components, and shares it almong the projects.

More details read [Runtime-Resource Reference](reference/package-json-reference.md#runtime-resource-object-).