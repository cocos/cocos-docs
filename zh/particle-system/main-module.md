# 主模块（ParticleSystem）

![main](particle-system/main.png)

| 属性 | 功能 |
| :--              | :-- |
| duration         | 粒子系统运行总时间 |
| capacity         | 粒子系统能生成的最大粒子数量 |
| loop             | 粒子系统是否循环播放。如果允许循环，粒子系统会在持续时间结束后再次启动粒子系统并继续执行循环。 |
| playOnAwake      | 粒子系统加载后是否自动开始播放 |
| prewarm          | 选中之后，粒子系统会以已播放完一轮之后的状态开始播放（仅当循环播放启用时有效） |
| simulationSpace  | 控制粒子坐标计算所在的坐标系。<br>**Local**：基于本地坐标系的缩放。如果粒子节点此时在运动，所产出的所有粒子也会跟随一起运动<br>**World**：基于世界坐标系的缩放。如果粒子节点此时在运动，所产出的所有粒子不会跟随一起运动<br>**Custom**：自定义缩放，不受节点 **scale** 影响 |
| simulationSpeed       | 模拟粒子运动速率 |
| startDelay       | 粒子延迟发射的时间 |
| startLifetime    | 粒子生命周期 |
| startColor       | 粒子初始颜色 |
| scaleSpace       | 粒子缩放时所在的坐标系<br>**Local**：基于本地坐标系的缩放<br>**World**：基于世界坐标系的缩放<br>**Custom**：自定义缩放，不受节点 **scale** 影响<br>参数意义同 `simulationSpace` |
| startSize        | 粒子初始大小 |
| startSize3D        | 粒子初始大小。可调整 3 个轴向分量数据 |
| startSpeed       | 粒子初始速度 |
| startRotation    | 粒子初始旋转角度 |
| startRotation3D    | 粒子初始旋转角度。可调整 3 个轴向分量数据 |
| gravityModifier  | 重力系数 |
| rateOverTime     | 每秒发射的粒子数 |
| rateOverDistance | 每移动单位距离发射的粒子数。假设：数值为 10，那么每 0.1 单位发射一个粒子；数值为 20，那么每 0.05 单位发射一个粒子 |
| bursts           | 在某个时间点发射给定数量的粒子。可通过以下几个属性调整：<br>**time**：粒子系统持续多长时间后开始发射粒子<br>**repeatCount**：总共需要触发次数<br>**repeatInterval**：每次触发的时间间隔<br>**count**：每次发射的粒子数量 |
| enableCulling | 是否需要裁切暂未使用的粒子模块数据。默认所有模块的数据都会序列化进场景文件里，勾选此选项，可以剔除除主模块外没有用到的模块数据。例如：制作某粒子时只使用到了发射器模块，那么勾选此选项，加速度模块和限速模块等模块数据都会被剔除。  |

粒子系统组件接口请参考 [ParticleSystem API](__APIDOC__/zh/classes/particle.particlesystem.html)。
