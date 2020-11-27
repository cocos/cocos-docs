# 第一个扩展

我们将通过本文，学会创建一个 Creator 扩展，并通过扩展执行一段自定义脚本。

## 创建并安装扩展

找到 **~/.CocosEditor3D/packages** Windows 用户为 **C:\Users\${你的用户名}\.CocosEditor3D\packages）**，或者 **${你的项目路径}/packages** 文件夹，如果文件夹不存在，则新建这个文件夹。

在这个文件夹里新创建一个空的文件夹，并命名为 "hello-world"，并在文件夹内创建 `browser.js` 和 `package.json` 两个文件。扩展所在目录的结构大致如下：

```
hello-world
  |--browser.js
  |--package.json
```

## 定义描述文件 package.json

每个扩展都需要有一份 package.json 文件，用于描述改扩展的用途。只有完整定义了描述文件 package.json 后，Cocos Creator 编辑器才能知道这个扩展里定义的具体的功能，加载入口等信息。

虽然 package.json 在很多字段上的定义和 node.js 的 npm package 相似，但它们显然是为不同的产品服务而特殊定制。所以从 npm 社区中下载的 npm 模块，并不能直接放入到 Cocos Creator 中变成扩展，但是我们可以在 Creator 扩展中使用 npm 社区里的模块。

让我们接着刚刚的操作，在新建的 package.json 文件内，填入内容：

```json
{
    "name": "hello-world",
    "version": "1.0.0",
    "main": "./browser.js",
    "description": "一份简单的扩展",
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

现在需要在 contributions 内定义一个 messages 对象，这是编辑器消息注册的方法。这个消息可以绑定一个或多个的扩展内定义的方法。

更多定义数据请参考 [消息通信](./contributions-messages.md)

然后需要在 contributions 内再定义一个 menu 数组，向 menu 组件提供一个菜单的基础信息。

最后将这个菜单绑定到一条的消息。更详细的请参考：[扩展主菜单](./contributions-menu.md)

细心的你可能发现了，菜单按下后，触发的动作是通过扩展间的消息进行通知的，消息系统是扩展间交互的方式。

关于详细的 package.json 格式定义，请参考 [扩展定义](./define.md)。

## 入口程序 browser.js

定义好描述文件以后，接下来就要书写入口程序 browser.js 了。

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
exports.load = {};

// 当扩展被关闭的时候执行
exports.unload = {};
```

这份入口程序会在 Cocos Creator 的启动过程中被加载。methods 内定义的方法，将会作为操作的接口，通过 [消息系统](./messages.md) 跨扩展调用，或者是和面板通信。

## 运行扩展

现在，我们可以打开 Cocos Creator 3.0，找到并打开顶部的 **扩展 -> 扩展管理器**，在面板上选择扩展位置（全局或者项目）。然后在顶部找到 "刷新" 按钮，点击手动更新该位置的扩展列表信息。而后扩展列表会显示出已经找到的扩展，我们可以在列表里控制里启动或关闭，或者重启对应的扩展。

如果扩展已经启动，在顶部菜单区域会出现一个 Develop 菜单，里面有一个 tester 菜单项。点击后，会根据定义触发消息发送，并根据消息定义，执行扩展里的对应方法，然后在控制台打印出 `Hello World` 的日志信息。

恭喜你已经编写了第一个简单的编辑器扩展。
