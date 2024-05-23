# ShapeModule

## Public properties

Property | Features
:---|:---
**position** | Relative to the location of the installed node.
**rotation** | Rotation relative to the mounted node.
**scale** | Relative to the scale of the mounted node.
**sphericalDirectionAmount** | Represents the interpolation between the current emission direction and the connection direction from the current position to the center of the node.
**randomPositionAmount** | Indicates the offset from the current launch position.

## Box

![box_emitter](particle-system/box_emitter.png)

Property | Features
:---|:---
**shapeType** | Box
**emitFrom** | From which part of the block the particles are emitted.<br>**edge**: border<br>**shell**: surface<br>**volume**: inside

## Shpere\Hemisphere

![sphere_emitter](particle-system/sphere_emitter.png)

Property | Features
:---|:---
**shapeType** | Shpere\Hemisphere
**radius** | Sphere radius
**radiusThickness** | 0 means launch from the surface of the ball<br> 1 means launch from the inside of the sphere<br>0 ~ 1 means launch from the surface to the center of the sphere

## Circle

![circle_emitter](particle-system/circle_emitter.png)

Property | Features
:---|:---
**shapeType** | Circle
**radius** | Radius of circle
**radiusThickness** | 0 means launching from the circle<br>1 means launching from inside the circle<br>0 ~ 1 means launching from the circle to the center of the circle.
**arc** | Represents emission in a sector of the circle.
**mode** | Represents the emission method of particles in the fan-shaped area, **random**: random position.<br>**loop**: cyclic emission in a certain direction, the same direction every time<br>**pingPong**: cyclic emission, every time On the contrary<br>**spread**: indicates that the particles are emitted at a certain interval, for example, 0 indicates that they can be emitted at any position, and 0.1 indicates that they are emitted every tenth of the circumference.
**speed** | Represents the speed of particles emitted along the circumference.
**spread** | It indicates where the particles are emitted in the arc when they are emitted along the circumference. For example, if arc is 120° and spread is 0.1, particles will be emitted every 12° from the arc.

## Cone

![cone_emitter](particle-system/cone_emitter.png)

Property | Features
:---|:---
**shapeType** | Cone
**angle** | Angle between cone axis and generatrix.
**radius** | Radius of the top of the cone.
**length** | The axial length of the top section of the cone from the bottom.
**radiusThickness** | 0 means launching from the circle<br>1 means launching from inside the circle<br>0 ~ 1 means launching from the circle to the center of the circle.
**arc** | Represents emission in a sector of the circle.
**mode** | Represents the emission method of particles in the fan-shaped area.<br>**random**: random position<br>**loop**: cyclic emission in a certain direction and the same direction every time<br>**pingPong**: cyclic emission, every time on the contrary<br>**spread**: indicates that the particles are emitted at a certain interval, for example, 0 indicates that they can be emitted at any position, and 0.1 indicates that they are emitted every tenth of the circumference.
**speed** | Represents the speed of particles emitted along the circumference.
**spread** | It indicates where the particles are emitted in the arc when they are emitted along the circumference. For example, if arc is 120° and spread is 0.1, particles will be emitted every 12° from the arc.
