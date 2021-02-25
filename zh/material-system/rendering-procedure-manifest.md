# 流程控制清单

本篇主要介绍流程控制清单的书写方式，如果对 YAML 格式不熟悉的可以参考 [YAML 书写格式](yaml-101.md)。

在 EffectAsset 文件中任何流程声明都需要包在 **CCEffect** 语法块内，在此处声明的内容方便美术人员在材质面板对 Shader 数据进行编辑：

```yaml
CCEffect %{
  # YAML starts here
}%
```

一个 EffectAsset 支持多个 technique，一个 technique 支持多个渲染模式，每个渲染模式都有多个 passes，一个 pass 控制一个独立的着色流程。

整个结构如下：

```
CCEffect %{
  techniques:
  - name: opaque // 渲染模式名
    passes:
    - vert: unlit-vs:vert
      frag: unlit-fs:frag
      可选参数: 参数值

}%
```

每个 Pass 只有 `vert` 和 `frag` 两个必填参数，声明了当前 pass 使用的 Shader，格式为 `片段名:入口函数名`，其中片段名则是 **CCProgram** 声明的。这个名字可以是本文件中声明的 Shader 片段名，也可以是引擎提供的标准头文件（chunk）。<br>
片段中不应该出现 main 函数入口，在 effect 编译期会插入 wrapper，将指定入口函数的返回值赋值给当前 shader 的输出（`gl_Position` 或最终的输出颜色）。

## Pass 中可配置的参数

Pass 中的参数主要分为开发者可自定义的 effect 参数和引擎提供的 PipelineStates 参数两部分内容，本文主要介绍 PipelineStates 相关的参数，所有参数不区分大小写。

