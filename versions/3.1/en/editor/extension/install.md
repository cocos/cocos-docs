# Installation and Sharing

__Cocos Creator__ will search for and automatically load extensions in both __Global__ and __Project__ extension package paths during project startup.

If you want to apply the extension to all projects, you can put the extension package under the __Global__ path:

- **Windows**: `%USERPROFILE%\.CocosCreator\extensions`
- **macOS**: `$HOME/.CocosCreator/extensions`

If you only want to apply the extension to the specified project, you can put the extension package under the __Project__ path:

- `$Your project address/extensions`

## Package Extension

After writing an extension, if you want to share the extension with others, you need to compress the extension package.

For example, the directory structure of the extension package `hello-world`, if placed in the project extension package path, is as follows:

```
MyProject
 |--assets
 |--extensions
     |--hello-world
        |--package.json
        |--browser.js
  ...
```

Select all the internal files for `hello-world` (`package.json` and `browser.js`), and compress all the files into a zip file named `hello-world.zip`.

The content format of the `hello-world.zip` is the same as the file format of `hello-world`.

```
hello-world.zip
    |--package.json
    |--browser.js
```

> **Note**: please be careful not to nest another layer of extension directory inside the zip package

## Install Extension

- First, click __Extension -> Extension Manager__ in the top menu bar of the editor to open the __Extension Manager__ panel.

  ![extension-manager](image/extension-manager.png)

- Then select the __Project/Global__ tab in the __Extension Manager__, click the __+__ button, select the packaged extension `.zip` file in the pop-up file selection window, and click __Open__. The imported extension `.zip` file will be unpacked and placed in the specified location (__Project__/__Global__ extensions path).

- Finally, find the extension in the __Project/Global__ tab of the __Extension Manager__ panel, click the __Enable__ button on the right, and the extension you just imported will run normally.

## Uninstall the Installed Extension

Find the extension that needs to be deleted in the __Extension Manager__ panel, click the "Delete" icon button, and the folder where the extension is located will be deleted as well. If you only need to disable the extension, you can just select the "Disable" button on the right.

## Overload Extension

During the development process, sometimes it is necessary to modify the content of the extension, but after the modification, the logic of the extension will not be automatically updated. At this point it is necessary to reload the extension manually in the editor.

Find the corresponding extension in the **Extension Manager** panel and click the "Reload" icon button, and the extension in the editor will be re-run with the latest code and files.
