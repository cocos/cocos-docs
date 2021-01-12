# Spherical Light

Cocos Creator 3.0 uses Spherical Light instead of **Point Light**, because Point Light ignore volume, but all Physical Lights in the real world have the lights `size` property.

![sphere light](sphere-light.jpg)

To add the spherical light to the scene, refer to the [Lighting](../light.md) for details.

For the related interface of the spherical light component, please refer to [SphereLight API](../../../api/en/classes/component_light.spherelight.html).

## Spherical Light Properties

![image](sphere-light-prop.png)

| Property | Description |
| :------- | :--- |
| Color | Set the light color |
| UseColorTemperature | Whether to enable color temperature |
| ColorTemperature | Adjust the color temperature |
| Size | Set the light source size |
| Range | Set the lighting impact range |
| Term | Setup the light intensity unit type, including both **LUMINOUS_POWER** and **LUMINANCE**. |
| LuminousPower | Luminous power in **lumens (lm)**. Takes effect when **Term** is set to **LUMINOUS_POWER**. |
| Luminance | Brightness in **Candela per square meter (cd/m<sup>2</sup>)**. Takes effect when **Term** is set to **LUMINANCE**. |
| StaticSettings | Set up static lighting, see [LightMap](../../../editor/lightmap/index.md) for details |
