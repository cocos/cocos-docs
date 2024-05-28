# Main Module (Particle System)

The particle system main module is used to store all data displayed in the **Inspector** panel, manage particle generation, playback, updates, and destroy related modules.

![main-module](main-module/main-module.png)

| Property | Description |
| :--              | :-- |
| Duration         | Total running time of the particle system. |
| Capacity         | The maximum number of particles that the particle system can generate. |
| Loop             | Whether the particle system loops. |
| PlayOnAwake      | Whether the particle system automatically starts playing after loading. |
| Prewarm          | After being selected, the particle system will start playing after one round has been played (only valid when loop playback is enabled). |
| SimulationSpace  | The coordinate system where the particle coordinates are calculated. |
| SimulationSpeed  | The update rate of the entire particle system. |
| StartDelay       | The delayed emission time of the particles after the particle system starts running. |
| StartLifetime    | The life cycle of particles. |
| StartColor       | The initial color of particles. |
| ScaleSpace       | The coordinate system in which the particle is scaled<br>**Local**: scaling based on the local coordinate system<br>**World**: scaling based on the world coordinate system<br>**Custom**: custom scaling, not affected by the node's **scale** property. |
| StartSize3D      | The initial size of the X, Y, and Z axes of particles. |
| StartSize        | The initial size of the X-axis of particles. Cannot be used with as `StartSize3D`. |
| StartSpeed       | The initial velocity of particle. |
| StartRotation3D  | The initial rotation angles of the X, Y, and Z axes of particles. |
| StartRotation    | The initial rotation angle of particles. |
| GravityModifier  | Gravity coefficient for particles affected by gravity (only CPU particles are supported). |
| RateOverTime     | Number of particles emitted per second. |
| RateOverDistance | Number of particles emitted per moving unit distance. |
| Bursts | The number of Bursts that will emit the specified number of particles at the specified time. It can be adjusted by the following properties:<br>**Time**: how long the particles play before the Burst starts to emit<br>**RepeatCount**: number of Burst triggers<br>**RepeatInterval**: time interval for each trigger<br>**Count**: number of particles fired. |
| DataCulling | Particle system asset culling, please refer to the description below for details.  |
| RenderCulling    | Particle culling, please refer to the description below for details. |

Click the ![menu button](main-module/menu-button.png) button to the right of the above property input box to open the particle curve/gradient editor and edit the particle properties, please refer to the [Particle Property Editor](./editor/index.md) documentation.

![set-pro](main-module/set-pro.png)

To use Particle System, please refer to the [Particle System API](%__APIDOC__%/en/class/ParticleSystem).

## Particle System Asset Culling

The **DataCulling** option is used to cull the asset data of useless modules in the particle system.

Each module in the particle system exists as an independent object, and each module stores some module-related data, so the data recorded for modules that are not checked for use are useless data. When the developer does not need to dynamically open these unused modules at runtime, he can check the **DataCulling** option to cull these useless data and thus reduce asset usage.

> **Note**: before v3.4 this option was **EnableCulling**, in v3.4 it was renamed to **DataCulling** to distinguish it from **RenderCulling** below. This adjustment has been done for compatibility, and it does not affect users in any way.

## Particle Culling

Starting with v3.4, a new **RenderCulling** option has been added to the particle system to enable particle culling.

If this option is enabled, the particle emitter will automatically calculate a culling box, that will be used to cull the particle emitter at runtime depending on whether the culling box is within the visible range of the camera, or not. The culling operation will be performed every frame, which is suitable for some time-consuming effects, it is not recommended to turn this feature on if the number of particles is small.

The size of the bounding box can be adjusted by using the **AabbHalf** button in the picture below. Once the adjustment is complete, click the **Regenerate bounding box** button to recalculate the bounding box.

![render culling](main-module/render-culling.png)

| Property | Description |
| :--- | :--- |
| CullingMode | The behavior of the particle emitter after it has been culled. Possible options include **Pause**, **Pause and Catchup**, **Always Simulate**. <br>**Pause**: if the particle emitter bounding box is not in the visible range of the camera, particles will pause the simulation. If it resumes visibility, particles will continue the simulation at the same time as the last pause;<br>**Pause and Catchup**: if the particle emitter bounding box is not in the visible range of the camera, particles will pause the simulation. If it resumes visibility, particles will start simulating at the current time;<br>**Always Simulate**: particles will always simulate whether or not the particle emitter box is in the camera's visible range, but it will not render when it is not in the camera's visible range. |
| AabbHalfX   | The half-width of the particle emitter bounding box. | 
| AabbHalfY   | The half-height of the particle emitter bounding box. |
| AabbHalfZ   | The half-length of the particle emitter bounding box. |
| Show Bounds | Shows the particle emitter bounding box in the **Scene** panel. |
| Regenerate bounding box| Click this button to recalculate the bounding box after it has been resized. |
