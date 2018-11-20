# 3D 系统

- [3D 节点](3d-node.md)
- [导入模型资源](import-model.md)
- [网格资源参考](mesh.md)
- [Mesh Renderer 组件参考](mesh-renderer.md)
- [Skinned Mesh Renderer 组件参考](skinned-mesh-renderer.md)
- [骨骼动画组件参考](skeleton-animation.md)
- [碰撞检测](intersect.md)

Cocos Creator 在 2.1 版本开始引入了 3D 的支持，3D 特性的加入可以大大丰富 2D 游戏的表现力，减轻 2D 游戏的资源开销。在 Creator 2.1 版本中，支持了 3D 模型渲染、3D Camera、3D 骨骼动画 等 3D 特性，同时编辑器原生支持解析 FBX 格式的 3D 模型文件，不需要额外的导入流程。

**注意**：Cocos Creator v2.1 仍不支持 3D 场景编辑，仅能够在 **属性检查器** 中对节点进行参数设置。同时 3D 碰撞检测也还没有加入，如果需要设置 Camera 的 FOV 等参数，请在编辑器中将 Camera 所在节点切换至 2.5D 模式。
