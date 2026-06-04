# 骨骼动画资源（DragonBones）

DragonBones 骨骼动画资源是由 [DragonBones 编辑器](http://dragonbones.com/) 导出的数据格式（支持 DragonBones v5.6.3 及以下）。

## 导入 DragonBones 骨骼动画资源

DragonBones 骨骼动画资源包括：

- `.json`/`.dbbin` 骨骼数据
- `.json` 图集数据
- `.png` 图集纹理

  ![DragonBones](dragonbones/import.png)

## 创建骨骼动画资源

在场景中使用 DragonBones 骨骼动画资源需要两个步骤：

1. 创建节点并添加 DragonBones 组件：

    从 **资源管理器** 里将骨骼动画资源拖动到已创建 DragonBones 组件的 Dragon Asset 属性中：

    ![DragonBones](dragonbones/set_asset.png)

2. 为 DragonBones 组件设置图集数据

    从 **资源管理器** 里将图集数据拖动到 DragonBones 组件的 Dragon Atlas Asset 属性中：

    ![DragonBones](dragonbones/set_atlas.png)

## 在项目中的存放

为了提高资源管理效率，建议将导入的资源文件存放在单独的目录下，不要和其他资源混在一起。
