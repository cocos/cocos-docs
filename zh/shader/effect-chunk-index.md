# 着色器片段

着色器片段是为了使 Shader 代码可进行复用而创建的文件。使用方法于 C/C++ 的头文件类似。

着色器片段在语法上基于 GLSL 300 ES，在资源加载时有相应的预处理编译流程。

在标准 GLSL 语法上，Creator 引入了以下几种非常自然的 C 风格语法扩展。

## Include 机制

类似 C/C++ 的头文件 include 机制，你可以在任意 shader 代码（CCProgram 块或独立的头文件）中引入其他代码片段：

```c
#include <cc-global>
#include "../headers/my-shading-algorithm.chunk"
```

相关规则和注意事项：
- 头文件默认扩展名为 `.chunk`，包含时可省略。尖括号和双引号没有区别；
- 在编译期的头文件展开过程中，每个头文件保证只会被展开一次，所以书写时不必担心，每个模块都可以（也应该）包含自己依赖的头文件，即使这中间有重复；
- 更进一步地，所有不参与运行时实际计算流程的函数声明也都会在编译期就被剔除，所以可以放心包含各类工具函数；
- 头文件引用可以指定基于当前文件目录的相对路径（以下统称"相对路径"），也可以指定基于 `assets/chunks` 目录的相对路径（以下统称"项目绝对路径"），两个位置如果有同名文件，则后者优先；
- 引用了编辑器其他 DB（Database）的头文件（Internal 或各类插件 DB 等）只能指定项目绝对路径。当多个 DB 在此路径下有相同文件时，优先级为：用户项目 DB > 插件 DB > Internal DB；
- 编辑器内置头文件资源就在 internal DB 的 `assets/chunks` 目录下，所以可以不加目录直接引用，主要包括一些常用的工具函数和标准光照模型等。
- 所有在同一个 effect 文件中声明的 CCProgram 代码块都可以相互引用。

> DB（Database ）是编辑器的概念，指的是由编辑器内置数据（internal），项目数据目录（assets），插件目录等数据文件的集合。
> 下图内包含了 DB assets 和 DB internal：
>
> ![DB](img/db.png)

## 创建着色器片段

在 **资源管理器** 点击右键，选择 **创建 -> 着色器片段（Chunk）**

![创建着色器片段](img/create-chunk.png)

创建后，引擎会根据片段模板生成片段：

```glsl
// you can write GLSL code directly in here

#include <cc-global>

#define iResolution cc_screenSize
#define iTime cc_time.x
#define iTimeDelta cc_time.y
#define iFrame cc_time.z

// shadertoy template
void mainImage (out vec4 fragColor, in vec2 fragCoord) {
  // Normalized pixel coordinates (from 0 to 1)
  vec2 uv = fragCoord / iResolution.xy;
  // Time varying pixel color
  vec3 col = 0.5 + 0.5 * cos(iTime + uv.xyx + vec3(0, 2, 4));
  // Output to screen
  fragColor = vec4(col, 1.0);
}
```
