# 着色器

![effect-show](img/effect-show.png)

<!-- 
着色器（Shader）的本质是运行在 GPU 上能在屏幕上绘制某些东西的程序，这些程序为图形渲染管线的某个特定部分而运行。在 Cocos Creator 中着色器由顶点着色器（Vertex Shader）和片元着色器（Fragment Shader）构成，主要为可编程渲染管线提供算法片段。
-->

在现代显卡中，若要正确的绘制物体，需要书写基于顶点（ Vertex ）和图元（ Fragment ）的着色器代码片段，这些代码片段被称为 Shader ，在基于 OpenGL 系列驱动的硬件设备上，支持一种叫做 `GLSL` （ OpenGL Shading Language ） 的着色器语言。

`GLSL` 是基于 C 语言风格的高级着色语言， 该语言赋予开发者对渲染管线更高级的控制。

每个物体的绘制都需要指定相应的 Shader 片段，为了方便使用，引擎封装了基于 `GLSL` 数据结构称之为着色器（ Effect ） 。

每个着色器内支持多个被称为渲染技术（Technique）的数据结构。该结构会完成一个完整的渲染效果，并由一个或多个 Pass 组成。

渲染技术内部维护了多个 Pass 。 每个 Pass 会进行一次 GPU 的绘制， 单个 Pass 内需包含一个顶点着色器（Vertex Shader）和一个片元着色器（Fragment Shader）。

更多有关渲染的基础知识可以参考：

- [OpenGL](https://learnopengl-cn.github.io/)

<!-- 
本章主要围绕以下几个部分：

- [Effect 语法](effect-syntax.md)
- [Pass 可选配置参数](pass-parameter-list.md)
- [内置 Uniform](builtin-shader-uniforms.md)
-->

本节将包含以下内容：

<!-- - [术语列表](effect-term.md) -->
- [内置着色器（ Buildin Effect ）](effect-buildin.md)
  - [无光照渲染模型](effect-buildin-unlit.md)
  - [基于物理的光照模型（ PBR ）](effect-buildin-pbr.md)
  - [基于非真实渲染的卡通渲染模型（ Toon ）](effect-buildin-toon.md)  
- [着色器（ Effect ）简介](effect-)
  - [着色器语法](effect-framework.md)
    - [YAML 语法](yaml-101.md)
    - [Property 语法]()
    - [GLSL 语法简介](glsl.md)
    - [UBO]()
  - [着色器片段（ Chunk ）](effect-chunk-index.md)
    - [内置着色器片段 （ Buildin Chunk ）](effect-buildin-chunk.md)    
  - [引擎全局 Uniform](uniform.md)      
- [编写着色器]()
  - [创建着色器]()
  - [调试着色器]()  


