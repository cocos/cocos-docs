# 贴图动画模块(TextureAnimationModule)

该模块允许使用将纹理作为动画帧，单独播放其中一组子图像。

![](particle-system/texture_animation.png)

属性| 作用
:---|:---
**Mode** | **Grid** 一张贴图包含一个粒子播放的动画帧
**NumTilesX** | 在纹理在水平（X）方向上划分的贴图数量
**NumTilesY** | 在纹理在垂直（Y）方向上划分的贴图数量
**Animation** | WholeSheet 播放贴图中的所有帧，SingleRow 默认播放第一行。可搭配 **RandomRow** 和 **RowIndex** 使用
**FrameOverTime** | 一个周期内帧动画与时间变化曲线。
**StartFrame** | 从第几帧开始播放，时间为整个粒子系统的生命周期
**CycleCount** | 一个生命周期内播放几次循环
**RandomRow** | 随机从精灵图集选择一行播放帧动画。仅当 **Animation** 模式设置为 **SingleRow** 时，此选项才可用
**RowIndex** | 从精灵图集选择特定行播放帧动画。仅当 **Animation** 模式设置为 **SingleRow** 且禁用 **RandomRow** 时，此选项才可用

![](particle-system/texture_animation.gif)
