# Extension Infrastructure

Before writing an extension, we first need to understand the infrastructure of extensions within Cocos Creator.

## Electron

The Cocos Creator editor is based on the [Electron](https://github.com/atom/electron) kernel from GitHub.

Electron is a cross-platform development framework that integrates with [Node.js](https://nodejs.org/) and [Google Chromium](https://github.com/chromium/chromium).

## Multi-process Mechanism

In Electron's architecture, an application consists of a main process and a rendering process, with the main process managing platform-related scheduling, such as window opening and closing, menu options, basic dialogs, and so on. Each newly opened window is a separate rendering process. Each process has its own JavaScript content and is not directly accessible to each other. When data needs to be passed between processes, the Inter-Process Communication (IPC) mechanism is used.

You can read [Electron's introduction document](https://github.com/atom/electron/blob/master/docs/tutorial/quick-start.md) for a more in-depth understanding of the features The relationship between the main process and the rendering process in Electron.

To put it simply, the main process in Electron is equivalent to a Node.js server application, while each window (rendering process) is equivalent to a client-side web application.

The Cocos Creator editor follows the structure of Electron's main process and rendering process. So when the extension is started and run inside the editor, the main defined by the extension is actually started in the main process, while the panels defined by the panels are started in the rendering process. The process structure is briefly summarized as follows.

![electron-process](./image/electron-process.png)

## Inter-process Communication

Inter-process communication is actually the process of sending a message in one process and listening to it in another process.

Electron provides modules `ipcMain` and `ipcRenderer` for inter-process communication to help us with this task.

Since these two modules only perform very basic communication functions and do not satisfy the communication needs between the editor, extension panel and the main process, Cocos Creator wraps this and extends the method of sending and receiving messages between processes to make it easier for extension developers and editor developers to create more complex scenarios. For more details, please see the documentation [Message System](./messages.md).

## Capabilities of extensions

With a full Node.js environment inside the extension, it is easy to use the large number of tools available on the npm marketplace for the functionality you want.

If you need to interact with other features, you need to open up the corresponding operation messages for the corresponding features, and we do this within our own extension, via [Message System](./messages.md) to trigger, query and process functions or data in the editor.

The list of opened messages can be viewed in the top menu **Developer -> Message Manager** panel, as shown below.

![extension-message-mgr-menu](./image/extension-message-mgr-menu.png)

![extension-message-mgr-panel](./image/extension-message-mgr-panel.png)
