# Physics Configs

Physical configuration is used to configure various commonly used properties.

## Property description

![Physics](./index/physics-index.png)

- `gravity` Gravity direction vector, the sign means the positive or negative direction on the axis. **Default**: `{ x: 0, y: -10, z: 0 }`.
- `allowSleep` Whether to allow rigid bodies to enter sleep state. **Default**: `true`.
- `sleepThreshold` The maximum speed threshold for entering sleep. **Default**: `0.1`. **Min**: `0`.
- `autoSimulation` Whether to enable automatic simulation.
- `fixedTimeStep` Fixed time step between each simulation. **Default**: `1/60`. **Min**: `0`.
- `maxSubSteps` Maximum number of substeps per simulation step. **Default**: `1`. **Min**: `0`.
- `friction` Coefficient of friction. **Default**: `0.5`.
- `rollingFriction` Rolling friction coefficient. **Default**: `0.1`.
- `spinningFriction` Spin friction coefficient. **Default**: `0.1`.
- `restitution` Coefficient of elasticity. **Default**: `0.1`.
- `collisionMatrix` The collision matrix, used only for initialization.
<!-- - `useNodeChains` Whether to use a node chain to combine rigid bodies. **Default:** `true`. -->

## Collision Matrix

The collision matrix is used to initialize groups and masks of physical elements.

![Physics-collision](./index/physics-collision.png)

### Grouping concept

In the editor, the grouping format of the collision matrix is __{index, name}__, __index__ is the number of bits from __0__ to __31__, and __name__ is the name of the group. The new project will have a default grouping: __{index: 0, name: 'DEFAULT'}__.

By clicking the __+__ button you can add a new group.

> **Note**: both __index__ and __name__ cannot be empty and cannot be repeated with existing items; after adding, the group cannot be deleted, only the name of the group can be modified.

### How to configure

Take a new __water__ group as an example:

![Physics-collision-demo](./index/physics-collision-demo.png)

This table lists all the groups, and you can check it to determine which two groups will do the collision detection.

**As shown in the figure above, whether `DEFAULT` and `water` will perform collision detection will be determined by whether the corresponding check box is checked**.

According to the above rules, the collision pairs generated in this table are:

- DEFAULT - water
- DEFAULT - DEFAULT

And the grouping pairs that do not perform collision detection include:

- water - water

### Configure groups of physical components

In addition, the __Group__ property on the __RigidBody__ component needs to be configured into the corresponding physical element:

![rigidbody-group](./index/rigidbody-group.jpg)
