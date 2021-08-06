# Spherical Lights

Cocos Creator 3.0 uses Spherical Lights instead of **Point Light** because Point Light ignores volume, but physical light in the real world have a light `size` property.

![sphere light](spherelight/sphere-light.jpg)

To add the spherical light to the scene, refer to the [Lighting](../light.md) for details.

For the related interface of the spherical light component, please refer to the [SphereLight API](__APIDOC__/en/classes/component_light.spherelight.html).

## Spherical Lights Properties

![image](spherelight/sphere-light-prop.png)

| Property | Description |
| :------- | :--- |
| **Color** | Set the light color |
| **UseColorTemperature** | Whether to enable color temperature |
| **ColorTemperature** | Adjust the color temperature |
| **Size** | Set the light source size |
| **Range** | Set the lighting impact range |
| **Term** | Setup the light intensity unit type, including both **LUMINOUS_FLUX** and **LUMINANCE**. |
| **LuminousFlux** | Luminous flux in **lumens (lm)**. Takes effect when **Term** is set to **LUMINOUS_FLUX**. |
| **Luminance** | Brightness in **Candela per square meter (cd/m<sup>2</sup>)**. Takes effect when **Term** is set to **LUMINANCE**. |
| **StaticSettings** | Set up static lighting, see [Lightmapping](lightmap.md) for details |
