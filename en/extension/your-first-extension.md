# Your First Package

In this section, developers will learn how to create a simple Cocos Creator package and get introduced to the basics.

This walkthrough covers, addding a new package, registering a menu item in Cocos Creator's main menu and registering an IPC message in scripts.

## Create a New Package

First create an empty folder called "hello-world". After that, inside the folder, create two new files - "main.js" and "package.json". The structure of the package should look like this:

```
hello-world
  |--main.js
  |--package.json
```

Next, put the folder in `~/.CocosCreator/packages` (Windows users should use the following path instead: `C:\Users\${your-name}\.CocosCreator\packages`) to finish the installation. Alternatively you can put the folder in `${your-project}/packages` instead. That will make the package get loaded only when you open `${your-project}`.

## Editing package.json

Each package **must** have a `package.json` file under the root that describes it and its capabilities. Even though `package.json` may seem very similar to an npm-package in Node.js, they are very different in purpose. An npm package can not be directly used as a Creator extension, but a Creator extension can reference an npm package.

Here is a simple example of a `package.json` file:

```json
{
  "name": "hello-world",
  "version": "0.0.1",
  "description": "A simple extension",
  "author": "Cocos Creator",
  "main": "main.js",
  "main-menu": {
    "Examples/Hello World": {
      "message": "hello-world:say-hello"
    }
  }
}
```

Explanation:

- `name` String - The package name. Make sure the package name is unique. It's related to many things in package programming. If the plugin will be uploaded to the Cocos Store, there are certain restrictions on the package name. The `name` only allows **lowercase letters**, **numbers**, **hyphens (`-`)**, **underscores (`_`)**, **dots (`.`)**, and begin with a **lowercase letter** or **number**.
- `version` String - The version number. We highly recommend using [semver](http://semver.org/) standard for the version.
- `description` String (optional) - Describe the package in one sentence.
- `author` String (optional) - Author's name.
- `main` String (optional) - Package entry point.
- `main-menu` Object (optional) - Main menu registry.

## Entry Point

After finishing the `package.json` file, it is necessary to write a `main.js` script as the package's entry point:

```javascript
'use strict';

module.exports = {
  load () {
    // When the package loaded
  },

  unload () {
    // When the package unloaded
  },

  messages: {
    'say-hello' () {
      Editor.log('Hello World!');
    }
  },
};
```

The script will be loaded in the main process of Cocos Creator. After it has been successfully loaded, the `load` method will be invoked. Meanwhile, the functions live in `messages` will be registered as IPC message. For more details regarding IPC messages, please refer to the [introduction-to-ipc](introduction-to-ipc.md) documentation.

Here understand that the method in the `messages` defined in the `main.js` module will be registered as an IPC messages in our main process. The message name will be `${your-package-name}:${method-name}`, and the method will be the respond functoin.

## Run Your Package

Now, launch Cocos Creator. If everything goes right, there will be a new menu item called `Examples`, shown in the main menu. Clicking the `Examples` and selecting the `Hello World` will send a message "hello-world:say-hello" to the `main.js` in the package, which eventually will show a log "Hello World" in Cocos Creator's Console panel.

Congratulations! How does it feel to have finished your first package?
