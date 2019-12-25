# 3D 物理事件

物理事件分为触发事件和碰撞事件，分别由触发器和碰撞器产生。

## 触发器和碰撞器

当碰撞时，触发器不会产生物理行为，而碰撞器会产生物理行为，所以触发器只进行碰撞检测，而碰撞器是既进行碰撞检测，又进行物理模拟。

两者的区别

- 触发器不会与其它触发器或者碰撞器做更精细的检测。
- 碰撞器与碰撞器会做更精细的检测，并会提供因碰撞产生的一些额外的数据，如碰撞点、法线等。

**注：设置一个 Collider3D 组件为触发器，可以通过设置 Collider3D 组件的 isTrigger 属性**。

## 触发事件和碰撞事件

### 触发事件

触发事件由触发器生成，分为三种 onTriggerEnter、onTriggerStay、onTriggerExit，分别表示触发开始，触发保持，触发结束。

通过注册事件监听触发事件：

1. 通过 `this.getComponent(cc.Collider3D)` 获取到 `Collider3D`
2. 通过 `Collider3D` 的 `on` 或者 `once` 方法注册事件回调

代码示例：

```
start () {
    let collider = this.getComponent(cc.Collider3D);
    collider.on('onTriggerStay', this.onTrigger, this);
}

onTrigger (event) {
    console.log(event.type, event);
}
```

### 碰撞事件

碰撞事件由碰撞器生成，分为三种 onCollisionEnter、onCollisionStay、onCollisionExit，分别表示碰撞开始，碰撞保持，碰撞结束。

监听碰撞事件，可以通过注册事件的方式来添加碰撞后的回调，以下步骤可以完成碰撞事件的监听：

1. 通过 `this.getComponent(cc.Collider3D)` 获取到 `Collider3D`
2. 通过 `Collider3D` 的 `on` 或者 `once` 方法注册相应事件的回调

代码示例：

```
start () {
    let collider = this.getComponent(cc.Collider3D);
    collider.on('onCollisionStay', this.onCollision, this);
}

onCollision (event) {
    console.log(event.type, event);
}
```

**Collider3D 是物理系统中所有碰撞组件的基类**。

两者的区别

- 触发事件由触发器生成，碰撞事件由碰撞器生成。
- 触发事件可以由一个触发器和另一个触发器或者另一个碰撞器产生，而碰撞事件需要由两个碰撞器产生。
