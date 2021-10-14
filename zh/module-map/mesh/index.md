# 网格（Meshes）

**网格** 一般用于绘制 3D 图像。Creator 提供了以下网格渲染器组件来渲染基础网格、蒙皮网格等，从而将模型绘制显示出来：

- [MeshRenderer](../../engine/renderable/model-component.md)：网格渲染器组件，用于渲染静态的 3D 模型。
- [SkinnedMeshRenderer](../../animation/skeletal-animation.md)：蒙皮网格渲染器组件，用于渲染骨骼动画。
- [SkinnedMeshBatchRenderer](../../animation/skeletal-animation.md)：批量蒙皮网格渲染器组件，用于将同一个骨骼动画组件控制的所有子蒙皮模型合并渲染。

同时，模型若要应用于实际的物理碰撞中，实现类似凹凸不平的路面效果，可以使用网格碰撞组件，会根据模型形状生成碰撞网格。详情请参考 [使用网格碰撞](../../physics/physics-collider.md#%E5%AE%9E%E7%8E%B0%E9%B9%85%E8%BD%AF%E7%9F%B3)。
