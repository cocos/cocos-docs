# 旋转模块(RotationOvertimeModule)

该模块可配置粒子运行时在移动中旋转，可用于下落的雪花这类随机旋转特效。

![](particle-system/rotation_module.png)

属性| 作用
:---|:---
**SeparateAxes** | 是否三个轴分开进行旋转。
**X Y Z** | 旋转随时间变化的曲线，可对三个坐标轴设置不同旋转，可通过右边的下拉三角选择不同的设置方式。X、Y 仅当 **SeparateAxes** 为 true 时有效。

![](particle-system/rotate_overtime.gif)
