# MotionStreak（拖尾）组件参考

MotionStreak（拖尾）是运动轨迹，用于在游戏对象的运动轨迹上实现拖尾渐隐效果。

![motionstreak](motion-streak/motionstreak.png)

点击 **属性检查器** 下方的 **添加组件** 按钮，然后从 **Effects** 中选择 **MotionStreak**，即可添加 MotionStreak 组件到节点上。

具体的使用方式可以参考 **MotionStreak** ([GitHub](https://github.com/cocos/cocos-test-projects/tree/v3.7/assets/cases/ui/24.motion-streak) | [Gitee](https://gitee.com/mirrors_cocos-creator/test-cases-3d/tree/v3.7/assets/cases/ui/24.motion-streak)) 范例。

![add motionStreak](motion-streak/add-motion-streak.png)

拖尾的脚本接口请参考 [MotionStreak API](%__APIDOC__%/zh/class/MotionStreak)。

## MotionStreak 属性

| 属性 |   功能说明
| :-------------- | :----------- |
| CustomMaterial | 自定义材质，使用方法请参考 [自定义材质](./../../ui-system/components/engine/ui-material.md)。 |
| Preview  | 是否启用预览。若勾选该项，则可在 **场景编辑器** 中预览拖尾效果 |
| FadeTime | 拖尾的渐隐时间，以秒为单位。|
| MinSeg   | 最小的片段长度（渐隐片段的大小）。拖尾条带相连顶点间的最小距离。|
| Stroke   | 拖尾的宽度。|
| Texture  | 拖尾的贴图。|
| FastMode | 是否启用快速模式。当启用快速模式，新的顶点会被更快地添加，但精度较低。|
| Color    | 拖尾的颜色。 |
