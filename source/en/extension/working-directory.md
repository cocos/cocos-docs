# Working Directory

## Project Path

- `Editor.projectPath` The absolute path of current project.

## Custom Protocols

We introduce the custom protocols to ease the path search in main and renderer process.

- `db://` Introduced in [Asset Management](asset-management.md), will mapping the root direcotry of assets. We can get assets by writing `db://assets/script/MyScript.js`
- `packages://` The packages installed path. Mapping to local project's `packages` folder and global package folder `$HOME/.CocosCreator/packages` 映射到项目本地的插件目录 `packages` 和全局的插件目录 `$HOME/.CocosCreator/packages`, for example `packages://foobar/package.json` means the `foobar` package's `package.json` file.
- `unpack://` The unpacked folder in Cocos Creator, including:
  - `unpack://engine` JavaScript Enigne Path
  - `unpack://cocos2d-x` C++ Engine Path
  - `unpack://simulator` Simulator Path

You can use `Editor.url()` convert the url to absolute path.

### Use seprate html and css file in panel define

We can use `Editor.url` define the HTML and CSS so that they lives in the separate file:

```js
var Fs = require('fs');
Editor.Panel.extend({
  // css style for panel
  style: Fs.readFileSync(Editor.url('packages://foobar/panel/index.css', 'utf8')),

  // html template for panel
  template: Fs.readFileSync(Editor.url('packages://foobar/panel/index.html', 'utf8')),
  //...
});
```