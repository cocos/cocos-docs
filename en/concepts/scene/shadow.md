# Shadow

In the 3D world, *light* and *shadows* have always been extremely important components. They can enrich the entire environment, good-quality shadows can achieve the effect of false realization, and make the entire world have a three-dimensional feel to it.

Here is an example of a shadow from __Cocos Creator__:
![shadow](shadow/shadowExample.png)

## Turning on shadows

__Cocos Creator__ currently supports two shadow modes, __shadow Map__ and __planer Shadow__ for developers to use.

* It takes three steps to enable a __Planar Shadow__ in __Cocos Creator__:

  1. Select the Scene node on the level manager, you can see the following panel, check the *Enabled* property of *Shadows*.
![location of enable shadow](shadow/shadows.png)

  2. Choose *Type* as *Planar*
![location of shadow type](shadow/planarShadowType.png)

  3. Set *ShadowCastingMode* to *ON* in the model that needs to display shadows.
![ShadowCastingModes property](shadow/planarShadowCastingMode.png)

  > **Note**: __Planar Shadow__ will only be cast on the shadow surface. Adjusting the directional light angle can adjust the shadow projection.

* It takes four steps to enable a __Shadow Map__ in __Cocos Creator__:

  1. Select the Scene node on the level manager, you can see the following panel, check the *Enabled* property of *Shadows*.
![location of enable shadow](shadow/shadows.png)

  2. Choose *Type* as *ShadowMap*
![location of shadow type](shadow/shadowMapType.png)

  3. Set *ShadowCasting* to *ON* in the model that needs to display shadows.
![ShadowCastingModes property](shadow/shadowMapCastingMode.png)

  4. Set *ReceiveShadow* to *ON* in the model that needs to display shadows.
![ReceiveShadowModes property](shadow/shadowMapReceiveMode.png)

  > **Note**: __ReceiveShadow__ receive the shadow effect. __ShadowCasting__ produces a shadow effect.

## PlanarShadows panel

![planar shadow panel details](shadow/planarShadowsDetail.png)

The following describes all the properties of the panel:

| Properties | Explanation |
| --- | --- |
| **Enabled**     | Whether to turn on the shadow effect |
| **Type**        | Choose shade type |
| **ShadowColor** | Color value of the resulting shadow |
| **Normal**      | Normals to vertical and shadow planes |
| **Distance**    | The distance of the shadow plane from the coordinate origin in the direction of the normal |

## ShadowMap panel

### PCF soft shadow support

* Percentage asymptotic filtering (PCF) is a simple and common technique to reverse shadow edges. It performs sampling around the fragment, then calculates the ratio of the sample closer to the light source than the fragment, uses this ratio to scale the scattered light and specular light components, and then colorizes the fragment. After using this technique, the shadow edges appear to be blurred.
* At present, 5x, 9x, and 25x sampling are used to attenuate the coloring. As the sampled area expands, the shadow edge will have a blur effect.

### AutoAdapt adaptive shadow calculation technology

Automatically calculate the range of shadows under the viewport and the distance of the shadow camera.

### GPU Instancing support

We can remove all these static objects such as vegetation from the scene, and save their position, zoom, uv offset and other related information. When rendering is needed, use the saved information to render through Instance, which can reduce The rendering time of large batches of the same objects that cannot be batched due to memory reasons. Generate a shadowMap for the statically batched model, and sample it where it is used.

![shadow map panel details](shadow/shadowsMapDetail.png)

The following describes all the properties of the panel:

| Properties | Explanation |
| --- | --- |
| **Enabled**         | Whether to turn on the shadow effect |
| **Type**            | Choose shade type |
| **ShadowColor**     | Color value of the resulting shadow |
| **Pcf**             | Set the anti-aliasing level of the shadow edge |
| **AutoAdapt**       | Enable autoAdapt adaptive shadow calculation technology    |
| **Near**            | Set the near clipping plane of the main light source shadow camera |
| **Far**             | Set the far clipping plane of the main light source shadow camera |
| **OrthoSize**       | Set the ortho viewport size of the main light source shadow camera |
| **ShadowMapSize**   | Set the shadow map size |
| **Aspect**          | Set the ortho viewport aspect ratio of the main light source shadow camera |
| **Bias**            | Set shadow offset value    |
