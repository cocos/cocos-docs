# 聚光灯（Spot Light）

**聚光灯** 用于表现光束的聚焦，可以通过调节聚光角度可以控制光斑的大小。

![spot light](spot-light.jpg)

聚光灯组件接口请参考 [Spot Light API](https://docs.cocos.com/creator3d/api/zh/classes/component_light.spotlight.html)。

## 聚光灯属性

| 参数名称 | 说明 |
|:-------:|:---:|
| Color | 光源颜色 |
| UseColorTemperature | 是否启用色温 |
| ColorTemperature | 色温 |
| Size | 光源大小 |
| Range | 光照影响范围 |
| SpotAngle | 聚光角度 |
| Term | 选用的光照强度单位术语<br>聚光灯支持两种单位制系统：**发光功率（LUMINOUS_POWER）** 和 **亮度（LUMINANCE）** |
| LuminousPower | 发光功率，单位**流明（*lm*）**。<br>当 Term 指定为 LUMINOUS_POWER 时，选用流明来表示光照强度 |
| Luminance | 亮度，单位**坎德拉每平方米（*cd/m<sup>2</sup>*）**。<br>当 Term 指定为 LUMININANCE 时，选用亮度来表示光照强度 |
