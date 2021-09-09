# MotionStreak component reference

MotionStreak is used to implement a streak effect on the motion track of a game object.

![motionstreak](motion-streak/motionstreak.png)

Click the **Add Component** button at the bottom of the **Inspector** panel and select **MotionStreak** from **Effects** to add the MotionStreak component to the node.

For details on how to use it, please refer to the [MotionStreak](https://github.com/cocos-creator/test-cases-3d/tree/v3.3/assets/cases/ui/24.motion-streak) example.

![add motionStreak](motion-streak/add-motion-streak.png)

For script interfaces of MotionStreak, please refer to [MotionStreak API](__APIDOC__/en/#/docs/3.3/en/particle2d/Class/MotionStreak).

## MotionStreak Properties

| Property | Description
| :-------------- | :----------- |
| CustomMaterial | Custom Material, please refer to the [Custom Material](./../../ui-system/components/engine/ui-material.md) documentation for usage. |
| SrcBlendFactor | Source Blend Factor, please refer to the API [srcBlendFactor](__APIDOC__/en/#/docs/3.3/en/particle2d/Class/ParticleSystem2D?id=srcblendfactor) for details. |
| DstBlendFactor | Destination Blend Factor, please refer to the API [srcBlendFactor](__APIDOC__/en/#/docs/3.3/en/particle2d/Class/ParticleSystem2D?id=dstblendfactor) for details. |
| Color | The color of the MotionStreak. |
| Preview | Whether to enable preview. If this option is enabled, the MotionStreak effect can be previewed in the **Scene** panel. |
| FadeTime | The fade time in seconds of the segment. |
| MinSeg | The minimum segment length (the size of the fading segment). |
| Stroke | The width of the MotionStreak. |
| Texture | The texture of the MotionStreak. |
| FastMode | Whether to enable the fast mode. When fast mode is enabled, new vertices will be added faster, but with less precision. |
