# 着色器语法

## 语法框架

`Cocos Effect` 通常由两个部分组成：

- 由 `CCEffect` 声明的渲染技术（Technique）和通道（Pass）等属性块
- 由 `CCProgram` 声明的 `GLSL` 顶点着色器（Vertex Shader）和片元着色器（Fragment Shader）代码片段块。

### 着色器语法框架

此处以 `builtin-unlit.effect` 为例，说明 Cocos Effect 的语法框架。

![effect](img/effect.png)

### CCEffect

在 Cocos Effect 中由 CCEffect 包裹的部分是由 **YAML 语法** 声明渲染流程描述信息。YAML 是一门面向数据序列化对人类书写十分友好的语言，它引入了一些独特的语法来表示不同类型的数据，因此针对不熟悉的开发者，我们在 [YAML 101](yaml-101.md) 一文中也总结了一些最常用的语法和语言特性可供参考。

CCEffect 的整体结构如下：

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

其中：

1. CCEffect 核心是 technique 对象，它代表渲染技术，一个渲染流程描述文件可以支持定义多个渲染技术，但在实际使用中，只能选择其中一种渲染技术。例如上图中的 `builtin-unlit.effect`，它是一个无光照的 Cocos Effect，包含了 `opaque` 专门用来渲染不透明物体的渲染技术和 `transparent` 专门用来渲染透明物体的渲染技术。在实际的使用过程中，一个渲染对象只能选择 `opaque` 或 `transparent` 其中一种渲染技术使用。

