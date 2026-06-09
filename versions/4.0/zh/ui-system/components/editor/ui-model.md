# UIMeshRenderer 组件参考

UIMeshRenderer 是一个将 3D 模型从 3D 渲染管线转换到 2D 渲染管线的带有转换功能的渲染组件。该组件支持 3D 模型和粒子在 UI 上的显示，没有这个组件，即使模型和粒子节点在 UI 里也不会被渲染。

> **注意**：若 3D 模型无法在 UI 场景中正常显示，请尝试放大模型倍数。

该组件的添加方式是在 **层级管理器** 中选中带有或继承自 MeshRenderer 组件的节点，然后点击 **属性检查器** 下方的 **添加组件** 按钮，选择 **UI-> UIMeshRenderer** 即可。而粒子则是添加到粒子节点上。通常结构如下所示：

![ui-model-hierarchy](uimodel/ui-model-hierarchy.png)
