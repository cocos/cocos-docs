# Workers and WorkerPool

Workers move independent data processing off the game thread. Cocos Creator provides basic Worker APIs and an
optional WorkerPool scheduler. The engine PAL adapts the host APIs; application code imports the public APIs from `cc`.
Neither API automatically moves nodes, rendering, physics, or audio to another thread. Scene objects and the DOM remain on the main thread.

This guide applies to 4.0 engines that include the optional `worker` and `worker-pool` features. If those features are
missing from your engine, update the engine before changing scripts and feature settings.

## Enable the features

Open **Project → Project Settings → Feature Cropping** and expand the **Worker** group:

| Item | Feature ID | Available functionality |
| --- | --- | --- |
| Basic Worker | `worker` | Worker creation, messaging, capability queries, and script checks; application-managed lifecycle |
| Worker Pool | `worker-pool` | Basic APIs plus task queuing, concurrency scheduling, timeouts, and safe synchronous fallback |

Both items are disabled by default. Selecting Worker Pool also selects Basic Worker; clearing Basic Worker clears Worker Pool.
The group checkbox selects or clears all items and is indeterminate when only the basic item is selected.
To manage workers yourself, keep the basic item enabled and disable Pool to omit the engine scheduler from the build.

When using ccbuild directly, `features: ['worker']` includes only the basic APIs; `features: ['worker-pool']` includes both.
Rebuild and inspect the output after changing settings. Import from `cc`; applications do not need to import PAL directly.
See [Feature Cropping](../editor/project/index.md#feature-cropping).

## Choose an execution model

| Environment | Packaged script workers | Function workers | When no Worker backend is available |
| --- | --- | --- | --- |
| Web | Depends on browser support, script URL, and security policies | Requires Worker, Blob, and object URL support | WorkerPool can execute the function or explicit fallback synchronously |
| Mini games | Uses the platform Worker API and requires correct packaging | Runtime function serialization is not used | Script mode runs an explicit fallback synchronously, or rejects without one |
| Native and Node.js build targets | PAL does not start JavaScript workers | Executed synchronously by the pool | Native subsystems retain their own threading policies |

Script mode is the shared path for Web and mini games. Function mode suits self-contained Web computations.
Use basic `createWorker` for long-lived message services or custom protocols, and WorkerPool for task queues and recovery.
Synchronous fallback computes on the main thread; returning a Promise does not imply a separate thread.

## Check capabilities

```ts
import { getWorkerCapabilities, checkWorkerScript } from 'cc';

const capabilities = getWorkerCapabilities();
const scriptStatus = checkWorkerScript('workers/sum-worker.js');
console.log(capabilities, scriptStatus);
```

`available` reports Worker capability, not successful startup of a particular script. Web loading and execution errors can arrive asynchronously.
`checkWorkerScript()` is a preflight check, not a replacement for submitting a task and handling errors.

| Capability | Meaning |
| --- | --- |
| `available` | PAL reports an available Worker backend |
| `parallel` | PAL reports a concurrency limit greater than one |
| `concurrencyLimit` | Platform concurrency limit; Infinity means PAL sets no fixed limit, not unlimited worker resources |
| `supportsFunctionWorker` | Whether a worker can be reconstructed from function source |
| `supportsTransfer` | Whether transfer lists are supported |
| `supportsSharedArrayBuffer` | PAL detected shared-buffer capability; host requirements still apply |
| `supportsStandardWorker` | The WeChat standard Worker capability flag, not a general support switch for all platforms |
| `reason` | Capability diagnostic message |

`isWorkerSupported()` checks **function workers**. A false result does not mean a mini game has no workers.
`isSupportStandardWorker()` queries the standard capability flag; it can be false even when Web Workers are available.
`getWorkerConcurrencyLimit()` returns the platform cap; `getOptimalWorkerCount()` suggests an initial compute-task count,
not a core count or number of created threads. It can return one when hardware information is unavailable; request a pool size explicitly when needed.
Do not use a script diagnosis `version` value to force a WeChat V1/V2 selection.

## Use a packaged script with WorkerPool

### Prepare the worker script

Save the following as a standalone `sum-worker.js` and copy it to `workers/sum-worker.js` in the build output.
It does not import `cc` and supports both the Web self entry and the mini-game worker message entry.

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

The WorkerPool script protocol is `{ id, args }` for requests, `{ id, ok: true, value }` for success,
and `{ id, ok: false, error }` for failure. Reply with the original id. The args value is the parameter array passed to `run(args)`.
For example, `run([[1, 2, 3]])` supplies one number-array argument to the task.

### Submit tasks and clean up

Enable Worker Pool and attach this component to a scene node. The example assumes the standalone script has been deployed;
preview and packaging requirements are described below.

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

The fallback must compute the same result as the script and be safe to retry. Destroying a component can also reject in-flight tasks,
so the example handles rejection, executor identity, and cleanup. Check the actual backend as well as the result:

- `pool.backend === 'worker'`: Worker execution is selected; threads are created as tasks need them.
- `pool.backend === 'sync'`: computation runs synchronously on the main thread.
- `pool.backend === 'none'`: no execution path is available and `run()` rejects.

`pool.concurrency` is the current scheduling limit, not the number of active threads. Other instances may consume a platform's global Worker quota.

### Pool options

| Option | Meaning |
| --- | --- |
| `maxWorkers` | Requested concurrency cap, limited by PAL. Function mode defaults to one; script mode defaults to `getOptimalWorkerCount()` |
| `idleReleaseAfter` | Idle release delay, default 1000 ms; zero retains idle executors |
| `timeout` | Timeout for an individual dispatched task, default zero disables it; it does not preempt main-thread fallback |
| `fallback` | Main-thread computation for script mode; without it, no backend means task rejection |

Tasks beyond the concurrency limit are queued. Set a reasonable timeout for scripts that might never reply.
`terminate()` immediately releases executors and rejects queued/in-flight tasks; repeated calls are safe.

## Manage workers directly

Only Basic Worker is required for `createWorker(path)`. This example reuses the script protocol above;
the basic API itself imposes no task protocol and provides no queue, Promise wrapper, timeout, or automatic fallback.

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

The example explicitly computes on the main thread when no worker is available. Creation or runtime errors are reported and cleaned up without replaying requests.
If callers wait for responses, implement your own timeout, request IDs, rejection notifications, and worker recovery.

## Use function mode

Function mode needs no physical worker file, but reconstructs the function in an isolated environment.
It cannot capture external variables, components, or closures.

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

Web uses a real worker when the required capabilities exist; the pool executes the original function inline elsewhere.
Basic `createWorker(fn)` throws when function workers are unsupported and must not be confused with pool fallback.

## Transfer data and ownership

Pass plain data, not nodes, components, DOM objects, closures, or objects that depend on main-thread state.
Prefer ordinary arrays and objects for non-standard mini-game workers; check support before using typed arrays or transfer lists.

This example runs only where both function workers and transfer lists are supported:

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

A transfer list moves **ownership**. After actual dispatch and transfer, the original ArrayBuffer is detached and cannot be read or used to retry the task.
A queued task has not necessarily transferred its data yet. The buffer must also be present in the message payload.
To keep rendering data readable, transfer a copy or an independent slice and retain authoritative main-thread data.
See [MDN Transferable objects](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects).

Never put SharedArrayBuffer in a transfer list. Web shared memory also requires host conditions such as a secure context and cross-origin isolation.
Use `buffer?.constructor?.name === 'SharedArrayBuffer'` rather than relying only on cross-environment instanceof checks.
The engine does not add shared-memory synchronization; implement a correct protocol with Atomics where needed.

## Packaging and platform adaptation

### Web and preview

The script URL must be available in the deployed project and satisfy same-origin and CSP rules.
A main-thread module's compiled path is not automatically a Worker URL. Do not use game code containing main-thread APIs as a Worker entry.

Editor preview generally does not serve raw worker files from the project root. One option is to load identical source as a TextAsset
through resources, create a Blob URL, and pass it to `createWorker` or WorkerPool.
Check that the component is still alive before creating a URL after an asynchronous load, and release owned URLs with `URL.revokeObjectURL` on destruction.
Function workers and Blob URLs remain subject to CSP; capability detection does not prove security-policy approval.

### Mini games and WeChat V1/V2

Package worker JS separately so it is not imported as a normal main-thread script. The engine does not copy business worker files or modify platform manifests automatically.
Use a [custom build extension](../editor/publish/custom-build-plugin.md) or [build template](../editor/publish/custom-project-build-template.md) to deploy them.

For WeChat, declare `"workers": "workers"` in the output game.json. The entry path is relative to the game root.
The script and its require dependencies must stay in the platform's allowed Worker directory, containing only JS files.
Download a worker subpackage before creating its worker. Follow each other mini-game platform's packaging rules rather than copying the WeChat manifest unchanged.

Both WeChat V1 and V2 use `wx.createWorker(path)`. PAL recognizes standard capability through `wx.env.isSupportStandardWorker === true`.
Without that capability it uses the compatible single-worker, no-transfer path; with it, requested concurrency remains subject to runtime resources.
Changing maxWorkers, setting useExperimentalWorker, or adding a version-selection button cannot grant gray-release capability.
Consult current WeChat requirements and real-device detection for client/base-library versions, rollout eligibility, operating systems, and developer tools.
Platform audio/network APIs inside a worker also follow that worker environment's calling conventions; the pool does not provide them automatically.

## Recovery and capability changes

- With no script backend, an explicit fallback runs synchronously; without one, tasks reject.
- Creation failures, worker errors, timeouts, or protocol failures stop script-pool reuse of that backend. Retry-safe, non-transferred tasks can recover through fallback.
- Failed tasks whose arguments transferred ownership reject without replay. Later tasks can still use fallback.
- An `ok: false` script reply is a computation error: it rejects that task without infrastructure degradation.
- Function-mode runtime failures do not automatically replay the original function on the main thread, where it might deadlock.

After a subpackage download or a host capability change, call `pool.recheck()`. It returns worker/sync/none and does not replay in-flight work.
Busy old executors finish and are released; old failures do not degrade the newly selected backend again.
Applications must still guard executor identity or generation so stale results cannot update a new scene.

For diagnosis, record actual backend/concurrency, capability messages, script path, build output, and device environment together.
Correctness tests cover results, timeouts, and cleanup; performance evaluation also includes startup, copying, messaging, and main-thread application costs.
Successful synchronous fallback is not evidence of parallel execution. Node substitutes or a successful build cannot replace Web/mini-game device acceptance.
