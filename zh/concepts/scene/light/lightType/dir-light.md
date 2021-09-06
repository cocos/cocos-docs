# 平行光

平行光又称为方向光（Directional Light）。

平行光是最常见的一种光源，是模拟从无限远的源头处发出的光线，这意味着此光源投射出的阴影均为平行。因为光源与目标对象的距离是未定义的，因此光线不会减弱。在应用的场景中，平行光可用于模拟太阳或月亮。（在下图中可以看到，平行光在平面上产生的光照亮度都是一样的）。

平行光也可以理解为场景中的主导性光源（主平行光）。光照效果不受 **光源位置** 和 **朝向** 的影响，但是旋转会影响到平行光照射的方向，而光照方向又会影响到模型接受光照的范围以及模型产生阴影的位置。

![image](dirlights/dir-light.jpg)

> **注意**：Cocos Creator 目前只支持一个平行光。若同时添加多个，则以最后一个添加的为准。

默认情况下，每个新建的 Scene 场景都包含一个 Main Light 节点，默认挂载一个平行光。

在场景中添加平行光的方式可参考 [光照](../light.md)。

平行光组件相关接口，请参考 [DirectionalLight API](__APIDOC__/zh/classes/component_light.directionallight.html)。

## 平行光属性

![image](dirlights/dir-light-prop.png)

| 属性 | 说明 |
| :------ | :-- |
| Color | 设置光源颜色 |
| UseColorTemperature | 是否启用色温 |
| ColorTemperature | 调节色温 |
| StaticSettings | 设置静态灯光，详情请参考 [光照贴图](/zh/concepts/scene/light/lightmap.md) |
| illumination | 照度，单位 **勒克斯（lx）** |
