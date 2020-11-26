# 关于资源

本章节将详细介绍 Cocos Creator 中资源的整体工作流程，并对各类资源的使用方法及可能需要注意的地方做出说明。

## 资源管理器

**资源管理器** 作为访问管理资源的重要工具，开发者在管理资源时推荐先熟悉资源管理器的使用方法，关于资源管理器的详细介绍可见：[资源管理器](../editor/assets/index.md)

## 资源工作流

- **资源工作流** 通用的资源工作流程包括导入资源、同步资源、定位资源等说明可见：[资源工作流](asset-workflow.md)
- **资源的获取和加载** 资源的获取和加载的详细说明可见：[获取和加载资源](load-assets.md)
- **资源的分包加载** 对于小游戏平台的游戏分包，Cocos Creator 为开发者提供了分包加载功能，详细说明可见：[分包加载](subpackage.md)

## 常见资源类型工作流程

接下来我们会介绍 Cocos Creator 中主要资源类型和相关工作流程：

- [场景资源](scene.md)
- [图像资源](image.md)
   - [纹理贴图资源](texture.md)
   - [精灵帧资源](sprite-frame.md)
   - [立方体贴图资源](../concepts/scene/skybox.md#cubemap)
   - [图像资源的自动裁剪](../ui-system/components/engine/trim.md)
   - [图集资源](atlas.md)
   - [渲染纹理](render-texture.md)
- [预制资源](prefab.md)
- [脚本资源](script.md)
- [字体资源](font.md)
- [声音资源](audio.md)
- [材质资源](material.md)
- [模型资源](mesh.md)
   - [从第三方工具导出模型资源](dcc-export-mesh.md)
- [动画资源](anim.md)
