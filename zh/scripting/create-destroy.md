# 创建和销毁节点

## 创建新节点

除了通过场景编辑器创建节点外，我们也可以在脚本中动态创建节点。通过 `new cc.Node()` 并将它加入到场景中，可以实现整个创建过程。

以下是一个简单的例子:

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

## 克隆已有节点

有时我们希望动态的克隆场景中的已有节点，我们可以通过 `cc.instantiate` 方法完成。使用方法如下：

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

## 创建预制节点

和克隆已有节点相似，你可以设置一个预制（Prefab）并通过 `cc.instantiate` 生成节点。使用方法如下：

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

## 销毁节点

通过 `node.destroy()` 函数，可以销毁节点。值得一提的是，销毁节点并不会立刻被移除，而是在当前帧逻辑更新结束后，统一执行。当一个节点销毁后，该节点就处于无效状态，可以通过 `cc.isValid` 判断当前节点是否已经被销毁。

使用方法如下：

```javascript
cc.Class({
  extends: cc.Component,

  properties: {
    target: cc.Node,
  },

  start: function () {
    // 5 秒后销毁目标节点
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

### destroy 和 removeFromParent 的区别

调用一个节点的 `removeFromParent` 后，它并不会从内存中释放，因为引擎内部仍会持有它的数据。**因此如果一个节点不再使用，请直接调用它的 `destroy` 而不是 `removeFromParent`，否则会导致内存泄漏。**

总之，如果一个节点不再使用，`destroy` 就对了，不需要 `removeFromParent` 也不需要设置 `parent` 为 `null`。
