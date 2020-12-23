# Call the engine API and project script

In a plugin, a special script called a scene script can be created in `assets\`. This special script can call the engine API and other projects scripts to achieve special functionality, including:

- Traverse the nodes in the scene to get or change the data.
- Call the other scripts in the project to complete the job.

## Registering the scene script

First, add a `scene` field to the `contributions` property of `pacakge.json`, the value of which is the path to a script file, relative to the extension package directory.Example:

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
// Function triggered when the module is loaded
exports.load = function() {};
// Function triggered when the module is unloaded
exports.unload = function() {};

// Methods defined within the module
exports.methods = {
    log() {
        const scene = cc.director.getScene();
        if (scene) {
            scene.walk(target => console.log(target.name));
        } else {
            console.warn('Scene not found');
        }
    }
};
```

>**Note**: due to the upgrade of the scripting system, the cc.require method, which used the same module reference mechanism as the project script, has been deprecated.

## Sending a message from the extension package to the `scene.js`

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

await Editor.Message.request('scene', 'execute-scene-script', options); 
```

This allows retreiving the names of all the nodes of the scene in the extended package, and of course can be used to perform more queries and operations on the scene nodes.

>**Note**: because communication is based on the underlying IPC implementation of Electron, remember that the transmitted data cannot contain native objects, otherwise it can cause process crashes or memory explosion. It is recommended to only transfer pure JSON objects.
