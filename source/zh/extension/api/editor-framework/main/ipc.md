# Editor.Ipc

## Methods

### Editor.Ipc.cancelRequest (sessionID)

 - `sessionID` string - Session ID.

Cancel request sent to main or renderer process.

### Editor.Ipc.option (opts)

 - `opts` object
   - `excludeSelf` boolean - exclude send ipc message to main process when calling `Editor.Ipc.sendToAll`.

Ipc option used in `Editor.Ipc.sendToAll`.

### Editor.Ipc.sendToAll (message[, ...args, option])

 - `message` string - Ipc message.
 - `...args` ... - Whatever arguments the message needs.
 - `option` object - You can indicate the last argument as an IPC option by `Editor.Ipc.option({...})`.

Send `message` with `...args` to all opened window and to main process asynchronously.

### Editor.Ipc.sendToMain (message[, ...args, callback, timeout])

 - `message` string - Ipc message.
 - `...args` ... - Whatever arguments the message needs.
 - `callback` function - You can specify a callback function to receive IPC reply at the last or the 2nd last argument.
 - `timeout` number - You can specify a timeout for the callback at the last argument. If no timeout specified, it will be 5000ms.

Send `message` with `...args` to main process asynchronously. It is possible to add a callback as the last or the 2nd last argument to receive replies from the IPC receiver.

Example:

**Send IPC message (main process)**

```js
Editor.Ipc.sendToMain('foobar:say-hello', err => {
  if ( err.code === 'ETIMEOUT' ) {
    console.error('Timeout for ipc message foobar:say-hello');
    return;
  }

  console.log('foobar replied');
});
```

**Receive and Reply IPC message (main process)**

```js
require('ipc').on('foobar:say-hello', event => {
  event.reply('Hi');
});
```

### Editor.Ipc.sendToMainWin (message[, ...args])

 - `message` string - Ipc message.
 - `...args` ... - Whatever arguments the message needs.

 Send `message` with `...args` to the main window asynchronously.

### Editor.Ipc.sendToPanel (panelID, message[, ...args, callback, timeout])

 - `panelID` string - Panel ID.
 - `message` string - Ipc message.
 - `...args` ... - Whatever arguments the message needs.
 - `callback` function - You can specify a callback function to receive IPC reply at the last or the 2nd last argument.
 - `timeout` number - You can specify a timeout for the callback at the last argument. If no timeout specified, it will be 5000ms.

Send `message` with `...args` to panel defined in renderer process asynchronously. It is possible to add a callback as the last or the 2nd last argument to receive replies from the IPC receiver.

Example:

**Send IPC message (main process)**

```js
Editor.Ipc.sendToPanel('foobar', 'foobar:say-hello', err => {
  if ( err.code === 'ETIMEOUT' ) {
    console.error('Timeout for ipc message foobar:say-hello');
    return;
  }

  console.log('foobar replied');
});
```

**Receive and Reply IPC message (renderer process)**

```js
Editor.Panel.extend({
  messages: {
    'foobar:say-hello' (event) {
      event.reply('Hi');
    }
  }
});
```

### Editor.Ipc.sendToWins (message[, ...args])

 - `message` string - Ipc message.
 - `...args` ... - Whatever arguments the message needs.

Send `message` with `...args` to all opened windows asynchronously. The renderer process can handle it by listening to the message through the `Electron.ipcRenderer` module.

Example:

**Send IPC message (main process)**

```js
Editor.Ipc.sendToWins('foobar:say-hello', 'Hello World!');
```

**Receive IPC message (renderer process)**

```html
<html>
  <body>
    <script>
      require('ipc').on('foobar:say-hello', (event, text) => {
        console.log(text);  // Prints "Hello World!"
      });
    </script>
  </body>
</html>
```
