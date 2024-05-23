# Message system

There are many independently running processes in **Cocos Creator**, and these processes are isolated from each other. When you need to interact with other functions in the editor, you need to interact through **messages**.

The **message system** in the editor is a function expansion package of IPC (Interprocess Communication). This system bears the burden of communication and interaction in the entire editor.

## Message Types

Message interaction is divided into two situations:

1. General message: Actively send a message to a function (extended)
2. Broadcast message: After a certain function (extension) completes an operation, a notification is sent to everyone to inform that the operation has been completed

### General Message

It can be understood as a kind of external api, for example, **scene editor** defines a **message** API `query-node`.

```json
{
    "name": "scene",
    "contributions": {
        "messages": {
            "query-node": {
                "methods": ["queryNode"]
            }
        }
    }
}
```

When writing an extension, use this API to send messages:

```javascript
const info = await Editor.Message.request('scene', 'query-node', uuid);
```

At this time, a promise object will be returned. After await, the info object obtained is part of the data on the node actually queried. This message is similar to a remote API call.

### Broadcast message

Broadcast message is a kind of notification to the outside after the operation in a certain function is completed. Take the **scene editor** as an example.

After starting a scene, the **scene editor** informs everyone that the **scene** has been started:

```javascript
Editor.Message.broadcast('scene: ready', sceneUUID);
```

It needs to be defined like this in the extension:

```json
{
    "name": "hello-world",
    "contributions": {
        "messages": {
            "scene:ready": {
                "methods": ["initData"]
            }
        }
    }
}
```

After that, whenever the scene is ready, broadcasting scene:ready will trigger the `initData` method in the `hello-world` extension.

## Message Naming Conventions

### General Message

Please use lowercase words and cannot contain special characters. Use **-** to connect between words.

### Broadcast Message

Cannot contain special characters other than **:**. The format is `packageName: actionName`.

The `packageName` is added to prevent naming conflicts. In your own extension, you need to directly indicate which broadcast (action) of which extension is monitored when monitoring.

In this way, you can more intuitively understand the message processing flow of the extension in `package.json`.

## Editor and extended open message list

The functions in the editor and the list of messages open to the outside world can be viewed through the **Developer -> Message List** panel. For detailed definition rules, please refer to the [contributions.messages](./contributions-messages.md) documentation.

## Send a message

- `Editor.Message.send(pkgName, message, ...args)`

  The `send` method only sends a message, and does not wait for the return. If you do not need to return data and do not care whether the execution is complete, please use this method.

- `await Editor.Message.request(pkgName, message, ...args)`

  The `request` method returns a promise object, this promise will receive the data returned after the message is processed.

- `Editor.Message.broadcast(`${pkgName}:${actionName}`, ...args)`

  The `broadcast` method only sends, and sends it to all extensions that monitor the corresponding message.
