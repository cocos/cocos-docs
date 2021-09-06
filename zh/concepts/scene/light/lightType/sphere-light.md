# 球面光

Cocos Creator 3.x 的球面光与 v2.x 的点光源（Point Light）类似。

球面光会向所有方向均匀地发散光线，接近于蜡烛产生的光线。物体受到的光照强度会随着跟光源距离的增大而减弱，当距离超过设置的光照影响范围（`Range` 属性），则光照强度为 0。

![sphere light](spherelight/sphere-light.jpg)

用户可以通过修改 **属性检查器** 中 cc.SphereLight 组件的 **Range** 属性来修改球面光的光照范围。

![spot-light-edit](spherelight/spot-light-edit.png)

球面光可用于模拟场景中的灯和其他局部光源。用户还可以用球面光模拟火花照亮周围环境。

在场景中添加球面光的方式可参考 [光照](../light.md)。

球面光组件接口请参考 [SphereLight API](__APIDOC__/zh/classes/component_light.spherelight.html)。

## 球面光属性

![image](spherelight/sphere-light-prop.png)

| 属性 | 说明 |
| :---- | :---- |
| Color | 设置光源颜色 |
| UseColorTemperature | 是否启用色温 |
| ColorTemperature | 调节色温 |
| Size | 设置光源大小（目前此功能没有在实际运行中生效，后续会进行优化） |
| Range | 设置光照影响范围 |
| Term | 设置光照强度单位的类型，包括 **光通量（LUMINOUS_POWER**）和 **亮度（LUMINANCE）** 两种 |
| LuminousPower | 光通量，单位 **流明（lm）**<br>当 **Term** 设置为 **LUMINOUS_POWER** 时生效 |
| Luminance | 亮度，单位 **坎德拉每平方米（cd/m<sup>2</sup>）**<br>当 **Term** 设置为 **LUMINANCE** 时生效 |
| StaticSettings | 静态灯光设置，详情请参考 [光照贴图](./lightmap.md) |
