# ParticleSystem2D Component Reference

The ParticleSystem2D component is used to read the particle asset data and perform a series of operations such as play, pause, destroy, etc. Particle assets support `plist` files and images, both of which are recommended to be placed in the same folder.

![ParticleSystem2D](./2d-particle.png)

Click the **Add Component** button at the bottom of the **Inspector** panel and select **ParticleSystem2D** from **Effects** to add the ParticleSystem2D component to the node.

For the script interface of ParticleSystem2D, please refer to [ParticleSystem API](%__APIDOC__%/en/classes/particle2d.particlesystem2d.html).

## ParticleSystem2D Properties

| Property | Description
| :-------------- | :----------- |
| CustomMaterial     | Custom material, please refer to the [Custom Material](../../ui-system/components/engine/ui-material.md) documentation.
| Color              | Color of particles.
| Preview            | Previews particles in editor mode. When enabled, particles will be played automatically in the **Scene** panel when they are selected.
| PlayOnLoad         | If this option is checked, the particles will be emitted automatically at runtime.
| AutoRemoveOnFinish | Automatically destroys the node where the particle is located when it finishes playing.
| File               | The particle configuration file in Plist format.
| Custom             | Whether to allow custom particle properties. When this property is enabled, the particle properties of the following sections can be customized.
| SpriteFrame        | Customizes the texture of particles.
| Duration           | The duration of the particle system in **seconds**, -1 means continuous emission.
| EmissionRate       | The number of particles emitted per second.
| Life               | The running time and range of particles.
| TotalParticle      | The maximum number of particles.
| StartColor         | The initial color of particles.
| EndColor           | The end color of particles.
| Angle              | The angle and range of particles.
| StartSize          | The initial size and range of particles.
| EndSize            | The end size and range of particles.
| StartSpin          | The initial spin angle and range of particles.
| EndSpin            | The end spin angle and size of particles.
| PosVar             | The range of the emitter position (horizontal and vertical).
| PositionType       | The type of particle position, including **FREE**, **RELATIVE**, **GROUPED**. For details, please refer to [PositionType API](%__APIDOC__%/en/classes/particle2d.particlesystem2d.html#positiontype).
| EmitterMode        | The type of the emitter, including **GRAVITY**, **RADIUS**. For details, please refer to [EmitterMode API](%__APIDOC__%/en/classes/particle2d.articlesystem2d.html#emittermode-1).
| Gravity            | Gravity. Only works when Emitter Mode is set to **GRAVITY**.
| Speed              | The speed and range. Only effective when Emitter Mode is set to **GRAVITY**.
| TangentialAccel    | The tangential acceleration and range of each particle i.e. the acceleration perpendicular to the direction of gravity. Effective only when Emitter Mode is set to **GRAVITY**.
| RadialAccel        | The radial acceleration and range of particles, i.e. the acceleration parallel to the gravity direction. Effective only when Emitter Mode is set to **GRAVITY**.
| RotationIsDir      | Whether the rotation of each particle is equal to its direction. Effective only when Emitter Mode is set to **GRAVITY**.
| StartRadius        | The initial radius and range, which indicates the distance of particles relative to the emitter when it is launched. Effective only when Emitter Mode is set to **RADIUS**.
| EndRadius          | The end radius and range. Valid only when Emitter Mode is set to **RADIUS**.
| RotatePerS         | The rotation angle and range of particles around the initial point per second. Only effective when Emitter Mode is set to **RADIUS**.

For more specific usage, please refer to the official [ui/25.particle](https://github.com/cocos/cocos-test-projects/tree/v3.0/assets/cases/ui/25.particle) example.
