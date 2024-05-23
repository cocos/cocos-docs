# Commonly used IPC messages

### Built in broadcast message

Editor in the implementation of some tasks, will send some messages.

#### File System

1. asset-db:assets-created
Create a new file in the project.

2. asset-db:assets-moved
If a file is moved within the project folder.

3. asset-db:assets-deleted
When a file is deleted.

4. asset-db:asset-changed
If the file is modified.

5. asset-db:script-import-failed
When an error occurs when a script is imported.

#### Scene

1. scene:enter-prefab-edit-mode
Scene into the prefab edit state when it will send the message.

2. scene:saved
When the scene is saved, it will send the message.

3. scene:reloading
Scene reloading.

4. scene:ready
Scene ready

#### Compile

1. editor:build-start
Start compilation

2. editor:build-finished
Compile end

3. builder:state-changed
Compiler status update

4. builder:query-build-options
Query build options

> **Note**: starting from v1.9.1, points 1 and 2 are not recommended. If necessary please refer to [Custom Project Build Process](../../publish/custom-project-build-template.md).

### Built-in plug-in Panel monitor messages

#### scene:new-scene

Open a new scene in the editor.
```javacript
Editor.Ipc.sendToPanel('scene', 'scene:new-scene');
```

#### scene:play-on-device

Preview of the currently selected device.
```javacript
Editor.Ipc.sendToPanel('scene', 'scene:play-on-device');
```

#### scene:query-hierarchy

Query the hierarchy data in the current open scene.
```javacript
Editor.Ipc.sendToPanel('scene', 'scene:query-hierarchy', (error, sceneID, hierarchy) => {
    if (error)
        return Editor.error(error);
    // hierarchy
});
```

#### scene:query-nodes-by-comp-name

Query the node that contains the specified component in the current scene.
```javacript
Editor.Ipc.sendToPanel('scene', 'scene:query-nodes-by-comp-name', 'cc.Sprite', (error, nodes) => {
    if (error)
        return Editor.error(error);
    // nodes
});
```

#### scene:query-node

Query the dump data of the specified node.
```javacript
Editor.Ipc.sendToPanel('scene', 'scene:query-node', '9608cbWFmVIM7m6hasLXYV7', (error, dump) => {
    if (error)
        return Editor.error(error);
    // JSON.parse(dump);
});
```

#### scene:query-node-info

Query the basic information of a node.
```javacript
Editor.Ipc.sendToPanel('scene', 'scene:query-node-info', '9608cbWFmVIM7m6hasLXYV7', 'cc.Node', (error, info) => {
    if (error)
        return Editor.error(error);
    // info
});
```

#### scene:query-node-functions

Query the component function that can be called on a node.
```javacript
Editor.Ipc.sendToPanel('scene', 'scene:query-node-functions', '9608cbWFmVIM7m6hasLXYV7', (error, functions) => {
    if (error) {
        return Editor.error(error);
    }
    // functions
});
```

#### scene:query-animation-node

Query animation root node.
```javacript
Editor.Ipc.sendToPanel('scene', 'scene:query-animation-node', '9608cbWFmVIM7m6hasLXYV7', (error, dump) => {
    if (error) {
        return Editor.error(error);
    }
    // dump
});
```