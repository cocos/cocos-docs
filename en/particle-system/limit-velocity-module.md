# Limit Velocity Overtime Module

![limit_module](particle-system/limit_module.png)

Property | Features
:---|:---
**space** | In which coordinate system the speed is calculated.
**limit** | Lower speed limit. When the speed exceeds this value, the current speed is linearly interpolated with this speed. It is valid when separateAxes is false.
**dampen** | Interpolation of current speed and lower speed limit.
**separateAxes** | Whether the three axes are restricted separately.
**limit X,Y,Z** | The lower speed limits of the three axes are valid when separateAxes is true.
