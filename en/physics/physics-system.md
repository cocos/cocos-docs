# Physics System

The physics system is used to manage all physics related functions. Currently, it is responsible for synchronizing physical elements, triggering physics events and scheduling iterations of the physical world.

## Physics World

When the physics world iterates, physical calculations will be made on physical elements, such as calculating whether each object collides and the force of the object. When the calculation is completed, the physics system will update the physics world to the scene world, so that the game objects will generate corresponding physical behaviors.

> **Note**: there is only a single physical world, and the functional support of the multi-physics world will be discussed later.

Scene World and Physics World:

![Scene World and Physics World](img/physics-world.jpg)

## Properties

The properties of the physics system can only be set through the code for the time being. A setting panel will be added in the future, please pay attention to the update announcement.

> **Note**: gets the instance of physics system using: `PhysicsSystem.instance`

| Property | Description |
| :--- | :--- |
| **enable** | Whether to enable the physics system, the default is `true` |
| **gravity** | The gravity value of the physics world, the default is `(0, -10, 0)` |
| **allowSleep** | Whether to allow the physics system to automatically sleep, the default is `true` |
| **maxSubSteps** | The maximum number of physics simulation sub-steps per frame, the default is `2` |
| **fixedTimeStep** | The time spent in each step of physics simulation, the default is `1/60`, note that is not every frame |
| **sleepThreshold** | The default speed threshold for going to sleep, the default is `0.1` |
| **autoSimulation** | Automatic simulation, the default is `true` |
| **defaultMaterial** | Get the default physics material (read only) |
| **raycastResults** | Gets the __raycast__ test results (read only) |
| **raycastClosestResult** | Gets the __raycastClosest__ test result (read only) |
| **collisionMatrix** | Gets the collision matrix (It's used only for initialization) |

## Interfaces

| Property | Signature | Description |
| ---|---|---
| **resetAccumulator** | `(time=0)=>void` | Reset the accumulator of time to given value |
