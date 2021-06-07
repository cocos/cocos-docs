# 选择适合你项目的物理系统

在编辑器上方的菜单栏中选择 **项目 -> 项目设置 -> 功能裁剪 -> 物理系统**，您可以选择适合项目需求的物理引擎进行开发。

![物理引擎选项](img/physics-module.jpg)

> **注意**：
> 1. 默认为物理引擎 ammo.js。
> 2. 开发过程中物理引擎可随意切换。

## 碰撞检测：builtin

__builtin__ 仅有碰撞检测的功能，相对于其它的物理引擎，它没有复杂的物理模拟计算。如果您的项目不需要这一部分的物理模拟，那么可以考虑使用 __builtin__，这将使得游戏的包体更小。

若使用 __builtin__ 进行开发，请注意以下几点：

- __builtin__ 只有 __trigger__ 类型的事件。
- __Collider__ 中的 __isTrigger__ 无论值真假，都为运动学类型的触发器。

## 物理引擎：cannon.js

**cannon.js**（[GitHub](https://github.com/cocos-creator/cannon.js) | [Gitee](https://gitee.com/mirrors_cocos-creator/cannon.js)）是一个开源的物理引擎，它使用 __js__ 语言开发并实现了比较全面的物理功能，如果您的项目需要更多复杂的物理功能，那么您可以考虑使用它。 __cannon.js__ 模块大小约为 __141KB__。

## 物理引擎：ammo.js

**ammo.js**（[GitHub](https://github.com/cocos-creator/ammo.js) | [Gitee](https://gitee.com/mirrors_cocos-creator/ammo.js)）是 [bullet](https://github.com/bulletphysics/bullet3) 物理引擎的 __asm.js__/__wasm__ 版本，由 [emscripten](https://github.com/emscripten-core/emscripten) 工具编译而来。 __Bullet__ 具有完善的物理功能，以及更佳的性能，未来我们也将在此投入更多工作。

需要注意的是，目前 __ammo.js__ 模块具有 __1.5MB__ 左右的大小。

## 物理引擎：PhysX

**PhysX**（[GitHub](https://github.com/NVIDIAGameWorks/PhysX)）是由英伟达公司开发的开源实时商业物理引擎，它具有完善的功能特性和极高的稳定性，同时也兼具极佳的性能表现。

目前在 Cocos Creator 中支持的 **PhysX** 是 4.1 版本，目前仅允许在绝大部分原生平台中使用。此外，由于 PhysX 自身不支持安卓 x86 平台，因此在该平台无法正常运行。同时有些较新的平台设备，如 Apple M1 芯片的设备，这些将会在未来支持。

目前在 v3.1 版本中，还不支持预览和发布到 H5 环境，预览需要通过修改预览模板的方式支持，具体修改可参考[示例工程](https://github.com/cocos-creator/example-3d/tree/v3.1/physics-3d)，以上功能预计会在 v3.2 版本中完善。

当发布到原生相关平台时，建议使用此模块，这样可以得到良好的物理性能，尤其是 IOS 系统的原生应用。

## 不使用物理

若不需要用到任何物理相关的组件和接口，可以取消黄色框的勾选，这样在发布时将有更小的包体。

> **注意**：若处于取消勾选的状态，项目将不可以使用物理相关的组件和接口，否则运行时将会报错。

<!-- ## 扩展物理后端 -->
