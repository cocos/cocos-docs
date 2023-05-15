# 前向渲染与延迟渲染 Shader 执行流程

Cocos Creator 引擎支持 前向渲染和延迟渲染。因此，在 Shader 架构上，也要为这两种渲染流程做兼容，并且让用户感知不到。

内置的 Legacy Shader 都是 PBR 材质，它们在渲染时都遵守以下流程：

## 前向渲染

1. 调用 vs
2. 调用 fs -> surf -> 光照计算

## 延迟渲染

### Buffer 阶段

1. 调用 vs
2. 调用 fs -> surf -> GBuffer

### Lighting 阶段

1. 从 Gbuffer 还原 StandardSurface 信息
2. 光照计算

可以看出，对于 PBR 材质来说，不管是前向渲染还是延迟渲染，用户能够控制的只有 vs 和 surf 函数。

这就统一了架构，使用户写的 Shader 可以不用修改就运行在 前向渲染管线 和 延迟渲染管线中。
