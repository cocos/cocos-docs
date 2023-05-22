# Surface Shader 组装

## Shader片段组装器

在内置的 Surface Shader 文件中，你会看到下面的代码片段：

```glsl
CCProgram standard-vs %{
    //includes
}%

CCProgram shadow-caster-vs %{
    //includes
}%

CCProgram standard-fs %{
    //includes
}%

CCProgram shadow-caster-fs %{
    //includes
}%

CCProgram reflect-map-fs %{
    //includes
}%
```

这类以 xxx-vs, xxx-fs 命名的 CCProgram 代码片段，就是我们的组装器。

在这些代码片段中，我们使用 #include 关键字，根据需要，引入不同模块头的文件，按顺序组装每个Shader。

## include 两种方式

在这些 include 中，你可以看到如下两种情况：

```glsl
//include from CCProgram
#include <macro-remapping>

//include from file
#include <surfaces/effect-macros/common-macros>
```

我们可以引入一个外部 chunk 文件，也可以通过名字，引入一个先前定义好的 CCProgram，比如 macro-remapping。

## 主要部分

以 `standard-fs` 为例，我们可以看到整个 Fragment Shader 的组装分为以下 6 个部分。

## 1、宏

首先需要包含必要的内部宏映射和通用宏定义。

宏映射使用在 Macro Remapping 一段中描述的自定义 CCProgram 代码块或 chunk 文件。

接下来需要包含通用宏定义文件 `common-macros`，如下所示：

```glsl
#include <macro-remapping>
#include <surfaces/effect-macros/common-macros>
```

对于一些特殊渲染用途的 Shader 而言，建议直接包含对应渲染用途的宏定义文件，以 ShadowMap 为例：

```glsl
CCProgram shadow-caster-fs %{
    ...
    #include <surfaces/effect-macros/render-to-shadowmap>
    ...
}%
```

## 2、通用头文件

根据 **当前的 Shader 类型（Shader Stage）** 来选择对应的通用头文件，如下所示：

```glsl
//Vertex Shader
CCProgram standard-vs %{
    ...
    #include <surfaces/includes/common-vs>
    ...
}%

//Fragment Shader
CCProgram standard-fs %{
    ...
    #include <surfaces/includes/common-fs>
    ...
}%
```

## 3、Surface Shader 主体

这个部分是 Surface Shader 中的主体部分。

比如外部常量 uniforms，shared-ubos 代码块。

以及 Surface Shader 中，用户可以控制的主体函数，比如内置着色器里的  surface-vertex  和 surface-fragment 代码段。

如下所示：

```glsl
CCProgram standard-fs %{
    ...
    #include <shared-ubos>
    #include <surface-fragment>
    ...
}%
```

## 4、光照模型

此部分为**可选项**，Vertex Shader ，以及渲染到 ShadowMap 时，不需要。

这个部分的作用，是使用 **光照模型名称** 来选择对应的头文件，如下所示：

```glsl
//Standard PBR Lighting
#include <lighting-models/includes/standard>

//Toon Lighting
#include <lighting-models/includes/toon>
```

## 5、表面材质数据结构

此部分为**可选项**，渲染到 ShadowMap 时，不需要。

选择与光照模型对应的表面材质数据结构，如下所示：

```glsl
//Vertex Shader
//Standard
#include <surfaces/includes/standard-fs>
//Toon
#include <surfaces/includes/toon-fs>

//Fragment Shader
//Standard
#include <surfaces/includes/standard-fs>
//Toon
#include <surfaces/includes/toon-fs>
```

## 6、主函数

使用**渲染用途名称 + Shader 类型（Shader Stage）** 来选择对应的主函数头文件，如下图所示：

```glsl
//standard-vs:
#include <shading-entries/main-functions/render-to-scene/vs>

//shadow-caster-vs:
#include <shading-entries/main-functions/render-to-shadowmap/vs>

//standard-fs:
#include <shading-entries/main-functions/render-to-scene/fs>

//shadow-caster-fs:
#include <shading-entries/main-functions/render-to-shadowmap/fs>
```

更多信息，可参考 [内置 Surface Shader 导读](./builtin-surface-shader.md)。
