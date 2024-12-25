# 2D 物理系统

物理系统隐藏了大部分物理模块（Box2D 和 Builtin 模块）实现细节（比如创建刚体，同步刚体信息到节点中等）。

可以通过物理系统访问一些物理模块常用的功能，比如点击测试、射线测试、设置测试信息等。

## 物理系统相关设置

### 开启物理系统

物理系统默认是开启的，代码如下：

```ts
PhysicsSystem2D.instance.enable = true;
```

### 绘制物理调试信息

物理系统默认是不绘制任何调试信息的，如果需要绘制调试信息，请使用 **debugDrawFlags**。

物理系统提供了各种各样的调试信息，可以通过组合这些信息来绘制相关的内容。

```ts
PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.Aabb |
    EPhysics2DDrawFlags.Pair |
    EPhysics2DDrawFlags.CenterOfMass |
    EPhysics2DDrawFlags.Joint |
    EPhysics2DDrawFlags.Shape;
```

设置绘制标志位为 **EPhysics2DDrawFlags.None**，即可以关闭绘制。

```ts
PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.None;
```

### 物理单位到世界坐标系单位的转换

一般物理模块（Box2D）都是使用 **米 - 千克 - 秒（MKS）** 单位制，Box2D 在这样的单位制下运算的表现是最佳的。但是我们在 2D 游戏运算中一般使用 **世界坐标系中的单位**（简称世界单位）来作为长度单位制，所以我们需要一个比率来进行物理单位到世界单位上的相互转换。

一般情况下我们把这个比率设置为 32，这个值可以通过 `PHYSICS_2D_PTM_RATIO` 获取，并且这个值是只读的。通常用户是不需要关心这个值的，物理系统内部会自动对物理单位与世界单位进行转换，用户访问和设置的都是进行 2d 游戏开发中所熟悉的世界单位。

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

物理系统是按照一个固定的步长来更新物理世界的，默认的步长是 `1/60`。但是有的游戏可能会不希望按照这么高的频率来更新物理世界，毕竟这个操作是比较消耗时间的，可以通过降低步长来达到这个效果。

```ts
const system = PhysicsSystem2D.instance;

// 物理步长，默认 fixedTimeStep 是 1/60
system.fixedTimeStep = 1/30;

// 每次更新物理系统处理速度的迭代次数，默认为 10
system.velocityIterations = 8;

// 每次更新物理系统处理位置的迭代次数，默认为 10
system.positionIterations = 8;
```

**注意**：降低物理步长和各个属性的迭代次数，都会降低物理的检测频率，所以会更有可能发生刚体穿透的情况，使用时需要考虑到这个情况。

## 查询物体

通常你可能想知道在给定的场景中都有哪些实体。例如，一个炸弹爆炸了，在范围内的物体都会受到伤害，或者在策略类游戏中，可能会希望让用户选择一个范围内的单位进行拖动。

物理系统提供了几个方法方便用户高效快速地查找某个区域中有哪些物体，每种方法通过不同的方式来检测物体，基本满足游戏所需。

### 点测试

点测试将测试是否有碰撞体会包含一个世界坐标系下的点，如果测试成功，则会返回一个包含这个点的碰撞体。注意，如果有多个碰撞体同时满足条件，下面的接口只会返回一个随机的结果。

```ts
const collider = PhysicsSystem2D.instance.testPoint(point);
```

### 矩形测试

矩形测试将测试世界坐标系下指定的一个矩形，如果一个碰撞体的包围盒与这个矩形有重叠部分，则这个碰撞体会被添加到返回列表中。

```ts
const colliderList = PhysicsSystem2D.instance.testAABB(rect);
```

### 射线测试

Box2D 物理模块（Builtin 模块没有）提供了射线检测来检测给定的线段穿过哪些碰撞体，我们还可以获取到碰撞体在线段穿过碰撞体的那个点的法线向量和其他一些有用的信息。

```ts
const results = PhysicsSystem2D.instance.rayCast(p1, p2, type, mask);

for (let i = 0; i < results.length; i++) {
    const result = results[i];
    const collider = result.collider;
    const point = result.point;
    const normal = result.normal;
    const fraction = result.fraction;
}
```

射线检测的第三个参数指定检测的类型，射线检测支持四种类型。这是因为 Box2D 的射线检测不是从射线起始点最近的物体开始检测的，所以检测结果不能保证结果是按照物体距离射线起始点远近来排序的。Cocos Creator 物理系统将根据射线检测传入的检测类型来决定是否对 Box2D 检测结果进行排序，这个类型会影响到最后返回给用户的结果。

- ERaycast2DType.Any

  检测射线路径上任意的碰撞体，一旦检测到任何碰撞体，将立刻结束检测其他的碰撞体，最快。

- ERaycast2DType.Closest

  检测射线路径上最近的碰撞体，这是射线检测的默认值，稍慢。

- ERaycast2DType.All

  检测射线路径上的所有碰撞体，检测到的结果顺序不是固定的。在这种检测类型下，一个碰撞体可能会返回多个结果，这是因为 Box2D 是通过检测夹具（fixture）来进行物体检测的，而一个碰撞体中可能由多个夹具（fixture）组成的，慢。

- ERaycast2DType.AllClosest

  检测射线路径上所有碰撞体，但是会对返回值进行删选，只返回每一个碰撞体距离射线起始点最近的那个点的相关信息，最慢。

#### 射线检测的结果

射线检测的结果包含了许多有用的信息，你可以根据实际情况来选择如何使用这些信息。

- collider

  指定射线穿过的是哪一个碰撞体。

- point

  指定射线与穿过的碰撞体在哪一点相交。

- normal

  指定碰撞体在相交点的表面的法线向量。

- fraction

  指定相交点在射线上的分数。

可以通过下面这张图更好的理解射线检测的结果。

![raycasting-output](image/raycasting-output.png)
