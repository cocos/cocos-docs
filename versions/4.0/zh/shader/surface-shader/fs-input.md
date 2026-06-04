# Fragment Shader 的输入值

## 内置输入列表

Vertex Shader 向 Fragment Shader 传递了许多常用变量，列表如下：

| Fragment Shader 输入值 | 类型  | 使用时需要开启的宏           | 含义               |
| --------------------- | ----- | ------------------------------ | ------------------        |
| FSInput_worldPos      | vec3  | N/A                            | World Position 世界坐标 |
| FSInput_worldNormal   | vec3  | N/A                            | World Normal 世界法线 |
| FSInput_faceSideSign  | float | N/A                            | Two Side Sign 物理正反面标记，可用于双面材质 |
| FSInput_texcoord      | vec2  | N/A                            | UV0                       |
| FSInput_texcoord1     | vec2  | N/A                            | UV1                       |
| FSInput_vertexColor   | vec4  | N/A                            | Vertex Color 顶点颜色 |
| FSInput_worldTangent  | vec3  | N/A                            | World Tangent 世界切线 |
| FSInput_mirrorNormal  | float | N/A                            | Mirror Normal Sign 镜像法线标记 |
| FSInput_localPos      | vec4  | CC_SURFACES_TRANSFER_LOCAL_POS | Local Position 局部坐标 |
| FSInput_clipPos       | vec4  | CC_SURFACES_TRANSFER_CLIP_POS  | Clip Position 投影/裁切空间坐标 |

## 宏开关

当需要使用带有宏开关的输入参数时，需要在 macro-remapping 代码段中开启相应的宏，示例代码如下：

```glsl
CCProgram macro-remapping %{
    ...
    //使用 FSInput_localPos
    #define CC_SURFACES_TRANSFER_LOCAL_POS 1
    //使用 FSInput_clipPos
    #define CC_SURFACES_TRANSFER_CLIP_POS 1
    ...
}
```

## 使用说明

在任意函数中直接调用即可。

## 自定义传递值

在制作一些特殊效果时，需要 Vertex Shader 向 Fragment Shader 传递更多信息，此时需要我们自定义传递变量。

新增一个自定义的传递变量非常简单，我们以新增一个 testVec3 为例。

首先，在 Vertex Shader 中声明一个带 out 标记的变量，示例代码如下：

```glsl
CCProgram surface-vertex %{
    ...
    out vec3 testVec3;
    ...
}
```

再在 Fragment Shader 声明对应的带 in 标记的变量即可，示例代码如下：

```glsl
CCProgram surface-fragment %{
    ...
    in vec3 testVec3;
    ...
}
```

接下来就可以在 Fragment Shader 的代码中使用 testVec3 了。
