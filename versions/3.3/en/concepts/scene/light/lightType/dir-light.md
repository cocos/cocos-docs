# Directional Lights

Directional Light is the most common type of light that simulates the light emitted by a source at infinity and is often used to simulate sunlight.

![image](dirlights/dir-light.jpg)

Because the distance between the light and the illuminated target is undefined (infinite distance), the lighting effect is not affected by the **position** and **orientation** of the light (as shown below, directional light produces the same lighting brightness in all planes). However, **rotation** affects the direction of directional light, which in turn affects the extent to which the model receives light and where the model produces shadows. This can be done with the [Rotate Gizmo](../../../../editor/toolbar/index.md#rotate-gizmo) in the upper left corner of the editor to adjust the direction of directional light.

![image](dirlights/dir-light-scene.jpg)

Adding directional lights to the scene can be done as described in [Adding Lights](index.md#adding-lights).

> **Note**: Cocos Creator currently supports only one directional light. If adding more than one at the same time, the last one added will prevail.

A directional light node `Main Light` will be created automatically by default when creating a new scene.

For the interface of the directional light component, please refer to [DirectionalLight API](__APIDOC__/en/#/docs/3.3/en/component-light/Class/DirectionalLight).

## Directional Light Properties

![image](dirlights/dir-light-prop.png)

| Property | Description |
| :------ | :-- |
| Color | Sets the light color. |
| UseColorTemperature | Whether to enable the color temperature. |
| ColorTemperature | Adjusts the color temperature. |
| StaticSettings | Sets static lighting, please refer to the [Lightmapping](../lightmap.md) documentation for details. |
| Illumination | Illumination in **lux (lx)**. |
