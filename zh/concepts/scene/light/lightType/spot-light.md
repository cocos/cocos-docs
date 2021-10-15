# 聚光灯

**聚光灯**  是由一个点向一个方向发射一束锥形光线，类似于手电筒或舞台照明灯产生的光线。与其他光源相比，聚光灯多了 `SpotAngle` 属性，用于调整聚光灯的光照范围。

![spotlight](spotlight/spot-light.jpg)

在编辑器中可以直观地看到光源的位置、颜色、光照范围以及它的聚光角度等，如下图所示。配合编辑器左上角的 [变换工具](../../../../editor/toolbar/index.md) 可调整聚光灯的位置及照射方向等。

![spotlight](spotlight/spot-light-scene.jpg)

在场景中添加聚光灯的方式可参考 [添加光源](index.md)。

聚光灯组件接口请参考 [SpotLight API](__APIDOC__/zh/#/docs/3.3/zh/component-light/Class/SpotLight)。

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
