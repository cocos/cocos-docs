# 着色器语法

Cocos Creator 中的着色器（Cocos Effect）是一种基于 [YAML](yaml-101.md) 和 [GLSL](glsl.md) 的单源码嵌入式领域特定语言（single-source embedded domain-specific language），YAML 部分声明流程控制清单，GLSL 部分声明实际的 Shader 片段，这两部分内容相互补充，共同构成了一个完整的渲染流程描述。

> **注意**：推荐使用 Visual Studio Code 编写 Cocos Effect，并在应用商店中安装 Cocos Effect 扩展，提供编写时的语法高亮提示。
>
> ![Cocos Effect](img/vs-ext.png)

## 语法框架

**Cocos Effect** 通常由两个部分组成：

- `CCEffect`：用于声明渲染技术（Technique）、渲染过程（Pass）、渲染状态、材质参数等属性。
- `CCProgram`：用于声明顶点着色器（Vertex Shader）和片元着色器（Fragment Shader）代码片段。

此处以内置着色器 `builtin-unlit.effect` 为例，说明 Cocos Effect 的语法框架。

在 VS Code 中打开 Creator **资源管理器** 面板中 `internal -> effects -> util` 目录下的 `builtin-unlit.effect` 文件，可以看到内容如下：

![effect](img/effect.png)

### CCEffect

在 Cocos Effect 中由 `CCEffect` 包裹的部分是由 **YAML 语法** 声明的渲染流程相关的描述信息。YAML 是一门面向数据序列化且对人类书写十分友好的语言，但它引入了一些独特的语法来表示不同类型的数据，因此针对不熟悉 YAML 的开发者，我们在 [YAML 101](yaml-101.md) 一文中总结了一些常用的语法和语言特性以供参考。

`CCEffect` 的整体结构如下：

```glsl
CCEffect %{
  techniques:
  - name: tag
    passes:
    - vert: vs:entry
      frag: fs:entry
      <optional: material properties>
      <optional: pipeline states>
      <optional: one or more definitions>
    ...
  ...
}%
```

`CCEffect` 的核心内容是渲染技术（technique），一个 `CCEffect` 中支持定义多个渲染技术，但在实际渲染过程中，只有其中一个会被采用。

以上图中的无光照着色器 `builtin-unlit.effect` 为例，其中包含了专门用于渲染不透明物体的渲染技术 `opaque` 和专门用于渲染透明物体的渲染技术 `transparent`。而在实际的渲染过程中，一个渲染对象只能选择使用 `opaque` 或者 `transparent`。

每个渲染技术（technique）都包含了名称（`name`）和渲染过程（`pass`），名称用于标记渲染技术的用途，渲染过程则定义一个了完整的渲染流程所需要的全部信息。

一个渲染技术可以包含多个渲染过程，渲染过程按定义的先后顺序逐一执行。

- 一个渲染过程必须包含一个顶点着色器（Vertex Shader）和一个片元着色器（Fragment Shader），其余都是可选配置项。详情请参考 [Pass 可选配置参数](pass-parameter-list.md)。

- 顶点/片元着色器需要指定使用的 Shader（也就是用下文中介绍的 **CCProgram** 声明的着色器），以及指定着色器的入口函数。

**示例**：

```glsl
CCEffect %{
  techniques:
  - name: opaque # 定义一个不透明的渲染技术
    passes:
    - vert: vs: entry # 选择一个 CCProgram 声明的顶点着色器 ‘vs’，入口函数是 ‘entry’
      frag: fs: entry # 选择一个 CCProgram 声明的片元着色器 ‘fs’，入口函数是 ‘entry’
      properties:
        mainTexture: { value: grey } # 着色器中需要同步定义一个 ‘uniform mainTexture’，该属性可在编辑器的属性检查器中进行配置
        colorScale: { value: [1, 1, 1], target: colorScaleAndCutoff.xyz } # 基于 ‘target’ 属性配置机制，着色器中需要同步定义一个 ‘uniform colorScaleAndCutoff’，并选取它的 x、y、z 分量填充 ‘colorScale’ 设置的数据
      depthStencilState: # 配置深度测试、模板测试和写入状态
        depthTest: true
        depthWrite: true
    ...
  ...
}%
```

#### 渲染过程（Pass）可选参数

