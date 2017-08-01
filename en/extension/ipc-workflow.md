# IPC workdflow

Please read [Introduction To Ipc](introduction-to-ipc.md) to understand the basic concept of IPC.

We've introduce the [Entry Point](entry-point.md) and the [Extends Panel](extends-panel.md) in previous session. In this session we will show you how to communication between them.

All the API mentioned in this session can be found in [Editor.Ipc Main Process API](api/editor-framework/main/ipc.md) and [Editor.Ipc Renderer Process API](api/editor-framework/renderer/ipc.md).

## Sending Messages

### Sending message from main process to panel.

In main process, we mainly use `Editor.Ipc.sendToPanel('panelID', 'message' [, ...args, callback, timeout)` method to send message to panel, the parameters:

- `panelID` panel ID
- `message` the IPC message name
- **Optional** `args`, one or more arguments
- **Optional** `callback`, the respond function from renderer.
- **Optional** `timeout`, the timeout of the respond function. Default is 5000ms.

### Sending message from panel to main process

`Editor.Ipc.sendToMain('message', [, ...args, callback, timeout])`

Compare to `sendToPanel`, it won't need user send the panel ID.

### Other methods

We also have the following methods to operate IPC:

- any process to main process: `Editor.Ipc.sendToMain`
- any process to panel: `Editor.Ipc.sendToPanel`
- any process to main window: `Editor.Ipc.sendToMainWin`
- any process to all windows: `Editor.Ipc.sendToWins`
- any process to all: `Editor.Ipc.sendToAll`

## Recieve Message

To recieve ipc message in main or renderer process, the easist way is define the `messages` field:

### Listening message in panel

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

### Listening message in main process

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

We use short name `my-message` here to listening messages, actually its full name is `foobar:my-message`, when we sending message, remember we must use the full name for it:

`Editor.sendToPanel('foobar:my-message')`, `Editor.sendToMain('foobar:my-messages')`.

### Other way to listening messages

Besides the `messages` field, we also can use the Ipc method in Electron to listening messages:

In renderer process:

```js
require('electron').ipcRenderer.on('foobar:message', function(event, args) {});
```

In main process:

```js
require('electron').ipcMain.on('foobar:message', function(event, args) {});
```

For more about Electron's IPC methods, read [Electron API: ipcMain](http://electron.atom.io/docs/api/ipc-main/) [Electron API: ipcRenderer](http://electron.atom.io/docs/api/ipc-renderer/)。

## Add reply method

Suppose we send a message from main process:

```js
//packages/foobar/main.js
Editor.Ipc.sendToPanel('foobar', 'greeting', 'How are you?', function (error, answer) {
    Editor.log(answer);
});
```

In the `message` field in panel, we can call `event.reply` to reply the message:

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

NOTE: the first argument of `event.reply` is an Error, if nothing happend, just send `null` here. Except that, we recommend you check if `event.reply` exists, this will help us remember sending the reply.

### Handling Timeout

The last argument for send IPC message methods is the `timeout`, calculated by miliseconds, default is 5000ms.

If you don't want timeout to process, send `-1`. In this case, you must make sure the reply will be invoked, otherwise it will cause a memory leak.

When timeout triggerred, a timeout error will reply:

```js
Editor.Ipc.sendToMain('foobar:greeting', function (error, answer) {
  if ( error.code === 'ETIMEOUT' ) { //check the error code to confirm a timeout
    Editor.error('Timeout for ipc message foobar:greeting');
    return;
  }
  Editor.log(answer);
});
```