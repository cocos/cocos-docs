# 常用节点和组件接口

在通过 [访问节点和组件](access-node-component.md) 介绍的方法获取到节点或组件实例后，这篇文章将会介绍通过节点和组件实例可以通过哪些常用接口实现我们需要的种种效果和操作。这一篇也可以认为是 [Node](%__APIDOC__%/zh/class/Node) 和 [Component](__APIDOC__/zh/class/Component) 类的 API 阅读指南，可以配合 API 一起学习理解。

## 节点状态和层级操作

假设我们在一个组件脚本中，通过 `this.node` 访问当前脚本所在节点。

### 激活/关闭节点

节点默认是激活的，我们可以在代码中设置它的激活状态，方法是设置节点的 `active` 属性：

`this.node.active = false;`

设置 `active` 属性和在编辑器中切换节点的激活、关闭状态，效果是一样的。当一个节点是关闭状态时，它的所有组件都将被禁用。同时，它所有子节点，以及子节点上的组件也会跟着被禁用。要注意的是，子节点被禁用时，并不会改变它们的 `active` 属性，因此当父节点重新激活的时候它们就会回到原来的状态。

也就是说，`active` 表示的其实是该节点 **自身的** 激活状态，而这个节点 **当前** 是否可被激活则取决于它的父节点。并且如果它不在当前场景中，它也无法被激活。我们可以通过节点上的只读属性 `activeInHierarchy` 来判断它当前是否已经激活。

`this.node.active = true;`

若节点原先就处于 **可被激活** 状态，修改 `active` 为 true 就会立即触发激活操作：

- 在场景中重新激活该节点和节点下所有 active 为 true 的子节点
- 该节点和所有子节点上的所有组件都会被启用，它们中的 `update` 方法之后每帧会执行
- 这些组件上如果有 `onEnable` 方法，这些方法将被执行

`this.node.active = false;`

如该节点原先就已经被激活，修改 `active` 为 false 就会立即触发关闭操作：

- 在场景中隐藏该节点和节点下的所有子节点
- 该节点和所有子节点上的所有组件都将被禁用，也就是不会再执行这些组件中的 `update` 中的代码
- 这些组件上如果有 `onDisable` 方法，这些方法将被执行

### 更改节点的父节点

假设父节点为 `parentNode`，子节点为 `this.node`，您可以：

```ts
this.node.parent = parentNode;
```

或

```ts
this.node.removeFromParent(false);
parentNode.addChild(this.node);
```

这两种方法是等价的。

**注意**：
- `removeFromParent` 通常需要传入一个 `false`，否则默认会清空节点上绑定的事件和 action 等。
- 通过 [创建和销毁节点](create-destroy.md) 介绍的方法创建出新节点后，要为节点设置一个父节点才能正确完成节点的初始化。

### 索引节点的子节点

- `this.node.children`：返回节点的所有子节点数组。
- `this.node.children.length`：返回节点的子节点数量。

**注意**：以上两个 API 都只会返回节点的直接子节点，不会返回子节点的子节点。

## 更改节点的变换（位置、旋转、缩放）

### 更改节点位置

有以下两种方法：

1. 使用 `setPosition` 方法：

    - `this.node.setPosition(100, 50, 100);`
    - `this.node.setPosition(new Vec3(100, 50, 100));`

2. 设置 `position` 变量：

    `this.node.position = new Vec3(100, 50, 100);`

### 更改节点旋转

`this.node.setRotation(90, 90, 90);`

或通过欧拉角设置本地旋转：

`this.node.setRotationFromEuler(90, 90, 90);`

### 更改节点缩放

`this.node.setScale(2, 2, 2);`

## 常用组件接口

`Component` 是所有组件的基类，任何组件都包括如下的常见接口（假设我们在该组件的脚本中，以 this 指代本组件）：

- `this.node`：该组件所属的节点实例
- `this.enabled`：是否每帧执行该组件的 `update` 方法，同时也用来控制渲染组件是否显示
- `update(deltaTime: number)`：作为组件的成员方法，在组件的 `enabled` 属性为 `true` 时，其中的代码会每帧执行
- `onLoad()`：组件所在节点进行初始化时（节点添加到节点树时）执行
- `start()`：会在该组件第一次 `update` 之前执行，通常用于需要在所有组件的 `onLoad` 初始化完毕后执行的逻辑
