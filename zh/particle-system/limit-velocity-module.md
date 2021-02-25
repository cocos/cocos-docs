# 限速模块(LimitVelocityOvertimeModule)

![](particle-system/limit_module.png)

属性| 作用
:---|:---
**space** | 速度在哪个坐标系中计算。<br>**Local**：基于本地坐标系运动。如果粒子节点此时在运动，所产出的所有粒子也会跟随一起运动<br>**World**：基于世界坐标系的运动。如果粒子节点此时在运动，所产出的所有粒子不会跟随一起运动<br>**Custom**：自定义，不受节点 **scale** 影响
**dampen** | 当前速度与速度下限的插值。
**separateAxes** | 是否三个轴分开限制。
**limit** | 速度下限，当速度超出该值时，将当前速度与该速度做线性插值，当 separateAxes 为 false 时有效。
**limit X、Y、Z** | 坐标轴三个方向上的速度下限，当 separateAxes 为 true 时有效。
