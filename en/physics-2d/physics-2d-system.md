# 2D Physics Manager

The physics system hides most of the implementation details of the physics modules (Box2D and Builtin modules) (e.g.: creating rigid bodies, synchronizing rigid body information to nodes, etc.).

Use the physics system to access some of the common functions of the physics module, such as click testing, ray testing, and setting up test messages.

## Physics system related settings

### Enabling the Physics Manager

The __Physics Manager__ is enabled by default:

```ts
PhysicsSystem2D.instance.enable = true;
```

### Draw physics debugging information

To enable draw debugging information, use the __debugDrawFlags__.

The physics system provides a variety of debugging information, you can combine the information to draw the relevant content.

```ts
PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.Aabb |
    EPhysics2DDrawFlags.Pair |
    EPhysics2DDrawFlags.CenterOfMass |
    EPhysics2DDrawFlags.Joint |
    EPhysics2DDrawFlags.Shape;
```

Set the drawing flag to `EPhysics2DDrawFlags.None` to disable drawing.

```ts
PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.None;
```

### Converting physics units to the world coordinate system units

General physics modules (Box2D) uses __Metre-Kilogramme-Second (MKS)__ unit system, it has the best performance operating under such a unit system. But we use the __world coordinate system units__ (short for world units) as the unit of length in 2D games, so we need a ratio to convert the physics units to the world units.

In general, set this ratio to __32__, which can be obtained by `PhysicsManager.PTM_RATIO`, and this value is read-only. Usually the user does not need to care about this value, the physics system will automatically convert the physics units and world units to each other. User can use the familiar world units for all the calculations.

### Set physics gravity

Gravity is a very important thing in physics operations, and most physics games use the gravity as a important feature.

The default gravity is `(0, -320)` world units per second^2, according to the conversion rules described above, that's `(0, -10)` m/s^2 in physics unit.

Gravity can be set to `0`. Example:

```ts
PhysicsSystem2D.instance.gravity = v2();
```

It is possible to change the acceleration of gravity to something else, such as a `20 m/s`. Example:

```ts
PhysicsSystem2D.instance.gravity = v2(0, -20 * PHYSICS_2D_PTM_RATIO);
```

### Set physics timestep

The Physics System updates the physics world according to a fixed timestep, the default timestep is `1/60`. But some games may not want to follow such a high frequency to update the physics world, after all, this operation is more time consuming, then you can reduce the timestep to achieve this effect.

```ts
const system = PhysicsSystem2D.instance;

// Physics timestep, default fixedTimeStep is 1/60
system.fixedTimeStep = 1/30;

// The number of iterations per update of the Physics System processing speed is 10 by default
system.velocityIterations = 8;

// The number of iterations per update of the Physics processing location is 10 by default
system.positionIterations = 8;
```

> __Note__: reducing the fixed timestep and the number of iterations for each property will reduce the physics detection frequency. Therefore, it is more likely to occur rigid body penetration, which needs to be taken into account when using.

## Querying physics object

Often, knowing which physics objects are in a given scene is beneficial. For example, if a bomb explodes, objects in its range will be damaged; or in a strategy game, you may want to let the user drag to move a unit from a certain range.

The physics system provides several ways to efficiently and quickly look for objects in a region, each of which uses different ways to query objects that fit the needs of the game.

### Point test

The point test will test if there's a collider contains a specific point under the world coordinate system. If the test is successful, it will return the collider. If there're multiple collider that contains the point, a random one will be returned.

```ts
const collider = PhysicsSystem2D.instance.testPoint(point);
```

### Rectangle test

The rectangle test will test a specified rectangle in the world coordinate system, and if the bounding box of a collision body overlaps with this rectangle, then the collision body will be added to the return list.

```ts
const colliderList = PhysicsSystem2D.instance.testAABB(rect);
```

### Ray test

The __Box2D__ physics module (not available in the Builtin module) also provides ray detection to detect which collision bodies a given line segment passes through. We can also obtain the normal vector at the point where the given line passes through and other useful information.

```ts
const results = PhysicsSystem2D.instance.raycast(p1, p2, type, mask);

for (const i = 0; i < results.length; i++) {
    const result = results[i];
    const collider = result.collider;
    const point = result.point;
    const normal = result.normal;
    const fraction = result.fraction;
}
```

The third parameter of the `raycast` function specifies the type of detection, and the ray detection supports four types. This is because the ray detection of __Box2D__ is not detected from the nearest object of the ray starting point, so the result of the test can not guarantee that the result is sorted by the distance from the object near the start of the ray. __Cocos Creator__'s physics system will determine whether the __Box2d__ test results are sorted based on the type of detection. This type will affect the result return to user.

- `ERaycast2DType.Any`

  Detect any collider on the ray path. Once it detects any collider, it will immediately end the detection process and will no longer detect other objects.

- `ERaycast2DType.Closest`

  Detect the nearest collider on the ray path, which is the default for the `raycast` detection, slightly slower than above method.

- `ERaycast2DType.All`

  Detect all colliders on the ray path, the order of the detected results is not fixed. In this type of detection, a collider may return multiple results because __Box2D__ run the detection by testing the fixture, and a collider may consist of multiple fixtures. This is a more costly method and will be slower than above methods.

- `ERaycast2DType.AllClosest`

  All colliders on the ray path are detected, but the return result is filtered and only the relevant information about the nearest point of each collider is returned, the slowest method of all.

#### The result of ray detection

The results of ray detection contain a lot of useful information, you can utilize these info according to the actual need.

- __collider__

  Specifies which collider the ray passes through.

- __point__

  Specifies the point at which the ray intersects the collider.

- __normal__

  Specifies the normal vector of the surface of the collider at the intersection.

- __fraction__

  Specifies the score of the intersection point at the ray.

The following figure helps to better understand the result of ray detection.

![raycasting-output](image/raycasting-output.png)

#### Group and mask for ray detection

The groups and masks for 2D physics system are the same as for 3D physics system, and can be modified by finding the collision matrix in the __Project Settings__ -> __Physics__ tab. More information can be found in [Grouping and Masks](../physics/physics-group-mask.md).
