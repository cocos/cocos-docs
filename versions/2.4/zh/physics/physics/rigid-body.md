# 刚体

刚体是组成物理世界的基本对象，你可以将刚体想象成一个你不能看到（绘制）也不能摸到（碰撞）的带有属性的物体。

## 刚体属性

### 质量

刚体的质量是通过 [碰撞组件](collider-component.md) 的 **密度** 与 **大小** 自动计算得到的。当你需要计算物体应该受到多大的力时可能需要使用到这个属性。

```javascript
var mass = rigidbody.getMass();
```

### 移动速度

```javascript
// 获取移动速度
var velocity = rigidbody.linearVelocity;
// 设置移动速度
rigidbody.linearVelocity = velocity;
```

移动速度衰减系数，可以用来模拟空气摩擦力等效果，它会使现有速度越来越慢。

```javascript
// 获取移动速度衰减系数
var damping = rigidbody.linearDamping;
// 设置移动速度衰减系数
rigidbody.linearDamping = damping;
```

有些时候可能会希望获取刚体上某个点的移动速度，比如一个盒子旋转着往前飞，碰到了墙，这时候可能会希望获取盒子在发生碰撞的点的速度，可以通过  `getLinearVelocityFromWorldPoint` 来获取。

```javascript
var velocity = rigidbody.getLinearVelocityFromWorldPoint(worldPoint);
```

或者传入一个 `cc.Vec2` 对象作为第二个参数来接收返回值，这样你可以使用你的缓存对象来接收这个值，避免创建过多的对象来提高效率。

**刚体的 get 方法都提供了 out 参数来接收函数返回值。**

```javascript
var velocity = cc.v2();
rigidbody.getLinearVelocityFromWorldPoint(worldPoint, velocity);
```

### 旋转速度

```javascript
// 获取旋转速度
var velocity = rigidbody.angularVelocity;
// 设置旋转速度
rigidbody.angularVelocity = velocity;
```

旋转速度衰减系数，与移动衰减系数相同。

```javascript
// 获取旋转速度衰减系数
var velocity = rigidbody.angularDamping;
// 设置旋转速度衰减系数
rigidbody.angularDamping = velocity;
```

### 旋转，位移与缩放

旋转，位移与缩放是游戏开发中最常用的功能，几乎每个节点都会对这些属性进行设置。而在物理系统中，系统会自动对节点的这些属性与 box2d 中对应属性进行同步。

> **注意**：
>
> 1. box2d 中只有旋转和位移，并没有缩放，所以如果设置节点的缩放属性时，会重新构建这个刚体依赖的全部碰撞体。一个有效避免这种情况发生的方式是将渲染的节点作为刚体节点的子节点，缩放只对这个渲染节点作缩放，尽量避免对刚体节点进行直接缩放。
> 2. 每个物理时间步之后会把所有刚体信息同步到对应节点上去，而处于性能考虑，节点的信息只有在用户对节点相关属性进行显示设置时才会同步到刚体上，并且刚体只会监视它所在的节点，即如果修改了节点的父节点的旋转位移是不会同步这些信息的。

### 固定旋转

做平台跳跃游戏时通常都不会希望主角的旋转属性也被加入到物理模拟中，因为这样会导致主角在移动过程中东倒西歪的，这时可以设置刚体的 `fixedRotation` 属性。

```javascript
rigidbody.fixedRotation = true;
```

### 开启碰撞监听

只有开启了刚体的碰撞监听，刚体发生碰撞时才会回调到对应的组件上。

```javascript
rigidbody.enabledContactListener = true;
```

## 刚体类型

box2d 原本的刚体类型是三种：**Static**、**Dynamic**、**Kinematic**。Cocos Creator 多添加了一个类型：**Animated**。

Animated 是从 Kinematic 类型衍生出来的，一般的刚体类型修改 **旋转** 或 **位移** 属性时，都是直接设置的属性，而 Animated 会根据当前旋转或位移属性，与目标旋转或位移属性计算出所需的速度，并且赋值到对应的移动或旋转速度上。<br>
添加 Animated 类型主要是防止对刚体做动画时可能出现的奇怪现象，例如穿透。

