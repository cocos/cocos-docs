# 操作当前场景

在一些时候我们需要去操作当前场景里的一些数据，比如修改节点位置、增删节点、增删组件等。

这时候我们可以通过消息去调用场景已经开放的一些接口，详情参考 [消息系统](./messages.md)。

但如果有一些定制操作的时候，全部使用开放的接口拼接会比较困难，或者步骤非常多。这时候我们可以在扩展中可以定义一个特殊的 **场景脚本** 文件，该脚本会和项目中 `assets\` 目录下的脚本处于同一运行进程，具有相同的运行环境，需要注意的是场景脚本只运行在场景进程，属于编辑器能力。

在 **场景脚本** 里可以调用引擎 `API` 和其他项目脚本，通过这个特性我们可以实现：

- 查询、遍历场景中的节点，获取或修改节点数据

- 调用节点上的引擎组件相关函数，完成工作

## 注册场景脚本

在 `package.json` 中定义 `contributions.scene.script` 字段，该字段的值是一个相对于扩展包根目录的脚本文件路径，如下所示：

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
export function load() { };
export function unload() { };
export const methods = { };
```

`load` - 模块加载的时候触发的函数

`unload` - 模块卸载的时候触发的函数

`methods` - 模块内定义的方法，可用于响应外部消息

## 通过场景调用引擎 API

接下来，我们通过对主摄像机进行旋转，来演示场景脚本如何调用引擎 API。

为了调用引擎 API，我们需要在 `scene.ts` 开头加入引擎脚本的搜索路径，并编写相应的代码，最终代码如下所示：

```typescript
import { join } from 'path';

// 临时在当前模块增加编辑器内的模块为搜索路径，为了能够正常 require 到 cc 模块，后续版本将优化调用方式
module.paths.push(join(Editor.App.path, 'node_modules'));

// 当前版本需要在 module.paths 修改后才能正常使用 cc 模块
// 并且如果希望正常显示 cc 的定义，需要手动将 engine 文件夹里的 cc.d.ts 添加到插件的 tsconfig 里
// 当前版本的 cc 定义文件可以在当前项目的 temp/declarations/cc.d.ts 找到
import { director } from 'cc';

export function load() { };

export function unload() { };

export const methods = {
    /**
     * 旋转 Main Camera 的角度
     * 这个函数可以是一个异步（async）函数，函数的返回值，将会返回给触发执行函数的消息，详看下面的示例
     * @param num
     * @returns {boolean}
     */
    rotateCamera(num: number) {
        // TS 定义是确定的，但是触发这个函数的消息所发送的参数可能是非法的
        // 所以这里严谨的话，还是需要一些基础的容错处理
        if (typeof num !== 'number') {
            num = parseFloat(num + '');   
        }
        if (isNaN(num)) {
            num = 10;
        }

        // 通过引擎的方法，进行一些基础处理
        const mainCamera = director.getScene().getChildByName('Main Camera');
        if (mainCamera) {
            let euler = new Vec3();
            euler.set(mainCamera.eulerAngles.x, mainCamera.eulerAngles.y + num, mainCamera.eulerAngles.z);
            mainCamera.setRotationFromEuler(euler);
            return true;
        }
        return false;
    },
};
```

上面的代码中，我们定义了一个 `rotateCamera` 方法，此方法每执行一次，就会让主摄像机绕 `Y` 轴旋转传入的 num 或者 `10` 度。

在其他扩展脚本中，我们可以通过消息使用刚刚定义的 `rotateCamera` 函数，代码如下：

```typescript
// 这个定义在生成的扩展的根目录的 @types 文件夹里
// 所有的扩展公开定义都按照规范 @types/packages/{ExtensionName}/@types/public 存放
// 这里引入 Scene 扩展内针对场景脚本的定义
import type { ExecuteSceneScriptMethodOptions } from '../@types/packages/scene/@types/public';

// 这里直接找到插件的 package.json 定义，拿到里面的扩展名字
import packageJSON from '../package.json';

const options: ExecuteSceneScriptMethodOptions = {
    name: packageJSON.name,
    method: 'rotateCamera',
    args: [10],
};

// result: true/false
const result = await Editor.Message.request('scene', 'execute-scene-script', options);
```

`ExecuteSceneScriptMethodOptions` 的属性定义如下：
- name - `scene.ts` 所在的扩展包名，如果是本扩展中可以使用 `packageJSON.name`
- method：`scene.ts` 中定义的方法
- args： 参数，可选，任意可序列化数据，将会原封不动的传递给执行函数

由于扩展间通信实现是基于 Electron 的底层跨进程 IPC 机制，传输的数据均会被序列化为JSON。所以传输的数据不可以包含原生对象，否则可能导致进程崩溃或者内存暴涨。如上面代码中的 `options.args` 参数和场景脚本方法的返回值，建议只传输纯 `JSON` 对象。
