# Life cycle callback

Cocos Creator provides the life cycle callback function for component script. As long as the user defines a specific callback function,Creator will execute the script in a specific period, users do not need to manually call them.

Currently, the major life-cycle callback functions provided for users are:

 - onLoad
 - start
 - update
 - lateUpdate
 - onDestroy
 - onEnable
 - onDisable

## onLoad

In the initialization phase of the component script, we provide the `onLoad` callback function. `onLoad` callback will be triggered when the scene has this component being loaded. The `onLoad` phase guarantees you can get other nodes from the scene and the resource data associated with the node. onLoad is always called before any start functions, this allows you to order initialization of scripts. Normally, we will do some operation associated with initialization in the `onLoad` phase. For example:

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

The `start` callback function will be triggered before the first activation of the component, which is before executing `update` for the first time. `start` is usually used to initialize some intermediate state data which may have changed during update and frequently enables and disables.

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

One of the key points for game development is to update an object's behavior, status and orientation before rendering every frame. These update operations are normally put in the `update` callback.

```js
cc.Class({
  extends: cc.Component,

  update: function (dt) {
    this.node.setPosition( 0.0, 40.0 * dt );
  }
});
```

## lateUpdate

`update` will execute before all the animations' update, but if we want to perform some extra operations after the animation update or
 want to perform other operations after `update` of all the components are done, then we'll need the `lateUpdate` callback.

```js
cc.Class({
  extends: cc.Component,

  lateUpdate: function (dt) {
    this.node.rotation = 20;
  }
});
```

## onEnable

When the `enabled` property of the component turns from `false` to `true`, it will trigger `onEnable` callback. If the node is created for the first time,
and `enabled` is `true`, then it will be called after `onLoad` but before `start`.

## onDisable

When the `enabled` property of the component turns from `true` to `false`, it will activate the `onDisable` callback.

## onDestroy

When the component calls `destroy()`, they will be collected when this frame is done. By this time, it will call the `onDestroy` callback.


---

Continue on to read about [Create and destroy nodes](create-destroy.md).
