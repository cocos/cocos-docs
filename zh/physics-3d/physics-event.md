# 3D 物理事件

3D 物理事件分为 **触发事件** 和 **碰撞事件**，分别由 **触发器** 和 **碰撞器** 产生。

## 触发器和碰撞器

触发器是 `Is Trigger` 属性为 `true` 的碰撞组件。当发生碰撞时，触发器不会产生碰撞效果，所以触发器只用于碰撞检测。

碰撞器是 `Is Trigger` 属性为 `false` 的碰撞组件。当发生碰撞时，碰撞器会产生碰撞效果，所以碰撞器既可以进行碰撞检测，又可以产生物理效果。

触发器和碰撞器的区别如下：

- 触发器不会与其它触发器或者碰撞器做更精细的检测。
- 碰撞器与碰撞器会做更精细的检测，并且会提供因碰撞产生的一些额外的数据，如碰撞点、法线等。

## 触发事件和碰撞事件

触发事件可以由一个触发器和另一个触发器或者另一个碰撞器产生。而碰撞事件只能由两个碰撞器产生。

### 触发事件

触发事件包括以下三种：

| 事件    | 说明   |
| :----- | :----- |
| `trigger-enter` | 触发开始          |
| `trigger-stay`  | 触发保持          |
| `trigger-exit`  | 触发结束          |

#### 监听触发事件

可以通过注册事件来监听，操作步骤如下：

1. 通过 `this.getComponent(cc.Collider3D)` 获取到 `Collider3D`。
2. 再通过 `Collider3D` 的 `on` 或者 `once` 方法注册事件回调。

代码示例：

  ```js
  start () {
      let collider = this.getComponent(cc.Collider3D);
      collider.on('trigger-stay', this.onTrigger, this);
  },

  onTrigger (event) {
      console.log(event.type, event);
  }
  ```

**注意**：`Collider3D` 是物理系统中所有碰撞组件的基类。

### 碰撞事件

碰撞事件包括以下三种：

| 事件               | 说明             |
| ----------------- | ---------------- |
| `collision-enter` | 碰撞开始          |
| `collision-stay`  | 碰撞保持          |
| `collision-exit`  | 碰撞结束          |

#### 监听碰撞事件

可以通过注册事件的方式来添加碰撞后的回调，操作步骤如下：

1. 通过 `this.getComponent(cc.Collider3D)` 获取到 `Collider3D`。
2. 再通过 `Collider3D` 的 `on` 或者 `once` 方法注册相应事件的回调。

代码示例：

  ```js
  start () {
      let collider = this.getComponent(cc.Collider3D);
      collider.on('collision-stay', this.onCollision, this);
  },

  onCollision (event) {
      console.log(event.type, event);
  }
  ```
