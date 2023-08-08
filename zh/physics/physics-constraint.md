# 约束

在物理引擎中，**约束** 用于模拟物体间的连接情况，如连杆、绳子、弹簧或者布娃娃等。

约束依赖 [刚体组件](physics-rigidbody.md)，若节点无刚体组件，则添加约束时，引擎会自动添加刚体组件。

> **注意**：目前的约束仅在物理引擎选择为 Bullet、PhysX 或 Cannon.js 的情况下生效。

## 铰链约束 HingeConstraint

通过铰链约束，将连接物体的运动约束在某一个轴上，这种约束在模拟门的合页或电机转动等情形下非常有用。

![铰链约束](img/hinge-constraint.jpg)

| 属性                | 说明                                                       |
| :------------------ | :--------------------------------------------------------- |
| **AttachedBody**    | 关节所附着的刚体，即当前关节所在节点下的刚体组件           |
| **ConnectedBody**   | 获取或设置关节连接的另一个刚体，为空值时表示链接到静态刚体 |
| **EnableCollision** | 获取或设置关节连接的两刚体之间是否开启碰撞                 |
| **PivotA**          | 在自身刚体的本地空间中，约束关节的相对位置                 |
| **PivotB**          | 在连接刚体的本地空间中，约束关节的相对位置                 |
| **Axis**            | 在本地空间中约束关节的旋转轴                               |

![physics-hinge](img/physics-hinge.gif)

铰链约束接口请参考 [HingeConstraint API](__APIDOC__/zh/class/physics.HingeConstraint)。

## 点对点约束 PointToPointConstraint

点对点约束是一种简单的复合约束，可以将两个对象，或者一个对象与坐标系中一点连接。连接的对象可以在共用一个连接点的情况下，相对对方自由旋转。

![点对点约束](img/pointtopoint-constraint.jpg)

| 属性                | 说明                                                       |
| :------------------ | :--------------------------------------------------------- |
| **AttachedBody**    | 关节所附着的刚体，即当前关节所在节点下的刚体组件           |
| **ConnectedBody**   | 获取或设置关节连接的另一个刚体，为空值时表示链接到静态刚体 |
| **EnableCollision** | 获取或设置关节连接的两刚体之间是否开启碰撞                 |
| **PivotA**          | 在自身刚体的本地空间中，约束关节的相对位置                 |
| **PivotB**          | 在连接刚体的本地空间中，约束关节的相对位置                 |

![physics-p2p](img/physics-p2p.gif)

点对点约束接口请参考 [PointToPointConstraint API](__APIDOC__/zh/class/physics.PointToPointConstraint)。

## 固定约束 FixedConstraint

固定约束是一种最简单的约束，它锁定了两个刚体之间的相对位置和旋转。连接的对象不允许相对于彼此移动。

![固定约束](img/fixed-constraint.png)

| 属性                | 说明                                                       |
| :------------------ | :--------------------------------------------------------- |
| **AttachedBody**    | 关节所附着的刚体，即当前关节所在节点下的刚体组件           |
| **ConnectedBody**   | 获取或设置关节连接的另一个刚体，为空值时表示链接到静态刚体 |
| **EnableCollision** | 获取或设置关节连接的两刚体之间是否开启碰撞                 |
| **BreakForce**      | 获取或设置约束在断开之前可以施加的最大力                   |
| **BreakTorque**     | 获取或设置约束在断开之前可以施加的最大扭矩                 |

![physics-fixed](img/fixed-constraint.gif)

固定约束接口请参考 [FixedConstraint API](__APIDOC__/zh/class/physics.FixedConstraint)。

## 可配置约束 Configurable constraint

可配置约束是物理引擎中最全面的约束之一，包括各种游戏引擎中常用的约束类型。通过配置，可以对6个自由度分别进行控制，并通过设置不同方向上的约束参数实现几乎所有物理引擎中常用的特殊约束。不同自由度可以有不同的约束模式，如free、limited和locked。其中，free表示不做任何约束，limit表示限制刚体的运动范围和过程，而locked表示限制连接的刚体必须相对静止。例如，将所有6个自由度的约束模式设置为locked时，相当于使用fixed约束限制刚体。在limit模式下，可以对刚体的运动进行一定程度的限制，如限制该自由度在某个区间内运动。对于limit模式下的刚体，在运动到被限制范围的边界时，会发生回弹。此时，可以通过设置不同的回弹系数来调节回弹的力度，并通过调节软约束的参数实现约束的弹性，给运动施加一定量的阻力等。

由可配置约束连接的刚体可以通过马达驱动产生期望的相对运动。启用马达后，刚体将向指定的相对位置运动或逐渐加速到指定的相对速度并保持运动。马达有两种不同的模式，伺服模式和普通模式。在伺服模式下，驱动器将使刚体向指定的位置或角度运动，并在到达目标位置或角度后停止。在普通模式下，驱动器将使刚体逐渐加速，达到指定的线速度或角速度，然后保持该速度运动。另一个可以调节的参数是驱动器的最大驱动力，该参数决定刚体能够以怎样的速度加速趋向指定的目标位置和速度。当最大驱动力很大时，外界的干扰将很难改变刚体之间的相对运动状态。

![physics-configurable-main](img/configurable-main.png)

