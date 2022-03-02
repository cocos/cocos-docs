# 内置着色器

引擎提供了一系列通用的内置着色器，位于编辑器 **资源管理器** 面板的 `internal -> effects` 目录下。双击着色器文件即可在外部 IDE 打开进行查看和编辑（前提是需要在 **偏好设置 -> 外部程序** 中配置 **默认脚本编辑器**）。

![内置着色器](img/builtin-effect.png)

## 内置着色器

| 着色器名称 | 说明 |
| :---| :----|
| builtin-billboard.effect           | 公告板<br>公告板是一种使物体始终朝向摄像机的渲染方案，适用于树木，血条等渲染
| builtin-camera-texture.effect      | 相机纹理
| builtin-clear-stencil.effect       | 清理模板缓存
| builtin-graphics.effect| graphics 组件的着色器
| builtin-occlusion-query.effect     | 遮挡查询
| builtin-particle-trail.effect      | 粒子拖尾
| builtin-particle.effect            | 粒子
| builtin-reflection-deferred.effect | 用于延迟着色中的反射处理
| builtin-spine.effect               | Spine 骨骼动画的着色器
| builtin-sprite.effect              | 精灵着色器
| builtin-standard.effect            | [基于物理的光照模型 PBR](effect-builtin-pbr.md)
| builtin-terrain.effect             | 地形系统默认着色器
| builtin-toon.effect                | [卡通渲染](effect-builtin-toon.md)
| builtin-unlit.effect               | [无光照](effect-builtin-unlit.md)
| builtin-wireframe.effect           | 以线框模式进行绘制

## 内置管线特效着色器

| 管线特效                 | 说明        |
| :----------------------- | :---------- |
| bloom.effect             | 全屏泛光特效           |
| deferred-lighting.effect | 用于延迟管线中的光照处理阶段  |
| planar-shadow.effect     | 平面阴影    |
| post-process.effect      | 后处理      |
| skybox.effect            | 天空盒      |
| smaa.effect              | SMAA 抗锯齿 |
