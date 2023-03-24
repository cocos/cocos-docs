# 自定义表面着色器

虽然 Surface Shader 提供了大多数场景材质都能适配的光照模型，但其功能还是较为固定的。

有时候，**用户需要使用完全定制化的光照计算和色彩计算**，比如说：一些特殊的、风格化的材质，需要轮廓光、额外的补光、非真实的环境照明等等。

针对这类情况，Surface Shader 也提供了自定义能力。

## 1、自定义 VS 输出与 FS 输入

我们可以在 VS 阶段新定义一个传递变量之后，在某个 Surface 函数中计算并输出该变量值。

在 FS 阶段定义一个同名变量之后在某个 Surface 函数中获取并使用该变量值。

详情请参考 [Fragment Shader 的输入参数](./fs-input.md)：**自定义传递值**。

## 2、自定义材质信息

在 VS 函数块中添加如下代码：

```glsl
//PBR 光照模型
#include <surfaces/data-structures/standard>
// toon 光照模型
//#include <surfaces/data-structures/toon> 
#define CC_SURFACES_FRAGMENT_MODIFY_SHARED_DATA
void SurfacesFragmentModifySharedData(inout SurfacesMaterialData surfaceData)
{
    // set user-defined data to surfaceData
}
```

函数开头的 `#include` 用于决定使用的**材质模型名称**，根据不同的 include, `SurfacesMaterialData` 的内容会不同。

具体内容，可以查看 **internal/chunks/surfaces/data-structures/** 目录下的 **standard.chunk** 和 **toon.chunk**

当定义了 `CC_SURFACES_FRAGMENT_MODIFY_SHARED_DATA` 宏后，Shader编译器会选择你自己写的 `SurfacesFragmentModifySharedData` 来替换默认的函数。

此函数会在 vs 阶段被调用，具体可以查看 **internal/chunks/shading-entries/main-functions/** 目录下的： **redner-to-scene/vs.chunk** 和 **render-to-shadowmap/vs.chunk** 文件。

在这个函数中，我们可以直接修改 surfaceData 里的属性，为光照阶段做准备。

## 自定义光照计算结果

有了上面自定义的 SurfacesMaterialData，我们还需要配合光照阶段，才能实现我们想要的计算效果。

在 FS 中，添加下面的代码：

```glsl
#include <lighting-models/includes/common>
#define CC_SURFACES_LIGHTING_MODIFY_FINAL_RESULT
void SurfacesLightingModifyFinalResult(inout LightingResult result, in LightingIntermediateData lightingData, in SurfacesMaterialData surfaceData, in LightingMiscData miscData)
{
    // use surfaceData and lightingData for customizing lighting result
}
```

这个函数会在 fs.chunk 中被调用。

可以看到函数有四个参数：
- LightingIntermediateData：计算光照时需要的信息，如法线、视线方向、视距等等
- SurfacesMaterialData：颜色、世界空间法线、PBR参数等信息
- LightingMiscData：光源类型、位置、方向、颜色、强度等
- LightingResult：用于返回光照结果，如 diffuse, specular, shadow,ao 等等。

在这个函数中，可以利用光照和材质参数，计算出光照结果，并放入 result 中。

对于局部光源（点光、聚光灯等）而言，此函数会逐光源执行。也就是说，如果物体受 6 个光源影响，这个函数会被调用 6 次。

如果希望 <font color=#ff0000>在重载函数内可以直接调用现成的内置光照模块函数</font>，可以将 lighting-models/includes/common 改为对应光照模型使用的头文件。

比如，如果想要在函数中使用 PBR 光照模型内置的光照函数，可以包含 lighting-models/includes/standard 头文件。

在这个头文件中，会包含 lighting-models/model-functions/standard 头文件。

PBR光照相关的内置函数都在这里，直接调用即可。

## 更多自定义

如果上面的自定义机制还不能满足需求，建议参考 chunks/shading-entries 构建自己的 main 函数，以控制着色流程。
