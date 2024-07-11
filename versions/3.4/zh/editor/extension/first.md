# 第一个扩展

我们将通过本文，学会创建一个 Creator 扩展，并通过扩展执行一段自定义脚本。

## 创建并安装扩展

在编辑器的菜单栏中点击 **扩展 -> 创建扩展**，选择 **全局**/**项目** 后即可创建一个扩展包。

- 若选择 **全局**，则是将扩展包应用到所有的 Cocos Creator 项目，**全局** 路径为：

    - **Windows**：`%USERPROFILE%\.CocosCreator\extensions`

    - **MacOS**：`$HOME/.CocosCreator/extensions`

- 若选择 **项目**，则是将扩展包应用到指定的 Cocos Creator 项目，**项目** 路径为：

    - `$你的项目地址/extensions`

创建扩展时会提示是否直接启动该扩展，可根据需要自行选择（示例中选择启动）：

![whether enable extension](first/enable-or-not.png)

然后点击顶部菜单栏中的 **扩展 -> 扩展管理器 -> 项目/全局**，即可看到刚才创建的扩展，默认名称为 `simple-时间戳`：

![extension](first/extension.png)

- ![folder](first/folder.png)：在操作系统的文件管理器中打开扩展包
- ![refresh](first/refresh.png)：刷新扩展
- ![delete](first/delete.png)：删除扩展
- ![enable](first/enable.png)：启动/关闭扩展

点击 ![folder](first/folder.png) 按钮打开扩展包，扩展包的目录结构如下：

![extension package](first/extension-package.png)

## 定义描述文件 `package.json`

每个扩展都需要有一份 `package.json` 文件，用于描述扩展的用途。只有完整定义了描述文件 `package.json` 后，编辑器才能知道这个扩展里定义的具体功能，以及加载入口等信息。

虽然 `package.json` 在很多字段上的定义和 `node.js` 的 npm package 相似，但它们显然是为不同的产品服务而特殊定制的。所以从 npm 社区中下载的 npm 模块，并不能直接放入到 Cocos Creator 中变成扩展，但是我们可以在 Creator 扩展中使用 npm 社区里的模块。

让我们接着刚刚的操作，打开 `package.json` 文件，可以看到以下内容：

```json
{
    "name": "simple-1634093231454",
    "package_version": 2,
    "version": "1.0.0",
    "description": "A Simple Extension",
    "author": "Unknown",
    "main": "browser.js"
}
```

将其改为：

```json
{
    "name": "hello-world",
    "package_version": 2,
    "version": "1.0.0",
    "description": "A Simple Extension",
    "author": "Unknown",
    "main": "browser.js",
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

其中字段含义如下：

- `name` String - 定义了包的名字，包的名字是全局唯一的，关系到今后在官网服务器上登录时的名字

  > **注意**：插件若要上传到 Cocos Store，对包名有一定的限制，只允许使用 **小写字母**、**数字**，**连字符（`-`）**、**下划线（`_`）** 和 **点（`.`）**，并以 **小写字母** 或 **数字** 开头。

- `version` String：版本号，我们推荐使用 [semver](http://semver.org/) 格式管理你的包版本。

- `main` String（可选）：入口程序文件

- `description` String（可选）：一句话描述你的包是做什么的

- `contributions` Object（可选）：对编辑器已有功能进行扩展的配置对象
    - `menu`：数组，向 menu 组件提供一个菜单的基础信息，最后将这个菜单绑定到一条的消息。具体内容请参考 [扩展主菜单](./contributions-menu.md)。
    - `messages`：`messages` 对象，这是编辑器消息注册的方法，这个消息可以绑定一个或多个的扩展内定义的方法。更多定义数据请参考 [消息通信](./contributions-messages.md)。

更多关于 `package.json` 格式的定义，请参考 [扩展定义](./define.md)。

## 入口程序 `browser.js`

定义好描述文件 `package.json` 之后，接下来就要书写入口程序 `browser.js` 了。

内容如下:

```javascript
'use strict';

// 扩展内定义的方法
exports.methods = {
    log() {
        console.log('Hello World');
    },
};

// 当扩展被启动的时候执行
exports.load = function() {};

// 当扩展被关闭的时候执行
exports.unload = function() {};
```

`exports.methods` 中定义的方法，将会作为操作的接口，通过 [消息系统](./messages.md) 跨扩展调用，或者是和面板通信。

这份入口程序是扩展的主进程，会在 Cocos Creator 的启动过程中被加载。因为 Creator 启动时会启动各个扩展，启动扩展便会加载扩展的主进程。

## 运行扩展

返回编辑器，点击顶部菜单栏中的 **扩展 -> 扩展管理器 -> 项目/全局**，找到之前创建的扩展。点击扩展右侧的 ![refresh](first/refresh.png) 按钮，使上面的修改内容生效，可以看到扩展的名称改成了 **hello-world**。

![extension](first/extension-hello-world.png)

若扩展已启动，在 Creator 顶部菜单栏区域会出现一个 **Develop** 菜单，里面有一个 **test** 菜单项。点击 **test**，便会根据定义触发消息发送，并根据消息定义，执行扩展里的对应方法，然后在 **控制台** 打印出日志信息 “Hello World”。

恭喜你已经编写了第一个简单的编辑器扩展。
