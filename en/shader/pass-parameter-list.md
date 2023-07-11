# Optional Pass Parameters

The parameters in Pass are mainly divided into two parts:
- Developer-customizable **Inspector** panel parameter `properties`.
- `PipelineStates` provided by the engine to control the rendering pipeline state.

## Properties

`properties` is used to alias the `uniform` defined in the shader. This mapping can be a complete mapping of a `uniform`, or a mapping of a specific component (using the `target` parameter), the code example is as follows:

```yaml
properties:
  albedo: { value: [1, 1, 1, 1] } # uniform vec4 albedo
  roughness: { value: 0.8, target: pbrParams.g } # uniform vec4 pbrParams
  offset: { value: [0, 0], target: tilingOffset.zw } # uniform vec4 tilingOffset
# say there is another uniform, vec4 emissive, that doesn't appear here
# so it will be assigned a default value of [0, 0, 0, 0] and will not appear in the inspector
```

By default, property parameters defined in `properties` are exposed and displayed in the **Inspector** panel of the editor for easy visual control.

If you don't want to show the properties on the **Inspector** panel, you can add `editor: { visible: false }` when defining the property, the code example is as follows:

```yaml
properties:
  factor: { value: 1.0, editor: { visible: false } }
```

In TypeScript, you can use the `setProperty` method of the `Material` class and the `setUniform` method of `Pass` to set pass properties, the code example is as follows:

```js
mat.setProperty('emissive', Color.GREY); // Directly set the corresponding ‘Uniform’ variable
mat.setProperty('albedo', Color.RED); 
mat.setProperty('roughness', 0.2); // Set only the corresponding component
const h = mat.passes[0].getHandle('offset'); // Get the handle of the corresponding Uniform
mat.passes[0].setUniform(h, new Vec2(0.5, 0.5)); // Use 'Pass.setUniform' to set the Uniform property
```

> **Note**: `uniform` defined in Effect can also be set using the above code, even if not defined in `properties`.

If `uniform` is not specified, Engine will give a default value at runtime based on the automatically parsed data type. For more information on default values, please refer to the description below.

In order to conveniently declare each `property` sub-property, you can directly declare the `__metadata__` item in `properties`, and all `property` will inherit its declared content, such as:

```yaml
properties:
  __metadata__: { editor: { visible: false } }
  a: { value: [1, 1, 0, 0] }
  b: { editor: { type: color } }
  c: { editor: { visible: true } }
```

In this way, the declared parameters of uniform `a` and `b` will not be affected, but will not be displayed in the **Inspector** (visible is false), and uniform `c` will still be displayed normally .

### Property parameter list

The configurable parameters in Property are shown in the table below. Any configurable fields can be omitted if they are the same as the default values.

| parameter | default value | option  | remark |
| :--- | :---- | :---- | :-- |
| target   | **undefined** | undefined | Any valid uniform channel, which can specify a single or multiple consecutive channels, but cannot be randomly rearranged |
| value    |                 |  | See the introduction in the **Default Values** section below |
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
| sampler.<br>maxLOD        | **0** | 0  | If mipmap is allowed, the maximum mip value should be modified according to the map |
| sampler.<br>mipLODBias    | **0** | 0  |    |
| editor.<br>displayName    | **\*property name** | \*property name     | any string |
| editor.<br>type           | **vector** | vector, color                |      |
| editor.<br>visible        | **true**   | true, false                  |      |
| editor.<br>tooltip        | **\*property name** | \*property name     | any string |
| editor.<br>range          | **undefined** | undefined, [ min, max, [step] ]  |   |
| editor.<br>deprecated     | **false**  | true, false | Data marked deprecated means that it was updated when imported or deprecated in the current version, and its contents are automatically deleted when saved |

### Property default value

For the default value of Property, Cocos Effect makes the following provisions:

| types        |  default values | optional items |
| :---------- | :----- | :------ |
| int         |  0                                        |
| ivec2       |  [0, 0]                                   |
| ivec3       |  [0, 0, 0]                                |
| ivec4       |  [0, 0, 0, 0]                             |
| float       |  0                                        |
| vec2        |  [0, 0]                                   |
| vec3        |  [0, 0, 0]                                |
| vec4        |  [0, 0, 0, 0]                             |
| sampler2D   | **default**      | black, grey, white, normal, default  |
| samplerCube | **default-cube** | black-cube, white-cube, default-cube |

