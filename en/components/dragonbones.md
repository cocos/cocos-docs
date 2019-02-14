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
| Render Mode        | Render mode, default is `REALTIME` mode.<br>`REALTIME` mode, realtime calculate, support all functions of Dragonbones.<br>`SHARED_CACHE` mode, caching and sharing dragonbones animation data, similar to converting dragonbones animation to frame animation. Has higher performance and less memory usage. And animation blend is not supported, only action start and end events are supported. It is appropriate for special effects, NPC animation and so on.<br>`PRIVATE_CACHE` mode, similar to `SHARED_CACHE`, but does not share animation data.
| Time Scale         | The time scale of this armature.
| Play Times         | The play times of the default animation.<br>-1 means using the value of config file.<br>0 means repeat for ever.<br>>0 means repeat times.
| Premultiplied Alpha| Indicates whether to enable premultiplied alpha, default is True. (New in v2.0.7)<br>You should disable this option when image's transparent area appears to have opaque pixels.<br>or enable this option when image's half transparent area appears to be darken.
| Debug Bones        | Indicates whether open debug bones.
| Enable Batch       | Whether to enable animation batch, default is disabled. (New in v2.0.9)<br>When enable, drawcall will reduce, which is suitable for a large number of simple animations to play at the same time.<br>When not enabled, drawcall will rise, but it can reduce the computational burden of the CPU. Suitable for complex animations.

**Note**: When the DragonBones component is used, the `Anchor` and `Size` properties on the Node component in the **properties** panel are invalid.
