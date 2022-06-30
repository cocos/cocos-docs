# 约束

在物理引擎中，**约束** 用于模拟物体间的连接情况，如连杆、绳子、弹簧或者布娃娃等。

约束依赖 [刚体组件](physics-rigidbody.md)，若节点无刚体组件，则添加约束时，引擎会自动添加刚体组件。

> **注意**：目前的约束仅在物理引擎选择为 Bullet、PhysX 或 Cannon.js 的情况下生效。

## 铰链约束 HingeConstraint

通过铰链约束，将连接物体的运动约束在某一个轴上，这种约束在模拟门的合页或电机转动等情形下非常有用。

![铰链约束](img/hinge-constraint.jpg)

| 属性 | 说明 |
| :---|:--- |
| **AttachedBody** | 当前关节所在节点下的刚体组件 |
| **ConnectedBody** | 获取或设置关节连接的另一个刚体，为空值时表示链接到位于世界原点的静态刚体 |
| **EnableCollision** | 获取或设置关节连接的两刚体之间是否开启碰撞 |
| **PivotA** | 在本地空间中，自身刚体相对于约束关节的位置 |
| **PivotB** | 在本地空间中，连接刚体相对于约束关节的位置 |
| **Axis** | The axis that constrains joint rotation in local space |

![physics-hinge](img/physics-hinge.gif)

铰链约束接口请参考 [HingeConstraint API](__APIDOC__/zh/#/docs/3.4/zh/physics/classes/hingeconstraint.html)。

## 点对点约束 PointToPointConstraint

点对点约束是一种简单的复合约束，可以将两个对象，或者一个对象与坐标系中一点连接。连接的对象可以在共用一个连接点的情况下，相对对方自由旋转。

![点对点约束](img/pointtopoint-constraint.jpg)

| 属性 | 说明 |
| :---|:--- |
| **AttachedBody** | 当前关节所在节点下的刚体组件 |
| **ConnectedBody** | 获取或设置关节连接的刚体，为空值时表示链接到位于世界原点的静态刚体 |
| **EnableCollision** | 获取或设置关节连接的两刚体之间是否开启碰撞 |
| **PivotA** | 在本地空间中，自身刚体相对于约束关节的位置 |
| **PivotB** | 在本地空间中，连接刚体相对于约束关节的位置 |

![physics-p2p](img/physics-p2p.gif)

点对点约束接口请参考 [PointToPointConstraint API](__APIDOC__/zh/#/docs/3.4/zh/physics/classes/pointtopointConstraint.html)。
