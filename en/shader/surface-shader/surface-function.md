# Replaceable Built-in Functions in Surface Shader

Surface Shader has unified the shading process and provides a loft custom functions to users. You can use the macro mechanism to rewrite related functions according to your needs.

## 1. Principle

The custom functions provided by Surface Shader have a default version internally and are called at the right time. You can refer to [Surface Shader Execution Flow](./shader-code-flow.md).

These functions are usually named in the way of `Surfaces+Shader+ShaderTypeName+Modify+Attribute`, such as.
- SurfacesVertexModifyLocalPos
- SurfacesVertexModifyLocalNormal
- SurfacesVertexModifyLocalTangent

All functions can be viewed at [`internal/chunks/surfaces/default-functions/`](https://github.com/cocos/cocos-engine/tree/v3.8.0/editor/assets/chunks/surfaces/default-functions).

**If you want to replace the implementation of a function, you can do so by pre-defining the macro corresponding to that function.**.

For example, you can pre-define the `CC_SURFACES_VERTEX_MODIFY_WORLD_POS` macro, so that Surface Shader can use your defined function to calculate the world position. The sample code is as follows.

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

If you are not familiar with the function replacement mechanism in Surface Shader, you can first refer to [Function Replacement Using Macros](./function-replace.md).

> The advantage of this method is that it can easily extend a variety of different material data structures, lighting models, and render usages, and does not need to modify the built-in Surface Shader code.

## 2. Common Replaceable Functions for VS

The replaceable functions for vs are defined in the internal/chunks/surfaces/default-functions/common-vs.chunk file.

The built-in functions for vs all have the `SurfacesStandardVertexIntermediate` structure as parameter, which stores the data of vs inputs and outputs. Shader writers don't need to worry about the specific vertex input and output processing, they just need to focus on the modification of certain data.

| Macro                                  | Function                           | Material Type | Description                                                     |
| ------------------------------------------- | ---------------------------------------- | -------------- | ------------------------------------------------------------ |
| CC_SURFACES_VERTEX_MODIFY_LOCAL_POS         | vec3 SurfacesVertexModifyLocalPos        | Common         | Used to modify local position                                     |
| CC_SURFACES_VERTEX_MODIFY_LOCAL_NORMAL      | vec3 SurfacesVertexModifyLocalNormal     | Common         | Used to modify local normal                                     |
| CC_SURFACES_VERTEX_MODIFY_LOCAL_TANGENT     | vec4 SurfacesVertexModifyLocalTangent    | Common         | Used to modify local tangent and mirror normal marker                       |
| CC_SURFACES_VERTEX_MODIFY_LOCAL_SHARED_DATA | void SurfacesVertexModifyLocalSharedData | Common         | If some textures and calculations need to be used in multiple material nodes, they can be performed in this function, called before world transformation, directly modifying the three local parameters inside the `SurfaceStandardVertexIntermediate` structure. |
| CC_SURFACES_VERTEX_MODIFY_WORLD_POS         | vec3 SurfacesVertexModifyWorldPos        | Common         | Used to modify world position.
| CC_SURFACES_VERTEX_MODIFY_CLIP_POS          | vec4 SurfacesVertexModifyClipPos         | Common         | Used to modify position in clip space (projected position)         |
| CC_SURFACES_VERTEX_MODIFY_UV                | void SurfacesVertexModifyUV              | Common         | Used to modify uv coordinates                 |
| CC_SURFACES_VERTEX_MODIFY_WORLD_NORMAL      | vec3 SurfacesVertexModifyWorldNormal     | Common         | Used to modify world normal                     |
| CC_SURFACES_VERTEX_MODIFY_ SHARED_DATA      | void SurfacesVertexModify SharedData     | Common         | If some textures and calculations need to be used in multiple material nodes, they can be performed in this function, directly modifying the parameters inside the `SurfaceStandardVertexIntermediate` structure, reducing performance consumption |

## 3. Common Replaceable Functions for FS

The replaceable functions for FS are composed of PBR and Toon, which are located in the following two files.
- internal/chunks/surfaces/default-functions/standard-fs.chunk
- internal/chunks/surfaces/default-functions/toon-vs.chunk

Most of the replaceable functions for FS don't have parameter. Shader writers need to process them in combination with [FS Inputs](./fs-input.md). For some special-purpose functions, corresponding parameters are also provided. For which situation they belong to, please refer to the function definition.

| Macro                                             | Function                                       | Material Type | Description                                                     |
| ------------------------------------------------------- | ---------------------------------------------------- | -------------- | ------------------------------------------------------------ |
| CC_SURFACES_FRAGMENT_MODIFY_ BASECOLOR_AND_TRANSPARENCY | vec4 SurfacesFragmentModify BaseColorAndTransparency | Common         | Used to modify the base color, including alpha channel |
| CC_SURFACES_FRAGMENT_ALPHA_CLIP_ONLY                    | vec4 SurfacesFragmentModify AlphaClipOnly            | Common         | Used to process alpha test |
| CC_SURFACES_FRAGMENT_MODIFY_ WORLD_NORMAL               | vec3 SurfacesFragmentModify WorldNormal              | Common         | Used to modify world normal                        |
| CC_SURFACES_FRAGMENT_MODIFY_ SHARED_DATA                | void SurfacesFragmentModify SharedData               | Common         | If some textures and calculations need to be used in multiple material nodes, they can be performed in this function, directly modifying the parameters inside the Surface structure, reducing performance consumption, similar to the surf() function in legacy shader. Necessary header files need to be included before defining the function |
| CC_SURFACES_FRAGMENT_MODIFY_ WORLD_TANGENT_AND_BINORMAL | void SurfacesFragmentModify WorldTangentAndBinormal  | Standard PBR   | Used modify world tangent                        |
| CC_SURFACES_FRAGMENT_MODIFY_ EMISSIVE                   | vec3 SurfacesFragmentModify Emissive                 | Standard PBR   | Used to modify emissive                                       |
| CC_SURFACES_FRAGMENT_MODIFY_ PBRPARAMS                  | vec4 SurfacesFragmentModify PBRParams                | Standard PBR   | Used to modify PBR parameters vec4(ao, roughness, metallic, specularIntensity) |
| CC_SURFACES_FRAGMENT_MODIFY_ ANISOTROPY_PARAMS          | vec4 SurfacesFragmentModify AnisotropyParams         | Standard PBR   | Used to modify anisotropy-related parameters vec4(rotation, shape, unused, unused)  |
| CC_SURFACES_FRAGMENT_MODIFY_ BASECOLOR_AND_TOONSHADE    | void SurfacesFragmentModify BaseColorAndToonShade    | Toon           | Used to modify the base color and toon shade                                           |
| CC_SURFACES_FRAGMENT_MODIFY_ TOON_STEP_AND_FEATHER      | vec4 SurfacesFragmentModify ToonStepAndFeather       | Toon           | Used to modify step and feather                                             |
| CC_SURFACES_FRAGMENT_MODIFY_ TOON_SHADOW_COVER          | vec4 SurfacesFragmentModify ToonShadowCover          | Toon           | Used to modify toon shadow cover                                             |
| CC_SURFACES_FRAGMENT_MODIFY_ TOON_SPECULAR              | vec4 SurfacesFragmentModify ToonSpecular             | Toon           | Used to modify toon specular                                             |
| CC_SURFACES_LIGHTING_MODIFY_FINAL_RESULT                | void SurfacesLightingModifyFinalResult               | Common         | Custom lighting model, can modify the previously calculated lighting result, such as adding outline light, necessary header files need to be included before defining the function. |
