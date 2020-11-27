## 主模块(ParticleSystem)

![](particle-system/main.png)

属性|功能
| --               | --
| duration         | 粒子系统运行总时间
| capacity         | 粒子系统能生成的最大粒子数量
| loop             | 粒子系统是否循环播放
| playOnAwake      | 粒子系统加载后是否自动开始播放
| prewarm          | 选中之后，粒子系统会以已播放完一轮之后的状态开始播放（仅当循环播放启用时有效）
| simulationSpace  | 控制粒子坐标计算所在的坐标系
| startDelay       | 粒子延迟发射的时间
| startLifetime    | 粒子生命周期
| startColor       | 粒子初始颜色
| scaleSpace       | 粒子缩放的坐标空间，**local**基于本地空间的缩放，**world**基于世界空间的缩放
| startSize        | 粒子初始大小
| startSpeed       | 粒子初始速度
| startRotation    | 粒子初始旋转角度
| gravityModifier  | 重力系数
| rateOverTime     | 每秒发射的粒子数
| rateOverDistance | 每移动单位距离发射的粒子数
| bursts           | 在某个时间点发射给定数量的粒子
- time             | 粒子播放多长时候后开始发射burst
- count | 发射的粒子数量
- repeatCount | burst触发次数
- repeatInterval | 每次触发的时间间隔

粒子系统组件接口请参考 [ParticleSystem API](https://docs.cocos.com/creator3d/api/zh/classes/particle.particlesystem.html)。
