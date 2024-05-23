# Introduction to GLSL Basic

GLSL is a language for writing shaders tailored for graphics computing, and it includes features for vector and matrix operations that make rendering pipelines programmable. This chapter mainly introduces some syntax commonly used in Shader writing, including the following aspects:

- Variable
- Statement
- Qualifier
- Preprocessor macro definition

## Variable

### Variables and Variable Types

| Variable type | Description | Default values in Cocos Effect | Options in Cocos Effect |
| :-- | :-- | :-- | :-- |
| bool | boolean | false |  |
| int/ivec2/ivec3/ivec4 | contains 1/2/3/4 integer vectors | 0/[0, 0]/[0, 0, 0]/[0, 0, 0, 0] | |
| float/vec2/vec3/vec4 | Contains 1, 2, 3, 4 float vectors | 0/[0, 0]/[0, 0, 0]/[0, 0, 0, 0] | |
| sampler2D | a 2D texture | **default** | black、grey、white、normal、default |
| samplerCube | a Cube texture | **default-cube** | black-cube、white-cube、default-cube |
| mat[2..3] | Representing 2x2 and 3x3 matrices | unavailable |
| mat4 | Represents a 4x4 matrix | [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] |

### Scalar

The way to construct a scalar is the same as the C language:

```glsl
float floatValue = 1.0;
bool booleanValue = false;
```

### Vector

The rules for constructing a vector are as follows:

- If a scalar is provided to the vector constructor, all values of the vector are set to the scalar value.
- If multiple scalar values or vectors are provided, the provided values are assigned from left to right, provided that the sum of the number of scalars or vectors is equal to the number of vector constructors.

```glsl
vec4 myVec4 = vec4(1.0);              // myVec4 = {1.0, 1.0, 1.0, 1.0}
vec2 myVec2 = vec2(0.5, 0.5);         // myVec2 = {0.5, 0.5}
vec4 newVec4 = vec4(1.0, 1.0, myVec2);// newVec4 = {1.0, 1.0, 0.5, 0.5} 
```

Vectors can be accessed via `r, g, b, a` or `x, y, z, w`, and multiple indices can be accessed simultaneously:

```glsl
vec4 myVec4_0 = vec4(1.0); // myVec4_0 = { 1.0, 1.0, 1.0, 1.0 }
vec4 myVec4 = vec4(1.0, 2.0, 3.0, 4.0); // myVec4 = { 1.0, 2.0, 3.0, 4.0 }
float x = myVec4.x;       // x = 1.0;
vec3 myVec3_0 = myVec4.xyz; // myVec3_0 = { 1.0, 2.0, 3.0 }
vec3 myVec3_1 = myVec4.rgb; // myVec3_1 = { 1.0, 2.0, 3.0 }
vec3 myVec3_2 = myVec4.zyx; // myVec3_2 = { 3.0, 2.0, 1.0 }
vec3 myVec3_3 = myVec4.xxx; // myVec3_3 = { 1.0, 1.0, 1.0 }
```

### matrix

In GLSL, mat[2..4] can be constructed to represent matrices of order 2 to 4.

The matrix construction has the following rules:

- If only a scalar is provided to the matrix constructor, this value constructs the values on the diagonal of the matrix
- Matrices can be constructed from multiple vectors
- Matrices can be constructed from a single scalar from left to right

```glsl

mat4 matrix4x4 = mat4(1.0); // matrix4x4 = { 1.0, 0.0, 0.0, 0.0, 
                            //                0.0, 1.0, 0.0, 0.0 
                            //                0.0, 0.0, 1.0, 0.0                    
                            //                0.0, 0.0, 0.0, 1.0 }

vec2 col1 = vec2(1.0, 0.0);
vec2 col2 = vec2(1.0, 0.0);

mat2 matrix2x2 = mat2(coll1, col2);

// GLSL is a column-matrix store, so when constructed, the constructor fills in column order
mat3 matrix3x3 = mat3(0.0, 0.0, 0.0,   // Column 0
                      0.0, 0.0, 0.0,   // Column 1
                      0.0, 0.0, 0.0);  // Column 2
```

> **Note**: In order to avoid **implicit padding**, the engine stipulates that if you want to use the matrix with the Uniform qualifier, it must be a matrix4x4, and the matrix of order 2 and 3 cannot be used as a Uniform variable.

#### Access to the matrix

Matrix can access different columns by index:

```glsl
mat2 matrix2x2 = mat2(0.0, 0.0, 0.0, 0.0);
vec4 myVec4 = vec4(matrix2x2[0], matrix2x2[1]);
vec2 myVec2 = matrix2x2[0];

// Access the first element of the first column
float value = matrix2x2[0][0];
matrix2x2[1][1] = 2.0;
```

### Structure

The formation of structure is similar to that of C language, and it can be aggregated from different data types:

```c
struct myStruct
{
  vec4 position;
  vec4 color;
  vec2 uv;
};
```

An example of code to construct a structure is as follows:

```glsl
myStruct structVar = myStruct(vec4(0.0, 0.0,0.0,0.0), vec4(1.0, 1.0, 1.0, 1.0), vec2(0.5, 0.5));
```

Structs support assignment (=) and comparison (==, !=) operators, but require that both structs have the same type and must be the same component-wise.

### Array

Array usage is similar to C language, the rules are as follows:

- Arrays must have a declared length
- Array cannot be initialized at the same time as declaration
- Arrays must be initialized by constant expressions
- Arrays cannot be decorated with `const`
- Multidimensional arrays are not supported

An example of code for array declaration and initialization is as follows:

```glsl
float array[4];
for(int i =0; i < 4; i ++)
{
    array[i] = 0.0;
}
```

