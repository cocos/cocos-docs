# Message System

There are many independent processes running in Cocos Creator, and they are isolated from each other. When you need to interact with other functions within the editor, you need to do so through the "messaging mechanism".

The "Message System" in the editor is a functional extension of the IPC (Inter-Process Communication) wrapper. This system carries the burden of communication and interaction within the editor.

For more information about multi-process architecture and cross-process communication, please refer to the document [Extension Infrastructure](./package.md).

## Message Types

There are two types of messages within the Cocos Creator system.

1. Normal message: a message is sent to a function (extension) on its own initiative
2. Broadcast messages: a function (extension) sends a notification to everyone that an operation has been completed

### Normal messages

It can be understood as an external interface, for example the engine's **Scene Editor** module has defined a `query-node` message for querying nodes, as follows:

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

For more information on how to customize messages and the meaning of the message fields, please refer to the document [Customized Messages](./contributions-messages.md).

When we want to query a scene node in an extension we have written, we can use this message to do so, as follows:

```typescript
const info = await Editor.Message.request('scene', 'query-node', uuid);
```

This message is similar to a remote process call (RPC), where the `info` object is part of the data on the actual node being queried.

> **Note**: Since this is a remote call, `request` will not return immediately, so you need to use `await` to convert asynchronous to synchronous.

#### Naming Convention for Normal Messages

Please use **lowercase** words, and no special characters, with **-** concatenated between words. For example, `open-panel`, `text-changed`.

### Broadcast Messages

A broadcast message is a notification to the outside world after the completion of an operation within a function.

#### Receive Broadcast Messages

For example, if the **Scene Editor** needs to notify everyone that a scene has been started after it has been started, the **Scene Editor** sends a broadcast message using the following code.

```typescript
Editor.Message.broadcast('scene:ready', sceneUUID);
```

If an extension wants to receive `scene:ready` messages, they need to be defined first in `package.json`, as follows:

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

The broadcast `scene:ready` message triggers the `initData` method in the "hello-world" extension whenever the scene is ready.

#### Sending Broadcast Messages

If an extension wants to send a broadcast message, it also needs to be defined in `package.json` first.

For example, "hello-world" will broadcast a message to other extensions when it is ready for data. As shown below:

```json
{
    "name": "hello-world",
    "contributions": {
        "messages": {
            "scene:ready": {
                "methods": ["initData"]
            },
            "hello-world:ready": {
                "public": true,
                "description": "hello-world ready notification."
            }
        }
    }
}
```

At the appropriate time, the following code is called within the "hello-world" extension to broadcast to everyone.

```typescript
Editor.Message.broadcast('hello-world:ready');
```

> **Note**: Broadcast messages can have no `methods`, which means they don't listen. As shown in the definition above, it means that "hello-world" does not need to listen for its own initialization completion message.

#### Naming Convention for Broadcast Messages

The format is `packageName:actionName`, and the following naming is legal.
- scene:ready
- scene:query-node
- hello-world:ready
- hello-world:data-loaded

Adding `packageName` prevents naming conflicts and makes it more intuitive to see which extension is listening to which broadcast message (action) when defining messages in `package.json`.

## View the List of Messages

The list of messages that are available to the editor and extensions can be viewed in the **Developer -> Message Manager** panel. For detailed definition rules, please refer to the documentation [Custom Messages](./contributions-messages.md).

## Sending Messages in Code

The `send` method only sends the message and does not wait for a return. Use this method if you don't need to return data and don't care if execution completes.

```typescript
Editor.Message.send(pkgName, message, . .args);
```

The ``request`` method returns a promise object that receives the data returned after the message has been processed.

```typescript
await Editor.Message.request(pkgName, message, . . args);
```

The ``broadcast`` method only sends, and sends to all function extensions that listen for the corresponding message.

```typescript
Editor.Message.broadcast(`${pkgName}:${actionName}`, . .args);
```
