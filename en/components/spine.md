# Spine Component Reference

The Spine component supports the data formats exported by Spine, and renders and plays Spine resources.

![spine](./spine/spine-properties.png)

Click the **Add Component** at the bottom of **Properties** and select **Spine Skeleton** from **Renderer Component** in order to add the **Spine** component to the node.

About the Spine's scripting interface please refer to [Skeleton API](../../../api/en/classes/Skeleton.html)

## Spine Properties

| Properties |   Function explanation
| ------------------ | ------------------ |
| Skeleton Data      | The skeleton data contains the skeleton information, drag the json  file exported from Spine to get started.
| Default Skin       | Choose the default skin texture
| Animation          | The name of current playing animation
| Loop               | Whether loop current animation
| Premultiplied Alpha| Indicates whether to enable premultiplied alpha, default is True.<br>You should disable this option when image's transparent area appears to have opaque pixels.<br>or enable this option when image's half transparent area appears to be darken.
| Time Scale         | The time scale of animation of this skeleton
| Debug Slots        | Indicates whether show debug slots
| Debug Bones        | Indicates whether show debug bones

**Note**: When using the Spine component, the `Anchor` and `Size` properties on the Node component in the **properties** panel are invalid.


---

Continue on to read about [Animation component reference](animation.md).
