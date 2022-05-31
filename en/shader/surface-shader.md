# Surface Shader

As rendering becomes more and more demanding in the game, shader implementation becomes more complex. In order to provide an efficient and unified shader process, in v3.5.1, we have added the Surface Shader framework.

Developers can find the corresponding shaders and shader fragments in **Assets -> internal -> effect -> surfaces** and **Assets -> internal -> chunk -> surfaces**.

Surface Shader uses a unified rendering process and structure that allows users to create surface material information in clean code, specifying the lighting and shading models used for compositing. The advantages over the old version (Legacy Shader) are easier to write and maintain, better version compatibility, and less prone to rendering errors. And you can get a lot of public features from the unified process, such as unified full-scene lighting and Debug View debugging capabilities.

Creator is also easier to extend a variety of common complex materials to provide users, the future will also support Shader Graph automatic generation of Effect code, can greatly improve the efficiency of Shader developers. Once the lighting and shading mode is specified, the process will follow the established path and does not support temporary masking or changing some internal calculations. For such needs, please use Legacy Shader.

Surface Shader is still based on [Cocos Effect syntax](../material-system/effect-syntax.md), and the previous definitions of material parameters, technique, pass and render state can be fully reused.

## Related Concepts

Before understanding Surface Shader, there are a few concepts that need to be clarified.

### 1. Rendering Usage

Describes where the object needs to be rendered to.

We have a number of render passes for rendering the same object to different texture data, each of which has a built-in use. For example, the most commonly used **render to scene** can be used directly for screen display, or render shadow casts **render to shadow map**, or **render to dynamic environment reflection** to generate a reflection map, etc.

This section can be found in **Assets -> internal -> chunk -> shading-entries -> main-functions**.

![render-to](img/render-to-xxx.png)

| Common Rendering Uses                               | File Locations         | Notes           |
| :--------------------------------------------------- | :-------------------- | :-------------- |
| render-to-scene (default)                           | render-to-scene        |                 |
| render-to-shadowmap                                 | render-to-shadowmap    |                 |
| render-to-environment                               | render-to-reflectmap   | engine reserved |
| render-to-cartoon stroke                            | render-silhouette-edge |                 |
| render sky                                          | misc/sky               |                 |
| post-processing or general-purpose computation Pass | misc/quad              | engine reserved |

### 2. Lighting Model

Describe how the microstructure and inherent optical properties of an object's surface affect and act on light.

For example, plastic will produce isotropic circular highlights, hair will produce anisotropic streaked highlights, light will be scattered on the skin, while on an object like a mirror, which is closer to an ideal optical surface, the vast majority of light will only be reflected along the angle of reflection, etc.

| Illumination Model Name | Description |
| :-- | :-- |
| standard | PBR lighting, support GGX BRDF distribution of isotropic and anisotropic lighting, support convolutional ambient lighting |
| toon | simple cartoon lighting, step lighting effect |

### 3. Surface Material Model

Explain how some physical parameters of the object surface (albedo, roughness, etc.) affect the lighting results.

Often materials and lighting models must be used in association, and we will gradually expand the commonly used materials and lighting models.

| Material Model Name | Description |
| :-- | :-- |
| standard | Standard PBR material with roughness and metallic description, similar to material nodes in SP, Blender, Maya, etc. |
| toon | A simple cartoon material with multiple shade color treatments. |

### 4. Shader Stage

Rendering is done by different shaders, with different stages dealing with vertex, pixel or compute, as shown in the following table.

| Shader Stage    | Identifier |
| :-------------- | :--------- |
| Vertex Shader   | vs         |
| Fragment Shader | fs         |
| Computer Shader | cs         |

## Framework

In addition to the same definitions of CCEffect parameters, technique and UBO memory layout as Cocos Effect, there is no need to consider the handling of various internal macros, shader input and output variables, Instancing[^1], tedious vertex transformations, global pixel effects and detailed calculations for each rendering use.

A typical Surface Shader code usually consists of three parts.

- `Macro Remapping`: Maps (part of) the macro names declared or used by the user in Effect to internal Surface macro names.
- `Surface Functions`: Used to declare Surface functions related to surface material information.
- `Shader Assembly`: code module for assembling each Vertex Shader and Fragment Shader.

The built-in shader `surfaces/standard.effect` is used here as an example to illustrate the code framework of the Surface Shader.

