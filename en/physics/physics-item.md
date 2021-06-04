# Choosing The Physics System Suitable For Your Project

In the panel **Project -> Project Settings -> Module Options** of the Editor, you can choose a physics engine suitable for the needs of the project for development.

![Physics Engine Options](img/physics-module.jpg)

> **Notes**:
> 1. The default is `bullet(ammo.js)` physics engine.
> 2. The physics engine can be switched at will during development.

## Collision Detection: builtin

__builtin__ only has the function of collision detection. Compared with other physics engines, it has no complicated physical simulation calculations. If your project does not require the physical simulation of this part, you can consider using __builtin__, which will make the size of game's package smaller.

If you use __builtin__ for development, please note the following:

- __builtin__ only has events of type __trigger__.
- __isTrigger__ in __Collider__ component is a trigger regardless of whether the value is true or false.

## Physics Engine: cannon.js

[cannon.js](https://github.com/cocos-creator/cannon.js) is an open source physics engine, which uses js language to develop and implement more comprehensive physics functions, if your project needs more complex physical functions, then you can consider using [cannon.js](https://github.com/cocos-creator/cannon.js). The size of the __cannon.js__ module is __141KB__.

## Physics Engine: bullet(ammo.js)

[ammo.js](https://github.com/cocos-creator/ammo.js) is the __asm.js__/__wasm__ Version of the [bullet](https://github.com/bulletphysics/bullet3) physics engine, it is compiled by [emscripten](https://github.com/emscripten-core/emscripten) tool. Bullet has perfect physical functions, and we will put more work here in the future.

It should be noted that currently the __ammo.js__ module has a size of about __1.5MB__.

## Physics Engine: PhysX

**PhysX**（[GitHub](https://github.com/NVIDIAGameWorks/PhysX)）is an open source real-time commercial physics engine developed by Nvidia. It has perfect functional characteristics and extremely high stability, as well as excellent performance. 

The **PhysX** currently supported in Cocos Creator is version 4.1 and is allowed to be used on most platforms. However, due to the large size of **PhysX** and some limitations of its own, there are some platforms Unable to get good support, these platforms are:

- Various Mini Games platforms with package body restrictions (the reason is that the package body of the **PhysX** library is about 5 MB)
- Android x86 device

Some newer platforms, such as HarmonyOS and Apple M1 devices, will be supported in the future. Please pay attention to the update announcement. In addition, the ByteDance platform provides the underlying native physics, so this module can also be run in ByteDance Mini Games. For specific details, please refer to [publish ByteDance Mini Games](../editor/pulish/../publish/publish-bytedance-mini-game.md).

When publishing to the native platform, it is strongly recommended to use this module, so that you can get good performance, especially the native application of the IOS system.

## Do Not Use Physics

If you don't need to use any physics related components and interfaces, you can uncheck the yellow box, so that you can get a smaller package when publishing.

> **Note**: if it is unchecked, the project will not be able to use physics related components and interfaces, otherwise an error will be reported during runtime.

<!-- ## Expand the physical backend -->

# Physics Engine Performance

Mainly for various Mini Games platforms and native platforms, and compare **Bullet** and **PhysX**:

- On native and ByteDance platforms, using **PhysX** can get the best performance
- On various Mini Games platforms, use **Bullet** to get the best performance

# Physics Engine Differences

Different physics engines have different internal designs and algorithms, so there will be some different behaviors under the same parameters. These differences are mainly:

- `damping` property on RigidBody components
- `factor` property on RigidBody components
- PhysicsMaterial

Difference details and some solutions:

1. `damping`
The damping term is different because PhysX uses different damping algorithm models.
However, this difference has been eliminated internally. If you need to synchronize the damping value previously set in PhysX, you can refer to the following code to convert:
```ts
const dt = PhysicsSystem.instance.fixedTimeStep;
const newDamping = 1 - (1 - oldDamping * dt) ** (1 / dt);
```

2. `factor`
Scaling factor. Since PhysX has only limited functions, when using the PhysX module, when the factor is 0, it means that the movement of the corresponding axis is restricted. When it is not 0, it means that the corresponding axis can move freely. This difference will be eliminated internally in the future.

3. PhysicsMaterial
The physics material in PhysX supports static friction coefficient, dynamic friction coefficient and elastic coefficient. Compared with the PhysicsMaterial resources in Cocos Creator, it lacks the dynamic friction coefficient. The coefficient is currently consistent with the static friction coefficient. The difference in this part cannot be Provide expressions for conversion.

In addition to the points mentioned above, there are also differences in other algorithms, such as differences in numerical integration methods, LCP solving algorithms, solution accuracy, etc., so there will always be different effects, but these are not easy in actual project development. Perception.