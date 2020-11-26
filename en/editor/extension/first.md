# First Extension

Through this article, we will learn to create a **Cocos Creator** extension and execute a custom script through the extension.

## Creating and Installing Extensions

__First__, find `~/.CocosEditor3D/packages`, on MacOS or `C:\Users\${your user name}\.CocosEditor3D\packages)`, or the `${your project path}/packages` folder on Windows. If the folder does not exist, create a new one.

__Second__, create an empty folder inside of the above mentioned folder named `hello-world`.

__Third__, create two files `browser.js` and `package.json` in the folder. These files will be empty. Use any text editor to create these files or on MacOS use `touch browser.js` and `touch package.json` from a command prompt.

The structure of the directory where the extension is located should be the following:

```
hello-world
  |--browser.js
  |--package.json
```

## Define the Description File package.json

Every extension needs a `package.json` file to describe the purpose of the extension. Only after the description file `package.json` is fully defined, can **Cocos Creator 3.0** know the specific functions defined in this extension, loading entry and other information.

Although the definition of many fields in `package.json` is similar to that of `node.js`'s npm package, they are obviously customized for different products and services. The npm module downloaded from the npm community cannot be directly put into **Cocos Creator 3.0** to become an extension, but one can use the modules in the npm community in the **Cocos Creator 3.0** extension.

To continue creating an extension, fill in the content in the newly created `package.json` file:

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

__Next__, it is necessary to define a messages object in contributions, which is the method of editor message registration. This message can be bound to one or more methods defined in the extension. For more definition data, please refer to the [Message](./contributions-messages.md) documentation.

__Next__, define a menu array in contributions to provide basic information of a menu to the menu component. Finally, bind this menu to a message. For more details, please refer to the [Menu](./contributions-menu.md) documentation.

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
exports.load = {};

// Execute when the extension is closed
exports.unload = {};
```

This entry program will be loaded during the startup of **Cocos Creator**. The methods defined in methods will be used as the operation interface, which can be called across extensions through [messages](./messages.md) or communicate with the panel.

## Runing an extension

__First__, open **Cocos Creator 3.0**, find and open the **Extension -> Extension Manager** at the top, and select the extension location (global or project) on the panel.

__Second__, find the **Refresh** button at the top and click to manually update the extended list information at that location. Then the extension list will show the extensions that have been found. Extensions can be started, closed, or restarted from the list control.

If the extension has been started, a **Develop** menu will appear in the top menu area with a `tester` menu item. After clicking, the message will be triggered according to the definition, and the corresponding method in the extension will be executed according to the message definition, and then the log information of `Hello World` will be printed out on the console.
