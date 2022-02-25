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

Roughness can be assigned with a constant value via the `Roughness` parameter in the material inspector, or with the **G (Green) channel** of or with an RGBA texture map in sRGB color space. This map can be assigned to the shader in the following ways:

- Enable `USE PBR MAP`, assign the map to parameter `PbrMap`.
- Enable `USE METALLIC ROUGHNESS MAP`, assign the map to parameter `MetallicRoughnessMap`.

### Metallic

<br>![](./img/metallic.jpg#center)

Metallic expresses the material’s property of being metal or non-metal. Its value falls in the range of [0, 1]. Typically, metallic takes the value of either 0 or 1.

At 0, it indicates that the material is non-metal.

At 1, it indicates that the material is metal.

At a float value between 0 and 1, it typically indicates the material is metal with non-metallic dirt and smudge on the surface.

> Note: When metallic is at 1, the material is deemed as metal and will display metallic properties which includes: lower value in albedo color compared to non-metal materials; specular color displays a mixture of the light source’s color and the material’s albedo color; higher level of reflectivity compared to non-metal materials. This is due to albedo being interpreted as color caused by specular lights as metallic value increments.

Metallic can be assigned with a constant value via the `Metallic` parameter in the material inspector, or with the **B (Blue) channel** of or with an RGBA texture map in sRGB color space. This map can be assigned to the shader in the following ways:

- Enable `USE PBR MAP`, assign the map to parameter `PbrMap`.
- Enable `USE METALLIC ROUGHNESS MAP`, assign the map to parameter `MetallicRoughnessMap`.

### 环境光遮蔽（Ambient Occlusion）

<br>![flakes.jpg](./img/ao.jpg#center)

环境光遮蔽（Ambient Occlusion）表达材质因表面的结构细节所导致的明暗关系。美术上，可以将环境光遮蔽理解为材质自身结构所产生的阴影。

用户可以使用一张 sRGB 颜色空间的 RGBA 贴图的**红通道**表达环境光遮蔽关系。在 Cocos Creator 默认 PBR 材质中，可以通过以下方式使用这张贴图：

- 勾选 `USE PBR MAP`，将贴图赋予 `PbrMap` 参数
- 勾选 `USE METALLIC ROUGHNESS MAP`，将贴图赋予 `MetallicRoughnessMap` 参数
- 勾选 `USE OCCLUSION MAP`，将贴图赋予 `OcclusionMap` 参数

### 法线（Normal）

<br>![flakes.jpg](./img/normal.jpg#center)

法线（Normal）贴图是一张用 sRGB 颜色空间的 RGB 数值代表模型切线空间的顶点坐标位置的贴图。其作用是将贴图中的顶点坐标数据叠加到模型自身的顶点坐标数据上参与 PBR 光影的计算，使顶点数量较低的低模也能够表现顶点数量较高的高模的光影变化效果。美术上，可以将法线贴图理解为一张表达物体表面结构细节的贴图。

法线贴图通常有两种制作方法：
- 分别制作一个顶点数量较高的高模和一个顶点数量较低的低模，将高模的顶点坐标数据烘培到一张使用低模的 UV 的贴图上
- 将一张 2D 图片转换为法线贴图

> 注意：在从高模烘培法线时，请确保烘培器使用右手坐标系（Y轴向上）和 MIKK 切线空间算法。
### 自发光（Emissive）

自发光颜色（Emissive）表达材质自身作为光源向外发光的颜色信息。

用户可以在材质属性面板的 `Emissive` 参数中直接赋予固有色颜色，或者勾选 `USE EMISSIVE MAP`，为材质赋予一张 sRGB 颜色空间的 RGBA 贴图。通过 `EmissiveScale` 参数可调节自发光颜色的红、绿、蓝通道的发光强度。

> 注意：自发光通常配合高于 1 的 `EmissiveScale` 数值使用。当 `EmissiveScale` 等于 1 时，自发光材质的效果等同于 unlit 材质效果。
### 模板遮罩（Stencil）

<br>![flakes.jpg](./img/leaves.jpg#center)

当渲染使用了模板遮罩（Stencil）的材质时，可以开启 Cocos Creator 默认 PBR 材质的 Alpha Test 功能，将遮罩之外的片元去除。操作过程可参考以下步骤：

- 将模板遮罩（Stencil）作为 **Alpha 通道**或**红通道**，存储在固有色贴图中；
- 创建一个新的 Cocos Creator 默认 PBR 材质，将固有色贴图赋予新材质；
- 勾选 `USE ALPHA TEST`；
- 在 `ALPHA TEST CHANNEL` 参数中选择模板遮罩（Stencil）所在的通道（Alpha 通道或红通道）；
- 使用 `AlphaThreshold` 参数，调节抛弃片元明度的阈值；
- 如果有需要，可以配合 Cocos Creator 默认 PBR 材质的其他功能，实现法线、环境光遮蔽等效果。

### 透明材质

当渲染透明或半透明的材质时，可以在材质的 `Technique` 参数中，选择 `1-transparent`，开启 Alpha Blending 功能。

当切换到透明材质模式时，材质所有的功能与不透明模式没有差别。用户可以依照上述的工作流程进行材质制作。

由于当 Alpha Blending 开启时，引擎的渲染管线对深度的控制发生了改变，因此在切换到透明材质模式时，**需要勾选材质属性面板 PipelineStates -> DepthStencilState 下的 `DepthWrite` 参数。**

## PBR主要参数组装流程

![pbr 组装流程](../material-system/standard-material-graph.png)

若要了解 PBR 的原理可参考： [PBR 理论](https://learnopengl-cn.github.io/07%20PBR/01%20Theory/#pbr)
