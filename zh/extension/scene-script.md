# 调用引擎 API 和项目脚本

在插件中可以声明一个特殊的脚本文件（场景脚本），该脚本和项目中的脚本 （`assets` 目录下的脚本）具有相同的环境，也就是说在这个脚本里可以调用引擎 API 和其他项目脚本，实现：

- 遍历场景中的节点，获取或改动数据
- 调用项目中的其他脚本完成工作

## 注册场景脚本

首先在 `package.json` 里添加 `scene-script` 字段，该字段的值是一个脚本文件的路径，相对于扩展包目录：

```json
    "name": "foobar",
    "scene-script": "scene-walker.js"
```

该路径将指向 `packages/foobar/scene-walker.js`，接下来我们看看如何编写场景脚本。

## 编写场景脚本

`scene-walker.js` 需要用这样的形式定义：

```js
module.exports = {
    'get-canvas-children': function (event) {
        var canvas = cc.find('Canvas');
        Editor.log('children length : ' + canvas.children.length);

        if (event.reply) {
            event.reply(canvas.children.length);
        }
    }
};
```

可以看到场景脚本由一个或多个 IPC 消息监听方法组成，收到相应的 IPC 消息后，我们在函数体内可以使用包括全部引擎 API 和用户组件脚本里声明的方法和属性。


## 从扩展包中向场景脚本发送消息

接下来在扩展包程序的主进程和渲染进程中，都可以使用下面的接口来向 `scene-walker.js` 发送消息（假设扩展包名是 `foobar`）：

```js
Editor.Scene.callSceneScript('foobar', 'get-canvas-children', function (err, length) {
    console.log(`get-canvas-children callback :  length - ${length}`);
});
```

这样就可以在扩展包中获取到场景里的 `Canvas` 根节点有多少子节点，当然还可以用来对场景节点进行更多的查询和操作。

在发送消息时 `callSceneScript` 接受的参数输入和其他 IPC 消息发送接口一致，也可以指定更多传参和 timeout 超时时限。详情请看 [IPC 工作流程](ipc-workflow.md)。


## 在场景脚本中引用模块和插件脚本

除了通过 `cc.find` 在场景脚本中获取特定节点，并操作该节点和挂载的组件以外，我们还可以引用项目中的非组件模块，或者通过全局变量访问插件脚本。

### 引用模块

```js
//MyModule.js
module.exports = {
    init: function () {
        //do initialization work
    }
}

//scene-walker.js
module.exports = {
    'init-module': function (event) {
        var myModule = window.require('MyModule');
        myModule.init();
    }
};
```

注意，要使用和项目脚本相同的模块引用机制，在场景脚本里必须使用 `window.require` 的写法。


### 引用插件脚本

直接使用 `window.globalVar` 来访问插件脚本里声明的全局变量和方法即可。
