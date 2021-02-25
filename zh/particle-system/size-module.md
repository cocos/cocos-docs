# 大小模块（SizeOvertimeModule）

![](particle-system/size_module.png)

属性| 作用
:---|:---
**separateAxes** | 是否三个轴分开进行缩放。
**size** | 大小随时间变化的曲线，可采用不同计算模式，当 separateAxes 为 false 时有效。
**X、Y、Z** | 大小随时间变化的曲线，可对三个坐标轴设置不同缩放，可采用不同计算模式，当 separateAxes 为 true 时有效。

![](particle-system/size_overtime.gif)