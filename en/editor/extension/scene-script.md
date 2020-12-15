# Call the engine API and project script

In the plugin you can declare a special script file (scene script), the script and the script in the project ( `assets` directory script) has the same environment, that is in this script can call the engine API and other projects Script to achieve:

- Traverse the nodes in the scene to get or change the data
- Call the other scripts in the project to complete the job

## Register the scene script

First add a `scene` field to the `contributions` property of `pacakge.json`, the value of which is the path to a script file, relative to the extension package directory.

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

## Write the scene script

`scene.js` needs to be defined in this form.

```javascript
// function triggered when the module is loaded
exports.load = function() {};
// function triggered when the module is unloaded
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

**Note: Due to the upgrade of the scripting system, the `cc.require` method, which used the same module reference mechanism as the project script, has been deprecated**

## Send a message from the extension package to the scene script

Next, the following interface can be used to send messages to `scene.js` (assuming the name of the extension is `foobar`) in both the main process and the rendering process of the extension package application.

```typescript
interface ExecuteSceneScriptMethodOptions {
    // name of extension
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

This allows you to get the names of all the nodes of the scene in the extended package, and of course can be used to perform more queries and operations on the scene nodes.

**Note: Because communication is based on the underlying IPC implementation of Electron, remember that the transmitted data cannot contain native objects, otherwise it can cause process crashes or memory explosion. It is recommended to only transfer pure JSON objects.**


