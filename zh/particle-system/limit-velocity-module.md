## 限速模块(LimitVelocityOvertimeModule)
![](particle-system/limit_module.png)

属性| 作用
---|---
**space** | 速度在哪个坐标系中计算。
**limit** | 速度下限，当速度超出该值时，将当前速度与该速度做线性插值，当separateAxes为false时有效。
**dampen** | 当前速度与速度下限的插值。
**separateAxes** | 是否三个轴分开限制。
**limit X,Y,Z** | 三个轴的速度下限，当separateAxes为true时有效。