# Pass 可选配置参数

Pass 中的参数主要分两个部分：
- 开发者可自定义的 **属性检查器** 面板参数 `properties`
- 引擎提供的用于控制渲染管线状态的 `PipelineStates`

## Properties

`properties` 用于将 Shader 中定义的 `uniform` 进行别名映射。这个映射可以是某个 `uniform` 的完整映射，也可以是具体某个分量的映射（使用 `target` 参数），代码示例如下：

```yaml
properties:
  albedo: { value: [1, 1, 1, 1] } # uniform vec4 albedo
  roughness: { value: 0.8, target: pbrParams.g } # uniform vec4 pbrParams
  offset: { value: [0, 0], target: tilingOffset.zw } # uniform vec4 tilingOffset
# say there is another uniform, vec4 emissive, that doesn't appear here
# so it will be assigned a default value of [0, 0, 0, 0] and will not appear in the inspector
```

默认情况下，`properties` 中定义的属性参数会暴露并显示在编辑器的 **属性检查器** 面板中，方便进行可视化控制。

如果不想显示在 **属性检查器** 面板上，可在定义属性时加上 `editor: { visible: false }`，代码示例如下：

```yaml
properties:
  factor: { value: 1.0, editor: { visible: false } }
```

在 TypeScript 中可以使用 `Material` 类的 `setProperty` 方法以及 `Pass` 的 `setUniform` 方法进行设置，代码示例如下：

```js
mat.setProperty('emissive', Color.GREY); // 直接设置对应的 Uniform 变量
mat.setProperty('albedo', Color.RED); 
mat.setProperty('roughness', 0.2); // 仅设置对应的分量
const h = mat.passes[0].getHandle('offset'); // 获取对应的 Uniform 的句柄
mat.passes[0].setUniform(h, new Vec2(0.5, 0.5)); // 使用 ‘Pass.setUniform’ 设置 Uniform 属性
```

> **注意**：在 Shader 中定义的 `uniform` 也可以使用上述代码进行设置，即使没有在 `properties` 中定义。

未指定的 `uniform`，引擎将会在运行时根据自动分析出的数据类型给予默认值。更多关于默认值的内容，请参考下文说明。

为方便声明各 `property` 子属性，可以直接在 `properties` 内声明 `__metadata__` 项，所有 `property` 都会继承它声明的内容，如：

```yaml
properties:
  __metadata__: { editor: { visible: false } }
  a: { value: [1, 1, 0, 0] }
  b: { editor: { type: color } }
  c: { editor: { visible: true } }
```

这样 uniform `a` 和 `b` 已声明的各项参数都不会受到影响，但都不会显示在 **属性检查器** 中（visible 为 false），而 uniform `c` 仍会正常显示。

### Property 参数列表

Property 中可配置的参数如下表所示，任何可配置的字段如果和默认值相同都可以省掉。

| 参数 | 默认值 | 可选项  | 备注 |
| :--- | :---- | :---- | :-- |
| target   | **undefined** | undefined | 任意有效的 uniform 通道，可指定连续的单个或多个，但不可随机重排 |
| value    |                 |  | 详见下文 **Default Values** 部分的介绍      |
| sampler.<br>minFilter | **linear** | none, point, linear, anisotropic |    |
| sampler.<br>magFilter | **linear** | none, point, linear, anisotropic |    |
| sampler.<br>mipFilter | **none**   | none, point, linear, anisotropic |    |
| sampler.<br>addressU  | **wrap**   | wrap, mirror, clamp, border      |    |
| sampler.<br>addressV  | **wrap**   | wrap, mirror, clamp, border      |    |
| sampler.<br>addressW  | **wrap**   | wrap, mirror, clamp, border      |    |
| sampler.<br>maxAnisotropy | **16** | 16                               |    |
| sampler.<br>cmpFunc       | **never**           | never, less, equal, less_equal, greater, not_equal, greater_equal, always |    |
| sampler.<br>borderColor   | **[0, 0, 0, 0]**    | [0, 0, 0, 0]           |    |
| sampler.<br>minLOD        | **0** | 0  |    |
| sampler.<br>maxLOD        | **0** | 0  | Remember to override this when enabling mip filter |
| sampler.<br>mipLODBias    | **0** | 0  |    |
| editor.<br>displayName    | **\*property name** | \*property name     | 任意字符串 |
| editor.<br>type           | **vector** | vector, color                |      |
| editor.<br>visible        | **true**   | true, false                  |      |
| editor.<br>tooltip        | **\*property name** | \*property name     | 任意字符串 |
| editor.<br>range          | **undefined** | undefined, [ min, max, [step] ]  |   |
| editor.<br>deprecated     | **false**  | true, false | For any material using this effect, delete the existing data for this property after next saving |

