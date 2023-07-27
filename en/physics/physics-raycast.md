# Raycast Detection

In this document, we will discuss how to use raycast and line stripe cast to detect colliders in physics world.

## Raycast Detection

Raycast detection is a **intersection determination** of one ray and another shape, as shown in the figure below.

![illustration](img/raycast.jpg)

### Construct Rays

A **ray** consists of a **starting point** and a **direction**. There are several more common ways to construct a ray, as follows:

1. via the constructor of **start** + **direction**, **ray** or the static interface `create`.

    ```ts
    import { geometry } from 'cc';

    // Construct a ray starting from (0, -1, 0) and pointing to the Y-axis
    // the first three arguments are the starting point, the last three arguments are the direction
    const outRay = new geometry.Ray(0, -1, 0, 0, 0, 1, 0);

    // or by static method 'create'
    const outRay2 = geometry.Ray.create(0, -1, 0, 0, 0, 1, 0);
    ```

2. via the static interface `fromPoints` of **start point** + **another point on ray**, **ray**:

    ```ts
    import { geometry, math } from "cc";
    // Construct a ray that points to the Z-axis from the origin
    const outRay = new geometry.Ray();
    geometry.Ray.fromPoints(outRay, math.Vec3.ZERO, math.Vec3.UNIT_Z);
    ```

3. Use the camera to construct a ray emitted from the camera origin to a point on the screen.

    ```ts
    import { geometry, Camera } from "cc";
    // Take the example of a script mounted under Camera
    const camera = this.node.getComponent(Camera);
    // Get a ray emitted from the screen at (0, 0)
    const outRay = new geometry;
    camera?.screenPointToRay(0, 0, outRay);
    ```

    > **Note**.
    > 1. First you need to get a reference to a camera component or camera instance.
    > 2. The order of the interface parameters exposed by the camera component and the camera instance are different.

### Interface Introduction

Cocos Creator provides a set of raycast detection functions based on the physics engine.

The interface is currently provided by [**PhysicsSystem**](__APIDOC__/en/class/physics.PhysicsSystem) and has the following two classes.

- `raycast` : Detects all colliders and records all detected results, obtained via `PhysicsSystem.instance.raycastResults`. The interface returns a boolean value indicating whether if the ray intersects with any collider or not.
- `raycastClosest`: detects all colliders and records the result of the detection with the shortest distance to the ray, obtained via `PhysicsSystem.instance.raycastClosestResult`. Also returns a boolean value same as `raycast` method.

> **Note**.
> 1. The detected object is a physical collider, and the corresponding collider component in the scene panel is a collider component, e.g. **BoxCollider**.
> 2. The object returned by the detection result is read-only and reused, and the corresponding result is updated after each call to the detection interface.

Common examples of raycast detection of nearest objects based on camera position and screen coordinates.

```ts
let ray = new geometry.Ray();
this.camera.screenPointToRay(eventMouse.getLocationX(), eventMouse.getLocationY(), ray);
// The following parameters are optional
const mask = 0xffffffff;
const maxDistance = 10000000;
const queryTrigger = true;

if (PhysicsSystem.instance.raycastClosest(ray, mask, maxDistance, queryTrigger)) {
    const raycastClosestResult = PhysicsSystem.instance.raycastClosestResult;
    const hitPoint = raycastClosestResult.hitPoint
    const hitNormal = raycastClosestResult.hitNormal;
    const collider = raycastClosestResult.collider;
    const distance = raycastClosestResult.distance;            
}
```

The following code demonstrates how multiple objects can be detected:

```ts
const worldRay = new geometry.Ray(0, -1, 0, 0, 1, 0);
// The following parameters are optional
const mask = 0xffffffff;
const maxDistance = 10000000;
const queryTrigger = true;

const bResult = PhysicsSystem.instance.raycast(worldRay, mask, maxDistance, queryTrigger);
if(bResult){
    const results = PhysicsSystem.instance.raycastResults;

    for (let i = 0; i < results.length; i++) {
        const result = results[i];
        const collider = result.collider;
        const distance = result.distance;
        const hitPoint = result.hitPoint;
        const hitNormal = result.hitNormal;
    }
}
```

