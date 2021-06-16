# Main Directional Lights

Directional light is the most common type of lights, and can be understood as the dominant light in a scene. The lighting effect is not affected by the **light position** and **orientation**, and is suitable for achieving sunlight. However, **rotation** affects the direction of directional lights illumination, which in turn affects the range to which the model receives illumination and where the model produces shadows.

![image](dirlights/dir-light.jpg)

> **Note**: Cocos Creator currently supports only one main directional light. If more than one is added at the same time, the last one added will prevail.

To add the directional light to the scene, refer to the [Lighting](../light.md) documentation.

For the related interface of the directional light component, please refer to the [DirectionalLight API](__APIDOC__/en/classes/component_light.directionallight.html).

## Main Directional Lights Properties

![image](dirlights/dir-light-prop.png)

| Property | Description |
| :------- | :--- |
| **Color** | Set the light color |
| **UseColorTemperature** | Whether to enable color temperature |
| **ColorTemperature** | Adjust the color temperature |
| **StaticSettings** | Set up static lighting, see [Lightmapping](lightmap.md) for details |
| **Illumination** | Illumination, unit **lux (lx)** |
