# 内置 Surface Shader 导读

Cocos Creator 3.7.2 版本开始， builtin-standard.effect 使用 Surface Shader 架构实现。

本文以 buitlin-standard.effect 作为典型案例，讲解 Surface Shader 结构与实现。

你可以属性 Surface Shader 结构定义、语法细节以及渲染流程。

下面的内容，建议配合 internal/effects/builtin-standard.effect 一起阅读。

## 基本结构

Surface Shader 代码通常由几个部分组成：
- 信息描述（CCEffect）：描述此 Shader 的技术、渲染过程组成部分，以及每个渲染过程使用的 Shader、渲染状态、属性等。
- 共享常量（`Shared UBOs`）：把 vs 和 fs 都需要用到的 uniforms 定义在一起，方便管理。
- 宏映射（`Macro Remapping`）：处理一些宏定义，以及映射一些内部宏，使其可以显示到材质面板上。
- 函数（`Surface Functions`）：用于声明表面材质信息相关的 Surface 函数。
- 组装器（`Shader Assembly`）：用于组装每个顶点着色器（Vertex Shader）和片元着色器（Fragment Shader）的代码模块。

可前往 [Surface Shader 基本结构](./surface-shader-structure.md) 了解更多详情。

## CCEffect

一个物体被渲染到屏幕上，需要以下信息：
- 模型数据（顶点、UV、法线等）
- 光照信息
- 世界空间（旋转、平移、缩放）信息
- 绘制过程（材质）
- 渲染状态（材质）
- 纹理（材质）
- Uniform（材质）
- Shader 代码（材质）

其中模型数据、光照信息、世界空间信息与材质无关，而 纹理、Uniform、渲染状态、Shader 代码、绘制过程 则属于材质信息。

CCEffect 则描述了以上材质相关信息，并且与引擎渲染管线共同完成一个模型的渲染流程。

### 渲染技术（technique）

内置的 Surface Shader 实现了 `opaque` 和 `transparent` 两种渲染技术，前者用于渲染非透明物体，后者用于渲染半透明物体。

### 渲染过程（passes）

内置的 Surface Shader 的每一个技术，只有一个 pass，且均为 PBR。

抛开其余细节，我们可以看到整个 Surface Shader 的信息描述如下：

```
CCEffect %{
  techniques:
  - name: opaque
    passes:
    - vert: standard-vs
      frag: standard-fs
      properties: &props
        ...

  - name: transparent
    passes:
    - vert: standard-vs
      frag: standard-fs
      ...
      properties: *props
}%
```

### Shader 入口（vert 与 frag）

`opaque` 和 `transparent` 在渲染效果上完全一致，差异仅仅是渲染状态。

可以看到，它们使用同样的 vert 和 frag 入口。

```glsl
- vert: standard-vs
  frag: standard-fs
```

### 属性（properties）

由于 `opaque` 和 `transparent` 在渲染效果上完全一致，Shader 代码也是用的同一样，所以涉及到的属性也就完全一玩笑。

所有渲染过程中用到的属性集中放在了 properties 字段里。关于属性的语法，可以查看 [Pass 可选配置参数](./../pass-parameter-list.md)

### 配置复用

在属性配置中，可以看到， opaque 的属性定义为 `properties: &props`，而 `transparent` 的属性定义为 `properties: *props`。

这是一个属性命名和复用机制。

`properties: &props` 的含义是为当前 `properties` 起名为 `props`。

`properties: *props` 的含义是使用名为 `props`  的属性块填充当前 `properties`。

上面的配置结果为：`transparent` 直接使用 `opaque` 的 `properties` 字段。

### 用于特定阶段（phase）

默认情况下， Surface Shader 会参与到场景渲染阶段。 但也有一些特殊的场合，比如 阴影，反射探针烘焙 等。

针对这类需求，我们可以添加特定的渲染过程（pass），并标记参与的阶段（phase）来实现目的。

当 Cocos 引擎的渲染器在执行渲染时，会获取到材质中相应 phase 的 pass，用于渲染。 如果没有，表示此物体不参与这个阶段。

