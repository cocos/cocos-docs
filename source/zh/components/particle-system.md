# Particle System 组件参考

## 概述

该组件是用来读取 [粒子资源](../asset-workflow/particle.md) 数据，并且对其进行一系列例如播放，暂时，销毁等操作。。

## 创建方式

编辑器创建：

点击**属性检查器**下面的`添加组件`按钮，然后从`添加渲染组件`中选择 `ParticleSystem`，即可添加 Particle System 组件到节点上。

脚本创建：

```js
// 创建一个节点
var node = new cc.Node();
// 并将节点添加到场景中
c.director.getScene().addChild(node);
// 并添加粒子组件到 Node 上
var particleSystem = node.adComponent(cc.ParticleSystem);
// 接下去就可以对 particleSystem 这个对象进行一系列操作了
```

Particle System 的脚本接口请参考 [Particle System API](../api/classes/ParticleSystem.html)。

## Particle System 属性

| 属性 |   功能说明
| -------------- | ----------- |
| Preview            | 布尔值，在编辑器模式下预览粒子，启用后选中粒子时，粒子将自动播放
| PlayOnLoad         | 布尔值，如果设置为 true 运行时会自动发射粒子
| AutoRemoveOnFinish | 布尔值，粒子播放完毕后自动销毁所在的节点
| File               | Plist 格式的粒子配置文件
| Custom             | 布尔值，是否自定义粒子属性
| Texture            | 粒子贴图
| Duration           | 发射器生存时间，单位秒，-1 表示持续发射
| EmissionRate       | 每秒发射的粒子数目
| Life               | 粒子的运行时间
| LifeVar            | 粒子的运行时间变化范围
| ParticleCount      | 当前播放的粒子数量
| StartColor         | 粒子初始颜色
| StartColorVar      | 粒子初始颜色变化范围
| EndColor           | 粒子结束颜色
| EndColorVar        | 粒子结束颜色变化范围
| Angle              | 粒子角度
| AngleVar           | 粒子角度变化范围
| StartSize          | 粒子的初始大小
| StartSizeVar       | 粒子的初始大小变化范围
| EndSize            | 粒子结束大小
| EndSizeVar         | 粒子结束大小的变化范围
| StartSpin          | 粒子开始自旋角度
| StartSpinVar       | 粒子开始自旋角度变化范围
| EndSpin            | 粒子结束自旋角度
| EndSpinVar         | 粒子结束自旋角度变化范围
| SourcePos          | 发射器位置
| PosVar             | 发射器位置的变化范围。（横向和纵向）
| PositionType       | 粒子位置类型 [PositionType API](../api/enums/ParticleSystem.PositionType.html)
| EmitterMode        | 发射器类型 [EmitterMode API](../api/enums/ParticleSystem.EmitterMode.html)
| Gravity            | 重力 
| Speed              | 速度 
| SpeedVar           | 速度变化范围 
| TangentialAccel    | 每个粒子的切向加速度，即垂直于重力方向的加速度，只有在重力模式下可用 
| TangentialAccelVar | 每个粒子的切向加速度变化范围 
| RadialAccel        | 粒子径向加速度，即平行于重力方向的加速度，只有在重力模式下可用 
| RadialAccelVar     | 粒子径向加速度变化范围 
| RotationIsDir      | 每个粒子的旋转是否等于其方向，只有在重力模式下可用
| StartRadius        | 初始半径，表示粒子出生时相对发射器的距离，只有在半径模式下可用
| StartRadiusVar     | 初始半径变化范围
| EndRadius          | 结束半径，只有在半径模式下可用
| EndRadiusVar       | 结束半径变化范围
| RotatePerS         | 粒子每秒围绕起始点的旋转角度，只有在半径模式下可用
| RotatePerSVar      | 粒子每秒围绕起始点的旋转角度变化范围
| rotatePerSVar      | 每个粒子的旋转是否等于其方向，只有在重力模式下可用
| rotatePerSVar      | 每个粒子的旋转是否等于其方向，只有在重力模式下可用
| SrcBlendFactor     | 指定原图混合模式 [BlendFactor API](../api/enums/BlendFactor.html)   
| DstBlendFactor     | 指定目标的混合模式 [BlendFactor API](../api/enums/BlendFactor.html)  

## 注意事项

目前由于在 Canvas 中进行的每个粒子纹理 Color 渲染时很耗性能，所以建议在 Canvas 渲染模式下粒子数量不要太多尽量保持在 200 个以内，否则会导致运行时非常卡
