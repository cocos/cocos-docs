# 贴图动画模块（TextureAnimationModule）

贴图动画模块用于将 [渲染模块](./renderer.md) 中 **ParticleMaterial** 属性指定的贴图纹理作为动画帧进行动态播放，用于实现类似下图中的效果：

![texture_animation](module/texture_animation.gif)

## 属性

![texture_animation](module/texture_animation.png)

| 属性 | 说明 |
| :--- | :--- |
| **Mode** | 设定粒子动画贴图的类型，目前只支持 **Grid**（网格）模式。一张贴图包含一个粒子播放的动画帧。
| **NumTilesX** | 贴图纹理在水平（X）方向上划分的贴图数量。
| **NumTilesY** | 贴图纹理在垂直（Y）方向上划分的贴图数量。
| **Animation** | 动画播放方式，包括：<br> **WholeSheet**：播放贴图中的所有帧；<br>**SingleRow**：只播放其中一行，默认第一行。可搭配 **RandomRow** 和 **RowIndex** 属性使用。
| **RandomRow** | 随机从动画贴图中选择一行播放动画帧。<br>该项仅在 **Animation** 设置为 **SingleRow** 时生效。
| **RowIndex** | 从动画贴图中选择特定行以播放动画帧。<br>该项仅在 **Animation** 设置为 **SingleRow** 并且禁用 **RandomRow** 时生效。
| **FrameOverTime** | 设置动画播放速度。<br>当点击输入框右侧的 ![menu button](main-module/menu-button.png) 按钮，切换使用曲线编辑时，表示一个周期内动画播放的帧与时间变化曲线。
| **StartFrame** | 指定动画在整个粒子系统生命周期的第几帧开始播放。
| **CycleCount** | 动画帧在粒子生命周期内重复播放的次数。
