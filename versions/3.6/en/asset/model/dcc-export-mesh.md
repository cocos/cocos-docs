# Importing Models Exported from DCC Tools

Currently, most __Digital Content Creation (DCC)__ tools ([__3DS Max__](max-export-fbx.md), [__Maya__](maya-export-fbx.md), __Blender__) can export models in __FBX__ and __glTF__ formats. These formats, exported by these tools, can be well received in __Cocos Creator 3.0__.

## Exporting FBX

Because the coordinate system of the DCC tool and the game engine's coordinate system are not necessarily the same, some transformations are required when exporting a model to get the desired result in the engine. For example, Blender's coordinate system is __X-axis right__, __Y-axis inward__, and __Z-axis upward__, while Cocos Creator 3.x's coordinate system is __X-axis right__, __Y-axis upward__, and __Z-axis outward__, so the rotation needs to be adjusted to make the axes consistent.

The following uses Blender 2.8 as an example to introduce the model import process. First, create a model in Blender.

![blender model](./mesh/blender_model.png)

In [Blender's FBX Export Options](https://docs.blender.org/manual/en/2.80/addons/io_scene_fbx.html) documentation, choose __Up__ as __Y Up__ and __Forward__ as __-Z Forward__.

![blender export](./mesh/blender_export_fbx_1.png)

Imported into __Cocos Creator__, notice that the nodes are rotated by __-90__ on the __X-axis__ in order to combine the __axis__ with __Cocos Creator__. The axes are aligned.

![blender export c3d](./mesh/blender_model_c3d.png)

To use a different rotation value, Blender's FBX export plugin provides an experimental function, __Apply Transform__, which can directly transform the rotation data into the model's vertex data.

![blender export bake](./mesh/blender_export_bake.png)

Notice that the rotation data is gone in __Cocos Creator 3.x__.

![blender export bake c3d](./mesh/blender_model_bake_c3d.png)

## Exporting glTF

Please read the following documents:

- [glTF also uses a right-handed coordinate system](https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#coordinate-system-and-units)
- [Options for exporting glTF in Blender](https://docs.blender.org/manual/en/2.80/addons/io_scene_gltf2.html). It is relatively simple, as long as the __+Y Up__ option is checked, there is no rotation value in the exported data.

  ![blender export glTF](./mesh/blender_export_gltf.png)

## Possible issues

During the game development process, the orientation of the model may be used. For example, if some objects should face the player (using the `LookAt()` method), consider the initial orientation of the model. Here are two methods to adjust the initial orientation of the model.

1. In __Cocos Creator 3.x__, the __-Z-axis__ is used as the forward direction, while in Blender, the forward direction is __+Y-axis__, when making a model, the positive direction of the __Y-axis__ should be used as the orientation of the object, and the derived transformation later, in __Cocos Creator__, the __-Z-axis__ will be used as the front direction.
2. To not change the orientation in the DCC tool, try adding a parent node to the imported model in the scene, and then rotate the model so that the initial orientation of the model is the __-Z-axis__. All subsequent rotation-related operations are based on the parent. A node is an operation object.

## Artist's production specifications

1. Reasonably formulating a sub-assets name under model assets (e.g __mesh__ or __material__). Each modification of the sub-assets name will result in the loss of the place associated with the sub-assets in the project.

2. When a part of the model needs to be transparent and a part does not need to be transparent, it should be exported into two materials. If it is a material export that is prone to model penetration, you need to manually adjust the material.

3. External asset references, use relative path when exporting. Otherwise, under the cooperation of multiple people, the original asset path will not be recognized, resulting in the model's built-in materials cannot obtain the texture correctly and appear yellow. __Autodesk 3ds Max__ export local path is modified as follows:

    ![relative path](./mesh/relative_path.png)
