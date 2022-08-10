# Getting Started Example - First Data Interaction

In the previous two documents [Getting Started Example - Menu](./first.md) and [Getting Started Example - Panel](./first-panel.md), we introduced:
- How to create extensions
- How to define menus in extensions
- how to define messages in an extension
- How to define a panel in an extension

This article demonstrates how two extensions can communicate with each other and will cover three topics:
- How to open a panel of another extension
- How to send a message to another extension
- How to send and listen to broadcast messages

## Open Another Extension's Panel

Sometimes we need to open another extension in an extension we wrote, so next we'll try to modify the extension example in **Getting Started Example - Menu** so that it opens the panel defined in **Getting Started Example - Panel**.

The modified `package.json` looks like this:

```JSON5
{
    "package_version": 2,
    "version": "1.0.0",
    "name": "hello-world",
    ...
    "contributions": {
        "menu": [
            {
                "path": "Develop/HelloWorld",
                "label": "test",
                "message": "log"
            },
            {
                "path": "Develop/HelloWorld",
                "label": "open other",
                "message": "open-other"
            }
        ],
        "messages": {
            "log": {
                "methods": [
                    "log"
                ]
            },
            "open-other": {
                "methods": [
                    "openOther"
                ]
            }
        }
    }
}
```

We modified `contributions.menu`, added `open other` menu item, and put all the menus of this extension under Develop/HelloWorld. After refreshing the extension, you can find the menu items in the top menu bar as shown below.

![extension-menu-hw.png](./first/extension-menu-hw.png)

In `contributions.messages`, we add an `open-other` message and let the `openOther` function in `main.ts` handle this message.

The extension in **Getting Started Example - Panel** is `first-panel`, so we use `Editor.Panel.open('extension')` to open its default panel, as follows:

```typescript
openOther(){
    Editor.Panel.open('first-panel');
}
```

After executing the `npm run build` command at the root of `hello-world`, go to **Extension Manager** to refresh the `hello-world` extension.

Click on the **Develop** -> **HelloWorld** -> **open other** menu item and you will see the example panel open.

## Communication with other extensions

### Directional communication

In the above example, we open the `first-panel` panel in `hello-world` with `Editor.Panel.open('extension')`. But if we are trying to do something else, this solution won't work.

When an extension wants to call the function of another extension, this can be done by sending a message to one of the extensions with the following function:

```typescript
Editor.Message.send(extensionName:string,messasge:string,...args:any[])
```

The messages defined in `contributions.messages` of each extension are available to the public by default. In `first-panel` we find the `open-panel` message, which is used to open its own default panel. For simplicity, we replace the `openOther` function in `main.ts` in `hello-world` with the following:

```typescript
openOther(){
    Editor.Message.send('first-panel','open-panel');
}
```

After recompiling the `hello-world` extension and refreshing it, click **Develop** -> **HelloWorld** -> **open other** menu item again, you can see the default panel of `first-panel` is opened.

### Broadcast communication

When an extension wants to notify all extensions across the system of the completion of an event, it can do so by broadcasting a message with the following function.

```typescript
Editor.Message.broadcast(message:string, ...args:any[])` 
```

Next, we define a broadcast message called `first-panel:open`, which is broadcast by the `first-panel` extension and listened to by the `hello-world` extension.

In `hello-world`, we add a new message listener and specify the handler function, with the following modified `contributions.messages`:

```json5
{
    "messages": {
        "log": {
            "methods": [
                "log"
            ]
        },
        "open-other": {
            "methods": [
                "openOther"
            ]
        },
        "first-panel:open":{
            "methods": [
                "onFirstPanelOpen"
            ]
        }
    }
}
```

Then add the following handler function to `main.ts` of `hello-world`:

```typescript
onFirstPanelOpen(){
    console.log("hello-world knows first-panel is open");
}
```

The transformation as a listener is done, next we modify the broadcast side `first-panel`.

Add the following broadcast message code to the ``src/panels/default/index.ts :ready`` function in the ``first-panel` project.

```typescript
Editor.Message.broadcast("first-panel:open");
```

The `ready` function will be called when the default panel of `first-panel` is opened, at which point the `first-panel:open` message will be broadcast.

> **Note**: Broadcasters can also listen for their own broadcast messages in messages, but this is usually not necessary.

Compile and refresh the two extensions separately, click again on the **Develop** -> **HelloWorld** -> **open other** menu item, and you will see the sample panel opened, in addition to the following print in the Cocos Creator console window.

```
hello-world knows first-panel is open
```

This means that the ``hello-world`` extension has received a broadcast message from the ``first-panel`` extension.

For more message-related details, please refer to the documentation [Message System](./messages.md).
