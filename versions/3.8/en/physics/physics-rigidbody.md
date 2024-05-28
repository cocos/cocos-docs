# Rigidbody

Rigid bodies are the basic objects that make up the physics world and allow game objects to move in a physically controlled manner. For example, a rigid body can make a game object do free fall under the influence of gravity, or it can make a game object simulate real-world physics phenomena under the action of forces and torques.

## Adding Rigid Body

### Adding via Editor

Click **Add Component -> Physics -> RigidBody** under **Inspector** panel to add a rigid body component to the node.

![add-rigidbody-in-inspector](img/add-rigidbody-in-inspector.jpg)

### Via Code

```ts
import { RigidBody } from 'cc'

const rigidbody = this.node.addComponent(RigidBody);

const rigidBody = this.node.getComponent(RigidBody);
```

For more information, please refer to the [RigidBody API](%__APIDOC__%/en/class/physics.RigidBody).

### When to Add Rigid Bodies

1. Configure collision grouping and make it effective.
2. The object needs to have kinematic or kinetic behavior.

> **Note**: The object needs to have full physical properties provided the object has both **rigid body** and **collider**, and its center-of-mass position and collider shape are adjusted.

## Rigidbody Properties

![rigidbody](img/rigid-body.jpg)

| Properties | Description |
| :-------- | :------------------------------------------------------------------------------- |
| **Group** | Group of the Rigidbody
| **Type** | Type of the Rigidbody, could be the followins types: <br>**DYNAMIC** <br>**STATIC** <br>**KINEMATIC** <br> Please refer to the following section for details |

The following properties only take effect when **Type** is set to **DYNAMIC**.

| Properties | Description |
| :----------------- | :--------------------------------------------------- |
| **Mass** | The mass of the rigid body, the value must be greater than **0** |
| **AllowSleep** | Whether to allow auto-sleep |
| **LinearDamping** | Linear damping, used to attenuate linear velocity, the larger the value, the faster the attenuation |
| **AngularDamping** | Angular damping, used to attenuate the angular velocity, the larger the value, the faster the attenuation |
| **UseGravity** | Whether to use gravity |
| **LinerFactor** | Linearity factor to scale the physics values (velocity and force) in each axis direction |
| **AngularFactor** | Angular factor for scaling physical values in each axis direction (velocity and force) |

Please refer to [RigidBody API](%__APIDOC__%/en/class/physics.RigidBody) for rigid body component interface.

## RigidBody Types

The current rigid body types include **DYNAMIC**, **KINEMATIC** and **STATIC**.

![rigidbody-type](img/rigidybody-type.png)

- **STATIC**: static rigid body. Can be a game object with a manually set rigid body type, or a game object with a collider and no rigid body. If a node has only colliders and no rigid bodies added by default, then the node can be considered to be using **STATIC** by default. Static rigid bodies are used in most cases for game objects that always stay in one place and do not move easily, e.g. buildings. If the object needs to move continuously, it should be set to **KINEMATIC** type. Static rigid objects do not produce physical behavior when they collide with other objects and, therefore, do not move.
- **DYNAMIC**: kinetic rigid body. Has colliding bodies and non-moving rigid bodies. Rigid body collisions are fully simulated by the physics engine and can be performed by **FORCE** on moving objects (need to guarantee mass greater than 0). For example: a snooker game where the mother ball rolls after hitting the ball and collides with other balls.
- **KINEMATIC**: kinematic rigid body. Has a collider and a kinematic rigid body that can be directly transformed by moving the transformation properties of the rigid object, but does not respond to forces and collisions like a kinematic rigid body, and is usually used to represent objects with platform motion like elevators. It is similar to static rigid bodies, with the difference that moving kinematic rigid bodies exert frictional forces on other objects and wake up other rigid bodies on contact.

**Example**: A simple physics simulation to illustrate the performance that various types of rigid bodies have. The square below uses static rigid bodies in white, kinematic rigid bodies in blue, and kinetic rigid bodies in yellow. Both white and blue are manipulated transformation information, and it is obvious to see several manifestations.
1. There is a penetration between white and blue.
2. The white static object can also be in motion.
3. Two yellow squares behave differently, the white above the stationary, blue above the will follow the movement.

![physics-type](img/physics-type.gif)

The reasons for the above phenomena are.
1. Neither static rigid body nor kinematic rigid body will be subject to forces, so the penetration is produced, which is a normal phenomenon.
2. Static objects can indeed move, static means that in spacetime, every moment is static and will not consider the state of other moments.
3. Unlike static objects, kinematic objects will estimate the state of motion (such as speed) according to the nearby moments, and because of the role of friction, therefore driving the yellow square.

## Rigid Body Center of Mass

By default, the center of mass of a rigid body coincides with the origin of the model.

