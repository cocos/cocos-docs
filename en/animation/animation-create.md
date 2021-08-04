# Creating Animation Components and Animation Clips

Before using the **Animation** panel to create animation, you need to select the node you want to add animation to in the **Hierarchy** panel or the **Scene** panel, then add **Animation Component** and mount **Animation Clip** on the component to edit the animation data, and the edited animation data will be saved in the current animation clip. The animation data of the nodes that do not have a Clip mounted cannot be edited.

If the currently selected node does not have an animation component, the **Add Animation Component** button will be displayed on the interface of the **Animation** panel, click it to add **Animation Component** on the **Inspector** panel.

![add component](./animation-create/add-component.png)

Go ahead and click the **Create a new AnimationClip file** button in the **Animation** panel and name it (e.g. `animation`).

![add clip](./animation-create/add-clip.png)

An animation clip (`animation.anim`) is automatically created in the **Assets** panel and mounted to the `DefaultClip` property of the Animation component:

![mount clip](./animation-create/mount-clip.png)

The above briefly describes how to create animation components and animation clips in the **Animation** panel, for more information about the creation and properties of animation components, please refer to the **Animation Component Reference** section below. For more information on how to create animation clips, please refer to the end of this article.

Then go ahead and click **Enter animation editing mode** to start [edit-animation-clip](edit-animation-clip.md). The newly created empty animation clip is displayed in the animation editor as follows:

![empty clip](./animation-create/empty-clip.png)

## Animation Component Reference

There are other ways to add the animation component besides the above methods.

In addition to adding an animation component in the **Animation** panel, you can also add an animation component to a node by selecting the node you want to add an animation to in the **Hierarchy** panel and then selecting **Add Component -> Animation -> Animation** in the **Inspector** panel.

![animation component](./animation-create/animation-component.png)

| Property | Description |
| :-- | :------ |
| Clips | The list of added animation clips, default is empty, the AnimationClip added here can be edited directly in the **Animation** panel. |
| DefaultClip | The default animation clip. If this item is mounted with the **PlayOnLoad** property checked, then the animation will automatically play the content of the Default Clip when it is loaded.
| PlayOnLoad | boolean, if checked, the content of the Default Clip will be played automatically after the animation is loaded.

If an animation needs to contain multiple nodes, then usually we create a node as the **root node** of the animation, and then the animation component will be mounted to the root node, then all the other children nodes under this root node will be automatically entered into this animation clip, and displayed in the **node list** area of the **Animation** panel. For more details, please refer to [Get Familiar with the Animation Panel](animation-editor.md).

The Animation component also provides some common animation control functions. To control animations using scripts, please refer to [Animation Component](animation-component.md).

## Mounting new animation clips

An Animation component can have multiple animation clips mounted on it. If you need to additionally create and mount a new animation clip on the object of an existing animation clip, there are several ways to do so:

1. Click the **+** button at the top left of the **Assets** panel, or right-click on a blank area and select **Animation Clip**, which will generate an animation clip file (default name `animation`) in the **Assets** panel.

    Then select the corresponding node in the **Hierarchy** panel, find the Animation component (`cc.Animation`) in the **Inspector** panel, and change the value of the `Clips` property. For example, if you had only one clip file mounted, and now you want to add another one, change the original **1** to **2**.

    ![add-clip](./animation-create/add-new-clip.png)

    Finally, drag the animation clip you just created in the **Assets** panel to the `cc.AnimationClip` selection box in the above image.

2. Find the Animation component (`cc.Animation`) in the **Inspector** panel and change the value of the `Clips` property.

    Then click the Find button behind the new empty `cc.AnimationClip` selection box, and click the **Create** button at the top right of the pop-up search window to automatically create an animation clip in the **Assets** panel and mount it to the `cc.AnimationClip` selection box.

    ![add-clip](./animation-create/add-new-clip2.png)

3. Create the animation clip dynamically by script, please refer to the [use-animation-curve](use-animation-curve.md) documentation for details.

You can switch the animation clips you want to edit from the **Clips** drop-down list in the top left corner of **Animation** panel.
