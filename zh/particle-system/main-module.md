# 主模块（ParticleSystem）

粒子系统主模块用于存储在 **属性检查器** 中显示的所有数据，管理粒子生成、播放、更新，以及销毁相关模块资源。

![main-module](main-module/main-module.png)

| 属性 | 功能 |
| :--              | :-- |
| Duration         | 粒子系统单次运行总时间，也就是产生第一个粒子到最后一个粒子之间的时间 |
| Capacity         | 粒子系统能生成的最大粒子数量 |
| Loop             | 粒子系统是否循环播放 |
| PlayOnAwake      | 粒子系统加载后是否自动开始播放 |
| Prewarm          | 选中之后，粒子系统会以已播放完一轮之后的状态开始播放（仅当循环播放启用时有效） |
| SimulationSpace  | 控制粒子坐标计算所在的坐标系 |
| SimulationSpeed  | 控制整个粒子系统的更新速度 |
| StartDelay       | 粒子系统开始运行后，粒子延迟发射的时间 |
| StartLifetime    | 粒子生命周期，单个粒子从产生到消失的时间 |
| StartColor       | 粒子初始颜色 |
| ScaleSpace       | 粒子缩放时所在的坐标系：<br>**Local**：基于本地坐标系的缩放<br>**World**：基于世界坐标系的缩放<br>**Custom**（目前暂不支持）：自定义缩放，不受节点的 **scale** 属性影响 |
| StartSize3D      | 分别设置粒子 X、Y、Z 轴的初始大小 |
| StartSize        | X 轴的初始大小，与 `StartSize3D` 属性二者只能选其一 |
| StartSpeed       | 粒子初始速度   |
| StartRotation3D  | 分别设置粒子 X、Y、Z 轴的初始旋转角度    |
| StartRotation    | Z 轴初始旋转角度，与 `StartRotation3D` 属性二者只能选其一 |
| GravityModifier  | 粒子受重力影响的重力系数。该项只支持 CPU 粒子，当 [渲染模块](./renderer.md) 中勾选 **UseGPU** 时不生效 |
| RateOverTime     | 每秒发射的粒子数 |
| RateOverDistance | 每个移动单位距离发射的粒子数 |
| Bursts           | 设定在指定时间发射指定数量粒子的 Burst 数量。可通过以下几个属性调整：<br>**Time**：粒子播放多长时候后开始发射 Burst<br>**RepeatCount**：Burst 触发次数<br>**RepeatInterval**：每次触发的时间间隔<br>**Count**：发射的粒子数量 |
| EnableCulling      | 粒子系统资源剔除，详情请参考下文说明   |

点击上述部分属性输入框右侧的 ![menu button](main-module/menu-button.png) 按钮，即可开启粒子曲线/渐变色编辑器，对粒子属性进行编辑，详情请参考 [粒子属性编辑](./editor/index.md)。

![set-pro](main-module/set-pro.png)

粒子系统组件接口请参考 [ParticleSystem API](__APIDOC__/zh/classes/particle.particlesystem.html)。

## 粒子系统资源剔除

**EnableCulling** 选项用于剔除粒子系统中无用模块的资源数据。

粒子系统中各个模块都是作为独立对象存在，每个模块都会存储一些模块相关的数据，因此对于未勾选使用的模块，其记录的数据都是无用数据。当开发者不需要在运行时动态开启这些未使用的模块，可以勾选 **DataCulling** 选项，对这些无用数据进行剔除，从而减小资源占用。
