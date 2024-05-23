# 内置材质

Creator 在 **资源管理器** 面板的 **internal/default_materials/** 目录下内置了几种常见的材质，其使用的 Effect 为 [内置着色器](../shader/effect-builtin.md) ，内置材质的属性都不允许修改。

![内置材质](img/builtin-material.png)

| 内置材质                              | 说明                                                       |
| :------------------------------------ | :--------------------------------------------------------- |
| default-materail                      | 非透明物体的 [标准材质](../shader/effect-builtin-pbr.md)   |
| default-materail-transparent          | 半透明物体的 [标准材质](../shader/effect-builtin-pbr.md)   |
| particle-add                          | 标准粒子材质                                               |
| ui-sprite-material                    | 精灵的标准材质                                             |

<!-- 
| default-billboard-material.mtl        | 内置公告板材质                                             |
| default-clear-stencil.mtl             | 清理 Stencil 缓存                                          |
| default-material.mtl                  | 默认材质                                                   |
| default-material-transparent.mtl      | 默认半透明材质                                             |
| default-particle-gpu-material.mtl     | 默认 [GPU 粒子](../particle-system/index.md) 材质          |
| default-particle-material.mtl         | 默认 [粒子](../particle-system/index.md) 材质              |
| default-spine-material.mtl            | 默认 [Spine 动画](../asset/spine.md) 材质                  |
| default-sprite-renderer-material.mtl  | 默认 [精灵](../ui-system/components/editor/sprite.md) 材质 |
| default-trail-material.mtl            | 默认 [拖尾](../particle-system/trail-module.md) 材质       |
| missing-effect-material.mtl           | 着色器丢失时显示错误的材质                                 |
| missing-material.mtl                  | 丢失材质时显示的默认材质                                   |
| particle-add.mtl                      | 粒子叠加材质                                               |
| standard-material.mtl                 | 标准 PBR 材质                                              |
| ui-alpha-test-material.mtl            |
| ui-base-material.mtl                  |
| ui-graphics-material.mtl              |
| ui-sprite-alpha-sep-material.mtl      |
| ui-sprite-gray-alpha-sep-material.mtl |
| ui-sprite-gray-material.mtl           |
| ui-sprite-material.mtl                |
-->