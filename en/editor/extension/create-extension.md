# Generating extensions using templates

This document will demonstrate how to create an extension containing a panel using a template and install and enable this extension.

## Creating an extension using a template and installing it

First, click on **Extension -> Open the Create Extensions panel** in the top menu.

<img src="../../../zh/editor/extension/image/create-extension-panel.png" alt="create-extension-panel" style="zoom:67%;" />

Here, select the type of extension to be created, name the extension and set some basic information about the extension.
As shown in the picture, an extension containing a panel is being created. Name it `first-extension` and the author is `cocos`, this extension depends on the editor version 3.3.0 or higher. Generate the extension in the project and show it in the explorer and extension manager.

### Build the example extension

The development environment for the extension is `Node.js`.
Following the prompt in the extension's `README`, execute the following command in the extension's directory.

```bash
# Install dependent modules
npm install
# Build
npm run build
```

The extension generated is based on the `Typescript` workflow, the development has full hints. `tsc` needs to be used to compile the code. After modifying the code, the editor can only read the compiled Javascript code. This means each modification requires executing the build command `npm run build` in the extension or use the command `npm run watch` in the open listening to automatically compile when the code changes.

### Enabling the example extension

After the extension has been built, it is found as `first-extension` extension in the Extension Manager panel. Enable it.

## Using the features of this extension

The `README` document for this extension shows how it will be used.

Click `Panel -> first-extension -> Default Panel` in the top menu to open the panel.

Click `Developer -> first-extension -> Send message to panel` in the top menu to send a message to the default panel, which will call the `hello` method of the panel if it exists.

After clicking `send-to-panel`, a message `send-to-panel` will be sent to the extension according to the definition of `contributions.menu` in `package.json`. When the extension receives a `send-to-panel`, it will cause the `default` panel to call the `hello` method, as defined by `contributions.messages` in `package.json`.
