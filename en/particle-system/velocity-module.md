# Velocity Overtime Module

![velocity_overtime](particle-system/velocity_overtime.gif)

## Properties

![velocity_module](particle-system/velocity_module.png)

| Property | Description |
| :--- | :--- |
| **Space** | When selecting particles for speed calculation, it is based on **World coordinate system** (World) or **Local coordinate system** (Local)<br> (**Custom** is currently not supported) |
| **X** | Velocity component in the X-axis direction |
| **Y** | Velocity component in the Y-axis direction |
| **Z** | Velocity component in the Z-axis direction |
| **SpeedModifier** | Speed modifier, only supports CPU particles. It does not take effect when the **UseGPU** property is checked in [Particle Renderer](./renderer.md) |

Some properties have a ![menu button](main-module/menu-button.png) button, you can click it to edit the curve of the property, please refer to [Curve Editor](./editor/curve-editor.md).
