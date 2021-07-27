# FixedJoint2D 关节

**固定关节** 是模拟刚体之间相互附着的一种物理现象，使这些对象保持相对于彼此的位置，确保游戏对象始终以给定位置和角度偏移。如墙上的钉子和粘贴物品等。

![FixedJoint2D](../image/fixedjoint2d.png)

属性 | 功能说明
:---|:---
**Anchor** | 关节本端链接的刚体的锚点。
**ConnectedAnchor** | 关节链接另一端刚体的锚点。
**CollideConnected**  |  关节两端的刚体是否能够互相碰撞。
**ConnectedBody**  |  关节链接的另一端的刚体。
**Frequency**  |  弹性系数。
**DampingRatio**  | 阻尼，表示关节变形后，恢复到初始状态受到的阻力。

具体的使用方法，详情可参考 [physics-samples](https://github.com/cocos-creator/physics-samples/tree/v3.x/2d/box2d/assets/cases/example/joints) 范例中的 `fixed-joint-ragdoll` 场景。

FixedJoint2D 接口相关请参考 [FixedJoint2D API](https://docs.cocos.com/creator/3.0/api/zh/classes/physics2d.fixedjoint2d.html)。
