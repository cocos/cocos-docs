# Spotlights

**Spotlights** are used to express the focus of a light beam. You can control the spot size by adjusting the focusing angle.

![spot light](spot-light.jpg)

To use `Spotlights`, please refer to the [Spotlights API](https://docs.cocos.com/creator3d/api/en/classes/component_light.spotlight.html).

## Spotlights Properties

| Parameter | Description |
|:-------:|:---:|
| Color | Light source color |
| UseColorTemperature | Whether to enable color temperature |
| ColorTemperature | Color temperature |
| Size | Light source size |
| Range | Lighting impact range |
| SpotAngle | Condensing angle |
| Term | Selected unit for light intensity <br> Spherical light supports two unit system: **luminous power** and **luminance** |
| LuminousPower | Luminous power in **lumens (*lm*)** <br> When __Term__ is specified as __LUMINOUS_POWER__, lumen is used to indicate the light intensity |
| Luminance | Brightness, unit **Candela per square meter (*cd/m<sup>2</ sup>*)** <br>When __Term__ is specified as __LUMINANCE__, brightness is used to indicate light intensity |
