# 物理组件

Cocos Creator 目前为用户提供的物理组件分为以下几种：

- [碰撞组件](physics-collider.md)

    碰撞组件用于定义碰撞体形状。可在编辑器环境下查看其形状，运行时不可见。其形状可以根据需求设置，无需和对象网格完全相同。

- [刚体组件](physics-rigidbody.md)

    刚体是组成物理世界的基本对象，它可以使游戏对象的运动方式受物理控制。

- [恒力组件](physics-constantForce.md)

    恒力组件是一个工具组件，依赖于刚体，会在每帧对一个刚体施加给定的力和扭矩。

- [约束组件](physics-constraint.md)

<<<<<<< HEAD
盒碰撞器组件接口请参考 [BoxCollider API](__APIDOC__/zh/class/physics.BoxCollider)。

### 球碰撞器组件 SphereCollider

![球碰撞器组件](img/collider-sphere.jpg)

属性 | 解释（其它参考盒碰撞器）
:---|:---
**radius** | 球的半径

球碰撞器组件接口请参考 [SphereCollider API](__APIDOC__/zh/class/physics.SphereCollider)。

### 圆柱碰撞器组件 CylinderCollider

![圆柱碰撞器组件](img/collider-cylinder.jpg)

属性 | 解释（其它参考盒碰撞器）
:---|:---
**direction** | 圆柱延申方向的参考轴
**height** | 圆柱的总高度
**radius** | 圆柱两端圆面的半径

圆柱碰撞器组件接口请参考 [CylinderCollider API](__APIDOC__/zh/result?keyword=CylinderCollider)。

### 胶囊碰撞器组件 CapsuleCollider

![胶囊碰撞器组件](img/collider-capsule.jpg)

属性 | 解释（其它参考圆柱和盒碰撞器）
:---|:---
**cylinderHeight** | 胶囊中圆柱的高度
**radius** | 胶囊中球体的半径

胶囊碰撞器组件接口请参考 [CapsuleCollider API](__APIDOC__/zh/class/physics.CapsuleCollider)。

> **注意**：`cannon.js` 不支持胶囊组件，建议使用两个球和圆柱拼凑。

### 圆锥碰撞器组件 ConeCollider

![圆锥碰撞器组件](img/collider-cone.jpg)

属性 | 解释（其它参考圆柱和盒碰撞器）
:---|:---
**radius** | 圆锥中底面圆的半径
**height** | 圆锥的高度

圆锥碰撞器组件接口请参考 [ConeCollider API](__APIDOC__/zh/class/physics.ConeCollider)。

### 平面碰撞器组件 PlaneCollider

![平面碰撞器组件](img/collider-plane.jpg)

属性 | 解释（其它参考盒碰撞器）
:---|:---
**normal** | 平面的法向量
**constant** | 平面沿着法向量移动的距离

平面碰撞器组件接口请参考 [PlaneCollider API](__APIDOC__/zh/class/physics.PlaneCollider)。

### 网格碰撞器组件 MeshCollider

![网格碰撞器组件](img/collider-mesh.jpg)

属性 | 解释（其它参考盒碰撞器）
:---|:---
**mesh** | 网格碰撞器引用的网格资源，用于初始化网格碰撞体
**convex** | 是否使用网格的凸包近似，网格顶点数应尽量小于**255**（通过它可以支持任意凸类碰撞体和动力学刚体）

> **注意**：
> 1. `cannon.js` 对网格碰撞器组件支持程度很差，只允许与少数碰撞器（球、平面）产生检测。
> 2. `convex` 功能目前仅 `ammo.js` 后端支持。

网格碰撞器组件接口请参考 [MeshCollider API](__APIDOC__/zh/class/physics.MeshCollider)。

### 单纯形碰撞器组件 SimplexCollider

![单纯形碰撞器组件](img/collider-simplex.jpg)

属性 | 解释（其它参考盒碰撞器）
:---|:---
**shapeType** | 单纯形类型，包括四种：点、线、三角面、四面体
**vertex0** | 单纯形的顶点 0，点（由 0 组成）
**vertex1** | 单纯形的顶点 1，线（由 0、1 组成）
**vertex2** | 单纯形的顶点 2，三角面（以此类推）
**vertex3** | 单纯形的顶点 3，四面体

> **注**：`cannon.js` 对线和三角面的支持目前还不完善。

单纯形碰撞器组件接口请参考 [SimplexCollider API](__APIDOC__/zh/class/physics.SimplexCollider)。

## 刚体组件 RigidBody

为了更便捷的模拟物理行为，Cocos Creator 为用户提供了刚体组件，预览图如下：

![刚体组件](img/rigid-body.jpg)

属性 | 解释（上图的属性值都是默认值）
:---|:---
**group** |  分组
**type**  | 刚体类型（下方属性仅对 __DYNAMIC__ 类型的刚体有用）
**mass** |  质量，该值应大于 __0__
**allowSleep** | 是否允许休眠
**linearDamping** | 线性阻尼，用于减小物体的线性速率
**angularDamping** | 角阻尼，用于减小物体的旋转速率
**useGravity** | 是否受重力影响
**linerFactor** | 线性因数，可影响每个轴向的线性速度的变化
**angularFactor** | 旋转因数，可影响每个轴向的旋转速度的变化

刚体组件接口请参考 [RigidBody API](__APIDOC__/zh/class/physics.RigidBody)。

## 恒力组件 ConstantForce

这是一个工具组件，它依赖刚体组件，将会在每帧对一个刚体施加给定的力和扭矩。

![恒力组件](img/constant-force.jpg)

属性 | 解释
:---|:---
**force** |  在世界坐标系中对刚体施加的力
**localForce** |  在本地坐标系中对刚体施加的力
**torque** |  在世界坐标系中对刚体施加的扭矩
**localTorque** |   在本地坐标系中对刚体施加的扭矩

恒力组件接口请参考 [ConstantForce API](__APIDOC__/zh/class/physics.ConstantForce)。
=======
    约束组件依赖于刚体组件，可将某个对象的位置、方向或比例约束到其他对象。
>>>>>>> v3.4-release
