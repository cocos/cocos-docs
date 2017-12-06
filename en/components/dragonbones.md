# DragonBones component reference

DragonBones components render and play to skeleton animation (DragonBones) resources.

![dragonbones](./dragonbones/properties.png)

Click the **Add Component** button at the bottom of the **Properties** panel and select `DragonBones` from `Add Rendering Component` to add the DragonBones component to the node.

The operation of the DragonBones component in the script refer to the DragonBones test in the example cases.

## DragonBones attribute

| Attribute |   Function Explanation
| -------------- | ----------- |
|Dragon Asset| The DragonBones data contains the armatures information (bind pose bones, slots, draw order,attachments, skins, etc) and animations but does not hold any state.<br/>Multiple ArmatureDisplay can share the same DragonBones data.|
|Dragon Atlas Asset| The atlas asset for the DragonBones.|
|ArmatureName| The name of current armature.|
|AnimationName| The name of current playing animation.|
|Time Scale| The time scale of this armature.|
|Play Times| The play times of the default animation. (-1 means using the value of config file, 0 means repeat for ever, >0 means repeat times)
|Debug Bones| Indicates whether open debug bones.

> Note: When the DragonBones component is used, the `Anchor` and `Size` of the node are invalid.
