# 约束组件

约束组件依赖于[刚体](physics-rigidbody.md)组件，可将某个对象的位置、方向或比例约束到其他对象。

## 铰链约束 HingeConstraint

通过铰链约束，可以使两个对象间像通过铰链固定一样，绕同一个转动轴旋转。

![铰链约束](img/hinge-constraint.jpg)

| 属性 | 说明 |
| :---|:--- |
| **AttachedBody** | 碰撞器所绑定的刚体 |
| **ConnectedBody** | 获取或设置关节连接的刚体，为空值时表示链接到位于世界原点的静态刚体 |
| **EnableCollision** | 获取或设置关节连接的两刚体之间是否开启碰撞 |
| **PivotA** | 在本地空间中，自身刚体相对于约束关节的位置 |
| **PivotB** | 在本地空间中，连接刚体相对于约束关节的位置 |
| **Axis** | 在本地空间中，约束关节旋转的方向 |

![physics-hinge](img/physics-hinge.gif)

铰链约束接口请参考 [HingeConstraint API](__APIDOC__/zh/classes/physics.hingeconstraint.html)。

## 点对点约束 PointToPointConstraint

点对点约束是一种简单的复合约束，可以将两个对象，或者一个对象与坐标系中一点连接。连接的对象可以在共用一个连接点的情况下，相对对方自由旋转。

![点对点约束](img/pointtopoint-constraint.jpg)

| 属性 | 说明 |
| :---|:--- |
| **AttachedBody** | 碰撞器所绑定的刚体 |
| **ConnectedBody** | 获取或设置关节连接的刚体，为空值时表示链接到位于世界原点的静态刚体 |
| **EnableCollision** | 获取或设置关节连接的两刚体之间是否开启碰撞 |
| **PivotA** | 在本地空间中，自身刚体相对于约束关节的位置 |
| **PivotB** | 在本地空间中，连接刚体相对于约束关节的位置 |

![physics-p2p](img/physics-p2p.gif)

点对点约束接口请参考 [PointToPointConstraint API](__APIDOC__/zh/classes/physics.hingeconstraint.html)。
