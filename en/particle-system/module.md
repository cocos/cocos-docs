## Introduction to particle system.

ParticleSystem stores the initial state of particle emission. After particle emission, it updates the submodule through the state.

### Particle System Module

[ParticleSystem](main-module.md)

[ShapeModule](emitter.md)

[ColorOvertimeModule](color-module.md)

[SizeOvertimeModule](size-module.md)

[RotationOvertimeModule](rotation-module.md)

[VelocityOvertimeModule](velocity-module.md)

[LimitVelocityOvertimeModule](limit-velocity-module.md)

[ForceOvertimeModule](force-module.md)

[TextureAnimationModule](texture-animation-module.md)

[Renderer](renderer.md)

[TrailModule](trail-module.md)

### Resource Culling

The modules of each particle system exist as independent objects, and each module stores some module-related data, so for the modules that are not checked for use, the recorded data is useless data. When developers do not need to dynamically open these unedited modules at runtime, they can check the DataCulling option at the bottom of the Inspector panel of ParticleSystem to remove these useless data to reduce resource consumption.
