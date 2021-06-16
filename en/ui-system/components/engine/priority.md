# Rendering Order

## 1. UI node ordering

UI nodes refer to the UI nodes under the Canvas node, these nodes do not have depth testing enabled, so the mixing of nodes is strictly sorted according to the node tree. The rendering order of the UI uses a **Breadth-First Sorting** scheme, and the node tree order is the final rendering data submission order. So the user can change the order of the nodes under their parents by setting the `siblingIndex` of the nodes and thus change the rendering order.

For example:

![priority.png](priority/priority.png)

Therefore, the overall rendering order in the figure above is __A -> a1 -> a2 -> B -> b1 -> C__, and the rendering state on the screen is __C -> b1 -> B -> a2 -> a1 -> A__. i.e. __from top to bottom__.

`setSiblingIndex` is used to change the position of the current node in the children array of the parent node. If set at runtime by script, the changed node tree data will not be serialized. If the parameter passed in is larger than the length of the children array, it will be set to the end of the array, and if it is within the range, it will be inserted into the corresponding position. This operation is related to the state of the node tree in real time, and the user needs to know the current state of the node tree and perform the operation to get the expected result.

## 2. Mixed camera sorting

The **UI camera** has the highest priority when it was originally designed, that is, the **UI camera** content is only drawn after all 3D content is drawn. However, this will cause a problem. Once the **UI camera** has a background or large icon, it will block the 3D content. Therefore, a mixed sorting function between cameras is essential.

The key factor of the mixed sorting of the **UI camera** and the **3D camera** is here in the **UI camera**. Therefore, the `Canvas` on the root node of the UI, which is the Canvas node, provides a property called __RenderMode__ to distinguish the sorting method.Next, talk about the role of the __RenderMode__ option:

1. When the selection mode is __OVERLAY__, it means that the **UI camera** will always be behind the 3D camera, which means __will always cover the rendering content of the 3D camera__. Multiple UI cameras select this mode, and use the attribute __Priority__ to sort between UI cameras.

    ![overlay](./priority/overlay.png)

2. When the selection mode is __INTERSPERSE__, it is possible to mix and sort with the **3D camera**. The sorting method between **UI camera** and the **3D camera** is done by setting __Priority__ on the `Canvas\Camera` component.

    ![intersperse](./priority/intersperse.png)

## Detailed Explanation

**Sorting** is a very simple function, but the final rendering is based on the rendering capabilities provided by different platforms. Therefore, explain here. If you encounter an error in **UI rendering**, such as **flickering or unwanted artifacts or other please consider the following**.
The first thing to check is the __ClearFlag__ of all cameras (**Camera** and **Canvas**) in the scene, and make sure that the lowest __Canvas__ or __Camera__'s **ClearFlag** property is set to __SOLID_COLOR__ in each scene.

To set the __ClearFlag__ property, please refer to the following situations:
- If there is only one __2D Canvas__ or __3D Camera__ in the scene, then the __ClearFlag__ property is set to `Solid_Color`.
- If the scene contains 2D background layer, 3D scene layer, 2D UI layer, then:
  - **2D background layer**: __ClearFlag__ property is set to `Solid_Color`.
  - **3D scene layer**: __ClearFlag__ property is set to `Depth_Only`.
  - **2D UI layer**: If the model is included, the __ClearFlag__ property is set to `Depth_Only` to avoid a model splash screen. If no model is present, the __ClearFlag__ property can be set to `Dont_Clear`/`Depth_Only`.
