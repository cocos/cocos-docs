# Setting 3D Physics Engine

Open the editor, click **Project -> Project Settings -> Module Config** in the menu bar, and check **3D Physics**. Then select the 3D physics engine, including `cannon.js` and `Builtin`, and the default is `cannon.js`. If you do not check **3D Physics**, you cannot use physically related components and interfaces, and errors will occur at runtime.

![](image/physics-module.png)

**Note**: The physics engine is always `cannon.js` during the preview. The setting of this option will only take effect when building the project.

## Physics Engine (cannon.js)

[cannon.js](https://github.com/cocos-creator/cocos-cannon.js) is an open source physics engine. It uses JavaScript to develop and implement a comprehensive physics simulation function.

When the selected physics engine is `cannon.js`, you need to add a [RigidBody component](./physics-rigidbody.md) to the node for physics simulation. Then add the [Collision component](./physics-collider.md) as needed, and the node will add the corresponding collider, which is used to detect whether it collides with other colliders.

The current `cannon.js` support is as follows:

- [RigidBody](./physics-rigidbody.md)
- [Box \ Sphere Collider](./physics-collider.md)
- [Trigger and Collision Events](./physics-event.md)
- [Physics Material](./physics-material.md)
- [Ray Detection](./physics-manager.md)

## Collision Detection (Builtin)

Builtin is a physics engine with only Collision Detection System. Compared to other physics engines, Builtin does not have physics simulation capabilities, but its advantages are smaller packages and smaller calculations.

If you use Builtin for development, please note the following:

- Builtin has only events of type `trigger`.

- The `Material` property in [3D Collision](./physics-collider.md) is invalid.

- The `Is Trigger` property in [3D Collision](./physics-collider.md) is invalid. All Collision components can only be used as [Trigger](./physics-event.md).

- The `attachedRigidbody` property in the 3D Collision is `null`.

- [3D RigidBody Component](./physics-rigidbody.md) is invalid.

- [3D ConstantForce Component](./physics-constant-force.md) is invalid.

- [3D RigidBody Component](./physics-rigidbody.md) is invalid.

- [3D ConstantForce Component](./physics-constant-force.md) is invalid.