For `defines`, there are the following provisions：
- boolean: The default value of boolean type is false.
- number: The default value of the number type is 0, and the default value range is [0, 3].
- string: The default value of type string is the first element of the options array.

## PipelineStates

The following are `PipelineStates` related parameters, all parameters are case insensitive.

| parameter | description | default value | remark |
| :---- | :-- | :----- | :--- |
| switch         | Specifies which define the execution of this pass depends on. Can be any valid macro name, but should not have the same name as any define defined in the shader used | undefined | This field does not exist by default, meaning this pass is executed unconditionally |
| priority       | Specify the rendering priority of this pass. The smaller the value, the higher the rendering priority. The value range is **0 ~ 255** | 128 | The relative value can be specified in combination with four operators |
| stage          | Specifies which stage of the pipeline this pass belongs to. Can be any registered stage name in the runtime pipeline | **default** | For the default forward pipeline, there is only one stage `default` |
| phase          | Specifies which phase of the pipeline this pass belongs to. Can be any registered Phase name in the runtime pipeline | **default** | For the default forward pipeline, can be `default`, `forward-add` or `shadow-caster` |
| propertyIndex  | Specify which pass the uniform attribute data of this pass runtime should be consistent with. For example, the pass such as forward add needs to be consistent with the base pass to ensure the correct rendering effect. Can be any valid pass index | undefined | Once this parameter is specified, no further properties for this pass will be displayed on the material panel |
| embeddedMacros | Specifies a constant macro that is additionally defined on the basis of the shader of this pass, which can be an object containing any macro key-value pair | undefined | This parameter can be used to reuse shader resources in multiple passes only when the macro definitions are different |
| properties     | Properties stores the customizable parameters of this pass that need to be displayed on the **Inspector** | | See the **Properties** section above for details |
| migrations     | Migrate old material data  |           | See the introduction in the **Migrations** section below for detail                                                     |
| primitive      | Create material vertex data    | **triangle_list** | Options include: point_list, line_list, line_strip, line_loop<br>**triangle_list**, triangle_strip, triangle_fan<br>line_list_adjacency, line_strip_adjacency<br>triangle_list_adjacency, triangle_strip_adjacency<br>triangle_patch_adjacency, quad_patch_list, iso_line_list |
| RasterizerState   | Optional render state when rasterizing |  | See the introduction in the **RasterizerState** section below |
| DepthStencilState | Testing and Status of Depth and Stencil Caches |  | See the introduction of the **DepthStencilState** section below |
| BlendState        | Material blend state | **false** | See the introduction in the **BlendState** section below|

## Migrations

In general, when using material system, it is hoped that the underlying effect interface will always be forward compatible, but sometimes the best solution for new requirements still contains certain breaking changes. The material resource data is not affected, or at least can be updated more smoothly, using the effect's migration system.

After the effect is imported successfully, it will **immediately update all the material resources in the project** that depend on this effect. For each material asset, it will try to find all the specified old parameter data (including **property** and **macro definitions**) and then copy or migrate it into the new property.

> **Note**: Please back up the project before using the migration function to avoid data loss!

For an existing effect, the migration field is declared as follows:

```yaml
migrations:
  # macros: # macros follows the same rule as properties, without the component-wise features
  # USE_MAIN_TEXTURE: { formerlySerializedAs: USE_MAIN_TEXTURE }
  properties:
    newFloat: { formerlySerializedAs: oldVec4.w }
```

For a material that depends on this effect and holds properties in the corresponding pass:

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

Immediately after the effect is imported, the data is converted into:

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

After re-editing and saving this material asset in the **editor** it will become (assuming the effect and property data themselves have not changed):

```json
{
  "newFloat": 0.5
}
```

Of course, if you want to delete the old data directly when importing, you can add a migration message to specify this:

```yaml
oldVec4: { removeImmediately: true }
```

