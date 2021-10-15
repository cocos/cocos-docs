# Choosing The Physics System Suitable For Your Project

Click __Project -> Project Settings -> Feature Crop -> Physics System__ in the editor's menu bar, to select the appropriate physics engine for development according to the project requirements. The default physics engine is __bullet（ammo.js）__, and the physics engine can be switched at will during the development process.

![Physics Engine Options](img/physics-module.png)

If there is no need to use any physically related components and interfaces, uncheck the __Physics System__ checkbox and the package will be smaller when published. However, it should be noted that if the checkbox is unchecked, the project cannot use physically related components and interfaces, otherwise errors will be reported at runtime.

## Physics Engine Types

### Collision Detection: builtin

__builtin__ only has the function of collision detection. Compared with other physics engines, it has no complicated physical simulation calculations. If your project does not require the physical simulation of this part, you can consider using __builtin__, which will make the size of game's package smaller.

If you use __builtin__ for development, please note the following:

- __builtin__ only has events of type __trigger__.
- __isTrigger__ in __Collider__ component is a trigger regardless of whether the value is true or false.

### Physics Engine: cannon.js

[cannon.js](https://github.com/cocos-creator/cannon.js) is an open source physics engine, which uses js language to develop and implement more comprehensive physics functions, if your project needs more complex physical functions, then you can consider using [cannon.js](https://github.com/cocos-creator/cannon.js). The size of the __cannon.js__ module is __141KB__.

### Physics Engine: bullet (ammo.js)

[ammo.js](https://github.com/cocos-creator/ammo.js) is the __asm.js__/__wasm__ Version of the [bullet](https://github.com/bulletphysics/bullet3) physics engine, it is compiled by [emscripten](https://github.com/emscripten-core/emscripten) tool. Bullet has perfect physical functions, and we will put more work here in the future.

It should be noted that currently the __ammo.js__ module has a size of about __1.5MB__.

### Physics Engine: PhysX

[PhysX](https://github.com/NVIDIAGameWorks/PhysX) is an open source real-time commercial physics engine developed by Nvidia. It has perfect functional characteristics and extremely high stability, as well as excellent performance.

The **PhysX** currently supported in Cocos Creator is version 4.1 and is allowed to be used on most platforms. PhysX physics is recommended for better physics performance when publishing to native platforms, especially when publishing to iOS.

However, due to the large package size of the **PhysX** (about 5MB) and some limitations of its own, it is not well supported on some platforms, including:

- Various mini game platforms with package size restrictions.
- Android x86 device.

Some newer platforms, such as HarmonyOS, Apple M1 (Silicon) architecture devices, will be supported in the future. Please pay attention to the update announcement.

In addition, the ByteDance platform provides the underlying native physics functionality, so this functionality can also be run in ByteDance Mini Games. For specific details, please refer to [publish ByteDance Mini Games](../editor/publish/publish-bytedance-mini-game.md).

<!-- ## Expand the physical backend -->

## Physics Engine Performance

Mainly for various Mini Games platforms and native platforms, and compare **Bullet** and **PhysX**:

- On native and ByteDance Mini Game platforms, using **PhysX** can get the best performance.
- On various Mini Game platforms, use **Bullet** to get the best performance.

## Physics Engine Differences

Different physics engines have different internal designs and algorithms, so there will be some different behaviors under the same parameters. These differences are mainly:

- `damping` property on RigidBody components

    The damping term is different because PhysX uses different damping algorithm models. But this difference has been eliminated internally. To synchronize the damping value previously set in PhysX, refer to the following code to convert:

    ```ts
    const dt = PhysicsSystem.instance.fixedTimeStep;
    const newDamping = 1 - (1 - oldDamping * dt) ** (1 / dt);
    ```

- `factor` property on RigidBody components

    This is caused by the fact that PhysX physics only fixes the degrees of freedom of the rigid body, and does not provide a scaling factor for the rigid body velocity, that is, the `Linear Factor` and `Angular Factor` properties in the rigid body component only have a fixed effect on PhysX physics. This difference will be removed internally.

- Physics material

    The physics material in PhysX supports static friction coefficient, dynamic friction coefficient and elastic coefficient. Compared with the PhysicsMaterial resources in Cocos Creator, it lacks the dynamic friction coefficient. The coefficient is currently consistent with the static friction coefficient. The difference in this part cannot be Provide expressions for conversion.

In addition to the points mentioned above, there are also differences in other algorithms, such as differences in numerical integration methods, LCP solving algorithms, solution accuracy, etc., so there will always be different effects, but these are not easy in actual project development. Perception.
