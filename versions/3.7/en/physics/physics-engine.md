# Physics Engines

Click **Project -> Project Settings -> Feature Cropping** in the menu bar at the top of the editor, and in **3D -> Physics System** you can choose the appropriate physics engine for your project to develop, or switch between them at any time during the development process. The physics engines currently supported by Creator include **Bullet (ammo.js)**, **cannon.js**, **PhysX** and **Builtin**, and the default is **Bullet (amo.js)**.

![Physics engine options](img/physics-module.jpg)

## Introduction to the Physics Engines

### Bullet(ammo.js)

ammo.js ([GitHub](https://github.com/cocos-creator/ammo.js)) is the [Bullet](https://github.com/bulletphysics/bullet3) version of asm.js/wasm for the physics engine, compiled by the [emscripten](https://github.com/emscripten-core/emscripten) tool.

The **ammo.js** module is large (~1.5MB), but it has good physics functionality and better performance, and we will be putting more work into it in the future.

### Builtin

**Builtin** is a built-in physics engine providing **collision detection only**. Compared to other physics engines, it does not have complex physics simulation calculations, so if your project does not need this part of the physics simulation, it is recommended to use **Builtin** to make the game a smaller package.

When using **Builtin** for development, please note the following:

- Only **trigger** trigger type events.
- The **IsTrigger** property in collider components is invalid, and all colliders can only be used as [triggers](physics-event.md).
- The `Material` property of the collider component is invalid.
- `Attached` in collider components is always `null`.
- [Rigidbody](physics-rigidbody.md) is invalid.
- [Constant Force Component](physics-constantForce.md) is invalid.
- [Constraints](physics-constraint.md) are invalid.

### cannon.js

**cannon.js** ([GitHub](https://github.com/cocos-creator/cannon.js)) is an open source physics engine, developed in JavaScript and implementing a relatively comprehensive physics simulation.The size of the **cannon.js** module is about **141KB**.

When the selected physics engine is **cannon.js**, you need to add a **Rigidbody** component to the node to perform the physics simulation. Then add **Colllider** components as required, and the node will add the corresponding collider for detecting collisions with other colliders.

The current cannon.js support is as follows:

- [Rigidbody](physics-rigidbody.md)
- [Box/Sphere Collider](physics-collider.md)
- Trigger and collision events
- Physics materials
- Raycast detection

### PhysX

**PhysX** ([GitHub](https://github.com/NVIDIAGameWorks/PhysX)) is an open-source real-time commercial physics engine developed by NVIDIA Corporation, which offers a full range of functional features and high stability, as well as excellent performance.

Cocos Creator currently supports **PhysX** version 4.1, which allows for use in most native and web platforms. When publishing to native platforms, PhysX physics is recommended for better physics performance, especially when publishing to iOS.

However, **PhysX** is currently too large a package (~5MB) and has some limitations of its own that prevent good support for some platforms, including

- Various mini-game platforms with package size limitations
- Android x86 devices

Some newer platforms and devices, such as HarmonyOS devices, will be supported in the future, please pay attention to the update announcement. Apple M1 (Silicon) architecture devices are already supported in v3.4.

In addition, the ByteDance platform provides the underlying native physics feature, so it is also available in ByteDance mini-games, please refer to [Publish to ByteDance Mini Games - Native Physics](../editor/publish/publish-bytedance-mini-game.md).

### Different physical back-end collision shape support

| Features | builtin | cannon.js | Bullet | PhysX
|:--------|:--------|:----------|:--------|:----|
| Center-of-mass | ✔ | ✔ | ✔ | ✔ |
| Box, sphere | ✔ | ✔ | ✔ | ✔ | ✔
| Capsule | ✔ | can be pieced together with base shapes | ✔ |✔ |
| Convex | |✔ |✔ | ✔ | 
| Static terrain, static planes | | ✔ | ✔ |✔
| Static meshes | | very limited support | ✔ |✔ |
| Cones, Cylinders | ✔ | ✔ | ✔ | ✔ |
| Monomorphic | | Limited support | ✔ |✔
| Composite shapes | ✔ | ✔ | ✔ |✔
| Raycast detection, mask filtering | ✔ | ✔ | ✔ | ✔
| Multi-step simulation, collision matrix | ✔ | ✔ | ✔ |✔ |
| Trigger events | ✔ | ✔ | ✔ | ✔ | ✔ |
| Auto-sleep | | ✔ | ✔ |✔ |
| Collision events, collision data | | ✔ | ✔ | ✔
| Physics Materials | ✔ | ✔ | ✔ | ✔ |
| Static, kinematics | ✔ | ✔ | ✔ | ✔ |
| Dynamics | ✔ | ✔ | ✔ | ✔ |
| Point-to-point, hinge constraints (experimental) | | ✔ | ✔ | ✔
| wasm | | | ✔ |✔ |

## Not using physics

If you don't need to use any physics-related components and interfaces, you can uncheck the physics system option to make the game a smaller package.

> **Note**: If the physics system option is unchecked, the project will not be able to use physics-related components and interfaces, otherwise it will report an error at runtime.

## Performance of physics engine

The performance of **Bullet** and **PhysX** physics is compared for various trivia platforms and native platforms.

- On both native and ByteDance mini game platforms, the best performance is obtained using **PhysX** physics.
- On all types of other mini game platforms, the best performance is obtained with **Bullet** physics.

## Differences in the effect of the physics engine

Different physics engines have different internal designs and algorithms, so there will be some cases where the parameters are the same but the effects are different.

1. the **Damping** property on rigid body components

    The difference is caused by the fact that PhysX physics uses a different damping algorithm model. However, this difference has been eliminated internally, and if you need to synchronize the damping values previously set in PhysX, you can refer to the following code for conversion.

    ```ts
    const dt = PhysicsSystem.instance.fixedTimeStep;
    const newDamping = 1 - (1 - oldDamping * dt) ** (1 / dt);
    ```

2. The **Factor** property on rigid body components

    The **Linear Factor** and **Angular Factor** properties on rigid body components only have a fixed effect on PhysX physics, because PhysX physics only fixes the rigid body degrees of freedom and does not provide a scaling factor for the rigid body velocity. This difference will be removed internally.

3. Physics Materials

    PhysX physics materials support static friction factor, dynamic friction factor, and elasticity factor. Compared to physics materials in Creator, it lacks dynamic friction coefficient. This coefficient is currently the same as the static friction coefficient, and this part of the difference is not available for conversion at this time.

In addition to the points mentioned above, there are also other algorithmic differences, such as numerical integration methods, LCP solution algorithms, solution accuracy, etc., so there will always be different effects, but these are less easily perceived in actual project development.
