# 3D 碰撞事件

碰撞事件由碰撞器生成，分为三种 onCollisionEnter、onCollisionStay、onCollisionExit，分别表示碰撞开始，碰撞保持，碰撞结束。

监听碰撞事件，可以通过注册事件的方式来添加碰撞后的回调，以下步骤可以完成碰撞事件的监听：

1. 通过 `this.getComponent(cc.ColliderComponent)` 获取到 `ColliderComponent`
2. 通过 `ColliderComponent` 的 `on` 或者 `once` 方法注册相应事件的回调

代码示例：

```
start () {
    let collider = this.getComponent(cc.ColliderComponent);
    collider.on('onCollisionStay', this.onCollision, this);
}

onCollision (event) {
    console.log(event.type, event);
}
```

**ColliderComponent 是碰撞系统中所有碰撞组件的基类**。
