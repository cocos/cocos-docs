## Texture Animation Module

![texture_animation](particle-system/texture_animation.png)

Property | Role
---|---
**mode** | A grid texture contains an animation frame for particle playback.
**numTilesX** | The number of animation frames in the x direction.
**numTilesY** | The number of animation frames in the y direction.
**animation** | WholeSheet plays all the frames in the texture, singleRow only plays one row.
**frameOverTime** | The frame of animation playing in a cycle and the curve of time change.
**startFrame** | Play from the first few frames, the time is the life cycle of the entire particle system.
**cycleCount** | The number of playback cycles in a life cycle.

![texture_animation](particle-system/texture_animation.gif)