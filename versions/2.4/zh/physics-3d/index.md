# 3D 物理与碰撞系统

从 v2.3.0 开始，Cocos Creator 新增了对 3D 物理与碰撞系统的支持。

Creator 的 3D 物理引擎基于 cannon.js 实现，提供了高效的组件化工作流程和便捷的使用方法。目前支持了刚体、Box/Sphere 碰撞组件、触发和碰撞事件、物理材质、射线检测等特性。

而 3D 碰撞检测系统 Builtin 是只有碰撞检测系统的物理模块。它没有复杂的物理模拟计算，这将使得游戏的包体更小并且性能更佳。

3D 物理与碰撞系统包括以下几个内容：

- [设置物理引擎](physics-select.md)
- [物理系统管理器](physics-manager.md)
- [刚体组件](physics-rigidbody.md)
- [恒力组件](physics-constant-force.md)
- [碰撞组件](physics-collider.md)
- [物理事件](physics-event.md)
- [物理材质](physics-material.md)

3D 物理与碰撞系统的分组管理与 2D 完全一致，详情请参考 [分组管理](../physics/collision/collision-group.md)。<br>
2D 相关的部分请参考 [2D 物理与碰撞系统](../physics/index.md)。

更多使用方法请参考 **物理系统范例**（[GitHub](https://github.com/cocos/example-projects/tree/v2.4.3/assets/cases/3d_physics) | [Gitee](https://gitee.com/mirrors_cocos-creator/example-cases/tree/v2.4.3/assets/cases/3d_physics)）。
