# 宏定义与重映射

Surface Shader 内部计算时会用到一些宏开关，这些宏以 `CC_SURFACES_` 开头。

>注意：以 `CC_SURFACES_` 开头的宏不会出现在材质面板上。

以下是完整的宏列表：

| 宏名                                                  | 类型 | 含义                                                         |
| :---------------------------------------------------- | ---- | ------------------------------------------------------------ |
| CC_SURFACES_USE_VERTEX_COLOR                          | BOOL | 是否使用顶点色                                               |
| CC_SURFACES_USE_SECOND_UV                             | BOOL | 是否使用2uv                                                  |
| CC_SURFACES_USE_TWO_SIDED                             | BOOL | 是否使用双面法线，用于双面光照                               |
| CC_SURFACES_USE_TANGENT_SPACE                         | BOOL | 是否使用切空间（使用法线图或各向异性时必须开启）             |
| CC_SURFACES_TRANSFER_LOCAL_POS                        | BOOL | 是否在 FS 中访问模型空间坐标                                 |
| CC_SURFACES_LIGHTING_ANISOTROPIC                      | BOOL | 是否开启各向异性材质                                         |
| CC_SURFACES_LIGHTING_ANISOTROPIC_ENVCONVOLUTION_COUNT | UINT | 各向异性环境光卷积采样数，为 0 表示关闭卷积计算，仅当各向异性开启时有效 |
| CC_SURFACES_LIGHTING_USE_FRESNEL                      | BOOL | 是否通过相对折射率 ior 计算菲涅耳系数                        |
| CC_SURFACES_LIGHTING_TRANSMIT_DIFFUSE                 | BOOL | 是否开启背面穿透漫射光（如头发、叶片、耳朵等）               |
| CC_SURFACES_LIGHTING_TRANSMIT_SPECULAR                | BOOL | 是否开启背面穿透高光（如水面、玻璃折射等）                   |
| CC_SURFACES_LIGHTING_TRT                              | BOOL | 是否开启透射后内部镜面反射出的光线（如头发材质等）           |
| CC_SURFACES_LIGHTING_TT                               | BOOL | 是否开启透射后内部漫反射出的光线（用于头发材质）             |
| CC_SURFACES_USE_REFLECTION_DENOISE                    | BOOL | 是否开启环境反射除噪，仅 legacy 兼容模式下生效               |
| CC_SURFACES_USE_LEGACY_COMPATIBLE_LIGHTING            | BOOL | 是否开启 legacy 兼容光照模式，可使渲染效果和 legacy/standard.effect 完全一致，便于升级 |

> **注意**： 如果未定义这些宏，系统内部会自动定义为默认值 0；

搜索 `CCProgram macro-remapping` 一段，可以看到内容有如下三部分组成：

![macro-remapping](../img/macro-remapping.png)

## 仅供面板显示的宏

```glsl
// ui displayed macros not used in this effect file
#pragma define-meta HAS_SECOND_UV
#pragma define-meta USE_TWOSIDE
#pragma define-meta USE_REFLECTION_DENOISE
#pragma define-meta USE_COMPATIBLE_LIGHTING
```

默认情况下，以 `CC_` 开头的宏不会显示在材质面板上。 当我们想让某一个宏开关显示在材质面板上时，可以像下面这样操作：

1、使用 `#pragma define-meta` 定义一个面板宏，我们以 `HAS_SECOND_UV` 为例：

```glsl
#pragma define-meta HAS_SECOND_UV
```

2、将 `CC_SURFACES_` 开头的宏重定向到这个宏，示例如下：

```glsl
#define CC_SURFACES_USE_SECOND_UV HAS_SECOND_UV
```

这样，在这个 Shader 对应的材质面板上，你就可以通过控制 `HAS_SECOND_UV` 来影响 `CC_SURFACES_USE_SECOND_UV` 宏的值。

## 在 Surface 函数中使用过的宏

如果有宏在 Shader 代码中被使用，且不是以 `CC_` 开头的，会自动显示在材质面板上。 比如：

```glsl
// ui displayed macros used in this effect file
#define CC_SURFACES_USE_VERTEX_COLOR USE_VERTEX_COLOR
#if IS_ANISOTROPY || USE_NORMAL_MAP
  #define CC_SURFACES_USE_TANGENT_SPACE 1
#endif
```

这种情况下，IS_ANISOTROPY 和 USE_NORMAL_MAP 会显示在材质面板上，并可以通过材质面板进行开关。

## 内部功能性的宏

对于某一些宏，我们不想要面板控制它，直接定义它的值即可，例如：

```glsl
// functionality for each effect
#define CC_SURFACES_LIGHTING_ANISOTROPIC_ENVCONVOLUTION_COUNT 31
```

## 隐藏宏

如果你的 Shader 中写了一些宏，但是不想出现在材质面板上，可以用 `CC_` 开头。

为了和系统内部宏有区别，建议使用  `CC_USER_` 开头。

更多宏定义相关内容，可以查看 [预处理宏定义](../macros.md)。
