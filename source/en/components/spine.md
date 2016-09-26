# Spine component reference

Spine component supports Spine (software) exported data format, and manage and drive the player.

![spine](./spine/spine-properties.png)

Click the `add component` at the bottom of **Properties** and select `Spine Skeleton` from `add other components` in order to add the **Spine** component to the node.

## Spine attribute

| Attribute |   Function explanation
| -------------- | ----------- |
|Skeleton Data| Spine '.json' data format after export
|Default Skin| The default skin texture
|Animation| Current animation playback
|Loop| Whether animation loop
|Premultiplied Alpha| Whether to enable premultiplied alpha, default is True.<br>You should disable this option when image's transparent area appears to have opaque pixels,<br>or enable this option when image's half transparent area appears to be darken.
|Time Scale| Playback speed
|Debug Slots| Display picture frame
|Debug Bones| Display bone

> Note: When using Spine components on Node node `Anchor` and` Size` is invalid.

Continue on to read about [Animation component reference](animation.md).