The following figure demonstrates the change in the position of the center of mass when the model origin does not coincide.

![Centroid](img/center-of-mass.jpg)

Here is an example to illustrate how to adjust the center of mass for a collision.

- Create a new empty node **Node** and add the components shown in the following figure.

  ![add comp](img/center-add-comp.png)

- Add a capsule under the child node of **Node** as shown below.

  ![add capsule](img/center-add-cupsule.png)

- Adjust the Center of **cc.CapsuleCollider** to the following, so that the center of mass of the capsule is at the bottom of the capsule.

  ![result](img/center-result.png)

The following figure shows how the motion behaves when the center of mass is inconsistent, with the center of mass of the capsule on the right at the bottom of the capsule and the center of mass of the capsule on the left at the center of the object.

  ![result](img/center-of-mass.gif)

## Control Rigidbody

### Making Rigidbody Move

For different types, there are different ways to make rigid bodies move.

- For static rigid bodies(**STATIC**), the object should be kept as stationary as possible, but the position of the object can still be changed by transformations (position, rotation, etc.).
- For kinematic rigid bodies(**KINEMATIC**), they should be made to move by changing transformations (position, rotation, etc.).

For dynamic rigid bodies(**DYNAMIC**), their velocity needs to be changed in several ways.

#### By Gravity

The rigid body component provides the **UseGravity** property, which needs to be set to `true` when using gravity.

#### By Applying Force

The rigid body component provides the `applyForce` interface, which allows you to apply a force to a point of the rigid body to change its original state according to Newton's second law.

```ts
import { math } from 'cc'

rigidBody.applyForce(new math.Vec3(200, 0, 0));
```

#### By Applying Torque

The rigid body component provides the ``applyTorque`` interface, through which torques can be applied to the rigid body to change its rotation state.

```ts
rigidBody.applyTorque(new math.Vec3(200, 0, 0));
```

#### By Impulse

The rigid body component provides an 'applyImpulse' interface that applies an impulse to a point on the rigid body. According to the momentum theorem, this will immediately change the linear velocity of the rigid body. If the point at which the impulse is applied is not on the line extended through the center of mass in the direction of the force, then a non-zero torque will be produced and will affect the angular velocity of the rigid body.

```ts
rigidBody.applyImpulse(new math.Vec3(5, 0, 0));
```

#### By Changing Velocity

The rigid body component provides the `setLinearVelocity` interface that can be used to change the linear velocity.

```ts
rigidBody.setLinearVelocity(new math.Vec3(5, 0, 0));
```

Similarly, the rigid body component also provides the `setAngularVelocity` interface, which can be used to change the angular velocity.

```ts
rigidBody.setAngularVelocity(new math.Vec3(5, 0, 0));
```

### Limit the Motion

#### By Sleeping

When Sleeping a rigid body, it empties the rigid body of all its forces and velocities, bringing it to a stop.

```ts
if (rigidBody.isAwake) {
    rigidBody.sleep();
}
```

The rigid body's force and speed will be restored when it is awakened.

```ts
if (rigidBody.isSleeping) {
    rigidBody.wakeUp();
}
```

> **Note**: Executing parts of the interface, such as applying force or impulse, changing velocity, grouping and masking will attempt to wake up the rigid body.

#### Via Damping

The rigid body component provides **linearDamping** linear damping and **angularDamping** rotational damping properties, which can be obtained or set via the `linearDamping` and `angularDamping` methods.

The range of damping parameters is recommended to be between **0** and **1**, **0** means no damping and **1** means full damping.

```ts
if (rigidBody) {
    rigidBody.linearDamping = 0.5;
    let linearDamping = rigidBody.linearDamping;

    rigidBody.angularDamping = 0.5;
    let angularDamping = rigidBody.angularDamping;
}
```

#### Factors

The rigid body component provides the **linearFactor** linear velocity factor and **angularFactor** angular velocity factor properties, which can be obtained or set via the `linearFactor` and `angularFactor` methods.

The factors are of type ``Vec3`` and the values of the corresponding components are used to scale the velocity change in the corresponding axes. The default values are both **1**, which means the scaling is **1** times, i.e. no scaling.

```ts
if (rigidBody) {
    rigidBody.linearFactor = new math.Vec3(0, 0.5, 0);
    let linearFactor = rigidBody.linearFactor;

    rigidBody.angularFactor = new math.Vec3(0, 0.5, 0);
    let angularFactor = rigidBody.angularFactor;
}
```

> **Note**:
> 1. Setting the value of a component of the factor to **0** fixes the movement or rotation of an axis.
> 2. In the case of [**cannon.js**](physics-engine.md#cannon.js) or [**Bullet (ammo.js)**](physics-engine.md#ammo.js) physics engines, the factor acts on different physical quantities, using **cannon.js** for velocity, and **Bullet (ammo.js)** for force.
