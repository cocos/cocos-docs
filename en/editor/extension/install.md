# Installation and sharing

**Cocos Creator** will search for and automatically open the extensions under the `Global` and `Project` paths during startup.

If you plan to apply the extension to all projects, you can put the extension under the `Global` path:

- **Windows** %USERPROFILE%\.CocosCreator\packages
- **Mac** $HOME/.CocosCreator/packages

If you only want to use this extension in the current project, put it in the `Project` path:

- $Your project address/packages

## Package Extension

After we write an extension, it may be necessary to share the extension with other people. At this time, we need to pack the extension into a compressed package.

First enter the directory where the extension is located, the directory structure is as follows:

```
hello-world
    |--package.json
    |--browser.js
```

Select all internal files (`package.json` and `browser.js`), type all files into a zip package, and name it `hello-world.zip`

The zip package content format is the same as the file format:

```
hello-world.zip
    |--package.json
    |--browser.js
```

**Please be careful not to nest another extension directory inside the zip**


## Install Extension Pack

First, find and open the top menu **Extension --> Extension Manager** button.

Then select the **Project** or **Global** tab in the **Extension Manager**, click the **+** button, and select the packaged zip file.

At this time the extension will be decompressed and placed in the specified location. And the newly imported extension is displayed on the **Extension Manager** interface.

Finally, find the extension in the **Extension Manager**, click **Open**, and the just selected extension can run normally.

## Uninstall the Installed Extension

Find the extension that needs to be deleted in the **Extension Manager**, and select **Delete** to close and delete the folder where the extension is located. If you only need to disable it, you can just select **Close**.

## Overload Extension

During the development process, sometimes it is necessary to modify the content of the extension, but after the modification, the logic of the extension will not be automatically updated. At this time, you need to manually reload the extension in the editor.

Find the corresponding extension in the **Extension Manager**.

Then select and click the **Reload** button. At this time, the extended code in the editor will be re-executed with the latest file.
