# SpringJoint2D 关节

顾名思义**弹簧关节**就是将关节两端刚体像弹簧一样连接在一起，使其像连接着弹簧那样运动。挤压它们会得到向外的力，拉伸它们将得到向里的力。例如游戏中的发射弹射器。

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

弹簧关节关节允许一个带有刚体的游戏对象被拉向一个指定目标，这个目标可以是另一个刚体对象或者世界。当距离游戏对象位置越远，弹簧关节会对其施加一个作用力使其回到目标的远点位置。

具体的使用方法，详情可参考 [physics-samples](https://github.com/cocos-creator/physics-samples/tree/v3.x/2d/box2d/assets/cases/example/joints) 范例中的 `spring-joint-damp` 和 `spring-joint-frequency` 场景。

SpringJoint2D 接口相关请参考 [SpringJoint2D API](https://docs.cocos.com/creator/3.0/api/zh/classes/physics2d.springjoint2d.html)。
