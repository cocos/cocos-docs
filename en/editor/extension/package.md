# Extended system

Before writing an extension, first understand the basic structure of extensions in **Cocos Creator**.

The **Cocos Creator** editor is based on the [Electron](https://github.com/atom/electron) kernel. Electron is a cross-platform development framework that integrates **Node.js** and **Chromium**.

In Electron's architecture, an application consists of a main process and a rendering process. The main process is responsible for managing platform-related scheduling, such as opening and closing windows, menu options, basic dialog boxes, and so on. Each newly opened window is an independent rendering process. In Electron, each process independently enjoys its own JavaScript content and cannot directly access each other. When you need to transfer data between processes, you need to use inter-process communication (IPC). Related functions can be read in the [Electron's introduction document](https://github.com/atom/electron/blob/master/docs/tutorial/quick-start.md) to have a deeper understanding of the main process and rendering process in Electron relationship. To put it simply, the main process of Electron is equivalent to a Node.js server program, and each window (rendering process) is equivalent to a client web program.

The **Cocos Creator** editor follows the structural design of Electron's main process and rendering process. When the extension starts and runs in the editor, the main defined by the extension is actually started in the main process, and the panel defined by panels is started in the rendering process. The process structure is briefly summarized as follows:

```
Browser
  |- panelA
  |- panelB
  ...
```

## Communication

As previously mentioned, the JavaScript content between the two processes is independent of each other, and data must be exchanged by means of inter-process communication. Inter-process communication is actually the process of sending messages in one process, and then listening for messages in another process. Electron provides modules ipcMain and ipcRenderer corresponding to inter-process communication to help us accomplish this task. Since these two modules only complete very basic communication functions, and cannot meet the communication requirements between the editor, the expansion panel and the main process, **Cocos Creator** has been encapsulated on top of this, and the inter-process messaging is expanded. The method is convenient for extension developers and editor developers to create more complex scenarios. For more instructions, please see the [Message](./messages.md) documentation.

## Extended Ability

The extension has a complete nodejs environment, which makes it easy to use a large number of tools on the npm market. Used to complete the function you want.

If you need to interact with other functions, you need to open the corresponding operation message for the corresponding function. In extensions, use the [messages](messages.md) to trigger, query, and process the functions or data in the editor. The open message list can be viewed in the top menu **Developer -> Message List** panel.

In addition, you can also use some tools to facilitate the development of extensions, such as:

1. Use TypeScript to develop extensions. After compiling into js, ​​fill the compiled js into `package.json` for the editor to run.
2. After the template rendering in the panel is completed, use vue to bind the data to facilitate interactive development of the panel.

The extension only agrees to the entrance, during which a large number of external libraries can be used to optimize the development process.
