# Glossary

In this chapter, we will collect and explain some glossaries and abbreviations in or related in Cocos Creator.

## Contact us

If you find any unexplained or poorly described glossaries, please send us feedback by clicking the "Have Feedback?" button on the right side of this page or [Get Help and Support](../getting-started/support.md).

## Editor

| Glossary | Description |
| :--- | :--- |
| Editor | Usually refers to the editor interface of Cocos Creator |
| Gizmo | Some controllers in the scene editor, such as for adjusting the position, rotation, scaling, or lighting of nodes, etc. |

## Graphs

| Glossary | Description |
| :--- | :--- |
| VB, Vertex Buffer | A vertex buffer is a set of vertices in a model, often described as an array, where each element of the array is a composite structure, including properties such as Position, Texture-coordinate, Color or Normal. |
| IB, Index Buffer | Index Buffer, which stores the indexes of the vertices in the above VB, through which the specific geometry is combined, example: If VB is { (0, 0, 0), (1, 0, 0), (1, 1, 0) }, IB is [0, 2, 1], then the vertices of the triangle are drawn as follows: { VB[0], VB[2], VB[1] } |
| FPS | Frame rate, the number of renderings per second. |
| Layer | refers to the grouping of nodes when rendering, and the [Visibility property of the camera](../editor/components/camera-component.md) can be used to handle whether certain nodes are rendered by the camera. |
| LOD | Level of details,which improves rendering efficiency by having models with different levels of details at different levels. |

### Illumination

| Glossary | Description |
| :--- | :--- |
| GI, Global Illumination | Global illumination, or local illumination, refers to a set of algorithms used in computer graphics to calculate and simulate realistic light sources |
| LDR | Low Dynamic Range Light, usually refers to the color range of a single color between [0,255] (integer) or [0,1.0] (floating point), which is the color space that most display devices can display.|
| HDR | High Dynamic Range Light refers to colors whose color gamut is outside of the color space described in the above article. The colors in the display are likely to be outside of this color range, so they need to be converted to a region recognizable by the display using **Tone Mapping** when displayed on the display device.|

## 2D/UI

| Glossary | Description |
| :--- | :--- |
| 2D Object | A 2D object created by a right-click menu within the **Hierarchy Manager**.
| UI Object | A UI object created by the **Hierarchy Manager** right-click menu, usually encapsulating some UI element for interaction |
| Sprite Atlas | [Atlas](../asset/atlas.md), which is used to improve rendering efficiency by combining some pieces into a single large image, and the engine provides [auto-atlas](../asset/auto-atlas.md) function |

## Animation

| Glossary | Description |
| :--- | :--- |
| Spine | A 2D animation software whose output animation files can be recognized by Cocos Creator | :--- | DragonBone | A 2D animation software whose output animation files can be recognized by Cocos Creator | :---
| DragonBone | A 2D animation software whose output animation files can be recognized by Cocos Creator.
| Animation | Animation, the engine's built-in animation, no skinning, support for different nodes can be created through the editor animation function, [more](../animation/index.md)
| SkeletalAnimation | SkeletalAnimation, animation component with skinning, [more](../animation/skeletal-animation.md) |
| Marionette | An animation system that supports user-defined state maps, and SkeletalAnimation for rich functionality, [more](../animation/marionette/index.md) |

## Physical

| Glossary | Description |
| :--- | :--- |
| Force | The force that allows an object to move linearly |
| Torque | the force that makes an object rotate |

### 2D Physics

| Glossary | Description |
| :--- | :--- |
| Physics backends | The type of physics engine that the engine is wrapped in, the two types of physics backends provided by Cocos Creator are **Built-In** and **Box2D** |
| Box2D | Box2D is a well-known and efficient 2D physics engine |
| Rigid bodies | Define objects with mass that can be affected by forces and velocities, and are usually of four types: kinematic, dynamic, static and animated.|
| Joint2D | Physics joints are used to describe the physical connections between objects.|
| Physical Materials | Physical materials for adjusting the handling of friction and elasticity when two physical colliding bodies collide.|

### 3D Physics

| Glossary | Description |
| :--- | :--- |
| Physics Backend | The type of physics engine that the engine encapsulates. Cocos Creator provides several physics engines including: **Built-In**, **Bullet**, **PhysX** and **cannon.js** etc., which can be modified in the project settings to adapt to different platforms and situations, **Note**: The engine unifies most of the physics engine differences. However, some physics specific are only supported in specific physics backends. |
| Rigid body | Defines an object with mass that can be affected by forces and velocities, usually of three types: kinematic, dynamic, and static. |
| Constraint | A physical constraint that describes the physical connection between objects.
| Physical materials | Adjusts the handling of frictional and elastic forces when two physical colliding objects collide. |
| Force | The force that allows the object to move linearly. |
| Torque | Torque, the force that makes the object rotate |

## Asset System

| Glossary | Description |
| :--- | :--- |
| Bundle, Asset Bundle | A way of handling resources, where the engine algorithmically combines one or more resources into a single file (usually some kind of compressed file) for efficient storage and downloading |
| Resources | A special directory that the engine packages into a special bundle, which is loaded via methods such as `Resources.load` |
| Cocos Store | Cocos' resource store, where developers can sell and buy assets, source code, or complete commercial games |

## Scripting and Programming

| Glossary | Description |
| :--- | :--- |
| Component | A script class than inherits from `cc.Component`, and can be attach to a `cc.Node`. |
| Events | Cocos Creator based on [Web Event Standard](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events) implemented as an event system for responding to hardware input or communication between nodes, [more](../engine/event/index.md). |

## Native Development

| Glossary | Description |
| :--- | :--- |
| Native | Refers to the ability provided by Cocos Creator to run on any desktop native platform or mobile native platform without relying on a browser |
| CMake | A file format or tool for organizing C++ code |

## Other Features

| Glossary | Description |
| :--- | :--- |
| XR | Extended Reality. Cocos Creator extensions adapted to OpenXR can assist you in creating added reality features, [more](../xr/index.md). |
| AR | Augmented reality. Technology that connects the virtual world with reality, you can use Cocos Creator to implement your own AR applications. [more](../xr/index.md).|
