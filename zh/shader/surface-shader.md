# 表面着色器（Surface Shader）

随着渲染对画面要求越来越高，着色器的实现也更加复杂，为了提供高效、统一的着色器流程，在 v3.5.1 中，我们新增了 Surface Shader 框架。开发者可以在 **资源管理器 -> internal -> effect -> surfaces** 以及 **资源管理器 -> internal -> chunk -> surfaces** 中找到对应的着色器以及着色器片段。

Surface Shader 使用统一渲染流程和结构，可以让用户以简洁的代码创建表面材质信息，指定用于组合的光照和着色模型。相比旧版（Legacy Shader）的优点是更易书写和维护，有更好的版本兼容性，也更不容易产生渲染错误。并且可以从统一流程中获取很多公共特性，如统一的全场景光照和 Debug View 调试功能等。

Creator 也更易扩展出多种常见的复杂材质提供给用户，未来还会支持 Shader Graph 自动生成 Effect 代码，可以极大提高 Shader 开发者的效率。但代价是无法定制光照和着色运算的具体内容，一旦指定了光照和着色模式，流程将按照既定路径来进行，不支持临时屏蔽或更改一些内部计算。如有这样的需求，请使用 Legacy Shader。

Surface Shader 仍然是基于 [Cocos Effect 的语法](effect-syntax.md)，以前的材质参数、technique、pass 及渲染状态等的定义完全可以复用。

## 相关概念

在了解 Surface Shader 之前，有几个概念需要说明一下：

### 1、渲染用途

说明了物体需要被渲染到哪里。

我们有很多渲染 Pass 用于渲染同一个物体到不同的纹理数据上，这些数据分别有内置的用途。比如说最常用的 **渲染到场景** 可以直接用于屏幕显示，或者把阴影投射物 **渲染到阴影贴图**，或者 **渲染到动态环境反射** 来生成反射贴图等。

这部分内容可以在 **资源管理器 -> internal -> chunk -> shading-entries -> main-functions** 内找到。

![render-to](img/render-to-xxx.png)

| 常用的渲染用途       | 文件位置             | 备注|
| -------------------- | -------------------- | --- |
| 渲染到场景（默认）   | render-to-scene      ||
| 渲染到阴影贴图       | render-to-shadowmap  ||
| 渲染到环境贴图       | render-to-reflectmap | 引擎预留 |
| 渲染卡通描边         | misc/silhouette-edge ||
| 渲染天空             | misc/sky             ||
| 后期处理或通用计算 Pass | misc/quad            | 引擎预留 |

### 2、光照模型

说明物体表面的微观结构与固有光学属性是如何对光线产生影响和作用的。

比如说塑料会产生各向同性的圆形高光，头发会产生各向异性的条纹状高光，光线在皮肤上会发生散射，而在镜子这种更接近理想光学表面的物体上，绝大多数光线只会沿着反射角发生反射等。

| 光照模型名称 | 说明                                                         |
| ------------ | ------------------------------------------------------------ |
| standard     | PBR 光照，支持 GGX BRDF 分布的各向同性与各向异性光照，支持卷积环境光照 |
| toon         | 简单的卡通光照，阶梯状的光照效果                             |

### 3、表面材质模型

说明物体表面的一些物理参数（反照率、粗糙度等）是如何影响光照结果的。

通常材质与光照模型必须关联使用，我们会逐渐扩展常用的材质与光照模型。

| 材质模型名称 | 说明                                                         |
| ------------ | ------------------------------------------------------------ |
| standard     | 粗糙度和金属性描述的标准 PBR 材质，和 SP、Blender、Maya 等软件中的材质节点类似 |
| toon         | 简单的卡通材质，有多种 shade 颜色处理 |                          |

### 4、Shader Stage

渲染是由不同的着色器来完成的，有处理顶点、像素或通用计算的不同阶段，如下表所示：

