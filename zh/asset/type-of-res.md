# 常见资源类型

## 场景资源

[场景资源](scene.md) 是使用 Cocos Creator 开发最基础的资源类型，支持 .fire 和 .scene 后缀。场景资源会记录下当前场景游戏布局下的所有数据，可以自由的在多个场景间切换而不同担心搭建的游戏世界丢失。

## 图像资源

[图像资源](image.md) 是游戏开发中最常用到的资源，支持 `'.jpg'`、`'.png'`、`'.jpeg'`、`'.webp'` 和 `'.tga'`格式。图像资源又分为 [纹理贴图资源](texture.md)、[精灵帧资源](sprite-frame.md)、[立方体贴图资源](../concepts/scene/skybox.md#cubemap)。同时，图像也支持 [图集资源](atlas.md) 导入使用。

更多图像相关，请参考：
- [图像资源的自动裁剪](../ui-system/production-strategy/trim.md)
- [渲染纹理](render-texture.md)

## 模型资源

通常在游戏中看到的角色、房屋、障碍物等就是 [模型资源](mesh.md)，Cocos Creator 模型资源支持 FBX 和 glTF 两种格式。可以从 3dMax、Maya 等建模软件工具导出，具体请参考：[从第三方工具导出模型资源](dcc-export-mesh.md)

## 动画资源

通常在游戏中，角色的动作、障碍物在给定范围运动的这些行为都是由动画完成的，[动画剪辑](../engine/animation/animation-clip.md) 主要记录着骨骼和节点的运动数据。Cocos Creator 支持自定义动画数据以及第三方插件提供的动画数据。具体请参考：

- [Spine 骨骼动画资源](spine.md)
- [Dragonbones 骨骼动画资源](dragonbones.md)

## 预制资源

[预制资源](prefab.md) 是游戏开发里很常见的复用资源。预制件充当模版，在此模版上可以创建出多个跟模版组织结构一样的预制实例。最典型的案例就是模型。假设有一个障碍物，它身上有多个部位动需要通过动画的形式来实现，场景里可能会重复用到这个模型多次，此时，只需要调整好一次该障碍物，并将障碍物对象转换成预制件，就可以很方便的拿来复制和粘贴。因为多个预制件实例都会同步预制件上的数据，达到一方修改，多方受用。

## 其它资源类型

- [脚本资源](../scripting/setup.md)
- [字体资源](font.md)
- [声音资源](audio.md)
- [材质资源](material.md)
- [TiledMap 瓦片图资源](tiledmap.md)
