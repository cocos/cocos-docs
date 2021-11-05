## 粒子系统功能介绍

ParticleSystem 存储了粒子发射的初始状态以及粒子发射后状态更新子模块。

### 粒子系统模块

[主模块(ParticleSystem)](main-module.md)

[发射器模块(ShapeModule)](emitter.md)

[颜色模块(ColorOvertimeModule)](color-module.md)

[大小模块(SizeOvertimeModule)](size-module.md)

[旋转模块(RotationOvertimeModule)](rotation-module.md)

[速度模块(VelocityOvertimeModule)](velocity-module.md)

[限速模块(LimitVelocityOvertimeModule)](limit-velocity-module.md)

[加速模块(ForceOvertimeModule)](force-module.md)

[贴图动画模块(TextureAnimationModule)](texture-animation-module.md)

[渲染模块(Renderer)](renderer.md)

[拖尾模块(TrailModule)](trail-module.md)

### 粒子系统资源剔除

各个粒子系统的模块都是作为独立对象存在，每个模块都会存储一些模块相关的数据，因此对于未勾选使用的模块，其记录的数据则是无用数据。当开发者不需要在运行时动态开启这些未编辑使用的模块，可以勾选 ParticleSystem 的 Inspector 面板最下方的 DataCulling 选项，对这些无用数据进行剔除，从而减小资源占用。
