# Surface Shader Assembly

## Shader Fragment Assembler

In the built-in Surface Shader files, you will see the following code snippets.

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

These CCProgram code snippets named xxx-vs and xxx-fs are the assemblers.

In these code snippets, we use the `#include` keyword to import different header files as needed and assemble each shader in order.

## Two Ways to include

In these includes you can see the following two situations.

```glsl
//include from CCProgram
#include <macro-remapping>

//include from file
#include <surfaces/effect-macros/common-macros>
```

We can import an external chunk file or import a predefined CCProgram by name in the file, such as `macro-remapping`.

## Main Parts

Using `standard-fs` as an example, we can see that the entire fragment shader assembly is divided into the following 6 parts.

## 1. Macros

First, you need to include the necessary internal macro definitions and mappings.

Macro mapping uses a custom CCProgram section or chunk file described in the Macro-Remapping section.

Next, you need to include the common macro definition file `common-macros`, as shown below.

```glsl
#include <macro-remapping>
#include <surfaces/effect-macros/common-macros>
```

For some special render usages, it is recommended to directly include the macro definition file corresponding to the render usage. Take render-to-shadowmap as an example.

```glsl
CCProgram shadow-caster-fs %{
    ...
    #include <surfaces/effect-macros/render-to-shadowmap>
    ...
}%
```

## 2. Common Header Files

Select the corresponding common header file based on the current Shader Stage, as shown below.

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

## 3. Surface Shader Body

This part is the main part of the Surface Shader.

For example, external constant uniforms, shared-ubos code blocks.

And the main functions in the Surface Shader that users can control, such as the surface-vertex and surface-fragment code segments in the built-in shader.

As shown below.

```glsl
CCProgram standard-fs %{
    ...
    #include <shared-ubos>
    #include <surface-fragment>
    ...
}%
```

## 4. Lighting Model

This part is optional, and it is not necessary for Vertex Shader when rendering to ShadowMap.

The function of this part is to use the light model name to select the corresponding light model header file, as shown below.

```glsl
//Standard PBR Lighting
#include <lighting-models/includes/standard>

//Toon Lighting
#include <lighting-models/includes/toon>
```

## 5. Surface Material Data Structure

This part is optional and is not necessary when rendering to ShadowMap.

Select the surface material data structure corresponding to the lighting model, as shown below.

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

## 6. Main Function

Use the **Render Usage + Shader Stage** to select the corresponding main function header file, as shown below.

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

For more details, please refer to [Guide to Built-in Surface Shader](./builtin-surface-shader.md)。
