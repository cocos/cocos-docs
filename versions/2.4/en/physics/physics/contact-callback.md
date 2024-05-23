# Contact Callback

When an physics object moves in the scene and collides with other objects, Box2d will handle most of the necessary collision detection and behavior. But the main point of making a physics game is what would happen when an object collides with something: such as a character encounters a monster should lead to damage taken, or when the ball hits the ground it should produce a sound.

Besides the engine tells us when a collision happens, we also need a way to get these collision information. The physics engine provides contact callback when the collision happens. In the callback we can get the information from callback argument that we can determine what happened and what action needs to be done next.

## Notice

1. We need to first `Enable contact listener` in the [rigidbody](rigid-body.md) component properties, so that a corresponding callback will be generated.

2. The information in the argument of callback function is fetched from the cache of the physics engine, so the information is only accessible in the current callback. Do not store the reference to those parameters in your script, but you can copy the data to your own variable for later use.

3. If you try to create physics object (rigidbody, joint or collider) in the callback function, the corresponding box2d objects will not be created immediately along these objects. The creation of physics object will be done after a physics time step completes.

## Define a callback function

Define a contact callback function is very simple, just attach a component script to the node with the rigidbody. The script should contain your contact callback function:

```js
cc.Class({
    extends: cc.Component,

    // will be called once when two colliders begin to contact
    onBeginContact: function (contact, selfCollider, otherCollider) {
    },

    // will be called once when the contact between two colliders just about to end.
    onEndContact: function (contact, selfCollider, otherCollider) {
    },

    // will be called everytime collider contact should be resolved
    onPreSolve: function (contact, selfCollider, otherCollider) {
    },

    // will be called every time collider contact is resolved
    onPostSolve: function (contact, selfCollider, otherCollider) {
    }
});
```

In the above code example, we added all types of the contact callback functions to this script, a total of four different types. Each callback function has three parameters. The trigger condition of each callback function as shown in the comment.

## Callback Order

To describe the timing and order of different contact callbacks, we can take a simple collision process as example. Assuming two rigidbody with collider are moving toward each other. The triangle object moves to the right, the box object moves to the left and they are about to collide.

![Anatomy-aabbs](./image/anatomy-aabbs.png)

<table>
<tbody>
<tr>
Collision Procedure
</tr>
<tr>
<td style="padding:4px;width:256px;vertical-align:middle;border:1px solid black;text-align:center">
Collision 1<br>
<img src="./image/collision-callback-order-1.png"></img>
<div style="height:4px"></div>
Collision 2<br>
<img src="./image/collision-callback-order-2.png"></img>
<div style="height:4px"></div>
Collision 3<br>
<img src="./image/collision-callback-order-3.png"></img>
</td>
<td style="padding:4px;border:1px solid black">
When two colliders intersect with each other, Box2d's default behavior is to give them an impulse so that they can get away with each other. But the behavior may not be complete in a single time step.
Like shown here, the intersection between two colliders in the example will last about 3 physics time steps, until the impulse make them bounce away from each other. <br>
During these 3 time steps, we can customize the behavior we want. <b>onPreSolve</b> and <b>onPostSolve</b> will be called every time before the physics engine handle the collision behavior or after the engine apply the collision impulse, so we can modify the collision information before the contact behavior resolved or fetch the correct impulse value after contact.<br>
The below output log shows the exact callback order of the example.
<pre>        ...
    Step
    Step
    BeginContact
    PreSolve
    PostSolve
    Step
    PreSolve
    PostSolve
    Step
    PreSolve
    PostSolve
    Step
    EndContact
    Step
    Step
    ...
</pre>
</td>
</tr>
</tbody>
</table>

## Callback parameters

The callback parameters contain all the collision contact information, and each callback function provides three parameters: `contact`, `selfCollider`, `otherCollider`.

`selfCollider` and `otherCollider`: It is easy to understand. As the name suggests, `selfCollider` refers to the collider on the node of the callback script, `otherCollider` refers to the other collider.

The most important information is included in `contact`, which is an instance of the class `cc.PhysicsContact` that can be found in the API documentation.

Some useful information in `contact` object are location of the collision and the normal vector. Contact store location information according to rigidbody's local coordinate system. What we need however is information from world coordinate system. We can use `contact.getWorldManifold` to get these information.

### worldManifold

We can get `worldManifold` like this:

```javascript
var worldManifold = contact.getWorldManifold ();
var points = worldManifold.points;
var normal = worldManifold.normal;
```

`worldManifold` has following members:

- points

  The array of contact points, they are not necessarily at the exact place where the collision happens as shown below (unless you set the rigidbody to use the `bullet` type, but will be more performance costing). By for general usage these points are accurate enough for us to write game logic upon.

  ![World-manifold-points](./image/world-manifold-points.png)

  > **Note**: not every collision will have two contact points, in more simulation cases only one contact point will be produced. The following lists some other examples of the collision.

  ![Collision-points-1](./image/collision-points-1.png)

  ![Collision-points-2](./image/collision-points-2.png)

  ![Collision-points-3](./image/collision-points-3.png)

- normal

  The normal vector on the contact point is from `selfCollider` to `otherCollider`, indicating the quickest direction to resolve the collision.

  ![World-manifold-normal](./image/world-manifold-normal.png)

  The lines shown in the figure is the normal vectors on the contact point. In this collision, the quickest way to solve the collision is to add the impulse to push the triangle to the top and push the box down to the right. It should be noted that the normal vector here is only about the direction, not with the location properties, nor with connection to any of these contact points.

  You also need to understand that the **collision normal vector is not the same as the angle in which two object collides**. It will only be able to point the direction which can solve the two colliders intersecting with each other. For example, in the above example, if the triangle moves a little faster, the intersection will be shown below:

  ![World-manifold-normal-2](./image/world-manifold-normal-2.png)

  Then the quickest way would be to push the triangle to the right, so using the normal vector as the direction of collision is not a good idea. If you want to know the direction of the collision, you can use the following way:

  ```javascript
  var vel1 = triangleBody.getLinearVelocityFromWorldPoint(worldManifold.points[0]);
  var vel2 = squareBody.getLinearVelocityFromWorldPoint(worldManifold.points[0]);
  var relativeVelocity = vel1.sub(vel2);
  ```

  This code can obtain the relative velocity at the contact point when the two object collide with each other.

### Disable contact

```javascript
contact.disabled = true;
```

Disabling the contact will cause the physics engine to ignore the contact when calculating the collision. The disable will continue until the collision is completely resolved unless the contact is enabled in other callbacks.

Or if you only want to disable contact in the current time step, you can use `disabledOnce`.

```javascript
contact.disabledOnce = true;
```

### Modify contact information

It is mentioned earlier that we can modify the contact information in `onPreSolve` because `onPreSolve` is called before the physics engine handles the contact information. Changes to the contact information will affect the subsequent collision calculations.

```js
// modify the friction between the collision bodies
contact.setFriction(friction);

// Modify the elasticity of the collision body
contact.setRestitution(restitution);
```

Note that these changes will only take effect within the current time step.
