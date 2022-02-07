# 基于物理的光照模型（Physically based rendering PBR）

自 3.x 起，引擎提供了基于物理渲染（PBR）的光照算法：`builtin-standard`。

PBR 根据现实中光线的原理，模拟出近似于真实物理光照的效果。

PRB 的优势在于：

- 制作标准化
- 纹理不受光照变化的影响

## 参数

| 参数 | 说明 |
| :------- | :--- |
| tilingOffset | 模型 UV 的平铺和偏移量，xy 对应平铺，zw 对应偏移 |
| albedo/mainColor | 漫反射颜色，指定模型的主要基色 |
| albedoMap/mainTexture | 漫反射贴图，如果有指定，这项会和漫反射颜色相乘 |
| albedoScale | 模型的漫反射强度，用于控制漫反射颜色对于最终颜色的影响权重 |
| alphaThreshold | 启用 alpha test 后的测试阈值。输出的 alpha 值低于此值的像素会被 discard 掉 |
| normalMap | 法线贴图，用于增加表面细节 |
| normalStrenth | 法线贴图强度，控制凹凸质感的强弱 |
| pbrMap<br>**R**（AO）<br>**G**（Roughness）<br>**B**（Metallic） | PBR 材质参数贴图：环境遮挡、粗糙度和金属度<br>采样结果会和常数项相乘 |
| metallicRoughnessMap<br>**G**（Roughness）<br>**B**（Metallic） | 独立的粗糙度和金属度贴图<br>采样结果会和常数项相乘 |
| occlusionMap | 独立的环境遮挡贴图<br>采样结果会和常数项相乘 |
| occlusion | 环境遮挡常数 |
| roughness | 粗糙度常数 |
| metallic | 金属度常数 |
| emissive | 自发光颜色，独立于光照计算，由模型本身直接发散出的颜色 |
| emissiveMap | 自发光贴图<br>如果有指定，这项会和自发光颜色相乘，因此需要把自发光颜色（默认是黑色）调高才会有效果 |
| emissiveScale | 自发光强度<br>用于控制自发光颜色对于最终颜色的影响权重 |

## 宏

 宏定义 | 说明 |
| :---- | :--- |
| USE_BATCHING | 是否启用动态 VB 合并式合批 |
| USE_INSTANCING | 是否启用动态 instancing |
| HAS_SECOND_UV | 是否存在第二套 UV |
| ALBEDO_UV | 指定采样漫反射贴图使用的 uv，默认为第一套 |
| EMISSIVE_UV | 指定采样自发光贴图使用的 uv，默认为第一套 |
| ALPHA_TEST_CHANNEL | 指定透明测试的测试通道，默认为 A 通道 |
| USE_VERTEX_COLOR | 如果启用，顶点色会与漫反射项相乘 |
| USE_ALPHA_TEST | 是否开启透明测试（镂空效果） |
| USE_ALBEDO_MAP | 是否使用漫反射贴图 |
| USE_NORMAL_MAP | 是否使用法线贴图 |
| USE_PBR_MAP | 是否使用 PBR 参数三合一贴图（**按 glTF 标准，RGB 通道必须分别对应遮挡、粗糙和金属度**） |
| USE_METALLIC_ROUGHNESS_MAP | 是否使用金属粗糙二合一贴图（**按 glTF 标准，GB 通道必须分别对应粗糙和金属度**） |
| USE_OCCLUSION_MAP | 是否使用遮挡贴图（**按 glTF 标准，只会使用 R 通道**） |
| USE_EMISSIVE_MAP | 是否使用自发光贴图 |

<!-- 

## 制作标准

通过 albedo 提供物体基础的纹理，如要通过法线体现高模细节则可以勾选 USE_NORMAL_MAP 来使用法线贴图。

法线贴图的制作如下： 
-->

## 实现原理

下图是 builtin-standard 材质各着色参数的组装流程：

![pbr 组装流程](../material-system/standard-material-graph.png)

若要了解 PBR 的原理可参考： [PBR 理论](https://learnopengl-cn.github.io/07%20PBR/01%20Theory/#pbr)
