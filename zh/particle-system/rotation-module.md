# 旋转模块（RotationOvertimeModule）

旋转模块用于设置粒子运行时在移动中旋转，可用于模拟类似下落的雪花这类随机旋转特效。

![rotation_module](module/rotate_overtime.gif)

## 属性

![rotation_module](module/rotation_module.png)

| 属性 | 说明 |
| :--- | :--- |
| **SeparateAxes** | 是否分开设置三个轴的粒子旋转（预计在 v3.3 支持该功能） |
| **X、Y、Z** | 绕 X、Y、Z 轴设定旋转角速度。其中 **X**、**Y** 仅在勾选 **SeparateAxes** 属性后显示。 |

点击属性输入框右侧的 ![menu button](main-module/menu-button.png) 按钮，可选择对属性进行曲线编辑，详情请参考 [曲线编辑器](./editor/curve-editor.md)。
