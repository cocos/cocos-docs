## 主模块(ParticleSystem)

![](particle-system/main.png)

| 属性 | 功能 |
| :--              | :-- |
| duration         | 粒子系统运行总时间 |
| capacity         | 粒子系统能生成的最大粒子数量 |
| loop             | 粒子系统是否循环播放 |
| playOnAwake      | 粒子系统加载后是否自动开始播放 |
| prewarm          | 选中之后，粒子系统会以已播放完一轮之后的状态开始播放（仅当循环播放启用时有效） |
| simulationSpace  | 控制粒子坐标计算所在的坐标系 |
| startDelay       | 粒子延迟发射的时间 |
| startLifetime    | 粒子生命周期 |
| startColor       | 粒子初始颜色 |
| scaleSpace       | 粒子缩放时所在的坐标系<br>**Local**：基于本地坐标系的缩放<br>**World**：基于世界坐标系的缩放<br>**Custom**：自定义缩放，不受节点 **scale** 影响 |
| startSize        | 粒子初始大小 |
| startSpeed       | 粒子初始速度 |
| startRotation    | 粒子初始旋转角度 |
| gravityModifier  | 重力系数 |
| rateOverTime     | 每秒发射的粒子数 |
| rateOverDistance | 每移动单位距离发射的粒子数 |
| bursts           | 在某个时间点发射给定数量的粒子。可通过以下几个属性调整：<br>**time**：粒子播放多长时候后开始发射 burst<br>**count**：发射的粒子数量<br>**repeatCount**：burst触发次数<br>**repeatInterval**：每次触发的时间间隔 |

粒子系统组件接口请参考 [ParticleSystem API](__APIDOC__/zh/#/docs/3.3/zh/particle/Class/ParticleSystem)。
