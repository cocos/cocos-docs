# 3D Physics Manager

The 3D Physics System can simulate real physics behavior for collision detection and calculation of the force of the object, and then feed the simulation result back to the rendering layer.

## Enable the Physics System

The 3D Physics System is disabled by default. If you need to use it, you can enable it through the following command line, otherwise it will have no effect in runtime.

```javascript
cc.director.getPhysics3DManager().enabled = true;
```

## Physics System Properties

| Properties | Function explanation                                                                         |
| ---------- | -----------                                                                                  |
| enabled    | Whether to enable the physics system, default is false                                      |
| allowSleep | Whether to allow the physics system to automatically hibernate, default is true.            |
| maxSubStep | The maximum number of sub-steps a full step is permitted to be broken into, default is 2.    |
| deltaTime  | Time spent in each simulation of physics, default is 1/60s.                                  |
| gravity    | Gravity value of the physics simulation, default is (0, -10, 0)                             |

For API interface, please refer to [Physics3DManager](%__APIDOC__%/en/classes/Physics3DManager.html) for details.

> **Note**: the Builtin Physics Engine does not support the above properties related to physics simulation.

## Ray Detection

Ray Detection is used to detect which colliders a given line passes through. There are two types:

- **cc.director.getPhysics3DManager().raycast**

  The `cc.director.getPhysics3DManager().raycast` interface, will detect all Colliders on the ray path, the order of the detected results is not fixed.

  - If no Collider is detected, it returns `null`.
  - If so, it returns an array containing the results of all Collisions. Please refer to the [raycast](%__APIDOC__%/en/classes/Physics3DManager.html#raycast) for details.

    Code example:

    ```javascript
    onTouchStart (event) {
        let touchLoc = event.touch.getLocation();
        let ray = cc.Camera.main.getRay(touchLoc);
        let maxDistance = 1000;
        let rayColliderGroupName = "ray collider group name";
        const results = cc.director.getPhysics3DManager().raycast(ray, rayColliderGroupName, maxDistance);
        if (results) {
            console.log(results);
        }
    }
    ```

- **cc.director.getPhysics3DManager().raycastClosest**  

  The `cc.director.getPhysics3DManager().raycastClosest` interface, will detect the nearest Collider on the ray path.

  - If no Collider is detected, it returns `null`.
  - If so, it returns a Collider that meets the requirements, the usage is similar to the `raycast`. Please refer to the [raycastClosest](%__APIDOC__%/en/classes/Physics3DManager.html#raycastclosest) for details.

    Code example:

    ```javascript
    onTouchStart (event) {
        let touchLoc = event.touch.getLocation();
        let ray = cc.Camera.main.getRay(touchLoc);
        let maxDistance = 1000;
        let rayColliderGroupName = "ray collider group name";
        const result = cc.director.getPhysics3DManager().raycastClosest(ray, rayColliderGroupName, maxDistance);
        if (result) {
            console.log(result);
        }
    }
    ```
