# Built-in Render Pipeline

The built-in render pipeline uses forward rendering. Forward rendering renders each object in the scene in turn, calculating the lighting for each object as it is rendered. In the built-in render pipeline, there will only be one parallel light in effect for a scene. Each object can only receive 2 point light sources and 2 spotlights, and if it is out of range, the sources will be sorted by distance and the two closest sources will be taken.

The built-in render pipeline contains a **ForwardFlow**, which contains a **ForwardStage**. Two **RenderQueues** are set in the ForwardStage:
- The first one is used for rendering opaque objects, sorted from near to far from the camera.
- The second one is used for rendering translucent objects, sorted from far to near from the camera.
