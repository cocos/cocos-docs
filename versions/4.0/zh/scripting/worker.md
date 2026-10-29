# Worker 与 WorkerPool

Worker 用于将独立的数据计算移出游戏主线程。Cocos Creator 提供基础 Worker API，以及可额外启用的
WorkerPool 任务池。平台适配由引擎 PAL 完成，业务从 `cc` 导入接口。
它们不会自动把节点、渲染、物理或音频逻辑迁移到其他线程；场景对象与 DOM 仍由主线程管理。

本文适用于包含 `worker`、`worker-pool` 可选功能的 4.0 引擎。若项目使用的引擎尚未提供这些功能，
请先更新引擎，再调整项目脚本和功能裁剪配置。

## 启用功能

打开 **项目 → 项目设置 → 功能裁剪**，展开 **Worker** 分组：

| 子项 | 功能 ID | 可用能力 |
| --- | --- | --- |
| 基础 Worker 功能 | `worker` | 创建 Worker、消息通信、能力与脚本检查，由开发者管理生命周期 |
| Worker Pool | `worker-pool` | 基础 API，以及任务队列、并发调度、超时和安全同步降级 |

两项默认均关闭。勾选 Worker Pool 会关联开启基础 Worker；取消基础 Worker 也会取消 Worker Pool。
分组标题用于全选/清空，只勾基础项时显示半选。只需要自行管理 Worker 时，保留基础项并关闭 Pool，
构建产物即可裁掉引擎线程池实现。

