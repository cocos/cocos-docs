# 在 Cocos Creator 中使用缓动系统（cc.tween）

> 文：youyou、薰依

## 缓动系统（cc.tween）介绍

Cocos Creator 在 v2.0.9 提供了一套新的 API —— `cc.tween`。`cc.tween` 能够对对象的任意属性进行缓动，功能类似于 [cc.Action（动作系统）](./actions.md)。但是 `cc.tween` 会比 `cc.Action` 更加简洁易用，因为 `cc.tween` 提供了链式创建的方法，可以对任何对象进行操作，并且可以对对象的任意属性进行缓动。

[动作系统](./actions.md) 是从 Cocos2d-x 迁移到 Cocos Creator 的，提供的 API 比较繁琐，只支持在节点属性上使用，并且如果要支持新的属性就需要再添加一个新的动作。为了提供更好的 API，`cc.tween` 在 [动作系统](./actions.md) 的基础上做了一层 API 封装。下面是 `cc.Action` 与 `cc.tween` 在使用上的对比：

- **cc.Action**：

  ```js
  this.node.runAction(
      cc.sequence(
          cc.spawn(
              cc.moveTo(1, 100, 100),
              cc.rotateTo(1, 360),
          ),
          cc.scale(1, 2)
      )
  )
  ```

- **cc.tween**：

  ```js
  cc.tween(this.node)
      .to(1, { position: cc.v2(100, 100), rotation: 360 })
      .to(1, { scale: 2 })
      .start()
  ```

## 链式 API

`cc.tween` 的每一个 API 都会在内部生成一个 action，并将这个 action 添加到内部队列中，在 API 调用完后会再返回自身实例，这样就可以通过链式调用的方式来组织代码。

`cc.tween` 在调用 start 时会将之前生成的 action 队列重新组合生成一个 cc.sequence 队列，所以 `cc.tween` 的链式结构是依次执行每一个 API 的，也就是会执行完一个 API 再执行下一个 API。

```js
cc.tween(this.node)
    // 0s 时，node 的 scale 还是 1
    .to(1, { scale: 2 })
    // 1s 时，执行完第一个 action，scale 为 2
    .to(1, { scale: 3 })
    // 2s 时，执行完第二个 action，scale 为 3
    .start()
    // 调用 start 开始执行 cc.tween
```

## 设置缓动属性

`cc.tween` 提供了两个设置属性的 API：

- `to`：对属性进行绝对值计算，最终的运行结果即是设置的属性值，即改变到某个值。
- `by`：对属性进行相对值计算，最终的运行结果是设置的属性值加上开始运行时节点的属性值，即变化值。

```js
cc.tween(node)
  .to(1, {scale: 2})      // node.scale === 2
  .by(1, {scale: 2})      // node.scale === 4 (2 + 2)
  .by(1, {scale: 1})      // node.scale === 5
  .to(1, {scale: 2})      // node.scale === 2
  .start()
```

## 支持缓动任意对象的任意属性

```js
let obj = { a: 0 }
cc.tween(obj)
  .to(1, { a: 100 })
  .start()
```

## 同时执行多个属性

```js
cc.tween(this.node)
    // 同时对 scale, position, rotation 三个属性缓动
    .to(1, { scale: 2, position: cc.v2(100, 100), rotation: 90 })
    .start()
```

## easing

你可以使用 easing 来使缓动更生动，`cc.tween` 针对不同的情况提供了多种使用方式。

```js
// 传入 easing 名字，直接使用内置 easing 函数
cc.tween().to(1, { scale: 2 }, { easing: 'sineOutIn'})

// 使用自定义 easing 函数
cc.tween().to(1, { scale: 2 }, { easing: t => t*t; })

// 只对单个属性使用 easing 函数
// value 必须与 easing 或者 progress 配合使用
cc.tween().to(1, { scale: 2, position: { value: cc.v3(100, 100, 100), easing: 'sineOutIn' } })
```

Easing 类型说明可参考 [API 文档](../../../api/zh/classes/Easing.html)。

## 自定义 progress

相对于 easing，自定义 progress 函数可以更自由的控制缓动的过程。

```js
// 对所有属性自定义 progress
cc.tween().to(1, { scale: 2, rotation: 90 }, {
  progress: (start, end, current, ratio) => {
    return start + (end - start) * ratio;
  }
})

// 对单个属性自定义 progress
cc.tween().to(1, {
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

## 复制缓动

clone 函数会克隆一个当前的缓动，并接受一个 target 作为参数。

```js
// 先创建一个缓动作为模板
let tween = cc.tween().to(4, { scale: 2 })

// 复制 tween，并使用节点 Canvas/cocos 作为 target
tween.clone(cc.find('Canvas/cocos')).start()
// 复制 tween，并使用节点 Canvas/cocos2 作为 target
tween.clone(cc.find('Canvas/cocos2')).start()
```

## 插入其他的缓动到队列中

你可以事先创建一些固定的缓动，然后通过组合这些缓动形成新的缓动来减少代码的编写。

```js
let scale = cc.tween().to(1, { scale: 2 })
let rotate = cc.tween().to(1, { rotation: 90})
let move = cc.tween().to(1, { position: cc.v3(100, 100, 100)})

// 先缩放再旋转
cc.tween(this.node).then(scale).then(rotate)
// 先缩放再移动
cc.tween(this.node).then(scale).then(move)
```

## 并行执行缓动

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

## 回调

```js
cc.tween(this.node)
    .to(2, { rotation: 90})
    .to(1, { scale: 2})
    // 当前面的动作都执行完毕后才会调用这个回调函数
    .call(() => { cc.log('This is a callback') })
    .start()
```

## 重复执行

repeat/repeatForever 函数会将前一个 action 作为作用对象。但是如果有参数提供了其他的 action 或者 tween，则 repeat/repeatForever 函数会将传入的 action 或者 tween 作为作用对象。

```js
cc.tween(this.node)
    .by(1, { scale: 1 })
    // 对前一个 by 重复执行 10次
    .repeat(10)
    // 最后 node.scale === 11
    .start()

// 也可以这样用
cc.tween(this.node)
    .repeat(10,
        cc.tween().by(1, { scale: 1 })
    )
    .start()

// 一直重复执行下去
cc.tween(this.node)
    .by(1, { scale: 1 })
    .repeatForever()
    .start()
```

## 延迟执行

```js
cc.tween(this.node)
    // 延迟 1s
    .delay(1)
    .to(1, { scale: 2 })
    // 再延迟 1s
    .delay(1)
    .to(1, { scale: 3 })
    .start()
```
