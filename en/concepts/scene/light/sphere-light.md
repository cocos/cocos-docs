# Spherical Lighting

__Cocos Creator 3.0__ uses Spherical Lighting instead of **Point Lighting**, because Point Lighting ignore volume, but all Physical Lightings in the real world have light source `size` properties.

![sphere light](sphere-light.jpg)

To use `Spherical Lighting`, please refer to the [Spherical Lighting API](../../../api/en/classes/component_light.spherelight.html).

## Spherical Lighting Properties

![image](sphere-light-prop.png)

| Parameter | Description |
| :-------- | :--- |
| Color | Light source color |
| UseColorTemperature | Whether to enable color temperature |
| ColorTemperature | Color temperature |
| Size | Light source size |
| Range | Lighting impact range |
| Term | Selected unit for light intensity <br> Spherical light supports two unit system: **luminous power** and **luminance** |
| LuminousPower | Luminous power in **lumens (lm)** <br> When __Term__ is specified as __LUMINOUS_POWER__, lumen is used to indicate the light intensity |
| Luminance | Brightness, unit **Candela per square meter (cd/m<sup>2</sup>)** <br>When __Term__ is specified as __LUMINANCE__, brightness is used to indicate light intensity |
