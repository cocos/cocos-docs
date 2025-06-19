# 阴影

在 3D 世界中，光与影一直都是极其重要的组成部分，它们能够丰富整个环境，质量好的阴影可以达到以假乱真的效果，并且使得整个世界具有立体感。

Creator 3.0 目前支持 **Planar** 和 **ShadowMap** 两种阴影类型。

![shadow](shadow/shadowExample.png)

## 开启阴影

物体开启阴影效果的步骤如下：

1. 在 **层级管理器** 中选中 **Scene**，然后在 **属性检查器** 的 **shadows** 组件中勾选 **Enabled** 属性。

    ![enable-shadow](shadow/enable-shadow.png)

2. 在 **层级管理器** 中选中 **Light**，然后在 **属性检查器** 的 **Dynamic Shadow Settings** 组件中勾选 **Shadow Enabled** 属性。

    ![enable-shadow](shadow/enable-light-shadow.png)

3. 在 **层级管理器** 中选中需要显示阴影的 3D 节点，然后在 **属性检查器** 的 **MeshRenderer** 组件中将 **Cast Shadows** 属性设置为 **ON**。

    ![set-meshrenderer](shadow/set-meshrenderer.png)

    若阴影类型是 **ShadowMap**，还需要将 MeshRenderer 组件上的 **Receive Shadows** 属性设置为 **ON**。

> **注意**：如果阴影无法正常显示，需要调整一下方向光的照射方向。

## shadows 类型

阴影类型可在 shadows 组件的 **Type** 属性中设置。

### Planar shadow

Planar 阴影类型一般用于较为简单的场景。

![planar properties](shadow/planar-properties.png)

| 属性  | 说明  |
| :--- | :--- |
| **Enabled**     | 是否开启阴影效果      |
| **Type**        | 阴影类型             |
| **Saturation**  | 调节阴影饱和度，建议设置为 **1.0**。若需要减小方向光阴影的饱和程度，推荐通过增加环境光来实现，而不是调节该值       |
| **ShadowColor** | 设置阴影颜色         |
| **Normal**      | 阴影接收平面的法线，垂直于阴影，用于调整阴影的倾斜度  |
| **Distance**    | 阴影在接收平面上与坐标原点的距离     |

调节方向光照射的方向可以调节阴影的投射位置。

> **注意**：Planar 类型的阴影只有投射在平面上才能正常显示，不会投射在物体上，也就是说 MeshRenderer 组件中的 **ReceiveShadow** 属性是无效的。

### ShadowMap

ShadowMap 是以光源为视点来渲染场景的。从光源位置出发，场景中看不到的地方就是阴影产生的地方。

![shadow Map 面板细节](shadow/shadowmap-properties.png)

| 属性  | 说明  |
| :--- | :--- |
| **Enabled**                   | 勾选该项以开启阴影效果     |
| **Type**                      | 设置阴影类型    |
| **MaxReceived**               | 最多支持产生阴影的光源数量，默认为 4 个，可根据需要自行调整     |
| **ShadowMapSize**             | 设置阴影贴图分辨率，目前支持 **Low_256x256**、**Medium_512x512**、**High_1024x1024**、**Ultra_2048x2048** 四种精度的纹理     |

> **注意**：从 v3.3 开始，**属性检查器** 中阴影的 **Linear**、**Packing** 项被移除，Creator 将自动判断硬件能力，并选用最优方式进行阴影渲染。

ShadowMap 在开启了物体 **MeshRenderer** 组件上的 **ReceiveShadow** 后，就会接收并显示其它物体产生的阴影效果。

ShadowMap 一般用于要求光影效果比较真实，且较为复杂的场景。但不足之处在于如果不移动光源，那么之前生成的 ShadowMap 就可以重复使用，而一旦移动了光源，那么就需要重新计算新的 ShadowMap。

## 阴影属性

在启用类型为 **ShadowMap** 的阴影后，光源的 **属性检查器** 内才会出现 **动态阴影设置** 选项。如未能正确开启，请参考上文 **开启阴影** 部分。

目前引擎对不同光源的 **ShadowMap** 支持情况如下：

