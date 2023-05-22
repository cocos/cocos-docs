# Built-in Surface Shader Guide

Starting from Cocos Creator 3.7.2, the `builtin-standard.effect` uses the Surface Shader architecture for implementation.

This article uses the `builtin-standard.effect` as a typical case to explain the details of Surface Shader.

You can learn about the structure, syntax and rendering process of Surface Shaders.

The following content is recommended to be read in combination with internal/effects/builtin-standard.effect.

## Basic Structure

The Surface Shader code usually consists of several parts.
- `CCEffect`: Describes the techniques, passes, render states, and vertex attributes used in the shader.
- `Shared UBOs`: Defines uniforms that are needed by both vs and fs together for easy access.
- `Macro Remapping`: Maps some internal macros so that they can be displayed on the material panel.
- `Surface Functions`: Used to declare Surface functions related to Surface Shading.
- `Shader Assembly`: Used to assemble the code modules for each vs and fs.

For more details, please visit [Surface Shader Structure](./surface-shader-structure.md).

## CCEffect

To render an object onto the screen, the following information is needed.
- Model data( vertices, UV, normals, etc.)
- Lighting data
- Rotation, translation, scale in world space.
- Render passes
- Render states
- Textures
- Uniforms
- Shader code

Among them, model data, lighting information, and world space information are independent of the material, while texture, uniform, rendering state, shader code, and render process are part of the material information.

CCEffect describes the above material-related information, and together with the engine rendering pipeline, completes the rendering process of a model.

### technique

The built-in Surface Shader implements two rendering techniques, `opaque` and `transparent`. The former is used for rendering non-transparent objects, and the latter is used for rendering semi-transparent objects.

### pass

Each technique of the built-in Surface Shader has only one pass, all of which are in PBR.

Ignoring other details, we can see the outline of a Surface Shader as follows.

```
CCEffect %{
  techniques:
  - name: opaque
    passes:
    - vert: standard-vs
      frag: standard-fs
      properties: &props
        ...

  - name: transparent
    passes:
    - vert: standard-vs
      frag: standard-fs
      ...
      properties: *props
}%
```

### Shader Entry(vert and frag)

the `opaque` and `transparent` techniques are completely identical in terms of shader code, the only difference is in the render states.

You can see that they use the same vert and frag entries.

```glsl
- vert: standard-vs
  frag: standard-fs
```

### properties

Since `opaque` and `transparent` are completely identical in terms of shader code, the properties involved are the same.

All properties used in the render process are placed in the properties section. For syntax about properties, you can check [Optional Pass Parameters](./../pass-parameter-list.md)

### Section Reuse

In the properties section, you can see that the `properties` of `opaque` is defined as `properties: &props`, while the `properties` of `transparent` is defined as `properties: *props`。

This is a reuse mechanism of sections in CCEffect.

`properties: &props` means to name the current `properties` as `props`.

`properties: *props` means to use the `properties` named `props` as default value.

The result of the above configuration is: the `transparent` directly uses the `properties` of `opaque`.

### phase

By default, Surface Shader participates in the scene rendering stage. But there are also some special stages, such as shadows, reflection probe baking, etc.

For such requirements, we can add specific passes and mark the phase to achieve the purpose.

When the Cocos Creator executes rendering, it will get the pass of the corresponding phase in the material for rendering. If there is none, it means that this object does not participate in this phase.

In Surface Shader is shown as follows.
- forward-add: Used for the additional lighting phase, when the object is affected by lights other than the main light, this will be called.
- shadow-caster: Used for the shadow map rendering phase.
- reflect-map: Used for reflection probe baking

```ts
- &forward-add
    vert: standard-vs
    frag: standard-fs
    phase: forward-add
    ...
- &shadow-caster
    vert: shadow-caster-vs
    frag: shadow-caster-fs
    phase: shadow-caster
    ...
- &reflect-map
    vert: standard-vs
    frag: reflect-map-fs
    phase: reflect-map
    ...
```

As shown in the code above, the `phase` property is used to mark the participating phase of this pass. And `&forward-add`, `&shadow-caster`, `&reflect-map` are names given to this pass, making it easy for subsequent techniques to reuse.

For example, the `transparent` directly reuses the `forward-add` and the `shadow-caster` passes from `opaque`.

```ts
- name: transparent
    passes:
    - vert: standard-vs
        frag: standard-fs
        ...
        properties: *props
    - *forward-add
    - *shadow-caster
```

### Render State

As mentioned at the beginning. To complete the rendering of a model, not only define the rendering process and the required properties but also need to be combined the render state.

Render state mainly involves stencil test, depth test, rasterizer state, transparent blending, etc.

The same rendering process, properties, and shader code combined with different render states, can achieve different effects.

```ts
depthStencilState:
    depthFunc: equal
    depthTest: true
    depthWrite: false
blendState:
    targets:
    - blend: true
        blendSrc: one
        blendDst: one
        blendSrcAlpha: zero
        blendDstAlpha: one
rasterizerState:
    cullMode: front
```

Render states have a set of default values, and modifications can be made when necessary.

For example, `opaque` and `transparent` only differ in render states.

### Embedded Macros

```ts
    embeddedMacros: { CC_FORCE_FORWARD_SHADING: true }
```

Sometimes, we want to enable or disable some macros for a specific pass. You can use the `embeddedMacros` section to do this.

## includes

Surface Shader provides two mechanisms for code block references: header files and CCProgram. For details, please see [include](./includes.md).

## Shared UBO

Many constants are used by both vs and fs or are needed by multiple techniques and passes. Defining them together for easy access.

Shared UBOs are essentially part of the Shader code, written in GLSL.

