# 常用节点和组件接口

在通过 [访问节点和组件](access-node-component.md) 介绍的方法获取到节点或组件实例后，这篇文章将会介绍通过节点和组件实例可以通过哪些常用接口实现我们需要的种种效果和操作。这一篇也可以认为是 [cc.Node](../../../api/zh/classes/Node.html) 和 [cc.Component](../../../api/zh/classes/Component.html) 类的 API 阅读指南，可以配合 API 一起学习理解。


## 节点状态和层级操作


假设我们在一个组件脚本中，通过 `this.node` 访问当前脚本所在节点。

### 关闭/激活节点

`this.node.active = false;` 

该操作会关闭节点，当该节点的所有父节点都激活，将意味着：

- 在场景中隐藏该节点和所有子节点
- 该节点和所有子节点上的所有组件都将被禁用，也就是不会再执行这些组件中的 `update` 中的代码
- 这些组件上如果有 `onDisable` 方法，这些方法将被执行

`this.node.active = true;`

该操作会激活节点，当该节点的所有父节点都激活，将意味着：

- 在场景中重新激活该节点和所有子节点，除非子节点单独设置过关闭
- 该节点和所有子节点上的所有组件都会被启用，他们中的 `update` 方法之后每帧会执行
- 这些组件上如果有 `onEnable` 方法，这些方法将被执行


### 更改节点的父节点

假设父节点为 `parentNode`，子节点为 `this.node`

您可以：

```
this.node.parent = parentNode;
```

或

```
this.node.removeFromParent(false);
parentNode.addChild(this.node);
```

这两种方法是等价的。

注意：
 - `removeFromParent` 通常需要传入一个 `false`，否则默认会清空节点上绑定的事件和 action 等。
 - 通过 [创建和销毁节点](create-destroy.md) 介绍的方法创建出新节点后，要为节点设置一个父节点才能正确完成节点的初始化。

### 索引节点的子节点

`this.node.children` 将返回节点的所有子节点数组。<br>
`this.node.childrenCount` 将返回节点的子节点数量。

**注意** 以上两个 API 都只会返回节点的直接子节点，不会返回子节点的子节点。

## 更改节点的变换（位置、旋转、缩放、尺寸）

### 更改节点位置

分别对 x 轴和 y 轴坐标赋值：

`this.node.x = 100;`<br>
`this.node.y = 50;`

使用 `setPosition` 方法：

`this.node.setPosition(100, 50);`<br>
`this.node.setPosition(cc.v2(100, 50));`

设置 `position` 变量：

`this.node.position = cc.v2(100, 50);`

以上两种用法等价。

### 更改节点旋转

`this.node.rotation = 90;`

或

`this.node.setRotation(90);`

### 更改节点缩放

`this.node.scaleX = 2;`<br>
`this.node.scaleY = 2;`

或

`this.node.setScale(2);`<br>
`this.node.setScale(2, 2);`

以上两种方法等价。`setScale` 传入单个参数时，会同时修改 `scaleX` 和 `scaleY`。

### 更改节点尺寸

`this.node.setContentSize(100, 100);`<br>
`this.node.setContentSize(cc.v2(100, 100));`

或

`this.node.width = 100;`<br>
`this.node.height = 100;`

以上两种方式等价。

### 更改节点锚点位置

`this.node.anchorX = 1;`<br>
`this.node.anchorY = 0;`

或

`this.node.setAnchorPoint(1, 0);`

注意以上这些修改变换的方法会影响到节点上挂载的渲染组件，比如 Sprite 图片的尺寸、旋转等等。


## 颜色和不透明度

在使用 Sprite, Label 这些基本的渲染组件时，要注意修改颜色和不透明度的操作只能在节点的实例上进行，因为这些渲染组件本身并没有设置颜色和不透明度的接口。

假如我们有一个 Sprite 的实例为 `mySprite`，如果需要设置它的颜色：

`mySprite.node.color = cc.Color.RED;`

设置不透明度：

`mySprite.node.opacity = 128;`


## 常用组件接口

`cc.Component` 是所有组件的基类，任何组件都包括如下的常见接口（假设我们在该组件的脚本中，以 this 指代本组件）：

- `this.node`：该组件所属的节点实例
- `this.enabled`：是否每帧执行该组件的 `update` 方法，同时也用来控制渲染组件是否显示
- `update(dt)`：作为组件的成员方法，在组件的 `enabled` 属性为 `true` 时，其中的代码会每帧执行
- `onLoad()`：组件所在节点进行初始化时（节点添加到节点树时）执行
- `start()`：会在该组件第一次 `update` 之前执行，通常用于需要在所有组件的 `onLoad` 初始化完毕后执行的逻辑

---

更多组件成员方法请继续参考 [生命周期回调](life-cycle-callbacks.md) 文档。
