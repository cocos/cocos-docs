# 盒碰撞器组件 BoxCollider

![盒碰撞器组件](img/collider-box.jpg)

| 属性 | 说明 |
| :---|:--- |
| **attached** | 碰撞器所绑定的刚体 |
| **material** | 碰撞器所使用的物理材质，未设置时为默认值 |
| **isTrigger** | 是否为触发器，触发器不会产生物理反馈 |
| **center**  | 在本地坐标系中，形状的中心位置 |
| **size**  |  在本地坐标系中，盒的大小，即长、宽、高 |

盒碰撞器组件接口请参考 [BoxCollider API](__APIDOC__/zh/classes/physics.boxcollider.html)。

### 球碰撞器组件 SphereCollider

![球碰撞器组件](img/collider-sphere.jpg)

| 属性 | 说明 |
| :---|:--- |
| **attached** | 碰撞器所绑定的刚体 |
| **material** | 碰撞器所使用的物理材质，未设置时为默认值 |
| **isTrigger** | 是否为触发器，触发器不会产生物理反馈 |
| **center**  | 在本地坐标系中，形状的中心位置 |
| **radius** | 在本地坐标系中，球的半径 |

球碰撞器组件接口请参考 [SphereCollider API](__APIDOC__/zh/classes/physics.spherecollider.html)。

### 圆柱碰撞器组件 CylinderCollider

![圆柱碰撞器组件](img/collider-cylinder.jpg)

| 属性 | 说明 |
| :---|:--- |
| **attached** | 碰撞器所绑定的刚体 |
| **material** | 碰撞器所使用的物理材质，未设置时为默认值 |
| **isTrigger** | 是否为触发器，触发器不会产生物理反馈 |
| **center**  | 在本地坐标系中，形状的中心位置 |
| **radius** | 在本地坐标系中，圆柱体上圆面的半径 |
| **height** | 在本地坐标系中，圆柱体在相应轴向的高度 |
| **direction** | 在本地坐标系中，圆柱体的朝向 |

圆柱碰撞器组件接口请参考 [CylinderCollider API](__APIDOC__/zh/classes/physics.cylindercollider.html)。

### 胶囊碰撞器组件 CapsuleCollider

![胶囊碰撞器组件](img/collider-capsule.jpg)

| 属性 | 说明 |
| :---|:--- |
| **attached** | 碰撞器所绑定的刚体 |
| **material** | 碰撞器所使用的物理材质，未设置时为默认值 |
| **isTrigger** | 是否为触发器，触发器不会产生物理反馈 |
| **center**  | 在本地坐标系中，形状的中心位置 |
| **radius** | 在本地坐标系中，胶囊体上的球的半径 |
| **cylinderHeight** | 在本地坐标系中，胶囊体上圆柱体的高度 |
| **direction** | 在本地坐标系中，胶囊体的朝向 |

胶囊碰撞器组件接口请参考 [CapsuleCollider API](__APIDOC__/zh/classes/physics.capsulecollider.html)。

> **注意**：`cannon.js` 不支持胶囊组件，建议使用两个球体和圆柱拼凑。

### 圆锥碰撞器组件 ConeCollider

![圆锥碰撞器组件](img/collider-cone.jpg)

| 属性 | 说明 |
| :---|:--- |
| **attached** | 碰撞器所绑定的刚体 |
| **material** | 碰撞器所使用的物理材质，未设置时为默认值 |
| **isTrigger** | 是否为触发器，触发器不会产生物理反馈 |
| **center**  | 在本地坐标系中，形状的中心位置 |
| **height** | 在本地坐标系中，圆锥体在相应轴向的高度 |
| **direction** | 在本地坐标系中，圆锥体的朝向 |

圆锥碰撞器组件接口请参考 [ConeCollider API](__APIDOC__/zh/classes/physics.conecollider.html)。

### 平面碰撞器组件 PlaneCollider

![平面碰撞器组件](img/collider-plane.jpg)

| 属性 | 说明 |
| :---|:--- |
| **attached** | 碰撞器所绑定的刚体 |
| **material** | 碰撞器所使用的物理材质，未设置时为默认值 |
| **isTrigger** | 是否为触发器，触发器不会产生物理反馈 |
| **center**  | 在本地坐标系中，形状的中心位置 |
| **normal** | 在本地坐标系中，平面的法线 |
| **constant** | 在本地坐标系中，平面从原点开始沿着法线运动的距离 |

平面碰撞器组件接口请参考 [PlaneCollider API](__APIDOC__/zh/classes/physics.planecollider.html)。

### 网格碰撞器组件 MeshCollider

![网格碰撞器组件](img/collider-mesh.jpg)

| 属性 | 说明 |
| :---|:--- |
| **attached** | 碰撞器所绑定的刚体 |
| **material** | 碰撞器所使用的物理材质，未设置时为默认值 |
| **isTrigger** | 是否为触发器，触发器不会产生物理反馈 |
| **center**  | 在本地坐标系中，形状的中心位置 |
| **mesh** | 网格碰撞器所使用的网格资源，用于初始化网格碰撞体 |
| **convex** | 是否使用网格的凸包近似代替，网格顶点数应小于 **255**，开启后可以支持动力学 |

> **注意**：
> 1. `cannon.js` 对网格碰撞器组件支持程度较差，只允许与少数碰撞器（球、平面）产生检测。
> 2. `convex` 功能目前仅 `ammo.js` 后端支持。

网格碰撞器组件接口请参考 [MeshCollider API](__APIDOC__/zh/classes/physics.meshcollider.html)。

