# Cocos Shader

![effect-show](img/effect-show.jpg)

In modern graphics engines, to correctly render objects, it's necessary to write Vertex and Fragment code snippets that run on the GPU. Those code snippets are known as shaders.

On the devices driven by OpenGL, a shader programming language called GLSL (OpenGL Shading Language) is widely used.

To adapt the industrial workflows and enhance the usability of shader fragments, Cocos Creator has encapsulated a shader framework based on GLSL — [Cocos Shader](./effect-syntax.md).

This chapter mainly introduces the working and usage of Cocos Shader.

## Table of Contents

- [Create and Use Shader](effect-inspector.md)
- [Built-in Shaders](effect-builtin.md)
    - [Physically Based Rendering - PBR](effect-builtin-pbr.md)
    - [Toon Shading](effect-builtin-toon.md)
    - [Unlit Shading](effect-builtin-unlit.md)
- [Syntax](effect-syntax.md)
    - [Optional Pass Parameters](pass-parameter-list.md)
    - [YAML 101](yaml-101.md)
    - [GLSL](glsl.md)
    - [Preprocessor Macro Definition](macros.md)
    - [Chunk](effect-chunk-index.md)
- [Built-in Uniforms](uniform.md)
- [Common Functions](./common-functions.md)
- [Render Flow of Forward Rendering and Deferred Shading](./forward-and-deferred.md)
- [Surface Shader](surface-shader.md)
    - [Guide to Built-in Surface Shader](./surface-shader/builtin-surface-shader.md)
    - [Surface Shader Overview](./surface-shader/surface-shader-structure.md)
    - [Surface Shader Execution Flow](./surface-shader/shader-code-flow.md)
    - [Include](./surface-shader/includes.md)
    - [Macro Remapping](./surface-shader/macro-remapping.md)
    - [Function Replacement Using Macros](./surface-shader/function-replace.md)
    - [Surface Shader Built-in Replaceable Functions](./surface-shader/surface-function.md)
    - [Render Usages](./surface-shader/render-usage.md)
    - [Lighting Models](./surface-shader/lighting-mode.md)
    - [Surface Material Data Structure](./surface-shader/surface-data-struct.md)
    - [Shader Stages](./surface-shader/shader-stage.md)
    - [Shader Assembly](./surface-shader/shader-assembly.md)
    - [VS Inputs](./surface-shader/vs-input.md)
    - [FS Inputs](./surface-shader/fs-input.md)
    - [Customize Surface Shader](./surface-shader/customize-surface-shader.md)
    - [Rendering Debug View](./surface-shader/rendering-debug-view.md)
- [Legacy Shader](./legacy-shader/legacy-shader.md)
    - [Guide to Built-in Legacy Shaders](./legacy-shader/legacy-shader-builtins.md)
    - [Legacy Shader Key Functions and Structures](./legacy-shader/legacy-shader-func-struct.md)
- [Write Shaders](./write-effect-overview.md)
    - [2D Sprite Shader: Gradient](./write-effect-2d-sprite-gradient.md)
    - [3D Shader: RimLight](./write-effect-3d-rim-light.md)
- [Instanced Attributes](./instanced-attributes.md)
- [UBO Layout](./ubo-layout.md)
- [Fallback to WebGL 1.0](./webgl-100-fallback.md)
- [VSCode Extension - Cocos Effect](./vscode-plugin.md)
