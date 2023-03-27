# Verex Shader 的输入值

## 参数列表

Vertex Shader 输入值都在 `SurfacesStandardVertexIntermediate` 结构体中，作为函数参数传入。

| Vertex Shader 输入值 | 类型 | 使用时需要开启的宏          | 含义                                 |
| ------------------- | ---- | ----------------------------- | ------------------------------------ |
| position            | vec4 | N/A                           | 本地坐标 |
| normal              | vec3 | N/A                           | 本地法线 |
| tangent             | vec4 | CC_SURFACES_USE_TANGENT_SPACE | 本地切线和镜像法线标记|
| color               | vec4 | CC_SURFACES_USE_VERTEX_COLOR  | 顶点颜色|
| texCoord            | vec2 | N/A                           | UV0 |
| texCoord1           | vec2 | CC_SURFACES_USE_SECOND_UV     | UV1 |
| clipPos             | vec4 | N/A                           | 投影坐标 |
| worldPos            | vec3 | N/A                           | 世界坐标 |
| worldNormal         | vec4 | N/A                           | 世界法线和双面材质标记|
| worldTangent        | vec3 | CC_SURFACES_USE_TANGENT_SPACE | 世界切线|
| worldBinormal       | vec3 | CC_SURFACES_USE_TANGENT_SPACE | 世界副法线|

## 宏开关

当需要使用带有宏开关的输入参数时，需要在 macro-remapping 代码段中开启相应的宏，示例代码如下：

```glsl
CCProgram macro-remapping %{
    ...
    //使用第二套 UV
    #define CC_SURFACES_USE_SECOND_UV 1
    //使用世界副法线
    #define CC_SURFACES_USE_TANGENT_SPACE 1
    ...
}
```

## 使用示例

在任何带 SurfacesStandardVertexIntermediate 参数的函数中，都可以直接访问到相关参数，以 SurfacesVertexModifyWorldPos 函数为例：

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
