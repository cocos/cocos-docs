# 2D RigidBody

__RigidBody__ is the basic object that composite the physics world.

The built-in 2D physics system only has collision detection capabilities, the rigid body is not available to the built-in 2D physics system. This setting is available only for other 2D physics systems.

## RigidBody properties

### Mass

The mass of a `RigidBody` is automatically calculated by the `density` and `size` of the [PhysicsCollider Component](collider-component.md). This property may be needed when calculating how much force the object should be subjected to.

```ts
// Get the mass of the rigidbody
const mass = rigidbody.getMass();
```

### Velocity

```ts
// Get the velocity of the move
const velocity = rigidbody.linearVelocity;
// Set the velocity of the move
rigidbody.linearVelocity = velocity;
```

Linear Damping is used to simulate the air friction and other damping effects, it will make the current velocity decrease over time.

```ts
// Get the moving speed attenuation factor
const damping = rigidbody.linearDamping;
// Set the moving speed attenuation factor
rigidbody.linearDamping = damping;
```

To get the velocity of a point on a RigidBody, such as a box that rotates forward and touches the wall. It may be desirable to get the velocity of the box at the point of the collision. You can get it by  `getLinearVelocityFromWorldPoint`.

```ts
const velocity = rigidbody.getLinearVelocityFromWorldPoint(worldPoint);
```

Or, pass in a `Vec2` object as the second argument to get the return value in order to use the cached object to store this value. This avoids creating too many objects to improve performance.

> __Note__: the `get` method of RigidBody provides an out parameter to receive the function return value.

```ts
const velocity = v2();
rigidbody.getLinearVelocityFromWorldPoint(worldPoint, velocity);
```

### Angular Velocity

```ts
// Get the angular velocity
const velocity = rigidbody.angularVelocity;
// Set the angular velocity
rigidbody.angularVelocity = velocity;
```

Travel speed decay coefficient, the larger the value the slower the object moves, and can be used to simulate effects such as air friction.

```ts
// Get the angular damping
const damping = rigidbody.angularDamping;
// Set the angular damping
rigidbody.angularDamping = damping;
```

### Rotation, position and scaling

Rotation, position and scaling are the most commonly used transform in game development, and almost every node has these properties set. In the physics system, the system will automatically synchronize these properties of the node to __Box2D__ corresponding properties.

> __Notes__:
> 1. There is only rotation and position in __Box2D__ and there is no scaling, so if you set the scale properties of the node, all the colliders of the __RigidBody__ are reconstructed. One way to avoid this is to take the renderer node as a child node of the __RigidBody__ node, and to scale only the renderer node, to avoid scaling the __RigidBody__ nodes as much as possible.
> 2. At the end of each update of the physics system (which is updated in postUpdate), all rigid body information is synchronized to the corresponding node. all __RigidBody__ information is synchronized to the corresponding node. In the performance considerations, the node information will be synchronized to the rigid body only if the developer sets the display properties of the node where the rigid body is located, and the rigid body will only monitor the node where it is located, i.e. if the rotation shift of the node's parent node is modified, the information will not be synchronized.

### Fixed rotation

When making a platform action game usually we do not want the player character to rotate due to physics forces. Since it will lead to the player character to lean and even fall in the process of moving around, then the `fixedRotation` of the rigid body can be set to true to fix the rotation.

```ts
rigidbody.fixedRotation = true;
```

### Enable Contact Listener

Only when the RigidBody's contact listener is enabled, it will send callback to component attach to the node when collision happens.

```ts
Rigidbody.enabledContactListener = true;
```

## RigidBody type

There are three types of Box2d's native __RigidBody__: __Static__, __Dynamic__, __Kinematic__. We added a forth type in __Cocos Creator__'s physics system: __Animated__.

`Animated` is derived from the `Kinematic` type, the general __RigidBody__ type changes __rotate__ or __position__ by setting the properties directly, but `Animated` type will lerp the property values between current property and target property, and assign it to the corresponding property.

`Animated` type is invented mainly to prevent the weird behavior such as penetration when making movement animation on RigidBody node.

- `RigidBodyType.Static`

  __Static RigidBody__, zero mass, zero velocity, that is not affected by gravity or force, but can set its position to move.

- `RigidBodyType.Dynamic`

  __Dynamic RigidBody__, with mass, its velocity can be set, will be affected by gravity.

- `RigidBodyType.Kinematic`

  __Kinematic RigidBody__, zero mass, its velocity can be set, will not be affected by gravity, but can move by setting the velocity.

- `RigidBodyType.Animated`

  __Animated RigidBody__, previously mentioned above, is derived from Kinematic type, mainly used for __RigidBody__ and animation in combination.

## RigidBody API

### Get or convert the rotation and position property

Using these api to get the rotation and position in the world coordinate system will be faster than getting the relevant properties through the node, because the nodes also need to get the results through the matrix operation, and these api gives you the direct result.

#### Local coordinates and world coordinate transformation

```ts
// world coordinates to local coordinates
const localPoint = rigidbody.getLocalPoint(worldPoint);
// or
localPoint = v2();
rigidbody.getLocalPoint(worldPoint, localPoint);
```

```ts
// local coordinates to world coordinates
const worldPoint = rigidbody.getWorldPoint(localPoint);
// or
worldPoint = v2();
rigidbody.getLocalPoint(localPoint, worldPoint);
```

```ts
// local vector to world vector
const worldVector = rigidbody.getWorldVector(localVector);
// or
worldVector = v2();
rigidbody.getWorldVector(localVector, worldVector);
```

```ts
const localVector = rigidbody.getLocalVector(worldVector);
// or
localVector = v2();
rigidbody.getLocalVector(worldVector, localVector);
```

### Get the RigidBody mass center

When force is applied to a RigidBody, the mass center of the RigidBody is generally chosen as the point of application of the force, which ensures that the force does not affect the rotation value.

```ts
// Get the mass center in the local coordinate system
const localCenter = rigidbody.getLocalCenter();

// or through the parameters to receive the return value
localCenter = v2();
rigidbody.getLocalCenter(localCenter);

// Get the mass center in the world coordinate system
const worldCenter = rigidbody.getWorldCenter();

// or through the parameters to receive the return value
worldCenter = v2();
rigidbody.getWorldCenter(worldCenter);
```

### Force and impulse

There are two ways to move an object:

1. Apply a force or impulse to the object. The force will slowly change the velocity of the object over time, and the impulse will immediately modify the velocity of the object.
2. It is possible to directly modify the location of the object, but this does not give you the real physics simulation, you should try to use force or impulse to move a RigidBody to make the physics world more consistent.

```ts
// Apply a force to the point specified on the RigidBody, this point is a point in the world coordinate system
rigidbody.applyForce(force, point);

// or apply force directly to the mass of the rigid body
rigidbody.applyForceToCenter(force);

// Apply a punch to the point specified on the rigid body, this point is a point in the world coordinate system
rigidbody.applyLinearImpulse(impulse, point);
```

Force and impulse can also affect the rotation only, this kind of force is called torque.

```ts
// Apply torque to RigidBody. because it only affects the rotation, so no longer need to specify a point
rigidbody.applyTorque(torque);

// Apply the impulse on the rotating shaft to the RigidBody
rigidbody.applyAngularImpulse(impulse);
```

### Other Information

Sometimes you need to get the velocity of a RigidBody at a certain point, you can get by `getLinearVelocityFromWorldPoint` API, such as when the object collides with a platform, we need to determine whether the object is colliding from top or bottom of the platform according to the velocity of the collision point relative to the platform.

```ts
rigidbody.getLinearVelocityFromWorldPoint(worldPoint);
```