This can be useful when the project has a lot of old materials and you can be sure that the data for this property is completely redundant.

Further, note that the channel instruction here simply takes the `w` component, and in fact can do arbitrary shuffles:

```yaml
newColor: { formerlySerializedAs: someOldColor.yxx }
```

Even based on a certain macro definition:

```yaml
occlusion: { formerlySerializedAs: pbrParams.<OCCLUSION_CHANNEL|z> }
```

It is declared here that the new occlusion property is taken from the old `pbrParams`, and the exact component depends on the `OCCLUSION_CHANNEL` macro definition. And if this macro is not defined in the material resource, the `z` channel will be taken by default.<br>
However, if a material already has data in the `newFloat` field before the migration upgrade, no changes will be made to it, unless forced update mode is specified.

```yaml
newFloat: { formerlySerializedAs: oldVec4.w! }
```

The forced update mode forces the properties of all materials to be updated, regardless of whether this operation overwrites the data.

> **Note**: The force update operation is performed on every resource event of the editor (corresponding to almost every mouse click, relatively high frequency), so it is just a means for quick testing and debugging, be sure not to submit the effect in force update mode to version control.

To again summarize the relevant rules set to prevent data loss.
- To avoid loss of valid old data, old data will not be automatically deleted on import, as long as the `removeImmediately` rule is not explicitly specified.
- To avoid valid new data being overwritten, no migration operation will be done for materials that have both old data and corresponding new data if they are not specified as forced update mode.

## RasterizerState

