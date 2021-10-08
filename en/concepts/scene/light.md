# Lighting

The __Light__ in the game represents an object with luminous ability that can illuminate the surrounding environment. Adding light in the scene can make the scene produce the corresponding light and shadow effects, and get better visual effects.

![light scene](light/lighting.png)

## Add Lights

There are two ways to add lights:

- Click on the __+__ button in the upper left corner of the __Hierarchy__ panel, and select __Light__, then select the light type as needed to create a node containing the corresponding type of light component to the scene.

  ![add light](light/add-light.png)

- Select the node in the __Hierarchy__ panel where you want to add the lights, then clicking the __Add Component__ button below the __Inspector__ panel and selecting __Light__.

  ![add light2](light/add-light2.png)

## Additive per-pixel lights

Uber Shader is still the dominant solution on some performance-constrained platforms, but as hardware performance increases and the demand for higher picture quality increases, a fixed number of lights can no longer meet the needs of practical applications, so there is a solution that supports multiple lights -- **Multi-pass drawing**.

For a detailed introduction, please read:

- [Additive per-pixel lights](light/additive-per-pixel-lights.md)

## Physically-based Lighting

__Cocos Creator__ uses optical measurement units to describe light source parameters. Based on optical measurement units, we can convert all relevant parameters of the light source into physical values in the real world. In this way, the designer can adjust the __light intensity__, __color__, __range__ and __other__ parameters according to the industrial standards of parameters and the physical parameters of a real environment. The overall lighting effect is more in line with the real natural environment.

For more information about the light and light parameters, please refer to the [Physically-based Lighting](./light/pbr-lighting.md).

## Types of Light

For more information about light types, please refer to the following documentations:

- [Directional lights](light/lightType/dir-light.md)
- [Spherical lights](light/lightType/sphere-light.md)
- [Spotlights](light/lightType/spot-light.md)
- [Ambient lights](light/lightType/ambient.md)
