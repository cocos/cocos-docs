# Editor.IpcListener

## Class: Editor.IpcListener

### new Editor.IpcListener ()

## Instance Methods

### ipcListener.on (message, callback)

  - `message` string
  - `callback` function

Register IPC message and respond it with the callback function.

### ipcListener.once (message, callback)

  - `message` string
  - `callback` function

Register IPC message and respond it once with the callback function.

### ipcListener.clear ()

Clear all registered IPC messages in the listener.