| Parameter Name | Description | Default | Optional |
| :--------- | :-- | :----- | :--- |
| isDiscard | Engine Reserved | **false** | true, false |
| polygonMode | Polygon drawing mode | **fill** | point，line，fill|
| shadeModel | Shading model | **flat** | flat, gourand|
| cullMode | Culling mode on rasterization | **back** | front, back, none |
| isFrontFaceCCW| Counterclockwise (CCW) forward or not | **true** | true，false|
| depthBias| Depth bias | **0** |
| depthBiasSlop | Slope of depth deviation | **0** |
| depthBiasClamp | Depth bias clamp | **0** | |
| isDepthClip | Allows depth clipping operations.<br> Work only on [Vulkan](https://www.khronos.org/registry/vulkan/specs/1.3-extensions/man/html/VK_EXT_depth_clip_enable.html) | **true** | true, false
| isMultisample| Whether to enable multisampling | **false** | true, false
| lineWidth | line | 1 |

## DepthStencilState

| Parameter Name | Description | Default | Optional |
| :--------- | :-- | :----- | :--- |
| depthTest | Whether to open the depth test | **true** | true,false |
| depthWrite | Whether to enable deep buffer writing | **true** |true, false |
| depthFunc | Depth buffer comparison function | **less** | never, less, equal, less_equal, greater, not_equal, greater_equal, always |
| stencilTestFront | Whether to enable the front stencil buffer test | **false**  | true, false |
| stencilFuncFront | Front stencil comparison function | **always** | never, less, equal, less_equal, greater, not_equal, greater_equal, always |
| stencilReadMaskFront | Front stencil read mask  | **0xffffffff** | 0xffffffff, `[1, 1, 1, 1]` |
| stencilWriteMaskFront | Front stencil write mask | **0xffffffff** | 0xffffffff, `[1, 1, 1, 1]`|
| stencilFailOpFront | How to handle buffer values when front stencil buffer test fails | **keep** | keep, zero, replace, incr, incr_wrap, decr, decr_wrap, invert |
| stencilZFailOpFront | How to handle buffer values when front stencil buffer depth test fails | **keep** | keep, zero, replace, incr, incr_wrap, decr, decr_wrap, invert |
| stencilPassOpFront | How to handle the buffer values when the stencil buffer test passes   | **keep** | keep, zero, replace, incr, incr_wrap, decr, decr_wrap, invert |
| stencilRefFront | The comparison function in the front stencil buffer is used to compare the values | **1**    | 1, `[0, 0, 0, 1]`                                                           |
| stencilTestBack | Whether to open the back stencil buffer test | **false** | true, false                                                               |
| stencilFuncBack | Back stencil buffer comparison function | **always** | never, less, equal, less_equal, greater, not_equal, greater_equal, always |
| stencilReadMaskBack | Back stencil buffer read mask | **0xffffffff** | 0xffffffff, `[1, 1, 1, 1]`
| stencilWriteMaskBack | Back stencil buffer write mask | **0xffffffff** | 0xffffffff, `[1, 1, 1, 1]` |
| stencilFailOpBack | How to handle the buffer value when the back stencil buffer test fails   | **keep** | keep, zero, replace, incr, incr_wrap, decr, decr_wrap, invert |
| stencilZFailOpBack | How to handle the buffer value when the back stencil buffer depth test fails | **keep** | keep, zero, replace, incr, incr_wrap, decr, decr_wrap, invert |
| stencilRefBack | The values used for comparison by the compare function in the back stencil buffer | **1**    | 1, `[0, 0, 0, 1]` |

## BlendState

| Parameter Name | Description | Default | Optional |
| :--- | :--- |:--- | :--- |
| isA2C | Whether to enable translucent anti-aliasing (Alpha To Coverage) | **false** | true, false
| isIndepend | whether RGB and Alpha are blended separately | **false** | true, false
| blendColor | Specifies the blend color | **0** | 0, `[0, 0, 0, 0]` |
| targets | Blending configuration, please refer to **Targets** below | [] | |

### Targets

| Parameter Name | Description | Default | Optional |
| :--------- | :--- | :----- | :--- |
| Targets[i].<br>blend          | Whether to enable **Blend** | **false** | true, false                                                               |
| Targets[i].<br>blendEq        | Specify the blend function for RGB for **blend source** and **blend destination** | **add** | add, sub, rev_sub                                                           |
| Targets[i].<br>blendSrc       | Specifies the RGB blend factor of the **blend source**. | **one** | one, zero, src_alpha_saturate,<br>src_alpha, one_minus_src_alpha,<br>dst_alpha, one_minus_dst_alpha,<br>src_color, one_minus_src_color,<br>dst_color, one_minus_dst_color,<br>constant_color, one_minus_constant_color,<br>constant_alpha, one_minus_constant_alpha |
| Targets[i].<br>blendDst       | Specifies the RGB blend factor for the **blend destination**. | **zero** | one, zero, src_alpha_saturate,<br>src_alpha, one_minus_src_alpha,<br>dst_alpha, one_minus_dst_alpha,<br>src_color, one_minus_src_color,<br>dst_color, one_minus_dst_color,<br>constant_color, one_minus_constant_color,<br>constant_alpha, one_minus_constant_alpha |
| Targets[i].<br>blendSrcAlpha  | Specifies the alpha blend factor of the **blend source**. | **one** | one, zero, src_alpha_saturate,<br>src_alpha, one_minus_src_alpha,<br>dst_alpha, one_minus_dst_alpha,<br>src_color, one_minus_src_color,<br>dst_color, one_minus_dst_color,<br>constant_color, one_minus_constant_color,<br>constant_alpha, one_minus_constant_alpha |
| Targets[i].<br>blendDstAlpha  | Specify the alpha blend factor for the **blend destination** | **zero** | one, zero, src_alpha_saturate,<br>src_alpha, one_minus_src_alpha,<br>dst_alpha, one_minus_dst_alpha,<br>src_color, one_minus_src_color,<br>dst_color, one_minus_dst_color,<br>constant_color, one_minus_constant_color,<br>constant_alpha, one_minus_constant_alpha |
| Targets[i].<br>blendAlphaEq   |  Specifies the alpha blending function for **blend source** and **blend destination** | **add** | add, sub, rev_sub                                                           |
| Targets[i].<br>blendColorMask | Specifies whether the RGB, Alpha component can be written to the frame buffer | **all** | all, none, r, g, b, a, rg, rb, ra, gb, ga, ba, rgb, rga, rba, gba           |
| dynamics | Dynamically updatable pipeline status  | [] |    LINE_WIDTH, DEPTH_BIAS, BLEND_CONSTANTS, DEPTH_BOUNDS, STENCIL_WRITE_MASK, STENCIL_COMPARE_MASK |
