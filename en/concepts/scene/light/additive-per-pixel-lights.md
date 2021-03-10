# Additive per-pixel lights

The following is an example of how to implement multiple lights based on multiple Pass with the default lighting material `default-material.mtl` in Cocos Creator.

![default-material](default-material.png)

First create a new **Sphere** node in the **Hierarchy** panel, then continue to add a Directional Light and two Spotlights, setting them to surround the Sphere, as shown in the following image:

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
