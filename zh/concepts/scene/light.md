# 光源

光源在游戏中表示具备发光能力的物体，并且能够照亮周围的环境

![light scene](light/lighting.png)

## 基于物理的光照（Physically Based Lighting）

Cocos Creator 中采用光学度量单位来描述光源参数。基于光学度量单位，我们可以将光源的相关参数全部转化为真实世界中的物理值。这样，设计人员可根据相关灯光的工业参数以及真实环境的实际物理参数来调节光照强度、颜色、范围等信息，使整体光照效果更加符合真实的自然环境。

详细介绍可参考下方文档：

- [基于物理的光照（Physically Based Lighting）](light/pbr-lighting.md)

Cocos Creator 中支持三种类型的光源：
- [主方向光（Main Directional Light）](light/dir-light.md)
- [球面光（Sphere Light）](light/sphere-light.md)
- [聚光灯（Spot Light）](light/spot-light.md)
