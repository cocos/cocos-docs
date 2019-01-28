# Mask component reference

Mask is used to specify the range where the child node can perform rendering. Nodes with a component that contains Mask will use a bounding box (which has the range specified by size) of this node to create a rendered mask. All child nodes of this node will clip according to this mask, which will not be renderer outside the mask range.

![](mask/mask.png)

Click the **Add Component** button at the bottom of the **Properties** panel and select **Mask** from **Renderer Component**. Then you can add the Mask component to the node.

## Mask Properties

| Properties |   Description
| -------------- | ----------- |
| Type           | Mask type. Including `RECT`, `ELLIPSE`, `IMAGE_STENCIL` three types, refer to [Type API](../../../api/en/enums/Mask.Type.html) for details.
| Inverted       | The Reverse mask (Not support Canvas mode)
| Alpha Threshold | Alpha threshold, which is a floating point type and takes effect only if type is set to IMAGE_STENCIL. The content is drawn only if the alpha value of the template pixel is greater than that property (Canvas mode is not supported). The value range of this property is 0 ~ 1, 1 means completely disabled.
| SpriteFrame    | The image required for the mask, which takes effect only when the Mask type is set to IMAGE_STENCIL
| Segements      | The segements for ellipse mask, which takes effect only when the Mask type is set to ELLIPSE

**Note**: After adding the Mask component to a node, all the child nodes of this node will be affected by Mask during rendering.

---

Continue on to read about [ScrollView component reference](scrollview.md).
