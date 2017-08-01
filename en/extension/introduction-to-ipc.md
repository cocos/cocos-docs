# introduction to IPC

Cocos Creator's packages use IPC to communicate with each other. We must understand the basic concept of IPC for better working with packages.

Cocos Creator is based on [Electron](https://github.com/atom/electron). Under the Electron's architecture, it has mainly two types of processes --- main process and renderer process. The main process is in charge of creating window, handling menu item click, dialog and so on. Every single window is a renderer process. To better understand the two process, you can read [Electron's introduction document](https://github.com/atom/electron/blob/master/docs/tutorial/quick-start.md). In short, you can treat the main process as a Node.js sever, and the renderer process is the user interface client.  

Cocos Creator inherits Electron's main and renderer process architecture. When Creator startup, we will run several service in the main process such as: Asset Database, Script Compiler, Preview Server and Package Builder, after that we start the main window a.k.a the renderer process to edit scene.  

## IPC

Each process has its own javascript context, and the only way to communicate with each other is through IPC module. Electron provide us two modules [ipcMain ](https://github.com/atom/electron/blob/master/docs/api/ipc-main.md) and [ipcRenderer](https://github.com/atom/electron/blob/master/docs/api/ipc-renderer.md) to achieve this. Cocos Creator encapsulate the two module and provide a better methods for complex scenarios.

## IPC Message Identifier

An IPC message is a string to identify the message between processes. The message sender sends the message with a specific identifier. And message receiver in other process who listen to the identifier code will receive the message.

We recommend the following pattern for an IPC message identifier:

```javascript
'module-name:action-name'
// or
'package-name:action-name'
```

## The Processes Used in Package

The package's entry point is running in the main process of Cocos Creator. If you create a window in the entry point of your package, it will start a renderer process.
