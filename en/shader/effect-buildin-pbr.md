# Physically Based Rendering - PBR

Cocos Creator provides a designated physically based rendering (PBR) shader `builtin-standard.effect` starting from v3.x.

PBR simulates optical principles and patterns in the physical reality, producing convincingly realistic-looking imagery.

Benefits of adopting PBR include:

- Fidelity: PBR produces more realistic-looking renders by adopting lighting calculations based on physical realities.
- Consistency: PBR provides a standardized workflow for creating artistic assets for optimal render results.
- Modularity: PBR allows materials to be created regardless of lighting scenarios, which permits the same material to be used in different scenes and projects.

## Parameters

| Parameter | Description |
| :------- | :--- |
| tilingOffset | Scaling and offsetting the mesh’s UVs. Dimension x and y corresponds to scaling, z and w to offsetting. |
| albedo/mainColor | Albedo color, which is the base color for the material. |
| albedoMap/mainTexture | Albedo map. If assigned, colors from the map will be multiplied by albedo color. |
| albedoScale | Scale for albedo colorization. Used to define the weighted contribution of albedo color to the final color output. |
| alphaThreshold | Alpha test threshold value. Pixels with an alpha value lower than the threshold will be discarded. |
| normalMap | Normal map, used to enhance surface details. |
| normalStrenth | Normal mapping intensity, which translate into the level of ‘bumpiness’ produced by the normal map. |
| pbrMap<br>**R**（AO）<br>**G**（Roughness）<br>**B**（Metallic） | PBR parameter map. Values sampled from the map will be multiplied by the constant value.<br>R Channel：Ambient Occlusion<br>G Channel：Roughness<br>B Channel：Metallic |
| metallicRoughnessMap<br>**G**（Roughness）<br>**B**（Metallic） | Metallic-roughness map. Values sampled from the map will be multiplied by the constant value.<br>G Channel：Roughness<br>B Channel：Metallic |
| occlusionMap | Ambient occlusion map.<br>Values sampled from the map will be multiplied by the constant value. |
| occlusion | Ambient occlusion value |
| roughness | Roughness value |
| metallic | Metallic value |
| emissive | Emissive color, which is the color emanating from the material itself and isolated from lighting conditions. |
| emissiveMap | Emissive map.<br>If assigned, colors from the map will be multiplied by emissive color, which requires emissive color value to be higher than 0 (or any color other than pitch black.) |
| emissiveScale | Scale for emissive colorization.<br>Used to define the weighted contribution of emissive color to the final color output. |

## Macros

