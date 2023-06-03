# 传统着色器 Legacy Shader

相对于传统着色器而言，表面着色器让流程更统一，暴露给用户的细节更少，因此从 3.7.2 开始，Surface Shader 作为默认的 builtin-standard 出现。

但传统着色器（Legacy Shader) 与 表面着色器（Surface Shader）各有优缺：

| 类型 | 优点 | 缺点 |
| :------- | :--- | :--- |
| Legacy Shader | 在面对特殊需求时更加灵活 | 暴露过多细节给用户，引擎升级时不易维护 |
| Surface Shader | 统一的着色流程，无需关注细节；引擎升级时用户层代码更易维护 | 需要理解整个实现机制才能掌握；能够自定义的功能有限 |

另外，引擎内置的 builtin-unlit 依然使用了部分 legacy shader 库。

掌握 Legacy Shader 也有助于理解更多实现细节。

- [内置 Legacy Shader 导读](./legacy-shader-builtins.md)
- [Legacy Shader 主要函数与结构体](./legacy-shader-func-struct.md)
