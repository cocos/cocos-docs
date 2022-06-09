# Calling the Engine API

In the extension you can define a special **scene script** file, which will be in the same runtime as the scripts in the `assets\` directory of the project, with the same runtime environment.

In the **Scene Script** you can call the engine `API` and other project scripts, and with this feature we can

- Query and traverse the nodes in the scene to get or modify node data

- Call functions related to the engine components on the node to finish the job

## Register Scene Script

Define the `contributions.scene` field in `pacakge.json`, the value of which is a script file path relative to the root of the extension package, as follows:

```json
{
    "contributions": {
        "scene": {
            "script": "./dist/scene.js"
        }
    }
}
```

## Scene Script Template

Create a new `scene.ts` in the `src` directory and write the following code.

```typescript
export function load() {};
export function unload() {};
export const methods = { };
```

`load` - the function that fires when the module is loaded

`unload` - the function that fires when the module is unloaded

`methods` - methods defined inside the module that can be used to respond to external messages

## Calling the Engine API

Next, we will demonstrate how the scene script calls the engine API by rotating the main camera.

In order to call the engine API, we need to add the search path of the engine script at the beginning of `scene.ts` and write the corresponding code, which ends up looking like this

```typescript
import { join } from 'path';
module.paths.push(join(Editor.App.path, 'node_modules'));

export function load() {};

export function unload() {};

export const methods = {
    rotateCamera() {
        const { director } = require('cc');
        let mainCamera = director.getScene().getChildByName("Main Camera");
        if(mainCamera){
            let euler = mainCamera.eulerAngles;
            euler.y += 10;
            mainCamera.setRotationFromEuler(euler);
            return true;
        }
        return false;
    },
};
```

In the above code, we have defined a `rotateCamera` method that rotates the main camera `10` degrees around the `Y` axis every time it is executed.

In other extension scripts, we can call the `rotateCamera` function with the following code.

```typescript
const options: ExecuteSceneScriptMethodOptions = {
    name: packageJSON.name,
    method: 'rotateCamera',
    args: []
};

// result: {}
const result = await Editor.Message.request('scene', 'execute-scene-script', options);
```

The properties of `ExecuteSceneScriptMethodOptions` are defined as follows:
- name - the package name of the extension where `scene.ts` is located, you can use `packageJSON.name` if it is in this extension
- method: the method defined in `scene.ts`
- args: arguments, optional

As the communication between extensions is based on Electron's underlying cross-process IPC mechanism, the transferred data will be serialized as JSON. so the transferred data must not contain native objects, otherwise it may lead to process crashes or memory spikes. It is recommended to transfer only pure `JSON` objects, such as the `options.args` parameter in the above code and the return value of the scenario script method.
