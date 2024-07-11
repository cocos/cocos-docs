# MotionStreak（拖尾）组件参考

MotionStreak（拖尾）是运动轨迹，用于在游戏对象的运动轨迹上实现拖尾渐隐效果。

![](motion-streak/motionstreak.png)

点击 **属性检查器** 下方的 **添加组件** 按钮，然后从 **其他组件** 中选择 **MotionStreak**，即可添加 MotionStreak 组件到节点上。

![add motionStreak](motion-streak/add-motion-streak.png)

拖尾的脚本接口请参考 [MotionStreak API](%__APIDOC__%/zh/classes/MotionStreak.html)。

## MotionStreak 属性

| 属性 |   功能说明
| -------------- | ----------- |
| fadeTime | 拖尾的渐隐时间，以秒为单位。|
| minSeg   | 拖尾之间的最小距离。|
| stroke   | 拖尾的宽度。|
| texture  | 拖尾的贴图。|
| fastMode | 是否启用快速模式。当启用快速模式，新的点会被更快地添加，但精度较低。|