#### Parameter Description

- `worldRay`: the ray in the world space
- `mask`: [mask](physics-group-mask.md) for filtering, you can pass in the group to be detected, default is 0xffffffff
- `maxDistance`: the maximum detection distance, default is 10000000, do not pass `Infinity` or `Number.MAX_VALUE` at this time
- `queryTrigger`: whether to detect the trigger

#### Result Description

The result of the ray detection is stored by [PhysicsRayResult](__APIDOC__/en/class/physics.PhysicsRayResult), mainly with the following information.

- `collider`: the collider that hit
- `distance`: the distance between the hit point and the start of the ray
- `hitPoint`: the hit point (in the world coordinate)
- `hitNormal`: the normal of the face where the hit point is located (in the world coordinate)

Related test cases can be found in the [GitHub repo](https://github.com/cocos-creator/example-3d/blob/v3.7/physics-3d/assets/cases/scenes/csae-physics-raycast.scene).

## Line Stripe Cast

Line stripe cast/sample points cast is supported in Cocos Creator since v3.7. There are two methods `lineStripCast` and `lineStripCastClosest` which can be used to cast a line stripe in the physics world to detect colliders.

### Interface description

These two methods which encapsulated the `raycast` method are convenient to use used when checking whether one or more colliders are hit by the line stripe provided by the `samplePointsWorldSpace` parameter.

- lineStripCast: Collision detect all collider and record all the detected results

    ```ts
    lineStripCast (samplePointsWorldSpace: Array<Vec3>, mask = 0xffffffff, maxDistance = 10000000, queryTrigger = true): boolean;
    ```

- lineStripCastClosest: Collision detect all collider, and record the ray test results with the shortest distance

    ```ts
    lineStripCastClosest (samplePointsWorldSpace: Array<Vec3>, mask = 0xffffffff, maxDistance = 10000000, queryTrigger = true): boolean;
    ```

#### Parameters

- `samplePointsWorldSpace`： Sample points/line stripe in world space
- `mask`: [mask](physics-group-mask.md) for filtering, you can pass in the group to be detected, the default is 0xffffffff
- `maxDistance`: the maximum detection distance, default is 10000000, do not pass `Infinity` or `Number.MAX_VALUE` at this time
- `queryTrigger`: whether to detect the trigger

#### Return values

It will return true when the line stripe intersects with other colliders, but the result of detection is stored in `PhysicsSystem.Instance.lineStripCastClosestResult` and `PhysicsSystem.Instance.lineStripCastResults` which can be referred in the following contents.

### Example

Use `lineStripCastClosestResult` 和 `lineStripCastResults` to fetch the invoking result if these methods return true.

```ts
if (PhysicsSystem.instance.lineStripCastClosest(sampleArray, ...)) {
    const result = PhysicsSystem.instance.lineStripCastClosestResult;
    ...    
}
```

The properties of lineStripCastClosestResult which type is PhysicsLineStripCastResult inherited from PhysicsRayResult are as follows:

- `id`: The index of the line stripe when collided
- `collider`: the collider that hit
- `distance`: the distance between the hit point and the start of the ray
- `hitPoint`: the hit point (in the world coordinate)
- `hitNormal`: the normal of the face where the hit point is located (in the world coordinate)

The description of `lineStripCast` property is an array of `PhysicsLineStripCastResult` which is detailed from the above. The code example is as follows:

```ts
if (PhysicsSystem.instance.lineStripCast(sampleArray, ... )) {    
    const results = PhysicsSystem.instance.lineStripCastResults;
    for (let i = 0; i < results.length; i++) {
        const result = results[i];
        ...
    }
}
```

If you want to cast other types of geometry, please refer to [Geometry Cast Detection](./physics-sweep.md).
