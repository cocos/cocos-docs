# 生命周期回调

Cocos Creator 为组件脚本提供了生命周期的回调函数。用户只要定义特定的回调函数，Creator 就会在特定的时期自动执行相关脚本，用户不需要手工调用它们。

目前提供给用户的生命周期回调函数主要有：

 - onLoad
 - start
 - update
 - lateUpdate
 - onDestroy
 - onEnable
 - onDisable

## onLoad

组件脚本的初始化阶段，我们提供了 `onLoad` 回调函数。`onLoad` 回调会在节点首次激活时触发，比如所在的场景被载入，或者所在节点被激活的情况下。在 `onLoad` 阶段，保证了你可以获取到场景中的其他节点，以及节点关联的资源数据。`onLoad` 总是会在任何 `start` 方法调用前执行，这能用于安排脚本的初始化顺序。通常我们会在 `onLoad` 阶段去做一些初始化相关的操作。例如：

```js
cc.Class({
  extends: cc.Component,

  properties: {
    bulletSprite: cc.SpriteFrame,
    gun: cc.Node,
  },

  onLoad: function () {
    this._bulletRect = this.bulletSprite.getRect();
    this.gun = cc.find('hand/weapon', this.node);
  },
});
```

## start

`start` 回调函数会在组件第一次激活前，也就是第一次执行 `update` 之前触发。`start` 通常用于初始化一些需要经常修改的数据，这些数据可能在 update 时会发生改变。

```js
cc.Class({
  extends: cc.Component,

  start: function () {
    this._timer = 0.0;
  },

  update: function (dt) {
    this._timer += dt;
    if ( this._timer >= 10.0 ) {
      console.log('I am done!');
      this.enabled = false;
    }
  },
});
```

## update

游戏开发的一个关键点是在每一帧渲染前更新物体的行为，状态和方位。这些更新操作通常都放在 `update` 回调中。

```js
cc.Class({
  extends: cc.Component,

  update: function (dt) {
    this.node.setPosition( 0.0, 40.0 * dt );
  }
});
```

## lateUpdate

`update` 会在所有动画更新前执行，但如果我们要在动效（如动画、粒子、物理等）更新之后才进行一些额外操作，或者希望在所有组件的 `update` 都执行完之后才进行其它操作，那就需要用到 `lateUpdate` 回调。

```js
cc.Class({
  extends: cc.Component,

  lateUpdate: function (dt) {
    this.node.rotation = 20;
  }
});
```

## onEnable

当组件的 `enabled` 属性从 `false` 变为 `true` 时，或者所在节点的 `active` 属性从 `false` 变为 `true` 时，会激活 `onEnable` 回调。倘若节点第一次被创建且 `enabled` 为 `true`，则会在 `onLoad` 之后，`start` 之前被调用。

## onDisable

当组件的 `enabled` 属性从 `true` 变为 `false` 时，或者所在节点的 `active` 属性从 `true` 变为 `false` 时，会激活 `onDisable` 回调。

## onDestroy

当组件或者所在节点调用了 `destroy()`，则会调用 `onDestroy` 回调，并在当帧结束时统一回收组件。当同时声明了 `onLoad` 和 `onDestroy` 时，它们将总是被成对调用。也就是说从组件初始化到销毁的过程中，它们要么就都会被调用，要么就都不会被调用。

## Tips

一个组件从初始化到激活，再到最终销毁的完整生命周期函数调用顺序为：`onLoad` -> `onEnable` -> `start` -> `update` -> `lateUpdate` -> `onDisable` -> `onDestroy`。

其中，`onLoad` 和 `start` 常常用于组件的初始化，只有在节点 `activeInHierarchy` 的情况下才能调用，并且最多只会被调用一次。除了上文提到的内容以及调用顺序的不同，它们还有以下区别：

|        | 节点激活时 | 组件 enabled 时才会调用？ |
| :----: | :-------: | :-------: |
| onLoad | 立即调用   | 否 |
| start  | 延迟调用   | 是 |
