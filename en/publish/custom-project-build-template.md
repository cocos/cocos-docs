# Custom Project Build Process

## Custom Project Build Template

Creator support custom build template to project.    
You just need to add a folder `build-templates` in the project path, the sub-folder in `build-templates` should named with platform.   
Then all the files in the folder will be copied to build path according to the folder structure.

Folder Structure: 

```
project-folder
 |--assets
 |--build
 |--build-templates
      |--web-mobile
            |--index.html
      |--jsb-binary
            |--main.js
      |--jsb-default
            |--main.js
```

Example:

If current platform is `web-mobile`, then `build-templates/web-mobile/index.html` will be copied to `build/web-mobile/index.html`.

## Extend The Build Process

To extend the build process, it needs to be implemented in the **package**. If you are unfamiliar with the package, you can refer to [this document](../extension/your-first-extension.md) to quickly create a new package.

Open the `main.js` script in the package and add an event handler for `Editor.Builder` in the `load` and `unload` method:

```js
// main.js

var path = require('path');
var fs = require('fs');

function onBeforeBuildFinish (options, callback) {
    Editor.log('Building ' + options.platform + ' to ' + options.dest); // you can display a log in the Console panel

    var mainJsPath = path.join(options.dest, 'main.js');  // get path of main.js in build folder
    var script = fs.readFileSync(mainJsPath, 'utf8');     // read main.js
    script += '\n' + 'window.myID = "01234567";';         // append any scripts as you need
    fs.writeFileSync(mainJsPath, script);                 // save main.js

    callback();
}

module.exports = {
    load () {
        Editor.Builder.on('before-change-files', onBeforeBuildFinish);
    },

    unload () {
        Editor.Builder.removeListener('before-change-files', onBeforeBuildFinish);
    }
};
```

The event registered above is `'before-change-files'`, which is triggered **before** the end of the build. In addition to computing the file MD5 and encryption scripts for native platform, most build operations have been completed. You can further process the files that have been built in this event.

The `onBeforeBuildFinish` above is the event response function of `'before-change-files'`. You can register any number of response functions, which are executed sequentially. When the function is called, two arguments are passed in. The first argument is an object that contains the relevant options for this build, such as the build platform, build directory, debug mode, and so on. The second argument is a callback function that you need to manually invoke after the action of the response function completes, so that the subsequent build process continues, meaning that your response function can be asynchronous.

In addition, the events you can listen to are `'build-start'` and `'build-finished'`. The corresponding triggering time is the start of build and the end of build. Their usage is also the same, and they will not be repeated here.
