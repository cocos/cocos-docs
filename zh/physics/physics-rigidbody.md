# 刚体组件

刚体是组成物理世界的基本对象，可以让一个节点受到物理影响并产生反应。

点击 **属性检查器** 下方的 **添加组件 -> Physics -> RigidBody**，即可添加刚体组件到节点上。

## 刚体属性

刚体组件用于控制模拟相关的部分属性：

![rigid-body](img/rigid-body.jpg)

| 属性 | 说明 |
| :---|:--- |
| **group** | 刚体分组 |
| **type**  | 刚体类型：<br>**DYNAMIC**：动力学（通过物理数值操控）<br>**STATIC**：静态<br>**KINEMATIC**：运动学（通过变换信息操控） |

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

### 通过代码获取刚体组件

```ts
import { RigidBody } from 'cc'

let rigidBody = this.node.getComponent(RigidBody);
```

## 刚体类型

目前刚体类型包括 **DYNAMIC**、**KINEMATIC** 和 **STATIC**。

- **DYNAMIC**，表示动力学刚体，能够 **受到力的作用**，请通过 **物理规律** 来运动物体，并且请保证质量大于 0；
- **KINEMATIC**，表示运动学刚体，通常用于表达电梯这类平台运动的物体，请通过 **Transfrom** 控制物体运动；
- **STATIC**，表示静态刚体，可用于描述静止的建筑物，若物体需要持续运动，应设置为 **KINEMATIC** 类型；

## 刚体质心

目前质心固定在刚体组件绑定的节点上，质心和碰撞体是相对关系。通过调整形状的偏移 **center**，可以使质心在形状上进行偏移。

![Centroid](img/center-of-mass.jpg)

> **注意**：为了使碰撞体更贴合模型，未来会增加改变质心的方法，以及动态计算质心的机制。

## 让刚体运动起来

针对不同的类型，让刚体运动的方式不同：

- 对于静态刚体，应当尽可能保持物体静止，但仍然可以通过 **Transform** 来改变物体的位置。
- 对于运动学刚体，应当通过改变 **Transform** 使其运动。

对于动力学刚体，需要改变其速度，有以下几种方式：

### 通过重力

刚体组件提供了 **useGravity** 属性，需要使用重力时候，需将 **useGravity** 属性设置为 `true`。

### 通过施加力

刚体组件提供了 `applyForce` 接口，根据牛顿第二定律，可对刚体某点上施加力来改变物体的原有状态。

```ts
import { math } from 'cc'

rigidBody.applyForce(new math.Vec3(200, 0, 0));
```

### 通过扭矩

力与冲量也可以只对旋转轴产生影响，使刚体发生转动，这样的力叫做扭矩。

刚体组件提供了 `applyTorque` 接口，通过此接口可以施加扭矩到刚体上，因为只影响旋转轴，所以不需要指定作用点。

```ts
rigidBody.applyTorque(new math.Vec3(200, 0, 0));
```

### 通过施加冲量

刚体组件提供了 `applyImpulse` 接口，施加冲量到刚体上的一个点，根据动量守恒，将立即改变刚体的线性速度。 如果冲量施加到的点不是刚体的质心，那么将产生一个扭矩并影响刚体的角速度。

```ts
rigidBody.applyImpulse(new math.Vec3(5, 0, 0));
```

### 通过改变速度

刚体组件提供了 `setLinearVelocity` 接口，可用于改变线性速度。

```ts
rigidBody.setLinearVelocity(new math.Vec3(5, 0, 0));
```

刚体组件提供了 `setAngularVelocity` 接口，可用于改变旋转速度。

```ts
rigidBody.setAngularVelocity(new math.Vec3(5, 0, 0));
```

## 限制刚体的运动

### 通过休眠

休眠刚体时，会将刚体所有的力和速度清空，使刚体停下来。

```ts
if (rigidBody.isAwake) {
    rigidBody.sleep();
}
```

唤醒刚体时，刚体的力和速度将会恢复。

```ts
if (rigidBody.isSleeping) {
    rigidBody.wakeUp();
}
```

### 通过阻尼

刚体组件提供了 **linearDamping** 线性阻尼和 **angularDamping** 旋转阻尼属性，可以通过 `linearDamping` 和 `angularDamping` 方法对其获取或设置。

阻尼参数的范围建议在 **0** 到 **1** 之间，**0** 意味着没有阻尼，**1** 意味着满阻尼。

```ts
if (rigidBody) {
    rigidBody.linearDamping = 0.5;
    let linearDamping = rigidBody.linearDamping;

    rigidBody.angularDamping = 0.5;
    let angularDamping = rigidBody.angularDamping;
}
```

> **注意**：执行部分接口，例如施加力或冲量、改变速度、分组和掩码会尝试唤醒刚体。

### 通过因子

刚体组件提供了 **linearFactor** 线性速度因子和 **angularFactor** 旋转速度因子属性，可以通过 `linearFactor` 和 `angularFactor` 方法对其获取或设置。

因子是 `Vec3` 的类型，相应分量的数值用于缩放相应轴向的速度变化，默认值都为 **1**，表示缩放为 **1** 倍，即无缩放。

```ts
if (rigidBody) {
    rigidBody.linearFactor = new math.Vec3(0, 0.5, 0);
    let linearFactor = rigidBody.linearFactor;

    rigidBody.angularFactor = new math.Vec3(0, 0.5, 0);
    let angularFactor = rigidBody.angularFactor;
}
```

> **注意**：
> - 将因子某分量值设置为 **0**，可以固定某个轴向的移动或旋转。
> - 在使用 [**cannon.js**](physics-item.md#cannon.js) 或 [**ammo.js**](physics-item.md#ammo.js) 物理引擎情况下，因子作用的物理量不同，使用 **cannon.js** 时作用于速度，使用 **ammo.js** 时作用于力。
