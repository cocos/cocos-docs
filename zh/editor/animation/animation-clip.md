# 动画剪辑

动画剪辑（Animation Clip）是一份动画的声明数据，即包含动画数据的资源，是动画系统的核心之一。将动画剪辑挂载到 [动画组件](animation-component.md) 上，就能够将这份动画数据应用到动画组件所在的节点上。

目前支持以下两种创建方式：

- [从外部导入美术工具生产的骨骼动画](../../asset/anim.md#%E6%A8%A1%E5%9E%8B%E5%AF%BC%E5%85%A5%E5%90%8E%E9%99%84%E5%B8%A6%E7%9A%84%E9%AA%A8%E9%AA%BC%E5%8A%A8%E7%94%BB)
- 在 Creator 内部的 [动画编辑器](animation.md) 中创建，并进行编辑。

> **注意**：外部导入的骨骼动画不支持在 **动画编辑器** 中进行编辑，各节点也是锁住状态，只能在外部美术工具中进行编辑。
>
> ![skeletal animation](animation-clip/skeletal-animation.png)
