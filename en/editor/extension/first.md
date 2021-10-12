# First Extension

Through this article, we will learn to create a Cocos Creator extension and execute a custom script through the extension.

## Creating and Installing Extensions

Click **Extension -> Create Extension** in the menu bar of the editor, and select **Global**/**Project** to create a extension package.

- If selecting **Global**, the extension will be applied to all Cocos Creator projects. The path of **Global** is:

    - **Windows**: `%USERPROFILE%\.CocosCreator\extensions`

    - **Mac**: `$HOME/.CocosCreator/extensions`

- If selecting **Project**, this will apply the extension to the specified Cocos Creator project. The path of **Project** is:

    - `$Your project address/extensions`

Then click **Extension -> Create Extension -> Project/Global** in the top menu bar to see the extension you just created, with the default name `Simple`, accompanied by a string of numbers. Click the folder icon button on the right to open the extension package, which has the following directory structure:

```
Simple-1634039781912
  |--browser.js
  |--package.json
```

## Define the Description File package.json

Every extension needs a `package.json` file to describe the purpose of the extension. Only after the description file `package.json` is fully defined, can Cocos Creator know the specific functions defined in this extension, loading entry and other information.

Although the definition of many fields in `package.json` is similar to that of `node.js`'s npm package, they are obviously customized for different products and services. The npm module downloaded from the npm community cannot be directly put into Cocos Creator to become an extension, but one can use the modules in the npm community in the Cocos Creator extension.

To continue creating an extension, fill in the content in the `package.json` file:

```json
{
    "name": "hello-world",
    "version": "1.0.0",
    "main": "./browser.js",
    "description": "A simple extension",
    "contributions": {
        "menu": [{
            "path": "Develop",
            "label": "test",
            "message": "log"
        }],
        "messages": {
            "log": {
                "methods": ["log"]
            }
        }
    }
}
```

The meanings of the fields are as follows:

- `name` String -- Defines the package name, which is globally unique and relates to the login name on the official website server in the future.

  > **Note**: if the plugin will be uploaded to the Cocos Store, there are certain restrictions on the package name. The `name` only allows **lowercase letters**, **numbers**, **hyphens (`-`)**, **underscores (`_`)**, **dots (`.`)**, and begin with a **lowercase letter** or **number**.

- `version` String -- The version number. We recommend using the [semver](http://semver.org/) standard to manage your package versions.
- `main` String (optional) -- The entry file
- `description` String (optional) -- Describe your package in one sentence.
- `contributions` Object (optional) -- Configuration objects that extend the existing functionality of the editor.
    - `menu` array -- Define a `menu` array in `contributions` to provide basic information of a menu to the menu component. Finally, bind this menu to a message. For more details, please refer to the [Menu](./contributions-menu.md) documentation.
    - `messages`: Object -- It is necessary to define a `messages` object in `contributions`, which is the method of editor message registration. This message can be bound to one or more methods defined in the extension. For more definition data, please refer to the [Message](./contributions-messages.md) documentation.

Then go back to the **Extension Manager** panel of the editor, click the Refresh icon button on the right side of the extension, and the name of the extension will be changed to `hello-world`.

Careful that after the menu is pressed, the triggered action is notified by the message between the extensions, and the message system is the way of interaction between the extensions.

For a detailed `package.json` format definition, please refer to the [Extension](./define.md) documentation.

## Entry program browser.js

After defining the description file, the next step is to write the entry program `browser.js`.

The content is as follows:

```javascript
'use strict';

// The method defined in the extension
exports.methods = {
    log() {
        console.log('Hello World');
    },
};

// Execute when the extension is started
exports.load = function() {};

// Execute when the extension is closed
exports.unload = function() {};
```

This entry program will be loaded during the startup of Cocos Creator. The methods defined in methods will be used as the operation interface, which can be called across extensions through [messages](./messages.md) or communicate with the panel.

## Running an extension

__First__, go back to the **Extension Manager** panel of Creator and select the location of the extension (Global or Project).

__Second__, find the Refresh icon button on the right side of the extension and click to manually update the extension list information at that location. Then the extension list will show the extensions that have been found. Extensions can be started, closed, or restarted from the list control.

If the extension has been started, a **Develop** menu will appear in the top menu area with a `tester` menu item. After clicking, the message will be triggered according to the definition, and the corresponding method in the extension will be executed according to the message definition, and then the log information of `Hello World` will be printed out on the console.
