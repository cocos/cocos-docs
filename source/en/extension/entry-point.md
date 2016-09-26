# Entry Point

Each packages can specify an entry file, the file will be loaded in the main process of Cocos Creator. Usually we do the following tasks in our entry file:

 - Initialize our package
 - Run background service
 - Call methods in the main process of Cocos Creator
 - Manage package's panels

Here is an example of our entry file:

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

When the package has been loaded, the `load` function will be invoked. This is ideal place for us to do some initialize stuff for the package.

### unload

When the package unloaded, the `unload` function will be invoked. We can clean up memory, unregister functions in here.

## Register IPC messages

If you want to listen to IPC messages in main process, you can add it in `messages` field. Here is an example:

```javascript
'use strict';

module.exports = {
  messages {
    'foo-bar' ( event ) { console.log('hello foobar'); },
    'scene:saved' ( event ) { console.log('scene saved!'); },
  },
};
```

We can see the two message naming styles in the above code:

### Short Message

Short message is the message name without `:`. A short message will be extends to `${your-package-name}:${message-name}` during registry. Suppose our package name is "simple-demo", and the "foo-bar" in above example will be extends to "simple-demo:foo-bar" in the end.    

In practice, we can send IPC message to theses short registry through `Editor.sendToPackage`:

```javascript
Editor.sendToPackage('simple-demo', 'foo-bar');
```

### Full Message

Full message is the message with `:`. Usually we use full message to listen the IPC message broadcast by other packages or other modules. You can clearly understand which package or module sending the message since the colon divide the message string into `package` and `method`.

For example the "scene:saved" is a message come from the builtin package --- "scene".   
