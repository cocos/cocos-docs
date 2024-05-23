# 工作路径和常用 URL

## 访问项目路径

- `Editor.Project.path`（主进程）当前在编辑器打开项目的根目录绝对路径。

## 自定义协议 URL

由于主进程和渲染进程在路径查询上有复杂的差异，我们引入了一些自定义协议的 URL 来方便的访问各个不同模块和路径的文件

- `db://` 在 [管理项目资源](asset-management.md) 中介绍过，这个协议会映射到项目根目录，可以直接写 `db://assets/script/MyScript.js` 来获取特定的项目文件。注意在运行编辑器时的插件加载阶段，不能使用 `Editor.url('db://')`，这个阶段还没有初始化项目路径，要在编辑器窗口初始化完毕，项目文件全部加载后才能使用。
- `packages://` 映射到项目本地的插件目录 `packages` 和全局的插件目录 `$HOME/.CocosCreator/packages`，也就是说在这两个目录下的任何扩展包和其中的文件都可以通过这个协议索引，如 `packages://foobar/package.json` 就表示 `foobar` 这个扩展包中的配置文件。
- `unpack://` 访问 Cocos Creator 安装目录下的开源内容，包括
  - `unpack://engine` JavaScript 引擎路径
  - `unpack://cocos2d-x` C++ 引擎路径
  - `unpack://simulator` 模拟器路径

要将这些自定义协议 URL 转换为绝对路径，使用 `Editor.url()` 接口。

### 声明面板时使用独立的 HTML 和 CSS 文件

使用 `Editor.url` 配合插件路径，我们就可以在声明面板的时候读取其他文件里包含的 HTML 和 CSS 定义，如：

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