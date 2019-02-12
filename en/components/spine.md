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
| Render Mode        | Render mode, default is realtime mode.<br>'realtime' mode, realtime calculate, support all function of spine.<br>'sharedCache' mode, cache animation data and share it, similar to frame animation, has good performace and use less memery, not support animation blend, only support start and complete event, it is appropriate for effect, npc and so on.<br>'privateCache' mode, similar to 'sharedCache' mode, but do not share animation data.
| Loop               | Whether loop current animation
| Premultiplied Alpha| Indicates whether to enable premultiplied alpha, default is True.<br>You should disable this option when image's transparent area appears to have opaque pixels, or enable this option when image's half transparent area appears to be darken.
| Time Scale         | The time scale of animation of this skeleton
| Debug Slots        | Indicates whether show debug slots
| Debug Bones        | Indicates whether show debug bones
| Use Tint           | Indicates whether open tint, default is close.
| Enabled Batch      | Indicates whether open batch, default is close.<br>If open it, will reduce drawcall, it's appropriate for a lot of same and simple animation playing together.<br>If close it, will rise drawcall, but will reduce pressure of cpu, it's appropriate for complex animation.

**Note**: When using the Spine component, the `Anchor` and `Size` properties on the Node component in the **properties** panel are invalid.


---

Continue on to read about [Animation component reference](animation.md).
