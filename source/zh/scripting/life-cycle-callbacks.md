# 生命周期回调

Cocos Creator 为组件脚本提供了生命周期的回调函数。用户通过定义特定的函数回调在特定的时期编写相关
脚本。目前提供给用户的声明周期回调函数有：

 - onLoad
 - start
 - update
 - lateUpdate
 - onDestroy
 - onEnable
 - onDisable

## onLoad

组件脚本的初始化阶段，我们提供了 `onLoad` 回调函数。`onLoad` 回调会在这个组件所在的场景被载入
的时候触发，在 `onLoad` 阶段，保证了你可以获取到场景中的其他节点，以及节点关联的资源数据。通常
我们会在 `onLoad` 阶段去做一些初始化相关的操作。例如：

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

`start` 回调函数会在组件第一次激活前，也就是第一次执行 `update` 之前触发。`start` 通常用于
初始化一些中间状态的数据，这些数据可能在 update 时会发生改变，并且被频繁的 enable 和 disable。

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

`update` 会在所有动画更新前执行，但如果我们要在动画更新之后才进行一些额外操作，或者希望在所有组件的 `update`
都执行完之后才进行其它操作，那就需要用到 `lateUpdate` 回调。

```js
cc.Class({
  extends: cc.Component,

  lateUpdate: function (dt) {
    this.node.rotation = 20;
  }
});
```

## onEnable

当组件的 `enabled` 属性从 `false` 变为 `true` 时，会激活 `onEnable` 回调。倘若节点第一次被
创建且 `enabled` 为 `true`，则会在 `onLoad` 之后，`start` 之前被调用。

## onDisable

当组件的 `enabled` 属性从 `true` 变为 `false` 时，会激活 `onDisable` 回调。

## onDestroy

当组件调用了 `destroy()`，会在该帧结束被统一回收，此时会调用 `onDestroy` 回调。


---

继续前往 [创建和销毁节点](create-destroy.md)。
