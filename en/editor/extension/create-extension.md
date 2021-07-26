# Generating extensions using templates

With this article we will learn how to create an extension containing a panel using a template and install and enable this extension.

## Create extension by template and install it

First we click on **Extension -> Open the Create Extensions panel** in the top menu， 

<img src="../../../zh/editor/extension/image/create-extension-panel.png" alt="create-extension-panel" style="zoom:67%;" />

Here we can select the type of extension we want to create, name the extension and set some basic information about the extension.
As shown in the picture, we have chosen an extension containing a panel, named it `first-extension` and the author is `cocos`, this extension depends on the editor version 3.3.0 or higher, we will generate the extension in the project and show it in the explorer and extension manager.

### Build this extension

The development environment for the extension is `Node.js`.
Following the prompt in the extension's `README`, we execute the following command in the extension's directory.

```bash
# Install dependent modules
npm install
# Build
npm run build
```

The extension we generate is based on the `Typescript` workflow, the development has full hints, we need to use `tsc` to compile the code after modifying the code, the editor can only read the compiled js code, so after each modification requires us to execute the build command `npm run build` in the extension or use the command `npm run watch` in the open listening to automatically compile when the code changes

### Enable this extension

After the extension has been built, we find the `first-extension` extension in the Extension Manager panel and enable it.
 Enable this extension

## Use the features of this extension

According to the `README` documentation of the extension, we can see how it is used

Click `Panel -> first-extension -> Default Panel` in the top menu to open the panel.

Click `Developer -> first-extension -> Send message to panel` in the top menu to send a message to the default panel, which will call the `hello` method of the panel if it exists.

After clicking `send-to-panel`, a message `send-to-panel` will be sent to the extension according to the definition of `contributions.menu` in `package.json`. When the extension receives a `send-to-panel`, it will cause the `default` panel to call the `hello` method, as defined by `contributions.messages` in `package.json`.