2. 每一个渲染技术都包含名字 name 和通道 passes，名字用来标记渲染技术的用途，通道则定义一个了完整的渲染流程所需要的全部信息。一个渲染技术可以定义多个通道，通道之间按定义的先后顺序执行。
    - 一个通道必须包含一个顶点着色器和片元着色器，而开发者自定义的 Cocos Effect 参数以及引擎提供的渲染管线可配置状态等信息则是可选配置。参考 [passes 参数](pass-parameter-list.md)。
    - 顶点/片元着色器需要指定使用的 shader，也就是用 [CCProgram](#CCProgram) 声明的着色器。以及指定着色器的入口函数，每一个着色器的入口函数都需要返回相对应的输出，Cocos Creator 最终会将输出的数据传递给当前渲染后端相对应的接口。

**示例**：

```glsl
CCEffect %{
  techniques:
  - name: opaque # 定义一个不透明的渲染技术
    passes:
    - vert: vs:entry # 选择一个 CCProgram 声明的顶点着色器 vs，入口函数是 entry
      frag: fs:entry # 选择一个 CCProgram 声明的片元着色器 fs，入口函数是 entry
      properties:
        mainTexture: { value: grey } # 着色器中需要同步定义一个 uniform mainTexture，该属性能在编辑器上能进行配置
        colorScale: { value: [1, 1, 1], target: colorScaleAndCutoff.xyz } # 由于 target 属性配置问题，着色器中需要同步定义一个 uniform colorScaleAndCutoff，并选取它的 xyz 分量填充 colorScale 设置的数据
      depthStencilState: # 配置并开启深度测试和写入
        depthTest: true
        depthWrite: true
    ...
  ...
}%
```

### CCProgram

在 Cocos Effect 中由 CCProgram 包裹的部分是由 GLSL 语法声明的 shader 片段。因此在编写 CCProgram 之前，必须先了解 GLSL 语法，您可以直接在 [GLSL 基础语法](./glsl.md) 一章中也罗列出了一些 GLSL 常见语法。

GLSL 着色器代码在 Cocos Effect 中分成两个部分：顶点着色器和片元着色器。

它的结构如下：

```glsl
CCProgram shader-name %{
  <optional: precision settings>
  <optional: include>
  <optional: vertex input>
  <optional: ubo>
  <optional: >
  vec4 entry(){
    // 需要返回一个 vec4 类型数据
  }
}%
```

#### 预处理宏定义

着色器中通过读取着色器代码中的宏来实现动态分支处理。

若要了解更多，可参考：

- [预处理宏定义](macros.md)
- [GLSL 语法](glsl.md)


### 顶点着色器[^1]

为对接骨骼动画与数据解压流程，我们提供了 `CCVertInput` 工具函数，对所有 3D 模型使用的 shader，可直接在 vs 开始时类似这样写：

```glsl
#include <input>
vec4 vert () {
  vec3 position;
  CCVertInput(position);
  // ... do your thing with `position` (models space, after skinning)
}
```

如果还需要法线等信息，可直接使用 standard 版本：

```glsl
#include <input-standard>
vec4 vert () {
  StandardVertInput In;
  CCVertInput(In);
  // ... now use `In.position`, etc.
}
```

这会返回模型空间的顶点位置（position）、法线（normal）和切空间（tangent）信息，并对骨骼动画模型做完蒙皮计算。

> **注意**：引用头文件后，不要在 shader 内重复声明这些 attributes（a_position 等）。对于其他顶点数据（如 uv 等）还是正常声明 attributes 直接使用。

另外如果需要对接引擎动态合批和 instancing 流程，需要包含 `cc-local-batch` 头文件，通过 `CCGetWorldMatrix` 工具函数获取世界矩阵：

```glsl
// unlit version (when normal is not needed)
mat4 matWorld;
CCGetWorldMatrix(matWorld);
// standard version
mat4 matWorld, matWorldIT;
CCGetWorldMatrixFull(matWorld, matWorldIT);
```

关于更多 shader 内置 uniform，可以参考 [完整列表](uniform.md)。

### 片元着色器

为对接引擎渲染管线，Creator 提供了 `CCFragOutput` 工具函数，对所有无光照 shader，都可以直接在 fs 返回时类似这样写：

```glsl
#include <output>
vec4 frag () {
  vec4 o = vec4(0.0);
  // ... do the computation
  return CCFragOutput(o);
}
```

这样中间的颜色计算就不必区分当前渲染管线是否为 HDR 流程等。<br>

如需包含光照计算，可结合标准着色函数 `CCStandardShading` 一起构成 surface shader 流程：

```glsl
#include <shading-standard>
#include <output-standard>
void surf (out StandardSurface s) {
  // fill in your data here
}
vec4 frag () {
  StandardSurface s; surf(s);
  vec4 color = CCStandardShading(s);
  return CCFragOutput(color);
}
```

在此框架下可方便地实现自己的 surface 输入，或其他 shading 算法。

**注意**：`CCFragOutput` 函数一般还是不需要自己实现，它只起到与渲染管线对接的作用，且对于这种含有光照计算的输出，因为计算结果已经在 HDR 范围，所以应该包含 `output-standard` 而非 `output` 头文件。

## Pass 可选参数

每个 Pass 只有 `vert` 和 `frag` 两个必填参数，声明了当前 pass 使用的 shader，格式为 `片段名:入口函数名`。这个名字可以是本文件中声明的 shader 片段名，也可以是引擎提供的标准头文件。<br>
片段中不应该出现 main 函数入口，在 effect 编译期会插入 wrapper，将指定入口函数的返回值赋值给当前 shader 的输出（`gl_Position` 或最终的输出颜色）。

所有其他可选参数及默认值见 [完整列表](pass-parameter-list.md)。

#### 关于 UBO 内存布局

Creator 规定在 shader 中所有非 sampler 的 uniform 都应以 block 形式声明，且对于所有 UBO：
1. 不应出现 vec3 成员；
2. 对数组类型成员，每个元素 size 不能小于 vec4；
3. 不允许任何会引入 padding 的成员声明顺序。

这些规则都会在 effect 编译期做对应检查，以便在导入错误（implicit padding 相关）形式时提醒修改。

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

这意味着大量的空间浪费，且某些设备的驱动实现也并不完全符合此标准[^5]，因此目前 Creator 选择限制这部分功能的使用，以帮助排除一部分非常隐晦的运行时问题。

**再次提醒，uniform 的类型与 inspector 的显示和运行时参数赋值时的程序接口可以不直接对应，通过 [property target](pass-parameter-list.md#Properties) 机制，可以独立编辑任意 uniform 具体的分量。**

[^1]: 不包含粒子、sprite、后效等不基于 mesh 执行渲染的 shader。
[^2]: 注意 WebGL 1.0 平台下不支持整型 attributes，如项目需要发布到此平台，应使用默认浮点类型。
[^3]: [OpenGL 4.5, Section 7.6.2.2, page 137](http://www.opengl.org/registry/doc/glspec45.core.pdf#page=159)
[^4]: 注意在示例代码中，UBO IncorrectUBOOrder 的总长度为 32 字节，实际上这个数据到今天也依然是平台相关的，看起来是由于 GLSL 标准的疏忽，更多相关讨论可以参考 [这里](https://bugs.chromium.org/p/chromium/issues/detail?id=988988)。
[^5]: **Interface Block - OpenGL Wiki**：<https://www.khronos.org/opengl/wiki/Interface_Block_(GLSL)#Memory_layout> 