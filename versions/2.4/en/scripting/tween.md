# Using the cc.tween in Cocos Creator

> Authors: Xunyi, youyou

## cc.tween introduction

Cocos Creator provides a new set of APIs in v2.0.9 -- `cc.tween`. `cc.tween` can easing any property of an object, similar to the [cc.Action](actions.md). But `cc.tween` is much easier to use than `cc.Action`, because `cc.tween` provides a chain-created method that can manipulate any object, and easing any of the object's properties.

`cc.Action` is migrated from Cocos2d-x to Cocos Creator. Providing an API that is cumbersome, only supports use on the node properties, and requires adding a new action if you want to support new properties. In order to provide a better API, `cc.tween` on the basis of `cc.Action` made a layer of API encapsulation. Here's a comparison between `cc.Action` and `cc.tween` in use:

- **cc.Action**:

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

- **cc.tween**:

  ```js
  cc.tween(this.node)
      .to(1, { position: cc.v2(100, 100), rotation: 360 })
      .to(1, { scale: 2 })
      .start()
  ```

## Chain APIs

Each API of `cc.tween` generates a action internally and adds this action to the internal queue. After the API is called, it returns its own instance, so that the code can be organized by chain call.

When `cc.tween` calls `start`, a cc.sequence queue is generated that combines the previously generated action queue.
So the chain structure of `cc.tween` is to execute each API in turn, that is, it will execute an API and then execute the next API.

```js
cc.tween(this.node)
    // at 0s, node's scale is still 1.
    .to(1, { scale: 2 })
    // at 1s, after executing the first action, scale is 2
    .to(1, { scale: 3 })
    // at 2s, after executing the second action, scale is 3
    .start()
    // Call start and start executing cc.tween
```

## Set the properties of cc.tween

`cc.tween` provides two APIs for setting properties:

- `to`: Calculate the absolute value of the property. And the final run result is the property value that is set.
- `by`: Calculate the relative value of the property. And the final run result is the property value that is set, plus the property value of the node at the start of the run.

```js
cc.tween(node)
  .to(1, {scale: 2})      // node.scale === 2
  .by(1, {scale: 2})      // node.scale === 4 (2+2)
  .by(1, {scale: 1})      // node.scale === 5
  .to(1, {scale: 2})      // node.scale === 2
  .start()
```

## Support for easing any property of any object

```js
let obj = { a: 0 }
cc.tween(obj)
  .to(1, { a: 100 })
  .start()
```

## Execute multiple properties simultaneously

```js
cc.tween(this.node)
    // Easing three properties a, b, c at the same time
    .to(1, { scale: 2, position: cc.v2(100, 100), rotation: 90 })
    .start()
```

## easing

You can use `easing` to make the easing more vivid. `cc.tween` provides a variety of ways to use it for different situations.

```js
// Pass in the easing name and use the built-in easing function directly
cc.tween().to(1, { scale: 2 }, { easing: 'sineOutIn'})

// Using custom easing functions
cc.tween().to(1, { scale: 2 }, { easing: t => t*t; })

// Use the easing function only for a single property
// value must be used with easing or progress
cc.tween().to(1, { scale: 2, position: { value: cc.v3(100, 100, 100), easing: 'sineOutIn' } })
```

For parameters of easing, please refer to the [API documentation](../../../api/en/classes/Easing.html).

## Custom progress

Compared to easing, custom progress function has more freedom to control the easing process.

```js
// Customize the progress for all properties
cc.tween().to(1, { scale: 2, rotation: 90 }, {
  progress: (start, end, current, ratio) => {
    return start + (end - start) * ratio;
  }
})

// Customize the progress for a single property
cc.tween().to(1, {
  scale: 2,
  position: {
    value: cc.v3(),
    progress: (start, end, current, t) => {
      // Note that the passed in property is cc.Vec3, so you need to use Vec3.lerp for interpolation calculations
      return start.lerp(end, t, current);
    }
  }
})
```

## Replication easing

The `clone` function will clone a current easing and accept a target as a parameter

```js
// First create a easing as a template
let tween = cc.tween().to(4, { scale: 2 })

// Copy tween and use node Canvas/cocos as target
tween.clone(cc.find('Canvas/cocos')).start()
// Copy tween and use node Canvas/cocos2 as target
tween.clone(cc.find('Canvas/cocos2')).start()
```

## Insert other easing into the queue

You can create some fixed easing in advance, and then reduce the writing of your code by combining these easing to form a new easing.

```js
let scale = cc.tween().to(1, { scale: 2 })
let rotate = cc.tween().to(1, { rotation: 90})
let move = cc.tween().to(1, { position: cc.v3(100, 100, 100)})

// Zoom first, then rotate
cc.tween(this.node).then(scale).then(rotate)
// Zoom first, then move
cc.tween(this.node).then(scale).then(move)
```

## Parallel execution easing

`cc.tween` is executed in the form of a sequence when it is executed in a chain. However, when writing complex easing, you may need to execute multiple queues in parallel at the same time. So `cc.tween` provides the parallel interface to meet this requirement.

```js
let t = cc.tween;
t(this.node)
    // Execute two cc.tween at the same time
    .parallel(
        t().to(1, { scale: 2 }),
        t().to(2, { position: cc.v2(100, 100) })
    )
    .call(() => {
        console.log('All tweens finished.')
    })
    .start()
```

## Callback

```js
cc.tween(this.node)
    .to(2, { rotation: 90})
    .to(1, { scale: 2})
    // This callback function is not called until the preceding action has been performed
    .call(() => { cc.log('This is a callback') })
    .start()
```

## Repeat execution

The repeat/repeatForever function will use the previous action as the object of action. However, if there are parameters that provide additional action or tween, the repeat/repeatForever function will use the incoming action or tween as the object of action.

```js
cc.tween(this.node)
    .by(1, { scale: 1 })
    // Repeat 10 times for the previous by
    .repeat(10)
    // Finally node.scale === 11
    .start()

// Can also be used like this
cc.tween(this.node)
    .repeat(10,
        cc.tween().by(1, { scale: 1 })
    )
    .start()

// Keep it going over and over again.
cc.tween(this.node)
    .by(1, { scale: 1 })
    .repeatForever()
    .start()
```

## Delayed execution

```js
cc.tween(this.node)
    // Delay 1s
    .delay(1)
    .to(1, { scale: 2 })
    // Another delay of 1s
    .delay(1)
    .to(1, { scale: 3 })
    .start()
```
