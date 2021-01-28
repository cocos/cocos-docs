## Trail Module

![trail_module](particle-system/trail_module.png)

Property | Role
---|---
**mode** | Particle forms a trailing effect on each particle's trajectory.
**LifeTime** | The life cycle of trail.
**MinParticleDistance** | The shortest distance traveled by the particle for each trailing node.
**Space** | The coordinate system where the tail is located, World runs in the world coordinate system, and Local runs in the local coordinate system.
**ExistWithParticles** | Whether the tail disappears with the particles.
**TextureMode** | The expanded form of the texture on the tail, the Stretch texture is overlaid on the entire tail, and the Repeat texture is overlaid on the tail.
**WidthFromParticle** | The trai width inherited from the particle size.
**WidthRatio** | Trail width, if it is inherited from particle, it is the ratio of particle size
**ColorFromParticle** | Whether the trail color is inherited from the particles.
**ColorOverTrail** | The color of the trail color changes gradually with the length of the trailing itself.
**ColorOvertime** | Color gradient of trail color over time.

![trail](particle-system/trail.gif)