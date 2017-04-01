# Entry Point

Each package can specify an entry file, the file will be loaded in the main process of Cocos Creator. Usually we do the following tasks in our entry file:

 - Initialize a package
 - Run background service
 - Call methods in the main process of Cocos Creator
 - Manage package's panels

Here is an example of an entry file:

```javascript
'use strict';

module.exports = {
  load () {
    console.log('package loaded');
  },

  unload () {
    console.log('package unloaded');
  },
};
```

## Lifecycle Callbacks

### load

When the package has been loaded, the `load` function will be invoked. This is the ideal place for us to do some initializing for the package.

### unload

When the package has been unloaded, the `unload` function will be invoked. You can clean up memory and unregister functions here.

## Register IPC messages

If you want to listen to IPC messages in main process, you can add it in `messages` field. Example:

```javascript
'use strict';

module.exports = {
  messages {
    'foo-bar' ( event ) { console.log('hello foobar'); },
    'scene:saved' ( event ) { console.log('scene saved!'); },
  },
};
```

### Short Message

Short message is the message name without a `:`. A short message will be expanded to `${your-package-name}:${message-name}` during package registration. Suppose our package name is "simple-demo", and the "foo-bar" in above example will be expanded to "simple-demo:foo-bar" in the end.    

In practice, we can send IPC messages to the short registry through `Editor.sendToPackage`:

```javascript
Editor.sendToPackage('simple-demo', 'foo-bar');
```

### Full Message

Full message is the message with `:`. Usually we use full message to listen the IPC message broadcast by other packages or other modules. You can clearly understand which package or module sending the message since the colon divide the message string into `package` and `method`.

For example the "scene:saved" is a message come from the builtin package --- "scene".   
