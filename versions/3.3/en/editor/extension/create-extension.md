# Generating extensions using templates

This document will demonstrate how to create an extension containing a panel using the extension template provided by Creator and use it.

## Creating extensions

Creator provides several extension templates, including **HTML Panel**, **Vue2.x Panel**, **Vue3.x Panel**, etc., you can click **Extension -> Create Extension** in the top menu bar of the editor for details, and then select the corresponding extension template as needed to create a new extension.

![create-extension-panel](./image/create-extension-panel.png)

| Option | Description |
| :--- | :----- |
| **Extension's name** | Cannot start with `_` or `.` and cannot contain uppercase letters. Because the extension name will be part of the URL, it also cannot contain illegal characters of the URL, such as `.`, `'` and `,`. |
| **Author** | Author of extension |
| **Editor dependency version** | The extension runtime created requires a version of Creator, currently requiring a minimum of v3.3.   |
| **Show in manager** | If this is checked, when the creation of an extension is complete, **Extension Manager** will automatically open and display the created extension. <br>If this is unchecked, then when the extension is created, you can click **Extensions -> Extension Manager** in the top menu bar of the editor to see it. |
| **Show in folder** | If this option is checked, the extension will be automatically opened in the system file manager when the extension is created. |
| **Location** | The directory where the created extension package is located, you can choose the **Project**/**Global** directory. <br>If choosing the **Global** directory, the extension package will be applied to all Creator projects with the global path `%USERPROFILE%\.CocosCreator\extensions`<br>If choosing the **Project** directory, the extension package will be applied to the specified Creator project with the project path `$your project address\extensions`.|

After setting the extension information, click the **Create Extension** button in the lower right corner to create the extension.

### Building extensions

After the extension is created, open the directory where the extension package is located and execute the following command.

```bash
# Install dependent modules
npm install
# Build
npm run build
```

Each extension comes with some definitions of its own, but all depend on the **Node.js** environment and usually use some third-party packages on **Node.js**. So before enabling the extensions you need to run `npm install` in the extensions directory to install the dependent modules in order to compile them properly.

Creator recommends using TypeScript-based workflows, and most of the extension templates provided by default in Creator are based on TypeScript, so that you can write with full code hints. However, TypeScript needs to be compiled with `npm run build` before it can run.

> **Note**: the extension's `tsconfig.json` configuration file has `resolveJsonModule` enabled to get the extension name from the imported extension's `package.json`, so TypeScript needs to be upgraded to **v4.3**, otherwise you will get a compile result path error when importing `json` from outside the root directory.

### Enabling extensions

After the extension is created and compiled, go back to the editor, click **Extensions -> Extension Manager** in the top menu bar, find the created extension in the **Projects**/**Global** tab of **Extension Manager**, and then click the **Enable** button on the right to enable the extension.

![enable extension](./image/enable-extension.png)

## Using extensions

Take an extension created with the **Vue2.x panel** template as an example.

Click **Panel -> Extension Name -> Default Panel** in the top menu bar after enabling the extension to open the default panel of the extension.

![default extension panel](./image/default-extension-panel.png)

Click **Developer -> Extension Name -> Send Message to Panel** in the top menu bar to send a message `send-to-panel` to the extension based on the definition of `contributions.menu` in `package.json`. When the extension receives the message, it calls the default `hello` method in the extension's default panel according to the `contributions.messages` definition in `package.json`, and then displays the log message `hello` in the default panel and prints it to the **console**.

![output](./image/output.png)

> **Note**: the extensions created by each template are not exactly the same, for more information please refer to the `README.md` file in the corresponding extension package directory.
