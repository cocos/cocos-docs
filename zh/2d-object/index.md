# 2D 对象概述

区别于 3D 模型对象，我们将不涉及模型的图片渲染体统称为 2D 渲染对象。2D 渲染对象的处理在底层的数据提交上与 3D 模型存在差异，其遵循自己的规则做出了一些针对性的调整以实现更好的效率表现和使用体验。

## 2D 对象渲染结构说明

2D 渲染对象的收集采用树状结构，RenderRoot 节点（带有 RenderRoot2D 组件的节点）为 2D 对象数据收集的入口节点，所有的 2D渲染对象需在 RenderRoot 节点下才可以被渲染。由于 Canvas 组件本身继承 RenderRoot2D 组件，所以 Canvas 组件也可以作为数据收集的入口。2D 渲染节点必须带有 UITransform 组件作为渲染顶点数据、点击或者对齐策略等功能生效的必要条件。

2D 渲染也可以支持对模型进行渲染，唯一的条件是带有模型组件（例如 `MeshRenderer`/`SkinnedMeshRenderer`）的节点必须添加 **UI/UIMeshRenderer** 组件才可以和 UI 在相同的管线上进行渲染。

2D 渲染流程如下：

![render](render.png)

## 2D 对象分类

2D 对象大致上可以分为两类，**2D 渲染对象** 和 **用户界面 User-interface（UI）**，其区别主要在于 2D 渲染对象一般只负责将 2D 对象渲染出来，而 UI 则更多的承担着用户交互的能力。具体的差别用户可参考具体的详细说明：

- [2D 渲染组件说明](2d-render/index.md)
- [UI 说明](ui-system/index.md)
