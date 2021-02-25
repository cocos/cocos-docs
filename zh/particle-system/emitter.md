# 发射器模块（ShapeModule）

## 公有属性

属性 | 作用
:---|:---
**shapeType** | 发生器形状
**position** | 相对于挂载节点的位置
**rotation** | 相对于挂载节点的旋转
**scale** | 相对于挂载节点的缩放
**sphericalDirectionAmount** | 表示当前发射方向与当前位置到节点中心连线方向的插值
**randomPositionAmount** | 表示与当前发射位置的偏移。

## 方块（Box）

![](particle-system/box_emitter.png)

属性 | 作用
:---|:---
**emitFrom** | 粒子从方块的哪个部位发射。<br>**edge**：边框<br>**shell**：表面<br>**volume**：内部

## 球、半球（Sphere\Hemisphere）

![](particle-system/sphere_emitter.png)

属性| 作用
:---|:---
**emitFrom** | 粒子从方块的哪个部位发射。<br>**edge**：边框<br>**shell**：表面<br>**volume**：内部
**radiusThickness** | 球体半径
**arc** | 0：表示从球表面发射<br>1：表示从球体内部发射<br>0~1：之间表示从表面到球心之间发射

## 圆（Circle）

![](particle-system/circle_emitter.png)

属性| 作用
:---|:---
**radius** | 圆的半径
**radiusThickness** | 0 表示从圆周发射<br>1 表示从圆内部发射<br>0~1 之间表示从圆周到圆心之间发射
**arc** | 表示在圆的一个扇形区域发射
**arcMode** | 表示粒子在扇形区域的发射方式。<br>**random**：随机位置<br>**loop**：沿某一方向循环发射，每次循环方向相同<br>**pingPong**：循环发射，每次循环方向相反<br>**spread**：表示粒子在某个间断发射，比如，0 表示可以在任意位置发射；0.1 表示每隔圆周的十分之一位置发射
**arcSpeed**|表示粒子沿圆周发射的速度
**arcSpread**|表示粒子沿圆周发射时，在圆弧哪些位置发射。例如，arc 为 120°，spread 为 0.1，则从圆弧开始每隔 12° 发射一次粒子

## 圆锥（Cone）

![](particle-system/cone_emitter.png)

属性| 作用
:---|:---
**angle** | 圆锥的轴与母线的夹角。角度为 0 时形成圆柱体，角度为 90 度时形成圆盘。
**radius** |圆锥顶部截面半径
**radiusThickness** | 0 表示从圆周发射<br>1 表示从圆内部发射<br>0~1 之间表示从圆周到圆心之间发射
**arc** | 表示在圆的一个扇形区域发射
**arcMode** | 表示粒子在扇形区域的发射方式。<br>**random**：随机位置<br>**loop**：沿某一方向循环发射，每次循环方向相同<br>**pingPong**：循环发射，每次循环方向相反<br>**spread**：表示粒子在某个间断发射，比如，0 表示可以在任意位置发射；0.1 表示每隔圆周的十分之一位置发射
**arcSpeed**|表示粒子沿圆周发射的速度
**arcSpread**|表示粒子沿圆周发射时，在圆弧哪些位置发射。例如，arc 为 120°，spread 为 0.1，表示从圆弧开始每隔 12° 发射一次粒子
**length** |圆锥顶部截面距离底部的轴长