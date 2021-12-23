# 触发器与碰撞器

碰撞组件属性 **IsTrigger** 决定了组件为触发器还是碰撞器。将 **IsTrigger** 设置为 `true` 时，组件为触发器。触发器只用于碰撞检测和触发事件，会被物理引擎忽略。默认设置 `false`，组件为碰撞器，可以结合[刚体](physics-rigidbody.md)产生碰撞效果。

两者的区别如下：

- 触发器不会与其它触发器或者碰撞器做更精细的检测。
- 碰撞器与碰撞器会做更精细的检测，并会产生碰撞数据，如碰撞点、法线等。

## 触发事件

触发事件目前包括以下三种：

| 事件  | 说明 |
| :--- | :--- |
| `onTriggerEnter` | 触发开始 |
| `onTriggerStay`  | 触发保持 |
| `onTriggerExit`  | 触发结束 |

其中可产生触发事件的碰撞对为：

| 类型  | 静态刚体 | 运动学刚体 | 动力学刚体 |
| :--- | :--- | :--- | :--- |
| 静态刚体 |  | ✔ | ✔ |
| 运动学刚体 | ✔ | ✔ | ✔ |
| 动力学刚体 | ✔ | ✔ | ✔ |

**注意**：接收到触发事件的前提是两者都必须带有碰撞组件，并且至少有一个是触发器类型。当使用物理引擎为非 builtin 物理引擎时，还需要确保至少有一个物体带有的是非静态刚体（只有碰撞组件没有刚体组件的对象，视为持有静态刚体的对象），而 builtin 物理引擎则没有这个限制。

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

**注意**：接收到碰撞事件的前提是两者都必须带有碰撞组件、至少有一个是非静态刚体并且使用的是非 builtin 的物理引擎。

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

**注意**：目前碰撞事件以物理元素为单位，所有该元素上的碰撞器组件都会接收到碰撞事件。

## 触发事件和碰撞事件区别

- 触发事件由触发器生成，碰撞事件根据碰撞数据生成。
- 触发事件可以由触发器和另一个触发器/碰撞器产生。
- 碰撞事件需要由两个碰撞器产生，并且至少有一个是动力学刚体。
