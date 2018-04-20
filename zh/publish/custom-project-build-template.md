# 自定义项目构建流程

## 自定义项目构建模版

Creator 支持对每个项目分别定制构建模板，只需要在项目路径下添加一个 `build-templates` 目录，里面按照平台路径划分子目录，然后里面的所有文件在构建结束后都会自动按照对应的目录结构复制到构建出的工程里。

结构类似：

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

这样如果当前构建的平台是 `web-mobile` 的话，那么 `build-templates/web-mobile/index.html` 就会在构建后被拷贝到 `build/web-mobile/index.html`。

## 扩展构建流程

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