## Statement

### Control flow

GLSL supports standard C/C++ control flow, including:
- `if-else`/`switch-case`
- `for`/`while`/`do-while`
- `break`/`continue`/`return`
- There is no `goto`, use `discard` to jump out. This statement is only valid under the fragment shader. It should be noted that using this statement will cause the pipeline to discard the current fragment and will not write to the frame buffer.

The usage of `if-else` is consistent with the C language, the code example is as follows:

```glsl
if(v_uvMode >= 3.0) {
    i.uv = v_uv0 * v_uvSizeOffset.xy + v_uvSizeOffset.zw;
} else if (v_uvMode >= 2.0) {
  i.uv = fract(v_uv0) * v_uvSizeOffset.xy + v_uvSizeOffset.zw;
} else if (v_uvMode >= 1.0) {
  i.uv = evalSlicedUV(v_uv0) * v_uvSizeOffset.xy + v_uvSizeOffset.zw;
} else {
  i.uv = v_uv0;
}
```

In GLSL, loop must be constant or known at compile time. The code example is as follows:

 ```glsl
const float value = 10.; 
for(float i = 0.0; i < value; i ++){ 
    ...
}
 ```

Error example:

```glsl
float value = 10.;  
// Error, value is not a constant
for(float i =0.0; i < value; i ++){  
    ...
}
```

### Function

A GLSL function consists of **return value**, **function name** and **parameter**, where the return value and function name are required. If there is no return value, you need to use `void` instead.

> **Note**: GLSL functions cannot be recursive.

The code example is as follows:

```glsl
void scaleMatrix (inout mat4 m, float s){
  m[0].xyz *= s;
  m[1].xyz *= s;
  m[2].xyz *= s;
}
```

## Qualifier

### Storage qualifier

Storage qualifiers are used to describe the role of variables in the pipeline.

| Qualifier | Description |
|:--|:--|
|< none:default > | Unqualified or using `default`, common local variables, function parameters |
| const | Compile-time constant or read-only as parameter |
| attribute | Communication between application and vertex shader to determine vertex format |
| uniform | Data is exchanged between applications and shaders. Consistent in vertex shaders and fragment shaders |
| varying | Interpolation passed from the vertex shader to the fragment shader |

#### Uniform

`Uniform` declared within a render pass cannot be repeated. For example, if the variable `variableA` is defined in the vertex shader, `variableA` will also exist in the fragment shader with the same value, then `variableA` cannot be defined again in the fragment shader.

Engine does not support discretely declared `uniform` variables. Uniforms must be declared in UBOs, and UBOs must be memory aligned to avoid implicit padding.

#### Varying

`varying` is the variable output by the vertex shader and passed to the fragment shader. Under the action of the pipeline, the variable value will not be consistent with the output of the vertex shader, but will be interpolated by the pipeline, which may cause the normal of the vertex output to not be normalized. At this point, manual normalization is required. The code example is as follows:

```glsl
// normalized the normal from vertex shader
vec3 normal = normalize(v_normal);
```

### Parameter qualifier

Parameter qualifiers for functions in GLSL include the following:

| qualifier | description |
|:---|:---|
| < none:in > | The default qualifier, similar to the value passing in the C language, indicates that the passed parameter is a value, and the passed value will not be modified in the function |
| inout | Similar to the reference in the C language, the value of the parameter is passed into the function and the value modified in the function is returned |
| out | The value of the parameter will not be passed into the function, it will be modified inside the function and the modified value will be returned |

### Precision qualifier

GLSL introduces precision qualifiers for specifying the precision of integer or floating point variables. Precision qualifiers allow shader writers to explicitly define the precision with which shader variables are computed.

The precision declared in the Shader header applies to the entire Shader, and is the default precision for all floating-point-based variables, and it is also possible to define the precision of a single variable. If no default precision is specified in Shader, all integer and floating point variables are calculated with high precision.

The precision qualifiers supported by GLSL include the following:

| qualifier | description |
|:--|:--|
|highp | High precision. <br>The precision range of floating point type is [-2<sup>62</sup>, 2<sup>62</sup>]<br>The precision range of integer type is [-2<sup>16</sup> , 2<sup>16</sup>].|
|mediump | Medium precision. <br>The precision range of floating point type is [-2<sup>14</sup>, 2<sup>14</sup>]<br>The precision range of integer type is [-2<sup>10</sup> , 2<sup>10</sup>]. |
|lowp | Low accuracy. <br>The precision range of floating point type is [-2<sup>8</sup>, 2<sup>8</sup>]<br>The precision range of integer type is [-2<sup>8</sup> , 2<sup>8</sup>].|

The code example is as follows:

```glsl
highp mat4 cc_matWorld;
mediump vec2 dir;
lowp vec4 cc_shadowColor;
```

## Preprocessor macro definition

GLSL allows the definition of macros similar to the C language.

Preprocessing macro definitions allow shaders to define a variety of dynamic branches that determine the final rendering effect.

An example of code defined using preprocessor macros in GLSL is as follows:

```glsl
#define
#undef
#if
#ifdef

#ifndef
#else
#elif
#endif
```

The following code example declares a four-dimensional vector named `v_color` only if the `USE_VERTEX_COLOR` condition is true:

```glsl
#if USE_VERTEX_COLOR
  in vec4 v_color;
#endif
```

For the interactive part of the preprocessing macro definition and the engine, please refer to: [Preprocessing Macro Definition](macros.md)

> **Note**: In the engine, the preprocessing macro definition of the material cannot be modified after the material is initialized. If modifications are required, use the `Material.initialize` or `Material.reset` methods. For code examples, please refer to: [Programmatic use of materials](../material-system/material-script.md)
