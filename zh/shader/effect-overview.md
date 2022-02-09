# 着色器简介

![effect-show](img/effect-show.png)

Cocos 中的着色器（Cocos Effect）是一种基于 YAML 和 GLSL 的单源码嵌入式领域特定语言（single-source embedded domain-specific language），YAML 部分声明流程控制清单，GLSL 部分声明实际的 Shader 片段，这两部分内容相互补充，共同构成了一个完整的渲染流程描述。

>注意：推荐使用 Visual Studio Code 进行 Cocos Effect编写。安装 Cocos Effect 插件，可获得语法高亮提示。

本节主要包含以下内容：

- [着色器语法](effect-framework.md)
    - [Pass 参数](pass-parameter-list.md)
    - [YAML 101 语法](yaml-101.md)
    - [GLSL 简介](glsl.md)
    - [预处理宏定义](macros.md)
- [着色器片段（Chunk）](effect-chunk-index.md)
    <!-- - [内置着色器片段（Buildin Chunk）](effect-buildin-chunk.md) -->
    - [全局 Uniform](uniform.md)

图形渲染基础知识对着色器的编写非常有帮助，更多图形渲染的基础知识可以参考：

- [OpenGL](https://learnopengl-cn.github.io/)
