# 传统着色器 Legacy Shader

## CCVertInput[^1]

- 为对接骨骼动画与数据解压流程，我们提供了 `CCVertInput` 工具函数，它有 `general` 和 `standard` 两个版本，内容如下：

  ```glsl
  // 位于 ‘input.chunk’ 的通用顶点着色器输入
  #define CCVertInput(position) \
    CCDecode(position);         \
    #if CC_USE_MORPH            \
      applyMorph(position);     \
    #endif                      \
    #if CC_USE_SKINNING         \
      CCSkin(position);         \
    #endif                      \
    #pragma // 空 ‘pragma’ 技巧，在编译时消除尾随分号
  
  // 位于 ‘input-standard.chunk’ 的标准顶点着色器输入
  #define CCVertInput(In) \
    CCDecode(In);         \
    #if CC_USE_MORPH      \
      applyMorph(In);     \
    #endif                \
    #if CC_USE_SKINNING   \
      CCSkin(In);         \
    #endif                \
    #pragma // 空 ‘pragma’ 技巧，在编译时消除尾随分号

  ```

- 如果只需要获取 **顶点位置信息**，可以使用 **general** 版本，那么顶点着色器函数开头的代码示例如下：

  ```glsl
  #include <legacy/input>
  vec4 vert () {
    vec3 position;
    CCVertInput(position);
    // ... 对位置信息做自定义操作
  }
  ```

  如果还需要法线等信息，可使用 `standard` 版本，像下面这样写：

  ```glsl
  #include <legacy/input-standard>
  vec4 vert () {
    StandardVertInput In;
    CCVertInput(In);
    // ... 此时 ‘In.position’ 初始化完毕，并且可以在顶点着色器中使用
  }
  ```

上面的示例代码中，`StandardVertInput` 对象 `In` 会返回模型空间的顶点位置（`position`）、法线（`normal`）和切空间（`tangent`）信息，并对骨骼动画模型做完蒙皮计算。

`StandardVertInput` 结构体的定义如下：

```glsl
struct StandardVertInput {
  highp vec4 position;
  vec3 normal;
  vec4 tangent;
};
```

> **注意**：引用头文件后，不要在 Shader 内重复声明这些 attributes（`a_position`、`a_normal`、`a_tangent` 等）。对于其他顶点数据（如 uv 等）还是需要声明 attributes 后再使用。

如果要对接引擎动态 Mesh 合批和几何体实例化（GPU Instancing），需要包含 `cc-local-batch` 头文件，通过 `CCGetWorldMatrix` 工具函数获取世界矩阵，示例如下：

```glsl
mat4 matWorld;
CCGetWorldMatrix(matWorld);

mat4 matWorld, matWorldIT;
CCGetWorldMatrixFull(matWorld, matWorldIT);
```

更多关于 Cocos Effect 内置的 uniform 内容，请参考 [Cocos Effect 内置 Uniform](uniform.md)。

## CCFragOutput

Cocos Effect 提供了 `CCFragOutput` 工具函数用以简化片元着色器的输出，可用于直接返回片元着色器所需要的值，代码示例如下：

```glsl
#include <legacy/output>
vec4 frag () {
  vec4 o = vec4(0.0);
  // ... 编写片元着实代码
  return CCFragOutput(o);
}
```

`CCFragOutput` 会根据管线状态来决定是否需要做 `ToneMap` 转码处理，这样中间的颜色计算就不必区分当前渲染管线是否为 HDR 流程。

代码示例如下：

```glsl
vec4 CCFragOutput (vec4 color) {
  #if CC_USE_HDR
    color.rgb = ACESToneMap(color.rgb);
  #endif
  color.rgb = LinearToSRGB(color.rgb);
  return color;
}
```

**特别注意**：

如果采用 `CCFragOutput` 作为片元输出，中间的颜色运算必须转到 `Linear` 空间，因为 `CCFragOutput` 认为传入的参数是在 `Linear` 空间的，总是会进行 `LinearToSRGB` 转码。

`CCFragOutput` 函数一般不需要自己实现，它只起到与渲染管线对接的作用，且对于这种含有光照计算的输出，因为计算结果已经在 HDR 范围，所以应该包含 `output-standard` 而非 `output` 头文件。

如需包含标准的 PBR 光照计算，可使用 `StandardSurface` 结构体与函数 `CCStandardShadingBase` 一起构成 PBR 着色流程。

`StandardSurface` 结构体内容如下：

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

代码示例如下：

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

也可以参考 `bultin-standard.effect` 中，使用 `surf` 函数与 `CC_STANDARD_SURFACE_ENTRY()` 宏组合。

`CC_STANDARD_SURFACE_ENTRY()` 是一个 wrapper，会根据渲染状态，利用 `surf` 函数构建出一个可用于片元的 `main` 函数，代码示例如下：

```glsl
CCProgram shader-fs %{
  #include <legacy/standard-surface-entry>

  void surf (out StandardSurface s) {
    // fill in your data here
  }

  CC_STANDARD_SURFACE_ENTRY()
}%
```

[^1]: 不包含粒子、Sprite、后期效果等不基于 Mesh 渲染的 Shader。
