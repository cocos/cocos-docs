# Surface Shader Overview

A typical Surface Shader usually consists of four main parts.

1. CCEffect
2. Shared UBO
3. Macro Remapping
4. Surface Functions
5. Shader Assembly: Assemble the above four parts with built-in Surface Shader functions.

## 1. CCEffect

CCEffect is used to describe the techniques, passes, properties, and render states of the Surface Shader. The material will generate default values and display them on the material panel according to the content in CCEffect.

For more details, please refer to [Cocos Shader Syntax](../effect-syntax.md)。

## 2. Shared UBO

The shared UBO gathers all the uniforms needed for all passes, simplifying shader writing.

It is optional, but it is recommended for complex shaders. Here is an example from the built-in Surface Shader.

```glsl
CCProgram shared-ubos %{
    uniform Constants {
        vec4 titlingOffset;
        ...
    }
}%
```

> **Note**: It doesn't necessarily have to be called `shared-ubos` and `Constants`, as long as it's easy to be remembered.

## 3. Macro Remapping

Surface Shader provides a large number of built-in macros. These macros are not displayed on the panel by default. If you want these macros to be displayed on the panel, you need to remap them.

In addition, you can put some macros in this section for easy management. Here is an example of a built-in Surface Shader.

```glsl
CCProgram macro-remapping %{
    // ui displayed macros
    #pragma define-meta HAS_SECOND_UV
    #pragma define-meta USE_TWOSIDE
    ...
    #define CC_SURFACES_USE_SECOND_UV HAS_SECOND_UV
    #define CC_SURFACES_USE_TWO_SIDED USE_TWOSIDE
}%
```

For more details, please refer to [Macro Definition and Remapping](./macro-remapping.md).

> **Note**: It doesn't necessarily have to be called `macro-remapping`, as long as it's easy to be remembered.

## 4. Surface Functions

Surface Shader unifies the render process while also exposing many functions for users to customize render effects.

For ease to management, we usually need to declare at least two CCProgram code segments for vs and fs.

Take the built-in Surface Shader as an example.

```glsl
CCProgram surface-vertex %{
    ...
}%

CCProgram surface-fragment %{
    ...
}%
```

`surface-vertex` is used to organize vs related processing functions, while `surface-fragment` is used for fs.

In these two segments, you can use macros to replace the internal functions, you can also add your own vs and fs inputs.

For more details, please refer to [Replacement Function Using Marcos](./function-replace.md), [Vertex Shader Inputs](./vs-input.md) and [Fragment Shader Inputs](./fs-input.md)。

## 5. Shader Assembly

In Surface Shader, the last part is the assembly of the shader.

Let's take the built-in Surface Shader as an example.

```glsl
CCProgram standard-vs %{
    ...
}%

CCProgram shadow-caster-vs %{
    ...
}%

CCProgram standard-fs %{
    ...
}%

CCProgram shadow-caster-fs %{
    ...
}%
```

It's worth noting that the code segments of the above three parts(Shared UBO, Marco Remapping and Surface Functions) can have zero or multiple. Finally, the final shader is assembled as needed and referenced in the CCEffect.

For more details, please refer to [Surface Shader Assembly](./shader-assembly.md)。