![effect](img/surface-effects.png)

### Macro Remapping

Some macro switches are used in the internal calculations of Surface Shader, which need to be specified according to the corresponding macro names in the Effect. Considering that the macro names in the Effect are displayed directly in the material panel, the advantage of this is that the names in the Effect are freely available to the user without affecting the internal calculations in the Surface.

These macros start with `CC_SURFACES_` and the following is the complete list of macros.

| Macro Name | Type | Meaning |
| :--- | :--- | :-- |
| CC_SURFACES_USE_VERTEX_COLOR                          | BOOL | Whether to use vertex color |
| CC_SURFACES_USE_SECOND_UV                             | BOOL | Whether to use 2uv |
| CC_SURFACES_USE_TWO_SIDED                             | BOOL | Whether to use double-sided normals |
| CC_SURFACES_USE_TANGENT_SPACE                         | BOOL | Whether to use tangent space (must be on when using normal map or anisotropy) |
| CC_SURFACES_TRANSFER_LOCAL_POS                        | BOOL | Whether to access model space coordinates in FS |
| CC_SURFACES_LIGHTING_ANISOTROPIC                      | BOOL | Whether to enable anisotropic materials |
| CC_SURFACES_LIGHTING_ANISOTROPIC_ENVCONVOLUTION_COUNT | UINT | The number of anisotropic ambient light convolution samples, 0 means convolution calculation is off, only valid when anisotropy is on |
| CC_SURFACES_LIGHTING_ANISOTROPIC_ENVCONVOLUTION_COUNT |
| CC_SURFACES_USE_REFLECTION_DENOISE                    | BOOL | Whether to turn on ambient reflection denoising |
| CC_SURFACES_USE_LEGACY_COMPATIBLE_LIGHTING | BOOL | Whether or not to enable legacy-compatible lighting mode, which makes the rendering effect identical to legacy/standard.effect and facilitates upgrades |

> **NOTE**: These macros can be left undefined and are automatically defined internally to the default value of 0; they can also be defined directly to 0 or some other value, indicating that they are forced off or on in this Effect and user adjustment is disabled.

Searching for the `CCProgram macro-remapping` paragraph, you can see that the content consists of the following three parts.

![macro-remapping](img/macro-remapping.png)

#### 1. Macros Not Used In The Surface Function

```glsl
// ui displayed macros not used in this effect file
#pragma define-meta HAS_SECOND_UV
#pragma define-meta USE_TWOSIDE
#pragma define-meta USE_REFLECTION_DENOISE
#pragma define-meta IS_ANISOTROPY
#pragma define-meta USE_COMPATIBLE_LIGHTING
    
#define CC_SURFACES_USE_SECOND_UV HAS_SECOND_UV
#define CC_SURFACES_USE_TWO_SIDED USE_TWOSIDE
#define CC_SURFACES_USE_REFLECTION_DENOISE USE_REFLECTION_DENOISE
#define CC_SURFACES_LIGHTING_ANISOTROPIC IS_ANISOTROPY
#define CC_SURFACES_USE_LEGACY_COMPATIBLE_LIGHTING USE_COMPATIBLE_LIGHTING   
```

Since the Surface Shader streamlines a lot of unnecessary public process code, such as VS FS pass-parameter definitions, etc., code like ~~`#if HAS_SECOND_UV`~~, which existed in the old process before, no longer exists. For such macros, they must be pre-defined here **`#pragma define-meta MACRONAME`** so that they can be displayed in the material panel.
Once defined, the next line can use the standard GLSL predefined **`#define CC_SURFACES_MACRONAME MACRONAME`**.

#### 2. Macros Used In The Surface Function

```glsl
// ui displayed macros used in this effect file
#define CC_SURFACES_USE_VERTEX_COLOR USE_VERTEX_COLOR
#if IS_ANISOTROPY || USE_NORMAL_MAP
  #define CC_SURFACES_USE_TANGENT_SPACE 1
#endif
```

This part is much simpler, just define it as **#define CC_SURFACES_MACRONAME MACRONAME**.
But `CC_SURFACES_USE_TANGENT_SPACE` macro should be paid special attention, usually with normal mapping or anisotropy on, you have to turn on this macro, otherwise there may be compilation errors.

#### 3. Internal Functional Macros

