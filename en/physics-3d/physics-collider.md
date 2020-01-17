# 3D Collider Component

The Collider component is used to indicate the shape of the GameObject. Different shapes have different properties and physics behaviors. You can choose Collider components with different shapes according to your needs. Currently 3D Collider component includes Box Collider and Sphere Collider.

Both the Collider component and the [RigidBody component](./physics-rigidbody.md) must be added to the GameObject in order to allow collisions to occur. If neither object has a Collider component or only one object has a Collider component, the physics engine will not calculate a collision, and the two objects will simply pass through each other during physics simulation.

## Box Collider

![](image/box-prop.png)

Click the **Add Component -> Physics Component -> Collider -> Box 3D** button at the bottom of the **Properties** panel to add the Box Collider component to the node.

### Box Collider properties

| Properties | Function explanation |
| ---------- | -----------          |
| Material   | Set the material of the Collider, see [3D Physics Material](./physics-material.md) for details  |
| Is Trigger | If enabled, this Collider is used for triggering events, and is ignored by the physics engine. See [3D Physics Events](./physics-event.md) for details |
| Center     | The position of the Collider in the coordinates of the node  |
| Size       | The size of the Collider in the X, Y, Z directions           |

For the API interface of Box Collider, please refer to [BoxCollider3D](../../../api/en/classes/BoxCollider3D.html).

## Sphere Collider

![](image/sphere-prop.png)

Click the **Add Component -> Physics Component -> Collider -> Sphere 3D** button at the bottom of the **Properties** panel to add the Sphere Collider component to the node.

### Sphere Collider properties

| Properties | Function explanation                 |
| ---------- | -----------              |
| Material   | Set the material of the Collider, see [3D Physics Material](./physics-material.md) for details  |
| Is Trigger | If enabled, this Collider is used for triggering events, and is ignored by the physics engine. See [3D Physics Events](./physics-event.md) for details  |
| Center     | The position of the Collider in the coordinates of the node  |
| Radius     | The radius of the Collider             |

For the API interface of Sphere Collider, please refer to [SphereCollider3D](../../../api/en/classes/SphereCollider3D.html).
