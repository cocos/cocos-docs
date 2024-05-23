# Life cycle callback

Cocos Creator provides the life cycle callback function for component script. As long as the user defines a specific callback function, Creator will execute the script in a specific period, users do not need to manually call them.

Currently, the major life-cycle callback functions provided for users are:

 - onLoad
 - start
 - update
 - lateUpdate
 - onDestroy
 - onEnable
 - onDisable

## onLoad

In the initialization phase of the component script, we provide the `onLoad` callback function. `onLoad` callback will be triggered when the node is first activated, such as when the scene is loaded, or when the node is activated. The `onLoad` phase guarantees you can get other nodes from the scene and the resource data associated with the node. `onLoad` is always called before any `start` functions, this allows you to order initialization of scripts. Normally, we will do some operation associated with initialization in the `onLoad` phase. For example:

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

The `start` callback function will be triggered before the first activation of the component, which is before executing `update` for the first time. `start` is usually used to initialize data that needs frequent modification, which may have changed during `update`.

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

`update` will execute before all the animations' update, but if we're going to do some extra work after the effects (such as animation, particle, physics, etc.) are updated or want to perform other operations after `update` of all the components are done, then we'll need the `lateUpdate` callback.

```js
cc.Class({
  extends: cc.Component,

  lateUpdate: function (dt) {
    this.node.rotation = 20;
  }
});
```

## onEnable

When the `enabled` property of the component turns from `false` to `true`, or the `active` property of the node turns from `false` to `true`, it will trigger `onEnable` callback. If the node is created for the first time, and `enabled` is `true`, then it will be called after `onLoad` but before `start`.

## onDisable

When the `enabled` property of the component turns from `true` to `false`, or the `active` property of the node turns from `true` to `false`, it will trigger `onEnable` callback, it will activate the `onDisable` callback.

## onDestroy

When the component or node calls `destroy()`, it will call the `onDestroy` callback. Then they will be collected when this frame is done. When you declare both `onLoad` and `onDestroy`, they will always be called in pairs, which means that from component's initialization to destruction, they will either all be called or none will be called.

## Tips

The execution order of lifecycle functions over a component's complete lifetime from initialization to activation and final destruction is: `onLoad` -> `onEnable` -> `start` -> `update` -> `lateUpdate` -> `onDisable` -> `onDestroy`.

Where `onLoad` and `start` are often used for a component's initialization and will only be executed once when the node become `activeInHierarchy`. In addition to the content mentioned above and the different execution order, there are the following differences:

|        | onLoad  | start  |
| ------ | ------- | -----  |
| When the node is activated   | Calls immediately | Deferred Call |
| Only called when the component is enabled? |  No   | Yes  |