### Property 默认值

对于 Property 的默认值， Cocos Effect 做出了如下的规定：

| 类型        |  默认值 | 可选项   |
| :---------- | :----- | :------ |
| int         |  | 0                                        |
| ivec2       |  | [0, 0]                                   |
| ivec3       |  | [0, 0, 0]                                |
| ivec4       |  | [0, 0, 0, 0]                             |
| float       |  | 0                                        |
| vec2        |  | [0, 0]                                   |
| vec3        |  | [0, 0, 0]                                |
| vec4        |  | [0, 0, 0, 0]                             |
| sampler2D   | **default**      | black, grey, white, normal, default  |
| samplerCube | **default-cube** | black-cube, white-cube, default-cube |

对于 `defines`：
- boolean 类型默认值为 false。
- number 类型默认值为 0，默认取值范围为 [0, 3]。
- string 类型默认值为 options 数组第一个元素。

## PipelineStates

以下为 `PipelineStates` 相关参数，所有参数不区分大小写。

| 参数名 | 说明 | 默认值  | 备注 |
| :---- | :-- | :----- | :--- |
| switch         | 指定这个 pass 的执行依赖于哪个 define。可以是任意有效的宏名称，但不应与使用到的 shader 中定义的任何 define 重名 | 未定义 | 这个字段默认是不存在的，意味着这个 pass 是无条件执行的 |
| priority       | 指定这个 pass 的渲染优先级，数值越小渲染优先级越高，取值范围为 **0 ~ 255** | 128 | 可结合四则运算符指定相对值 |
| stage          | 指定这个 pass 归属于管线的哪个 stage。可以是运行时管线中任何注册的 Stage 名称 | **default** | 对于默认的 forward 管线，只有 `default` 一个 stage |
| phase          | 指定这个 pass 归属于管线的哪个 phase。可以是运行时管线中任何注册的 Phase 名称 | **default** | 对于默认的 forward 管线，可以是 `default`、`forward-add` 或者 `shadow-caster`  |
| propertyIndex  | 指定这个 pass 运行时的 uniform 属性数据要和哪个 pass 保持一致，例如 forward add 等 pass 需要和 base pass 一致才能保证正确的渲染效果。可以是任意有效的 pass 索引 | 未定义 | 一旦指定了此参数，材质面板上就不会再显示这个 pass 的任何属性 |
| embeddedMacros | 指定在这个 pass 的 shader 基础上额外定义的常量宏，可以是一个包含任意宏键值对的对象 | 未定义 | 只有当宏定义不同时才能在多个 pass 中使用此参数来复用 shader 资源 |
| properties     | Properties 存储着这个 pass 中需要显示在 **属性检查器** 上的可定制的参数 |                 | 详见上文 **Properties** 部分的内容    |
| migrations     | 迁移旧的材质数据  |           | 详见下文 **Migrations** 部分的介绍                                                     |
| primitive      | 创建材质顶点数据    | **triangle_list** | 可选项包括：point_list、line_list、line_strip、line_loop<br>**triangle_list**、triangle_strip、triangle_fan<br>line_list_adjacency、line_strip_adjacency<br>triangle_list_adjacency、triangle_strip_adjacency<br>triangle_patch_adjacency、quad_patch_list、iso_line_list |
| RasterizerState   | 光栅化时的可选渲染状态 |  | 详见下文 **RasterizerState** 部分的介绍 |
| DepthStencilState | 深度和模板缓存的测试与状态 |  | 详见下文 **DepthStencilState** 部分的介绍    |
| BlendState        | 材质混合状态 | **false** | 详见下文 **BlendState** 部分的介绍 |

