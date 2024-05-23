# Introduction to IPC

Cocos Creator's packages use IPC to communicate with each other. It is important to understand the basic concepts of IPC for better working with packages.

Cocos Creator is based on [Electron](https://github.com/atom/electron). Under Electron's architecture, it has mainly two types of processes --- main process and renderer process. The main process is in charge of creating window, handling menu item click, dialog and so on. Every single window is a renderer process. To better understand the two process, please review [Electron's introduction](https://github.com/atom/electron/blob/master/docs/tutorial/quick-start.md) documentation. In short, treat the main process as a Node.js sever, and the renderer process is the user interface client.

Cocos Creator inherits Electron's main and renderer process architecture. When Creator stars up, several services run in the main process, including the Asset Database, Script Compiler, Preview Server and Package Builder, after the main window appears the renderer process is used to edit scene.

## IPC

Each process has its own javascript context, and the only way to communicate with each other is through IPC module. Electron provide us two modules [ipcMain](https://github.com/atom/electron/blob/master/docs/api/ipc-main.md) and [ipcRenderer](https://github.com/atom/electron/blob/master/docs/api/ipc-renderer.md) to achieve this. Cocos Creator encapsulate the two module and provide a better methods for complex scenarios.

## IPC Message Identifier

An IPC message is a string to identify the message between processes. The message sender sends the message with a specific identifier. Message receiver in other process that listens to the identifier code and will receive the message.

The pattern for an IPC message identifier is as follows:

```javascript
'module-name:action-name'
// or
'package-name:action-name'
```

## The Processes Used in Package

The package's entry point is running in the main process of Cocos Creator. If a window is created in the entry point of your package, it will start a renderer process.
