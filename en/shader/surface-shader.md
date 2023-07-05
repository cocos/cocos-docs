# Surface Shader

Surface Shader provides an efficient and unified rendering workflow. It allows users to create shaders easily by creating surface material information with concise code, and just specifying the needed lighting and shading models.

Compared to [Legacy Shader](./legacy-shader/legacy-shader.md), Surface Shader has the advantages of being easier to write and maintain, better version compatibility, and reduced likelihood of rendering errors. It also provides many hight levels features through a unified process, such as unified environmental lighting and rendering debug view.

Staring from Cocos Creator v3.7.2, the default `builtin-standard` is written in Surface Shader, which can be viewed in the 'Create' menu. The previous shader have been consolidated under the `internal/effects/legacy/` folder.

List of content about Surface Shader:
- [Built-in Surface Shader Guide](./surface-shader/builtin-surface-shader.md)
- [Surface Shader Overview](./surface-shader/surface-shader-structure.md)
- [Surface Shader Execution Flow](./surface-shader/shader-code-flow.md)
- [include](./surface-shader/includes.md)
- [Marco Remapping](./surface-shader/macro-remapping.md)
- [Function Replacement Using Macros](./surface-shader/function-replace.md)
- [Built-in Replaceable Functions](./surface-shader/surface-function.md)
- [Render Usages](./surface-shader/render-usage.md)
- [Lighting Models](./surface-shader/lighting-mode.md)
- [Surface Material Data Structure](./surface-shader/surface-data-struct.md)
- [Shader Stages](./surface-shader/shader-stage.md)
- [Shader Assembly](./surface-shader/shader-assembly.md)
- [VS Inputs](./surface-shader/vs-input.md)
- [FS Inputs](./surface-shader/fs-input.md)
- [Customize Surface Shader](./surface-shader/customize-surface-shader.md)
- [Rendering Debug View](./surface-shader/rendering-debug-view.md)
