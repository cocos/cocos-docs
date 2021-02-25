# 2D 渲染对象

所有具备渲染能力的 2D 对象是 2D 渲染对象。例如：Sprite、Label。 2D 渲染对象的渲染要求有两点：

1. 需要有 UITransform 组件
2. 需要为 RenderRoot2D/Canvas 节点的子节点

## 2D 对象渲染结构说明

2D 渲染对象的收集采用树状结构，RenderRoot2D 节点（带有 RenderRoot2D 组件）为 2D 对象数据收集的入口节点，所有的 2D 渲染对象需在 RenderRoot2D 节点下可被渲染。由于 Canvas 组件本身继承 RenderRoot2D 组件，所以 Canvas 组件也可以作为数据收集的入口。2D 渲染节点必须带有 UITransform 组件作为渲染顶点数据、点击或者对齐策略等功能生效的必要条件。

2D 渲染也可以支持对模型进行渲染，唯一的条件是带有模型组件（例如 `MeshRenderer`/`SkinnedMeshRenderer`）的节点必须添加 **UI/UIMeshRenderer** 组件才可以和 UI 在相同的管线上进行渲染。

2D 渲染流程如下：

![render](render.png)

## 2D 渲染对象可见性说明

2D 渲染对象在相机的可见性判断上和 3D 渲染节点并无区别，所以用户需要自己控制节点的 layer 属性并设置相机的 Visibility 来配合进行分组渲染。相机的 Visibility 决定可以被该相机渲染的 layer。如果场景中出现多个相机的情况，严格规划好相机的 Visibility，否则可能出现多个相机都支持渲染相同的 layer，导致节点重复渲染。

> **注意：这里请 3D 1.2 版本升级的用户注意，我们纠正了之前的 Canvas 只会渲染其子节点的行为，目前需要用户自己管理节点的 layer 和相机的 Visibility，之前使用了多 Canvas 渲染的用户可能会需要对项目做出调整以达到更合理的场景结构。**

## 2D 渲染组件

本身拥有渲染能力的组件我们称为 2D 渲染组件，包括：

- [Sprite 组件参考](../../ui-system/components/editor/sprite.md)
- [Label 组件参考](../../ui-system/components/editor/label.md)
- [Mask 组件参考](../../ui-system/components/editor/mask.md)
- [Graphics 组件参考](../../ui-system/components/editor/graphics.md)
- [RichText 组件参考](../../ui-system/components/editor/richtext.md)
- [UIStaticBatch 组件参考](../../ui-system/components/editor/ui-static.md)
- [TiledMap 组件参考](../../editor/components/tiledmap.md)
- [TiledTile 组件参考](../../editor/components/tiledtile.md)
- [Spine（骨骼动画）Skeleton 组件参考](../../editor/components/spine.md)
- [DragonBones（龙骨）ArmatureDisplay 组件参考](../../editor/components/dragonbones.md)

## 2D 渲染组件规则介绍

- [渲染排序规则](../../ui-system/components/engine/priority.md)
- [UI 合批规则说明](../../ui-system/components/engine/ui-batch.md)
- [UI 材质说明](../../ui-system/components/engine/ui-material.md)
