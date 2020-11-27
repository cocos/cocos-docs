## 拖尾模块（TrailModule）
![](particle-system/trail_module.png)

属性| 作用
---|---
**mode** | Particle在每个粒子的运动轨迹上形成拖尾效果。
**LifeTime** | 拖尾的生命周期。
**MinParticleDistance** | 粒子每生成一个拖尾节点所运行的最短距离。
**Space** | 拖尾所在的坐标系，World在世界坐标系中运行，Local在本地坐标系中运行。
**ExistWithParticles** | 拖尾是否跟随粒子一起消失。
**TextureMode** | 贴图在拖尾上的展开形式，Stretch贴图覆盖在整条拖尾上，Repeat贴图覆盖在一段拖尾上。
**WidthFromParticle** | 拖尾宽度继承自粒子大小
**WidthRatio** | 拖尾宽度，如果继承自粒子则是粒子大小的比例
**ColorFromParticle** | 拖尾颜色是否继承自粒子
**ColorOverTrail** | 拖尾颜色随拖尾自身长度的颜色渐变
**ColorOvertime** | 拖尾颜色随时间的颜色渐变

![](particle-system/trail.gif)