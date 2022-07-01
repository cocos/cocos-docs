# 物理事件

## 触发器与碰撞器

![img](img/isTrigger.jpg)

碰撞组件属性 **IsTrigger** 决定了组件为触发器还是碰撞器。将 **IsTrigger** 设置为 `true` 时，组件为触发器。触发器只用于碰撞检测和触发事件，会被物理引擎忽略。默认设置 `false`，组件为碰撞器，可以结合[刚体](physics-rigidbody.md)产生碰撞效果。

两者的区别如下：

- 触发器不会与其它触发器或者碰撞器做更精细的检测。
- 碰撞器与碰撞器会做更精细的检测，并会产生碰撞数据，如碰撞点、法线等。

## 触发事件

触发事件目前包括以下三种：

| 事件             | 说明     |
| :--------------- | :------- |
| `onTriggerEnter` | 触发开始时触发该事件 |
| `onTriggerStay`  | 触发保持时会频发触发该事件 |
| `onTriggerExit`  | 触发结束时触发该事件 |

其中可产生触发事件的碰撞对为：

| 类型       | 静态刚体 | 运动学刚体 | 动力学刚体 |
| :--------- | :------- | :--------- | :--------- |
| 静态刚体   |          | ✔          | ✔          |
| 运动学刚体 | ✔        | ✔          | ✔          |
| 动力学刚体 | ✔        | ✔          | ✔          |

> **注意**：接收到触发事件的前提是两者都必须带有碰撞组件，并且至少有一个是触发器类型。当使用物理引擎为非 builtin 物理引擎时，还需要确保至少有一个物体带有的是非静态刚体（只有碰撞组件没有刚体组件的对象，视为持有静态刚体的对象），而 builtin 物理引擎则没有这个限制。

### 监听触发事件

```ts
// 此处的节点添加了 BoxCollider 组件
import { BoxCollider, ITriggerEvent } from 'cc'

public start () {
    let collider = this.node.getComponent(BoxCollider);
    collider.on('onTriggerStay', this.onTriggerStay, this);
}

private onTriggerStay (event: ITriggerEvent) {
    console.log(event.type, event);
}
```

## 碰撞事件

碰撞事件根据碰撞数据生成，静态类型的刚体之间不会产生碰撞数据。

目前碰撞事件包括以下三种：

| 事件               | 说明     |
| :----------------- | :------- |
| `onCollisionEnter` | 碰撞开始时触发 |
| `onCollisionStay`  | 碰撞保持时不断的触发 |
| `onCollisionExit`  | 碰撞结束时触发 |

其中可产生碰撞事件的碰撞对为：

| 类型       | 静态刚体 | 运动学刚体 | 动力学刚体 |
| :--------- | :------- | :--------- | :--------- |
| 静态刚体   |          | ✔          | ✔          |
| 运动学刚体 | ✔        | ✔          | ✔          |
| 动力学刚体 | ✔        | ✔          | ✔          |

> **注意**：接收到碰撞事件的前提是两者都必须带有碰撞组件、至少有一个是非静态刚体并且使用的是非 builtin 的物理引擎。

### 监听碰撞事件

```ts
import { Collider, ICollisionEvent } from 'cc'

public start () {
    let collider = this.node.getComponent(Collider);
    // 监听触发事件
    collider.on('onCollisionStay', this.onCollision, this);
}

private onCollision (event: ICollisionEvent) {
    console.log(event.type, event);
}
```

> **注意**：目前碰撞事件以物理元素为单位，所有该元素上的碰撞器组件都会接收到碰撞事件。

## 触发事件和碰撞事件区别

- 触发事件由触发器生成，碰撞事件根据碰撞数据生成。
- 触发事件可以由触发器和另一个触发器/碰撞器产生。
- 碰撞事件需要由两个碰撞器产生，并且至少有一个是动力学刚体。

## 连续碰撞检测

相对于连续的真实世界，物理引擎的模拟实际上是离散的，这意味着物理引擎需要经过 1/60 秒或者其他定义的时间才可以采样一次。因此对于速度较快的物体，物理引擎可能无法正确检测到其碰撞结果，若要解决这种现象，可开启连续物理检测（CCD）来解决。

在引擎中开启连续碰撞检测的方法如下：

```ts
const rigidBody = this.getComponent(RigidBody);
rigidBody.useCCD = true;
```

参考 [连续碰撞检测](physics-ccd.md) 以获取更详细的描述。

## 触发规则

碰撞事件的产生会根据刚体、碰撞体或触发器的类型不同而不同，这里将结果整理如下所示：

> **注意**：此处标记的刚体都携带有碰撞体且在碰撞矩阵内配置为允许碰撞。

| -          | 静态刚体 | 运动学刚体 | 动力学刚体 | 碰撞体 | 触发器 |
| :--------- | :------- | :--------- | :--------- | :----- | :----- |
| 静态刚体   |          | ✔          | ✔          |        |        |
| 运动学刚体 | ✔        | ✔          | ✔          | ✔      | ✔      |
| 动力学刚体 | ✔        | ✔          | ✔          | ✔      | ✔      |
| 碰撞体     |          | ✔          | ✔          |        |        |
| 触发器     |          | ✔          | ✔          |        |        |
