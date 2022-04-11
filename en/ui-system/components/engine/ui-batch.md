# 2D Renderable Components Batching Guidelines

## Prerequisites

To batch render 2D renderable components, the following criteria are required:

| Prerequisite | Description |
| :-- | :--- |
| Nodes with same visibility | All nodes with renderable components are rendered in camera order, if two sibling nodes doesn't have the same visibility in one camera, they can not be batched. |
| Renderable components are using the same material | With either different effect, defines or uniform values, gpu draws cannot be batched together, so this is the first thing to guarantee for batching elements in one draw call. |
| Material instances share the same settings for `BlendState` and `DepthStencilState` | `DepthStencilState` is automatically set by the engine to perform depth & stencil writing and testing. It is primarily used to implement mask component and depth test. In short, user need to remember elements inside masks and elements outside can not be batched together. |
| Vertex data are transferred in the same **buffer** (new in v3.4.1.) | Vertex data are automatically set by the engine under most scenarios and require no manual management. |
| Textures share the same source and sampler type | Sprites and Labels are unable to be batched due to the fact that labels are using independent textures. |

## Batching Workflow Guidelines

> **Note**: Cocos Creator renders components based on the hierarchy of the **Node Tree** structure. Batching is prone to be interrupted when encountering a node that doesn't follow the same prerequisite settings with previous one, thus it starts to create a new batch using its own prerequisite settings. Users are encouraged to manage their Node Tree structure to achieve an optimized outcome.

Components that are prohibited from batching include:

- Mask
- Graphics
- UIMeshRenderer

These components are prohibited from batching due to utilization of a different material type and different data structures.

Components below are also prohibited from render batching but follows their separate internal batching mechanism:

- TiledMap
- Spine
- DragonBones

Spites and Labels are in general unable to be batched together due to different texture types, but this can be circumvented by combining textures. The following is a workaround solution to achieve the same goal:
- For sprites, combine textures with [Auto Atlas](../../../asset/auto-atlas.md) and [Dynamic Atlas](../../../advanced-topics/dynamic-atlas.md). Texture Atlases can be batched with other components as long as the prerequisites are met.
- For labels, create a bitmap cache to combine textures allowing them to be batched with sprites. However, it is ill-advised to frequently alter the content of label texts once bitmap caches are created.

It is recommended to optimize the Node Tree structure in conjunction with combing textures with Auto Atlas, Dynamic Atlas, and bitmap caches to achieve ideal batching results.

## MeshBuffer Guidelines

MeshBuffer is an internal data type used to store vertex and index data in 2D renderable components. Please be reminded that it is required for vertex data to be transferred in the same MeshBuffer for being batched successfully. The following scenarios will result in switching between MeshBuffers:

### Before v3.4.1

The total vertex number in the scene exceeds the maximum capacity of a MeshBuffer (65535).

### After v3.4.1

Render data structures are redesigned in v3.4.1. Please take note:

1. Property **BATCHER2D_MEM_INCREMENT** under **Project -> Project Settings -> Macro Configurations** indicates the maximum memory size for a MeshBuffer. Increasing the value will allow a MeshBuffer to host more data to be rendered but will also increase memory consumption.

2. **BATCHER2D_MEM_INCREMENT** is measured in **kilobytes**. Users can follow the instructions below to calculate the corresponding capacity for vertex numbers:

    Vertices in Cocos Creator are formatted as [vfmtPosUvColor](https://github.com/cocos-creator/engine/blob/v3.4.1/cocos/2d/renderer/vertex-format.ts#L43), its definitions as follows:

    ```ts
    export const vfmtPosUvColor = [
    // RGB32F represents three 32-bit float numbers.
    new Attribute(AttributeName.ATTR_POSITION, Format.RGB32F),
    // RG32F represents two 32-bit float numbers.
    new Attribute(AttributeName.ATTR_TEX_COORD, Format.RG32F),
    // RGBA32F represents four 32-bit float numbers.
    new Attribute(AttributeName.ATTR_COLOR, Format.RGBA32F),
    ];
    ```

    It can be inferred that a vertex takes 9 `float` numbers, which in memory space equates to: `1 * 9 * 4 / 1024 (KB)`, specifically:

      - **1** is the number of vertices

      - **9** is the number of `floats` defined in each `vfmtPosUvColor`

      - **4** is the bytes occupied by each `float`

      - **1024** is the transference rate from bytes to kilobytes

    The default value for **BATCHER2D_MEM_INCREMENT** is 144KB with a capacity of `144 * 1024 / (9 * 4）= 4096` vertices.

    Please note that the maximum capacity for a MeshBuffer is **65535**. In other words, the maximum value for **BATCHER2D_MEM_INCREMENT** is `65535 * 9 * 4 / 1024 ≈ 2303.96` kilobytes.

3. The core mechanism for 2D rendering is **static vertex buffer**, specifically:

    - **Static vertex buffer** presides over the whole lifespan of components while index buffer is filled on a per frame basis and does not implement memory caches in any form. Due to the volume of data in vertex buffer, it is advisable to store it separately to give access to specific memory segments while avoiding unnecessary updates.

    - Index buffer has a simpler data structure and lighter data volume compared to vertex buffer. Updating at each frame, index buffer defines the order for vertices to be rendered and takes an insignificant amount of processing power, requiring no sophisticated memory management.

    - Due to vertex buffer being static, it is advisable to preload vertex buffer at the very beginning of the component's lifespan. At loading, component will request relevant vertex buffers from MeshBuffer and returns them at destruction.

    - When MeshBuffer is unable to provide the vertex buffer requested by the component, the engine will create a new MeshBuffer allocated with the amount of memory space as indicated in **BATCHER2D_MEM_INCREMENT** so that vertex buffer can be successfully distributed.
