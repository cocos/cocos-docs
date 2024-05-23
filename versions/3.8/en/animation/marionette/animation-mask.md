# Animation Mask

An animation mask is an asset used in the animation layer to mask the animation effects on a given bone.

For example, if you want to create a walking animation while shooting, you can use the animation mask to mix the upper half of the shooting animation with the lower half of the walking animation.

## Creation

In the **Assets Manager** click on the **+** button at the top left and select **Animation Mask**.

![create-animation-mask](animation-mask/create.png)

An animation mask named **Animation Mask** can be created by default.

![animation-mask-asset](animation-mask/default-mask.png)

## Edit Mask

After selecting an animation mask in the **Assets** panel, you can edit the animation mask resource in the **Inspector** panel.

![inspector](animation-mask/inspector.png)

### Bone import

Before everything starts, you need to make sure that all the bones affected by the skeleton mask are selected.

On the **Inspector** panel, click the ![import](animation-mask/import.png) button, and in the pop-up prefab selection dialog, we select the prefab where the bone hierarchy is located. In general, we select the imported Prefab from the model file (FBX, glTF) where the target model is located, and usually there is only one.

![import mask](animation-mask/import-skeleton.png)

When selected, all bones contained in the Prefab will be included in the Bone Mask resource at

![bones-imported](animation-mask/import-finish.png)。

You can also clear all imported bones by clicking ![clear](animation-mask/clear.png) to clear all imported bones.

### Bone Enable and Disable

When you want the animation effect on a bone to be disabled, make sure the checkbox in front of it remains unchecked.

This is done by clicking on the check box next to the name of the imported skeleton ![checkbox](animation-mask/checkbox.png).

If you want to operate only a single bone, you can select it by pressing <kbd>Alt</kbd> and using the left mouse button at the same time.

Clicking ![checkbox](animation-mask/checkbox.png) check box will check/uncheck both the current skeleton and its children.

By clicking ![expand](animation-mask/expand.png) to expand/hide the sub-bones.

> **Note**: The direct enable/disable relationship between child and parent skeletons is mutually exclusive. That is, even if the parent skeleton is disabled, the child skeleton can still take effect.

If the animation of the layer where the mask is located is not selected, all animations related to that bone will not be played. In the image below, **Bip001 Pelvis** is unchecked, so all animations at that level will not affect that bone.

![check](animation-mask/check-skeleton.png)

## Example

For the full example, please refer to ([GitHub](https://github.com/cocos-creator/example-marionette))
