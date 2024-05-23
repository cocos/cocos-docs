# 常用 IPC 消息

## 内置插件广播出来的消息

Creator 内置的一些组件，或者插件，在某些操作下，会向所有插件广播一些消息，通知所有插件出现的变动以及更改。

### 文件系統

1. asset-db:assets-created

    新建文件的时候，assetDB 会发送这个事件。

2. asset-db:assets-moved

    项目文件夹内如果有文件被移动，则会发送这个事件。

3. asset-db:assets-deleted

    当一个文件被删除的时候，会发送这个事件。

4. asset-db:asset-changed

    如果文件被修改，则会发送这个事件。

5. asset-db:script-import-failed

    当一个脚本在导入时出现错误，会发送这个事件通知。

### 场景

1. scene:enter-prefab-edit-mode

    场景进入 prefab 编辑状态的时候会发送这个消息

2. scene:saved

    当场景保存后，会发送这个消息

3. scene:reloading

    当场景因为特殊原因刷新的时候，会发送这个消息

4. scene:ready

    场景准备完毕发送的消息

### 编译

1. editor:build-start

    编译开始的消息

2. editor:build-finished

    编译完成的消息

3. builder:state-changed

    编译状态更新时，发送的消息

4. builder:query-build-options

    查看构建的选项

**注意**：从 v1.9.1 开始，第 1 点和第 2 点不建议使用，若有需要可参考 [自定义项目构建流程](../../publish/custom-project-build-template.md)。

## 内置插件 Panel 内监听的消息

### scene:new-scene

在编辑器内打开一个新的场景。

```javacript
Editor.Ipc.sendToPanel('scene', 'scene:new-scene');
```

### scene:play-on-device

使用界面上当前选中的预览设备来进行预览。

```javacript
Editor.Ipc.sendToPanel('scene', 'scene:play-on-device');
```

### scene:query-hierarchy

查询编辑器内当前打开场景里的 hierarchy 数据。

```javacript
Editor.Ipc.sendToPanel('scene', 'scene:query-hierarchy', (error, sceneID, hierarchy) => {
    if (error)
        return Editor.error(error);
    // hierarchy
});
```

### scene:query-nodes-by-comp-name

传入一个 Component 名字，返回场景内含有这个组件的节点数组。

```javacript
Editor.Ipc.sendToPanel('scene', 'scene:query-nodes-by-comp-name', 'cc.Sprite', (error, nodes) => {
    if (error)
        return Editor.error(error);
    // nodes
});
```

### scene:query-node

发送一个节点 id，查询这个节点的 dump 数据。dump 数据是一个字符串，需要使用 JSON 手动转成 Object 使用。

```javacript
Editor.Ipc.sendToPanel('scene', 'scene:query-node', '9608cbWFmVIM7m6hasLXYV7', (error, dump) => {
    if (error)
        return Editor.error(error);
    // JSON.parse(dump);
});
```

### scene:query-node-info

传入一个节点或者组件的 id 与一个类型，返回查询的节点的基本信息。

```javacript
Editor.Ipc.sendToPanel('scene', 'scene:query-node-info', '9608cbWFmVIM7m6hasLXYV7', 'cc.Node', (error, info) => {
    if (error)
        return Editor.error(error);
    // info
});
```

### scene:query-node-functions

传入一个节点 id，返回这个节点上所有组件内的函数

```javacript
Editor.Ipc.sendToPanel('scene', 'scene:query-node-functions', '9608cbWFmVIM7m6hasLXYV7', (error, functions) => {
    if (error) {
        return Editor.error(error);
    }
    // functions
});
```

### scene:query-animation-node

传入一个节点 id，根据这个节点查找最近的动画根节点。并返回这个节点的 dump 数据。
```javacript
Editor.Ipc.sendToPanel('scene', 'scene:query-animation-node', '9608cbWFmVIM7m6hasLXYV7', (error, dump) => {
    if (error) {
        return Editor.error(error);
    }
    // dump
});
```