每个渲染过程都只有 `vert` 和 `frag` 两个必填参数，分别用于声明当前渲染过程使用的顶点着色器和片元着色器，格式为 `片段名: 入口函数名`。片段名可以是本文件中声明的 `CCProgram` 片段名，也可以是引擎提供的标准头文件。

> **注意**：自定义着色器的代码中不应该使用 `main` 函数，Cocos Effect 在编译时会自动添加一个 `main` 函数并调用渲染过程的入口函数（例如 `vert` 或 `frag`），`main` 函数会将入口函数的返回值作为当前 Shader 的输出（例如 `gl_Position` 或 `gl_FragColor`）。

关于其他的可选参数及默认值，详情请参考 [Pass 可选配置参数](pass-parameter-list.md)。

### CCProgram

在 Cocos Effect 中由 `CCProgram` 包裹的部分是由 **GLSL 语法** 声明的 Shader 片段。建议在编写 CCProgram 之前，先了解 [GLSL 基础语法](./glsl.md) 。

它的结构如下：

```glsl
CCProgram shader-name %{
  <required: precision settings>
  <optional: include>  
  <optional: ubo>
  <optional: custom attribute>
  <optional: >
  vec4 entry(){
    // 需要返回一个 vec4 类型数据
  }
}%
```

## 预处理宏定义

通过预处理宏，可在 Cocos Effect 编译时控制代码分支和组合，以实现高效便捷的 Shader 代码管理。

更多详细内容请参考：

- [预处理宏定义](macros.md)
- [GLSL 语法](glsl.md)

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
  #include <input>
  vec4 vert () {
    vec3 position;
    CCVertInput(position);
    // ... 对位置信息做自定义操作
  }
  ```

  如果还需要法线等信息，可使用 `standard` 版本，像下面这样写：

  ```glsl
  #include <input-standard>
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
#include <output>
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
#include <shading-standard-base>
#include <output-standard>
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
  #include <standard-surface-entry>

  void surf (out StandardSurface s) {
    // fill in your data here
  }

  CC_STANDARD_SURFACE_ENTRY()
}%
```

## 自定义几何体实例化属性

通过 **几何体实例化** 特性（GPU Geomerty Instancing）可使 GPU 批量绘制模型相同且材质相同的渲染对象。如果我们想在不打破这一特性的情况下单独修改某个对象的显示效果，就需要通过自定义几何体实例化属性。

实例化属性相关的变量声明、定义、使用，都需要依赖 `USE_INSTANCING` 预处理宏定义，否则在切换 `USE_INSTANCING` 开关时会发生编译错误。代码示例如下：

```glsl
#if USE_INSTANCING // when instancing is enabled
  #pragma format(RGBA8) // normalized unsigned byte
  in vec4 a_instanced_color;
#endif
```

> **注意**：
>- 这里的 `format` 用于指定此属性的具体数据格式，参数可以为引擎 `GFXFormat` 中的任意枚举名[^2]；如未声明则默认为 32 位 >float 类型。
>- 所有实例化属性都是从利用顶点着色器（vs）的 attribute 输入，如果要在片元着色器（fs）中使用，需要先在 vs 中声明，再传递给 fs。
>- 请确保代码在所有分支都能正常执行，无论 `USE_INSTANCING` 是否启用。

实例化属性的值在运行时会初始化为 0，可在脚本中通过 `MeshRenderer.setInstancedAttribute` 接口进行设置，示例代码如下：

```ts
const comp = node.getComponent(MeshRenderer);
comp.setInstancedAttribute('a_instanced_color', [100, 150, 200, 255]); // should match the specified format
```

> **注意**：如果在 **MeshRenderer** 组件上更换了材质，那么所有的实例化属性值都会被重置，需要重新设置。

## WebGL 1.0 向下兼容支持

由于 WebGL 1.0 仅支持 GLSL 100 标准语法，因此在 Cocos Effect 编译时会提供 GLSL 300 ES 转 GLSL 100 的向下兼容代码（fallback shader），开发者基本不需关心这层变化。

需要注意的是目前的自动向下兼容策略仅支持一些基本的格式转换，如果使用了 GLSL 300 ES 独有的函数（例如 `texelFetch`、`textureGrad`）或一些特有的扩展（`extensions`），推荐根据 `__VERSION__` 宏定义判断 GLSL 版本，自行实现更稳定精确的向下兼容，代码示例如下：

```glsl
#if __VERSION__ < 300
#ifdef GL_EXT_shader_texture_lod
  vec4 color = textureCubeLodEXT(envmap, R, roughness);
