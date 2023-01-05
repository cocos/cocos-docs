# 设置物理引擎

点击编辑器上方菜单栏的 **项目 -> 项目设置 -> 功能裁剪**，在 **3D -> 物理系统** 中可以根据需要选择适合项目的物理引擎进行开发，也可以在开发过程中随时切换。目前 Creator 支持的物理引擎包括 **Bullet （ammo.js）**、**cannon.js**、**PhysX** 和 **builtin**，默认使用 **Bullet（ammo.js）**。

![物理引擎选项](img/physics-module.jpg)

## 物理引擎

### Bullet （ammo.js）

ammo.js（[GitHub](https://github.com/cocos-creator/ammo.js) | [Gitee](https://gitee.com/mirrors_cocos-creator/ammo.js)）是 [bullet](https://github.com/bulletphysics/bullet3) 物理引擎的 asm.js/wasm 版本，由 [emscripten](https://github.com/emscripten-core/emscripten) 工具编译而来。

**ammo.js** 模块较大（约 1.5MB），但它具有完善的物理功能，以及更佳的性能，未来我们也将在此投入更多工作。

### builtin

**builtin** 内置物理引擎 **仅有碰撞检测** 的功能。相对于其它的物理引擎，它没有复杂的物理模拟计算，如果您的项目不需要这一部分的物理模拟，那么建议使用 **builtin**，使游戏的包体更小。

使用 **builtin** 进行开发时，请注意以下事项：

- 只有 **trigger** 触发器类型的事件。
- 3D 碰撞组件中的 **IsTrigger** 属性无效，所有的碰撞组件都只能用作 [触发器](physics-event.md)。
- 3D 碰撞组件中的 `Material` 属性无效.
- 3D 碰撞组件中的 `Attached` 为 `null`。
- 3D 物理 [刚体组件](physics-rigidbody.md) 无效.
- 3D 物理 [恒力组件](physics-constantForce.md) 无效。
- 3D 物理 [约束组件](physics-constraint.md) 无效。

### cannon.js

**cannon.js**（[GitHub](https://github.com/cocos-creator/cannon.js) | [Gitee](https://gitee.com/mirrors_cocos-creator/cannon.js)）是一个开源的物理引擎，使用 JavaScript 开发并实现了比较全面的物理模拟功能。**cannon.js** 模块大小约为 **141KB**。

当选择的物理引擎为 **cannon.js** 时，需要在节点上添加 **刚体组件** 才能进行物理模拟。然后再根据需求添加 **碰撞组件**，该节点就会增加相应的碰撞体，用于检测是否与其它碰撞体产生碰撞。

目前 cannon.js 支持情况如下：

- [刚体](physics-rigidbody.md)
- [Box/Sphere 碰撞组件](physics-collider.md)
- 触发和碰撞事件
- 物理材质
- 射线检测

### PhysX

**PhysX**（[GitHub](https://github.com/NVIDIAGameWorks/PhysX)）是由英伟达公司开发的开源实时商业物理引擎，它具有完善的功能特性和极高的稳定性，同时也兼具极佳的性能表现。

目前 Cocos Creator 支持的 **PhysX** 是 4.1 版本，允许在绝大部分原生和 Web 平台中使用。当发布到原生平台时，推荐使用 PhysX 物理，可以得到更好的物理性能，特别是发布到 iOS 时。

但由于 **PhysX** 目前的包体过于庞大（约 5MB）以及自身的一些限制，导致部分平台无法得到良好支持，包括：

- 各类有包体限制的小游戏平台
- 安卓 x86 设备

部分较新的平台和设备，例如 HarmonyOS 的设备，将在后续支持，请留意更新公告。Apple M1（Silicon）架构的设备已在 v3.4 支持。

除此之外，字节跳动平台提供了底层的原生物理功能，因此字节跳动小游戏中同样可以使用该功能，详情请参考 [发布到字节跳动小游戏 - 原生物理](../editor/publish/publish-bytedance-mini-game.md)。

### 不同物理后端碰撞形状支持情况

| 功能特性 | builtin | cannon.js | Bullet | PhysX
|:--------|:--------|:----------|:--------|:----|
| 质心     | ✔       | ✔         | ✔       |✔ |
| 盒、球 | ✔ | ✔ | ✔ |✔ |
| 胶囊 | ✔ | 可以用基础形状拼凑 | ✔ |✔ |
| 凸包 |  |  | ✔ |✔ |
| 静态地形、静态平面 |  | ✔ | ✔ |✔ |
| 静态网格 |  | 极其有限的支持 | ✔ |✔ |
| 圆锥、圆柱 |  | ✔ | ✔ |✔ |
| 单纯形 |  | 有限的支持 | ✔ |✔ |
| 复合形状 | ✔ | ✔ | ✔ |✔ |
| 射线检测、掩码过滤 | ✔ | ✔ | ✔ |✔ |
| 多步模拟、碰撞矩阵 | ✔ | ✔ | ✔ |✔ |
| 触发事件 | ✔ | ✔ | ✔ | ✔ |
| 自动休眠 |  | ✔ | ✔ |✔ |
| 碰撞事件、碰撞数据 |  | ✔ | ✔ |✔ |
| 物理材质 |  | ✔ | ✔ |✔ |
| 静态、运动学 | ✔ | ✔ | ✔ |✔ |
| 动力学 |  | ✔ | ✔ |✔ |
| 点对点、铰链约束（实验） |  | ✔ | ✔ |✔ |
| wasm |  |  | ✔ |✔ |

## 不使用物理

若不需要用到任何物理相关的组件和接口，可以取消物理系统选项的勾选，使游戏的包体更小。

> **注意**：若物理系统选项处于取消勾选的状态，项目将不可以使用物理相关的组件和接口，否则运行时将会报错。

## 物理引擎的性能表现

主要针对各类小游戏平台和原生平台，并对使用 **Bullet** 和 **PhysX** 物理时的性能进行了对比：

- 在原生和字节跳动小游戏平台上，使用 **PhysX** 物理可以得到最加良好的性能。
- 在各类小游戏平台上，使用 **Bullet** 物理可以得到最加良好的性能。

## 物理引擎的效果差异

不同的物理引擎，其内部的设计和算法都不相同，因此会出现一些参数相同但是效果不同的情况，这些差异主要包括以下三类：

1. 刚体组件上的 **damping** 属性

    由于 PhysX 物理使用了不同的阻尼算法模型导致的差异。但此差异已被内部消除，如果需要同步之前在 PhysX 中设置的阻尼值，可以参考以下代码进行转换：

    ```ts
    const dt = PhysicsSystem.instance.fixedTimeStep;
    const newDamping = 1 - (1 - oldDamping * dt) ** (1 / dt);
    ```

2. 刚体组件上的 **factor** 属性

    由于 PhysX 物理只固定刚体自由度，没有提供刚体速度的缩放因子导致的，即刚体组件中的 **Linear Factor** 和 **Angular Factor** 属性对 PhysX 物理只有固定效果。之后将会在内部消除此差异。

3. 物理材质

   PhysX 中的物理材质支持静态摩擦系数和弹性系数，与 Creator 中的物理材质资源相比，缺少了动态摩擦系数。该系数目前与静态摩擦系数保持一致，这部分的差异目前暂时无法提供转换方式。

除了以上提到的几点之外，也存在其它算法的差异，例如数值积分方法、LCP 求解算法、求解精度等，因此始终会有不同的效果，不过这些在实际项目开发中不太容易感知。
