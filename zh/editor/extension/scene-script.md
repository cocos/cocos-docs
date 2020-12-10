# 场景脚本功能

场景脚本功能主要适用于一个扩展插件需要使用场景内的引擎运行时数据的场景。

例如想要输出一份节点树的数据。就需要在场景进程里，运行自己的代码，并且和外部的插件主体进行一定程度的交互。

## 使用方式

首先在 pacakge.json 里注册数据到场景插件：

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

然后在 scene.js 内填入相应的数据

```javascript
// 模块加载的时候触发的函数
exports.load = function() {};
// 模块卸载的时候触发的函数
exports.unload = function() {};

// 模块内定义的方法
exports.methods = {
    log() {

        const scene = cc.director.getScene()
        if(scene)
        {
            scene.walk((target)=>console.log(target.name))
        }
        else
        {
            console.warn(`Scene not found`)
        }
        return true;
    }
}
};
```

定义完成后，我们可以通过 message 进行触发：

```typescript
interface ExecuteSceneScriptMethodOptions {
    //name of extension
    name: string;
    method: string;
    args: any[];
}

const options: ExecuteSceneScriptMethodOptions = {
    name: 'scene',
    method: 'log',
    args: [
        
    ],
};

await Editor.Message.request('scene', 'execute-scene-script', options); // true
```

执行后，我们会在场景控制台打印场景中所有节点的名字，并且 message 消息返回一个 true 布尔值。

**值得注意的**需要在场景加载完成之后才能调用场景脚本。

