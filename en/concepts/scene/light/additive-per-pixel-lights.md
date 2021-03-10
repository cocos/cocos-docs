# Additive per-pixel lights

The following is an example of how to implement multiple lights based on multiple Pass with the default lighting material `default-material.mtl` in Cocos Creator.

![default-material](default-material.png)

First create a new **Sphere** node in the **Hierarchy** panel, then continue to add a Directional Light and two Spotlights, setting them to surround the Sphere, as shown in the following image:

![using Light](usingLight.png)

After the scene is built, select the browser preview above the editor and you can see the Draw Call in the bottom left corner of the web preview:

![Draw Call](drawCall.png)

We can use a third party software such as RenderDoc to open Frame Debug to see how these lights are rendered to the screen:

![Frame Debug](debug.png)

As shown in the image above, the first rendering is the lighting of **Directional Light**:

![main light pass](pass1.png)

The second rendering is the lighting of **Spot Light 1**:

![ForwardAdd pass](pass2.png)

The third rendering is the lighting of **Spot Light 2**:

![ForwardAdd pass](pass3.png)

This rendering method is the Forward-Pipeline, which supports multiple lighting models.

- The first pass is BasePas, which is used to draw the light from a parallel light.

- The second pass is called LightPass and is used to render the light from the remaining light sources.

Therefore, when an object is illuminated by more than one light at the same time, the Draw Call is increased.
