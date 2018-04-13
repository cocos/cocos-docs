# Particle System component reference

## Overview

This component is used to read [Particle Resources](../asset-workflow/particle.md) data and perform a series of operations such as play, temporary, destroy, etc.


## Creation method

Editor created:

Click the **Add Component** button at the bottom of the **Properties** panel and select `Particle System` from `Add Rendering Component` to add the Particle System component to the node.

Script creation:

```js
// Create a node
var node = new cc.Node();
// And add nodes to the scene
c.director.getScene().addChild(node);
// And add particle components to Node
var particleSystem = node.adComponent(cc.ParticleSystem);
// Next you can particleSystem this object for a series of operations
```

Please refer to the script interface of the Particle System [Particle System API](../../../api/en/classes/ParticleSystem.html)。

## Particle System attribute

| Attribute |   Function Explanation
| -------------- | ----------- |
| Preview            | Play particle in edit mode.
| PlayOnLoad         | If set to true, the particle system will automatically start playing on onLoad.
| AutoRemoveOnFinish | Indicate whether the owner node will be auto-removed when it has no particles left.
| File               | The plist file.
| Custom             | If set custom to true, then use custom properties insteadof read particle file.
| Texture            | Texture of Particle System.
| Duration           | How many seconds the emitter wil run. -1 means 'forever'.
| EmissionRate       | Emission rate of the particles.
| Life               | Life of each particle setter.
| LifeVar            | Variation of life.
| ParticleCount      | Current quantity of particles that are being simulated.
| StartColor         | Start color of each particle.
| StartColorVar      | Variation of the start color.
| EndColor           | Ending color of each particle.
| EndColorVar        | Variation of the end color.
| Angle              | Angle of each particle setter.
| AngleVar           | Variation of angle of each particle setter.
| StartSize          | Start size in pixels of each particle.
| StartSizeVar       | Start size in pixels of each particle.
| EndSize            | End size in pixels of each particle.
| EndSizeVar         | Variation of end size in pixels.
| StartSpin          | Start angle of each particle.
| StartSpinVar       | Variation of start angle.
| EndSpin            | End angle of each particle.
| EndSpinVar         | Variation of end angle.
| SourcePos          | Source position of the emitter.
| PosVar             | Variation of source position.
| PositionType       | Particles movement type. [PositionType API](../../../api/en/enums/ParticleSystem.PositionType.html)
| EmitterMode        | Particles emitter modes. [EmitterMode API](../../../api/en/enums/ParticleSystem.EmitterMode.html)
| Gravity            | Gravity of the emitter. 
| Speed              | Speed of the emitter. 
| SpeedVar           | Variation of the speed. 
| TangentialAccel    | Tangential acceleration of each particle. Only available in 'Gravity' mode.
| TangentialAccelVar | Variation of the tangential acceleration. 
| RadialAccel        | Acceleration of each particle. Only available in 'Gravity' mode.
| RadialAccelVar     | Variation of the radial acceleration. 
| RotationIsDir      | Indicate whether the rotation of each particle equals to its direction. Only available in 'Gravity' mode.
| StartRadius        | Starting radius of the particles. Only available in 'Radius' mode.
| StartRadiusVar     | Variation of the starting radius.
| EndRadius          | Ending radius of the particles. Only available in 'Radius' mode.
| EndRadiusVar       | Variation of the ending radius.
| RotatePerS         | Number of degress to rotate a particle around the source pos per second. Only available in 'Radius' mode.
| RotatePerSVar      | Variation of the degress to rotate a particle around the source pos per second.
| SrcBlendFactor     | Specify the source Blend Factor. [BlendFactor API](../../../api/en/enums/BlendFactor.html)   
| DstBlendFactor     | Specify the destination Blend Factor. [BlendFactor API](../../../api/en/enums/BlendFactor.html)  

## Note

At present, due to the performance of Color rendering for each particle texture in Canvas, it is very expensive. So it is recommended that under Canvas rendering mode, the number of particles should not be too large, and try to keep it within 200, otherwise it will cause runtime very stuck.