- `cc.RigidBodyType.Static`

  静态刚体，零质量，零速度，即不会受到重力或速度影响，但是可以设置他的位置来进行移动。

- `cc.RigidBodyType.Dynamic`

  动态刚体，有质量，可以设置速度，会受到重力影响。

- `cc.RigidBodyType.Kinematic`

  运动刚体，零质量，可以设置速度，不会受到重力的影响，但是可以设置速度来进行移动。

- `cc.RigidBodyType.Animated`

  动画刚体，在上面已经提到过，从 Kinematic 衍生的类型，主要用于刚体与动画编辑结合使用。

## 刚体方法

### 获取或转换旋转位移属性

使用这些 API 来获取世界坐标系下的旋转位移会比通过节点来获取相关属性更快，因为节点中还需要通过矩阵运算来得到结果，而这些 api 是直接得到结果的。

#### 获取刚体世界坐标值

```javascript
// 直接获取返回值
var out = rigidbody.getWorldPosition();

// 或者通过参数来接收返回值
out = cc.v2();
rigidbody.getWorldPosition(out);
```

#### 获取刚体世界旋转值

```javascript
var rotation = rigidbody.getWorldRotation();
```

#### 局部坐标与世界坐标转换

```javascript
// 世界坐标转换到局部坐标
var localPoint = rigidbody.getLocalPoint(worldPoint);
// 或者
localPoint = cc.v2();
rigidbody.getLocalPoint(worldPoint, localPoint);
```

```javascript
// 局部坐标转换到世界坐标
var worldPoint = rigidbody.getWorldPoint(localPoint);
// 或者
worldPoint = cc.v2();
rigidbody.getLocalPoint(localPoint, worldPoint);
```

```javascript
// 局部向量转换为世界向量
var worldVector = rigidbody.getWorldVector(localVector);
// 或者
worldVector = cc.v2();
rigidbody.getWorldVector(localVector, worldVector);
```

```javascript
var localVector = rigidbody.getLocalVector(worldVector);
// 或者
localVector = cc.v2();
rigidbody.getLocalVector(worldVector, localVector);
```

### 获取刚体质心

当对一个刚体进行力的施加时，一般会选择刚体的质心作为施加力的作用点，这样能保证力不会影响到旋转值。

```javascript
// 获取本地坐标系下的质心
var localCenter = rigidbody.getLocalCenter();

// 或者通过参数来接收返回值
localCenter = cc.v2();
rigidbody.getLocalCenter(localCenter);

// 获取世界坐标系下的质心
var worldCenter = rigidbody.getWorldCenter();

// 或者通过参数来接收返回值
worldCenter = cc.v2();
rigidbody.getWorldCenter(worldCenter);
```

### 力与冲量

移动一个物体有两种方式，可以施加一个力或者冲量到这个物体上。力会随着时间慢慢修改物体的速度，而冲量会立即修改物体的速度。

当然你也可以直接修改物体的位置，只是这看起来不像真实的物理，你应该尽量去使用力或者冲量来移动刚体，这会减少可能带来的奇怪问题。

```javascript
// 施加一个力到刚体上指定的点上，这个点是世界坐标系下的一个点
rigidbody.applyForce(force, point);

// 或者直接施加力到刚体的质心上
rigidbody.applyForceToCenter(force);

// 施加一个冲量到刚体上指定的点上，这个点是世界坐标系下的一个点
rigidbody.applyLinearImpulse(impulse, point);
```

力与冲量也可以只对旋转轴产生影响，这样的力叫做扭矩。

```javascript
// 施加扭矩到刚体上，因为只影响旋转轴，所以不再需要指定一个点
rigidbody.applyTorque(torque);

// 施加旋转轴上的冲量到刚体上
rigidbody.applyAngularImpulse(impulse);
```

### 其他

有些时候需要获取刚体在某一点上的速度时，可以通过 `getLinearVelocityFromWorldPoint` 来获取，比如当物体碰撞到一个平台时，需要根据物体碰撞点的速度来判断物体相对于平台是从上方碰撞的还是下方碰撞的。

```javascript
rigidbody.getLinearVelocityFromWorldPoint(worldPoint);
```
