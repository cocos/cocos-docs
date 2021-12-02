# 2D 刚体组件

刚体是组成物理世界的基本对象，你可以将刚体想象成一个你不能看到（绘制）也不能摸到（碰撞）的带有属性的物体。

由于 Builtin 2D 物理系统只带有碰撞检测的功能，所以刚体对于 Builtin 2D 物理系统是 **不生效的**，本篇设置只对 **Box2d** 物理系统产生作用。

在 **层级管理器** 中选中节点，然后在 **属性检查器** 中点击下方的 **添加组件** -> **Physics2D** -> **RigidBody2D**，即可添加刚体组件到节点上。

![rigidBody-Inspector](image/rigidBody-Inspector.png)

| 属性                       | 功能说明                                                                                         |
| :------------------------- | :----------------------------------------------------------------------------------------------- |
| **Group**                  | 碰撞分组，用于设置是否与其他碰撞体产生碰撞效果                                                   |
| **EnabledContactListener** | 是否启用接触接听器。当 Collider 产生碰撞时，只有开启了接触接听器才会调用相应的回调函数。默认关闭 |
| **Bullet**                 | 若勾选该项，则会被认为是一个快速移动的刚体，并且禁止穿过其他快速移动的刚体，以避免出现穿透现象。该项仅对 **动态刚体** 生效           |
| **Type**                   | 刚体类型                                                |
| **AllowSleep**             | 是否允许刚体在静止时自动休眠，默认开启                                                           |
| **GravityScale**           | 缩放应用在此刚体上的重力值                                                                       |
| **LinearDamping**          | 线性阻尼，用于衰减刚体的线性速度，值越大衰减越快物体移动越慢，可用于模拟空气摩擦力等效果           |
| **AngularDamping**         | 角阻尼，用于衰减刚体的角速度，值越大衰减越快刚体旋转越慢             |
| **LinearVelocity**         | 刚体在世界坐标下的线性速度                                                                        |
| **AngularVelocity**        | 刚体的角速度                                                                               |
| **FixedRotation**          | 是否禁止此刚体进行旋转                                                                           |
| **AwakeOnLoad**            | 是否在初始化时唤醒此刚体           |

## 刚体属性

刚体组件的属性可直接在编辑器中设置，同时也额外提供了属性接口以便在代码中设置。

### 开启碰撞监听

只有开启了刚体的碰撞监听，刚体发生碰撞时才会回调到对应的碰撞组件上。

```ts
rigidbody.enabledContactListener = true;
```

### 子弹开启

高速移动的刚体在 Box2D 中被称为子弹（bullet），开发者需要根据项目的设计来决定哪些刚体是子弹，如果开发者设置刚体为子弹类型，则 Box2D 会通过连续碰撞检测（CCD）来防止一个物理步长内当两个 **高速移动** 的刚体发生碰撞的时候，可能会出现的穿透现象。通过代码开启子弹类型可以这样设置：

```ts
rigidbody.bullet = true;
```

需要注意的是应该 **尽量少** 的使用 `Bullet` 选项，因为它会增加程序处理时间。并且该项只对 **动态刚体** 生效。

### 刚体类型

Box2D 原本的刚体类型包括 **Static**、**Dynamic**、**Kinematic** 三种，Cocos Creator 多添加了一个 **Animated** 类型。

- `cc.RigidBodyType.Static`

  静态刚体，零质量，零速度，即不会受到重力或速度影响，但是可以设置他的位置来进行移动。

- `cc.RigidBodyType.Dynamic`

  动态刚体，有质量，可以设置速度，会受到重力影响。

- `cc.RigidBodyType.Kinematic`

  运动刚体，零质量，可以设置速度，不会受到重力的影响，但是可以设置速度来进行移动。

- `cc.RigidBodyType.Animated`

  动画刚体 Animated 是从 Kinematic 类型衍生出来的，一般的刚体类型修改 **旋转** 或 **位移** 属性时，都是直接设置的属性，而 Animated 会根据当前刚体的旋转或位移属性，与目标旋转或位移属性计算出所需的速度，并且赋值到对应的移动或旋转速度上。<br>
  Animated 类型主要用于防止刚体执行动画时可能出现的奇怪现象，例如穿透。
  >**注意** ：如果没有碰撞体 ，2D 刚体不能相互碰撞。

