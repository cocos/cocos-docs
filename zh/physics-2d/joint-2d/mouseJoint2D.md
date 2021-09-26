# MouseJoint2D 关节

**鼠标关节** 主要用于方便开发者用鼠标来进行对刚体的移动，它会在刚体上确定一个点，对这个点施加力，使得刚体朝着鼠标的方向移动。被拖动的刚体可以自由旋转。

![MouseJoint2D](../image/mousejoint2d.png)

属性 | 功能说明
:---|:---
**Anchor** | 关节本端链接的刚体的锚点。
**ConnectedAnchor** | 关节链接另一端刚体的锚点。
**CollideConnected**  |  关节两端的刚体是否能够互相碰撞。
**ConnectedBody**  |  关节链接的另一端的刚体。
**Frequency**  |  弹性系数。
**DampingRatio**  | 阻尼，表示关节变形后，恢复到初始状态受到的阻力。
**MaxForce**  | 最大阻力值。

<!-- ![mouse](../image/mouse.gif) -->

具体的使用方法，详情可参考 [physics-samples](https://github.com/cocos-creator/physics-samples/tree/v3.x/2d/box2d/assets/cases/example/joints) 范例中的 `mouse-joint` 场景。

MouseJoint2D 接口相关请参考 [MouseJoint2D API](__APIDOC__/zh/classes/physics2d.mousejoint2d.html)。
