# Shader 类型

渲染是由不同的着色器来完成的，有处理顶点的、有处理像素的、有用于通用计算的。

在 Surface Shader 架构中，为了良好的可读性和可维护性，不同的 Shader 类型会有一个约定的代码标识，
如下表所示：

| 着色器阶段      | 对应的 Surface Shader 代码标识 |
| --------------- | ---------------------------- |
| Vertex Shader   | vs                           |
| Fragment Shader | fs                           |
| Computer Shader | cs                           |

你可以在内置的 effect 和 chunk 文件中发现许多文件以 xxxx-vs 或者 xxxx-fs 命名。

而在 effect 和 chunk 文件中， 也有许多类似 `CCProgram xxx-vs %{}%`  和 `CCProgram xxx-fs %{}%` 的代码片段定义。

比如：
```ts
CCProgram standard-vs %{
    //...
}%

CCProgram standard-fs %{
    //...
}%
```

用户在编写自己的 Shader 时，最好也遵守这个约定，以维持源码的可读性与维护性。
