# Spine Component Reference

The Spine component supports the data formats exported by Spine, and renders and plays Spine resources.

![spine](./spine/spine-properties.png)

Click the **Add Component** at the bottom of **Properties** and select **Spine Skeleton** from **Renderer Component** in order to add the **Spine** component to the node.

About the Spine's scripting interface please refer to [Skeleton API](../../../api/en/classes/Skeleton.html)

## Spine Properties

| Properties |   Function explanation
| ------------------ | ------------------ |
| Skeleton Data      | The skeleton data contains the skeleton information, drag the bone resources exported from Spine into this property.
| Default Skin       | Choose the default skin texture
| Animation          | The name of current playing animation
| Render Mode        | Render mode, default is `REALTIME` mode.<br>`REALTIME` mode, realtime calculate, support all functions of Spine.<br>`SHARED_CACHE` mode, caching and sharing dragonbones animation data, similar to converting dragonbones animation to frame animation. Has higher performance and less memory usage. And animation blend is not supported, only action start and end events are supported. It is appropriate for special effects, NPC animation and so on.<br>`PRIVATE_CACHE` mode, similar to `SHARED_CACHE`, but does not share animation data.
| Loop               | Whether loop current animation
| Premultiplied Alpha| Indicates whether to enable premultiplied alpha, default is True.<br>You should disable this option when image's transparent area appears to have opaque pixels, or enable this option when image's half transparent area appears to be darken.
| Time Scale         | The time scale of animation of this skeleton
| Debug Slots        | Indicates whether show debug slots
| Debug Bones        | Indicates whether show debug bones
| Use Tint           | Indicates whether open tint, default is close. (New in v2.0.9)
| Enable Batch       | Whether to enable animation batch, default is disabled. (New in v2.0.9)<br>When enable, drawcall will reduce, which is suitable for a large number of simple animations to play at the same time.<br>When not enabled, drawcall will rise, but it can reduce the computational burden of the CPU. Suitable for complex animations.

**Note**: When using the Spine component, the `Anchor` and `Size` properties on the Node component in the **properties** panel are invalid.


---

Continue on to read about [Animation component reference](animation.md).