| 属性                      | 描述                                                       |
| :------------------------ | :--------------------------------------------------------- |
| **AttachedBody**          | 关节所附着的刚体，即当前关节所在节点下的刚体组件           |
| **ConnectedBody**         | 获取或设置关节连接的另一个刚体，为空值时表示链接到静态刚体 |
| **EnableCollision**       | 获取或设置关节连接的两刚体之间是否开启碰撞                 |
| **Axis**                  | 获取或设置约束的主轴向                                     |
| **SecondaryAxis**         | 获取或设置约束的次要轴向（与主轴正交）                     |
| **PivotA**                | 在自身刚体的本地空间中，约束关节的相对位置                 |
| **PivotB**                | 在连接刚体的本地空间中，约束关节的相对位置                 |
| **AutoPivotB**            | 从 PivotA 和两个刚体的相对位置自动推导 PivotB              |
| **BreakForce**            | 获取或设置约束断裂前可以施加的最大力                       |
| **BreakTorque**           | 获取或设置约束断裂前可以施加的最大扭矩                     |
| **LinearLimitSettings**   | 获取或设置线性限制设置                                     |
| **AngularLimitSettings**  | 获取或设置角度限制设置                                     |
| **LinearDriverSettings**  | 获取或设置线性马达设置                                     |
| **AngularDriverSettings** | 获取或设置角度马达设置                                     |

示例：当设置约束体主轴朝向为依附刚体的 y 轴，次轴为依附刚体的 x 轴时，约束体各个轴的朝向如下图所示。

| 附着刚体轴向 | 约束体线性轴向 | 约束体旋转轴轴向 |
| :-- | :-- | :-- |
| ![configurable-constraint-axis-config](img/configurable_constraint_axis_config.png) | ![constraint-coordinate](img/constraint_coordinate.png) | ![constraint-angular-coordinate](img/constraint_angular_coordinate.png) |

## 线性限制 LinearLimitSettings

![physics-configurable-linear-limit](img/configurable-linear-limit.png)

| 属性                     | 描述                      |
| :----------------------- | :------------------------ |
| **xMotion**              | 获取或设置 x 轴的约束模式 |
| **yMotion**              | 获取或设置 y 轴的约束模式 |
| **zMotion**              | 获取或设置 z 轴的约束模式 |
| **upper**                | 获取或设置线性限制的上限  |
| **lower**                | 获取或设置线性限制的下限  |
| **restitution**          | 获取或设置约束的恢复系数  |
| **enableSoftConstraint** | 获取或设置是否启用软约束  |
| **damping**              | 获取或设置约束的阻尼系数  |
| **stiffness**            | 获取或设置约束的硬度系数  |

## 角度限制 AngularLimitSettings

![physics-configurable-angular-limit](img/configurable-angular-limit.png)

| 属性                          | 描述                               |
| :-- | :-- |
| **twistMotion**               | 获取或设置扭转轴的约束模式         |
| **swingMotion1**              | 获取或设置摆动 y 轴的约束模式      |
| **swingMotion2**              | 获取或设置摆动 z 轴的约束模式      |
| **twistExtent**               | 获取或设置扭转轴的角度限制         |
| **swingExtent1**              | 获取或设置摆动 y 轴的角度限制      |
| **swingExtent2**              | 获取或设置摆动 z 轴的角度限制      |
| **twistRestitution**          | 获取或设置扭转约束的恢复系数       |
| **swingRestitution**          | 获取或设置摆动约束的恢复系数       |
| **enableSoftConstraintTwist** | 获取或设置是否启用扭转约束的软约束 |
| **twistDamping**              | 获取或设置扭转约束的阻尼系数       |
| **twistStiffness**            | 获取或设置扭转约束的刚度系数       |
| **enableSoftConstraintSwing** | 获取或设置是否启用摆动约束的软约束 |
| **swingDamping**              | 获取或设置摆动约束的阻尼系数       |
| **swingStiffness**            | 获取或设置摆动约束的硬度系数       |

## 线性马达 LinearDriverSettings

![physics-configurable-linear-driver](img/configurable-linear-driver.png)
| 属性         | 描述                        |
| :----------- | :-------------------------- |
| **xDrive**   | 获取或设置沿 x 轴的驱动模式 |
| **yDrive**   | 获取或设置沿 y 轴的驱动模式 |
| **zDrive**   | 获取或设置沿 z 轴的驱动模式 |
| **target**   | 获取或设置目标位置          |
| **velocity** | 获取或设置目标速度          |
| **force**    | 获取或设置最大驱动力        |

## 角度马达 AngularDriverSettings

![physics-configurable-angular-driver](img/configurable-angular-driver.png)
| 属性            | 描述                            |
| :-- | :-- |
| **twistDrive**  | 获取或设置沿扭转轴的驱动模式    |
| **swingDrive1** | 获取或设置沿摆动 y 轴的驱动模式 |
| **swingDrive2** | 获取或设置沿摆动 z 轴的驱动模式 |
| **target**      | 获取或设置目标角度              |
| **velocity**    | 获取或设置目标角速度            |
| **force**       | 获取或设置最大驱动力            |

有关可配置约束接口，请参阅[ConfigurableConstraint API](__APIDOC__/zh/class/physics.ConfigurableConstraint)。
