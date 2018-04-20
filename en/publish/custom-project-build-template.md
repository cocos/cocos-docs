# Custom Project Build Template

## Custom Project Build Process

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

```js
function unpackZip(opts, cb) {
    if (opts.platform !== FB_INSTANT_GAMES_PLATFORM) {
    return cb();
    }

    let jsZip = new JSZip();
    _addFileToZip(opts.dest, jsZip, () => {
          
    let basePath = Path.join(opts.dest, opts.title); 
    jsZip.generateNodeStream({type: "nodebuffer"}).pipe(Fs.createWriteStream(basePath+ '.zip')).on('finish', () => {
                
    // Mac does not support opening suffixed files
    if (!Editor.isWin32) {
        basePath = Path.dirname(basePath);
    }
        Electron.shell.showItemInFolder(basePath);
        cb();
        });
    });
}
```

```js
function handleFiles (options, cb) {
    let data = Editor._projectProfile.data['cocos-analytics'];
    
    if (data.enable) {
        if (!PlatformConfigs[options.platform].isNative) {
            updateIndexFile(options, data);
        }
            updateMainJsFile(options, data);
        }

    cb();
}
```

```js
module.exports = {

    load() {
        Editor.Builder.on('build-start', unpackZip);
        Editor.Builder.on('build-finished', unpackZip);
        Editor.Builder.on('before-change-files', handleFiles);   
    },

    unload() {
        Editor.Builder.removeListener('build-start', unpackZip);
        Editor.Builder.removeListener('build-finished', unpackZip);
        Editor.Builder.removeListener('before-change-files', handleFiles);        
    }
};
```