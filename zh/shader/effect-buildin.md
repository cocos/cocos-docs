# 内置着色器

引擎内部提供了一系列通用的着色器。 若要查看这些着色器， 可在 **资源管理器->internal->effects** 目录内，双击通过外部 IDE 打开。

## 内置着色器

| 着色器名称 | 说明 |
| :---| :----|
| builtin-billboard.effect           | 公告板，公告板是一种使物体始终朝向摄像机的渲染方案，适用于树木，血条等渲染
| builtin-camera-texture.effect      | 相机纹理
| builtin-clear-stencil.effect       | 清理模板缓存
| builtin-graphics.effect| graphics 组件的着色器
| builtin-occlusion-query.effect     | 遮挡检
| builtin-particle-trail.effect      | 粒子拖尾
| builtin-particle.effect            | 粒子
| builtin-reflection-deferred.effect | 用于defer-render的反射处理
| builtin-spine.effect               | Spine 骨骼动画的着色器
| builtin-sprite.effect              | 精灵着色器
| builtin-standard.effect            | [基于物理的光照模型 PBR](effect-buildin-pbr.md)
| builtin-terrain.effect             | 地形系统默认着色器
| builtin-toon.effect                | [卡通渲染](effect-buildin-toon.md)
| builtin-unlit.effect               | [无光照模型](effect-buildin-unlit.md)
| builtin-wireframe.effect           | 以网格方式进行绘制

## 内置管线特效着色器

| 管线特效                 | 说明        |
| :----------------------- | :---------- |
| bloom.effect             | 泛光特效           |
| deferred-lighting.effect | 用于 defer-render 的光照处理  |
| planar-shadow.effect     | 平面阴影    |
| post-process.effect      | 后处理      |
| skybox.effect            | 天空盒      |
| smaa.effect              | SMAA 抗锯齿 |
