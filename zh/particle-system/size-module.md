# 大小模块（SizeOvertimeModule）

大小模块用于设置粒子在其生命周期内的大小，从而实现类似大小不一的火焰和雪花等粒子效果。

![size_overtime](module/size_overtime.gif)

## 属性

![size_overtime](module/size_module.png)

| 属性 | 说明 |
| :--- | :--- |
| **SeparateAxes** | 是否在 X、Y、Z 轴上分别设置粒子大小。<br>当点击输入框右侧的 ![menu button](main-module/menu-button.png) 按钮，切换使用曲线编辑时，表示是否三个轴分开进行缩放，详情请参考下文 **非均匀粒子缩放** 部分的内容。 |
| **Size** | 设置粒子大小。<br>当切换使用曲线编辑时，可设置粒子大小随时间变化的曲线。<br>该项与 **separateAxes** 属性，二者只能选其一。 |

## 非均匀粒子缩放

勾选 **SeparateAxes** 属性，点击出现的 **X**、**Y**、**Z** 属性框右侧的 ![menu button](main-module/menu-button.png) 按钮，选择 **Curve**，切换到曲线编辑模式。便可分别定义曲线指定粒子在其生命周期中 X、Y、Z 轴方向上的大小变化（Z 仅用于网格粒子）。

![size_module_curve](module/size_module_curve.png)

详情请参考 [曲线编辑器](./editor/curve-editor.md)。
