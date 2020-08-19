# Rigidbody

Rigidbody is the basic object that composite the physical world.

## Rigidbody properties

### Mass

The mass of rigidbody is automatically calculated by the `density` and `size` of the [PhysicsCollider Component](collider-component.md).
You may need to use this property when you need to calculate how much force the object should be subjected to.

```javascript
var mass = rigidbody.getMass();
```

### Velocity

Linear velocity describle the movement speed of the rigidbody.

```javascript
// Get the velocity of the move
var velocity = rigidbody.linearVelocity;
// Set the velocity of the move
rigidbody.linearVelocity = velocity;
```

Linear Damping is used to simulate the air friction and other damping effects, it will make the current velocity decrease over time.

```javascript
// Get the moving speed attenuation factor
var damping = rigidbody.linearDamping;
// Set the moving speed attenuation factor
rigidbody.linearDamping = damping;
```

Sometimes it may be desirable to get the velocity of a point on a rigidbody, such as a box that rotates forward and touches the wall. It may be desirable to get the velocity of the box at the point of the collision. You can get it by `getLinearVelocityFromWorldPoint`.

```javascript
var velocity = rigidbody.getLinearVelocityFromWorldPoint (worldPoint);
```

Or you can pass in a `cc.Vec2` object as the second argument to get the return value so that you can use your cached object to store this value, avoiding creating too many objects to improve performance.

**The `get` method of rigidbody provides an `out` parameter to receive the function return value.**

```javascript
var velocity = cc.v2 ();
rigidbody.getLinearVelocityFromWorldPoint (worldPoint, velocity);
```

### Angular Velocity

```javascript
// Get the angular velocity
var velocity = rigidbody.angularVelocity;
// Set the angular velocity
rigidbody.angularVelocity = velocity
```

Angular Damping is similar to Linear damping, but will affect Angular velocity.

```javascript
// Get the angular damping
var damping = rigidbody.angularDamping;
// Set the angular damping
rigidbody.angularDamping = damping;
```

### Rotation, Position and scaling

Rotation, position and scaling are the most commonly used transform in game development, and almost every node has these properties set. In the physics system, the system will automatically synchronize these properties of the node to box2d corresponding properties.

There are a few information that need everyone's **Notice**:

1. There is only rotation and position in box2d and there is no scaling, so if you set the scale properties of the node, all the colliders of the rigidbody are reconstructed. One way to avoid this is to take the renderer node as a child node of the rigidbody node, and to scale only the renderer node, to avoid scaling the rigidbody nodes as much as possible.

2. After each physics time step, all the rigidbody information will be synchronized to the corresponding node. In the performance considerations, only when user set the node's related property explicitly they will be synchronized to the rigidbody. Rigidbody will only monitor the node it attaches to, that is, if the parent node of the rigidbody node is modified, the information will not be synchronized automatically.

### Fixed rotation

When making a platform action game usually we do not want the player character to rotate due to physics forces. Since it will lead to the player character to lean and even fall in the process of moving around, then you can set the rigidbody's `fixedRotation` property.

```javascript
rigidbody.fixedRotation = true;
```

### Enable contact listener

Only when the rigidbody's contact listener is enabled, it will send callback to component attach to the node when collision happens.

```javascript
rigidbody.enabledContactListener = true;
```

## Rigidbody type

There are three types of Box2d's native rigidbody: **Static**, **Dynamic** and **Kinematic**. We added a forth type in Cocos Creator's physics system: **Animated**.

`Animated` is derived from the `Kinematic` type, the general rigidbody type changes **Rotate** or **Position** by setting the properties directly, but `Animated` type will lerp the property values between current property and target property, and assign it to the corresponding property.<br>
`Animated` type is invented mainly to prevent the weird behavior such as penetration when making movement animation on rigidbody node.

- `cc.RigidBodyType.Static`: Static rigidbody, zero mass, zero velocity, that is not affected by gravity or force, but can set its position to move.

