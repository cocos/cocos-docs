# 2D 物理设置

## 开启/关闭

Cocos Creator 的 2D 物理系统默认开启且默认使用 **Box2D** 物理系统，可通过编辑器顶部菜单栏中的 **项目** -> **项目设置** -> **功能裁剪** -> **2D 物理系统** 设置关闭/开启状态，以及切换使用物理系统。

同时也支持通过代码切换 2D 物理系统的开启/关闭，示例如下：

```ts
// 为 true 表示开启，为 false 表示关闭
PhysicsSystem2D.instance.enable = true;
```

## 物理单位到世界坐标系单位的转换

一般物理模块（Box2D）都是使用 **米 - 千克 - 秒（MKS）** 物理单位制，Box2D 在这样的单位制下运算的表现是最佳的。但是在 2D 游戏运算中一般使用世界坐标系单位（简称世界单位）作为长度单位制，所以需要一个比率进行物理单位和世界单位的相互转换。

一般情况下我们将这个比率设置为 32，这个值是 **只读** 的，可以通过 `PHYSICS_2D_PTM_RATIO` 获取。通常开发者不需要关心这个值，物理系统内部会自动对物理单位和世界单位进行转换，开发者访问和设置的都是 2d 游戏开发中熟悉的世界单位。例如：开发者想设置重力加速度为 `(0, -10)` 米/秒^2，按照上面描述的转换规则， `(0, -10 * PHYSICS_2D_PTM_RATIO)` 即 `(0, -320)`世界单位/秒^2。

## 绘制物理调试信息

物理系统提供了多种绘制方法，用于调试物理的轴对齐包围盒、粗粒度、形状等信息。但物理系统默认是不绘制任何调试信息的，若需要绘制，开发者可通过自行组合调试信息来实现。示例代码如下：

```ts
PhysicsSystem2D.instance.debugDrawFlags = 
  //绘制轴对齐包围盒也就是表示显示刚体的边界盒
  EPhysics2DDrawFlags.Aabb |
  //绘制刚体的质心位置
  EPhysics2DDrawFlags.CenterOfMass |
  //绘制控制器
  EPhysics2DDrawFlags.Controller |
  //绘制关节连接信息
  EPhysics2DDrawFlags.Joint |
  //绘制碰撞体全部信息
  EPhysics2DDrawFlags.All |
  //绘制碰撞体粒子信息
  EPhysics2DDrawFlags.Particle |
  //绘制碰撞体形状
  EPhysics2DDrawFlags.Shape;
```

> **注意**：场景内必须要有一个节点下挂载着 `RigidBody2D` 和 `Collider2D`。否则进行绘制物理调试信息会报错。

如果需要 **全部绘制信息** 的话 可以设置：

```ts
PhysicsSystem2D.instance.debugDrawFlags =  EPhysics2DDrawFlags.All；
```

设置绘制标志位为 **EPhysics2DDrawFlags.None**，即可以 **关闭绘制**。

```ts
PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.None;
```

## 物理属性配置

点击 Creator 顶部菜单栏中的 **项目** -> **项目设置** -> **物理**，打开物理配置面板，该面板主要用于配置物理系统的常用属性，以便更准确地进行物理模拟。具体属性说明可参考 [物理系统配置](../editor/project/physics-configs.md)。
>**注意：** 目前通过面板配置的默认物理系统参数，2D/3D 共用一个配置。

其中物理配置面板中的 **重力矢量 X、Y、Z** 、**每步模拟消耗的固定时间** 和 **允许系统进入休眠** 属性也可以通过代码设置，详情请参考下文 **设置物理重力、设置物理步长** 部分的内容。

### 设置物理重力

重力是物理表现中非常重要的一点，大部分物理游戏都会使用到重力这一物理特性。默认的重力加速度是 `(0, -10)` 米/秒^2，按照上面描述的转换规则，即 `(0, -320)` 世界单位/秒^2。

如果希望重力加速度为 0，可以这样设置：

```ts
PhysicsSystem2D.instance.gravity = v2();
```

如果希望修改重力加速度为其他值，比如每秒加速降落 20m/s，那么可以这样设置：

```ts
PhysicsSystem2D.instance.gravity = v2(0, -20 * PHYSICS_2D_PTM_RATIO);
```

### 设置物理步长

物理系统是按照一个固定的步长来更新物理世界的，但是由于物理模块（box2d）的计时单位是秒，所以要进行转换，例如：开发者希望物理系统运行在 30 帧即一秒刷新 30 次，那么步长则设置为 `1/30`。

默认的步长是 `1/60`。但是有的游戏可能会不希望按照这么高的频率来更新物理世界，毕竟这个操作是比较消耗时间的，可以通过降低步长来达到这个效果。可以这样设置：

```ts
const system = PhysicsSystem2D.instance;

// 物理步长，默认 fixedTimeStep 是 1/60
system.fixedTimeStep = 1/30;

// 每次更新物理系统处理速度的迭代次数，默认为 10 数值越大，越能进行更好的模拟，但是性能会下降
system.velocityIterations = 8;

// 每次更新物理系统处理位置的迭代次数，默认为 10 数值越大，越能进行更好的模拟，但是性能会下降
system.positionIterations = 8;
```

>**注意**：降低物理步长和各个属性的迭代次数，都会降低物理的检测频率，所以会更有可能发生刚体穿透的情况，使用时需要考虑到这个情况。

### 物理系统休眠

如果所有物体上一帧和这一帧变化小于临界值的时候，是否允许物理系统进入休眠状态。如果允许的话可以节省运算量。这样对性能更加友好。设置示例如下：

```ts
const system = PhysicsSystem2D.instance;

system.allowSleep = true;
```
