# 贴图动画模块(TextureAnimationModule)

![](particle-system/texture_animation.png)

属性| 作用
:---|:---
**mode** | grid 一张贴图包含一个粒子播放的动画帧。
**numTilesX** | x 方向动画帧数。
**numTilesY** | y 方向动画帧数。
**animation** | wholeSheet 播放贴图中的所有帧，singleRow 只播放其中一行。
**randomRow** | 随机从动画贴图中选择一行以生成动画，此选项仅在动画播放方式为 `SingleRow` 时生效。
**rowIndex** | 从动画贴图中选择特定行以生成动画,\n此选项仅在动画播放方式为 `SingleRow` 时且禁用 `randomRow` 时可用。
**frameOverTime** | 一个周期内动画播放的帧与时间变化 [曲线](editor/curve-editor.md)。
**startFrame** | 从第几帧开始播放，时间为整个粒子系统的生命周期。
**cycleCount** | 一个生命周期内播放几次循环。

![](particle-system/texture_animation.gif)