#else
  vec4 color = textureCube(envmap, R);
#endif
#else
  vec4 color = textureLod(envmap, R, roughness);
#endif
```

Cocos Effect 在编译时会解析所有已经是常量的宏控制流，生成不同版本的 GLSL Shader 代码。

## 关于 UBO 内存布局

Cocos Effect 规定，所有非 sampler 类型的 uniform 都应以 UBO（Uniform Buffer Object/Uniform Block）形式声明。

以内置着色器 `builtin-standard.effect` 为例，其 uniform block 声明如下：

```glsl
uniform Constants {
    vec4 tilingOffset;
    vec4 albedo;
    vec4 albedoScaleAndCutoff;
    vec4 pbrParams;
    vec4 miscParams;
    vec4 emissive;
    vec4 emissiveScaleParam;
  };
```

并且所有的 UBO 应当遵守以下规则：
1. 不应出现 vec3 成员；
2. 对数组类型成员，每个元素 size 不能小于 vec4；
3. 不允许任何会引入 padding 的成员声明顺序。

Cocos Effect 在编译时会对上述规则进行检查，以便在导入错误（implicit padding 相关）时及时提醒修改。

这可能听起来有些过分严格，但背后有非常务实的考量：<br>
首先，UBO 是渲染管线内要做到高效数据复用的唯一基本单位，离散声明已不是一个选项；<br>
其次，WebGL2 的 UBO 只支持 std140 布局，它遵守一套比较原始的 padding 规则[^3]：

- 所有 vec3 成员都会补齐至 vec4：

  ```glsl
  uniform ControversialType {
    vec3 v3_1; // offset 0, length 16 [IMPLICIT PADDING!]
  }; // total of 16 bytes
  ```

- 任意长度小于 vec4 类型的数组和结构体，都会将元素补齐至 vec4：

  ```glsl
  uniform ProblematicArrays {
    float f4_1[4]; // offset 0, stride 16, length 64 [IMPLICIT PADDING!]
  }; // total of 64 bytes
  ```

- 所有成员在 UBO 内的实际偏移都会按自身所占字节数对齐[^4]：

  ```glsl
  uniform IncorrectUBOOrder {
    float f1_1; // offset 0, length 4 (aligned to 4 bytes)
    vec2 v2; // offset 8, length 8 (aligned to 8 bytes) [IMPLICIT PADDING!]
    float f1_2; // offset 16, length 4 (aligned to 4 bytes)
  }; // total of 32 bytes

  uniform CorrectUBOOrder {
    float f1_1; // offset 0, length 4 (aligned to 4 bytes)
    float f1_2; // offset 4, length 4 (aligned to 4 bytes)
    vec2 v2; // offset 8, length 8 (aligned to 8 bytes)
  }; // total of 16 bytes
  ```

这意味着大量的空间浪费，且某些设备的驱动实现也并不完全符合此标准[^5]，因此目前 Cocos Effect 选择限制这部分功能的使用，以帮助排除一部分非常隐晦的运行时问题。

>**再次提醒：uniform 的类型与 inspector 的显示和运行时参数赋值时的程序接口可以不直接对应，通过 [property target](pass-parameter-list.md#Properties) 机制，可以独立编辑任意 uniform 的具体分量。**

[^1]: 不包含粒子、Sprite、后期效果等不基于 Mesh 渲染的 Shader。

[^2]: 注意 WebGL 1.0 平台下不支持整型 attributes，如项目需要发布到此平台，应使用默认浮点类型。

[^3]: [OpenGL 4.5, Section 7.6.2.2, page 137](http://www.opengl.org/registry/doc/glspec45.core.pdf#page=159)

[^4]: 注意在示例代码中，UBO IncorrectUBOOrder 的总长度为 32 字节，实际上这个数据到今天也依然是平台相关的，看起来是由于 GLSL 标准的疏忽，更多相关讨论可以参考 [这里](https://bugs.chromium.org/p/chromium/issues/detail?id=988988)。

[^5]: **Interface Block - OpenGL Wiki**：<https://www.khronos.org/opengl/wiki/Interface_Block_(GLSL)#Memory_layout>
