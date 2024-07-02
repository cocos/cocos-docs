# 2D 碰撞组件

## 添加碰撞组件

目前引擎支持三种不同的碰撞组件： **盒碰撞组件（BoxCollider2D）**、**圆形碰撞组件（CircleCollider2D）** 和 **多边形碰撞组件（PolygonCollider2D）**。在 **属性检查器** 上点击 **添加组件** 按钮，输入碰撞组件的名称即可添加。

![碰撞组件](image/collider-types.png)

## 属性

不同的碰撞组件都拥有以下的共同属性：

![inspector](image/collider-inspector.png)

| 属性 | 说明 |
|:-- | :-- |
| **Editing**    | 是否对碰撞组件进行编辑。勾选后可以在场景内编辑碰撞组件的位置、样式和大小。详情请参考下方 **编辑碰撞组件** |
| **Tag**        | 标签。当发生碰撞后，可根据 **Tag** 区分不同碰撞组件 |
| **Group**      | 碰撞组件分组。通过 [碰撞矩阵](../editor/project/physics-configs.md) 可设置不同分组间碰撞的可能性 |
| **Sensor**     | 指明碰撞组件是否为传感器类型，传感器类型的碰撞组件会产生碰撞回调，但是不会发生物理碰撞效果。（一般和rigidbody2d一起使用时，开启Enabled Contact Listener可以监听碰撞的回调事件。如：onBeginContact，onEndContact, 通过搜索文档可以了解如何监听这两个回调事件） |
| **Density**    | 碰撞组件的密度，用于刚体的质量计算 |
| **Friction**   | 碰撞组件摩擦力系数，碰撞组件接触时的运动会受到摩擦力影响 |
| **Restitution**| 碰撞组件的弹性系数，指明碰撞组件碰撞时是否会受到弹力影响 |
| **Offset**     | 碰撞组件相对于节点中心的偏移 |

## 盒物理碰撞组件

盒碰撞组件是常见的碰撞组件，用于模拟类矩形的碰撞组件。在 2D 节点的 **属性检查器** 上点击 **添加组件 -> BoxCollider2D** 即可添加。

![box-collider-2d](image/box-colllider-2d.png)

### 属性

| 属性 | 说明 |
| :-- | :-- |
| **Size** | 盒碰撞组件的大小 |

盒碰撞组件接口请参考 [BoxCollider2D API](%__APIDOC__%/zh/class/BoxCollider2D)。

### 编辑碰撞组件

对于所有碰撞组件，勾选 **Editing** 后都可在场景内进行编辑。

![editing](image/editing.png)

在碰撞组件范围内按下鼠标左键并拖拽可以调整碰撞组件的偏移，在 ![gizmo](image/gizmo.png) 上按下鼠标左键并拖拽可以调整碰撞组件的形状和大小。

![edit-box-collider](image/edit-box.gif)

按住 <kbd>Alt</kbd> 按键拖拽时，在拖拽过程中将会保持 **矩形中心位置** 不变。

![alt](image/edit-box-alt.gif)

在 **属性检查器** 上输入也可以精细化的调整碰撞组件的大小和偏移。

![input](image/edit-input.gif)

## 圆形碰撞组件

在 **属性检查器** 上点击 **添加组件**，输入 CircleCollider2D 可添加圆形碰撞组件。

![circle-collider](image/circle-collider.png)

### 属性

| 属性 | 说明 |
| :-- | :-- |
| **Radius** | 圆形的半径 |

圆形碰撞组件接口请参考 [CircleCollider2D API](%__APIDOC__%/zh/class/CircleCollider2D)。

### 编辑碰撞组件

按住 <kbd>Alt</kbd> 按键拖拽时，在拖拽过程中将会保持 **圆心位置** 不变。

![edit-circle-collider](image/edit-circle.gif)

## 多边形碰撞组件

通过多边形碰撞组件，可以编辑更为详细的物理形状，从而更准确的对物体进行物理模拟。

在 **属性检查器** 上点击 **添加组件**，输入 PolygonCollider2D 可添加多边形碰撞组件。

![polygon](image/polygon-collider.png)

### 属性

| 属性 | 说明 |
| :-- | :-- |
| **Threshold** | 指明生成贴图轮廓顶点间的最小距离，值越大则生成的点越少，可根据需求进行调节 |
| **Points** | 多边形的顶点，顶点可以通过勾选 **Editing** 在场景内进行编辑，也可以在 **属性检查器** 上输入数值来调整 |

多边形碰撞组件接口请参考 [PolygonCollider2D API](%__APIDOC__%/zh/class/PolygonCollider2D)。

### 编辑碰撞组件

如果是 Sprite 组件，引擎会根据 Sprite 生成轮廓：

![default](image/polygon-default.png)

通过鼠标拖拽 ![gizmo](image/gizmo.png) 可以调整轮廓点的位置。

![edit](image/edit-polygon.gif)

通过调整 **Threshold** 并点击 ![points](image/btn-regenerate-points.png) 按钮，可以调整轮廓的形状和点的数量。

![threshold-1](image/threshold-1.png)

鼠标移到多边形的线段上时，该线段会高亮并且鼠标会变为添加样式，此时点击鼠标左键可在线段中插入新的点。

![add-point](image/polygon-add-point.gif)

## 详细说明

Box2D 物理碰撞组件内部是由 Box2D 的 b2Fixture 组成的，由于 Box2D 内部的一些限制，一个多边形物理碰撞组件可能会由多个 b2Fixture 组成。

这些情况为：

1. 当多边形物理碰撞组件的顶点组成的形状为凹边形时，物理系统会自动将这些顶点分割为多个凸边形。但需要注意的是该算法无法处理凹多边形自相交的问题。
2. 当多边形物理碰撞组件的顶点数多于 `b2.maxPolygonVertices`（一般为 8）时，物理系统会自动将这些顶点分割为多个凸边形。

一般情况下这些细节是不需要关心的，但是当使用射线检测并且检测类型为 `ERaycast2DType.All` 时，一个碰撞组件就可能会检测到多个碰撞点，原因即是检测到了多个 b2Fixture。
