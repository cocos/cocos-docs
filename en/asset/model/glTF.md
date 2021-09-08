# glTF Models

Cocos Creator supports glTF 2.0 and earlier file formats.

## URI parsing

Creator supports URIs in the following form specified in glTF:


- Data URI

- Relative URI path

- File URL

- File path

## Conversion Relationships

When importing a glTF model into Creator, the assets in glTF will be converted to assets in Creator according to the following relationships:

| glTF assets | Cocos Creator assets |
| :---------- | :---------------- |
| [glTF Scene](https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#reference-scene) | Prefab |
| [glTF Mesh](https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#reference-mesh) | Mesh |
| [glTF Skin](https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#reference-skin) | Skeleton |
| [glTF Material](https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#reference-material) | Material |
| [glTF Texture](https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#reference-texture) | Texture |
| [glTF Image](https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#reference-image) | Image |
| [glTF Animation](https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#reference-animation) | Animation Clip |

### glTF Scene

After import, the glTF scene will be converted to a prefab asset in Creator, and the nodes recursively contained in the glTF scene will be converted to nodes in the prefab one by one according to the same hierarchical relationship.

#### Scene Root Node

The prefab will use a node without any spatial transformation information as the root node, and all [root nodes](https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#scenenodes) of the glTF scene will be the children of this node.

#### Node Conversion

The properties in the glTF node will be converted to properties in the prefab node according to the texture relationships in the following table:

| glTF node properties | prefab node properties |
| :----------- | :----------- |
| [Hierarchy](https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#nodechildren) | Hierarchy |
| [Displacement](https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#nodetranslation) | Position |
| [Rotation](https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#noderotation) | Rotation |
| [Scaling](https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#nodescale) | Scaling |
| [Matrix](https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#nodematrix) | Decompress and set the position, rotation, and scaling respectively |
| [Mesh](https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#nodemesh) | Mesh Renderer component |
| [Skin](https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#nodeskin) | Skinned Mess Renderer component |
| [Initial Weight](https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#nodeweights) | (Skinned) Mesh Renderer component weight |

#### Mesh Renderer

If the glTF node references a mesh, then the corresponding prefab node will also have a MeshRenderer component added to it after import. If the glTF node also references a skin, then the corresponding prefab node will also have a SkinnedMeshRenderer added to it.

The mesh, skeletons, and materials in the Skinned Mesh Renderer component correspond to the transformed glTF mesh, skin, and material assets.

If the glTF node specifies an initial weight, the converted (skinned) mesh renderer will also carry this weight.

### glTF Mesh

After import, the glTF mesh will be converted to a mesh asset in Cocos Creator.

All [primitives](https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#meshprimitives-white_check_mark) in the glTF mesh will be converted to submeshes in the Creator one by one.

If [weight](https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#meshweights) is specified for the glTF mesh, the corresponding weights will be stored in the converted Creator mesh.

#### glTF primitive

The index arrays of the glTF primitives will correspond to the index arrays of the converted Cocos Creator submeshes.

The glTF primitive schema will be converted to the Cocos Creator primitive schema according to the texture in the following table.

| glTF Primitive Schema | Cocos Creator Primitive Schema |
| :--------------- | :------------------------------- |
| `POINTS`         | `gfx.PrimitiveMode.POINT_LIST`   |
| `LINES`          | `gfx.PrimitiveMode.LINE_LIST`    |
| `LINE_LOOP`      | `gfx.PrimitiveMode.LINE_LOOP`    |
| `LINE_STRIP`     | `gfx.PrimitiveMode.LINE_STRIP`   |
| `TRIANGLES`      | `gfx.PrimitiveMode.TRIANGLE_LIST`  |
| `TRIANGLE_STRIP` | `gfx.PrimitiveMode.TRIANGLE_STRIP` |
| `TRIANGLE_FAN`   | `gfx.PrimitiveMode.TRIANGLE_FAN`   |

glTF vertex properties will be converted to Cocos Creator vertex properties, and the property names will be converted as shown in the following table:

| glTF Vertex Attribute Name | Cocos Creator Vertex Attribute Name |
| :------------------------  | :----------------------------------------------------------------------- |
| `POSITION`                 | `gfx.AttributeName.ATTR_POSITION`                                        |
| `NORMAL`                   | `gfx.AttributeName.ATTR_NORMAL`                                          |
| `TANGENT`                  | `gfx.AttributeName.ATTR_TANGENT`                                         |
| `TEXCOORD_0`               | `gfx.AttributeName.ATTR_TEX_COORD`                                       |
| `TEXCOORD_1`..`TEXCOORD_8` | `gfx.AttributeName.ATTR_TEX_COORD1`..`gfx.AttributeName.ATTR_TEX_COORD8` |
| `COLOR_0`                  | `gfx.AttributeName.ATTR_COLOR`                                           |
| `COLOR_1`..`COLOR_2`       | `gfx.AttributeName.ATTR_COLOR1`..`gfx.AttributeName.ATTR_COLOR2`         |
| `JOINTS_0`                 | `gfx.AttributeName.ATTR_JOINTS`                                          |
| `WEIGHTS_0`                | `gfx.AttributeName.ATTR_WEIGHTS`                                         |

> **Note**: if there are other `JOINTS`, `WEIGHTS` vertex attributes in the glTF primitive, such as `JOINTS_1`, `WEIGHTS_1`, it means that the vertices of this glTF mesh may be affected by more than 4 skeletons.


For each vertex, all the weight information determined by `JOINTS_{}`, `WEIGHTS_{}` will be sorted by weight value and the four skeletons with the highest influence weight will be taken as `gfx.AttributeName.ATTR_JOINTS` and `gfx.AttributeName.ATTR_WEIGHTS`. .

glTF deformation targets will be converted to Cocos Creator submesh deformation data.

### glTF Skins

After import, glTF skins will be converted to skeletal assets in Cocos Creator.

### glTF Material

After import, glTF materials will be converted to material assets in Cocos Creator.

### glTF Texture

After import, glTF texture will be converted to a texture asset in Cocos Creator.

The glTF image referenced in the glTF texture will be converted to a reference to the corresponding converted Cocos Creator image.

glTF texture parameters will be converted to Cocos Creator texture parameters according to the texture in the following table:

| glTF Texture Parameters | Cocos Creator Texture Parameters |
| :----------------------- | :----------------------- |
| [Magnification Filter](https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#samplermagfilter) | Magnification Filter |
| [Minification Filter](https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#samplerminfilter) | Minification Filter, Mip Map Filter |
| [S Wrap Mode](https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#samplerwraps) | S Wrap Mode |
| [T Wrap Mode](https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#samplerwrapt) | Wrap Mode |

The glTF texture magnification filter will be converted to the Cocos Creator texture magnification filter according to the texture in the following table:

| glTF Texture Magnification Filter | Cocos Creator Texture Magnification Filter |
| :---------------- | :--------------------------- |
| `NEAREST`         | `TextureBase.Filter.NEAREST` |
| `LINEAR`          | `TextureBase.Filter.LINEAR`  |

The glTF Texture Minification Filter will be converted to Cocos Creator Texture Minification Filter and Cocos Creator Texture Mip Map Filter according to the texture relationships in the following table:

| glTF Texture Minification Filter | Cocos Creator Texture Minification Filter | Cocos Creator Mip Map Filter |
|:------------------------ | :--------------------------- | :-------------------------------- |
| `NEAREST`                | `TextureBase.Filter.NEAREST` | `TextureBase.Filter.NONE`         |
| `LINEAR_MIPMAP_LINEAR`   | `TextureBase.Filter.LINEAR`  | `TextureBase.Filter.NONE`         |
| `LINEAR_MIPMAP_NEAREST`  | `TextureBase.Filter.NEAREST` | `TextureBase.Filter.NEAREST`      |
| `LINEAR`                 | `TextureBase.Filter.LINEAR`  | `TextureBase.Filter.NEAREST`      |
| `NEAREST_MIPMAP_LINEAR`  | `TextureBase.Filter.NEAREST` | `TextureBase.Filter.LINEAR`       |
| `NEAREST_MIPMAP_NEAREST` | `TextureBase.Filter.LINEAR`  | `TextureBase.Filter.LINEAR`       |

glTF Texture Wrap mode will be converted to Cocos Creator Texture Wrap mode according to the texture in the following table:

| glTF Texture Wrap Mode | Cocos Creator Texture Wrap Mode |
| :---------------- | :------------------------------------- |
| `CLAMP_TO_EDGE`   | `TextureBase.WrapMode.CLAMP_TO_EDGE`   |
| `REPEAT`          | `TextureBase.WrapMode.REPEAT`          |
| `MIRRORED_REPEAT` | `TextureBase.WrapMode.MIRRORED_REPEAT` |

### glTF Image

After import, the glTF image will be converted to an image asset in Cocos Creator.

When the [URI](https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#imageuri) of the glTF image is a Data URI, the image data will be fetched from the Data URI. Otherwise, the image data will be resolved from the Data URI according to the [Cocos Creator Image Location Resolution Algorithm](./image-location-resolution.md), where `url` is the URI of the glTF image and `startDir` is the directory where the glTF file is located.


### glTF animation

After import, glTF animations will be converted to Cocos Creator animation assets.