各种刚体之间的碰撞情况如下所示：

|              | 静态刚体 | 动态刚体 | 运动刚体 | 动画刚体 |
| :----------- | :------- | :------- | :------- | :------- |
| **静态刚体** | 不碰撞   | 碰撞     | 不碰撞   | 不碰撞   |
| **动态刚体** | 碰撞     | 碰撞     | 碰撞     | 碰撞     |
| **运动刚体** | 不碰撞   | 碰撞     | 不碰撞   | 不碰撞   |
| **动画刚体** | 不碰撞   | 碰撞     | 不碰撞   | 不碰撞   |

### 刚体质量

刚体的质量是通过 [碰撞组件](physics-2d-collider.md) 的 **密度** 与 **大小** 自动计算出来的，可通过 `getMass` 获取。刚体质量可用于计算物体应该受到多大的力。

```ts
// 获取刚体质量
const mass = rigidbody.getMass();
```

### 刚体休眠

当施加到某个刚体上的力量小于 [进入休眠的默认速度临界值](../editor/project/physics-configs.md) 一段时间以后，这个刚体将会进入 **睡眠状态**。也就是如果某个刚体移动的很慢或者静止的时候，物理系统将会把它标记为 **睡眠状态**，物理系统会在模拟物理运算时快速跳过这些不需要处理的刚体，这样的操作可以大大减少 CPU 的消耗。

```ts
// 设置刚体是否允许自动休眠
rigidbody.allowSleep = true;

```

### 旋转、位移与缩放

旋转、位移与缩放是游戏开发中最常用的功能，几乎每个节点都会对这些属性进行设置。而在物理系统中会自动将节点的这些属性与 Box2D 中的对应属性进行同步。

>**注意**：
>1. Box2D 物理只有旋转和位移，并没有缩放，所以如果设置节点的缩放属性时，物理系统会重新构建这个刚体依赖的全部碰撞体。一个解决办法是将渲染节点作为刚体节点的子节点，只对这个渲染节点作缩放，尽量避免直接对刚体节点进行缩放。
>2. 在物理系统（Box2D）每次迭代（物理系统是在 `postUpdate` 进行迭代的）的最后会把所有刚体信息同步到对应节点上去，而在  Creator 当中出于性能考虑，只有当开发者对刚体所在节点的相关属性进行显示时，节点的信息才会同步到刚体上，并且刚体只会监视他所在的节点，也就是说，如果修改了节点的父节点的旋转位移，是不会同步这些信息的。

物理系统（Box2D）每次迭代（物理系统是在 `postUpdate` 进行迭代的）之前，会将节点的位置信息同步给刚体，而在迭代之后的刚体会将位置信息同步到对应节点中。而在  Creator 当中出于性能考虑，只有当开发者对刚体所在节点的相关属性进行显示时，节点的信息才会同步到刚体上，并且刚体只会监视他所在的节点，也就是说，如果修改了节点的父节点的旋转位移，是不会同步这些信息的。

#### 刚体线性速度

```ts
// 获取线性速度
const velocity = rigidbody.linearVelocity;
// 设置线性速度
rigidbody.linearVelocity = velocity;
```

线性速度衰减系数，值越大物体移动越慢，可以用来模拟空气摩擦力等效果。

```ts
// 获取线性阻尼
const damping = rigidbody.linearDamping;
// 设置线性阻尼
rigidbody.linearDamping = damping;
```

>**注意**：线性阻尼的范围从 0 到无穷大， 0 表示没有阻尼，无穷大表示满阻尼。通常阻尼的值应该在 0 到 0.1 之间  当阻尼的值比较大的时候，衰减的效果会变得比较敏感。

如果要获取刚体上某个点的移动速度，例如要获取一个盒子往前飞直到碰到墙时，发生碰撞的点的速度，便可以通过 `getLinearVelocityFromWorldPoint` 获取。

