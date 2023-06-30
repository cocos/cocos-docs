# Legacy Shader

Compare to Legacy Shader, Surface Shader unifies the shader process and exposes fewer details to the shader writers. Therefore, starting from version 3.72, Surface Shader appears as the default 'builtin-standard'.

However, both Legacy Shader and Surface Shader have their pros and cons.

| Type | Pros | Cons |
| :------- | :--- | :--- |
| Legacy Shader | More flexible when facing special requirements | Exposes too many details to the users, makes it difficult to maintain when the engine is upgraded |
| Surface Shader | Unified shading process, no need to worry about details; User-level code is easier to maintain when the engine is upgraded | Need to well-understand the whole implementation mechanism to master;Limited customizable features |

In addition, the `builtin-unit.effect` offered by the engine still uses part of the legacy shader library.

Mastering Legacy Shader can also help you to understand more implementation details of Cocos Shaders.

- [Guide to Built-in Legacy Shaders](./legacy-shader-builtins.md)
- [Legacy Shader Key Functions and Structures](./legacy-shader-func-struct.md)
