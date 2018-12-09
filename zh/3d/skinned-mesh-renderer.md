# Skinned Mesh Renderer 组件参考

> 文： youyou

Skinned Mesh Renderer 组件继承自 Mesh Renderer，所以 Skinned Mesh Renderer 组件也可以指定 `mesh` 和 `textures` 属性。

Cocos Creator 使用 Skinned Mesh Renderer 组件来渲染骨骼动画，骨骼动画会将网格中的顶点关联到骨架（即一组节点）上，然后骨骼动画会在预先编辑好的动画中驱动这个骨架使网格变形以达到动画的效果。

Skinned Mesh Renderer 组件会在模型导入的过程中根据模型是否存在骨骼动画自动添加到生成的 Prefab 中。

在导入模型时，如果模型中有骨骼动画，则编辑器会自动添加 Skinned Mesh Renderer 组件到生成的 Prefab 中。
