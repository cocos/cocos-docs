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
        let tw = new Tween(this._pos)
            .to(3, new Vec3(10, 10, 10), { easing: 'bounceInOut' })
            .to(3, new Vec3(0, 0, 0), { easing: 'elasticOut' })
            .union()
            .repeat(2) // 执行 2 次
            .start();

        /** 缓动 Node，这里将缓动 Node 的 position 属性 */
        tw = new Tween(this.node)
            .to(3, { position: new Vec3(10, 10, 10) }, { easing: 'bounceInOut' })
            .to(3, { position: new Vec3(0, 0, 0) }, { easing: 'elasticOut' })
            .union()
            .repeat(2) // 执行 2 次
            .start();
    }
}
```

## 注意事项

### repeat

#### 语义

此前 `repeat` 的语义为重复几次，为了全面保持 Creator v2.x 的设计，所以现在 `repeat` 为执行几次，即 `repeat(1)` 代表执行一次。

#### 与 union 的搭配使用

repeat 注释中写道

> 添加一个重复 action，这个 action 会将**前一个动作**作为他的参数。

可以看出 repeat 和 repeatForever 都是重复执行它前面那一个 action 。所以，当我们需要将一些复杂的缓动重复应用时，一般需要**在repeat前加一个union**将这一系列缓动包装起来。

示例：

```
const tw = new Tween(this.node)
    .by(1, { position: new Vec3(100, 0, 0) })
    .to(1, { scale: new Vec3(2, 2, 2) })
    .call(()=>{
        console.log('It's a callback.')
    })
    //将前面的三个 action 进行包装
    .union()
    .repeat(5)
    .start();
```

#### 瞬时动作与间隔动作

例如 delay 、 call 、 target ，这些都是**瞬时动作**，与 repeat 搭配使用**会出现异常**。 repeat 和 repeatForever 前需要**接 to 、 by 等间隔动作**或者**包含它们的 union 打包动作**。

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

#### 针对readonly字段的缓动

例如节点上 `position` 属性的类型是 `Readonly<Vec3>`，它的分量 `x`/`y`/`z` 无法在 tween 里被修改，所以我们需要在 node 挂载 tween 且指定目标为 `position`。使用 `tween(node.position)` 这样的方式是无效的。

错误示范：

```
const tw = new Tween(this.node.position)
    .by(1, new Vec3(100, 0, 0))
    .call(()=>{
        this.node.position = new Vec3(0, 0, 0);
    })
    .union()
    .repeatForever()
    .start();
```

正确示范：

```
const tw = new Tween(this.node)
    .by(1, { position: new Vec3(100, 0, 0) })
    .call(()=>{
        this.node.position = new Vec3(0, 0, 0);
    })
    .union()
    .repeatForever()
    .start();
```

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
| **union**         | **将所有的缓动动作整合为一个缓动动作**     |
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
const tw = new Tween(tweenTargetVec3)
    .by(1, new Vec3(1, 1, 1), {
        'onUpdate': (target: Vec3, ratio: number) => {
            for (let i = 0; i < nodeArray.length; i++)
                nodeArray[i].worldPosition = target;
        }
    });
```

`call` 的使用

```typescript
const tw = new Tween(this.node)
    .to(2, { rotation: 90})
    .to(1, { scale: 2})
    // 当前面的动作都执行完毕后才会调用这个回调函数
    .call(() => { cc.log('This is a callback') })
    .start()
```

## 其他基础使用范例

### 链式 API

`cc.tween` 的每一个 API 都会在内部生成一个 action，并将这个 action 添加到内部队列中，在 API 调用完后会再返回自身实例，这样就可以通过链式调用的方式来组织代码。

`cc.tween` 在调用 start 时会将之前生成的 action 队列重新组合生成一个 cc.sequence 队列，所以 `cc.tween` 的链式结构是依次执行每一个 API 的，也就是会执行完一个 API 再执行下一个 API。

```js
const tw = new Tween(this.node)
    // 0s 时，node 的 scale 还是 1
    .to(1, { scale: 2 })
    // 1s 时，执行完第一个 action，scale 为 2
    .to(1, { scale: 3 })
    // 2s 时，执行完第二个 action，scale 为 3
    .start()
    // 调用 start 开始执行 cc.tween
```

### 设置缓动属性

`cc.tween` 提供了两个设置属性的 API：

- `to`：对属性进行绝对值计算，最终的运行结果即是设置的属性值，即改变到某个值。
- `by`：对属性进行相对值计算，最终的运行结果是设置的属性值加上开始运行时节点的属性值，即变化值。

```js
const tw = new Tween(node)
  .to(1, {scale: 2})      // node.scale === 2
  .by(1, {scale: 2})      // node.scale === 4 (2 + 2)
  .by(1, {scale: 1})      // node.scale === 5
  .to(1, {scale: 2})      // node.scale === 2
  .start()
```

### 同时执行多个属性

```js
const tw = new Tween(this.node)
    // 同时对 ‘scale’、‘position’、‘rotation’ 三个属性进行缓动
    .to(1, { scale: 2, position: cc.v2(100, 100), rotation: 90 })
    .start()
```

### easing

你可以使用 easing 来使缓动更生动，`cc.tween` 针对不同的情况提供了多种使用方式。

```js
// 传入 easing 名字，直接使用内置 easing 函数
let tw = new Tween().to(1, { scale: 2 }, { easing: 'sineOutIn'})

// 使用自定义 easing 函数
tw = new Tween().to(1, { scale: 2 }, { easing: t => t*t; })

// 只对单个属性使用 easing 函数
// value 必须与 easing 或者 progress 配合使用
tw = new Tween().to(1, { scale: 2, position: { value: cc.v3(100, 100, 100), easing: 'sineOutIn' } })
```

Easing 类型说明可参考 [API 文档](../../../api/zh/classes/Easing.html)。

### 自定义 progress

相对于 easing，自定义 progress 函数可以更自由的控制缓动的过程。

```js
// 对所有属性自定义 progress
let tw = new Tween().to(1, { scale: 2, rotation: 90 }, {
  progress: (start, end, current, ratio) => {
    return start + (end - start) * ratio;
  }
})

// 对单个属性自定义 progress
tw = new Tween().to(1, {
  scale: 2,
  position: {
    value: cc.v3(),
    progress: (start, end, current, t) => {
      // 注意，传入的属性为 cc.Vec3，所以需要使用 Vec3.lerp 进行插值计算
      return start.lerp(end, t, current);
    }
  }
})
```

### 复制缓动

clone 函数会克隆一个当前的缓动，并接受一个 target 作为参数。

```js
// 先创建一个缓动作为模板
let tween = new Tween().to(4, { scale: 2 })

// 复制 tween，并使用节点 Canvas/cocos 作为 target
tween.clone(cc.find('Canvas/cocos')).start()
// 复制 tween，并使用节点 Canvas/cocos2 作为 target
tween.clone(cc.find('Canvas/cocos2')).start()
```

### 插入其他的缓动到队列中

你可以事先创建一些固定的缓动，然后通过组合这些缓动形成新的缓动来减少代码的编写。

```js
let scale = new Tween().to(1, { scale: 2 })
let rotate = new Tween().to(1, { rotation: 90})
let move = new Tween().to(1, { position: cc.v3(100, 100, 100)})

// 先缩放再旋转
let tw = new Tween(this.node).then(scale).then(rotate)
// 先缩放再移动
tw = new Tween(this.node).then(scale).then(move)
```

### 并行执行缓动

`cc.tween` 在链式执行时是按照 sequence 的方式来执行的，但是在编写复杂缓动的时候可能会需要同时并行执行多个队列，`cc.tween` 提供了 parallel 接口来满足这个需求。

```js
let t = cc.tween;
t(this.node)
    // 同时执行两个 cc.tween
    .parallel(
        t().to(1, { scale: 2 }),
        t().to(2, { position: cc.v2(100, 100) })
    )
    .call(() => {
        console.log('All tweens finished.')
    })
    .start()
```

### 重复执行

repeat/repeatForever 函数会将前一个 action 作为作用对象。但是如果有参数提供了其他的 action 或者 tween，则 repeat/repeatForever 函数会将传入的 action 或者 tween 作为作用对象。

```js
let tw = new Tween(this.node)
    .by(1, { scale: 1 })
    // 对前一个 by 重复执行 10次
    .repeat(10)
    // 最后 node.scale === 11
    .start()

// 也可以这样用
tw = new Tween(this.node)
    .repeat(10,
        new Tween().by(1, { scale: 1 })
    )
    .start()

// 一直重复执行下去
tw = new Tween(this.node)
    .by(1, { scale: 1 })
    .repeatForever()
    .start()
```

### 延迟执行

```js
const tw = new Tween(this.node)
    // 延迟 1s
    .delay(1)
    .to(1, { scale: 2 })
    // 再延迟 1s
    .delay(1)
    .to(1, { scale: 3 })
    .start()
```



## 自动销毁

当缓动目标为 `Node` 时，将会监听其销毁事件进行缓动的自动销毁，调用 `target` 方法也会自动更新监听。

具体的使用方法，详情请参考范例 **Tween**（[GitHub](https://github.com/cocos-creator/test-cases-3d/tree/v3.0/assets/cases/tween) | [Gitee](https://gitee.com/mirrors_cocos-creator/test-cases-3d/tree/v3.0/assets/cases/tween)）。
