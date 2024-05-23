# Creating and destroying nodes

## Creating new nodes

Besides creating nodes by using the scene editor, we can create nodes dynamically in script. Add it into the scene by `new cc.Node()` to complete the whole constructive process.

Below is a simple example:

```javascript
cc.Class({
  extends: cc.Component,

  properties: {
    sprite: {
      default: null,
      type: cc.SpriteFrame,
    },
  },

  start: function () {
    var node = new cc.Node('Sprite');
    var sp = node.addComponent(cc.Sprite);

    sp.spriteFrame = this.sprite;
    node.parent = this.node;
  },
});
```

## Cloning existing node

Sometimes we want to clone the existing node dynamically in the scene, it can be done by `cc.instantiate`. Here is how it is done:

```javascript
cc.Class({
  extends: cc.Component,

  properties: {
    target: {
      default: null,
      type: cc.Node,
    },
  },

  start: function () {
    var scene = cc.director.getScene();
    var node = cc.instantiate(this.target);

    node.parent = scene;
    node.setPosition(0, 0);
  },
});
```

## Creating preset node

Like cloning the existing node, you can set a prefab and create node by `cc.instantiate`. Here is how it's done:

```javascript
cc.Class({
  extends: cc.Component,

  properties: {
    target: {
      default: null,
      type: cc.Prefab,
    },
  },

  start: function () {
    var scene = cc.director.getScene();
    var node = cc.instantiate(this.target);

    node.parent = scene;
    node.setPosition(0, 0);
  },
});
```

## Destroying node

Nodes can be destroyed by the function `node.destroy()`. It's worth mentioning that node removing will not happen immediately, but will be executed after the logic update for the present frame is complete. After a node is destroyed, it is in the invalid state. By `cc.isValid`, the present node can be judged whether it is destroyed or not.

Here is how to use it:

```javascript
cc.Class({
  extends: cc.Component,

  properties: {
    target: cc.Node,
  },

  start: function () {
    // destroy target node after 5s
    setTimeout(function () {
      this.target.destroy();
    }.bind(this), 5000);
  },

  update: function (dt) {
    if (cc.isValid(this.target)) {
      this.target.rotation += dt * 10.0;
    }
  },
});
```

### destroy and removeFromParent

After calling `removeFromParent` on a node, the node is not released from memory because the engine still holds its data internally. **If a node is no longer used, please call its `destroy` directly instead of `removeFromParent`, otherwise, a memory leak will result.**

In short, if a node is no longer used, use `destroy`, do not need `removeFromParent`, do not need to set `parent` to `null`.