如 Surface Shader 中的：
- forward-add：用于附加光照阶段，当物体受主光源以外的光源影响时，会调用这个。
- shadow-caster：用于阴影图渲染阶段
- reflect-map：用于环境反射探针烘焙阶段

```ts
- &forward-add
    vert: standard-vs
    frag: standard-fs
    phase: forward-add
    ...
- &shadow-caster
    vert: shadow-caster-vs
    frag: shadow-caster-fs
    phase: shadow-caster
    ...
- &reflect-map
    vert: standard-vs
    frag: reflect-map-fs
    phase: reflect-map
    ...
```

如上面代码所示，phase 用于标记此 pass 的参与阶段。 而 `&forward-add`，`&shadow-caster`，`&reflect-map` 则是给这个 pass 起了一个名字，方便后面的技术对它进行复用。

比如，`transparent` 就直接复用了 `opaque` 的 `forward-add` 和 `shadow-caster` pass。

```ts
- name: transparent
    passes:
    - vert: standard-vs
        frag: standard-fs
        ...
        properties: *props
    - *forward-add
    - *shadow-caster
```

### 渲染状态

如开头所说，为了完成一个模型的渲染，除了定义好渲染过程，所需要的属性以外，还需要配合渲染状态。

渲染状态主要涉及 模板测试、深度测试、光栅器状态、透明混合等。

同样的渲染流程、属性、Shader 代码，配合不同的渲染状态，就可以实现不同的效果。

```ts
//深度、模板测试
depthStencilState:
    depthFunc: equal
    depthTest: true
    depthWrite: false

//透明混合状态
blendState:
    targets:
    - blend: true
        blendSrc: one
        blendDst: one
        blendSrcAlpha: zero
        blendDstAlpha: one
//光栅器状态
rasterizerState:
    cullMode: front
```

渲染状态会有一套默认值，在有需要的时候进行修改即可。

比如 `opaque` 与 `transparent` 就只有渲染状态的区别。

### 内嵌宏

```ts
    embeddedMacros: { CC_FORCE_FORWARD_SHADING: true }
```

有时候，我们想为某个pass单独开启或者关闭一些宏，可以使用 `embeddedMacros` 字段进行。

## 代码引用机制

Surface Shader 提供了两种代码块引用机制：头文件和CCProgram。详情请查看 [include 机制](./includes.md)。

## 共享常量

许多常量是 vs 和 fs 都会用到的，或者多个 technique 和 pass 都需要用到的，定义在一起方便管理。

共享常量本质上还是属于 Shader 代码片段，使用 GLSL 来编写。

```ts
CCProgram shared-ubos %{
  uniform Constants {
    vec4 tilingOffset;
    vec4 albedo;
    vec4 albedoScaleAndCutoff;
    vec4 pbrParams;
    vec4 emissive;
    vec4 emissiveScaleParam;
    vec4 anisotropyParam;
  };
}%
```

在后面的组装环节，只需要 `#include <shared-ubos>` 即可。

## 宏映射

关于宏映射详细信息，请参考 [宏定义与重映射](./macro-remapping.md)。

在 内置的 Surface Shader 中，使用 `CCProgram macro-remapping` 片段来组织所的宏映射工作，方便管理。

可以看到，在内置的 Surface Shader 中，使用 `#pragma define-meta` 将许多内置的宏重定向到了面板上。

```ts
CCProgram macro-remapping %{
  // ui displayed macros
  #pragma define-meta HAS_SECOND_UV
  #pragma define-meta USE_TWOSIDE
  #pragma define-meta IS_ANISOTROPY
  #pragma define-meta USE_VERTEX_COLOR

  #define CC_SURFACES_USE_SECOND_UV HAS_SECOND_UV
  #define CC_SURFACES_USE_TWO_SIDED USE_TWOSIDE
  #define CC_SURFACES_LIGHTING_ANISOTROPIC IS_ANISOTROPY
  #define CC_SURFACES_USE_VERTEX_COLOR USE_VERTEX_COLOR

  // depend on UI macros
#if IS_ANISOTROPY || USE_NORMAL_MAP
  #define CC_SURFACES_USE_TANGENT_SPACE 1
#endif

  // functionality for each effect
  #define CC_SURFACES_LIGHTING_ANISOTROPIC_ENVCONVOLUTION_COUNT 31
}%
```

