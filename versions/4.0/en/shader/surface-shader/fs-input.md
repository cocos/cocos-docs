# Fragment Shader Input

## Built-in Input Variables

Many parameters have been passed from Vertex Shader to Fragment Shader, listed below.

| Fragment Shader Input | Type  | Needed Macros           | Meaning               |
| --------------------- | ----- | ------------------------------ | ------------------        |
| FSInput_worldPos      | vec3  | N/A                            | World Position |
| FSInput_worldNormal   | vec3  | N/A                            | World Normal |
| FSInput_faceSideSign  | float | N/A                            | Two Side Sign be used for double-sided materials |
| FSInput_texcoord      | vec2  | N/A                            | UV0                       |
| FSInput_texcoord1     | vec2  | N/A                            | UV1                       |
| FSInput_vertexColor   | vec4  | N/A                            | Vertex Color |
| FSInput_worldTangent  | vec3  | N/A                            | World Tangent |
| FSInput_mirrorNormal  | float | N/A                            | Mirror Normal Sign|
| FSInput_localPos      | vec4  | CC_SURFACES_TRANSFER_LOCAL_POS | Local Position |
| FSInput_clipPos       | vec4  | CC_SURFACES_TRANSFER_CLIP_POS  | Clip Position |

## Macro Switch

When you need to use input parameters with macro switches, you need to enable the corresponding macros in the `macro-remapping` code section. Here's an example.

```glsl
CCProgram macro-remapping %{
    ...
    //Enable FSInput_localPos
    #define CC_SURFACES_TRANSFER_LOCAL_POS 1
    //Enable FSInput_clipPos
    #define CC_SURFACES_TRANSFER_CLIP_POS 1
    ...
}
```

## How to use

Directly call them in your shader code.

## Customize Varying Variables

When creating some special effects, the Vertex Shader must pass more information to the Fragment Shader. At this time, we need to add new varying variables.

Adding a new custom varying variable is quite simple. We will use the example of adding a new variable called `testVec3`.

First, declare a variable with an `out` tag in the Vertex Shader, as shown in the following example.

```glsl
CCProgram surface-vertex %{
    ...
    out vec3 testVec3;
    ...
}
```

Then declare a corresponding variable with an `in` tag in the Fragment Shader, as shown below.

```glsl
CCProgram surface-fragment %{
    ...
    in vec3 testVec3;
    ...
}
```

After that, you can use `testVec3` in the code of the Fragment Shader.
