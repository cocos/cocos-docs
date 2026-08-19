# Vertex Animation Texture (VAT)

Vertex Animation Texture (VAT) is commonly used to express physics simulation animations such as rigid body fragmentation, fabric, fluid, etc. Physics simulation animations computed in PCG software such as Houdini can be baked into VAT data for export and playback in real-time rendering engines to reproduce complex physics effects with very low performance consumption.

Currently, the supported VAT data formats are rigid body, flexible body and fluid data exported from Houdini, and fluid data from Zeno.

## Data Export and Usage

The exported VAT data contains three parts: fbx model, animation texture, and json file containing VAT material properties (frame count and box max/min value, etc.).

### Rigid Body

1、Export：After Houdini set up rigid body collision, crushing and other animations, choose **VAT2.0 version, UE mode, no paddle, LDR way** to export.

2、Material：Create a material in Cocos Creator, choose **util/dcc/vat/houdini-rigidbody-v2** for Effect.

3、Parameter：Check the exported json file, fill the data of Animation Speed, NumOfFrames, PivotMin/Max, PosMin/Max into the material.

4, Texture: Expand the exported Position shape map, drag the body into PositionMap, and the subordinate Sign and Alpha into PosSignMap and PosAlphaMap respectively (if any).
Rotation normal map is the same.

### Softbody

1, Export: After Houdini set up the animation of soft body collision and crushing, choose **VAT3.0 version, Unity mode, no paddle, LDR way** to export.

2、Material：Create a material in Cocos Creator, choose **util/dcc/vat/houdini-softbody-v3** for Effect.

3、Parameter：Check the exported json file, fill the data of Animation Speed and NumOfFrames into the material.

4、Texture：Expand the exported Position shape map, drag the body into PositionMap, and the subordinate Sign and Alpha into PosSignMap and PosAlphaMap respectively (if any).
Same for the Rotation normal map.

### Fluid (Houdini)

1、Export：After Houdini set up the fluid animation, choose **VAT3.0 version, Unity mode, no paddle, LDR way** to export.

2、Material：Create a material in Cocos Creator, choose **util/dcc/vat/houdini-fluid-v3-liquid** for Effect.

3、Parameter: Check the exported json file, fill the data of Animation Speed and NumOfFrames into the material.

    - Check Use Lookup Texture, drag the exported lookup image into LookupMap.
    - Check Use Lookup Auto Frame, fill the resolution of the exported lookup into LUTTextureWidth/Height.
    - Select the exported fbx model, record its vertex count and fill in FBXVertexCount.

4. Mapping: Expand the exported Position map, drag the body into PositionMap, and the subordinate Sign and Alpha into PosSignMap and PosAlphaMap respectively (if any).
Same for Rotation normal map.

### Fluid (Zeno)

1, Export: After Zeno set up the fluid animation, choose **VAT mode** to export.

2、Material：Create a material in Cocos Creator, choose **util/dcc/vat/zeno-fluid-liquid** for Effect.

3、Parameters：Check the exported json file, and fill the data such as Animation Speed and NumOfFrames into the material.

4、Texture：Expand the exported Position map and drag it to PositionMap, Rotation map and drag it to RotationMap.

### Error effect debugging

### Rigid Body

If there are animation anomalies such as the pieces going around in circles, please make sure the export option is in VAT2.0 UE mode, if you choose the wrong Unity mode, it may lead to this situation.

### Fluid

If the faces are broken or even a little bit messed up, please check if the NumOfFrames are the same as the ones in the DCC software.

If the whole fluid is shaking or has interspersed faces, make sure the filter mode of both maps is Nearest, and make sure fix alpha transparency artifacts is unchecked.