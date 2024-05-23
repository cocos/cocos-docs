# 聚光灯

**聚光灯**  是由一个点向一个方向发射一束锥形光线，类似于手电筒或舞台照明灯产生的光线。与其他光源相比，聚光灯多了 `SpotAngle` 属性，用于调整聚光灯的光照范围。

![spotlight](spotlight/spot-light.jpg)

在编辑器中可以直观地看到光源的位置、颜色、光照范围以及它的聚光角度等，如下图所示。配合编辑器左上角的 [变换工具](../../../../editor/toolbar/index.md) 可调整聚光灯的位置及照射方向等。

![spotlight](spotlight/spot-light-scene.jpg)

在场景中添加聚光灯的方式可参考 [添加光源](index.md)。

聚光灯组件接口请参考 [SpotLight API](__APIDOC__/zh/class/SpotLight)。

> **注意**：从 v3.5 开始，**聚光灯光阴影** 从场景设置面板中独立出来，不再受到全局阴影参数的影响。

## 聚光灯属性

![image](spotlight/spot-light-prop.png)

| 属性 | 说明 |
| :------ | :--- |
| Color | 设置光源颜色 |
| UseColorTemperature | 是否启用色温 |
| ColorTemperature | 调节色温 |
| Size | 设置光源大小 |
| Range | 设置光照影响范围 |
| SpotAngle | 调整聚光角度，控制光照范围 |
| Term | 设置光照强度单位类型，包括 **光通量（LUMINOUS_POWER）** 和 **亮度（LUMINANCE）** 两种 |
| LuminousPower | 光通量，单位 **流明（lm）**<br>当 **Term** 设置为 **LUMINOUS_POWER** 时生效 |
| Luminance | 亮度，单位 **坎德拉每平方米（cd/m<sup>2</sup>）**<br>当 **Term** 设置为 **LUMINANCE** 时生效 |
| StaticSettings | 静态灯光设置，详情请参考 [光照贴图](../lightmap.md) |

### 聚光灯阴影属性

阴影属性需要在场景中开启阴影。开启方法请参考 [阴影 - 开启阴影](../shadow.md#%E5%BC%80%E5%90%AF%E9%98%B4%E5%BD%B1)。

开启后，聚光灯会展示如下动态阴影界面：

![image](dirlights/spot-light-shadow-prop.png)

| 属性 | 说明 |
| :------ | :-- |
| ShadowEnabled | 是否开启平行光阴影 |
| ShadowPcf | 设置阴影边缘反走样等级，目前支持 **HARD**、**SOFT**、**SOFT_2X**，详情可参考下文 **PCF 软阴影** 部分的介绍。 |
| ShadowBias | 设置阴影偏移值，防止 z-fighting |
| ShadowNormalBias | 设置法线偏移值，防止曲面出现锯齿状 |

### PCF 软阴影

百分比渐近过滤（PCF）是一个简单、常见的用于实现阴影边缘反走样的技术，通过对阴影边缘进行平滑处理来消除阴影贴图的锯齿现象。原理是在当前像素（也叫做片段）周围进行采样，然后计算样本跟片段相比更接近光源的比例，使用这个比例对散射光和镜面光成分进行缩放，然后再对片段着色，以达到模糊阴影边缘的效果。

目前 Cocos Creator 支持 **硬采样**、**4 倍采样（SOFT 模式）**、**9 倍采样（SOFT_2X 模式）**，倍数越大，采样区域越大，阴影边缘也就越柔和。

## 支持动态合批提高性能

对于材质中已经开启 instancing 的模型，平面阴影也会自动同步使用 instancing 绘制，详情请参考 [动态合批](../../../engine/renderable/model-component.md#%E5%85%B3%E4%BA%8E%E5%8A%A8%E6%80%81%E5%90%88%E6%89%B9)。
