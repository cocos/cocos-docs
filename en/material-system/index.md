# Material System Overview

In the physical reality, all visible objects interact with lights of various sources and spectrums. The term ‘material’ refers to a collection of data used by the renderer to process shading properties and produce convincing render results, which includes texture maps, shading algorithms, etc.

![mat-inspector](img/mat-show.png)

Materials can be applied to mesh objects to convey their visual appearances which is done by instancing from shader [](../shader/index.md) objects. Materials may also include texture maps if a shader object includes definitions for its material parameters.

Materials are the most commonly used tool to give renderable components their visual identity. For instance, a box mesh object can be used to represent water in a rectangular pool or a solid box container. Such distinction can be made by assigning the box mesh object with different materials. Furthermore, materials can be used to convey specific physical attributes, such as the box container being made of either wood or steel; or specific shading properties such as specular, reflectivity and diffusion. 

In Cocos Creator, artists may implement their render workflow either aligning with physical based rendering (PBR) workflows or custom non-physical based rendering (NBR) workflows.

This chapter includes the following sections:

- [Instructions for material creation](material-inspector.md)
- [Calling material parameters in custom scripts](material-script.md)
- [Material structure](material-structure.md)
- [Update guidelines for v2.x](effect-2.x-to-3.0.md)
- [Overview of Cocos Effect](shader/../index.md)