```ts
CCProgram shared-ubos %{
  uniform Constants {
    vec4 tilingOffset;
    vec4 albedo;
    vec4 albedoScaleAndCutoff;
    vec4 pbrParams;
    vec4 emissive;
    vec4 emissiveScaleParam;
    vec4 anisotropyParam;
  };
}%
```

In the subsequent assembly process, you only need to add a single line `#include <shared-ubos>` to use.

## Macro Remapping

For more details about macro remapping, please refer to [Macro Definition and Remapping](./macro-remapping.md)。

In the built-in Surface Shader, the `CCProgram macro-remapping` segment is used to organize all the macro-remapping stuff, which makes it easier to manage.

As can be seen, in the built-in Surface Shader, `#pragma define-meta` is used to redirect many built-in macros to the panel.

```ts
CCProgram macro-remapping %{
  // ui displayed macros
  #pragma define-meta HAS_SECOND_UV
  #pragma define-meta USE_TWOSIDE
  #pragma define-meta IS_ANISOTROPY
  #pragma define-meta USE_VERTEX_COLOR

  #define CC_SURFACES_USE_SECOND_UV HAS_SECOND_UV
  #define CC_SURFACES_USE_TWO_SIDED USE_TWOSIDE
  #define CC_SURFACES_LIGHTING_ANISOTROPIC IS_ANISOTROPY
  #define CC_SURFACES_USE_VERTEX_COLOR USE_VERTEX_COLOR

  // depend on UI macros
#if IS_ANISOTROPY || USE_NORMAL_MAP
  #define CC_SURFACES_USE_TANGENT_SPACE 1
#endif

  // functionality for each effect
  #define CC_SURFACES_LIGHTING_ANISOTROPIC_ENVCONVOLUTION_COUNT 31
}%
```

## Surface Functions

In Surface Shader, two CCProgram sections are defined to handle the specific shader code.
- CCProgram surface-vertex: Used for handling vs-related calculations.
- CCProgram surface-fragment: Used for handling fs-related calculations.

### CCProgram surface-vertex

The built-in vs process can basically meet the requirements of Surface Shader, which makes surface-vertex very simple and clean.

We take the processing of the second UV as an example.

It first defines the `CC_SURFACES_VERTEX_MODIFY_UV` macro and then implements the `SurfacesVertexModifyUV` method.

```ts
#define CC_SURFACES_VERTEX_MODIFY_UV
void SurfacesVertexModifyUV(inout SurfacesStandardVertexIntermediate In)
{
    In.texCoord = In.texCoord * tilingOffset.xy + tilingOffset.zw;
    #if CC_SURFACES_USE_SECOND_UV
    In.texCoord1 = In.texCoord1 * tilingOffset.xy + tilingOffset.zw;
    #endif
}
```

This is the core mechanism of Surface Shader, which can rewrite internal functions through macro definitions, and meet specific rendering requirements without modifying the internal source code of the shader framework.

For more details, please refer to [Function Replacement Using Macros](function-replace.md) and [Surface Shader Built-in Replaceable Functions](surface-function.md)。

### CCProgram surface-fragment

`surface-fragment` mainly implements the filling of surface information needed for PBR calculation.

#### Macro Switch

```ts
#if USE_ALBEDO_MAP
    uniform sampler2D albedoMap;
    #pragma define-meta ALBEDO_UV options([v_uv, v_uv1])
#endif
```

We can see, in the built-in Surface Shader, all textures are wrapped by macro definitions. The advantage of this is that you can turn off the corresponding macros as needed to improve performance.

#### Macros selectable on the Material Panel

`#pragma define-meta` + name + `options([item0,item1,....])` can define a macro for users to choose.

Take the following code as an example.

```ts
#pragma define-meta ALBEDO_UV options([v_uv, v_uv1])
```

On the material panel, ALBEDO_UV will appear as a drop-down selection box. When the Shader compiles, it will be based on the user's selected value.

For example, if the user selects `v_uv1`, the generated final code is as below.

```ts
#define ALBEDO_UV v_uv1
```

```ts
#if USE_ALPHA_TEST
    #pragma define-meta ALPHA_TEST_CHANNEL options([a, r])
#endif

```

The same applies to ALPHA_TEST_CHANNEL. By default, the 'a' channel is used, but the 'r' channel can also be an option.

#### PBR Channels

```ts
#pragma define OCCLUSION_CHANNEL          r
#pragma define ROUGHNESS_CHANNEL          g
#pragma define METALLIC_CHANNEL           b
#pragma define SPECULAR_INTENSITY_CHANNEL a
```

Surface Shader uses a texture as a PBR map, and according to the definition, we can know the meaning of each channel.
- r: Ambient Occlusion
- r: Roughness
- b: Metallic
- a: Specular Intensity

#### Implementation

Like the surface-vertex, the surface-fragment also uses the function replacement mechanism to implement PBR parameter filling.

For more details, please refer to the following pages:
- [Function Replacement Using Macros](function-replace.md)
- [Surface Shader Built-in Replaceable Functions](surface-function.md)
- [Surface Shader Execution Flow](./shader-code-flow.md)

## Shader Assembly

The several CCPrograms mentioned above are listed as follows:
- shared-ubos
- macro-remapping
- surface-vertex
- surface-fragment

These are just some necessary components to implement the Surface Shader. To implement a complete Surface Shader, these parts need to be assembled in combination with other modules of the Surface Shader.

For the specific assembly mechanism, please refer to [Surface Shader Assembly](./shader-assembly.md)。

The assembled CCProgram is the content referenced by the CCEffect
- CCProgram standard-vs
- CCProgram shadow-caster-vs
- CCProgram standard-fs
- CCProgram shadow-caster-fs
- CCProgram reflect-map-fs
