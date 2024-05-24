# 着色器语法

Cocos Creator 中的着色器（Cocos Shader ，文件扩展名为 *.effect），是一种基于 [YAML](yaml-101.md) 和 [GLSL](glsl.md) 的单源码嵌入式领域特定语言（single-source embedded domain-specific language），YAML 部分声明流程控制清单，GLSL 部分声明实际的 Shader 片段，这两部分内容相互补充，共同构成了一个完整的渲染流程描述。

> **注意**：推荐使用 Visual Studio Code 编写 Cocos Shader，并在应用商店中安装 Cocos Effect 扩展，提供编写时的语法高亮提示。
>
> ![Cocos Effect](img/vs-ext.png)

## 语法框架概览

**Cocos Shader** 通常由两个部分组成：

- `CCEffect`：用于声明渲染技术（Technique）、渲染过程（Pass）、渲染状态、材质参数等属性。
- `CCProgram`：用于声明顶点着色器（Vertex Shader）和片元着色器（Fragment Shader）代码片段。

此处以内置着色器 `builtin-unlit.effect` 为例，说明 Cocos Shader 的语法框架。

在 VS Code 中打开 Cocos Creator **资源管理器** 面板中 `internal/effects/` 目录下的 `builtin-unlit.effect` 文件，可以看到主要内容如下：

```glsl
CCEffect %{
  techniques:
  - name: opaque
    passes:
      - vert: unlit-vs:vert
      - frag: unlit-fs:frag
        properties: &props
        mainTexture:    { value: grey }
        tilingOffset:   { value: [1, 1, 0, 0] }
        mainColor:      { value: [1, 1, 1, 1], linear: true, editor: { type: color } }
        colorScale:     { value: [1, 1, 1], target: colorScaleAndCutoff.xyz }
        alphaThreshold: { value: 0.5, target: colorScaleAndCutoff.w, editor: { parent: USE_ALPHA_TEST } }
        ...
  - name: transparent
    passes:
      - vert: unlit-vs:vert
      - frag: unlit-fs:frag
        depthStencilState: &d1
        ...
}%

CCProgram unlit-vs %{
  precision highp float;
  #include <...>
  #include <....>

  vec4 vert(){
    vec4 position;
    CCVertInput(position);
    ....
    return cc_matProj * (cc_matView * matWorld) * position;
  }
}%

CCProgram unlit-fs %{
  precision highp float;
  #include <...>
  #include <....>

  vec4 frag(){
    vec4 o = mainColor;
    ....
    return CCFragOutput(o);
  }
}%

```

## CCEffect

在 Cocos Shader 中由 `CCEffect` 包裹的部分是由 **YAML 语法** 声明的渲染流程相关的描述信息。对 YAML 不熟悉的开发者可以前住 [YAML 101](yaml-101.md) 了解详情。

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

一个 `CCEffect` 中支持定义多个渲染技术，但在实际渲染时，同一个材质实例只能应用其中一个技术。

以 `builtin-unlit.effect` 为例，其中包含了 4 个技术：
- opaque
- transparent
- add
- alpha-blend

`opaque` 专门用于渲染不透明物体的渲染技术，`transparent`，`transparent`，`add`，`alpha-blend` 则用来渲染半透明物体。

每个渲染技术（`technique`）都包含了名称（`name`）和渲染过程（`pass`）。

名称用于标记渲染技术的用途，渲染过程则定义了一个完整的渲染流程所需要的全部信息。

## 渲染过程（Pass）

渲染过程的特点如下：
1. 一个渲染技术可以包含多个渲染过程，渲染过程按定义的先后顺序逐一执行。
2. 一个渲染过程必须包含一个顶点着色器（Vertex Shader，VS）和一个片元着色器（Fragment Shader，FS），其余都是可选配置项。详情请参考 [Pass 可选配置参数](pass-parameter-list.md)。

3. VS/FS 着色器需要指定使用的 **CCProgram** ，以及指定着色器的入口函数。 如果不指定入口函数，会默认使用 main。

**格式如下**：

```glsl
CCEffect %{
  techniques:
  - name: opaque # 定义一个不透明的渲染技术
    passes:
    - vert: vs: entry # 选择一个 CCProgram 声明的顶点着色器 ‘vs’，入口函数是 ‘entry’
      frag: fs: entry # 选择一个 CCProgram 声明的片元着色器 ‘fs’，入口函数是 ‘entry’
    ...
  ...
}%
```

每个渲染过程都只有 `vert` 和 `frag` 两个必填参数，分别用于声明当前渲染过程使用的顶点着色器和片元着色器，格式为 `片段名: 入口函数名`。

片段名可以是本文件中声明的 `CCProgram` 片段名，也可以是引擎提供的标准头文件。

> **注意**：自定义着色器的代码中不应该使用 `main` 函数，Cocos Shader 在编译时会自动添加一个 `main` 函数并调用渲染过程的入口函数（例如 `vert` 或 `frag`），`main` 函数会将入口函数的返回值作为当前 Shader 的输出（例如 `gl_Position` 或 `gl_FragColor`）。

## 渲染过程属性

渲染过程中的 properties 用于配置相关属性描述。通过它，可以定义了一个 uniform 在面板上的显示方式，如下所示：

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

详情请参考 [Pass 可选配置参数](pass-parameter-list.md)。

## CCProgram

在 Cocos Shader 中由 `CCProgram` 包裹的部分是由 **GLSL 语法** 声明的 Shader 片段。建议在编写 CCProgram 之前，先了解 [GLSL 基础语法](./glsl.md) 。

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

通过预处理宏，可在 Cocos Shader 编译时控制代码分支和组合，以实现高效便捷的 Shader 代码管理。

更多详细内容请参考：

- [预处理宏定义](macros.md)
- [GLSL 语法](glsl.md)

## 更多

如果想要查看更为复杂的着色器示例，可以参考 [Surface Shader 结构](./surface-shader/surface-shader-structure.md) 以及 [内置 Surface Shader](./surface-shader/builtin-surface-shader.md)。
