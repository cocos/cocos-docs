# 着色器（Effect）

![effect-show](img/effect-show.png)

<!-- 
着色器（Shader）的本质是运行在 GPU 上能在屏幕上绘制某些东西的程序，这些程序为图形渲染管线的某个特定部分而运行。在 Cocos Creator 中着色器由顶点着色器（Vertex Shader）和片元着色器（Fragment Shader）构成，主要为可编程渲染管线提供算法片段。
-->

在现代显卡中，若要正确的绘制物体，需要书写基于顶点（ Vertex ）和片元（ Fragment ）的着色器代码片段，这些代码片段被称为 Shader ，在基于 OpenGL 系列驱动的硬件设备上，支持一种叫做 GLSL（ OpenGL Shading Language ） 的着色器语言。

在 Cocos Creator 中，为适配工业化制作流，提升着着色器片段的易用性，封装了基于 GLSL 的着色器（Effect）。

<!-- 
本章主要围绕以下几个部分：

- [Effect 语法](effect-syntax.md)
- [Pass 可选配置参数](pass-parameter-list.md)
- [内置 Uniform](builtin-shader-uniforms.md)
-->

本节主要包含以下内容：
<!-- 
- [术语列表](effect-term.md) 
- [着色器（Effect）简介](effect-overview.md)        
- [内置着色器（Buildin Effect）](effect-buildin.md)    
- [编写着色器](write-effect-overview.md)  

--> 
- [着色器（Effect）简介](effect-overview.md)      
  - [着色器语法](effect-framework.md)
  - [Pass 参数](pass-parameter-list.md)
  - [YAML 101 语法](yaml-101.md)
  - [GLSL 简介](glsl.md)
  - [预处理宏定义](macros.md)  
  - [着色器片段（Chunk）](effect-chunk-index.md)
    - [内置着色器片段（Buildin Chunk）](effect-buildin-chunk.md)         
    - [全局 Uniform](uniform.md)  
- [内置着色器（Buildin Effect）](effect-buildin.md)  
  - [基于物理的光照模型 PBR](effect-buildin-pbr.md) 
  - [卡通渲染](effect-buildin-toon.md) 
  - [无光照模型](effect-buildin-unlit.md)
- [编写着色器](write-effect-overview.md) 
  - [编写普通着色器](write-effect.md)
<!-- 
  - [编写表面着色器](write-surf-shader.md) 
-->