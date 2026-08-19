# Surface Material Data Structure

## What's SurfaceMaterialData

In Surface Shader, according to the needs of different [Lighting Models](./lighting-mode.md), the corresponding surface material data structure `SurfaceMaterialData` is provided.

The surface material data structure defines a series of physical parameters used to calculate the final color of the object's surface, such as albedo, roughness, etc.

> **Note**: The material data model must be used in conjunction with the lighting model.

## Type of Surface Material Data

| Material Data Type | Description                                                         |
| ------------ | ------------------------------------------------------------ |
| standard     | Standard PBR material described by roughness and metallic, similar to material nodes in software like SP, Blender, Maya. |
| toon         | Simple cartoon material with various shading methods. |

## How to use

The corresponding surface material data structures are stored in the **internal/chunks/data-structures/** folder.

You only need to include the corresponding surface material data structure header file to use different categories of data structures.

```glsl
//PBR Surface Material
#include <surfaces/data-structures/standard>
// toon Surface Material
//#include <surfaces/data-structures/toon> 
#define CC_SURFACES_FRAGMENT_MODIFY_SHARED_DATA
void SurfacesFragmentModifySharedData(inout SurfacesMaterialData surfaceData)
{
    // set user-defined data to surfaceData
}
```