| 着色器阶段      | 对应的 Surface Shader 代码标识 |
| --------------- | ---------------------------- |
| Vertex Shader   | vs                           |
| Fragment Shader | fs                           |
| Computer Shader | cs                           |

## 代码框架

除了和 Cocos Effect 相同的 CCEffect 参数、technique 和 UBO 内存布局等定义之外，再也无需考虑各种内部宏定义的处理、着色器输入输出变量、Instancing[^1]、繁琐的顶点变换、全局像素效果和每种渲染用途的细节计算等。

典型的 Surface Shader 代码通常由三个部分组成：

- `Macro Remapping`：将用户在 Effect 中声明或使用的宏名（部分）映射为 Surface 内部宏名。
- `Surface Functions`：用于声明表面材质信息相关的 Surface 函数。
- `Shader Assembly`：用于组装每个顶点着色器（Vertex Shader）和片元着色器（Fragment Shader）的代码模块。

此处以内置着色器 `surfaces/standard.effect` 为例，说明 Surface Shader 的代码框架。

![effect](img/surface-effects.png)

### Macro Remapping

Surface Shader 内部计算时会用到一些宏开关，需要根据 Effect 中对应含义的宏名来指定。考虑到 Effect 中的宏名会直接显示在材质面板上，这样做的好处是 Effect 中的名称可以自由开放给用户而不影响 Surface 内部计算。

这些宏以 `CC_SURFACES_` 开头，以下是完整的宏列表：

| 宏名                                                  | 类型 | 含义                                                         |
| :---------------------------------------------------- | ---- | ------------------------------------------------------------ |
| CC_SURFACES_USE_VERTEX_COLOR                          | BOOL | 是否使用顶点色                                               |
| CC_SURFACES_USE_SECOND_UV                             | BOOL | 是否使用2uv                                                  |
| CC_SURFACES_USE_TWO_SIDED                             | BOOL | 是否使用双面法线                                             |
| CC_SURFACES_USE_TANGENT_SPACE                         | BOOL | 是否使用切空间（使用法线图或各向异性时必须开启）             |
| CC_SURFACES_TRANSFER_LOCAL_POS                        | BOOL | 是否在 FS 中访问模型空间坐标                                   |
| CC_SURFACES_LIGHTING_ANISOTROPIC                      | BOOL | 是否开启各向异性材质                                         |
| CC_SURFACES_LIGHTING_ANISOTROPIC_ENVCONVOLUTION_COUNT | UINT | 各向异性环境光卷积采样数，为 0 表示关闭卷积计算，仅当各向异性开启时有效 |
| CC_SURFACES_USE_REFLECTION_DENOISE                    | BOOL | 是否开启环境反射除噪                                         |
| CC_SURFACES_USE_LEGACY_COMPATIBLE_LIGHTING            | BOOL | 是否开启 legacy 兼容光照模式，可使渲染效果和 legacy/standard.effect 完全一致，便于升级 |

> **注意**： 这些宏可以不定义，系统内部会自动定义为默认值 0；也可以直接定义为 0 或其他值，表示在此 Effect 中强制关闭或打开，禁止用户调节。

搜索 `CCProgram macro-remapping` 一段，可以看到内容有如下三部分组成：

![macro-remapping](img/macro-remapping.png)

#### 1、在 Surface 函数中未使用过的宏

```glsl
// ui displayed macros not used in this effect file
#pragma define-meta HAS_SECOND_UV
#pragma define-meta USE_TWOSIDE
#pragma define-meta USE_REFLECTION_DENOISE
#pragma define-meta IS_ANISOTROPY
#pragma define-meta USE_COMPATIBLE_LIGHTING
    
#define CC_SURFACES_USE_SECOND_UV HAS_SECOND_UV
#define CC_SURFACES_USE_TWO_SIDED USE_TWOSIDE
#define CC_SURFACES_USE_REFLECTION_DENOISE USE_REFLECTION_DENOISE
#define CC_SURFACES_LIGHTING_ANISOTROPIC IS_ANISOTROPY
#define CC_SURFACES_USE_LEGACY_COMPATIBLE_LIGHTING USE_COMPATIBLE_LIGHTING   
```

