# 你的第一个扩展包

本文会教你如何创建一个简单的 Cocos Creator 扩展包，并且向你介绍一些扩展包中的基本概念。通过学习，你将会创建一个扩展包，并在主菜单中建立一个菜单项，并通过该菜单项在主进程中执行一条扩展指令。

## 创建并安装扩展包

创建一个空文件夹命名为 “hello-world”，并在该文件夹中创建 `main.js` 和 `package.json` 两个文本文件。该扩展包的结构大致如下：

```
hello-world
  |--main.js
  |--package.json
```

将该文件夹放入到 `~/.CocosCreator/packages`（Windows 用户为 `C:\Users\${你的用户名}\.CocosCreator\packages`），或者放入到 `${你的项目路径}/packages` 文件夹下即可完成扩展包的安装。

## 定义你的包描述文件：package.json

每个包都需要一份 `package.json` 文件去描述它的用途，这样 Cocos Creator 编辑器才能知道这个包要扩展什么，从而正确加载。值得一提的是，虽然 `package.json` 在很多字段上的定义和 node.js 的 npm-package 相似，它们仍然是为不同的产品服务的，所以从 npm 社区中下载的包，并不能直接放入到 Cocos Creator 中变成插件，但是可以使用它。

我们在这里做一份简单的 `package.json`：

```json
{
  "name": "hello-world",
  "version": "0.0.1",
  "description": "一份简单的扩展包",
  "author": "Cocos Creator",
  "main": "main.js",
  "main-menu": {
    "Packages/Hello World": {
      "message": "hello-world:say-hello"
    }
  }
}
```

解释：

- `name` String - 定义了包的名字，包的名字是全局唯一的，关系到今后在官网服务器上登录时的名字。插件若要上传到 Cocos Store，对包名有一定的限制，只允许使用 **小写字母**、**数字**，**连字符（`-`）**、**下划线（`_`）** 和 **点（`.`）**，并以 **小写字母** 或 **数字** 开头。
- `version` String - 版本号，我们推荐使用 [semver](http://semver.org/) 格式管理你的包版本。
- `description` String（可选）- 一句话描述你的包是做什么的。
- `author` String（可选）- 扩展包的作者
- `main` String (可选) - 入口程序
- `main-menu` Object (可选) - 主菜单定义

## 入口程序

当你定义好你的描述文件以后，接下来就要书写你的入口程序 `main.js` 了。定义如下：

```javascript
'use strict';

module.exports = {
  load () {
    // 当 package 被正确加载的时候执行
  },

  unload () {
    // 当 package 被正确卸载的时候执行
  },

  messages: {
    'say-hello' () {
      Editor.log('Hello World!');
    }
  },
};
```

这份入口程序会在 Cocos Creator 的主进程中被加载，在加载成功后，它会调用入口程序中的 `load` 函数。并且会将定义在 `messages` 字段中的函数注册成 IPC 消息。更多关于入口函数中的消息注册，以及 IPC 消息的内容，我们会在 [IPC简介](introduction-to-ipc.md) 中讲解。

这里我们只要明白，入口函数中的 `messages` 字段中的函数，将会在主进程的 IPC 监听模块中，注册一份消息，其格式为 `${扩展包名}:${函数名}`，并将对应的函数作为 IPC 响应的函数。

## 运行扩展包程序

现在你可以打开你的 Cocos Creator，你将会发现你的主菜单中多出了一份 `Packages` 的菜单，点击 `Packages` 菜单中的 `Hello World` 将会发送一个消息 “hello-world:say-hello” 给我们的扩展包的 `main.js`，它会在 Creator 的控制台中打印出 “Hello World” 的日志信息。

恭喜你完成了第一个简单的编辑器扩展工具。
