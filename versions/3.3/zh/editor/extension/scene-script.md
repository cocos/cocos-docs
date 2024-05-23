# 调用引擎 API 和项目脚本

在插件中可以声明一个特殊的脚本文件（场景脚本），该脚本和项目中的脚本（`assets\` 目录下的脚本）具有相同的环境，也就是说在这个脚本里可以调用引擎 API 和其他项目脚本，实现：

- 遍历场景中的节点，获取或改动数据

- 调用项目中的其他脚本完成工作

## 注册场景脚本

首先在 `pacakge.json` 的 `contributions` 属性中添加 `scene` 字段，该字段的值是一个脚本文件的路径，相对于扩展包目录：

```json
{
    "name": "engine",
    "contributions": {
        "scene": {
            "script": "./scene.js"
        }
    }
}
```

## 编写场景脚本

定义 `scene.js` 的方法如下：

```javascript
// 模块加载的时候触发的函数
exports.load = function() {};
// 模块卸载的时候触发的函数
exports.unload = function() {};

// 模块内定义的方法
exports.methods = {
    log() {
        const { director } = require('cc')
        director.getScene()
    }
};
```

> **注意**：由于升级了脚本系统，原本使用和项目脚本相同的模块引用机制的 `cc.require` 方法被弃用。

## 发送消息到 `scene.js`

在扩展包程序的主进程和渲染进程中，都可以使用下方的接口向 `scene.js` 发送消息（假设扩展包名是 `foobar`）：

```typescript
interface ExecuteSceneScriptMethodOptions {
    // Name of extension
    name: string;
    method: string;
    args: any[];
}

const options: ExecuteSceneScriptMethodOptions = {
    name: 'foobar',
    method: 'log',
    args: []
};

await Editor.Message.request('scene', 'execute-scene-script', options); 
```

这样就可以在扩展包中获取到场景所有节点的名字，当然还可以用来对场景节点进行更多的查询和操作。

> **注意**：由于通讯基于 Electron 的底层 IPC 实现，所以切记传输的数据不可以包含原生对象，否则可能导致进程崩溃或者内存暴涨。建议只传输纯 JSON 对象。
