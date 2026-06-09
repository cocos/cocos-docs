# 场景制作工作流程

场景是游戏中的环境因素的抽象集合，是创建游戏环境的局部单位，我们可以理解为游戏开发设计人员通过在编辑器中制作一个场景，来表现游戏中的一部分世界内容。

![scene world](./scene/world01.jpg)

## 场景结构

Cocos Creator 通过节点树和节点组件系统实现了自由的场景结构。其中 Node 负责管理节点树的父子关系以及空间矩阵变换 Transform，这样可以轻松地在场景中管理和摆放所有的实体节点。<br>
组件系统赋予了节点各种各样的高级功能，比如模型渲染（MeshRenderer 组件）、动画（Animation 组件）、光源（Light 组件）、地形（Terrain 组件）等。其中 3D 场景中的必要元素是 Camera 组件，Camera 组件代表的是游戏中的玩家视角，没有 Camera 就什么也看不见。因而在创建场景时，Creator 会默认创建一个挂载了 Camera 组件的节点。

## 场景制作相关工作流程

- [场景资源](../../asset/scene.md)
- [节点和组件](node-component.md)
- [坐标系和节点属性变换](coord.md)
- [节点层级和显示顺序](node-tree.md)
- [使用场景编辑器搭建场景](scene-editing.md)
- [天空盒](skybox.md)
- [全局雾](fog.md)
- [阴影](./light/shadow.md)
