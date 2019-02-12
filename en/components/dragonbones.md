# DragonBones Component Reference

The DragonBones component can render and play DragonBones resources.

![dragonbones](./dragonbones/properties.png)

Click the **Add Component** button at the bottom of the **Properties** panel and select **DragonBones** from **Renderer Component** to add the DragonBones component to the node.

The operation of the DragonBones component in the script refer to the [DragonBones test](https://github.com/cocos-creator/example-cases/tree/v2.0/assets/cases/dragonbones) in the [example-cases](https://github.com/cocos-creator/example-cases).<br>About the DragonBones's scripting interface please refer to [DragonBones API](../../../api/en/modules/dragonBones.html)

## DragonBones Properties

| Properties |   Function Explanation
| ------------------ | ------------------ |
| Dragon Asset       | The json data contains the DragonBones information (bind pose bones, slots, draw order,attachments, skins, etc) and animations, but does not hold any state.<br>Multiple ArmatureDisplay can share the same DragonBones data.<br>You can drag and drop the bone resources exported from DragonBones here.
| Dragon Atlas Asset | The json data contains the Texture information. You can drag and drop the Atlas resources exported from DragonBones here.
| Armature           | The name of current armature.
| Animation          | The name of current playing animation.
| Render Mode        | Render mode, default is realtime mode.<br>'realtime' mode, realtime calculate, support all function of dragonbones.<br>'sharedCache' mode, cache animation data and share it, similar to frame animation, has good performace and use less memery, not support animation blend, only support start and complete event, it is appropriate for effect, npc and so on.<br>'privateCache' mode, similar to 'sharedCache' mode, but do not share animation data.
| Time Scale         | The time scale of this armature.
| Play Times         | The play times of the default animation.<br>-1 means using the value of config file.<br>0 means repeat for ever.<br>>0 means repeat times.
| Premultiplied Alpha| Indicates whether to enable premultiplied alpha, default is True. (New in v2.0.7)<br>You should disable this option when image's transparent area appears to have opaque pixels.<br>or enable this option when image's half transparent area appears to be darken.
| Debug Bones        | Indicates whether open debug bones.
| Enabled Batch      | Indicates whether open batch, default is close.<br>If open it, will reduce drawcall, it's appropriate for a lot of same and simple animation playing together.<br>If close it, will rise drawcall, but will reduce pressure of cpu, it's appropriate for complex animation.

**Note**: When the DragonBones component is used, the `Anchor` and `Size` properties on the Node component in the **properties** panel are invalid.