## Migrations

一般情况下，在使用材质资源时都希望底层的 effect 接口能始终向前兼容，但有时面对新的需求最好的解决方案依然是含有一定 breaking change 的，这时为了保持项目中已有的材质资源数据不受影响，或者至少能够更平滑地升级，就可以使用 effect 的迁移系统。

在 effect 导入成功后会 **立即更新工程内所有** 依赖于此 effect 的材质资源，对每个材质资源，会尝试寻找所有指定的旧参数数据（包括 **property** 和 **宏定义** 两类），然后将其复制或迁移到新属性中。

> **注意**：使用迁移功能前请一定先备份好项目工程，以免丢失数据！

对于一个现有的 effect，迁移字段声明如下：

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

在 **编辑器** 内重新编辑并保存这个材质资源后会变成（假设 effect 和 property 数据本身并没有改变）：

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

## RasterizerState

| 参数名      | 说明 | 默认值  | 可选项 |
| :--------- | :-- | :----- | :--- |
| isDiscard | 引擎预留 | **false** | true, false |
| polygonMode | 多边形绘制模式 | **fill** | point，line，fill|
| shadeModel | 着色模型 | **flat** | flat, gourand|
| cullMode | 光栅化时剔除模式 | **back** | front, back, none  |
| isFrontFaceCCW| 是否逆时针（CCW）前向 | **true** | true，false|
| depthBias| 深度偏移 | **0** |
| depthBiasSlop | 深度偏差斜率 | **0** |
| depthBiasClamp | 深度截断 | **0** | |
| isDepthClip | 允许深度剪裁操作<br> [Vulkan](https://www.khronos.org/registry/vulkan/specs/1.3-extensions/man/html/VK_EXT_depth_clip_enable.html) 专用 | **true** | true, false
| isMultisample| 是否开启多重采样 | **false** | true, false
| lineWidth | 线宽 | 1 |

## DepthStencilState

| 参数名      | 说明 | 默认值  | 可选项 |
| :--------- | :-- | :----- | :--- |
| depthTest | 是否开启深度测试 | **true** | true,false |
| depthWrite | 是否开启深度缓存写入 | **true** |true, false |
| depthFunc | 深度缓存比较方法 | **less** | never, less, equal, less_equal, greater, not_equal, greater_equal, always |
| stencilTestFront | 是否开启正面模板缓存测试 | **false**  | true, false |
| stencilFuncFront | 正面模板缓存比较方法 | **always** | never, less, equal, less_equal, greater, not_equal, greater_equal, always |
| stencilReadMaskFront | 正面模板缓存读取掩码 | **0xffffffff** | 0xffffffff, `[1, 1, 1, 1]` |
| stencilWriteMaskFront | 正面模板缓存写入掩码 | **0xffffffff** | 0xffffffff, `[1, 1, 1, 1]`|
| stencilFailOpFront | 正面模板缓存测试失败时，如何处理缓冲区的值   | **keep** | keep, zero, replace, incr, incr_wrap, decr, decr_wrap, invert |
| stencilZFailOpFront | 正面模板缓存深度测试失败时，如何处理缓冲区的值 | **keep** | keep, zero, replace, incr, incr_wrap, decr, decr_wrap, invert |
| stencilPassOpFront | 正面模板缓存测试通过时，如何处理缓冲区的值   | **keep** | keep, zero, replace, incr, incr_wrap, decr, decr_wrap, invert |
| stencilRefFront | 正面模板缓存中的比较函数用于比较的值 | **1**    | 1, `[0, 0, 0, 1]`                                                           |
| stencilTestBack | 是否开启背面模板缓存测试 | **false** | true, false                                                               |
| stencilFuncBack | 背面模板缓存比较方法 | **always** | never, less, equal, less_equal, greater, not_equal, greater_equal, always |
| stencilReadMaskBack | 背面模板缓存读取掩码 | **0xffffffff** | 0xffffffff, `[1, 1, 1, 1]`
| stencilWriteMaskBack | 背面模板缓存写入掩码 | **0xffffffff** | 0xffffffff, `[1, 1, 1, 1]` |
| stencilFailOpBack | 背面模板缓存测试失败时，如何处理缓冲区的值   | **keep** | keep, zero, replace, incr, incr_wrap, decr, decr_wrap, invert |
| stencilZFailOpBack | 背面模板缓存深度测试失败时，如何处理缓冲区的值  | **keep** | keep, zero, replace, incr, incr_wrap, decr, decr_wrap, invert |
| stencilRefBack | 背面模板缓存中的比较函数用于比较的值   | **1**    | 1, `[0, 0, 0, 1]` |

## BlendState

| 参数名 | 说明 | 默认值 | 可选项 |
| :--- | :--- |:--- | :--- |
| isA2C | 是否开启半透明反锯齿（Alpha To Coverage）| **false** | true，false
| isIndepend | RGB 和 Alpha 是否分开混合 | **false** | true，false
| blendColor | 指定混合颜色 | **0** | 0, `[0, 0, 0, 0]` |
| targets    | 混合配置, 请参考下方的 targets | [] | |

### Targets

| 参数名      | 说明 | 默认值  | 可选项 |
| :--------- | :--- | :----- | :--- |
| Targets[i].<br>blend          | 是否开启 **混合** | **false** | true, false                                                               |
| Targets[i].<br>blendEq        | 指定 **混合源** 和 **混合目标** 的 RGB 的混合方程 | **add** | add, sub, rev_sub                                                           |
| Targets[i].<br>blendSrc       | 指定 **混合源** 的 RGB 混合因子 | **one** | one, zero, src_alpha_saturate,<br>src_alpha, one_minus_src_alpha,<br>dst_alpha, one_minus_dst_alpha,<br>src_color, one_minus_src_color,<br>dst_color, one_minus_dst_color,<br>constant_color, one_minus_constant_color,<br>constant_alpha, one_minus_constant_alpha |
| Targets[i].<br>blendDst       | 指定 **混合目标** 的 RGB 混合因子 | **zero** | one, zero, src_alpha_saturate,<br>src_alpha, one_minus_src_alpha,<br>dst_alpha, one_minus_dst_alpha,<br>src_color, one_minus_src_color,<br>dst_color, one_minus_dst_color,<br>constant_color, one_minus_constant_color,<br>constant_alpha, one_minus_constant_alpha |
| Targets[i].<br>blendSrcAlpha  | 指定 **混合源** 的 Alpha 混合因子 | **one** | one, zero, src_alpha_saturate,<br>src_alpha, one_minus_src_alpha,<br>dst_alpha, one_minus_dst_alpha,<br>src_color, one_minus_src_color,<br>dst_color, one_minus_dst_color,<br>constant_color, one_minus_constant_color,<br>constant_alpha, one_minus_constant_alpha |
| Targets[i].<br>blendDstAlpha  |  指定 **混合目标** 的 Alpha 混合因子 | **zero** | one, zero, src_alpha_saturate,<br>src_alpha, one_minus_src_alpha,<br>dst_alpha, one_minus_dst_alpha,<br>src_color, one_minus_src_color,<br>dst_color, one_minus_dst_color,<br>constant_color, one_minus_constant_color,<br>constant_alpha, one_minus_constant_alpha |
| Targets[i].<br>blendAlphaEq   |  指定 **混合源** 与 **混合目标** 的 Alpha 混合方法 | **add** | add, sub, rev_sub                                                           |
| Targets[i].<br>blendColorMask | 指定是否可将 RGB，Alpha 分量写入帧缓存 | **all** | all, none, r, g, b, a, rg, rb, ra, gb, ga, ba, rgb, rga, rba, gba           |
| dynamics | 可动态更新的管线状态  | [] |    LINE_WIDTH, DEPTH_BIAS, BLEND_CONSTANTS, DEPTH_BOUNDS, STENCIL_WRITE_MASK, STENCIL_COMPARE_MASK |
