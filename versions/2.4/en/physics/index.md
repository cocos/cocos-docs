# 2D Physics and Collision

This section details 2D Physics and Collision. For information about 3D, please refer to [3D Physics and Collision](../physics-3d/index.md).

The 2D Physics and Collision in Creator consists of two parts:

- [Collider component](collision/index.md)
- [Box2D physics engine](physics/index.md)

For games with few physics calculations, we recommend that users use colliders directly, which avoids loading the physics engine and building the physical world during runtime. The physics engine provides a more complete interface for interactive behaviors and rigidbody, joints, and so on. You can choose your own solution as needed.
