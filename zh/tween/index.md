# 缓动系统

Cocos Creator 3.0 为了全面兼容和保持 Cocos Creator v2.x 缓动系统的使用体验，移植了所有的功能实现。需要注意的是：

1. `action` 已经被废弃了，请使用 `tween`

2. 不再依赖 `tween.js`，如果使用了 `tween.js` 的相关特性，请注意及时适配

3. `to` 和 `by` 的可选属性中增加了 `onStart`、`onUpdate`、`onComplete` 回调

与此前 `tween.js` 不同的地方主要是可选属性：

- `easing` 的值定义变动了（这里做了兼容性处理）
- 除了 `easing`、`onStart`、`onUpdate`、`onComplete`，其它属性暂不支持（这里做了检查，控制台会有相应的警告）

## 简单示例

```typescript
import { _decorator, Component, Vec3, tween } from 'cc';

@ccclass("tween-test")
export class tweentest extends Component {

    private _pos: Vec3 = new Vec3(0, 0, 0);

    start () {
        /** 缓动 _pos */
        tween(this._pos)
            .to(3, new Vec3(10, 10, 10), { easing: 'bounceInOut' })
            .to(3, new Vec3(0, 0, 0), { easing: 'elasticOut' })
            .union()
            .repeat(2) // 执行 2 次
            .start();

        /** 缓动 Node，这里将缓动 Node 的 position 属性 */
        tween(this.node)
            .to(3, { position: new Vec3(10, 10, 10) }, { easing: 'bounceInOut' })
            .to(3, { position: new Vec3(0, 0, 0) }, { easing: 'elasticOut' })
            .union()
            .repeat(2) // 执行 2 次
            .start();
    }
}
```

## 注意事项

### repeat 语义

此前 `repeat` 的语义为重复几次，为了全面保持 Creator v2.x 的设计，所以现在 `repeat` 为执行几次，即 `repeat(1)` 代表执行一次。

### 一些限制

为了降低更新 `Node Transform` 信息的频率，`Node` 内部维护了一个 `dirty` 状态，只有在调用了可能会改变 `Node Transform` 信息的接口，才会将 `dirty` 置为需要更新的状态。

但目前的接口存在一定的限制，例如：通过 `this.node.position` 获取到的 `position` 是一个通用的 `Vec3`。

当执行 `this.node.position.x = 1` 这段代码的时候，只执行了 `position` 的 `getter`，并没有执行 `position` 的 `setter`。由于 `dirty` 并没有更新，便会导致渲染时使用的节点的 `Transform` 信息没有更新。

目前，我们也不支持这样的调用，而是鼓励使用 `setPosition` 或 `position` 的 `setter`，如下所示：

```typescript
let _pos = new Vec3(0, 1, 0);
this.node.position = _pos;      // 这里将通过 position 的 setter
this.node.setPosition(_pos);    // 这里将通过接口 setPosition
```

### 正确的缓动方式

在新的 `Tween` 模块中可以对具有 `getter` 和 `setter` 的属性进行缓动，例如简单示例中 `node` 的 `position` 属性。这样在缓动的过程中，会对相应的接口进行设置，从而保证 `dirty` 正常更新。

> **注意**：切换场景时记得停止相应的缓动。

## Tween 接口介绍

| 接口               | 功能说明                                     |
| :---------------- | :------------------------------------------ |
| **to**            | 添加一个对属性进行 **绝对值** 计算的间隔动作  |
| **by**            | 添加一个对属性进行 **相对值** 计算的间隔动作  |
| **set**           | 添加一个 **直接设置目标属性** 的瞬时动作      |
| **delay**         | 添加一个 **延迟时间** 的瞬时动作              |
| **call**          | 添加一个 **调用回调** 的瞬时动作              |
| **target**        | 添加一个 **直接设置缓动目标** 的瞬时动作      |
| **union**         | **将上下文的缓动动作打包成一个**            |
| **then**          | **插入一个 Tween 到缓动队列中**             |
| **repeat**        | **执行几次**（此前为重复几次，请及时适配）  |
| **repeatForever** | **一直重复执行**                            |
| **sequence**      | **添加一个顺序执行的缓动**                  |
| **parallel**      | **添加一个同时进行的缓动**                  |
| **start**         | **启动缓动**                                |
| **stop**          | **停止缓动**                                |
| **clone**         | **克隆缓动**                                |
| **show**          | **启用节点链上的渲染，缓动目标需要为 Node** |
| **hide**          | **禁用节点链上的渲染，缓动目标需要为 Node** |
| **removeSelf**    | **将节点移出场景树，缓动目标需要为 Node**   |

### to 和 by 的可选属性

定义如下:

```typescript
interface ITweenOption {
    easing?: TweenEasing | ((k: number) => number);
    progress?: (start: number, end: number, current: number, ratio: number) => number;
    onStart?: (target: object) => {};
    onUpdate?: (target: object, ratio: number) => {};
    onComplete?: (target: object) => {};
}
```

与 Creator v2.x 不同的是新增了 `onStart`、`onUpdate`、`onComplete` 等属性，这些属性是回调函数，调用时会传入缓动的目标。

另外，`onUpdate` 调用时还会多传入一个目前缓动的进行值，范围为 `(0-1]`。

#### 回调的使用范例

以 `onUpdate` 为例，以下代码缓动一个位置，然后在 `onUpdate` 中将其设置到多个对象上，这样就像是缓动的合批。

```typescript
import { Node, tween, Vec3 } from 'cc';
const nodeArray: Node[] = []; // 此处替换成你的节点数组
const tweenTargetVec3 = new Vec3();
tween(tweenTargetVec3)
    .by(1, new Vec3(1, 1, 1), {
        'onUpdate': (target: Vec3, ratio: number) => {
            for (let i = 0; i < nodeArray.length; i++)
                nodeArray[i].worldPosition = target;
        }
    });
```

## 自动销毁

当缓动目标为 `Node` 时，将会监听其销毁事件进行缓动的自动销毁，调用 `target` 方法也会自动更新监听。

具体的使用方法，详情请参考范例 **Tween**（[GitHub](https://github.com/cocos-creator/test-cases-3d/tree/v3.3/assets/cases/tween) | [Gitee](https://gitee.com/mirrors_cocos-creator/test-cases-3d/tree/v3.3/assets/cases/tween)）。

更多详细介绍，请参考 [使用缓动系统](https://docs.cocos.com/creator/manual/zh/scripting/tween.html)。
