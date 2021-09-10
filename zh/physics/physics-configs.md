# 物理系统配置

物理系统模块（PhysicsSystem）用于管理所有物理相关的功能，目前它负责同步物理元素、触发物理事件和调度物理世界的迭代。

物理系统接口请参考 [PhysicsSystem API](__APIDOC__/zh/classes/physics.physicssystem.html)。

## 物理世界

物理世界迭代时会对物理元素进行物理计算，比如计算各物体是否产生碰撞，以及物体的受力情况。当计算完成后，物理系统会将物理世界更新到场景世界中，从而使游戏对象产生相应的物理行为。

场景世界与物理世界：

![场景世界与物理世界](img/physics-world.jpg)

## 物理配置

### 通过代码

| 属性 | 说明 |
| :--- | :--- |
| **enable** | 是否开启物理系统，默认为 `true` |
| **gravity** | 物理世界的重力值，默认为 `(0, -10, 0)` |
| **allowSleep** | 是否允许物理系统自动休眠，默认为 `true` |
| **maxSubSteps** | 每帧模拟的最大子步数，默认为 `2` |
| **fixedTimeStep** | 每次子步进消耗的时间，默认为 `1/60` |
| **sleepThreshold** | 进入休眠的默认速度临界值 |
| **autoSimulation** | 是否开启自动模拟，默认为 `true` |
| **defaultMaterial** | 获取默认物理材质（只读） |
| **raycastResults** | 获取 **raycast** 的检测结果（只读） |
| **raycastClosestResult** | 获取 **raycastClosest** 的检测结果（只读） |
| **collisionMatrix** | 获取碰撞矩阵，仅用于初始化 |

代码可以通过 `PhysicsSystem.instance` 设置。部分设置代码如下：

```ts
import { _decorator, Component, Node, Vec3, PhysicsSystem } from 'cc';
const { ccclass, property } = _decorator;
@ccclass('Example')
export class Example extends Component {
    start () {
        PhysicsSystem.instance.enable = true;
        PhysicsSystem.instance.gravity = new Vec3(0, -10, 0);
        PhysicsSystem.instance.allowSleep = false;
    }
}
```

### 通过物理配置面板

物理配置面板通过在 **项目设置 -> 物理配置**

![Physics](./img/physics-config-index.png)

| 属性 | 说明 |
| :--- | :--- |
| **Gravity X** | 重力矢量，设置 x 分量上的重力值 |
| **Gravity Y** | 重力矢量，设置 y 分量上的重力值 |
| **Gravity Z** | 重力矢量，设置 z 分量上的重力值 |
| **AllowSleep** | 是否允许系统进入休眠状态，默认值 `true` |
| **SleepThreshold** | 进入休眠的默认速度临界值，默认值 `0.1`，最小值 `0` |
| **AutoSimulation** | 是否开启自动模拟, 默认值 `true` |
| **FixedTimeStep** | 每步模拟消耗的固定时间，默认值 `1/60`，最小值 `0` |
| **MaxSubSteps** | 每步模拟的最大子步数，默认值 `1`，最小值 `0` |
| **Friction** | 摩擦系数，默认值 `0.5` |
| **RollingFriction** | 滚动摩擦系数，默认值 `0.1` |
| **SpinningFriction** | 自旋摩擦系数，默认值 `0.1` |
| **Restitution** | 弹性系数，默认值 `0.1` |
| **CollisionMatrix** | 碰撞矩阵，仅用于初始化 |
<!-- - `useNodeChains` 是否使用节点链组合刚体，默认值 *true* -->

>**注意**：目前 **2D**/**3D** 物理共用一个配置。

## 碰撞矩阵

碰撞矩阵是 [分组和掩码](physics-group-mask.md) 功能的进一步封装，它用于初始化物理元素的分组和掩码。

默认情况下只有一个 **DEFAULT** 分组，新建分组默认不与其它组碰撞。

![Physics-collision](./img/physics-collision.png)

### 分组的概念

在编辑器中，碰撞矩阵分组的格式为 `{index, name}` ，`index` 是从 `0` 到 `31` 的位数，而 `name` 是该组的名称，新项目工程会有一个默认分组：`{index: 0, name: 'DEFAULT'}`。

点击 **+** 按钮可以新增分组。

> **注意**：
> - 新增分组的 **index** 和 **name** 均不能为空，且不能与现有项重复。
> - 分组不可以删除，但可以修改分组的名称。

### 如何配置

以新增一个 **water** 分组为例：

![Physics-collision-demo](img/physics-collision-demo.png)

这张表列出了所有的分组，可以通过勾选来决定哪两组会进行碰撞检测。

如上图所示，**DEFAULT** 和 **water** 是否会进行碰撞检测将取决于是否选中了对应的复选框。

根据上面的规则，在这张表里产生的碰撞对有：

- **DEFAULT** - **water**
- **DEFAULT** - **DEFAULT**

而不进行碰撞检测的分组对有：

- **water** - **water**

### 配置物理组件的分组

通过刚体组件上的 **Group** 属性来配置对应的物理元素的分组：

![rigidbody-group](img/rigidbody-group.jpg)