由于 Surface Shader 精简了很多不必要的公共流程代码，如 VS FS 传参的定义等等，之前存在于旧流程中的 ~~`#if HAS_SECOND_UV`~~ 这样的代码也就不存在了。对于此类宏，必须要在此处预先定义 **`#pragma define-meta MACRONAME`**，这样才可以显示在材质面板上。
定义好之后，下一行就可以使用标准 GLSL 预定义 **`#define CC_SURFACES_MACRONAME MACRONAME`**。

#### 2、在 Surface 函数中使用过的宏

```glsl
// ui displayed macros used in this effect file
#define CC_SURFACES_USE_VERTEX_COLOR USE_VERTEX_COLOR
#if IS_ANISOTROPY || USE_NORMAL_MAP
  #define CC_SURFACES_USE_TANGENT_SPACE 1
#endif
```

这部分简单多了，直接按照 **#define CC_SURFACES_MACRONAME MACRONAME** 定义即可。
不过 CC_SURFACES_USE_TANGENT_SPACE 宏要特别注意，通常开了法线贴图或各向异性，都要开启该宏，否则可能会出现编译错误。

#### 3、内部功能性的宏

```glsl
// functionality for each effect
#define CC_SURFACES_LIGHTING_ANISOTROPIC_ENVCONVOLUTION_COUNT 31
```

直接定义想要的值即可。

### Surface Function

**每个材质函数的功能类似于 DCC（Digital Content Creation） 软件的材质编辑器中输出一个材质参数到指定的材质节点**。类似于：

![surface-node](img/surface-node.png)

#### 1、定义

可以使用 `CCProgram` 或单独的 chunk 来定义 Surface 材质函数块。

> **注意**：VS 和 FS 使用的函数块必须分开。通常来讲所有的 VS 共享一个，所有的 FS 共享一个。在我们的例子中 `standard-vs` 和`shadow-caster-vs` 共用 `surface-vertex` 块，而 `standard-fs` 和 `shadow-caster-fs` 共用 `surface-fragment` 块。
>
> 用这种方式的好处是所有的用户自定义动画与材质的代码只需要写一份，却可以在各种渲染用途中保持统一。

