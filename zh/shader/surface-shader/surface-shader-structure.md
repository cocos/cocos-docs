# Surface Shader 结构

一个典型的 Surface Shader 通常由四个主要部分构成：

1. CCEffect
2. 共享常量声明
3. 宏映射
4. 主体功能函数
5. Shader组装器：用于将上面4个部分与内置的Surface Shader 功能进行级任

## 1、CCEffect

CCEffect 用于描述 Surface Shader 的 techniques, pass , 属性以及渲染状态等信息。材质会根据 CCEffect 中的描述生成默认值，以及在材质面板上显示。

具体内容请参考 [Cocos Shader 语法](../effect-syntax.md)。

## 2、共享常量声明

共享常量声明会将所有 pass， vs 和 fs 都需要用到的常量写在一起，简化 Shader 编写。

这是一个可选项，但对于复杂的 Shader 来说，建议使用。以内置 Surface Shader 为例：

```glsl
CCProgram shared-ubos %{
    uniform Constants {
        vec4 titlingOffset;
        ...
    }
}%
```

> 注意：并不一定非要叫 `shared-ubos` 和 `Constants` ，只要方便记忆即可。

## 3、宏映射

Surface Shader 提供了大量的内置宏，这些宏默认是不显示在面板上的，如果想让这些宏显示在面板上，就需要重新映射它们的名字。

并且，你可以将一些宏集中放在这个代码片段中，方便管理，以内置 Surface Shader 为例：

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

更多详情请参考 [宏定义与重映射](./macro-remapping.md)。

> 注意：并不一定非要叫 `macro-remapping` 只要方便记忆即可。

## 4、函数块

Surface Shader 统一了渲染流程，同时也暴露了许函数可供用户自定义渲染细节。

为了方便管理，我们一般至少需要声明两个 CCProgram 代码片段，用于 vs 和 fs。

以内置的 Surface Shader 为例：

```glsl
CCProgram surface-vertex %{
    ...
}%

CCProgram surface-fragment %{
    ...
}%
```

`surface-vertex` 用于 vs 相关函数的处理，`surface-fragment` 用于 fs 相关函数的处理。

在这两个代码片段中，通过宏定义机制，替换内部函数。也可以增加自己的 vs 到 fs 的输入。

详情请参考 [使用宏定义实现函数替换](./function-replace.md)， [Vertex Shader 的输入值](./vs-input.md) 和 [Fragment Shader 的输入值](./fs-input.md)。

## 5、Shader 组装器

Surface Shader 中，最后一个部分，是 Shader 的组装。

我们以内置的 Surface Shader 为例：

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

值得说明的是，上面三个部分（共享常量声明、宏映射
主体功能函数）的代码片段，可以有零个或者多个。最后根据需求组装出最后的 Shader， 供 Surface Shader 开头部分的 CCEffect 引用。

详情请参考 [Surface Shader 组装](./shader-assembly.md)。
