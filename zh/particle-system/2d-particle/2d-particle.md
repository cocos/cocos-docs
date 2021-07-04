# ParticleSystem2D 组件参考

2D 粒子组件（ParticleSystem2D）用于读取粒子资源数据，并对其进行一系列例如播放、暂停、销毁等操作。粒子资源支持 `plist` 文件和图片，这两个资源建议放在同一个文件夹下。

![ParticleSystem2D](./2d-particle.png)

点击 **属性检查器** 下方的 **添加组件** 按钮，然后从 **Effects** 中选择 **ParticleSystem2D**，即可添加 ParticleSystem2D 组件到节点上。

ParticleSystem2D 的脚本接口请参考 [ParticleSystem API](__APIDOC__/zh/classes/particle2d.particlesystem2d.html)。

## ParticleSystem2D 属性

| 属性 |   功能说明
| :-------------- | :----------- |
| CustomMaterial        | 自定义材质，使用方法参考 [自定义材质](../../ui-system/components/engine/ui-material.md)
| Src Blend Factor      | 混合显示材质时，原图片的取值模式。可参考 [BlendFactor API](__APIDOC__/zh/classes/particle2d.particlesystem2d.html#srcblendfactor)
| Dst Blend Factor      | 混合显示材质时，目标图片的取值模式。可参考 [BlendFactor API](__APIDOC__/zh/classes/particle2d.particlesystem2d.html#dstblendfactor)
| Color                 | 粒子颜色
| Preview               | 在编辑器模式下预览粒子，启用后选中粒子时，粒子将自动播放
| Play On Load          | 如果设置为 true 运行时会自动发射粒子
| Auto Remove On Finish | 粒子播放完毕后自动销毁所在的节点
| File                  | Plist 格式的粒子配置文件
| Custom                | 是否自定义粒子属性。开启该属性后可自定义以下部分粒子属性
| Sprite Frame          | 自定义的粒子贴图
| Duration              | 发射器生存时间，单位秒，-1 表示持续发射
| Emission Rate         | 每秒发射的粒子数目
| Life                  | 粒子的运行时间及变化范围
| Total Particle        | 粒子最大数量
| Start Color           | 粒子初始颜色
| End Color             | 粒子结束颜色
| Angle                 | 粒子角度及变化范围
| Start Size            | 粒子的初始大小及变化范围
| End Size              | 粒子结束时的大小及变化范围
| Start Spin            | 粒子开始自旋角度及变化范围
| End Spin              | 粒子结束自旋角度及变化范围
| Pos Var               | 发射器位置的变化范围。（横向和纵向）
| Position Type         | 粒子位置类型，包括 **FREE**、**RELATIVE**、**GROUPED** 三种。详情可参考 [PositionType API](__APIDOC__/zh/classes/particle2d.particlesystem2d.html#positiontype)
| Emitter Mode          | 发射器类型，包括 **GRAVITY**、**RADIUS** 两种。详情可参考 [EmitterMode API](__APIDOC__/zh/classes/particle2d.particlesystem2d.html#emittermode-1)
| Gravity               | 重力。仅在 Emitter Mode 设为 **GRAVITY** 时生效
| Speed                 | 速度及变化范围。仅在 Emitter Mode 设为 **GRAVITY** 时生效
| Tangential Accel      | 每个粒子的切向加速度及变化范围，即垂直于重力方向的加速度。仅在 Emitter Mode 设为 **GRAVITY** 时生效
| Radial Accel          | 粒子径向加速度及变化范围，即平行于重力方向的加速度。仅在 Emitter Mode 设为 **GRAVITY** 时生效
| Rotation Is Dir       | 每个粒子的旋转是否等于其方向。仅在 Emitter Mode 设为 **GRAVITY** 时生效
| Start Radius          | 初始半径及变化范围，表示粒子发射时相对发射器的距离。仅在 Emitter Mode 设为 **RADIUS** 时生效
| End Radius            | 结束半径。仅在 Emitter Mode 设为 **RADIUS** 时生效
| Rotate Per S          | 粒子每秒围绕起始点的旋转角度及变化范围。仅在 Emitter Mode 设为 **RADIUS** 时生效
