# 表面着色器（Surface Shader）

Surface Shader 使用高效、统一的渲染流程，让用户以简洁的代码创建表面材质信息，指定用于组合的光照和着色模型。

相比旧版（Legacy Shader）的优点是更易书写和维护，有更好的版本兼容性，也更不容易产生渲染错误。并且可以从统一流程中获取很多公共特性，如统一的全场景光照和 Debug View 调试功能等。

在 Cocos Creator v3.7.2 中，Surface Shader 已作为默认的 builtin-standard，用户可以在创建菜单查看。原来的 builtin-standard 相关的着色流程，统一归类到了 internal/effects/legacy。

由于基于统一的着色流程，使用 Surface Shader 的代价是无法对光照和着色运算进行大幅度的定制。如有特殊的需求，请使用 Legacy Shader。

Surface Shader 相关内容列表：
- [Surface Shader 结构概览](./surface-shader/surface-shader-structure.md)
- [Surface Shader 执行流程](./surface-shader/shader-code-flow.md)
- [内置 Surface Shader](./surface-shader/builtin-surface-shader.md)
- [include 机制](./surface-shader/includes.md)
- [宏定义与重映射](./surface-shader/macro-remapping.md)
- [使用宏定义实现函数替换](./surface-shader/function-replace.md)
- [可替换的内置函数](./surface-shader/surface-function.md)
- [渲染用途](./surface-shader/render-usage.md)
- [光照模型](./surface-shader/lighting-mode.md)
- [表面材质数据结构](./surface-shader/surface-data-struct.md)
- [着色器类别](./surface-shader/shader-stage.md)
- [组装器](./surface-shader/shader-assembly.md)
- [VS 输入](./surface-shader/vs-input.md)
- [FS 输入](./surface-shader/fs-input.md)
- [公共函数库](./surface-shader/common-functions.md)
- [自定义 Surface Shader](./surface-shader/customize-surface-shader.md)
- [渲染调式功能](./surface-shader/rendering-debug-view.md)
