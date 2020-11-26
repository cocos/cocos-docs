## 发射器模块(ShapeModule)
公有属性：

属性| 作用
---|---
**position** | 相对于挂载节点的位置
**rotation** | 相对于挂载节点的旋转
**scale** | 相对于挂载节点的缩放
**sphericalDirectionAmount** | 表示当前发射方向与当前位置到节点中心连线方向的插值
**randomPositionAmount** | 表示与当前发射位置的偏移

- **方块(Box)**  

![](particle-system/box_emitter.png)

属性| 作用
---|---
**shapeType** | Box
**emitFrom** | 粒子从方块的哪个部位发射，**edge**:边框；**shell**:表面；**volume**:内部

- **球、半球(Shpere\Hemisphere)**

![](particle-system/sphere_emitter.png)

属性| 作用
---|---
**shapeType** | Shpere\Hemisphere
**radius** | 球体半径
**radiusThickness** | 0表示从球表面发射，1表示从球体内部发射，0~1之间表示从表面到球心之间发射

- **圆(Circle)**

![](particle-system/circle_emitter.png)

属性| 作用
---|---
**shapeType** | Circle
**radius** | 圆的半径
**radiusThickness** | 0表示从圆周发射，1表示从圆内部发射，0~1之间表示从圆周到圆心之间发射
**arc** | 表示在圆的一个扇形区域发射
**mode** | 表示粒子在扇形区域的发射方式，**random**:随机位置，**loop**:沿某一方向循环发射，每次循环方向相同，**pingPong**:循环发射，每次循环方向相反 **spread**:表示粒子在某个间断发射，比如，0表示可以在任意位置发射，0.1表示每隔圆周的十分之一位置发射
**speed**|表示粒子沿圆周发射的速度
**spread**|表示粒子沿圆周发射时，在圆弧哪些位置发射。例如，arc为120°，spread为0.1，则从圆弧开始每隔12°发射一次粒子

- **圆锥(Cone)**

![](particle-system/cone_emitter.png)

属性| 作用
---|---
**shapeType** | Cone
**angle** | 圆锥的轴与母线的夹角
**radius** |圆锥顶部截面半径
**length** |圆锥顶部截面距离底部的轴长
**radiusThickness** | 0表示从圆周发射，1表示从圆内部发射，0~1之间表示从圆周到圆心之间发射
**arc** | 表示在圆的一个扇形区域发射
**mode** | 表示粒子在扇形区域的发射方式，**random**:随机位置，**loop**:沿某一方向循环发射，每次循环方向相同，**pingPong**:循环发射，每次循环方向相反 **spread**:表示粒子在某个间断发射，比如，0表示可以在任意位置发射，0.1表示每隔圆周的十分之一位置发射
**speed**|表示粒子沿圆周发射的速度 
**spread**|表示粒子沿圆周发射时，在圆弧哪些位置发射。例如，arc为120°，spread为0.1，则从圆弧开始每隔12°发射一次粒子