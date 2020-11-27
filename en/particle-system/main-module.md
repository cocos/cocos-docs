## Particle System Component
![](particle-system/main.png)

Properties | Features
--               | --
duration         | Total running time of particle system.
capacity         | The maximum number of particles that a particle system can generate.
loop             | Whether the particle system loops.
playOnAwake      | Whether the particle system automatically starts playing after loading.
prewarm          | After being selected, the particle system will start playing after one round has been played (only valid when loop playback is enabled).
simulationSpace  | Control the coordinate system where the particle coordinates are calculated.
startDelay       | Delay time of particle emission.
startLifetime    | The life cycle of particle.
startColor       | The initial color of particle.
scaleSpace       | Coordinate space for particle scaling, **local** based on local space scaling, **world** based on world space scaling.
startSize        | The initial size of particle.
startSpeed       | The initial velocity of particle.
startRotation    | The initial rotation angle of particle.
gravityModifier  | Gravity coefficient.
rateOverTime     | Number of particles emitted per second.
rateOverDistance | Number of particles emitted per moving unit distance.
bursts | Emit a given number of particles at a certain point in time
- time | How long does the particle play after it starts to emit burst.
- count | Number of particles emitted.
- repeatCount | The number of burst triggers.
- repeatInterval | The time interval of each trigger.

To use `Particle System`, please refer to the [Particle System API](https://docs.cocos.com/creator3d/api/en/classes/particle.particlesystem.html).