| 光源类型 | 是否支持|
| :-- | :-- |
| 平行光 | 支持 |
| 聚光灯 | 支持 |
| 球形光 | 不支持 |

### 平行光阴影属性

![image](./lightType/dirlights/dir-light-shadow-prop.png)

| 属性 | 说明 |
| :------ | :-- |
| ShadowEnabled | 是否开启平行光阴影 |
| ShadowPcf | 设置阴影边缘反走样等级，目前支持 **HARD**、**SOFT**、**SOFT_2X**、**SOFT_4X**，详情可参考下文 **PCF 软阴影** 部分的介绍。 |
| ShadowBias | 设置阴影偏移值，防止 Z-Fighting |
| ShadowNormalBias | 设置法线偏移值，防止曲面出现锯齿状 |
| ShadowSaturation | 调节阴影饱和度，建议设置为 **1.0**。若需要减小方向光阴影的饱和程度，推荐通过增加环境光来实现，而不是调节该值 |
| ShadowInvisibleOcclusionRange | 设置 Camera 可见范围外的物体产生的阴影是否需要投射到可见范围内，若需要则调大该值即可  |
| ShadowDistance | 设置 Camera 可见范围内显示阴影效果的范围，阴影质量与该值的大小成反比 |

平行光的使用请参考 [平行光](./lightType/dir-light.md)。

#### FixedArea 模式

FixedArea 模式用于设置是否手动控制 Camera 可见范围内显示阴影效果的范围：

- 若不勾选该项（默认），则引擎会使用和 CSM（级联阴影算法）模式相同的裁切流程和相机计算，根据 Camera 的方向和位置来计算阴影产生的范围。
- 若勾选该项，则根据手动设置的 `Near`、`Far`、`OrthoSize` 属性来控制阴影产生的范围。阴影会跟随方向光节点的位置，在方向光包围盒附近分布，而非跟随相机。

   ![image](./lightType/dirlights/dir-fixedarea.png)

| 属性 | 说明 |
| :------ | :-- |
| ShadowFixedArea | 是否开启固定区域的阴影 |
| ShadowNear | 设置主光源相机的近裁剪面 |
| ShadowFar | 设置主光源相机的远裁剪面 |
| ShadowOrthoSize | 设置主光源相机的正交视口大小，阴影质量与该值的大小成反比 |

### 聚光灯阴影属性

![image](./lightType/dirlights/spot-light-shadow-prop.png)

| 属性 | 说明 |
| :------ | :-- |
| ShadowEnabled | 是否开启平行光阴影 |
| ShadowPcf | 设置阴影边缘反走样等级，目前支持 **HARD**、**SOFT**、**SOFT_2X**、**SOFT_4X**，详情可参考下文 **PCF 软阴影** 部分的介绍。 |
| ShadowBias | 设置阴影偏移值，防止 z-fighting |
| ShadowNormalBias | 设置法线偏移值，防止曲面出现锯齿状 |

聚光灯的使用请参考 [聚光灯](./lightType/spot-light.md)。

### PCF 软阴影

百分比渐近过滤（PCF）是一个简单、常见的用于实现阴影边缘反走样的技术，通过对阴影边缘进行平滑处理来消除阴影贴图的锯齿现象。原理是在当前像素（也叫做片段）周围进行采样，然后计算样本跟片段相比更接近光源的比例，使用这个比例对散射光和镜面光成分进行缩放，然后再对片段着色，以达到模糊阴影边缘的效果。

目前 Cocos Creator 支持 **硬采样**、**4 倍采样（SOFT 模式）**、**9 倍采样（SOFT_2X 模式）**、**16 倍采样（SOFT_4X 模式）**，倍数越大，采样区域越大，阴影边缘也就越柔和。

## 支持动态合批提高性能

对于材质中已经开启 instancing 的模型，平面阴影也会自动同步使用 instancing 绘制，详情请参考 [动态合批](../../../engine/renderable/model-component.md#%E5%85%B3%E4%BA%8E%E5%8A%A8%E6%80%81%E5%90%88%E6%89%B9)。