Surface Shader 在内部提供了简单的默认函数，所以 **这些函数并不是必须定义的**，**如果你想重载某函数，需要预定义该函数对应的宏来完成**。这些函数命名以 `Surfaces + ShaderStage 名` 打头，后跟功能描述。可以在 [`editor/assets/chunks/surfaces/default-functions`](https://github.com/cocos/cocos-engine/tree/v3.5.1/editor/assets/chunks/surfaces/default-functions) 中查看不同材质模型中各 Surface 函数的具体定义与实现，如：

```glsl
#define CC_SURFACES_VERTEX_MODIFY_WORLD_POS
vec3 SurfacesVertexModifyWorldPos(in SurfacesStandardVertexIntermediate In)
{
  vec3 worldPos = In.worldPos;
  worldPos.x += sin(cc_time.x * worldPos.z);
  worldPos.y += cos(cc_time.x * worldPos.z);
  return worldPos;
}
```

预先定义 `CC_SURFACES_VERTEX_MODIFY_WORLD_POS` 宏，可以忽略掉内部默认函数，让 Surface Shader 使用你定义的函数来计算材质参数。

> **注意**：用这种方式的好处是方便扩展多种不同的材质模型和代码版本升级，新版增加的函数可以用新的名称和参数，仍然可以调用旧版定义的函数获取计算结果，无需写重复代码，也不用担心升级后编译报错。

#### 2、VS 对应的函数列表

VS 中的处理和材质模型关系相对比较小，所以这里都使用通用函数，函数参数均为 `SurfacesStandardVertexIntermediate` 结构体，存放的是 VS 输入输出的数据。用户无需再关心具体的顶点输入输出流程处理，只需要聚焦到某个数据是否需要及如何修改。

| 预先定义宏                             | 对应的函数定义                       | 对应的材质模型 | 功能说明                                            |
| -------------------------------------- | ------------------------------------ | -------------- | --------------------------------------------------- |
| CC_SURFACES_VERTEX_MODIFY_LOCAL_POS    | vec3 SurfacesVertexModifyLocalPos    | Common         | 返回修改后的模型空间坐标                            |
| CC_SURFACES_VERTEX_MODIFY_WORLD_POS    | vec3 SurfacesVertexModifyWorldPos    | Common         | 返回修改后的世界空间坐标（世界空间动画）            |
| CC_SURFACES_VERTEX_MODIFY_CLIP_POS     | vec4 SurfacesVertexModifyClipPos     | Common         | 返回修改后的剪裁（NDC）空间坐标（通常用于修改深度） |
| CC_SURFACES_VERTEX_MODIFY_UV           | void SurfacesVertexModifyUV          | Common         | 修改结构体内的 UV0 和 UV1 （使用 tiling 等）              |
| CC_SURFACES_VERTEX_MODIFY_WORLD_NORMAL | vec3 SurfacesVertexModifyWorldNormal | Common         | 返回修改后的世界空间法线（世界空间动画）            |

#### 3、FS 对应的函数列表

FS 中的函数大部分是只修改一项，在 Surface 函数中直接返回即可。有些函数可能会修改多项（如 UV 和切空间向量），此时会在参数列表中传入多个值用于修改。具体属于哪种情况请参考函数定义。

| 预先定义宏                                              | 对应的函数定义                                       | 对应的材质模型 | 功能说明                                                     |
| ------------------------------------------------------- | ---------------------------------------------------- | -------------- | ------------------------------------------------------------ |
| CC_SURFACES_FRAGMENT_MODIFY_ BASECOLOR_AND_TRANSPARENCY | vec4 SurfacesFragmentModify BaseColorAndTransparency | Common         | 返回修改后的基础色（rgb 通道）和透明值（a 通道）               |
| CC_SURFACES_FRAGMENT_MODIFY_ WORLD_NORMAL               | vec3 SurfacesFragmentModify WorldNormal              | Common         | 返回修改后的像素法线（通常是法线贴图）                       |
| CC_SURFACES_FRAGMENT_MODIFY_ SHARED_DATA                | void SurfacesFragmentModify SharedData               | Common         | 如果某些贴图和计算需要在多个材质节点中使用，可在此函数中进行，直接修改 Surface 结构体内的参数，减少性能耗费 |
| CC_SURFACES_FRAGMENT_MODIFY_ WORLD_TANGENT_AND_BINORMAL | void SurfacesFragmentModify WorldTangentAndBinormal  | Standard PBR   | 修改 Surface 结构体内的世界切空间向量                          |
| CC_SURFACES_FRAGMENT_MODIFY_ EMISSIVE                   | vec3 SurfacesFragmentModify Emissive                 | Standard PBR   | 返回修改后的自发光颜色                                       |
| CC_SURFACES_FRAGMENT_MODIFY_ PBRPARAMS                  | vec4 SurfacesFragmentModify PBRParams                | Standard PBR   | 返回修改后的 PBR 参数（ao, roughness, metallic, specularIntensity） |
| CC_SURFACES_FRAGMENT_MODIFY_ ANISOTROPY_PARAMS          | vec4 SurfacesFragmentModify AnisotropyParams         | Standard PBR   | 返回修改后的各向异性参数（rotation, shape, unused, unused）  |
| CC_SURFACES_FRAGMENT_MODIFY_ BASECOLOR_AND_TOONSHADE    | void SurfacesFragmentModify BaseColorAndToonShade    | Toon           | 修改卡通渲染基础色                                           |
| CC_SURFACES_FRAGMENT_MODIFY_ TOON_STEP_AND_FEATHER      | vec4 SurfacesFragmentModify ToonStepAndFeather       | Toon           | 返回修改后的参数                                             |
| CC_SURFACES_FRAGMENT_MODIFY_ TOON_SHADOW_COVER          | vec4 SurfacesFragmentModify ToonShadowCover          | Toon           | 返回修改后的参数                                             |
| CC_SURFACES_FRAGMENT_MODIFY_ TOON_SPECULAR              | vec4 SurfacesFragmentModify ToonSpecular             | Toon           | 返回修改后的参数                                             |

#### 4、VS 输入值的获取

VS 输入值都在 `SurfacesStandardVertexIntermediate` 结构体中，作为 Surface 函数参数传入

| Vertex Shader 输入值 | 类型 | 使用时需要对应宏开启          | 含义                                 |
| ------------------- | ---- | ----------------------------- | ------------------------------------ |
| position            | vec4 | N/A                           | Local Position 局部坐标 |
| normal              | vec3 | N/A                           | Local Normal 局部法线 |
| tangent             | vec4 | CC_SURFACES_USE_TANGENT_SPACE | Local Tangent and Mirror Normal Sign 局部切线和镜像法线标记|
| color               | vec4 | CC_SURFACES_USE_VERTEX_COLOR  | Vertex Color 顶点色|
| texCoord            | vec2 | N/A                           | UV0 |
| texCoord1           | vec2 | CC_SURFACES_USE_SECOND_UV     | UV1 |
| clipPos             | vec4 | N/A                           | Clip(NDC) Position 归一化设备坐标 |
| worldPos            | vec3 | N/A                           | World Position 世界坐标 |
| worldNormal         | vec4 | N/A                           | World Normal and Two Side Sign 世界法线和双面材质标记|
| worldTangent        | vec3 | CC_SURFACES_USE_TANGENT_SPACE | World Tangent 世界切线|
| worldBinormal       | vec3 | CC_SURFACES_USE_TANGENT_SPACE | World Binormal 世界副法线|

#### 5、FS 输入值的获取

FS 的输入值目前作为宏来使用，大部分输入值在内部做了容错处理，可以无视对应宏条件随意访问。

| Fragment Shader 输入值 | 类型  | 使用时需要对应宏开启           | 含义               |
| --------------------- | ----- | ------------------------------ | ------------------        |
| FSInput_worldPos      | vec3  | N/A                            | World Position 世界坐标 |
| FSInput_worldNormal   | vec3  | N/A                            | World Normal 世界法线 |
| FSInput_faceSideSign  | float | N/A                            | Two Side Sign 双面材质标记 |
| FSInput_texcoord      | vec2  | N/A                            | UV0                       |
| FSInput_texcoord1     | vec2  | N/A                            | UV1                       |
| FSInput_vertexColor   | vec4  | N/A                            | Vertex Color 顶点颜色 |
| FSInput_worldTangent  | vec3  | N/A                            | World Tangent 世界切线 |
| FSInput_mirrorNormal  | float | N/A                            | Mirror Normal Sign 镜像法线标记 |
| FSInput_localPos      | vec4  | CC_SURFACES_TRANSFER_LOCAL_POS | Local Position 局部坐标 |

### Shader Assembly

我们使用 include 不同模块头文件的形式，按顺序组装每个 Pass 的 Shader。

搜索 `standard-fs` 一段，可以看到整个 Fragment Shader 的组装过程分为 6 个部分

#### 1、宏

首先需要包含必要的内部宏映射和通用宏定义。

宏映射使用在 Macro Remapping 一段中描述的自定义 CCProgram 代码块或 chunk 文件。

接下来需要包含通用宏定义文件 `common-macros`，如下所示：

```glsl
Pass standard-fs:
#include <macro-remapping>
#include <surfaces/effect-macros/common-macros>
```

对于特殊渲染用途的 Pass 而言，很多 Shader 功能是关掉的，因此无需包含 `common-macros`，直接包含对应渲染用途的宏定义文件即可：

```glsl
Pass shadow-caster-fs:
#include <surfaces/effect-macros/render-to-shadowmap>
```

#### 2、Shader 通用头文件

根据 **当前的 Shader Stage 名称** 来选择对应的通用头文件，如下所示：

```glsl
Vertex Shader：
#include <surfaces/includes/common-vs>
Fragement Shader：
#include <surfaces/includes/common-fs>
```

#### 3、用户 Surface 功能函数

使用在 Surface Function 一段中描述的自定义 CCProgram 代码块或 chunk 文件。

由于 Surface 功能函数可能还会用到 Effect 参数相关的 UBO 内存布局，因此它也要提前被 Include，否则会编译出错。

如下所示：

```glsl
#include <shared-ubos>
#include <surface-fragment>
```

#### 4、光照模型

此部分为**可选项，只限渲染到场景的默认用途及 Fragment Shader 使用**。

使用 **光照模型名称** 来选择对应的头文件，如下所示：

```glsl
Standard PBR Lighting：
#include <lighting-models/includes/standard>
Toon Lighting：
#include <lighting-models/includes/toon>
```

#### 5、表面材质和着色模型

此部分为 **可选项，只限渲染到场景的默认用途使用**。

**材质模型名称 + Shader Stage 名称** 来选择对应的头文件，如下所示：

```glsl
Vertex Shader：
#include <surfaces/includes/standard-vs>
Fragement Shader：
#include <surfaces/includes/standard-fs>
```

#### 6、Shader 主函数

使用当前 Pass 的**渲染用途名称 + Shader Stage 名称** 来选择对应的主函数头文件。

```glsl
Pass standard-fs:
#include <shading-entries/main-functions/render-to-scene/fs>
Pass shadow-caster-fs:
#include <shading-entries/main-functions/render-to-shadowmap/fs>
```

## Debug View

使用 Surface Shader 框架后，内置的 Debug View 功能即可生效，通过在界面上选择对应的 Debug 模式即可同屏查看模型、材质、光照及其他计算数据，在渲染效果异常的时候可以快速定位问题。

此功能预计在 v3.6 开放。

## 进阶使用方法

1. 自行添加 vs 输出与 fs 输入：VS新定义 varying 变量之后在某个 Surface 函数中计算并输出该值
2. FS 新定义 varying 变量之后在某个 Surface 函数中获取并使用该值
3. 甚至可以在不同的 Shader 主函数中混用 Surface Shader 和 Legacy Shader（但是要保证 varying 顶点数据在两个阶段一致）。

## 公共函数库

可以在 **资源管理器 -> internal -> chunks -> common** 文件夹下找到不同分类的函数库头文件。

库中的函数不依赖任何内部数据（引擎相关 uniform 和贴图等），可以当作工具函数直接使用。

Surface 内部已经自动包含了常用的公共函数头文件，根据类型可分为：

| 文件夹名 | 函数用途                                 |
| -------- | ---------------------------------------- |
| color    | 色彩相关功能（颜色空间、tonemapping 等）  |
| data     | 数据相关功能（压缩解压缩等）             |
| debug    | Debug View 相关功能                       |
| effect   | 场景特效相关功能（水、雾等）             |
| lighting | 光照相关功能（brdf、bsdf、衰减、烘焙等） |
| math     | 数学库（坐标变换、数值判定和运算等）     |
| mesh     | 模型相关功能（材质转换、模型动画等）     |
| shadow   | 阴影相关功能（pcf、hcs 等）               |
| texture  | 贴图相关功能（采样、mip 计算等）          |

[^1]: 不支持自定义几何体实例化属性。