```glsl
// functionality for each effect
#define CC_SURFACES_LIGHTING_ANISOTROPIC_ENVCONVOLUTION_COUNT 31
```

Just define the desired value directly.

### Surface Function

**The function of each material function is similar to the output of a material parameter to a specified material node in the material editor of DCC (Digital Content Creation) software**. Similar to：

![surface-node](img/surface-node.png)

#### 1. Definition

Surface material function blocks can be defined using `CCProgram` or a separate chunk.

> **Note**: The function blocks used by VS and FS must be separate. Generally speaking all VSs share one and all FSs share one. In our case `standard-vs` and `shadow-caster-vs` share the `surface-vertex` block, while `standard-fs` and `shadow-caster-fs` share the `surface-fragment` block.
>
> The advantage of using this approach is that all the user-defined animation and material code only needs to be written in one copy, but can be kept uniform across rendering uses.

Surface Shader provides simple default functions internally, so **these functions are not mandatory**, **if you want to overload a function, you need to predefine the macro corresponding to that function to do so**. These functions are named with `Surfaces + ShaderStage name` followed by the function description. They can be found in [editor/assets/chunks/surfaces/default-functions](https://github.com/cocos/cocos-engine/tree/v3.5.1/editor/assets/chunks/surfaces/default-functions) to see the specific definition and implementation of each Surface function in different material models, e.g.

```glsl
#define CC_SURFACES_VERTEX_MODIFY_WORLD_POS
vec3 SurfacesVertexModifyWorldPos(in SurfacesStandardVertexIntermediate In)
{
  vec3 worldPos = In.worldPos;
  worldPos.x += sin(cc_time.x * worldPos.z);
  worldPos.y += cos(cc_time.x * worldPos.z);
  return worldPos;
}
```

Pre-defining the `CC_SURFACES_VERTEX_MODIFY_WORLD_POS` macro allows you to ignore the internal default functions and let the Surface Shader use the functions you define to calculate the material parameters.

> **Note**: The advantage of using this approach is that it is convenient to extend many different material models and code version upgrades. The functions added in the new version can be used with new names and parameters and still call the functions defined in the old version to get the calculation results without writing duplicate code and without worrying about compilation errors after the upgrade.

#### 2. VS Corresponding Functions List

The processing in VS has relatively little to do with the material model, so here we use generic functions with `SurfacesStandardVertexIntermediate` structures, which store the VS input and output data. The user no longer needs to care about the specific vertex input and output process, but only needs to focus on whether a certain data needs to be modified and how.

| Predefined macros | Corresponding function definitions | Corresponding material models | Function descriptions |
| :--- | :-- | :-- | :-- | :-- |
| CC_SURFACES_VERTEX_MODIFY_LOCAL_POS | vec3 SurfacesVertexModifyLocalPos | Common | Returns the modified model space coordinates |
| CC_SURFACES_VERTEX_MODIFY_WORLD_POS | vec3 SurfacesVertexModifyWorldPos | Common | Returns the modified world space coordinates (world space animation) |
| CC_SURFACES_VERTEX_MODIFY_CLIP_POS | vec4 SurfacesVertexModifyClipPos | Common | Returns the modified clipping (NDC) space coordinates (usually used to modify depth) |
| CC_SURFACES_VERTEX_MODIFY_UV | void SurfacesVertexModifyUV | Common | Modifies UV0 and UV1 within the structure (using tiling, etc.) |
| CC_SURFACES_VERTEX_MODIFY_WORLD_NORMAL | vec3 SurfacesVertexModifyWorldNormal | Common | Returns the modified world space normals (world space animation) |

#### 3. FS Corresponding Functions List

Most of the functions in FS modify only one item and are returned directly in the Surface function. Some functions may modify more than one (e.g. UV and tangent vector), in which case multiple values are passed in the argument list for modification. Please refer to the function definition for details on which case.

| Predefined macros | Corresponding function definitions | Corresponding material models | Function descriptions |
| :--- |:--- |:--- |:--- |
| CC_SURFACES_FRAGMENT_MODIFY_ BASECOLOR_AND_TRANSPARENCY | vec4 SurfacesFragmentModify BaseColorAndTransparency | Common | Returns the modified base color (rgb channel) and transparency values (a channel) |
| CC_SURFACES_FRAGMENT_MODIFY_ WORLD_NORMAL | vec3 SurfacesFragmentModify WorldNormal | Common | Returns the modified pixel normals (usually normal mapping) |
| CC_SURFACES_FRAGMENT_MODIFY_ SHARED_DATA | void SurfacesFragmentModify SharedData | Common | If some mapping and calculations need to be used in multiple material nodes, they can be done in this function, directly modifying the Surface structure This function can be used to modify the parameters in the surface structure directly, reducing performance costs.
| CC_SURFACES_FRAGMENT_MODIFY_ WORLD_TANGENT_AND_BINORMAL | void SurfacesFragmentModify WorldTangentAndBinormal | Standard PBR | Modify Surface structure The world tangent space vector in the body |
| CC_SURFACES_FRAGMENT_MODIFY_ EMISSIVE | vec3 SurfacesFragmentModify Emissive | Standard PBR | Returns the modified self-illumination color |
| CC_SURFACES_FRAGMENT_MODIFY_ PBRPARAMS | vec4 SurfacesFragmentModify PBRParams | Standard PBR | Returns the modified PBR parameters (ao, roughness, metallic. specularIntensity) | 
| CC_SURFACES_FRAGMENT_MODIFY_ ANISOTROPY_PARAMS | vec4 SurfacesFragmentModify AnisotropyParams | Standard PBR | Returns modified anisotropy parameters (rotation, shape. unused, unused) |
| CC_SURFACES_FRAGMENT_MODIFY_ BASECOLOR_AND_TOONSHADE | void SurfacesFragmentModify BaseColorAndToonShade | Toon | Modify Toon Render Base Color |
| CC_SURFACES_FRAGMENT_MODIFY_ TOON_STEP_AND_FEATHER | vec4 SurfacesFragmentModify ToonStepAndFeather | Toon | Returns the modified parameters |
| CC_SURFACES_FRAGMENT_MODIFY_ TOON_SHADOW_COVER | vec4 SurfacesFragmentModify ToonShadowCover | Toon | Returns the modified parameters |
| CC_SURFACES_FRAGMENT_MODIFY_ TOON_SPECULAR | vec4 SurfacesFragmentModify ToonSpecular | Toon | Returns the modified parameters |

#### 4. VS Input Value Acquisition

The VS input values are in the `SurfacesStandardVertexIntermediate` structure and are passed in as parameters to the Surface function:

| Vertex Shader Inputs | Type | Requires macro to be turned on when using | Meaning                              |
| :-------------------- | :---- | :----------------------------------------- | :------------------------------------ |
| position             | vec4 | N/A                                       | Local Position                       |
| normal               | vec3 | N/A                                       | Local Normal                         |
| tangent              | vec4 | CC_SURFACES_USE_TANGENT_SPACE             | Local Tangent and Mirror Normal Sign |
| color                | vec4 | CC_SURFACES_USE_VERTEX_COLOR              | Vertex Color                         |
| texCoord             | vec2 | N/A                                       | UV0                                  |
| texCoord1            | vec2 | CC_SURFACES_USE_SECOND_UV                 | UV1                                  |
| clipPos              | vec4 | N/A                                       | Clip(NDC) Position                   |
| worldPos             | vec3 | N/A                                       | World Position                       |
| worldNormal          | vec4 | N/A                                       | World Normal and Two Side Sign       |
| worldTangent         | vec3 | CC_SURFACES_USE_TANGENT_SPACE             | World Tangent                        |
| worldBinormal        | vec3 | CC_SURFACES_USE_TANGENT_SPACE             | World Binormal                       |

#### 5. FS Input Value Acquisition

FS input values are currently used as macros, and most of them are internally fault-tolerant and can be accessed at will regardless of the corresponding macro conditions.

| Fragment Shader Input | Type  | Requires macro to be enabled when using | Meaning            |
| :--------------------- | :----- | :--------------------------------------- | :------------------ |
| FSInput_worldPos      | vec3  | N/A                                     | World Position     |
| FSInput_worldNormal   | vec3  | N/A                                     | World Normal       |
| FSInput_faceSideSign  | float | N/A                                     | Two Side Sign      |
| FSInput_texcoord      | vec2  | N/A                                     | UV0                |
| FSInput_texcoord1     | vec2  | N/A                                     | UV1                |
| FSInput_vertexColor   | vec4  | N/A                                     | Vertex Color       |
| FSInput_worldTangent  | vec3  | N/A                                     | World Tangent      |
| FSInput_mirrorNormal  | float | N/A                                     | Mirror Normal Sign |
| FSInput_localPos      | vec4  | CC_SURFACES_TRANSFER_LOCAL_POS          | Local Position     |

### Shader Assembly

We use the form of `include` different module headers to assemble the shader of each Pass in order.

Searching the `standard-fs` section, you can see that the whole Fragment Shader assembly process is divided into 6 parts

#### 1. Macros

The necessary internal macro mapping and generic macro definitions need to be included first.

The macro mapping uses the custom CCProgram code block or chunk file described in the Macro Remapping paragraph.

Next you need to include the common macro definition file `common-macros`, as follows.

```glsl
Pass standard-fs:
#include <macro-remapping>
#include <surfaces/effect-macros/common-macros>
```

For special rendering passes, many shader functions are turned off, so there is no need to include `common-macros`, just the macro definition file for the corresponding rendering use.

```glsl
Pass shadow-caster-fs:
#include <surfaces/effect-macros/render-to-shadowmap>
```

#### 2. Shader Generic Header File

Select the corresponding generic header file based on the **current Shader Stage name**, as follows:

```glsl
Vertex Shader：
#include <surfaces/includes/common-vs>
Fragement Shader：
#include <surfaces/includes/common-fs>
```

#### 3. Surface Utility Functions

Use the custom CCProgram code block or chunk file described in the Surface Function paragraph.

Since the Surface function may also use the UBO memory layout associated with the Effect parameter, it should also be Include in advance, otherwise it will compile with errors.

This is shown below.

```glsl
#include <shared-ubos>
#include <surface-fragment>
```

#### 4. Lighting Model

This section is **optional and limited to the default use of rendering to the scene and Fragment Shader use**.

Use **Lighting Model Name** to select the corresponding header file, as follows.

```glsl
Standard PBR Lighting：
#include <lighting-models/includes/standard>
Toon Lighting：
#include <lighting-models/includes/toon>
```

#### 5. Surface Materials and Shading Models

This section is **optional and is only used for the default purpose of rendering to the scene**.

**Material Model Name + Shader Stage Name** to select the corresponding header file, as follows.

```glsl
Vertex Shader：
#include <surfaces/includes/standard-vs>
Fragement Shader：
#include <surfaces/includes/standard-fs>
```

#### 6. Main Shader Function

Use the current Pass **rendering use name + Shader Stage name** to select the corresponding main function header file.

```glsl
Pass standard-fs:
#include <shading-entries/main-functions/render-to-scene/fs>
Pass shadow-caster-fs:
#include <shading-entries/main-functions/render-to-shadowmap/fs>
```

## Debug View

When using the Surface Shader framework, the built-in Debug View feature will be available. By selecting the corresponding Debug mode in the interface, you can view the model, materials, lighting and other computational data on the same screen, so that you can quickly locate the problem when the rendering effect is abnormal.

This feature is expected to be available in v3.6.

## Advanced Usage

1. add your own vs output and fs input: VS calculates and outputs the value in a Surface function after defining a new varying variable
2. fs define a new varying variable and then get and use that value in a Surface function.
3. You can even mix Surface Shader and Legacy Shader in different Shader main functions (but make sure the varying vertex data is the same in both phases).

## Public function libraries

The library headers can be found under **assets -> internal -> chunks -> common** folder in different categories.

The functions in the library do not depend on any internal data (engine related uniform, mapping, etc.) and can be used directly as tool functions.

Surface already automatically contains common public function headers internally, which can be classified according to type as:

| Folder Name | Function Usage |
| :-------- | :---------------------------------------- |
| color | color-related functions (color space, tonemapping, etc.) |
| data | Data-related functions (compression and decompression, etc.) |
| debug | Debug View-related functions |
| effect | Scene effect-related functions (water, fog, etc.) |
| lighting | lighting-related features (brdf, bsdf, attenuation, baking, etc.) |
| math | math library (coordinate transformation, numerical determination and operation, etc.)
| mesh | model-related functions (material conversion, model animation, etc.)
| shadow | shadow-related functions (pcf, hcs, etc.)
| texture | mapping-related functions (sampling, mip calculation, etc.) |

[^1]: Custom GPU geometry instantiation properties are not supported.
