# Call the engine API and project script

In a plugin, you can declare a special script file called **scene script**, which has the same environment as the scripts in the `assets` directory of the project. That is, in this script you can call the engine API and other project scripts to achieve special functionality, including:

- Traverse the nodes in the scene to get or change the data.
- Call the other scripts in the project to complete the job.

## Registering the scene script

First, add a `scene` field to the `contributions` property of `pacakge.json`, the value of which is the path to a script file, relative to the extension package directory. Example:

```json
{
    "name": "engine",
    "contributions": {
        "scene": {
            "script": "./scene.js"
        } 
    }
}
```

## Adding code to the scene script

Define `scene.js` as follows:

```javascript
const { join } = require('path');
// Loading 'cc' requires setting the search path.
module.paths.push(join(Editor.App.path, 'node_modules'));
// Function triggered when the module is loaded
exports.load = function() {};
// Function triggered when the module is unloaded
exports.unload = function() {};

// Methods defined within the module
exports.methods = {
    log() {
      const { director } = require('cc');
        director.getScene();
        return {};
    },
};
```

> **Note**: due to the upgrade of the scripting system, the `cc.require` method, which used the same module reference mechanism as the project script, has been deprecated.

## Sending a message to the `scene.js`

Next, the following interface can be used to send messages to `scene.js` in both the main process and the rendering process of the extension package application. For example, assuming the name of the extension is `foobar`:

```typescript
interface ExecuteSceneScriptMethodOptions {
    // Name of extension
    name: string;
    method: string;
    args: any[];
}

const options: ExecuteSceneScriptMethodOptions = {
    name: 'foobar',
    method: 'log',
    args: []
};

// result: {}
const result = await Editor.Message.request('scene', 'execute-scene-script', options);
```

This allows retreiving the names of all the nodes of the scene in the extended package, and of course can be used to perform more queries and operations on the scene nodes.

> **Note**: the returned object `result` is the object of `return` in the `log` method.

**Because communication is based on the underlying IPC implementation of Electron, remember that the transmitted data cannot contain native objects, otherwise it can cause process crashes or memory explosion. It is recommended to only transfer pure JSON objects.**
