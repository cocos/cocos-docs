# Lighting

Adding light in the 3D scene can make the **Scene** produce the corresponding shadow and lighting effect, and obtain better visual effects. It is recommended to switch the scene editor to 3D scene mode by clicking the **3D** button at the top left of the editor for better editing of the light, etc.

## Add Lights

There are two ways to add lights:

- Click on the **+** button in the upper left corner of the **Node Tree** and select **Create Light** to create a node containing the **Light component** to your scene.

  ![](img/add-node-light.png)

- Add a Light component to the node by selecting the node in the **Node Tree** where you want to add the lights, then clicking the **Add Component** button below the **Properties** and selecting **Light** from the **Renderer Component**.

  ![](img/add-light.png)

## Types of light

Light types include **DIRECTIONAL**, **POINT**, **SPOT**, **AMBIENT** four types. There are two ways to choose a Light type:

- One is to select the **Create Light -> desired Light type (for example Directional)** directly when creating a node in the **Node Tree**.

  ![](img/add-light-types.png)

  ![](img/light-types.png)

- The other is to set the **Type** property directly after adding the Light component in the **Properties** of the node.

  ![](img/choose-light-types.png)

### Directional lights

Directional lights are the most common type of lights, and the lighting effect is not affected by the **light position** and **orientation**. Directional lights is suitable for achieving sunlight (In the figure below, you can see that the brightness of the directional lights produced on the plane is the same). However, the rotation will affect the direction of directional lights illumination, and the direction of the illumination affects the range to which the model receives illumination and where the model produces shadows.

The user can adjust the color of the light by modifying the Color property of the Light component in the **Properties**. And adjust the light intensity by modifying the **Indensity** property.

![Directional Light](img/lighting-4.jpg)

### Point lights

A point light is located at a point in space and sends light out in all directions equally. And is sililar to the light produced by the candle. The intensity diminishes with distance from the light, reaching zero at a specified range. The position of the point light and its illumination range can be seen in the editor as shown below.

The user can adjust the illumination range of the point light by modifying the Range property of the Light component in the **Properties**.

![Point Light](img/lighting-5.jpg)

### Spot lights

The spot light is a point emits a beam of light to one direction. And has one more **Spot Angle** property than other types of lights, which allows you to adjust the illumination range of the spot light.

![Spot Light](img/lighting-6.jpg)

### Ambient lights

Ambient light can evenly illuminate all objects in the scene, helping to improve the brightness of the scene. This is often used to solve the problem of blackout of the back surface of the model.

Ambient light generally needs to be used with other types of Light. For example, if there is only one directional light in the scene, it will appear very dark at the backlight of the model. Adding ambient light can enhance the brightness of the back of the model.

> **Notes**:
>
> 1. Since the ambient light has no direction, no shadow can be produced.
> 2. Ambient light can be placed anywhere in the scene, regardless of the coordinates.
>
>     ![Ambient Light](img/lighting-7.jpg)

## Shadows

If you want to make object shadows, there are a few steps:

1. Change the **Shadow Type** option on the Light component. **NONE** means that the lights will not generate shadows, and **HARD** means that the lights will generate hard shadows.
2. Select the **MeshRenderer component** that you want to generate the shadow and change the **Shadow Casting Mode** parameter. **OFF** means no shadow will be generated, **ON** means shadow will be generated.
3. Select the **MeshRenderer component** that wants to accept the shadow, change the **Receive Shadows** parameter. **True** means will accept the shadow, and **False** means will not accept the shadow.

Suppose we want to display the projection of a model on a plane, then the parameter settings of each node can refer to the following figure:

1. Light component

    ![Light Component](img/lighting-1.jpg)

2. The MeshRenderer component of the model

    ![Light Component](img/lighting-2.jpg)

3. The MeshRenderer component of the plane

    ![Light Component](img/lighting-3.jpg)
