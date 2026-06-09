# Size Overtime Module

The Size module is used to set the size of the particles during their lifetime, thus achieving particle effects like flames and snowflakes of varying sizes.

![size_overtime](module/size_overtime.gif)

## Properties

![size_overtime](module/size_module.png)

| Properties | Description |
| :--- | :--- |
| **SeparateAxes** | Whether to set particle size separately on X, Y, Z axis. <br>When you click the ![menu button](main-module/menu-button.png) button on the right side of the input box and switch to use curve editing, it indicates whether the three axes are scaled separately. Please refer to the following for details. |
| **Size** | Set the particle size. <br>When switching to use curve editing, you can set the curve of particle size versus time. <br>This item and the **separateAxes** attribute, only one of the two can be selected. |

## Separate Axes

Check the **SeparateAxes** property, click the ![menu button](main-module/menu-button.png) button and select **Curve** to switch to curve editing mode. You can then define the curve to specify the size change of the particle in the X, Y and Z directions during its lifetime (Z is only used for mesh particles).

![size_module_curve](module/size_module_curve.png)

For details, please refer to [Curve Editor](./editor/curve-editor.md).
