# Call the engine API and project script

In the plugin a special script file (scene script) can be declared, the script and the script in the project (`assets` directory script) has the same environment, this script can call the engine API and other projects Script to achieve:

- Traverse the nodes in the scene to get or change the data
- Call the other scripts in the project to complete the job

## Register the scene script

First in the `package.json` add `scene-script` field, the value of the field is a script file path, relative to the expansion package directory:

```Json
{
    "name": "my-plugin-name",
    "scene-script": "scene-walker.js"
}
```

The path will point to `packages/foobar/scene-walker.js`. Next, it is necessary to write a scene script.

## Write the scene script

`Scene-walker.js` needs to be defined in such a way:

```js 
Module.exports = {
    'get-canvas-children': function (event) {
        Var canvas = cc.find ('Canvas');
        Editor.log ('children length:' + canvas.children.length);

        If (event.reply) {
            Event.reply (null, canvas.children.length);
        }
    }
};
```

Notice the scene script consists of one or more IPC message listening methods. After receiving the corresponding IPC message, the methods and properties that are declared in the engine  and the user component script in the function body can be used.

## Send a message from the extension package to the scene script

Next, in the main process and the rendering process of the extension package program, use the following interface to send a message to the `scene-walker.js` (assuming the extension package name is `foobar`):

```js
Editor.Scene.callSceneScript ('foobar', 'get-canvas-children', function (err, length) {
    Console.log (`get-canvas-children callback: length - $ {length}`);
});
```

In order to get in the expansion package to the scene of the `Canvas` root node how many child nodes, of course, can also be used to scene nodes for more inquiries and operations.

When calling a message, `callSceneScript` accepts the same parameter input as the other IPC message sending interface, or specify more pass and timeout times. For more information, see [IPC Workflow](ipc-workflow.md).

> **Note**: because communication is based on the underlying IPC implementation of Electron, remember that the transmitted data cannot contain native objects, otherwise it can cause process crashes or memory explosion. It is recommended to only transfer pure JSON objects.

## Reference modules and plugin scripts in scene scripts

In addition to getting a specific node in the scene script via `cc.find` and manipulating the node and mounted components, we can also refer to the non-component modules in the project, or access the plug-in scripts through global variables.

### Reference module

```js
//MyModule.js
Module.exports = {
    Init: function () {
        // do initialization work
    }
}

//scene-walker.js
Module.exports = {
    'Init-module': function (event) {
        Var myModule = cc.require ('MyModule');
        MyModule.init ();
    }
};
```

> **Note**: to use the same module reference mechanism as the project script, you must use `cc.require` in the scene script.

### Reference plugin script

Directly use `window.globalVar` to access the global variables and methods declared in the plugin script.
