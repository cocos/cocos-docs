# Mask Component Reference

Mask is used to specify the range where the child node can perform rendering. Nodes with a component that contains Mask will use a bounding box (which has the range specified by Size) of this node to create a rendered mask. All child nodes of this node will clip according to this mask, which will not be renderer outside the mask range.

![](mask/mask.png)

Click the **Add Component** button at the bottom of the **Properties** panel and select **Mask** from **Renderer Component**. Then you can add the Mask component to the node.

## Mask Properties

| property |   Description
| -------------- | ----------- |
| Type           | Mask type. Including `RECT`, `ELLIPSE`, `IMAGE_STENCIL` three types, refer to [Type API](%__APIDOC__%/en/enums/Mask.Type.html) for details.
| Inverted       | The Reverse mask.
| Alpha Threshold| Alpha threshold, which is a floating point type and takes effect only if type is set to `IMAGE_STENCIL`.<br>The content is drawn only if the alpha value of the template pixel is greater than that value.<br>The value range of this property is 0 ~ 1, 1 means completely disabled.
| Sprite Frame   | The image required for the mask, which takes effect only when the Mask type is set to `IMAGE_STENCIL`.
| Segements      | The segements for ellipse mask, which takes effect only when the Mask type is set to `ELLIPSE`.

> **Note**: after adding the Mask component to a node, all the child nodes of this node will be affected by Mask during rendering.