## Surface 函数段

在 Surface Shader 中，定义了两个 CCProgram 用于处理具体的Shader计算。
- CCProgram surface-vertex：用于处理 vs 相关计算
- CCProgram surface-fragment：用于处理 fs 相关计算

### CCProgram surface-vertex

内置的 vs 流程基本上能满足 Surface Shader 的 vs 需求，导致 surface-vertex 非常简单，只做了少量的特殊处理。

我们以第二套 UV 的处理函数为例。

它先定义了 `CC_SURFACES_VERTEX_MODIFY_UV` 宏，然后实现了 `SurfacesVertexModifyUV` 方法。

```ts
#define CC_SURFACES_VERTEX_MODIFY_UV
void SurfacesVertexModifyUV(inout SurfacesStandardVertexIntermediate In)
{
    In.texCoord = In.texCoord * tilingOffset.xy + tilingOffset.zw;
    #if CC_SURFACES_USE_SECOND_UV
    In.texCoord1 = In.texCoord1 * tilingOffset.xy + tilingOffset.zw;
    #endif
}
```

这就是 Surface Shader 的核心机制，可以通过宏定义改写内部函数，在不修改内部源码的情况下实现特定的渲染需求。

具体的机制请参考[使用宏定义实现函数替换](function-replace.md) 和 [Surface Shader 内置可替换函数列表](surface-function.md)。

### CCProgram surface-fragment

surface-fragment 主要实现了 PBR 计算时需要的表面材质信息填充。

#### 宏开关

```ts
#if USE_ALBEDO_MAP
    uniform sampler2D albedoMap;
    #pragma define-meta ALBEDO_UV options([v_uv, v_uv1])
#endif
```

可以看到，在内置的 Surface Shader 中，所有的贴图，都被宏定义包裹起来，这样的好处就是可以根据需求关闭对应的宏，以提升性能。

#### 材质面板可选择的宏

`#pragma define-meta` + 名称 + `options([item0,item1,....])` 可以定义一个供用户选择的宏。

以下面代码为例：

```ts
#pragma define-meta ALBEDO_UV options([v_uv, v_uv1])
```

材质面板上， ALBEDO_UV 会出现下拉选择框，Shader 编译时，会以用户选择值为准。

比如，用户如果选择了 `v_uv1`，这条语句编译出来的最终结果为：

```ts
#define ALBEDO_UV v_uv1
```

```ts
#if USE_ALPHA_TEST
    #pragma define-meta ALPHA_TEST_CHANNEL options([a, r])
#endif

```

ALPHA_TEST_CHANNEL 也是如此，默认使用 `a` 通道，但也可以选择 r 通道。

#### PBR 通道

```ts
#pragma define OCCLUSION_CHANNEL          r
#pragma define ROUGHNESS_CHANNEL          g
#pragma define METALLIC_CHANNEL           b
#pragma define SPECULAR_INTENSITY_CHANNEL a
```

Surface Shader 使用一张图作为 PBR 贴图，根据定义就可以知道，PBR 贴图各通道的含义：
- r通道：环境遮蔽
- r通道：粗糙度
- b通道：金属度
- a通道：高光强度

#### 具体实现

与 surface-vertex 一样， surface-fragment 中也通过函数替换方式，实现 PBR 参数填充。

想要了解更多具体的机制请参考以下文章：
- [使用宏定义实现函数替换](function-replace.md)
- [Surface Shader 内置可替换函数列表](surface-function.md)
- [Surface Shader 执行流程](./shader-code-flow.md)

## Shader 组装

上面提到的几个 CCProgram：
- shared-ubos
- macro-remapping
- surface-vertex
- surface-fragment

只是一些实现 Surface Shader 必要的组成部分，想要实现一个完整的 Surface Shader，还需要将这些部分，配合Surface Shader 内置的其它模块进行组装。

具体的组装机制请查看：[Surface Shader 组装](./shader-assembly.md)。

最后组装出来的 CCProgram，才是 CCEffect 部分引用的内容。
- CCProgram standard-vs

- CCProgram shadow-caster-vs

- CCProgram standard-fs

- CCProgram shadow-caster-fs

- CCProgram reflect-map-fs
