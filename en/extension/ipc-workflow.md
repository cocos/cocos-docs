# IPC workflow

Please read the [Introduction To IPC](introduction-to-ipc.md) documentation to understand the basic concept of IPC.

[Entry Point](entry-point.md) and the [Extends Panel](extends-panel.md) have been introduced in previous sections. This section discusses how to communicate between them.

All of the APIs mentioned in this section can be found in the [Editor.Ipc Main Process API](api/editor-framework/main/ipc.md) and [Editor.Ipc Renderer Process API](api/editor-framework/renderer/ipc.md) documentation.

## Sending Messages

### Sending message from main process to panel

In main process, `Editor.Ipc.sendToPanel('panelID', 'message' [, ...args, callback, timeout])` is the main method used to send messages to the panel, with the following parameters:

- `panelID` - panel ID
- `message` - the IPC message name
- **Optional** - `args`, one or more arguments
- **Optional** - `callback`, the respond function from renderer.
- **Optional** - `timeout`, the timeout of the respond function. Default is 5000ms.

### Sending a message from panel to main process

`Editor.Ipc.sendToMain('message', [, ...args, callback, timeout])`

Compare to `sendToPanel`, it won't need user send the panel ID.

### Other methods

The following methods can be used to operate IPC:

- any process to main process: `Editor.Ipc.sendToMain`
- any process to panel: `Editor.Ipc.sendToPanel`
- any process to main window: `Editor.Ipc.sendToMainWin`
- any process to all windows: `Editor.Ipc.sendToWins`
- any process to all: `Editor.Ipc.sendToAll`

> **Note**: because communication is based on the underlying IPC implementation of Electron, remember that the transmitted data cannot contain native objects, otherwise it can cause process crashes or memory explosion. It is recommended to only transfer pure JSON objects.

## Receive Message

To receive IPC messages in the main or renderer process, the easiest way is define the `messages` field.

### Listening to messages in panel

```js
//packages/foobar/panel/index.js
Editor.Panel.extends({
    //...
    messages: {
        'my-message': function (event, ...args) {
            //do some work
        }
    }
});
```

### Listening to messages in main process

```js
//packages/foobar/main.js
module.exports = {
    //...
    messages: {
        'my-message': function (event, ...args) {
            //do some work
        }
    }
}
```

Use the short name `my-message` here for listening to messages, actually its full name is `foobar:my-message`, when sending the message, remember to use the full name for it:

`Editor.Ipc.sendToPanel('foobar:my-message')`, `Editor.Ipc.sendToMain('foobar:my-messages')`.

### Other way to listening messages

Besides the `messages` field, it is also possible to use the IPC method in Electron to listening messages.

In the renderer process:

```js
require('electron').ipcRenderer.on('foobar:message', function(event, args) {});
```

In the main process:

```js
require('electron').ipcMain.on('foobar:message', function(event, args) {});
```

For more information about Electron's IPC methods, please read the Electron API documentation: [ipcMain](http://electron.atom.io/docs/api/ipc-main/) and [ipcRenderer](http://electron.atom.io/docs/api/ipc-renderer/).

## Add reply method

Sending a message from the main process:

```js
//packages/foobar/main.js
Editor.Ipc.sendToPanel('foobar', 'greeting', 'How are you?', function (error, answer) {
    Editor.log(answer);
});
```

In the `message` field in panel, call `event.reply` to reply the message:

```js
//packages/foobar/panel/index.js
Editor.Panel.extends({
    //...
    messages: {
        'greeting': function (event, question) {
            console.log(question); //How are you?
            if (event.reply) {
                //if no error, the first argument should be null
                event.reply(null, 'Fine, thank you!');
            }
        }
    }
});
```

> **Note**: the first argument of `event.reply` is an Error, if nothing happened, just send `null` here. Except that, it is recommend checking if `event.reply` exists, this will help us remember sending the reply.

### Handling Timeout

The last argument for sending IPC message methods is the `timeout`, calculated by milliseconds, default is 5000ms.

If the timeout should not be processed, send `-1`. In this case, it is necessary to make sure the reply will be invoked, otherwise it will cause a memory leak.

When timeout triggered, a timeout error will reply:

```js
Editor.Ipc.sendToMain('foobar:greeting', function (error, answer) {
  if ( error && error.code === 'ETIMEOUT' ) { //check the error code to confirm a timeout
    Editor.error('Timeout for ipc message foobar:greeting');
    return;
  }
  Editor.log(answer);
});
```
