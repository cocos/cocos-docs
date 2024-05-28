# 恒力组件

恒力组件是一个工具组件，依赖于[刚体](physics-rigidbody.md)组件，每帧都会对一个刚体施加给定的力和扭矩。

![恒力组件](img/constant-force.jpg)

| 属性 | 说明 |
| :---|:--- |
| **force** | 在世界坐标系中，对刚体施加的力 |
| **localForce** | 在本地坐标系中，对刚体施加的力 |
| **torque** | 在世界坐标系中，对刚体施加的扭转力 |
| **localTorque** | 在本地坐标系中，对刚体施加的扭转力 |

恒力组件接口请参考 [ConstantForce API](%__APIDOC__%/zh/class/physics.ConstantForce)。