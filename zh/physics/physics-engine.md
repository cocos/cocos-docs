# 设置物理引擎

点击编辑器上方菜单栏的 **项目 -> 项目设置 -> 功能裁剪**，在 **3D -> 物理系统** 中可以根据需要选择适合项目的物理引擎进行开发，也可以在开发过程中随时切换。目前 Creator 支持的物理引擎包括 **ammo.js**、**cannon.js** 和 **builtin**，默认使用 **ammo.js**。

![物理引擎选项](img/physics-module.jpg)

## 物理引擎

### ammo.js

ammo.js（[GitHub](https://github.com/cocos-creator/ammo.js) | [Gitee](https://gitee.com/mirrors_cocos-creator/ammo.js)）是 [bullet](https://github.com/bulletphysics/bullet3) 物理引擎的 asm.js/wasm 版本，由 [emscripten](https://github.com/emscripten-core/emscripten) 工具编译而来。

**ammo.js** 模块较大（约 1.5MB），但它具有完善的物理功能，以及更佳的性能，未来我们也将在此投入更多工作。

### builtin

**builtin** 物理引擎 **仅有碰撞检测** 的功能。相对于其它的物理引擎，它没有复杂的物理模拟计算，如果您的项目不需要这一部分的物理模拟，那么建议使用 **builtin**，使游戏的包体更小。

使用 **builtin** 进行开发时，请注意以下事项：

- 只有 **trigger** 触发器类型的事件。
- 3D 碰撞组件中的 **IsTrigger** 属性无效，所有的碰撞组件都只能用作 [触发器](physics-event.md)。
- 3D 碰撞组件中的 `Material` 属性无效.
- 3D 碰撞组件中的 `Attached` 为 `null`。
- 3D 物理 [刚体组件](physics-rigidbody.md) 无效.
- 3D 物理 [恒力组件](physics-constantForce.md) 无效。
- 3D 物理 [约束组件](physics-constraint.md) 无效。

### cannon.js

**cannon.js**（[GitHub](https://github.com/cocos-creator/cannon.js) | [Gitee](https://gitee.com/mirrors_cocos-creator/cannon.js)）是一个开源的物理引擎，使用 JavaScript 开发并实现了比较全面的物理模拟功能。

当选择的物理引擎为 **cannon.js** 时，需要在节点上添加 **刚体组件** 才能进行物理模拟。然后再根据需求添加 **碰撞组件**，该节点就会增加相应的碰撞体，用于检测是否与其它碰撞体产生碰撞。

目前 cannon.js 支持情况如下：

- [刚体](physics-rigidbody.md)
- [Box/Sphere 碰撞组件](physics-collider.md)
- 触发和碰撞事件
- 物理材质
- 射线检测

[cannon.js](https://github.com/cocos-creator/cannon.js) 是一个开源的物理引擎，它使用 JavaScript 语言开发，并实现了比较全面的物理功能，建议在项目需要更多复杂的物理功能和较小的包体情况下使用。**cannon.js** 模块大小约为 **141KB**。

### 不同物理后端碰撞形状支持情况

| 功能特性 | builtin | cannon.js | ammo.js |
|:--------|:--------|:----------|:--------|
| 质心     | ✔       | ✔         | ✔       |
| 盒、球 | ✔ | ✔ | ✔ |
| 胶囊 | ✔ | 可以用基础形状拼凑 | ✔ |
| 凸包 |  |  | ✔ |
| 静态地形、静态平面 |  | ✔ | ✔ |
| 静态网格 |  | 极其有限的支持 | ✔ |
| 圆锥、圆柱 |  | ✔ | ✔ |
| 单纯形 |  | 有限的支持 | ✔ |
| 复合形状 | ✔ | ✔ | ✔ |
| 射线检测、掩码过滤 | ✔ | ✔ | ✔ |
| 多步模拟、碰撞矩阵 | ✔ | ✔ | ✔ |
| 触发事件 | ✔ | ✔ | ✔ |
| 自动休眠 |  | ✔ | ✔ |
| 碰撞事件、碰撞数据 |  | ✔ | ✔ |
| 物理材质 |  | ✔ | ✔ |
| 静态、运动学 | ✔ | ✔ | ✔ |
| 动力学 |  | ✔ | ✔ |
| 点对点、铰链约束（实验） |  | ✔ | ✔ |
| wasm |  |  | ✔ |

## 不使用物理

若不需要用到任何物理相关的组件和接口，可以取消物理系统选项的勾选，使游戏的包体更小。

> **注意**：若物理系统选项处于取消勾选的状态，项目将不可以使用物理相关的组件和接口，否则运行时将会报错。

<!-- ## 扩展物理后端 -->
