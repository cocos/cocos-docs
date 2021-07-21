# 扩展结构

Cocos Creator 的扩展包沿用了 Node.js 社区的包设计方式，通过 `package.json` 描述文件来定义扩展包的内容和注册信息。本章内容会说明如何创建一个 Creator 扩展，并通过扩展执行一段自定义脚本。

## 创建并安装扩展

创建扩展的方法分为手动和自动两种：

- 自动：在编辑器菜单栏上选择 **扩展 -> 创建扩展** 创建。存放路径分为以下两种：
    - 项目路径：`${你的项目路径}/extensions` 文件夹，如果文件夹不存在，则自动创建 `extensions` 文件夹。
    - 全局路径：在用户路径下找到 `~/.CocosCreator/`（Mac）或者 `C:\Users\${你的用户名}\.CocosCreator\extensions`（Windows）。
- 手动：跟自动创建的路径一致，只不过由于是手动创建，所以如果对应目录下没有 `extensions` 文件夹，需要自行创建。接着，在这个文件夹里新创建一个空的文件夹，并命名为 `hello-world`，并在文件夹内创建 `browser.js` 和 `package.json` 两个文件。最后，编辑器菜单栏处选择 **扩展 -> 扩展管理器**，在 **项目/全局** 下导入扩展包即可。

扩展默认文件结构大致如下：

```
hello-world
  |--browser.js
  |--package.json
```

扩展面板说明如下：

![extension-manager](image/extension-manager.png)

其中，扩展列表分为：**内置扩展**、**项目扩展** 和 **全局扩展**。**内置扩展**无法通过外部添加。**项目扩展** 和 **全局扩展** 都可以通过 **添加扩展** 的方式添加到 **扩展管理器**。**项目扩展** 只能在当前项目使用，而 **全局扩展** 可以给所有项目使用。

所有的扩展必须 **启用** 才能使用，对扩展进行修改编辑器是无法同步更新，因此需要手动执行 **扩展刷新**。如果因编辑内容有误，导致扩展被移出扩展列表，修改正确后可以通过 **扩展列表刷新** 按钮，重新被识别为扩展，添加回管理列表。

## 定义描述文件 package.json

每个扩展都需要有一份 package.json 文件，用于描述改扩展的用途。只有完整定义了描述文件 package.json 后，Cocos Creator 编辑器才能知道这个扩展里定义的具体的功能，加载入口等信息。

虽然 package.json 在很多字段上的定义和 Node.js 的 npm package 相似，但它们显然是为不同的产品服务而特殊定制。所以 **从 npm 社区中下载的 npm 模块，并不能直接放入到 Cocos Creator 中变成扩展**，但是我们可以在 Creator 扩展中使用 npm 社区里的模块。

一个常见的 package.json 书写如下：

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
    },
    "panels": {
        ...
    },
    "assets": {
        ...
    }
}
```

| 字段名 | 类型  | 是否选填 | 描述 |
| :--- | :---  | :--- | :--- |
| name | string  | 否 | 定义了扩展包的名字，需要和扩展文件夹一一对应，包的名字是全局唯一的，关系到今后在官网服务器上登录时的名字。</br> **注意**：插件若要上传到 Cocos Store，对包名有一定的限制，只允许使用 **小写字母**、**数字**，**连字符（`-`）**、**下划线（`_`）** 和 **点（`.`）**，并以 **小写字母** 或 **数字** 开头。 |
| version | string  | 否 | 扩展的版本号，用于提交扩展的版本校验，以及扩展自身的一些升级，数据迁移作为对比的依据。我们推荐使用 [semver](http://semver.org/) 格式管理你的包版本。 |
| author | string  | 是 | 扩展作者的名字，将会显示在 "扩展管理器" 内。 |
| main | string  | 是 | 定义扩展的入口文件，当扩展启动的时候，就会执行 main 字段指向的 js 文件，并根据流程触发或执行对应的方法。 |
| description | string  | 是 | 扩展的描述，简单概括一下扩展的功能。支持 i18n:key 的多语言语法。 |
| contributions | [name: string]: any  | 是 | 扩展已经存在的功能，并且定制一些开放的功能。详细信息请参看 [扩展已有功能](./contributions.md) |
| panels | [name: string]: PanelInfo  | 是 | 扩展面板。详细信息请参看 [扩展面板](./panel.md)。 |
| assets | [name: string]: Object  | 是 | 扩展资源管理器面板。详细信息请参看 [扩展资源管理器面板](./contributions-assets.md)。 |
| profile | [name: string]: ProfileInfo  | 是 | 注册配置。分为编辑器配置（editor）和项目配置（project）。详细信息请参看 [注册配置](./profile.md#注册配置)。 |
| preferences | [name: string]: Object  | 是 | 扩展偏好设置。详细信息请参看 [扩展偏好设置](./contributions-preferences.md)。 |
| project | [name: string]: ProjectGroup  | 是 | 扩展项目设置。详细信息请参看 [扩展项目设置](./contributions-project.md)。 |
| builder | string  | 是 | 扩展构建流程的入口脚本。详细信息请参看 [扩展项目设置](./contributions-build-plugin.md)。 |

## 入口程序 browser.js

定义好描述文件以后，接下来就要书写入口程序 browser.js 了。

内容如下:

```javascript
'use strict';

// 扩展内定义的方法，与消息字段内定义的 methods 对应
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

这份入口程序会在 Cocos Creator 启动过程中被加载。`methods` 内定义的方法，将会作为操作的接口，通过 [消息系统](./messages.md) 跨扩展调用，或者是和面板通信。

## 启动和刷新扩展

只有被启动的扩展才能使用。如果对扩展内容进行修改，编辑器是无法主动进行内容更新，一次，需要手动执行一次

打开 Cocos Creator 3.0，找到并打开顶部的 **扩展 -> 扩展管理器**，在面板上选择扩展位置（全局或者项目）。然后在顶部找到 **刷新** 按钮，点击手动更新该位置的扩展列表信息。而后扩展列表会显示出已经找到的扩展，可以在列表里控制里启动、关闭或重启对应的扩展。

![extension-manager](image/extension-manager.png)

<!-- 如果扩展已经启动，在菜单栏 Develop 分类下选择 tester 菜单项。点击后，会根据定义触发消息发送，并根据消息定义，执行扩展里的对应方法，然后在控制台打印出 `Hello World` 的日志信息。 -->

## 更多扩展定义

- [扩展已有功能](./contributions.md)
- [扩展面板](./first-panel.md)
- [多语言系统](./i18n.md)
- [配置系统](./profile.md)