- `cc.RigidBodyType.Dynamic`: Dynamic rigidbody, with mass, its velocity can be set, will be affected by gravity.

- `cc.RigidBodyType.Kinematic`: Kinematic rigidbody, zero mass, its velocity can be set, will not be affected by gravity, but can move by setting the velocity.

- `cc.RigidBodyType.Animated`: Animated rigidbody, already mentioned above, derived from Kinematic type, mainly used for rigidbody and animation in combination.

## Rigidbody API

### Get or convert the rotation and position property

Using these api to get the rotation and position in the world coordinate system will be faster than getting the relevant properties through the node, because the nodes also need to get the results through the matrix operation, and these api gives you the direct result.

#### Get the rigidbody coordinates

```javascript
// Get the return value directly
var out = rigidbody.getWorldPosition();

// or through the parameters to receive the return value
out = cc.v2 ();
rigidbody.getWorldPosition (out);
```

#### Get the rigidbody world rotation value

```javascript
var rotation = rigidbody.getWorldRotation();
```

#### Local coordinates and world coordinate transformation

```javascript
// world coordinates to local coordinates
var localPoint = rigidbody.getLocalPoint(worldPoint);
// or
localPoint = cc.v2 ();
rigidbody.getLocalPoint (worldPoint, localPoint);
```

```javascript
// local coordinates to world coordinates
var worldPoint = rigidbody.getWorldPoint (localPoint);
// or
worldPoint = cc.v2 ();
rigidbody.getLocalPoint (localPoint, worldPoint);
```

```javascript
// local vector to world vector
var worldVector = rigidbody.getWorldVector (localVector);
// or
worldVector = cc.v2 ();
rigidbody.getWorldVector (localVector, worldVector);
```

```javascript
var localVector = rigidbody.getLocalVector (worldVector);
// or
localVector = cc.v2 ();
rigidbody.getLocalVector (worldVector, localVector);
```

### Get the rigidbody mass center

When force is applied to a rigidbody, the mass center of the rigidbody is generally chosen as the point of application of the force, which ensures that the force does not affect the rotation value.

```javascript
// Get the mass center in the local coordinate system
var localCenter = rigidbody.getLocalCenter ();

// or through the parameters to receive the return value
localCenter = cc.v2 ();
rigidbody.getLocalCenter (localCenter);

// Get the mass center in the world coordinate system
var worldCenter = rigidbody.getWorldCenter ();

// or through the parameters to receive the return value
worldCenter = cc.v2 ();
rigidbody.getWorldCenter (worldCenter);
```

### Force and impulse

There are two ways to move an object, you can apply a force or impulse to the object. The force will slowly change the velocity of the object over time, and the impulse will immediately modify the velocity of the object.
Of course, you can also directly modify the location of the object, but this does not give you the real physics simulation, you should try to use force or impulse to move a rigidbody to make the physical world more consistent.


```javascript
// Apply a force to the point specified on the rigidbody, this point is a point in the world coordinate system
rigidbody.applyForce (force, point);

// or apply force directly to the mass of the rigid body
rigidbody.applyForceToCenter (force);

// Apply a punch to the point specified on the rigid body, this point is a point in the world coordinate system
rigidbody.applyLinearImpulse (impulse, point);
```

Force and impulse can also affect the rotation only, this kind of force is called torque.

```javascript
// Apply torque to rigidbody. because it only affects the rotation, so no longer need to specify a point
rigidbody.applyTorque (torque);

// Apply the impulse on the rotating shaft to the rigidbody
rigidbody.applyAngularImpulse (impulse);
```

### Other Information

Sometimes you need to get the velocity of a rigidbody at a certain point, you can get by `getLinearVelocityFromWorldPoint` API, such as when the object collides with a platform, we need to determine whether the object is colliding from top or bottom of the platform according to the velocity of the collision point relative to the platform.

```javascript
rigidbody.getLinearVelocityFromWorldPoint (worldPoint);
```
