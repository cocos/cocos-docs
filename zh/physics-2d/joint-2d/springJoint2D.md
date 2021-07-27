# SpringJoint2D 关节

顾名思义**弹簧关节**就是将关节两端物体像弹簧一样连接在一起，保持一定范围距离。挤压它们会得到向外的力，拉伸它们将得到向里的力。例如游戏中的发射弹射器。

![SpringJoint2D](../image/springjoint2d.png)

属性 | 功能说明
:---|:---
**Anchor** | 关节本端链接的刚体的锚点。
**ConnectedAnchor** | 关节链接另一端刚体的锚点。
**CollideConnected**  |  关节两端的刚体是否能够互相碰撞。
**ConnectedBody**  |  关节链接的另一端的刚体。
**Frequency**  |  弹性系数。
**DampingRatio**  | 阻尼，表示关节变形后，恢复到初始状态受到的阻力。
**Distance**  | 关节两端的距离。
**AutoCalcDistance**  | 是否自动计算关节连接的两个刚体间的距离。

具体的使用方法，详情可参考 [physics-samples](https://github.com/cocos-creator/physics-samples/tree/v3.x/2d/box2d/assets/cases/example/joints) 范例中的 `spring-joint-damp` 和 `spring-joint-frequency` 场景。

SpringJoint2D 接口相关请参考 [SpringJoint2D API](https://docs.cocos.com/creator/3.0/api/zh/classes/physics2d.springjoint2d.html)。
