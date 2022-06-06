# Choosing The Physics System Suitable For Your Project

In the panel __Project -> Project Settings -> Feature Cropping -> Physics System__ of the Editor, you can choose a physics engine suitable for the needs of the project for development. The default physics engine is __bullet (ammo.js)__, which can be switched at will during the development process.

![Physics Engine Options](img/physics-module.jpg)

If there are no need to use any physically related components and interfaces, uncheck the __Physics System__ checkbox to make the package size smaller when publishing. But note that if the checkbox is unchecked, the project cannot use physically related components and interfaces, otherwise an error will be reported at runtime.

## Collision Detection: builtin

__builtin__ only has the function of collision detection. Compared with other physics engines, it has no complicated physical simulation calculations. If your project does not require the physical simulation of this part, you can consider using __builtin__, which will make the size of game's package smaller.

If you use __builtin__ for development, please note the following:

- __builtin__ only has events of type __trigger__.
- __isTrigger__ in __Collider__ component is a trigger regardless of whether the value is true or false.

## Physics Engine: cannon.js

[cannon.js](https://github.com/cocos-creator/cocos-cannon.js) is an open source physics engine, which uses js language to develop and implement more comprehensive physics functions, if your project needs more complex physical functions, then you can consider using [cannon.js](https://github.com/cocos-creator/cocos-cannon.js). The size of the __cannon.js__ module is __141KB__.

## Physics Engine: bullet (ammo.js)

[ammo.js](https://github.com/cocos-creator/cocos-ammo.js) is the __asm.js__/__wasm__ Version of the [bullet](https://github.com/bulletphysics/bullet3) physics engine, it is compiled by [emscripten](https://github.com/emscripten-core/emscripten) tool. Bullet has perfect physical functions, and we will put more work here in the future.

It should be noted that currently the __ammo.js__ module has a size of about __1.5MB__.

## Physics Engine: PhysX

**PhysX**（[GitHub](https://github.com/NVIDIAGameWorks/PhysX)）is an open source real-time commercial physics engine developed by Nvidia. It has perfect functional characteristics and extremely high stability, as well as excellent performance.

**PhysX** currently supported in Cocos Creator is v4.1, which is only allowed to be used on most native platforms. In addition, since PhysX does not support the Android x86 platform, it cannot run normally on this platform. At the same time, some newer platform devices, such as Apple M1 chip devices, will be supported in the future.

Currently in the v3.1, previewing and publishing to the H5 environment are not yet supported. The preview needs to be supported by modifying the preview template. For specific modifications, please refer to the [sample project](https://github.com/cocos-creator/example-3d/tree/v3.1/physics-3d). The above functions are expected to be improved in the v3.2.

When publishing to the native platform, it is strongly recommended to use this physics engine, to get good performance, especially the native application of the iOS system.

## Do Not Use Physics

If you don't need to use any physics related components and interfaces, you can uncheck the yellow box, so that you can get a smaller package when publishing.

> **Note**: if it is unchecked, the project will not be able to use physics related components and interfaces, otherwise an error will be reported during runtime.

<!-- ## Expand the physical backend -->