传入的 `cc.Vec2` 作为第二个参数用于接收返回值，这样可以通过使用缓存对象来接收这个值，避免创建过多的对象，以提高效率。

```ts
let velocity = new Vec2();
rigidbody.getLinearVelocityFromWorldPoint(worldPoint, velocity);
```

#### 刚体旋转速度

```ts
// 获取旋转速度
const velocity = rigidbody.angularVelocity;
// 设置旋转速度
rigidbody.angularVelocity = velocity;
```

设置角阻尼，与设置线性阻尼相同。

```ts
// 获取角阻尼
const damping = rigidbody.angularDamping;
// 设置角阻尼
rigidbody.angularDamping = damping;
```

#### 固定旋转

在平台跳跃游戏中，通常都不会将主角的旋转属性也加入到物理模拟中，否则会导致主角在移动跳跃过程中东倒西歪。我们可以通过将刚体的 `fixedRotation` 属性设置为 `true`，禁止旋转。

```ts
// 是否禁止此刚体进行旋转
rigidbody.fixedRotation = true;
```

更多刚体属性接口，请参考 [RigidBody2D API](__APIDOC__/zh/classes/physics2d.rigidbody2d.html)

## 刚体方法

### 获取或转换旋转位移属性

使用这些 API 来获取世界坐标系下的旋转和位移会比通过节点来获取更方便，因为节点中还需要去运算得到结果，而使用 API 是直接得到结果的。

#### 本地坐标与世界坐标转换

```ts
// 世界坐标转换到本地坐标
let localPoint = new Vec2();
rigidbody.getLocalPoint(worldPoint, localPoint);
```

```ts
// 本地坐标转换到世界坐标
let worldPoint = new Vec2();
rigidbody.getLocalPoint(localPoint, worldPoint);
```

```ts
// 本地向量转换为世界向量
let worldVector = new Vec2();
rigidbody.getWorldVector(localVector, worldVector);
```

```ts
// 世界向量转换为本地向量
let localVector = new Vec2();
rigidbody.getLocalVector(worldVector, localVector);
```

### 获取刚体质心

当对一个刚体施加力的时候，一般会选择刚体的质心作为施加力的作用点，这样能保证力不会影响到旋转值。

```ts
// 获取本地坐标系下刚体的质心
let localCenter = new Vec2();
rigidbody.getLocalCenter(localCenter);

// 或者通过参数来接收返回值
localCenter = new Vec2();
rigidbody.getLocalCenter(localCenter);

// 获取世界坐标系下的刚体质心
let worldCenter =  new Vec2();
rigidbody.getWorldCenter(worldCenter);

// 或者通过参数来接收返回值
worldCenter = new Vec2();
rigidbody.getWorldCenter(worldCenter);
```

### 力与冲量

移动一个物体有两种方式：

1. 可以施加一个力或者冲量到这个物体上。力会随着时间慢慢修改物体的速度，而冲量会立即修改物体的速度。
2. 直接修改物体的位置，只是这看起来不像真实的物理，你应该尽量去使用力或者冲量来移动刚体，这会减少可能带来的奇怪问题。

```ts
// 施加一个力到刚体上指定的点，这个点是世界坐标系下的一个点
rigidbody.applyForce(force, point, true);

// 或者直接施加力到刚体的质心上
rigidbody.applyForceToCenter(force,true);

// 施加一个冲量到刚体上指定的点，这个点是世界坐标系下的一个点
rigidbody.applyLinearImpulse(impulse, point,true);
```

力与冲量也可以只对旋转轴产生影响，这样的力叫做扭矩。

```ts
// 施加扭矩到刚体上，因为只影响旋转轴，所以不再需要指定一个点
rigidbody.applyTorque(torque,true);

// 施加旋转轴上的冲量到刚体上
rigidbody.applyAngularImpulse(impulse,true);
```

更多刚体方法，请参考 [RigidBody2D API](__APIDOC__/zh/classes/physics2d.rigidbody2d.html)

## 参考范例

更多的使用方法，详情可参考 [physics-samples](https://github.com/cocos-creator/physics-samples/tree/v3.x/2d/box2d/assets/cases) 中的范例。
