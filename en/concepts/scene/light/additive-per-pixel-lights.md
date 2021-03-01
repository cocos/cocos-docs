# additive per-pixel lights

First we use the default lighting material in Cocos.

![default-material](default-material.png)

As shown in the title picture, we placed a sphere in the scene, then a parallel light, and two spotlights, placed around the sphere.

![using Light](usingLight.png)

Take a look at Draw Call under Status:

![Draw Call](drawCall.png)

Let's open Frame Debug to see how these are rendered to the screen:

![Frame Debug](debug.png)

In the first pass, first render the base color of `Directional Light`:

![main light pass](pass1.png)

In the second pass, the Lighting pass of `Spot Light 1` is rendered:

![ForwardAdd pass](pass2.png)

In the third pass, the Lighting pass of `Spot Light 2` is rendered:

![ForwardAdd pass](pass3.png)

This rendering method is the Forward-Pipeline, which supports multiple lighting models.

- The first pass is BasePas, which is used to draw the light from a parallel light.

- The second pass is called LightPass and is used to render the light from the remaining light sources.

Therefore, when an object is illuminated by more than one light at the same time, the Draw Call is increased.
