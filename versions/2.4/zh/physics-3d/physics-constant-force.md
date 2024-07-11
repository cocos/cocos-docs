# 3D 物理恒力组件

恒力组件用于向刚体添加恒力。

![](image/constant-force-prop.png)

点击 **属性检查器** 下方的 **添加组件 -> 物理组件 -> Constant Force 3D** 按钮，即可添加恒力组件到节点上。

需要注意的是在添加恒力组件时，会自动添加 [刚体组件](./physics-rigidbody.md)，且不能删除。

![](image/nodelect.png)

## 恒力属性

| 属性          | 功能说明              |
| ------------ | -----------          |
| Force        | 设置世界坐标系中使用的力 |
| Local Force  | 设置本地坐标系中使用的力 |
| Torque       | 对世界朝向施加的扭矩    |
| Local Torque | 对本地朝向施加的扭矩    |

恒力组件的 API 接口请参考 [ConstantForce](%__APIDOC__%/zh/classes/ConstantForce.html)。
