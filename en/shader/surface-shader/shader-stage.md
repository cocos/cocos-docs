# Shader Stage

Rendering is accomplished by different shaders. Some for processing vertices, some for processing pixels, and some for general computing.

In the Surface Shader architecture, for better readability and maintainability, different shader stages have a conventional code identifier, as shown in the table below.

| Shader Stage      | Corresponding Code Identifier |
| --------------- | ---------------------------- |
| Vertex Shader   | vs                           |
| Fragment Shader | fs                           |
| Computer Shader | cs                           |

You can find many files named `xxxx-vs` or `xxxx-fs` in the built-in shader and chunk files.

In the effect and chunk files, there are also many code snippets defined like `CCProgram xxx-vs %{}%` and `CCProgram xxx-fs %{}%`.

For example.

```ts
CCProgram standard-vs %{
    //...
}%

CCProgram standard-fs %{
    //...
}%
```

When writing your shaders, it is best to follow this rule to maintain the readability and maintainability of the shader code.
