# Vertex Shader Input

## Parameters

The input values for the Vertex Shader are all in the `SurfacesStandardVertexIntermediate` structure and are passed in as function parameters.

| Vertex Shader Input Values | Type | Needed Macros          | Meaning                                 |
| ------------------- | ---- | ----------------------------- | ------------------------------------ |
| position            | vec4 | N/A                           | Local position |
| normal              | vec3 | N/A                           | Local normal |
| tangent             | vec4 | CC_SURFACES_USE_TANGENT_SPACE | Local tangent and mirror normal flag |
| color               | vec4 | CC_SURFACES_USE_VERTEX_COLOR  | Vertex color|
| texCoord            | vec2 | N/A                           | UV0 |
| texCoord1           | vec2 | CC_SURFACES_USE_SECOND_UV     | UV1 |
| clipPos             | vec4 | N/A                           | Projected coordinates |
| worldPos            | vec3 | N/A                           | World position |
| worldNormal         | vec4 | N/A                           | World normal and double-sided material flag |
| worldTangent        | vec3 | CC_SURFACES_USE_TANGENT_SPACE | World tangent|
| worldBinormal       | vec3 | CC_SURFACES_USE_TANGENT_SPACE | World binormal|

## Macro Switch

When you need to use input parameters with a macro switch, you need to enable the corresponding macro in the macro-remapping code segment. The example code is as follows.

```glsl
CCProgram macro-remapping %{
    ...
    //Use the second set of UVs
    #define CC_SURFACES_USE_SECOND_UV 1
    //Use the world's binormal
    #define CC_SURFACES_USE_TANGENT_SPACE 1
    ...
}
```

## Usage Example

In any function with `SurfacesStandardVertexIntermediate` parameters, you can directly access the relevant parameters, taking the `SurfacesVertexModifyWorldPos` function as an example.

```glsl
#define CC_SURFACES_VERTEX_MODIFY_WORLD_POS
vec3 SurfacesVertexModifyWorldPos(in SurfacesStandardVertexIntermediate In)
{
    vec3 worldPos = In.worldPos;
    worldPos.x += sin(cc_time.x * worldPos.z);
    worldPos.y += cos(cc_time.x * worldPos.z);
    return worldPos;
}
```