直接使用 ccbuild 时，`features: ['worker']` 只包含基础 API；`features: ['worker-pool']` 包含两者。
调整配置后重新构建并检查最终产物。接口仍从 `cc` 导入，不需要直接导入 PAL。
详情参见 [功能裁剪](../editor/project/index.md#功能裁剪)。

## 选择执行方式

| 环境 | 独立脚本 Worker | 函数 Worker | 无可用 Worker 时 |
| --- | --- | --- | --- |
| Web | 由浏览器能力、脚本地址及安全策略决定 | 需要 Worker、Blob 和对象 URL 能力 | WorkerPool 可同步执行函数或显式 fallback |
| 小游戏 | 使用平台提供的 Worker，需正确打包 | 不使用运行时函数序列化 | 脚本模式提供 fallback 时同步执行，否则拒绝任务 |
| 原生、Node.js 构建目标 | PAL 不启动 JS Worker | 在池中同步执行 | 原生子系统的线程策略由原生实现决定 |

脚本模式是 Web 和小游戏共用的方式。函数模式适合 Web 上自包含的小型计算。
长期消息服务或自定义协议可使用基础 `createWorker`；需要任务队列与恢复策略时使用 WorkerPool。
同步降级仍在主线程执行计算，返回 Promise 不代表另开了线程。

## 检查能力

```ts
import { getWorkerCapabilities, checkWorkerScript } from 'cc';

const capabilities = getWorkerCapabilities();
const scriptStatus = checkWorkerScript('workers/sum-worker.js');
console.log(capabilities, scriptStatus);
```

`available` 表示存在 Worker 能力，不保证指定脚本启动成功；Web 的网络/执行错误可能异步发生。
`checkWorkerScript()` 是预检查，不能代替实际派发任务和处理错误。

| 能力字段 | 含义 |
| --- | --- |
| `available` | PAL 报告存在 Worker 后端 |
| `parallel` | PAL 报告并发上限大于 1 |
| `concurrencyLimit` | 平台并发上限；Infinity 表示 PAL 未设置固定上限，不代表可无限创建 |
| `supportsFunctionWorker` | 能否从函数源码构造 Worker |
| `supportsTransfer` | 能否使用 transfer 列表 |
| `supportsSharedArrayBuffer` | PAL 检测到共享缓冲区能力，仍需满足宿主运行条件 |
| `supportsStandardWorker` | 微信标准 Worker 能力标志，不是所有平台的通用支持开关 |
| `reason` | 能力诊断说明 |

`isWorkerSupported()` 查询的是**函数 Worker**，不能据其 false 判定小游戏没有 Worker。
`isSupportStandardWorker()` 查询标准能力标志；Web 支持 Worker 时该标志仍可为 false。
`getWorkerConcurrencyLimit()` 返回并发上限；`getOptimalWorkerCount()` 提供计算任务的初始建议值，
不是硬件核数或已创建线程数。缺少硬件信息时建议值可能为 1，多 Worker 任务应显式设置池大小。
不要用脚本诊断结果的 `version` 字段强行切换微信 V1/V2。

## 使用独立脚本和 WorkerPool

### 准备 Worker 脚本

将以下内容保存为独立的 `sum-worker.js`，构建时复制到产物 `workers/sum-worker.js`。
该脚本不导入 `cc`，同时支持 Web 的 self 消息入口和小游戏的 worker 消息入口。

```js
// workers/sum-worker.js
function sum(values) {
    if (!Array.isArray(values)) throw new Error('Expected an array');
    return values.reduce(function (total, value) { return total + value; }, 0);
}

function reply(message) {
    if (typeof worker !== 'undefined' && typeof worker.postMessage === 'function') {
        worker.postMessage(message);
    } else {
        self.postMessage(message);
    }
}

function receive(message) {
    var id = message && message.id;
    try {
        reply({ id: id, ok: true, value: sum(message.args[0]) });
    } catch (error) {
        reply({ id: id, ok: false, error: String(error && error.message || error) });
    }
}

if (typeof worker !== 'undefined' && typeof worker.onMessage === 'function') {
    worker.onMessage(receive);
} else {
    self.onmessage = function (event) { receive(event.data); };
}
```

WorkerPool 的脚本协议为：请求 `{ id, args }`；成功回复 `{ id, ok: true, value }`；
失败回复 `{ id, ok: false, error }`。`id` 必须原样返回，`args` 是 `run(args)` 的参数数组。
例如 `run([[1, 2, 3]])` 对应任务函数接收一个数字数组。

### 派发任务并清理

启用 Worker Pool，把以下组件挂到场景节点。示例以已正确部署独立脚本的项目为前提；
预览与打包的处理见后文。

```ts
import { _decorator, Component, WorkerPool } from 'cc';
const { ccclass } = _decorator;

function sum(values: number[]): number {
    return values.reduce((total, value) => total + value, 0);
}

@ccclass('WorkerPoolExample')
export class WorkerPoolExample extends Component {
    private _pool: WorkerPool | null = null;

    start(): void {
        this._runTasks().catch(error => console.error(error));
    }

    private async _runTasks(): Promise<void> {
        const pool = new WorkerPool('workers/sum-worker.js', {
            maxWorkers: 2,
            idleReleaseAfter: 1000,
            timeout: 5000,
            fallback: sum,
        });
        this._pool = pool;
        try {
            const results = await Promise.all([
                pool.run<number>([[1, 2, 3]]),
                pool.run<number>([[4, 5, 6]]),
            ]);
            if (this._pool !== pool) return;
            console.log(results, pool.backend, pool.concurrency); // [6, 15]
        } catch (error) {
            if (this._pool === pool) console.error(error);
        } finally {
            pool.terminate();
            if (this._pool === pool) this._pool = null;
        }
    }

    onDestroy(): void {
        this._pool?.terminate();
        this._pool = null;
    }
}
```

`fallback` 必须与脚本计算等价，并允许安全重试。组件销毁后也会拒绝在途任务，
所以示例同时处理 Promise 拒绝、执行器身份和销毁清理。结果正确后仍应检查实际后端：

- `pool.backend === 'worker'`：选择了 Worker 执行路径，线程按任务需要创建。
- `pool.backend === 'sync'`：主线程同步执行。
- `pool.backend === 'none'`：无可用执行路径，`run()` 会拒绝。

`pool.concurrency` 是当前调度上限，不是正在工作的线程数量；平台的全局 Worker 名额也可能被其他实例占用。

### 池参数

| 参数 | 说明 |
| --- | --- |
| `maxWorkers` | 请求的并发上限，最终受 PAL 限制。函数模式未指定时为 1；脚本模式未指定时采用 `getOptimalWorkerCount()` |
| `idleReleaseAfter` | 空闲释放时间，默认 1000 毫秒；0 表示保留空闲执行器 |
| `timeout` | 单次派发的任务超时，默认 0 即不启用；不限制主线程 fallback 的执行时间 |
| `fallback` | 脚本模式的主线程计算函数，缺省时无后端会拒绝任务 |

提交超过并发上限的任务会排队。对可能不回消息的脚本应设置合理超时。
`terminate()` 立即释放执行器并拒绝排队/在途任务，可重复调用。

## 自行管理 Worker

只启用基础 Worker 即可使用 `createWorker(path)`。下面复用同一份脚本协议；
基础 API 本身不强制使用该协议，也不提供任务队列、Promise 包装、超时或自动 fallback。

```ts
import { _decorator, Component, createWorker, getWorkerCapabilities } from 'cc';
import type { IWorker } from 'cc';
const { ccclass } = _decorator;

@ccclass('DirectWorkerExample')
export class DirectWorkerExample extends Component {
    private _worker: IWorker | null = null;

    start(): void {
        if (!getWorkerCapabilities().available) {
            console.log([1, 2, 3].reduce((total, value) => total + value, 0));
            return;
        }
        try {
            const instance = createWorker('workers/sum-worker.js');
            this._worker = instance;
            instance.onMessage(message => {
                if (this._worker !== instance) return;
                if (message.ok) console.log(message.value); // 6
                else console.error(message.error);
            });
            instance.onError(error => {
                if (this._worker !== instance) return;
                console.error(error);
                this._clearWorker();
            });
            instance.postMessage({ id: 1, args: [[1, 2, 3]] });
        } catch (error) {
            this._clearWorker();
            console.error(error);
        }
    }

    onDestroy(): void {
        this._clearWorker();
    }

    private _clearWorker(): void {
        this._worker?.terminate();
        this._worker = null;
    }
}
```

示例在没有 Worker 时显式执行主线程计算；创建或运行错误只报告并清理，不自动重放请求。
正式业务若有等待结果的调用方，还应自行处理超时、请求 ID、拒绝通知和线程回收。

## 使用函数模式

函数模式无需物理 Worker 文件，但函数会从源码在独立环境重建，不能捕获外部变量、组件或闭包。

```ts
import { WorkerPool } from 'cc';

export async function addNumbers(): Promise<number> {
    const pool = new WorkerPool((a: number, b: number) => a + b, { maxWorkers: 2 });
    try {
        return await pool.run<number>([20, 22]);
    } finally {
        pool.terminate();
    }
}
```

Web 具备所需能力时运行于 Worker；其他环境由池直接执行原函数。
基础 `createWorker(fn)` 在不支持函数 Worker 的环境中会抛错，不能等同于池的同步降级。

## 传递数据与所有权

优先传递普通数据，不能传递节点、组件、DOM、闭包或依赖主线程状态的对象。
兼容非标准小游戏 Worker 时，优先用普通数组与普通对象；使用 TypedArray 和 transfer 前检查能力。

以下是只在支持函数 Worker 和 transfer 的环境执行的示例：

```ts
import { WorkerPool, getWorkerCapabilities } from 'cc';

export async function firstByte(): Promise<number | undefined> {
    const caps = getWorkerCapabilities();
    if (!caps.supportsFunctionWorker || !caps.supportsTransfer) return;
    const pool = new WorkerPool((bytes: Uint8Array) => bytes[0]);
    const input = new Uint8Array([7]);
    try {
        return await pool.run<number>([input], [input.buffer]);
    } finally {
        pool.terminate();
    }
}
```

transfer 列表传递的是缓冲区的**所有权**。任务实际派发并完成转移后，原 ArrayBuffer 会被分离，
不能继续读取或据其重试；队列中的任务不一定已转移。列表中的缓冲区也必须包含在消息数据中。
需要保持渲染数据可读时，传递副本或独立切片的缓冲区，保留主线程的权威数据。
参见 [MDN Transferable objects](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects)。

SharedArrayBuffer 不放入 transfer 列表。Web 共享内存还需满足安全上下文和跨源隔离等宿主条件；
检查 `buffer?.constructor?.name === 'SharedArrayBuffer'`，不要仅依赖跨环境的 instanceof 判断。
引擎不会自动为共享内存添加同步机制，业务需正确使用 Atomics 等协议。

## 打包与平台适配

### Web 和预览

脚本 URL 必须能在最终部署地址访问，并满足浏览器同源和 CSP 等安全策略。
不要把主线程模块编译路径当成 Worker URL，也不要将含有主线程 API 的游戏代码直接作为 Worker 入口。

编辑器预览通常不直接提供项目根目录中的原始 Worker JS。可把相同源码放入 TextAsset，
通过 resources 加载后创建 Blob URL，再交给 `createWorker` 或 WorkerPool。
异步加载完成前先检查组件是否仍存活；创建的 URL 在拥有者销毁时用 `URL.revokeObjectURL` 释放。
函数 Worker 和 Blob URL 仍受浏览器 CSP 约束，不能将能力检测当作安全策略已经通过。

### 小游戏和微信 V1/V2

Worker JS 应作为独立文件打包，避免作为普通主线程脚本导入。引擎不会自动复制业务 Worker 文件或修改平台清单；
可使用 [自定义构建插件](../editor/publish/custom-build-plugin.md) 或 [构建模板](../editor/publish/custom-project-build-template.md) 完成部署。

微信在构建产物 game.json 中声明 `"workers": "workers"`，入口路径相对于游戏根目录。
脚本及其 require 依赖需位于平台允许的 Worker 目录，目录中只放 JS；分包中的脚本需先完成下载。
其他小游戏需按各自平台规则声明和打包，不要直接照搬微信清单。

微信 V1/V2 使用同一个 `wx.createWorker(path)`。PAL 根据 `wx.env.isSupportStandardWorker === true`
识别标准能力，未开放时按单 Worker、无 transfer 的兼容路径处理；开放时允许按请求并发，并受运行时资源限制。
不能通过修改 maxWorkers、设置 useExperimentalWorker 或加版本切换按钮获得灰度能力。
客户端、基础库、灰度资格、系统及开发者工具支持范围，应以微信当前说明和真实设备检测为准。
Worker 内使用平台音频/网络 API 时还需遵守该 Worker 环境的调用方式；线程池不会自动提供这些业务能力。

## 故障恢复与重新检测

- 脚本模式无后端时，有 fallback 则同步执行，否则拒绝任务。
- Worker 创建、错误、超时或协议故障会使脚本池停止复用该后端。可安全重试且没有移交所有权的任务可用 fallback 恢复。
- 已转移参数的失败任务会拒绝，不重放；后续新任务仍可使用 fallback。
- 脚本正常回复 `ok: false` 是计算错误，只拒绝该任务，不触发基础设施降级。
- 函数模式运行时失败不自动重放原函数，以免把可能死锁的计算搬回主线程。

脚本分包下载完成或宿主能力发生变化后，可调用 `pool.recheck()` 重新检测。它返回 worker/sync/none，
不重放在途任务；旧的忙碌执行器完成后释放，旧故障不会再次降级新选中的后端。
仍需在业务层用执行器身份或代次检查，避免旧任务结果更新新场景。

排查时同时记录实际 backend、concurrency、能力诊断、脚本路径、构建产物和设备环境。
功能测试可验证结果、超时和销毁；性能评估还应计入启动、复制、通信和主线程回填开销。
能够完成同步 fallback 不代表已使用多线程，Node 替身或构建通过也不能代替 Web/小游戏真机验收。