| 参数名            | 说明                                                                                                                                                          | 默认值            | 备注                                                                                                                                                                                                                                                            |
|:-------------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------|:-------------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| switch            | 指定这个 pass 的执行依赖于哪个 define。可以是任意有效的宏名称，但不应与使用到的 shader 中定义的任何 define 重名                                                 | 未定义            | 这个字段默认是不存在的，意味着这个 pass 是无条件执行的                                                                                                                                                                                                           |
| priority          | 指定这个 pass 的渲染优先级，数值越小渲染优先级越高，取值范围为 **0 ~ 255**                                                                                      | 128               | 可结合四则运算符指定相对值                                                                                                                                                                                                                                      |
| stage             | 指定这个 pass 归属于管线的哪个 stage。可以是运行时管线中任何注册的 Stage 名称                                                                                  | **default**       | 对于默认的 forward 管线，只有 `default` 一个 stage                                                                                                                                                                                                               |
| phase             | 指定这个 pass 归属于管线的哪个 phase。可以是运行时管线中任何注册的 Phase 名称                                                                                  | **default**       | 对于默认的 forward 管线，可以是 `default`、`forward-add` 或者 `shadow-caster`                                                                                                                                                                                     |
| propertyIndex     | 指定这个 pass 运行时的 uniform 属性数据要和哪个 pass 保持一致，例如 forward add 等 pass 需要和 base pass 一致才能保证正确的渲染效果。可以是任意有效的 pass 索引 | 未定义            | 一旦指定了此参数，材质面板上就不会再显示这个 pass 的任何属性                                                                                                                                                                                                     |
| embeddedMacros    | 指定在这个 pass 的 shader 基础上额外定义的常量宏，可以是一个包含任意宏键值对的对象                                                                             | 未定义            | 只有当宏定义不同时才能在多个 pass 中使用此参数来复用 shader 资源                                                                                                                                                                                                |
| properties        | Properties 存储着这个 pass 中需要显示在 **属性检查器** 上的可定制的参数                                                                                       |                   | 详见下文 [**Properties**](#Properties) 部分的介绍                                                                                                                                                                                                               |
| migrations        | 迁移旧的材质数据                                                                                                                                              |                   | 详见下文 [**Migrations**](#Migrations) 部分的介绍                                                                                                                                                                                                               |
| primitive         | 创建材质顶点数据                                                                                                                                              | **triangle_list** | 可选项包括：point_list、line_list、line_strip、line_loop<br>**triangle_list**、triangle_strip、triangle_fan<br>line_list_adjacency、line_strip_adjacency<br>triangle_list_adjacency、triangle_strip_adjacency<br>triangle_patch_adjacency、quad_patch_list、iso_line_list |
| dynamics          | 补充说明                                                                                                                                                      | **[]**            | 数组，包括：viewport、scissor、line_width、depth_bias、blend_constants、depth_bounds、stencil_write_mask、stencil_compare_mask                                                                                                                                           |
| RasterizerState   | 面剔除状态                                                                                                                                                    |                   | 详见下文 [**RasterizerState**](#RasterizerState) 部分的介绍                                                                                                                                                                                                     |
| DepthStencilState | 材质深度模版缓冲                                                                                                                                              |                   | 详见下文 [**DepthStencilState**](#DepthStencilState) 部分的介绍                                                                                                                                                                                                 |
| BlendState        | 材质混合状态                                                                                                                                                  | **false**         | 详见下文 [**BlendState**](#BlendState) 部分的介绍                                                                                                                                                                                                               |

### Properties

properties 存储着这个 Pass 中需要显示在 **属性检查器** 上的可定制的参数，这些参数可以是 shader 中某个 uniform 的完整映射，也可以是具体某个分量的映射（使用 target 参数）：

```yaml
albedo: { value: [1, 1, 1, 1] } # uniform vec4 albedo
normalMap: { value: normal } # uniform sampler2D
roughness: { value: 0.8, target: pbrParams.g } # uniform vec4 pbrParams g 分量
offset: { value: [0, 0], target: tilingOffset.zw } # uniform vec4 tilingOffset zw 分量
# say there is another uniform, vec4 emissive, that doesn't appear here
# so it will be assigned a default value of [0, 0, 0, 0] and will not appear in the inspector
```

运行时可以这样使用：

```ts
// as long as it is a real uniform
// it doesn't matter whether it is specified in the property list or not
mat.setProperty('emissive', Color.GREY); // this works
mat.setProperty('albedo', Color.RED); // directly set uniform
mat.setProperty('roughness', 0.2); // set certain component
const h = mat.passes[0].getHandle('offset'); // or just take the handle,
mat.passes[0].setUniform(h, new Vec2(0.5, 0.5)); // and use Pass.setUniform interface instead
```

未指定的 uniform 将由引擎在运行时根据自动分析出的数据类型给予 [默认初值](#default-values)。

为方便声明各 property 子属性，可以直接在 properties 内声明 `__metadata__` 项，所有 property 都会继承它声明的内容，如：

```yaml
properties:
  __metadata__: { editor: { visible: false } }
  a: { value: [1, 1, 0, 0] }
  b: { value: 0.8, editor: { type: color } }
  c: { value: [0, 0], editor: { visible: true } }
```

这样 uniform `a` 和 `b` 已声明的各项参数都不会受到影响，但都不会显示在 **属性检查器** 中（visible 为 false），而 uniform `c` 仍会正常显示。

#### 属性参数列表

properties 中可配置的参数如下表所示，任何可配置的字段如果和默认值相同都可以省掉。

| 参数                      | 默认值              | 可选项                                                                    | 备注                                                                               |
|---------------------------|---------------------|---------------------------------------------------------------------------|------------------------------------------------------------------------------------|
| target                    | **undefined**       | undefined                                                                 | 任意有效的 uniform 通道，可指定连续的单个或多个，但不可随机重排                      |
| value                     |                     |                                                                           | 详见 [**Default Values**](#Default-Values) 部分的介绍                              |
| sampler.<br>minFilter     | **linear**          | none, point, linear, anisotropic                                          | 纹理像素被缩小时的过滤选项。                                                        |
| sampler.<br>magFilter     | **linear**          | none, point, linear, anisotropic                                          | 纹理像素被放大时的过滤选项。                                                        |
| sampler.<br>mipFilter     | **none**            | none, point, linear, anisotropic                                          | 多级渐远纹理不同级别间过滤选项。                                                    |
| sampler.<br>addressU      | **wrap**            | wrap, mirror, clamp, border                                               | 纹理坐标 s（x） 轴环绕方式。                                                          |
| sampler.<br>addressV      | **wrap**            | wrap, mirror, clamp, border                                               | 纹理坐标 t（y） 轴环绕方式。                                                          |
| sampler.<br>addressW      | **wrap**            | wrap, mirror, clamp, border                                               | 纹理坐标 r（z） 轴环绕方式。                                                          |
| sampler.<br>maxAnisotropy | **16**              | 16                                                                        | 纹理的最大各向异性                                                                 |
| sampler.<br>cmpFunc       | **never**           | never, less, equal, less_equal, greater, not_equal, greater_equal, always |                                                                                    |
| sampler.<br>borderColor   | **[0, 0, 0, 0]**    | [0, 0, 0, 0]                                                              | border 环绕方式所需的边缘颜色。                                                     |
| sampler.<br>minLOD        | **0**               | 0                                                                         | 多级渐远纹理最小级别                                                               |
| sampler.<br>maxLOD        | **0**               | 0                                                                         | 多级渐远纹理最大级别。记住，当启用 mipFilter 时，要覆盖此功能                         |
| sampler.<br>mipLODBias    | **0**               | 0                                                                         |                                                                                    |
| editor.<br>displayName    | **\*property name** | \*property name                                                           | 属性最终在材质面板上呈现的名字。任意字符串。                                         |
| editor.<br>type           | **vector**          | vector, color                                                             | 属性类型。                                                                          |
| editor.<br>visible        | **true**            | true, false                                                               | 属性是否需要在材质面板上显示                                                       |
| editor.<br>tooltip        | **\*property name** | \*property name                                                           | 当鼠标移动到属性上，所获得的提示。任意字符串。                                        |
| editor.<br>range          | **undefined**       | undefined, [ min, max, [step] ]                                           | 属性数值限定范围。step 可选，默认不设置的话，则用 **偏好设置/通用设置/数值默认步长**。 |
| editor.<br>rangeMin       | **0**               | 0                                                                         | 属性数值的最小值。等价于 range 的 min。                                              |
| editor.<br>rangeMax       | **0**               | 0                                                                         | 属性数值的最大值。等价于 range 的 max。                                              |
| editor.<br>rangeStep      | **0**               | 0                                                                         | 属性数值的步长。等价于 range 的 step。                                               |
| editor.<br>slide          | **false**           | **true，false**                                                            | 是否启用滑动条。                                                                    |
| editor.<br>deprecated     | **false**           | true, false                                                               | 属性废除。对于使用此 Effect 的材质，在下次保存后会删除此属性的现有数据。              |

### Migrations

一般情况下，在使用材质资源时都希望底层的 Effect 接口能始终向前兼容，但有时面对新的需求最好的解决方案依然是含有一定 breaking change 的，这时为了保持项目中已有的材质资源数据不受影响，或者至少能够更平滑地升级，就可以使用 Effect 的迁移系统。

在 Effect 导入成功后会 **立即更新工程内所有** 依赖于此 Effect 的材质资源，对每个材质资源，会尝试寻找所有指定的旧参数数据（包括 **property** 和 **宏定义** 两类），然后将其复制或迁移到新属性中。

**注意**：使用迁移功能前请一定先备份好项目工程，以免丢失数据！

对于一个现有的 Effect，迁移字段声明如下：

```yaml
migrations:
  # macros: # macros follows the same rule as properties, without the component-wise features
  # USE_MIAN_TEXTURE: { formerlySerializedAs: USE_MAIN_TEXTURE }
  properties:
    newFloat: { formerlySerializedAs: oldVec4.w }
```

对于一个依赖于这个 effect，并在对应 pass 中持有属性的材质：

```json
{
  "oldVec4": {
    "__type__": "cc.Vec4",
    "x": 1,
    "y": 1,
    "z": 1,
    "w": 0.5
  }
}
```

在 effect 导入成功后，这些数据会被立即转换成：

```json
{
  "oldVec4": {
    "__type__": "cc.Vec4",
    "x": 1,
    "y": 1,
    "z": 1,
    "w": 0.5
  },
  "newFloat": 0.5
}
```

在 **编辑器** 内重新编辑并保存这个材质资源后会变成（假设 Effect 和 properties 数据本身并没有改变）：

```json
{
  "newFloat": 0.5
}
```

当然如果希望在导入时就直接删除旧数据，可以再加一条迁移信息来专门指定这点：

```yaml
oldVec4: { removeImmediately: true }
```

这对于在项目有大量旧材质，又能够确定这个属性的数据已经完全冗余时会比较有用。

更多地，注意这里的通道指令只是简单的取 `w` 分量，事实上还可以做任意的 shuffle：

```yaml
newColor: { formerlySerializedAs: someOldColor.yxx }
```

甚至基于某个宏定义：

```yaml
occlusion: { formerlySerializedAs: pbrParams.<OCCLUSION_CHANNEL|z> }
```

这里声明了新的 occlusion 属性会从旧的 `pbrParams` 中获取，而具体的分量取决于 `OCCLUSION_CHANNEL` 宏定义。并且如果材质资源中未定义这个宏，则默认取 `z` 通道。<br>
但如果某个材质在迁移升级前就已经存着 `newFloat` 字段的数据，则不会对其做任何修改，除非指定为强制更新模式：

```yaml
newFloat: { formerlySerializedAs: oldVec4.w! }
```

强制更新模式会强制更新所有材质的属性，无论这个操作是否会覆盖数据。

**注意**：强制更新操作会在编辑器的每次资源事件中都执行（几乎对应每一次鼠标点击，相对高频），因此只是一个快速测试和调试的手段，一定不要将处于强制更新模式的 effect 提交到版本控制。

再次总结一下为防止数据丢失所设置的相关规则：
- 为避免有效旧数据丢失，只要没有显式指定 `removeImmediately` 规则，就不会在导入时自动删除旧数据；
- 为避免有效的新数据被覆盖，如果没有指定为强制更新模式，对于那些既有旧数据，又有对应的新数据的材质，不会做任何迁移操作。

### RasterizerState

| 参数名   | 说明           | 默认值   | 可选项            |
|----------|--------------|----------|-------------------|
| cullMode | 渲染时剔除的面 | **back** | front, back, none |

## DepthStencilState

3D 世界里，所有的物体都有景深，就会体现近大远小的效果。例如一个木头箱子，摆在离视觉区近的位置显示的更大，远的位置显示的小。那在渲染时如何保证物体之间的遮挡关系，就可以通过深度缓冲检测物体深度，以防止更远的物体遮挡住近的物体。模版测试在最终渲染时能丢弃一些片段，可以让一个本来能全屏显示的物体只显示在屏幕的某一个区域。

深度模版测试（DepthStencilState）可以通过材质面板 **PipelineStates/DepthStencilState** 修改。也可以通过代码修改:

```ts
const meshComp = this.getComponent(MeshRenderer)!;
const mat = meshComp.material!;
mat.overridePipelineStates({ depthStencilState: { depthTest: true } });
```

深度模版测试参数如下：

| 参数名              | 说明                                                                         | 默认值         | 可选项                                                                    |
|---------------------|----------------------------------------------------------------------------|----------------|---------------------------------------------------------------------------|
| depthTest           | 是否开启深度测试                                                             | **true**       | true, false                                                               |
| depthWrite          | 是否启用深度写入                                                             | **true**       | true, false                                                               |
| depthFunc           | 深度对比功能                                                                 | **less**       | never, less, equal, less_equal, greater, not_equal, greater_equal, always |
| stencilTest         | 是否开启模版测试                                                             | **false**      | true, false                                                               |
| stencilFunc         | 模版测试功能                                                                 | **always**     | never, less, equal, less_equal, greater, not_equal, greater_equal, always |
| stencilReadMask     | 指定的位掩码，用于在完成测试时对参考值和存储的模板值进行“与”运算。默认值为全1。 | **0xffffffff** | 0xffffffff, `[1, 1, 1, 1]`                                                |
| stencilWriteMask    | 指定的位掩码，用于启用或禁用在模板平面中写入各个位。缺省情况下，掩码为全1       | **0xffffffff** | 0xffffffff, `[1, 1, 1, 1]`                                                |
| stencilFailOp       | 如果模板测试失败将采取的动作                                                 | **keep**       | keep, zero, replace, incr, incr_wrap, decr, decr_wrap, invert             |
| stencilZFailOp      | 如果模板测试通过，但是深度测试失败时采取的动作                                | **keep**       | keep, zero, replace, incr, incr_wrap, decr, decr_wrap, invert             |
| stencilPassOp       | 如果模板测试和深度测试都成功时采取的动作                                     | **keep**       | keep, zero, replace, incr, incr_wrap, decr, decr_wrap, invert             |
| stencilRef          | 模板测试的参考值                                                             | **1**          | 1, `[0, 0, 0, 1]`                                                         |
| stencil\*Front/Back | 模版测试都可以指定正面和/或背面，例如：`stencilTestFront`, `stencilTestBack`   |                | **\* 代表列表上述所有 stencil 都适用**                                    |

### BlendState

对于大多数物体来说，在同一个区域，要么只能显示 A 物体，要么只能显示 B 物体。如果此时，在你面前的是一面半透明的窗户，在真实世界中，是可以透过窗户看到窗户里的成像，要想让此区域最终成像能是窗户内的画面，则可以通过混合模式对图像进行混合。

混合模式（BlendState）和深度模版测试一样，也可以通过材质面板 **PipelineStates/DepthStencilState** 修改。也可以通过代码修改:

```ts
const meshComp = this.getComponent(MeshRenderer)!;
const mat = meshComp.material!;
mat.overridePipelineStates({ blendState: { blendColor: new Color(128, 128, 128, 255) } });
```

| 参数名     | 说明    | 默认值 | 可选项            |
|------------|-------|--------|-------------------|
| BlendColor | 混合色。 | **0**  | 0, `[0, 0, 0, 0]` |
| Targets    | 混合组。 | **false** | **false** | true, false  |
| targets[i].<br>blend          | 是否启用混合。 | **false** | true, false                                                               |
| targets[i].<br>blendEq        | 指定源颜色和目标颜色的红色，绿色和蓝色成分如何组合。 | **add** | add, sub, rev_sub                                                           |
| targets[i].<br>blendSrc       | 源颜色向量。这是来自纹理的本来的颜色向量。 | **one** | one, zero, src_alpha_saturate,<br>src_alpha, one_minus_src_alpha,<br>dst_alpha, one_minus_dst_alpha,<br>src_color, one_minus_src_color,<br>dst_color, one_minus_dst_color,<br>constant_color, one_minus_constant_color,<br>constant_alpha, one_minus_constant_alpha |
| targets[i].<br>blendDst       | 目标颜色向量。这是储存在颜色缓冲中当前位置的颜色向量。 | **zero** | one, zero, src_alpha_saturate,<br>src_alpha, one_minus_src_alpha,<br>dst_alpha, one_minus_dst_alpha,<br>src_color, one_minus_src_color,<br>dst_color, one_minus_dst_color,<br>constant_color, one_minus_constant_color,<br>constant_alpha, one_minus_constant_alpha |
| targets[i].<br>blendSrcAlpha  | 源因子。设置了对源颜色的 alpha 值影响。 | **one** | one, zero, src_alpha_saturate,<br>src_alpha, one_minus_src_alpha,<br>dst_alpha, one_minus_dst_alpha,<br>src_color, one_minus_src_color,<br>dst_color, one_minus_dst_color,<br>constant_color, one_minus_constant_color,<br>constant_alpha, one_minus_constant_alpha |
| targets[i].<br>blendDstAlpha  | 目标因子。设置了对目标颜色的 alpha 影响。 | **zero** | one, zero, src_alpha_saturate,<br>src_alpha, one_minus_src_alpha,<br>dst_alpha, one_minus_dst_alpha,<br>src_color, one_minus_src_color,<br>dst_color, one_minus_dst_color,<br>constant_color, one_minus_constant_color,<br>constant_alpha, one_minus_constant_alpha |
| targets[i].<br>blendAlphaEq   | 指定如何将源颜色和目标颜色的alpha分量（透明度）组合在一起。 | **add** | add, sub, rev_sub                                                           |
| targets[i].<br>blendColorMask | 开启或关闭的颜色分量。 | **all** | all, none, r, g, b, a, rg, rb, ra, gb, ga, ba, rgb, rga, rba, gba           |

### Default Values

| 类型        | 默认值           | 可选项                               |
|-------------|------------------|--------------------------------------|
| int         |                  | 0                                    |
| ivec2       |                  | [0, 0]                               |
| ivec3       |                  | [0, 0, 0]                            |
| ivec4       |                  | [0, 0, 0, 0]                         |
| float       |                  | 0                                    |
| vec2        |                  | [0, 0]                               |
| vec3        |                  | [0, 0, 0]                            |
| vec4        |                  | [0, 0, 0, 0]                         |
| sampler2D   | **default**      | black, grey, white, normal, default  |
| samplerCube | **default-cube** | black-cube, white-cube, default-cube |

对于 defines：
- boolean 类型默认值为 false。
- number 类型默认值为 0，默认取值范围为 [0, 3]。
- string 类型默认值为 options 数组第一个元素。

### 参考链接

- <https://learnopengl-cn.readthedocs.io/zh/latest/04%20Advanced%20OpenGL/03%20Blending/>
- <https://learnopengl-cn.readthedocs.io/zh/latest/04%20Advanced%20OpenGL/01%20Depth%20testing/>
- <https://learnopengl-cn.readthedocs.io/zh/latest/04%20Advanced%20OpenGL/02%20Stencil%20testing/>
- <https://learnopengl-cn.readthedocs.io/zh/latest/04%20Advanced%20OpenGL/04%20Face%20culling/>
