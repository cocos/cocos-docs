# 卡通渲染

 相对于[真实渲染](effect-buildin-pbr.md)（PBR），非真实渲染（Non-Photorealistic Rendering NPR）通过特性化渲染，实现于真实世界完全不同的美术表现。

 卡通渲染（Toon）是非真实渲染的常见实现之一。 

 常见的卡通渲染内容包含 

 - 对物体进行边缘描边
 - 模拟色阶不连续现象
 - 其他光照计算
  
 ![toon](img/toon.png)

 # 参数

| 参数         | 说明                                                              |
| :------------- | :---------------------------------------------------------------- |
| tilingOffset   | 模型 UV 的平铺和偏移量，xy 对应平铺，zw 对应偏移|
| mainColor      |
| colorScale     |
| alphaThreshold |
| shadeColor1    |
| shadeColor2    |
| specular       |
| baseStep       |
| baseFeather    |
| shadeStep      |
| shadeFeather   |
| emissive       |
| emissiveScale  |
| normalStrenth  |
| normalMap      |
| mainTexture    |
| shadeMap1      |
| shadeMap2      |
| specularMap    |
| emissiveMap    |

 # 宏

 | 宏名                          | 说明                      |
 | :---------------------------- | :------------------------ |
 | USE_BATCHING | 是否启用动态 VB 合并式合批 |
| USE_INSTANCING | 是否启用动态 instancing |
 | USE_OUTLINE_PASS              | 是否启用描边 Pass         |
 | USE_NORMAL_MAP                | 是否使用发现贴图          |
 | USE_BASE_COLOR_MAP            | 是否使用基础贴图          |
 | USE_1ST_SHADE_MAP             | 是否使用第 1 个阴影？贴图 |
 | USE_2ND_SHADE_MAP             | 是否使用第 2 个阴影？贴图 |
 | USE_EMISSIVE_MAP              | 是否使用发射？贴图        |
 | USE_ALPHA_TEST                | 是否进行半透明测试        |
 | USE_SPECULAR_MAP              | 是否使用反射光贴图        |
 | BASE_COLOR_MAP_AS_SHADE_MAP_1 |                           |
 | BASE_COLOR_MAP_AS_SHADE_MAP_2 |                           |
 | SHADE_MAP_1_AS_SHADE_MAP_2    |                           |

 # 制作标准

 # 原理

 卡通渲染由两个 Pass 组成
 
 - Pass 0 描边（可选）
 - Pass 1 正常绘制

## Pass 0

描边时，选择 `CullMode=FRONT` 将物体朝前的面进行剔除，之后将顶点按照法线方向进行扩展。此操作将得到一个略比原模型更大的单色模型。

可通过勾选 `USE_OUTLINE_PASS` 开启或关闭。

## Pass 1

色阶不连续现象可通过 `ShaderCollor1` 于 `ShaderColor2` 实现，该现象由三个颜色组成： 

- `BaseColor`
- `ShaderCollor1`
- `ShaderColor2`

勾选 `USE_1ST_SHADE_MAP` 和 `USE_2ND_SHADE_MAP` 的情况下，使用外部进行纹理模拟色阶不连续现象，该纹理通常采用手绘或外部工具生成。