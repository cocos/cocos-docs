# 创建和销毁节点

## 创建新节点

除了通过场景编辑器创建节点外，我们也可以在脚本中动态创建节点。通过 `new cc.Node()` 并将它加入
到场景中，可以实现整个创建过程。

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
    var node = new cc.Node('sprite ' + this.count);
    var sp = node.addComponent(cc.Sprite);

    sp.spriteFrame = this.sprite;
    node.parent = this.node;
    node.setPosition(0,0);
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
    node.setPosition(0,0);
  },
});
```

## 创建预制节点

和克隆已有节点相似，你也设置你的预制（prefab）节点并通过 `cc.instantiate` 生成。使用方法如下：

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
    node.setPosition(0,0);
  },
});
```

## 销毁节点

通过 `node.destroy()` 函数，可以销毁节点。值得一提的是，销毁节点并不会立刻发生，而是在当前
帧逻辑更新结束后，统一执行。当一个节点销毁后，该节点就处于无效状态，可以通过 `cc.isValid` 判断
当前节点是否已经被销毁。

使用方法如下：

```javascript
cc.Class({
  extends: cc.Component,

  properties: {
    target: cc.Node,
  },

  start: function () {
    setTimeout(function () {
      this.target.destroy();
    }.bind(this), 5000);
  },

  update: function (dt) {
    if ( !cc.isValid(this.target) ) {
      this.enabled = false;
      return;
    }

    this.target.rotation += dt * 10.0;
  },
});
```


---

继续前往 [发射和监听事件](events.md) 说明文档。
