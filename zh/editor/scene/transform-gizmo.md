# 变换工具 Gizmo

我们主要通过主窗口工具栏左上角的一系列 **变换工具** 来将场景中的节点按我们希望的方式布置。

## 移动变换工具

**移动变换工具** 是打开编辑器时默认处于激活状态的变换工具，之后这个工具也可以通过点击位于主窗口左上角工具栏第一个按钮来激活，或者在使用场景编辑器时按下快捷键 **W**，即可激活 **移动变换工具**。

![position tool](images/position-tool.png)

选中任何节点，就能看到节点中心（或锚点所在位置）上出现了由红绿蓝三个箭头和红绿蓝三个方块组成的移动控制手柄

**控制手柄** 是指场景编辑器中在特定编辑状态下显示出的可用鼠标进行交互操作的控制器。这些控制器只用来辅助编辑，不会在游戏运行时显示。

![position gizmo](images/position-gizmo.png)

移动变换工具激活时：
- 按住红色、绿色、蓝色箭头拖拽鼠标，将分别在 x、y、z 轴方向上移动节点；
- 按住红色、绿色、蓝色方块拖拽鼠标，将分别在 y-z平面、x-z平面、x-y平面上移动节点；

## 旋转变换工具

点击主窗口左上角工具栏第二个按钮，或在使用场景编辑器时按下 **E** 快捷键，即可激活 **旋转变换工具**。

![rotation tool](images/rotation-tool.png)

旋转变换工具的手柄主要是三个相互正交的圆组成（2D视图下由一个箭头和一个圆环组成）。拖拽圆环上任意一点就可以旋转节点，放开鼠标之前，可以在控制手柄上看到当前旋转的范围。

![rotation gizmo](images/rotation-gizmo.png)

旋转变换工具激活时：
- 按住红色、绿色、蓝色圆圈拖拽鼠标，将分别在绕 x、y、z 轴旋转节点；

## 缩放变换工具

点击主窗口左上角工具栏第三个按钮，或在使用场景编辑器时按下 **R** 快捷键，即可激活 **缩放变换工具**。

![scale tool](images/scale-tool.png)

缩放工具由三个头部是正方体的坐标轴以及一个中心正方体组成。

![scale gizmo](images/scale-gizmo.png)

缩放变换工具激活时：
- 按住红色、绿色、蓝色方块拖拽鼠标，将分别在 x、y、z 轴方向上缩放节点；
- 按住灰色方块拖拽鼠标，将同时在 x、y、z 轴上缩放节点；

## 矩形变换工具

点击主窗口左上角工具栏第四个按钮，或在使用场景编辑器时按下 **T** 快捷键，即可激活 **矩形变换工具**。

![rect tool](images/rect-tool.png)

矩形变换工具由四个顶点控制点、四个边控制点、一个中心控制点组成。

![rect gizmo](images/rect-gizmo.png)

矩形变换工具激活时：
- 拖拽控制手柄的任一顶点控制点，可以在保持对角顶点位置不变的情况下，同时修改 UI 节点尺寸中的 width 和 height 属性。
- 拖拽控制手柄的任一边控制点，可以在保持对边位置不变的情况下，修改UI节点尺寸中的 width 或 height 属性。

在 UI 元素的排版中，经常会需要使用 **矩形变换工具** 直接精确控制节点四条边的位置和长度。而对于必须保持原始图片宽高比的图像元素，通常不会使用矩形变换工具来调整尺寸。

## 变换吸附
使用变换工具操作物体时，可以按住 `Ctrl` 键让变换工具按设定的步长来变化数值。

![transform snap config](images/transform-snap-config.png)

点击主窗口左上角工具栏的变换吸附配置按钮，即可打开变换吸附配置界面。

![transform snap config panel](images/transform-snap-config-panel.png)

可以在这个界面中设置各种变换工具的步长，同时也可以通过按钮来打开自动吸附功能。

| 图标 | 描述 |
| :-- | :-- |
|  ![position snap](images/position-snap.png)| 如果打开，移动时以设定的步长来增长 |
|  ![rotation snap](images/rotation-snap.png)| 如果打开，旋转时以设定的步长来增长 |
|  ![scale snap](images/scale-snap.png)| 如果打开，缩放时以设定的步长来增长 |


## 变换工具基准点设置

![position toggles](images/position-toggles.png)

变换工具基准点设置用于设置变换工具的位置以及它操作的方向。

![pivot local](images/pivot-local.png)

![center global](images/center-global.png)

### 位置

点击 Pivot/Center 按钮，会在 Pivot 和 Center 两个选项中切换

- **Pivot**：变换工具使用节点的世界坐标
- **Center**：变换工具使用所有选择的物体的中心位置坐标

### 方向

点击 Local/Global 按钮，会在 Local 和 Global 两个选项中切换

- **Local**：变换工具使用节点的旋转方向
- **Global**：变换工具使用世界空间的方向
