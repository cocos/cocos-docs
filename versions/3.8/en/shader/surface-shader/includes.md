# include

## Header Files

In the Surface Shader, there are several [Lighting Models](./lighting-mode.md), such as standard, toon, etc.

At the same time, we have different [Render Usages](./render-usage.md), such as render-to-scene, render-to-shadowmap, etc.

Different lighting models have different surface material data structures and lighting calculation functions, and there are subtle differences in the process between different render usages.

If we write code for different lighting models and different render usages independently, it will make the entire framework difficult to maintain.

Therefore, in the Surface Shader, we define the methods and structures for different lighting models with the same name in different header files, and then combine them using include.

In this way, it is easy to implement different lighting models under the same process by switching header files.

For example, in the following code, we import the definition of `SurfacesMaterialData` through **#include <surfaces/data-structures/standard>**. The structure used in the function is the PBR surface material data structure.

```glsl
//PBR surface material
#include <surfaces/data-structures/standard>
#define CC_SURFACES_FRAGMENT_MODIFY_SHARED_DATA
void SurfacesFragmentModifySharedData(inout SurfacesMaterialData surfaceData)
{
    // set user-defined data to surfaceData
}
```

If we change its header file.

```glsl
//toon surface material
#include <surfaces/data-structures/toon>
#define CC_SURFACES_FRAGMENT_MODIFY_SHARED_DATA
void SurfacesFragmentModifySharedData(inout SurfacesMaterialData surfaceData)
{
    // set user-defined data to surfaceData
}
```

At this time, the **SurfacesMaterialData** uses the structure defined in `surfaces/data-structures/toon`.

## CCProgram

In the Surface Shader, the content of the `CCProgram` is purely GLSL code content. We can split the Shader into different CCProgram sections to form code snippets, and then reference them using `include`.

Take the following code as an example.

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

> **Note**: When using `include` to reference code defined in `CCProgram`, it is limited to the same file only.
