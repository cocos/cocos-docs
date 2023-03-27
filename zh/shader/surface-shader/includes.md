# include 机制

## 头文件

Surface Shader 中，包含了多个[光照模型](./lighting-mode.md)，如 standard,toon 等。

同时，我们拥有不同的[渲染用途](./render-usage.md)，如 render-to-scene, render-to-shadowmap 等。

不同的光照模型拥有不同的表面材质数据结构和光照计算函数，不同的渲染用途之间，流程上会有细微的差别。

如果为不同的光照模型和不同的渲染用途编写独立的代码，会使整个架构很难维护。

因此，在 Surface Shader 中，我们将不同光照模型的方法和结构体，以相同的名字定义在不同的头文件中，**再使用 include 进行组合**。

这样就可以很容易实现，在同样的流程下，通过切换头文件实现不同的光照模型。

比如，在下面的代码中，我们通过 **#include <surfaces/data-structures/standard>** 引入 **SurfacesMaterialData** 的定义，函数中使用的结构体，就是 PBR 表面材质数据结构体。

```glsl
//PBR 表面材质
#include <surfaces/data-structures/standard>
#define CC_SURFACES_FRAGMENT_MODIFY_SHARED_DATA
void SurfacesFragmentModifySharedData(inout SurfacesMaterialData surfaceData)
{
    // set user-defined data to surfaceData
}
```

如果我们更换它的头文件：

```glsl
//toom 表面材质
#include <surfaces/data-structures/toon>
#define CC_SURFACES_FRAGMENT_MODIFY_SHARED_DATA
void SurfacesFragmentModifySharedData(inout SurfacesMaterialData surfaceData)
{
    // set user-defined data to surfaceData
}
```

此时的 SurfacesMaterialData 使用的就是 surfaces/data-structures/toon 中定义的结构体。

## CCProgram

在 Surface Shader 中，CCProgram 包含的内容就是纯粹的 GLSL 代码内容。 我们可以将 Shader 分割到不同的 CCProgram 里形成代码片段，然后通过 `include` 进行引用。

以下面代码为例：

```ts
CCProgram shared-ubos %{
    ...
}%
CCProgram macro-remampping %{
    ...
}%

CCProgram vs %{
    #include<shared-ubos>
    #include<macro-remapping>
}%

CCProgram fs %{
    #include<shared-ubos>
    #include<macro-remapping>
}%
```

> 注意：`include` 只能引用本文件内的 `CCProgram`。
