# 3D Physics and Collision

Since v2.3.0, Cocos Creator has added support for 3D Physics and Collision.

Cocos Creator’s physics engine is based on `cannon.js` and provides users with an efficient, componentized workflow with convenient usage methods. Currently, supported functionality is: rigid body, Box/Sphere collision components, trigger and collision events, physical materials, ray detection and many other features.

Builtin, the 3D collision detection system, is a physics module with only a collision detection system. It does not have complicated physics simulation calculations, which will make the game’s package smaller and provide better performance.

The 3D Physics and Collision includes the following:

- [Setting Physics Engine](physics-select.md)
- [Physics Manager](physics-manager.md)
- [RigidBody Component Reference](physics-rigidbody.md)
- [ConstantForce Component Reference](physics-constant-force.md)
- [Collider Component Reference](physics-collider.md)
- [Physics Events](physics-event.md)
- [Physics Material](physics-material.md)

The group management of 3D Physics and Collision is completely the same as 2D, please refer to [Collision Group Management](../physics/collision/collision-group.md) for details.  
For information about 2D, please refer to [2D Physics and Collision](../physics/index.md).

For more usage, please refer to [3D Physics Examples](https://github.com/cocos/example-projects/tree/master/assets/cases/3d_physics).
