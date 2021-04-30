# Spotlights

Spotlight is a beam of light emitted from a point in one direction, close to the light produced by a flashlight. Spotlights have an additional `SpotAngle` property over other types of lighting, which is used to adjust the illumination range of the Spotlight.

![spotlight](spotlight/spot-light.jpg)

To add the Spotlight to the scene, refer to the [Lighting](../light.md) documentation.

For the related interface of the Spotlight component, please refer to the [Spotlight API](__APIDOC__/en/classes/component_light.spotlight.html).

## Spotlights Properties

![image](spotlight/spot-light-prop.png)

| Property | Description |
| :------- | :--- |
| **Color** | Set the light color  |
| **UseColorTemperature** | Whether to enable color temperature |
| **ColorTemperature** | Adjust the color temperature |
| **Size** | Set the light source size |
| **Range** | Set the lighting impact range |
| **SpotAngle** | Adjust the spotlight angle to control the lighting range |
| **Term** | Setup the light intensity unit type, including both **LUMINOUS_POWER** and **LUMINANCE** |
| **LuminousPower** | Luminous power in **lumens (lm)**. Takes effect when **Term** is set to **LUMINOUS_POWER** |
| **Luminance** | Brightness in **Candela per square meter (cd/m<sup>2</sup>)**. Takes effect when **Term** is set to **LUMINANCE** |
| **StaticSettings** | Set up static lighting, see [Lightmapping](lightmap.md) for details |
