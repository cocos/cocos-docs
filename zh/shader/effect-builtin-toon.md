# 卡通渲染

 相对于[真实渲染](effect-builtin-pbr.md)（Physical Based Rendering - PBR），非真实渲染（Non-Photorealistic Rendering - NPR）通过特性化渲染，实现与真实世界完全不同的美术表现。

 卡通渲染（Toon Shading）是非真实渲染的常见效果之一。

 通常，卡通渲染内容包含以下几个基础部分：

- 对物体进行边缘描边
- 降低色阶的数量并模拟色阶不连续现象
- 明暗色调分离
- 阴影形状干扰等

 ![toon](img/toon.png)

## 参数

### 渲染通道 0

| 参数         | 说明                                                              |
| :------------- | :---------------------------------------------------------------- |
|LineWidth| 描边的宽度
|DepthBias| 描边的深度位移调整因子

### 渲染通道 1

| 参数         | 说明                                                              |
| :------------- | :---------------------------------------------------------------- |
| tilingOffset   | 模型 UV 的缩放和偏移量，xy 对应缩放，zw 对应偏移|
| mainColor      | 主颜色，该颜色会作为最初的色阶|
| colorScale     | 颜色缩放，对主颜色，一阶和二阶颜色的 RGB 通道相乘 |
| alphaThreshold | Alpha测试阀值，Alpha值低于此值的像素将被抛弃
| shadeColor1    | 一阶色阶的颜色，该颜色会作为卡通着色的中间色阶 |
| shadeColor2    | 二阶色阶的颜色，该颜色会作为卡通着色的最后一个色阶 |
| specular       | 高光颜色
| baseStep       | 一阶着色的步长
| baseFeather    | 一阶着色和主颜色混合因子 <br> 和 baseStep 配合调整一阶色阶所占比例和混合的形式
| shadeStep      | 二阶着色的步长
| shadeFeather   | 二阶着色和一阶着色的混合因子 <br> 和 shadeStep 配合调整二阶色阶所占比例和混合的形式
| emissive       | 自发光颜色，独立于光照计算，由模型本身直接发散出的颜色  |
| emissiveScale  | 自发光强度<br>用于控制自发光颜色对于最终颜色的影响权重 |
| normalStrenth  | 法线伸缩量<br>只有在启用 USE_NORMAL_MAP 后才可以调整并对法线的 xy 轴进行缩放|
| normalMap      | 法线贴图
| mainTexture    | 主纹理，定义物体的基础纹理
| shadeMap1      | 一阶色阶纹理 <br> 若指定则会和 shadeColor1 相乘 |
| shadeMap2      | 二阶色阶纹理 <br> 若指定则会和 shadeColor2 相乘 |
| specularMap    | 高光贴图<br>若有指定，则会和高光颜色做相乘， |
| emissiveMap    | 自发光贴图<br>如果有指定，这项会和自发光颜色相乘，因此需要把自发光颜色（默认是黑色）调高才会有效果 |

## 宏

 | 宏名                          | 说明                      |
 | :---------------------------- | :------------------------ |
 | USE_BATCHING | 是否启用动态 VB 合并式合批 |
| USE_INSTANCING | 是否启用动态 instancing |
 | USE_OUTLINE_PASS              | 是否启用描边 Pass         |
 | USE_NORMAL_MAP                | 是否使用法线贴图          |
 | USE_BASE_COLOR_MAP            | 是否使用基础贴图          |
 | USE_1ST_SHADE_MAP             | 是否使用贴图作为一阶色阶 |
 | USE_2ND_SHADE_MAP             | 是否使用贴图作为二阶色阶图 |
 | USE_EMISSIVE_MAP              | 是否使用自发光贴图        |
 | USE_ALPHA_TEST                | 是否进行半透明测试        |
 | USE_SPECULAR_MAP              | 是否使用高光贴图        |
 | BASE_COLOR_MAP_AS_SHADE_MAP_1 | 使用 baseColorMap 作为一阶着色 |
 | BASE_COLOR_MAP_AS_SHADE_MAP_2 | 使用 baseColorMap 作为二阶着色 |
 | SHADE_MAP_1_AS_SHADE_MAP_2    | 二阶着色是否和一阶着色叠加|

## 原理

 卡通渲染由两个渲染过程（Pass）组成

- Pass 0 描边（可选）
- Pass 1 正常绘制

### Pass 0

描边时，选择剔除正面 `CullMode=Front` 并将模型的顶点沿法线进行扩张，由此得到一个比原模型较大的单色模型，在 Pass 1 中再将模型绘制一次用于遮挡。

可通过勾选 `USE_OUTLINE_PASS` 开启或关闭。

![USE_OUTLINE_PASS 开启](img/outline-on.png) ![USE_OUTLINE_PASS 关闭](img/outline-off.png)

若需要调整深度效果，可通过 `DepthBias` 参数调整。

### Pass 1

卡通渲染的核心思路是通过降低色阶的数量，模拟器卡通中的赛璐璐（Celluloid）画风。

在着色器中将色阶降低为三个色阶，并通过三个颜色组成：

- `baseColor`
- `shadeColor1`
- `shadeColor2`

其颜色对应关系如下图：

![toon-shade-color](img/shade-color.png)

勾选 `USE_1ST_SHADE_MAP` 和 `USE_2ND_SHADE_MAP` 的情况下，使用外部进行纹理模拟色阶不连续现象。

![shade map](img/shade-map.png)

通过着色器的 `surf` 方法计算表面着色器（`ToonSurface`）的参数，并由 `CCToonShading` 方法计算最终的着色。