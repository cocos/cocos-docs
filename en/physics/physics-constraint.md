# Constraints

In the physics engine, **Constraints** are used to simulate connections between objects, such as rods, strings, springs, or ragdolls.

Constraints depend on [Rigidbody](physics-rigidbody.md). If the node does not have a rigidbody component, the engine will automatically add a rigidbody component when adding constraints.

> **Note**: The current constraint only works if the physics engine is selected as Bullet, PhysX or Cannon.js.

## HingeConstraint

Hinge constraints constrain the motion of connected objects to a certain axis. This constraint is useful in situations such as simulating the hinge of a door or the rotation of a motor.

![HingeConstraint](img/hinge-constraint.jpg)

| Properties | Description |
| :---|:--- |
| **AttachedBody** | Rigid body components under the node where the current constraint is located |
| **ConnectedBody** | Gets or sets the rigid body to which the constraint is connected, null means it is linked to a static body at the world origin |
| **EnableCollision** | Gets or sets whether collision is enabled between two bodies connected by a constraint |
| **PivotA** | Constrain the relative position of a joint in the local space of its own rigid body |
| **PivotB** | Constrain the relative position of the joint in the local space of the connected rigid body |
| **Axis** | The axis that constrains constraint rotation in local space |

![physics-hinge](img/physics-hinge.gif)

Please refer to [HingeConstraint API](__APIDOC__/en/class/physics.HingeConstraint) for the hinge constraint interface.

## PointToPointConstraint

A point-to-point constraint is a simple composite constraint that connects two objects, or one object, to a point in the coordinate system. The connected objects can be freely rotated with respect to each other while sharing a common connection point.

![point-to-point constraint](img/pointtopoint-constraint.jpg)

| Properties | Description |
| :---|:--- |
| **AttachedBody** | The rigid body to which the collider is attached |
| **ConnectedBody** | Gets or sets the body to which the constraint is connected |
| **EnableCollision** | Gets or sets whether collision is enabled between two bodies connected by a constraint |
| **PivotA** | Constrain the relative position of a joint in the local space of its own rigid body |
| **PivotB** | Constrain the relative position of the joint in the local space of the connected rigid body |

![physics-p2p](img/physics-p2p.gif)

For point-to-point constraint interface, please refer to [PointToPointConstraint API](__APIDOC__/en/class/physics.PointToPointConstraint).
