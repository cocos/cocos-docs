# Texture Animation Module

The texture animation module is used to animate the texture specified by the **ParticleMaterial** property in the [Particle Renderer](./renderer.md) with the texture specified by the **ParticleMaterial** property as an animation frame to achieve an effect similar to the one in the following figure.

![texture_animation](particle-system/texture_animation.gif)

## Properties

![texture_animation](particle-system/texture_animation.png)

| 属性 | 说明 |
| :--- | :--- |
| **Mode** | Set the type of particle animation mapping, currently only **Grid** (grid) mode is supported. A texture contains one animation frame for particle playback.
| **NumTilesX** | The number of maps divided by the texture in the horizontal (X) direction.
| **NumTilesY** | The number of maps in the vertical (Y) direction of the texture.
| **Animation** | Animation playback methods, including:<br> **WholeSheet**: play all frames in the mapping;<br> **SingleRow**: play only one of the rows, the first row by default. Can be used with **RandomRow** and **RowIndex** properties.
| **RandomRow** | Select a random row from the animation map to play the animation frames.<br>This item only takes effect when **Animation** is set to **SingleRow**.
| **RowIndex** | Select a specific row from the animation map to play the animation frames.<br>This item only takes effect when **Animation** is set to **SingleRow** and **RandomRow** is disabled.
| **FrameOverTime** | Set the animation playback speed.<br>When clicking the ![menu button](main-module/menu-button.png) button to the right of the input box to switch to using curve editing, it indicates the frame vs. time change curve of the animation playing in one cycle.
| **StartFrame** | Specifies the frame at which the animation starts to play throughout the life of the particle system.
| **CycleCount** | The number of times the animation frame will be repeated during the particle lifetime.