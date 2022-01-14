# 着色器片段（ Chunk ）

## include 机制

shader 中的 include 机制类似 C/C++ 的头文件 include 机制，你可以在任意 shader 代码（CCProgram 块或独立的头文件）中引入其他代码片段：

```c
#include <cc-global>
#include "../headers/my-shading-algorithm.chunk"
```

相关规则和注意事项：
- 头文件默认扩展名为 `.chunk`，包含时可省略。尖括号和双引号的写法没有区别
- 头文件引用可以指定基于当前文件目录的相对路径，也可以指定基于 `assets/chunks` 目录的相对路径，两个位置如果有同名文件，则后者优先
- 如果需要引用内置头文件（存放在 internal 资源库下 chunk 文件夹里的 `.chunk` 文件），可以直接通过文件名引用，无须带后缀 internal 下的 `.chunk` 文件主要包括一些常用的工具函数和标准光照模型等
- 引用了编辑器其他资源库的头文件（插件定义的资源库等）只能指定项目绝对路径
- 同名文件的查找优先级为：assets 资源库 > 插件资源库 > internal 资源库
- 所有在同一个 Cocos Effect 文件中声明的 CCProgram 代码块都可以相互引用

    ```glsl
      CCProgram test1 %{
        #include "test2"
        vec4 getVec4(){
          vec4 o = autoComplete(3.)
        }
      }%

      CCProgram test2 %{
        vec4 autoComplete (float angle){
          return vec4(angle);
        }
      }%
    ```

- 在编译期的头文件展开过程中，每个头文件保证只会被展开一次，所以书写时不必担心，每个模块都可以包含自己依赖的头文件，即使这中间有重复
- 所有不参与运行时实际计算流程的函数声明都会在编译期被剔除，所以可以放心包含各类工具函数
