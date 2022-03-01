# 着色器（Effect）

![effect-show](img/effect-show.jpg)

在现代显卡中，若要正确地绘制物体，需要书写基于顶点（Vertex）和片元（Fragment）的代码片段，这些代码片段称为 Shader。在基于 OpenGL 系列驱动的硬件设备上，Shader 支持一种名为 GLSL（OpenGL Shading Language）的着色器语言。

为了适配工业化制作流，提升着色器片段的易用性，Creator 封装了基于 GLSL 的着色器 — [Cocos Effect](./effect-syntax.md)。

本章主要介绍 Cocos Effect 的工作方式和使用方式。

## 内容

本章节主要包含以下内容：

- [着色器资源](effect-inspector.md)
- [着色器语法](effect-syntax.md)
    - [Pass 可选配置参数](pass-parameter-list.md)
    - [YAML 101 语法简介](yaml-101.md)
    - [GLSL 语法简介](glsl.md)
    - [预处理宏定义](macros.md)
    - [着色器片段（Chunk）](effect-chunk-index.md)
        - [Cocos Effect 内置 Uniform](uniform.md)
- [内置着色器（builtin Effect）](effect-builtin.md)
    - [基于物理的光照模型 PBR](effect-builtin-pbr.md)
    - [卡通渲染](effect-builtin-toon.md)
    - [无光照](effect-builtin-unlit.md)
- [自定义着色器](write-effect-overview.md)
    - [3D 着色器：RimLight](write-effect-3d-rim-light.md)
    - [2D 着色器：Gradient](write-effect-2d-sprite-gradient.md)
