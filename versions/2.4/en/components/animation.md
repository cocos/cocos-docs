# Animation component reference

The **Animation** component enables a node and its child node to make an animation.

![animation.png](./animation/animation.png)

Click the **Add Component** at the bottom of **Properties** and select **Animation** from **Other Components** in order to add the **Animation** component to the node.

## Animation Properties

| Property |   Function explanation
| -------------- | ----------- |
| Default Clip | Default animation editing. If you set the value for this as one and **Play On Load** as true, then the animation will play the contents of **Default Clip** automatically after loading.
| Clips        | Default list type is null. If you add an **AnimationClip** in here, then it will be mirrored in the **animation editor**; users can edit the contents of **Clips** in the **animation editor**
| Play On Load | Boolean type. Chooses whether to play the content of the **Default Clip** automatically after the animation loads.

## Detailed description

If we need to have many nodes contained in one animation, then normally we will create a new node as the **root node** of the animation and add the **Animation** component to this **root node**. The other child nodes of the root node will then automatically enter this animation.

If the following node tree is added:

![animation-hierarchy.png](./animation/animation-hierarchy.png)

Then the hierarchy in the animation editor will show:

![animation-editor-hierarchy.png](./animation/animation-editor-hierarchy.png)

For more information about **Animation**, please read [Animation System](../animation/index.md).
