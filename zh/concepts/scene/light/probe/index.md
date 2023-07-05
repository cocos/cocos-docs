# 基于图像的光照

![preview](img/index.png)

由于实时计算光照对硬件要求过高，因此在游戏或三维仿真中大多会使用基于图像的光照（IBL，Image Based Lighting）以获取更高的性能，也就是将光照信息存储在计算机的存储介质上，在运行时通过采样图形中的信息对光照进行重建。

在引擎中，基于图像的光照通常由下列功能组成。

## 光照贴图

通过 [光照贴图](../lightmap.md) 开发者可以将场景的光照信息记录在贴图上，并在运行时使用。从而可以避免或减少场景内使用实时光，提高渲染效率。

## 天空盒

在 [天空盒](../../skybox.md) 中通过 **烘焙反射卷积图** 可以给环境贴图生成预卷积的反射效果以提高环境光照的质量。

## 光照探针

自 v3.7 开始，Cocos Creator 支持 [光照探针](light-probe.md) 和 [反射探针](reflection-probe.md)。

光照探针是全局光照的一部分，将探针布置在场景内，通过探针检测光线在场景内的反弹，并对离线结果进行存储，用以提高光照效果，提升渲染品质。

## 反射探针

 [反射探针](reflection-probe.md) 目前支持实时和烘焙两种情况，实时情况下开发者可以通过配置反射探针，实时渲染物体的反射效果。烘焙的情况下，可以

通过结合 [天空盒](../../skybox.md)、[光照贴图](../lightmap.md)、[光照探针](./light-probe.md) 以及 [反射探针](reflection-probe.md) 以获得更加真实可信同时兼顾性能的光照效果。

## 内容

本章将包含以下内容：

- [光照探针](light-probe.md)
    - [光照探针面板](light-probe-panel.md)
- [反射探针](reflection-probe.md)
    - [反射探针面板](reflection-probe-panel.md)
    - [反射探针美术工作流](reflection-art-workflow.md)
- [天空盒](../../skybox.md)
- [光照贴图](../lightmap.md)
- [基于图像的光照示例](example.md)
