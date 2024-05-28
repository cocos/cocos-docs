# 平行光

平行光又称为方向光（Directional Light），是最常用的一种光源，模拟了无限远处的光源发出的光线，常用于实现太阳光。

![image](dirlights/dir-light.jpg)

因为光源与被照射目标的距离是未定义的（无限远），所以光照效果不受 **光源位置** 和 **朝向** 的影响（如下图，平行光在平面上产生的光照亮度都是一样的）。但是 **旋转** 会影响到平行光照射的方向，而光照方向又会影响到模型接受光照的范围以及模型产生阴影的位置。可通过编辑器左上角的 [旋转变换工具](../../../../editor/toolbar/index.md#%E6%97%8B%E8%BD%AC%E5%8F%98%E6%8D%A2%E5%B7%A5%E5%85%B7) 来调整平行光照射的方向。

![image](dirlights/dir-light-scene.jpg)

在场景中添加平行光的方式可参考 [添加光源](index.md)。

> **注意**：Cocos Creator 目前只支持一个平行光。若同时添加多个，则以最后一个添加的为准。

新建场景时，默认会自动创建一个 `Main Light` 平行光节点。

平行光组件相关接口，请参考 [DirectionalLight API](%__APIDOC__%/zh/classes/component_light.directionallight.html)。

## 平行光属性

![image](dirlights/dir-light-prop.png)

| 属性 | 说明 |
| :------ | :-- |
| Color | 设置光源颜色 |
| UseColorTemperature | 是否启用色温 |
| ColorTemperature | 调节色温 |
| StaticSettings | 设置静态灯光，详情请参考 [光照贴图](../lightmap.md) |
| Illumination | 照度，单位 **勒克斯（lx）** |
