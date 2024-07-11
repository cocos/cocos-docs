# 3D ConstantForce Component

The 3D ConstantForce component is used to add constant force to a rigidbody.

![](image/constant-force-prop.png)

Click the **Add Component -> Physics Component -> Constant Force 3D** button at the bottom of the **Properties** panel to add the ConstantForce component to the node.

It should be noted that when adding a ConstantForce component, the [RigidBody component](./physics-rigidbody.md) is also automatically added to the node and cannot be deleted.

![](image/nodelect.png)

## ConstantForce Properties

| Properties   | Function explanation |
| ------------ | -----------          |
| Force        | Set the force used in the world coordinate system |
| Local Force  | Set the force used in the local coordinate system |
| Torque       | Torque applied to the world orientation           |
| Local Torque | Torque applied to local orientation               |

For the API interface of ConstantForce, please refer to [ConstantForce](%__APIDOC__%/en/classes/ConstantForce.html).
