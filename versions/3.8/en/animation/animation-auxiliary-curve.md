# The Auxillary Curve

The Auxillary Curve is a new feature in Cocos Creator 3.8, and you can read the [Auxillary Curve](./marionette/procedural-animation/auxiliary-curve/index.md) to help understanding the basic concepts.

Please make sure the **Animation Auxillary Curve** option is enabled in the **Laboratory** page of the **Preference** panel.

![enable.png](./animation-auxiliary-curve/enable.png)

In this section, we will introduce to you how to use the auxillary curve in the animation editor. Auxillary curve is a part of a curve editor, the basic curve options can be refer to [Curve Editor](./curve-editor.md).

Select the node with the animation component (Animation, SkeletalAnimation or AnimationController). Click on the button in the figure below to enter the editing mode.

![start-edit.png](./animation-auxiliary-curve/start-edit.png)

The Auxiliary Curves section in the figure below shows the auxiliary curves.

![overview.png](./animation-auxiliary-curve/overview.png)

## Adding and Removing Curves

Clicking the "+" button on an auxiliary curve in the animation editor will add an auxiliary curve to the current animation.

![add-curve.png](./animation-auxiliary-curve/add-curve.png)

The name of the auxiliary curve can be modified after it has been added. It can also be changed later by clicking on the auxiliary curve with the right mouse button and using the Rename menu in the popup menu.

![add-curve.png](./animation-auxiliary-curve/menu.png)

In the popup menu, click the Remove menu to remove the currently selected auxiliary curve or rename the curve.

## New Keyframe

Keyframes can be added by clicking the right mouse button on the right side of the Auxiliary Curve Editor.

![create-key-frame.png](./animation-auxiliary-curve/create-key-frame.png)

After creating a keyframe, the pop-up menu with a right-click on the keyframe allows you to adjust the information of the keyframe or interpolation.

![keyframe-menu.png](./animation-auxiliary-curve/keyframe-menu.png)

| Menu | Description |
| :--- | :--- |
| Delete | Delete this keyframe | Duplicate | Auxiliary keyframe.
| Copy | Auxiliary keyframe, after copying, you can paste the information of the keyframe when clicking other keyframes or blank space |
| Paste | Copy the previously copied keyframe to the mouse clicked position or replace the information of the selected keyframe |
| Edit | Click the popup box to change the time and value of the current keyframe. <br> ![keyframe-menu.png](./animation-auxiliary-curve/edit-pop.png)
| Flag tangent | When clicked, the tangent line of the curve at that point will switch to horizontal mode<br> ![flat.png](./animation-auxiliary-curve/flat.png)
| Interpolation Mode | See [Linear Interpolation Mode](./curve-editor.md#Interpolation%20Mode) |
| Tangent weight mode | See [Tangent weight mode](./curve-editor.md#Tangent%20Weight%20Mode) |