| Definition | Description |
| :---- | :--- |
| USE_BATCHING | Whether the renderable object is to be included in mesh batching. |
| USE_INSTANCING | Whether the renderable object is to be included in geometric instancing. |
| HAS_SECOND_UV | Whether the mesh has a second set of UV. |
| ALBEDO_UV | UV set used by albedo map. UV0 by default. |
| EMISSIVE_UV | UV set used by emissive map. UV0 by default. |
| ALPHA_TEST_CHANNEL | Designated channel (RGBA) for alpha testing. A (alpha) by default. |
| USE_VERTEX_COLOR | If enabled, vertex color will be multiplied by albedo color. |
| USE_ALPHA_TEST | Whether to enable alpha test (stencil masking.) |
| USE_ALBEDO_MAP | Whether to use albedo map. |
| USE_NORMAL_MAP | Whether to use normal map. |
| USE_PBR_MAP | Whether to use PBR parameter map (**By glTF specifications，RGB channels must correspond to ambient occlusion, roughness and metallic.**） |
| USE_METALLIC_ROUGHNESS_MAP | Whether to use metallic-roughness map (**By glTF specifications，GB channels must correspond to roughness and metallic.**） |
| USE_OCCLUSION_MAP | Whether to use ambient occlusion map (**By glTF specifications，R channels must correspond to ambient occlusion.**） |
| USE_EMISSIVE_MAP | Whether to use emissive map. |

## Production Guidelines

<br>![](./img/final_alarmclock.jpg#center)

The default PBR shader in Cocos Creator adopts the Metal / Roughness workflow. To correctly render imagery, it is required to assign values to the following parameters:

- Albedo
    - Albedo color can be assigned via the `Albedo` parameter in the material inspector.
- Roughness
    - Roughness value can be assigned via the `Roughness` parameter in the material inspector, which is within the range [0, 1].
- Metallic
    - Metallic value can be assigned via the `Metallic` parameter in the material inspector, which is within the range [0, 1].

Besides constant values, it is also advisable to assign texture maps for albedo, roughness and metallic parameters to better convey the artistic vision for the material. In addition, it is also possible to achieve better visuals by assigning normal maps to convey more structural details, ambient occlusion maps for detailed light & shade relations, and emissive maps for self-incandescence.

### Albedo

<br>![](./img/albedo.jpg#center)

Albedo expresses the material’s color diffusion under no additional lighting of external influences. Artistically, it can be viewed as the material’s color as generally observed by the naked eye.

In PBR specifications, albedo is defined as the combination of **diffuse color of non-metal materials** and **specular color of metallic materials.**

> Note: In Metal / Roughness workflow, diffuse color for all metallic materials should be black as colors on metallic materials are caused by specular lights. In other workflows, metallic color should be designated by specular color. Albedo textures created under such workflows will not be rendered with correct metallic colors in Cocos Creator’s default PBR shader.

Albedo can be assigned with a constant color via the `Albedo` parameter, or with an RGBA texture map in sRGB color space after enabling `USE ALBEDO MAP`.

In alignment with PBR specifications, albedo colors and textures should follow these criteria:

- Avoid extremely high or low sRGB color values. At maximum, the RGB values should not exceed **240.** At minimum, the RGB values should not exceed **30 - 50.**
- When expressing color for metallic materials, the RGB values should be within the range of **180 – 255** as metals typically have a 70% to 100% reflectivity rate.

### Roughness

<br>![](./img/roughness.jpg#center)

Roughness expresses the material’s level of reflectivity due to varying microscopic surface structures. Its value falls in the range of [0, 1].

At 0, it indicates that the material has an absolute smooth surface with 100% reflectivity.

At 1, it indicates that the material has an absolute rough surface with 0% reflectivity.

Roughness can be assigned with a constant value via the `Roughness` parameter in the material inspector, or with the **G (Green) channel** of an RGBA texture map in sRGB color space. This map can be assigned to the shader in the following ways:

- Enable `USE PBR MAP`, assign the map to parameter `PbrMap`.
- Enable `USE METALLIC ROUGHNESS MAP`, assign the map to parameter `MetallicRoughnessMap`.

### Metallic

<br>![](./img/metallic.jpg#center)

Metallic expresses the material’s property of being metal or non-metal. Its value falls in the range of [0, 1]. Typically, metallic takes the value of either 0 or 1.

At 0, it indicates that the material is non-metal.

At 1, it indicates that the material is metal.

At a float value between 0 and 1, it typically indicates the material is metal with non-metallic dirt and smudge on the surface.

> Note: When metallic is at 1, the material is deemed as metal and will display metallic properties which includes: lower value in albedo color compared to non-metal materials; specular color displays a mixture of the light source’s color and the material’s albedo color; higher level of reflectivity compared to non-metal materials. This is due to albedo being interpreted as color caused by specular lights as metallic value increments.

Metallic can be assigned with a constant value via the `Metallic` parameter in the material inspector, or with the **B (Blue) channel** of an RGBA texture map in sRGB color space. This map can be assigned to the shader in the following ways:

- Enable `USE PBR MAP`, assign the map to parameter `PbrMap`.
- Enable `USE METALLIC ROUGHNESS MAP`, assign the map to parameter `MetallicRoughnessMap`.

### Ambient Occlusion

<br>![](./img/ao.jpg#center)

Ambient occlusion expresses the light & shade relations of the material caused by surface structures. Artistically, it can be viewed as the material’s self-shadowing due to uneven surfaces.

Ambient occlusion can be assigned with with the **R (Red) channel** of an RGBA texture map in sRGB color space. This map can be assigned to the shader in the following way:

- Enable `USE PBR MAP`, assign the map to parameter `PbrMap`.
- Enable `USE METALLIC ROUGHNESS MAP`, assign the map to parameter `MetallicRoughnessMap`.
- Enable `USE OCCLUSION MAP`，assign the map to parameter `OcclusionMap`.

### Normal

<br>![](./img/normal.jpg#center)

Normal map is a texture map in sRGB color space using RGB values to represent vertex positions in tangent space. It can be used to bring additional vertex position data stored in the map to the 3D mesh for PBR calculations so that it can be rendered with detailed shading properties despite having a low number of vertices. Artistically, it can be viewed as a map expressing the detailed geometric structures on the surface of the mesh.

Typically, normal maps can be created in 2 ways:
- Create a mesh with high vertex count and one with low vertex count. Bake the vertex position data of the high-poly mesh onto a map using the low-poly mesh’s UVs.
- Convert 2D images into normal maps.

> Note: When baking normal maps, make sure the baker uses the right-hand coordinates system (Y-axis up) and MIKK tangent space algorithms.

### Emissive

Emissive expresses the self-emanating colors of the material.

Albedo can be assigned with a constant color via the `Albedo` parameter, or with an RGBA texture map in sRGB color space after enabling `USE ALBEDO MAP`. Emission intensity can be adjusted via the RGB channels of the `EmissiveScale` parameter.

> Note: To create an emissive material, it is usually necessary to give parameter `EmissiveScale` values higher than 1. When `EmissiveScale` is at 1, an emissive material produces the same shading properties as an unlit material.

### Stencil Masking

<br>![](./img/leaves.jpg#center)

When creating a material with a stencil, it is possible to discard fragments outside of the stencil by enabling the alpha test function. This can be done as follows:

- Store the stencil mask as the **alpha channel** or **red channel** of the albedo map.
- Create a new Cocos Creator default PBR material and assign the albedo map to the material.
- Enable `USE ALPHA TEST`.
- In the dropdown menu of `ALPHA TEST CHANNEL` select the channel where the stencil mask is stored in (alpha or red channel.)
- Adjust the `AlphaThreshold` property and discard fragments.
- If needed, apply normal, ambient occlusion or other maps to utilize other PBR shading capabilities to achieve better results.

### Transparency

Transparent or semi-transparent materials can be created by enabling the alpha blending function for the shader, which can be done by selecting `1-transparent` from the `Technique` parameter.

While switched to transparent mode, the shader functions the same way as in opaque mode. The guidelines above are still viable for material creation.

While alpha blending is enable, the render pipeline also switched to a different order for processing the depth of the 3D space. When switched to transparent mode, **make sure to enable the `DepthWrite` property under PipelineStates -> DepthStencilState.**

## PBR Parameter Assembly

![](../material-system/standard-material-graph.png)

For more information on rendering in PBR, please see： [PBR Theory](https://learnopengl-cn.github.io/07%20PBR/01%20Theory/#pbr)
