# Legacy Shader Key Functions and Structures

## CCVertInput[^1]

- To connect with skeletal animation and data decompression processes, we provide the `CCVertInput` function, which has `general` and `standard` versions, as shown below.

  ```glsl
  // Located in ‘input.chunk’, used to handle vertex input
  #define CCVertInput(position) \
    CCDecode(position);         \
    #if CC_USE_MORPH            \
      applyMorph(position);     \
    #endif                      \
    #if CC_USE_SKINNING         \
      CCSkin(position);         \
    #endif                      \
    #pragma // 
  
  // Located in ‘input-standard.chunk’, used to handle standard vertex input
  #define CCVertInput(In) \
    CCDecode(In);         \
    #if CC_USE_MORPH      \
      applyMorph(In);     \
    #endif                \
    #if CC_USE_SKINNING   \
      CCSkin(In);         \
    #endif                \
    #pragma // 

  ```

- If you only need to get the positions, you can use the `general` version, and the code for this situation is as follows.

  ```glsl
  #include <legacy/input>
  vec4 vert () {
    vec3 position;
    CCVertInput(position);
    // ... TO DO
  }
  ```

- If you also need normals, you can use the `standard` version, as follows.

  ```glsl
  #include <legacy/input-standard>
  vec4 vert () {
    StandardVertInput In;
    CCVertInput(In);    
    // ... Now the ‘In.position’ is completely initialized, and can be used in the vertext shader
  }
  ```

In the example code above, the `StandardVertInput` object `In` returns the positions, normals, and tangents in model space, and completes the skinning calculation for the skeletal animation model.

The definition of the `StandardVertInput` structure is as follows.

```glsl
struct StandardVertInput {
  highp vec4 position;
  vec3 normal;
  vec4 tangent;
};
```

> **Note**: After including the header files, there is no need to declare these attributes anymore, such as `a_position`, `a_normal`, `a_tangent`, etc. For other vertex attributes, such as uv, etc., still need to be declared before used.

If you want to connect with the dynamic mesh batching and GPU Instancing features, you need to include the `cc-local-batch` and use the `CCGetWorldMatrix` function to get the world matrix. Here's an example.

```glsl
mat4 matWorld;
CCGetWorldMatrix(matWorld);

mat4 matWorld, matWorldIT;
CCGetWorldMatrixFull(matWorld, matWorldIT);
```

For more details, please refer to [Cocos Shader Built-in Uniforms](uniform.md)。

## CCFragOutput

Cocos Shader provides a `CCFragOutput` function to simplify the output of the fragment shader, which can be used to directly return the values needed by the fragment shader. Here is an example code.

```glsl
#include <legacy/output>
vec4 frag () {
  vec4 o = vec4(0.0);
  // ...
  return CCFragOutput(o);
}
```

The `CCFragOutput` will decide whether to perform `ToneMap` based on the pipeline type. This way, the intermediate color does not need to distinguish whether the current rendering pipeline is an HDR process.

Here is an example code.

```glsl
vec4 CCFragOutput (vec4 color) {
  #if CC_USE_HDR
    color.rgb = ACESToneMap(color.rgb);
  #endif
  color.rgb = LinearToSRGB(color.rgb);
  return color;
}
```

> **Note**：If you use the `CCFragOutput` function to output the final color of fragment shaders, the color must be converted to the `Linear` space before performing calculations. This is because the `CCFragOutput` assumes that the passed parameters are in the `Linear` space and will always call the `LinearToSRGB` function to transcode.

If you need to include standard PBR, you can use the `StandardSurface` structure together with the `CCStandardShadingBase` function to form a PBR shading process.

The content of the `StandardSurface` structure is as follows.

```glsl

struct StandardSurface {
  // albedo
  vec4 albedo;
  // these two need to be in the same coordinate system
  vec3 position;
  vec3 normal;
  // emissive
  vec3 emissive;
  // light map
  vec3 lightmap;
  float lightmap_test;
  // PBR params
  float roughness;
  float metallic;
  float occlusion;
};
```

The example code is as below.

```glsl
#include <legacy/shading-standard-base>
#include <legacy/output-standard>
void surf (out StandardSurface s) {
  // fill in your data here
}
vec4 frag () {
  StandardSurface s; surf(s);
  vec4 color = CCStandardShadingBase(s);
  return CCFragOutput(color);
}
```

You can refer to the `builtin-standard.effect` file, and use the combination of the `surf` function and the `CC_STANDARD_SURFACE_ENTRY()` macro.

The `CC_STANDARD_SURFACE_ENTRY()` is a wrapper that based on the render pipeline type, uses the `surf` function to construct a usable `main` function for the fragments. Here is an example of the code.

```glsl
CCProgram shader-fs %{
  #include <legacy/standard-surface-entry>

  void surf (out StandardSurface s) {
    // fill in your data here
  }

  CC_STANDARD_SURFACE_ENTRY()
}%
```

## StandardSurface

The `StandardSurface` is the structure of PBR material data that records the surface information required for lighting calculations. The `surf` function in Legacy Shaders is used to fill data and it will be used during the lighting phase.

```ts
struct StandardSurface {
    // albedo
    vec4 albedo;
    // these two need to be in the same coordinate system
    HIGHP_VALUE_STRUCT_DEFINE(vec3, position);
    vec3 normal;
    // emissive
    vec3 emissive;
    // light map
    vec3 lightmap;
    float lightmap_test;
    // PBR params
    float roughness;
    float metallic;
    float occlusion;
    float specularIntensity;

    #if CC_RECEIVE_SHADOW
      vec2 shadowBias;
    #endif
};
```

## ToonSurface

```ts
struct ToonSurface {
    vec4 baseColor;
    vec4 specular;
    // these two need to be in the same coordinate system
    HIGHP_VALUE_STRUCT_DEFINE(vec3, position);
    vec3 normal;
    // shading params
    vec3 shade1;
    vec3 shade2;
    vec3 emissive;
    float baseStep;
    float baseFeather;
    float shadeStep;
    float shadeFeather;
    float shadowCover;

    #if CC_RECEIVE_SHADOW
      vec2 shadowBias;
    #endif
};
```

Similar to the `StandardSurface`, the `ToonSurface` is also used for surface information, but it is a structure specifically for cartoon rendering.

[^1]: Nothing to do with shaders that are not based on Mesh rendering, such as particles, Sprite, post-process, etc.
