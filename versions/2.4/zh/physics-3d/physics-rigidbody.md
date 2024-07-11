# 3D 物理刚体组件

刚体是组成物理世界的基本对象，可以让一个节点受到物理影响并产生反应。该组件在使用 Builtin 物理引擎时无效。

![刚体组件](image/rigidbody-prop.png)

点击 **属性检查器** 下方的 **添加组件 -> 物理组件 -> Rigid Body 3D**，即可添加刚体组件到节点上。

## 刚体属性

| 属性             | 功能说明                             |
| --------------  | -----------                         |
| Mass            | 刚体的质量                            |
| Linear Damping  | 线性阻尼，用于减小刚体的线性速率，值越大物体移动越慢        |
| Angular Damping | 角阻尼，用于减小刚体的旋转速率，值越大刚体旋转越慢          |
| Is Kinematic    | 是否由开发者来控制刚体的位移和旋转，而不是受物理引擎的影响   |
| Use Gravity     | 如果开启，刚体会受到重力影响             |
| Fixed Rotation  | 如果开启，发生碰撞时会固定刚体不产生旋转   |
| Linear Factor   | 线性因子，可影响刚体在每个轴向的线性速度变化，值越大刚体移动越快 |
| Angular Factor  | 旋转因子，可影响刚体在每个轴向的旋转速度变化，值越大刚体旋转越快 |

刚体的 API 接口请参考 [RigidBody3D](%__APIDOC__%/zh/classes/RigidBody3D.html)。

## 刚体运动

要使刚体运动有以下几种方式：

- 通过重力

  设置 `useGravity` 属性为 `true`。

- 通过力

  根据牛顿第二定律 `F = m * a`，对刚体的某个点施加力会产生加速度，随着时间的变化就会慢慢改变物体的速度。

  ```js
  rigidBody.applyForce(cc.v3(200, 0, 0));
  ```

- 通过冲量

  根据动量守恒方程式 `F * Δt = m * Δv`，对刚体的某个点施加冲量，速度就会产生变化。

  ```js
  rigidBody.applyImpulse(cc.v3(5, 0, 0));
  ```

- 通过扭矩

  力与冲量也可以只对旋转轴产生影响，使刚体发生转动，这样的力叫做扭矩。

  ```js
  rigidBody.applyTorque(cc.v3(200, 0, 0));
  ```

- 通过改变速度

  使用 `setLinearVelocity` 接口改变线性速度。<br>
  使用 `setAngularVelocity` 接口改变旋转速度。

  ```js
  // 改变线性速度
  rigidBody.setLinearVelocity(cc.v3(5, 0, 0));

  // 改变旋转速度
  rigidBody.setAngularVelocity(cc.v3(5, 0, 0));
  ```

- 通过恒力组件

  详情请参考 [恒力组件](./physics-constant-force.md)。

## 休眠和唤醒刚体

### 休眠刚体

休眠刚体时，会将刚体所有的力和速度清空，使刚体停下来。

```js
// 休眠
if (rigidBody.isAwake) {
    rigidBody.sleep();
}
```

**注意**：目前施加力、冲量以及改变速度会重新唤醒刚体。

### 唤醒刚体

```js
// 唤醒
if (rigidBody.isSleeping) {
    rigidBody.wakeUp(); 
}
```

## 限制刚体运动

要限制刚体的运动有以下几种方式：

- 通过阻尼

  `linearDamping` 属性用于设置线性阻尼。<br>
  `angularDamping` 属性用于设置旋转阻尼。

  阻尼参数的范围在 0 到无穷之间，0 意味着无阻尼，无穷意味着满阻尼。一般情况下阻尼的值是在 0 ～ 0.1 之间。

- 通过固定旋转

  设置 `fixedRotation` 属性为 `true`。

- 通过因子

  `linearFactor` 属性用于设置线性因子。<br>
  `angularFactor` 属性用于设置旋转因子。

  因子是 `Vec3` 的类型，相应分量的数值用于缩放相应轴向的速度变化，默认值都为 1，代表缩放为 1 倍，即无缩放。

  **注意**：将因子某分量值设置为 0，可以固定某个轴向的移动或旋转，如果要完全固定旋转，请使用 `fixedRotation`。
