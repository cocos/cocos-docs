# 调用引擎 API

在扩展中可以定义一个特殊的 **场景脚本** 文件，该脚本会和项目中 `assets\` 目录下的脚本处于同一运行进程，具有相同的运行环境。 

在 **场景脚本** 里可以调用引擎 `API` 和其他项目脚本，通过这个特性我们可以实现：

- 查询、遍历场景中的节点，获取或修改节点数据

- 调用节点上的引擎组件相关函数，完成工作

## 注册场景脚本

在 `pacakge.json` 中定义 `contributions.scene` 字段，该字段的值是一个相对于扩展包根目录的脚本文件路径，如下所示：

```json
{
    "contributions": {
        "scene": {
            "script": "./dist/scene.js"
        }
    }
}
```

## 场景脚本模板

在 `src` 目录下新建一个 `scene.ts`，编写如下代码：
```typescript
export function load() {};
export function unload() {};
export const methods = { };
```

`load` - 模块加载的时候触发的函数

`unload` - 模块卸载的时候触发的函数

`methods` - 模块内定义的方法，可用于响应外部消息


## 调用引擎 API

接下来，我们通过对主摄像机进行旋转，来演示场景脚本如何调用引擎 API。

为了调用引擎 API，我们需要在 `scene.ts` 开头加入引擎脚本的搜索路径，并编写相应的代码，最终代码如下所示：

```typescript
import { join } from 'path';
module.paths.push(join(Editor.App.path, 'node_modules'));

export function load() {};

export function unload() {};

export const methods = {
    rotateCamera() {
        const { director } = require('cc');
        let mainCamera = director.getScene().getChildByName("Main Camera");
        if(mainCamera){
            let euler = mainCamera.eulerAngles;
            euler.y += 10;
            mainCamera.setRotationFromEuler(euler);
            return true;
        }
        return false;
    },
};
```

上面的代码中，我们定义了一个 `rotateCamera` 方法，此方法每执行一次，就会让主摄像机绕 `Y` 轴旋转 `10` 度。

在其他扩展脚本中，我们可以使用如下代码调用 `rotateCamera` 函数：
```typescript
    const options: ExecuteSceneScriptMethodOptions = {
        name: packageJSON.name,
        method: 'rotateCamera',
        args: []
    };

    // result: {}
    const result = await Editor.Message.request('scene', 'execute-scene-script', options);
```

`ExecuteSceneScriptMethodOptions` 的属性定义如下：
- name - `scene.ts` 所在的扩展包名，如果是本扩展中可以使用 `packageJSON.name`
- method：`scene.ts` 中定义的方法
- args： 参数，可选

由于扩展间通信实现是基于 Electron 的底层跨进程 IPC 机制，传输的数据均会被序列化为JSON。所以传输的数据不可以包含原生对象，否则可能导致进程崩溃或者内存暴涨。如上面代码中的 `options.args` 参数和场景脚本方法的返回值，建议只传输纯 `JSON` 对象。
