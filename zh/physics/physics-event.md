# 物理事件

Cocos Creator 3.0 的物理事件包括 **触发事件** 和 **碰撞事件**，分别由 **触发器** 和 **碰撞器** 产生。

## 触发器和碰撞器

触发器是 `Is Trigger` 属性为 `true` 的碰撞组件。当发生碰撞时，触发器不会产生碰撞效果，所以触发器只用于碰撞检测。

碰撞器是 `Is Trigger` 属性为 `false` 的碰撞组件。当发生碰撞时，碰撞器会产生碰撞效果，所以碰撞器既可以进行碰撞检测，又可以产生物理效果。

两者的区别如下：

- 触发器不会与其它触发器或者碰撞器做更精细的检测。
- 碰撞器与碰撞器会做更精细的检测，并会产生碰撞数据，如碰撞点、法线等。

## 触发事件和碰撞事件

触发事件和碰撞事件两者的区别在于：

1. 触发事件由触发器生成，碰撞事件根据碰撞数据生成。
2. 触发事件可以由触发器和另一个触发器/碰撞器产生。
3. 碰撞事件需要由两个碰撞器产生，并且至少有一个是动力学刚体。

### 触发事件

触发事件目前包括以下三种：

| 事件  | 说明 |
| :--- | :--- |
| `onTriggerEnter` | 触发开始 |
| `onTriggerStay`  | 触发保持 |
| `onTriggerExit`  | 触发结束 |

其中可产生触发事件的碰撞对为：

| 类型  | 静态刚体|运动学刚体|动力学刚体|
| :--- | :--- | :--- | :--- |
| 静态刚体 |  | ✔ | ✔ |
| 运动学刚体 | ✔ | ✔ | ✔ |
| 动力学刚体 | ✔ | ✔ | ✔ |

**注意**：前提是两者都必须带有碰撞组件，并且至少有一个是触发器类型。

#### 监听触发事件

需要通过注册事件来添加相应的回调：

1. 通过`this.getComponent(Collider)`获取到 __Collider__
2. 通过 __Collider__ 的 __on__ 或者 __once__ 方法注册相应事件的回调

> **注**：__Collider__ 是所有碰撞组件的父类。

代码示例：

```ts
public start () {
    let Collider = this.getComponent(Collider);
    Collider.on('onTriggerStay', this.onTrigger, this);
}

private onTrigger (event: ITriggerEvent) {
    console.log(event.type, event);
}
```

### 碰撞事件

碰撞事件根据碰撞数据生成，静态类型的刚体之间不会产生碰撞数据。

目前碰撞事件包括以下三种：

| 事件  | 说明 |
| :--- | :--- |
| `onCollisionEnter` | 碰撞开始 |
| `onCollisionStay`  | 碰撞保持 |
| `onCollisionExit`  | 碰撞结束 |

其中可产生碰撞事件的碰撞对为：

| 类型  | 静态刚体 | 运动学刚体 | 动力学刚体 |
| :--- | :--- | :--- | :--- |
| 静态刚体 |  | ✔ | ✔ |
| 运动学刚体 | ✔ | ✔ | ✔ |
| 动力学刚体 | ✔ | ✔ | ✔ |

**注意**：前提是两者都必须带有碰撞组件，并且都必须是碰撞器类型。

#### 监听碰撞事件

监听碰撞事件需要通过注册事件来添加相应的回调：

1. 通过 `this.getComponent(Collider)` 获取到 __Collider__
2. 通过 __Collider__ 的 __on__ 或者 __once__ 方法注册相应事件的回调

代码示例：

```ts
public start () {
    let Collider = this.getComponent(Collider);
    Collider.on('onCollisionStay', this.onCollision, this);
}

private onCollision (event: ICollisionEvent) {
    console.log(event.type, event);
}
```

**注意**：目前碰撞事件以物理元素为单位，所有该元素上的碰撞器组件都会接收到碰撞事件。
