# Rendering Order

## 1. UI node ordering

The rendering order of the UI uses the **Breadth-First Sorting** scheme, and each UITransform component has a `priority` property. Adjust the order of nodes according to the value of priority.

Sorting starts from the child nodes under the root node, and determines the overall rendering structure according to the priority of the child nodes, that is, the rendering order of the child nodes under the root node has determined the final rendering order. The `priority` property of all child nodes under each node is used to determine the rendering order under the current node.

For example:

![priority.png](priority/priority.png)

Therefore, the overall rendering order in the figure above is __B -> b1 -> C -> A -> a1 -> a2__, and the rendering state on the screen is __a2 -> a1 -> A -> C -> b1 -> B__.

## 2. Mixed camera sorting

The **UI camera** has the highest priority when it was originally designed, that is, the **UI camera** content is only drawn after all 3D content is drawn. However, this will cause a problem. Once the **UI camera** has a background or large icon, it will block the 3D content. Therefore, a mixed sorting function between cameras is essential.

The key factor of the mixed sorting of the **UI camera** and the **3D camera** is here in the **UI camera**. Therefore, the `Canvas` on the root node of the UI, which is the Canvas node, provides a property called __RenderMode__ to distinguish the sorting method.Next, talk about the role of the __RenderMode__ option:

1. When the selection mode is __OVERLAY__, it means that the **UI camera** will always be behind the 3D camera, which means __will always cover the rendering content of the 3D camera__. Multiple UI cameras select this mode, and use the property __Priority__ to sort between UI cameras.

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
