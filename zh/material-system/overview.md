# 材质系统总览

![mat-inspector](img/mat-show.png)

在真实世界中，所有的物体都会与光交互，根据物体表面外观不同，在光照下所表现出来的效果也不同。

Cocos Creator 通过 **材质** 来描述物体外观，例如一个小球是玻璃球还是塑料球，一个箱子是木头箱子还是铁皮箱。它们在光照情况下所呈现出来的明暗、光点、光反射、光散射等效果，都是通过 [着色器](文档跳转链接) 来实现的。而材质则是着色器的数据集（包括纹理贴图、光照算法等），方便进行可视化调整。

<!-- 
通过材质系统，既可以实现基于物理的真实渲染（PBR）， 也可以自定义非真实渲染（NPR）。
-->

本节将包含以下内容：

- [程序化使用材质](material-script.md)
- [内置材质](builtin-material.md)
- [材质系统类图](material-structure.md)

<!-- 若要了解更多着色器的内容，请参考： [着色器](../shader/index.md) -->
## 范例

Creator 提供了材质相关的 **material** 范例（[GitHub](https://github.com/cocos-creator/test-cases-3d/tree/v3.4/assets/cases/material) | [Gitee](https://gitee.com/mirrors_cocos-creator/test-cases-3d/tree/v3.4/assets/cases/material)），用户可根据需要参考使用。
