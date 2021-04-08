# 物理引擎选择

点击编辑器上方菜单栏的 **项目 -> 项目设置 -> 功能裁剪**，您可以选择适合项目需求的物理引擎进行开发，开发过程中也可随时切换。

![物理引擎选项](img/physics-module.jpg)

## ammo.js

[ammo.js](https://github.com/cocos-creator/ammo.js) 为默认物理引擎，是 [Bullet 物理引擎](https://github.com/bulletphysics/bullet3) 的 **JavaScript** 移植版本。

**ammo.js** 具有完善的物理功能，以及更佳的性能，但模块较大（约 1.5MB），未来我们也将在此投入更多工作。

## builtin

**builtin** 仅有碰撞检测的功能。相对于其它的物理引擎，它没有复杂的物理模拟计算，如果您的项目不需要这一部分的物理模拟，那么建议使用 **builtin**，使游戏的包体更小。

使用 **builtin** 进行开发时，请注意以下事项：

- 只有 **trigger** 类型的事件。
- 各种 **Collider** 碰撞器中的 **isTrigger** 选项，无论值为 `true/false`，都为运动学类型的触发器。

## cannon.js

[cannon.js](https://github.com/cocos-creator/cannon.js) 是一个开源的物理引擎，它使用 **JavaScript** 语言开发，并实现了比较全面的物理功能，建议在项目需要更多复杂的物理功能和较小的包体情况下使用。**cannon.js** 模块大小约为 **141KB**。

## 不使用物理

若不需要用到任何物理相关的组件和接口，可以取消黄色框的勾选，使游戏的包体更小。

> **注**：若处于取消勾选的状态，项目将不可以使用物理相关的组件和接口，否则运行时将会报错。

<!-- ## 扩展物理后端 -->
