# 预处理宏定义

预处理宏只在 Cocos Effect 编译时生效，不同的预处理宏组合会生成不同的代码，以便更好地管理 Cocos Effect 代码内容，同时生成的 Shader 代码又是无冗余的、高效的。

Cocos Creator 会在加载资源时收集所有在 Cocos Effect 中出现的宏定义，然后将其显示在 **属性检查器** 中，方便用户进行可视化调整，如下图所示：

![macro-simple](img/macro-simple.png)

以使用预处理宏 `USE_TEXTURE` 为例，代码示例如下：

```glsl
CCProgram unlit-vs %{
  #if USE_TEXTURE
    // ...
  #endif
}%
```

宏定义的声明规则如下：

- 所有的宏定义默认值都是 false，因此当定义一个简单宏定义（例如用于布尔开关的宏）时，无法指定其默认值，但可通过 **属性检查器** 或代码修改。如果设计上某些宏之间存在互斥关系（不能同时为 true），可以通过使用 tag 声明的宏来处理，详情请参考下文 **Macro Tags** 部分的内容。
- 运行时会显式定义所有 Shader 中出现的自定义宏（默认值为 0），所以 **除了 GLSL 语言内置宏外（`GL_` 开头的 extension 等）**，请不要使用 `#ifdef` 或 `#if defined` 这样的形式做判断，否则执行结果会始终为 true；
- 运行时会对宏定义组合进行 hash 计算，目前的计算机制最多可支持 **32** 个布尔开关，请不要超出此限制。
- 宏定义不仅可以应用在 `CCProgram` 里，控制宏定义内的代码逻辑，还可以应用在 `CCEffect` 中，将可编辑属性的显示状态与宏定义关联。

如下所示，仅当 `USE_TEXTURE` 预处理宏开启时，`mainTexture` 才会显示在 **属性检查器** 面板上：

```glsl
CCEffect %{
    # ...
    properties:
        mainTexture:  { value: white, editor: { parent: USE_TEXTURE } }
        # ...
}%

CCProgram unlit-fs %{
    // ...
    vec4 frag () {
        #if USE_TEXTURE
          // 处理 mainTexture 逻辑
        #endif
    }
}%
```

![macro-property](img/macro-property.png)

## Macro Tags

虽然引擎会尝试自动识别所有出现在预处理分支逻辑中 (`#if`) 的宏定义，但有时实际使用方式要比简单的布尔开关更复杂，比如下面的条件判断：

```glsl
// macro defined within certain numerical 'range'
#if LAYERS == 4
  // ...
#elif LAYERS == 5
  // ...
#endif
// multiple discrete 'options'
float metallic = texture(pbrMap, uv).METALLIC_SOURCE;
```

针对这类有固定取值范围或固定选项的宏定义，需要选择一个合适的 tag 显式声明：

| Tag     | 说明 | 默认值 | 备注 |
| :-- | :-- | :-- | :-- |
| range   | 一个长度为 2 的数组。首元素为最小值，末元素为最大值 | [0, 3] | 针对连续数字类型的宏定义，显式指定它的取值范围。<br>范围应当控制到最小，有利于运行时的 shader 管理 |
| options | 一个任意长度的数组，每个元素都是一个可能的取值 | 如未显式声明则不会定义任何宏 | 针对有清晰选项的宏定义，显式指定它的可用选项 |

比如声明一个 `LAYERS` 宏，当 tag 为 `range` 时，当前宏在运行时可能的取值范围为 `[4, 5]`。

```glsl
#pragma define-meta LAYERS range([4, 5])
```

比如声明一个 `METALLIC_SOURCE` 宏，当 tag 为 `options` 时，当前宏在运行时可能的取值范围为 'r'、'g'、'b'、'a' 四种。

```glsl
#pragma define-meta METALLIC_SOURCE options([r, g, b, a])
```

> **注意**：语法中的每个 tag 都只有一个参数，这个参数可以直接用 YAML 语法指定。

> **注意**：在 v3.5 之前，Macro Tags 功能的语法是 `#pragma define`，但是从 v3.5 开始 effect 资源升级过程中会自动被替换为 `#pragma define-meta`，在书写新的 effect 资源或使用外部不带 meta 的 effect 资源时请注意语法的正确性。

### Functional Macros

由于 WebGL 1.0 不支持函数式宏定义，因此 Creator 在 Cocos Effect 编译时支持了函数式宏定义，在输出的 Shader 中就已经将此类宏定义展开。

这个操作对于一些需要 inline 的工具函数，或需要大量重复定义的相似代码非常有帮助。在 Cocos Effect 的内置头文件中，有不少工具函数都是函数式宏定义，比如：

```glsl
#pragma define CCDecode(position) \
  position = vec4(a_position, 1.0)
#pragma define CCVertInput(position) \
  CCDecode(position);         \
  #if CC_USE_SKINNING         \
    CCSkin(position);         \
  #endif                      \
  #pragma // empty pragma trick to get rid of trailing semicolons at effect compile time
```

与 C/C++ 的宏定义系统相同，这套机制不会对宏定义的 [卫生情况](https://en.wikipedia.org/wiki/Hygienic_macro) 做任何处理，由不卫生的宏展开而带来的问题需要开发者自行处理。

因此，请谨慎定义含有局部变量的预处理宏：

```glsl
// please do be careful with unhygienic macros like this
#pragma define INCI(i) do { int a=0; ++i; } while(0)
// when invoking
int a = 4, b = 8;
INCI(b); // correct, b would be 9 after this
INCI(a); // wrong! a would still be 4
```

> **注意**：在 v3.5 之前，glsl 标准的 `#define` 语句被函数式宏定义占用，因此不能使用相关语句如 `#ifdef` / `#ifndef` 等。但是从 v3.5 开始，`#define` 和 `#ifdef` / `ifndef` 等都可以正常使用了。函数式宏定义从 v3.5 开始被替换为 `#pragma define`，而 effect 资源升级过程中会自动被替换，在书写新的 effect 资源或使用外部不带 meta 的 effect 资源时请注意语法的正确性。
