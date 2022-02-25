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

## 制作标准

<br>![flakes.jpg](./img/final_alarmclock.jpg#center)

Cocos Creator 中的默认 PBR 材质使用 PBR 流程中的 Metal / Roughness 工作流。在使用 Cocos Creator 默认 PBR 材质进行渲染时，为获得正确的渲染效果，最少需要为材质系统提供以下数据：

- 固有色（Albedo）颜色
    - 可在材质属性面板中的 `Albedo` 参数中直接设置
- 粗糙度（Roughness）数值
    - 可在材质属性面板中的 `Roughness` 参数中直接设置，粗糙度数值的范围是 [0, 1]
- 金属度（Metallic）数值
    - 可在材质属性面板中的 `Metallic` 参数中直接设置，金属度数值的范围是 [0. 1]

除了在材质属性面板中直接赋予数值以外，也可以为材质的固有色（Albedo）、粗糙度（Roughness）、金属度（Metallic）赋予贴图，以更精准地进行材质表达。除此之外，可以为材质赋予法线（Normal）贴图以获得更多表面结构细节，环境光遮蔽（Ambient Occlusion）贴图以获得细节明暗关系，自发光（Emissive）贴图以获得自发光效果。

### 固有色（Albedo）

<br>![flakes.jpg](./img/albedo.jpg#center)

固有色（Albedo）表达材质在没有光照的情况下所表达的颜色信息。美术上，可以将固有色理解为材质用肉眼观察时所表达的颜色信息。

在 PBR 流程中，固有色代表的是材质**非金属**部分的**漫反射**（Diffuse）颜色，与材质**金属**部分的**高光**（Specular）颜色的集合。

> 注意：在 Metal / Roughness 工作流中，所有金属的漫反射（Diffuse）颜色都是黑色，金属肉眼所见的颜色表现是由其反射光线所造成的，因此在非 Metal / Roughness 工作流中，金属的颜色由高光（Specular）颜色决定。使用非 Metal / Roughness 工作流制作的颜色贴图，将不能在 Cocos Creator 默认 PBR 材质中正确渲染金属的颜色信息。
用户可以在材质属性面板的 Albedo 参数中直接赋予固有色颜色，或者勾选 `USE ALBEDO MAP`，为材质赋予一张 sRGB 颜色空间的 RGBA 贴图。

依据标准 PBR 流程的制作准则，为了获得符合物理现实的渲染效果，在制作固有色贴图的过程中需要注意:
- 固有色的 sRGB 数值应当避免极高或极低的取值：最高不应超过 **240**；最低不应低于 **30 - 50**
- 在表达金属的固有色时，应当遵循金属 70% - 100% 反射率的物理规律，其 sRGB 取值应在 **180 – 255** 的范围之内

### 粗糙度（Roughness）

<br>![flakes.jpg](./img/roughness.jpg#center)

粗糙度（Roughness）表达材质因其表面细微的结构细节所导致的反光强弱程度，其数值范围为 [0, 1]。

当粗糙度为 0 时，代表材质表面绝对光滑，反射率达到 100%。

当粗糙度为 1 时，代表材质表面绝对粗糙，反射率为 0%。

用户可以在材质属性面板的 `Roughness` 参数中直接赋予粗糙度数值，或者使用一张 sRGB 颜色空间的 RGBA 贴图的**绿通道**表达粗糙度值。在 Cocos Creator 默认 PBR 材质中，可以通过以下方式使用这张贴图：

- 勾选 `USE PBR MAP`，将贴图赋予 `PbrMap` 参数
- 勾选 `USE METALLIC ROUGHNESS MAP`，将贴图赋予 `MetallicRoughnessMap` 参数

### 金属度（Metallic）

<br>![flakes.jpg](./img/metallic.jpg#center)

金属度（Metallic）表达材质的金属属性，其数值范围为 [0, 1]。在使用过程中，通常选择 0 或者 1 作为取值。

当金属度为 0 时，代表材质为非金属。

当金属度为 1 时，代表材质为金属。

当金属度为 0 - 1 的浮点数时，通常用于表达表面带有非金属脏迹的金属。

> 注意：当金属度为 1 时，材质被认定为金属，同时会表现金属的特征，这包括：固有色比金属度为 0 时明度和饱和度更低；材质的高光部分颜色混合了材质的固有色；反射更加强烈。这是因为随着金属度的提升，固有色被认定为反射光线造成的颜色。
用户可以在材质属性面板的 `Metallic` 参数中直接赋予金属度数值，或者使用一张 sRGB 颜色空间的 RGBA 贴图的**蓝通道**表达金属度值。在 Cocos Creator 默认 PBR 材质中，可以通过以下方式使用这张贴图：

- 勾选 `USE PBR MAP`，将贴图赋予 `PbrMap` 参数
- 勾选 `USE METALLIC ROUGHNESS MAP`，将贴图赋予 `MetallicRoughnessMap` 参数

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