### 单纯形碰撞器组件 SimplexCollider

![单纯形碰撞器组件](img/collider-simplex.jpg)

| 属性 | 说明 |
| :---|:--- |
| **attached** | 碰撞器所绑定的刚体 |
| **material** | 碰撞器所使用的物理材质，未设置时为默认值 |
| **isTrigger** | 是否为触发器，触发器不会产生物理反馈 |
| **center**  | 在本地坐标系中，形状的中心位置 |
| **shapeType** | 单纯形类型，包括四种：点、线、三角面、四面体 |
| **vertex0** | 单纯形的顶点 0，点（由 0 组成） |
| **vertex1** | 单纯形的顶点 1，线（由 0、1 组成） |
| **vertex2** | 单纯形的顶点 2，三角面（以此类推） |
| **vertex3** | 单纯形的顶点 3，四面体 |

> **注意**：`cannon.js` 对线和三角面的支持目前还不完善。

单纯形碰撞器组件接口请参考 [SimplexCollider API](__APIDOC__/zh/classes/physics.simplexcollider.html)。

### 地形碰撞器组件 TerrainCollider

![地形碰撞器组件](img/collider-terrain.jpg)

| 属性 | 说明 |
| :---|:--- |
| **attached** | 碰撞器所绑定的刚体 |
| **material** | 碰撞器所使用的物理材质，未设置时为默认值 |
| **isTrigger** | 是否为触发器，触发器不会产生物理反馈 |
| **terrain** | 获取或设置此碰撞体引用的网格资源 |

地形碰撞器组件接口请参考 [TerrainCollider API](__APIDOC__/zh/classes/physics.terraincollider.html)。

## 刚体组件 RigidBody

更详细的说明，可参考 [刚体组件](physics-rigidbody.md)。

为了更便捷的模拟物理行为，Cocos Creator 为用户提供了刚体组件，预览图如下：

![刚体组件](img/rigid-body.jpg)

| 属性 | 说明 |
| :---|:--- |
| **group** | 刚体分组 |
| **type**  | 刚体类型：**DYNAMIC** 为动力学（通过物理数值操控），**STATIC** 为静态，**KINEMATIC** 为运动学（通过变换信息操控） |

以下属性仅在 **type** 设为 **DYNAMIC** 时生效：

| 属性 | 说明 |
| :---|:--- |
| **mass** |  刚体质量，该值需大于 **0** |
| **allowSleep** | 是否允许自动休眠 |
| **linearDamping** | 线性阻尼，用于衰减线性速度，值越大，衰减越快 |
| **angularDamping** | 角阻尼，用于衰减角速度，值越大，衰减越快 |
| **useGravity** | 是否使用重力 |
| **linerFactor** | 线性因子，用于缩放每个轴方向上的物理数值（速度和力） |
| **angularFactor** | 角因子，用于缩放每个轴方向上的物理数值（速度和力） |

刚体组件接口请参考 [RigidBody API](__APIDOC__/zh/classes/physics.rigidbody.html)。

## 恒力组件 ConstantForce

恒力组件是一个工具组件，依赖于刚体组件，将会在每帧对一个刚体施加给定的力和扭矩。

![恒力组件](img/constant-force.jpg)

| 属性 | 说明 |
| :---|:--- |
| **force** | 在世界坐标系中，对刚体施加的力 |
| **localForce** | 在本地坐标系中，对刚体施加的力 |
| **torque** | 在世界坐标系中，对刚体施加的扭转力 |
| **localTorque** | 在本地坐标系中，对刚体施加的扭转力 |

恒力组件接口请参考 [ConstantForce API](__APIDOC__/zh/classes/physics.constantforce.html)。

## 约束组件 Constraint

约束组件依赖于刚体组件，可将某个对象的位置、方向或比例约束到其他对象。

### 铰链约束 HingeConstraint

通过铰链约束，可以使两个对象间像通过铰链固定一样，绕同一个转动轴旋转。

![铰链约束](img/hinge-constraint.jpg)

| 属性 | 说明 |
| :---|:--- |
| **attachedBody** | 碰撞器所附加的刚体 |
| **connectedBody** | 获取或设置关节连接的刚体，为空时表示链接到位于世界原点的静态刚体 |
| **enableCollision** | 获取或设置关节连接的两刚体之间是否开启碰撞 |
| **pivotA** | 在本地空间中，自身刚体相对于约束关节的位置 |
| **pivotB** | 在本地空间中，连接刚体相对于约束关节的位置 |
| **axis** | 在本地空间中，约束关节旋转的方向 |

铰链约束接口请参考 [HingeConstraint API](__APIDOC__/zh/classes/physics.hingeconstraint.html)。

### 点对点约束 PointToPointConstraint

点对点约束是一种简单的复合约束，可以将两个对象，或者一个对象与坐标系中一点连接。连接的对象可以在共用一个连接点的情况下，相对对方自由旋转。

![点对点约束](img/pointtopoint-constraint.jpg)

| 属性 | 说明 |
| :---|:--- |
| **attachedBody** | 碰撞器所附加的刚体 |
| **connectedBody** | 获取或设置关节连接的刚体，为空时表示链接到位于世界原点的静态刚体 |
| **enableCollision** | 获取或设置关节连接的两刚体之间是否开启碰撞 |
| **pivotA** | 在本地空间中，自身刚体相对于约束关节的位置 |
| **pivotB** | 在本地空间中，连接刚体相对于约束关节的位置 |

点对点约束接口请参考 [PointToPointConstraint API](__APIDOC__/zh/classes/physics.hingeconstraint.html)。