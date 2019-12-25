# 选择合适的物理引擎

![物理引擎选项](image/physics-module.png)

前往编辑器 "项目->项目设置->模块设置"，选择合适的物理引擎 (默认为 Cannon.js )。

**注：预览过程中物理引擎始终为 Cannon.js ，只有在构建工程时，该选项才起作用**。

## 碰撞检测 : Builtin

Builtin 是仅有碰撞检测系统的物理模块，相对于其它的物理引擎，它没有物理模拟功能，有包体更小和较小的计算量的优势。

若使用 Builtin 进行开发，请注意以下几点：

- Builtin 只有 trigger 类型的事件。

- [碰撞组件](./physics-collider) 中的 material 属性无效。

- [碰撞组件](./physics-collider) 中的 isTrigger 无论值真假，碰撞器都为触发器。

- [碰撞组件](./physics-collider) 中的 attachedRigidbody 为 null。

- [刚体组件](./physics-rigidbody) 无效。

- [恒力组件](./physics-constant-force) 无效。

## 物理引擎 : Cannon.js

[Cannon.js](https://github.com/cocos-creator/cannon.js) 是一个开源的物理引擎，使用 javascript 开发并实现了比较全面的物理模拟功能。

**注：若取消物理模块的勾选，将无法使用物理相关的组件和接口，否则会运行时报错**。
