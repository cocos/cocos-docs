# 刚体组件

刚体是组成物理世界的基本对象，可以让一个节点受到物理影响并产生反应。

刚体组件用于控制模拟相关的部分属性：

![刚体](img/rigidbody-prop.png)

点击 **属性检查器** 下方的 **添加组件 -> Physics -> RigidBody**，即可添加刚体组件到节点上。

## 刚体属性

| 属性             | 功能说明                             |
| :-------------- | :----------                         |
| Type            | 刚体类型，目前包括 **DYNAMIC**、**STATIC** 和 **KINEMATIC**，详情可查看下方介绍。
| Mass            | 刚体的质量                            |
| AllowSleep      | 是否允许刚体进入休眠状态   |
| Linear Damping  | 线性阻尼，用于减小刚体的线性速率，值越大物体移动越慢        |
| Angular Damping | 角阻尼，用于减小刚体的旋转速率，值越大刚体旋转越慢          |
| Use Gravity     | 如果开启，刚体会受到重力影响             |
| Linear Factor   | 线性因子，可影响刚体在每个轴向的线性速度变化，值越大刚体移动越快 |
| Angular Factor  | 旋转因子，可影响刚体在每个轴向的旋转速度变化，值越大刚体旋转越快 |

刚体的 API 接口请参考 [Class RigidBody](__APIDOC__/zh/classes/physics.rigidbody.html)。

### 获取刚体组件

```ts
// TypeScript
const rigidBody = this.getComponent(RigidBody);
```

## 刚体类型

目前刚体类型包括 **STATIC**、**DYNAMIC** 和 **KINEMATIC** 三种。

- **STATIC**，表示静态刚体，可用于描述静止的建筑物，若物体需要持续运动，应设置为 **KINEMATIC** 类型；
- **DYNAMIC**，表示动力学刚体，能够**受到力的作用**，请通过**物理规律**来运动物体，并且请保证质量大于 0；
- **KINEMATIC**，表示运动学刚体，通常用于表达电梯这类平台运动的物体，请通过 **Transfrom** 控制物体运动；

## 刚体质心

目前质心固定在刚体组件绑定的节点上，质心和碰撞体是相对关系。通过调整形状的偏移 __center__，可以使质心在形状上进行偏移。

![质心](img/center-of-mass.jpg)

> **注**：为了使碰撞体更贴合模型，未来会增加改变质心的方法，以及动态计算质心的机制。

## 休眠和唤醒

### 休眠刚体

休眠刚体时，会将刚体所有的力和速度清空，使刚体停下来。

```ts
// 休眠
if (rigidBody.isAwake) {
    rigidBody.sleep();
}
```

### 唤醒刚体

```ts
// 唤醒
if (rigidBody.isSleeping) {
    rigidBody.wakeUp();
}
```

## 让刚体运动起来

针对不同的类型，让刚体运动的方式不同：

对于静态刚体，应当尽可能保持物体静止，但仍然可以通过 __Transform__ 来改变物体的位置。
对于运动学刚体，应当通过改变 __Transform__ 使其运动。
对于动力学刚体，需要改变其速度，有以下几种方式：

### 通过重力

刚体组件提供了 `useGravity` 属性，将 `useGravity` 属性设置为 `true`。

### 通过施加力

刚体组件提供了 `applyForce` 接口，签名为：

`applyForce (force: Vec3, relativePoint?: Vec3)`

根据牛顿第二定律，可对刚体某点上施加力来改变物体的原有状态。

```ts
rigidBody.applyForce(new Vec3(200, 0, 0));
```

### 通过扭矩

力与冲量也可以只对旋转轴产生影响，使刚体发生转动，这样的力叫做扭矩。

刚体组件提供了 `applyTorque` 接口，签名为：

`applyTorque (torque: Vec3)`

通过此接口可以施加扭矩到刚体上，因为只影响旋转轴，所以不需要指定作用点。

### 通过施加冲量

刚体组件提供了 `applyImpulse` 接口，签名为：

`applyImpulse (impulse: Vec3, relativePoint?: Vec3)`

根据动量守恒，对刚体某点施加冲量，由于物体质量恒定，从而使刚体改变原有状态。

```ts
rigidBody.applyImpulse(new Vec3(5, 0, 0));
```

### 通过改变速度

- 线性速度

  刚体组件提供了 `setLinearVelocity` 接口，可用于改变线性速度，签名为：
  
  `setLinearVelocity (value: Vec3)`
  
  示例：

  ```ts
  rigidBody.setLinearVelocity(new Vec3(5, 0, 0));
  ```

  刚体组件提供了 `setAngularVelocity` 接口，可用于改变旋转速度，签名为：
  
  `setAngularVelocity (value: Vec3)`

  示例：

  ```ts
  rigidBody.setAngularVelocity(new Vec3(5, 0, 0));
  ```

## 限制刚体的运动

### 通过休眠

休眠刚体时，会将刚体所有的力和速度清空，使刚体停下来。

### 通过阻尼

刚体组件提供了 __linearDamping__ 和 __angularDamping__ 属性：

- `linearDamping` 属性用于设置线性阻尼。

- `angularDamping` 属性用于设置旋转阻尼。

阻尼参数的范围建议在 __0__ 到 __1__ 之间，__0__ 意味着没有阻尼，__1__ 意味着满阻尼。

> **注**：执行部分接口，例如施加力或冲量、改变速度、分组和掩码会尝试唤醒刚体。

### 通过因子

刚体组件提供了 `linearFactor` 和 `angularFactor` 属性:

- `linearFactor` 属性用于设置线性因子。
- `angularFactor` 属性用于设置旋转因子。

因子是 `Vec3` 的类型，相应分量的数值用于缩放相应轴向的速度变化，默认值都为 **1**，表示缩放为 **1** 倍，即无缩放。

**注意**：

1. 将因子某分量值设置为`0`，可以固定某个轴向的移动或旋转。
2. 在 __cannon__ 和 __ammo__ 后端中，因子作用的物理量不同，__cannon__ 中作用于速度，__ammo__ 中作用于力。
