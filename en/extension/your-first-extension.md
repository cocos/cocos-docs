# Your First Package

In this article, we will teach you how to create a simple Cocos Creator package, and introduce to you the basic concept in a package.

In this walkthrough, you will add a new package, and register menu item in Cocos Creator's main menu, also register an IPC message in your script.

## Create a New Package

Let's create a package by creating an empty folder and rename it to "hello-world". After this we create two new files "main.js" and "package.json" in it. The structure of the package will looks like this:

```
hello-world
  |--main.js
  |--package.json
```

Now we put the folder to `~/.CocosCreator/packages` (Windows users should use the path `C:\Users\${your-name}\.CocosCreator\packages`) to finish the installation. Or you can put the folder to `${your-project}/packages`, that will make your package only loaded when you open `${your-project}`.

## Editing package.json

Each package **must** have a `package.json` file under the root that describes it and its capabilities. Though the `package.json` is inpired by npm-package in Node.js community, they are very different in purpose. So you can not directly use an npm package in Cocos Creator.

Here is a simple example of `package.json`:

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

 - `name` String - The package name. Make sure your package name is uniqued, it relate to many things in package programming.
 - `version` String - The version number, we highly recommend you use [semver](http://semver.org/) standards for your version.
 - `description` String (optional) - Describe your package in one sentence.
 - `author` String (optional) - Author name.
 - `main` String (optional) - Package entry point.
 - `main-menu` Object (optional) - Main menu registry.

## Entry Point

After you finish your `package.json`, you need to write a `main.js` script as your package's entry point:

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

The script will be loaded in the main process of Cocos Creator. After it is been successfully loaded, the `load` method will be invoked. Meanwhile, the functions live in `messages` will be registered as IPC message. For more details about IPC message, read in [introduction-to-ipc](introduction-to-ipc.md).

Here we just need to understand, the method in the `messages` defined in your `main.js` module will be registered as an IPC messages in our main process. The message name will be `${your-package-name}:${method-name}`, and the method will be the respond functoin.

## Run Your Package

Now you can start your Cocos Creator, if everything goes right, you will find a new menu item `Examples` show in your main menu. Click the `Examples` and select the `Hello World` will send a message "hello-world:say-hello" to your `main.js` in your package, which eventually will show a log "Hello World" in Cocos Creator's Console panel.    

Congratulations! You finish your fist package. 
