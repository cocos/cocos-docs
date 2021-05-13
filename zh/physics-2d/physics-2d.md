# 2D 物理简介

Cocos Creator 支持内置的轻量 Builtin 物理系统和强大的 Box2D 物理系统。Builtin 物理系统只提供了碰撞检测的功能，对于物理计算较为简单的情况，我们推荐使用 Builtin 物理模块，这样可以避免加载庞大的 Box2D 物理模块并构建物理世界的运行时开销。而 Box2D 物理模块提供了更完善的交互接口和刚体、关节等已经预设好的组件。

你可以根据需要来选择适合自己的物理模块，通过编辑器主菜单中的 **项目 -> 项目设置 -> 功能裁剪** 切换物理模块的使用。

![feature cropping](./image/module.png)

## 详细介绍

- [2D 物理系统](./physics-2d-system.md)
- [2D 刚体组件](./physics-2d-rigid-body.md)
- [2D 碰撞组件](./physics-2d-collider.md)
- [2D 碰撞回调](./physics-2d-contact-callback.md)
- [2D 物理关节](./physics-2d-joint.md)

## 2D 物理示例

请参考范例 **physics-samples**（[GitHub](https://github.com/cocos-creator/physics-samples/tree/v3.0/2d) | [Gitee](https://gitee.com/mirrors_cocos-creator/physics-samples/tree/v3.0/2d)）。
