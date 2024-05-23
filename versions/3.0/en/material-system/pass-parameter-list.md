# Optional Pass Parameters

The parameters in Pass are mainly divided into two parts: the developer-defined effect parameter and the PipelineStates parameter provided by the engine, this document mainly introduces the parameters related to PipelineStates, all the parameters are case-insensitive.

| Parameter name | Description | Default value | Remark |
| :--------- | :---------- | :------------ | :----- |
| switch     | Specifies a power switch for the current pass. Could be any valid macro name that's not defined in the shader, the macro name shouldn't collide with any existing macros inside the shader | **\*undefined** | This property doesn't exist by default, which means the pass is executed unconditionally |
| priority   | Specifies the rendering priority of the current pass, the bigger the number, the lower the priority | 128 | Could be any number between max(255) and min(0) |
| stage      | Specifies which render `stage` the current pass belongs to. Could be the name of any registered stage in your runtime pipeline | **default** | For the built-in `forward` pipeline, the only available stage is `default` |
| phase      | Specifies which `phase` the current pass belongs to. Could be the name of any registered phase in your runtime pipeline | **default** | For the built-in forward pipeline, the available phases are `default`, `forward-add` and `shadow-caster` |
| propertyIndex | Specifies the index of the pass to copy runtime property data from. When two passes need to share the same set of properties, `propertyIndex` can be specified to avoid the need for developers to specify that same set of data multiple times (especially in the material inspector). This could be useful in some cases, e.g.: the forward add pass vs. the base pass | **\*undefined** | Could be any valid pass index. Once specified, all the properties for the current pass will not be visible in the material inspector |
| embeddedMacros | Specifies additional macro definitions on top of the current shader, could be an object containing any macro key-value pair | **\*undefined** | This parameter can be used to multiplex shader resources in multiple passes only if the macros are defined differently. |
| properties    | Specifies the public interfaces exposed to material instector and runtime API |  | See the **Properties** section below for details |
| migrations    | Migrate old material data |  | See the **Migrations** section below for details                                                     |
| primitive     | Create material vertex data | **triangle_list** | Options include: point_list, line_list, line_strip, line_loop,<br>triangle_list, triangle_strip, triangle_fan,<br>line_list_adjacency, line_strip_adjacency,<br>triangle_list_adjacency, triangle_strip_adjacency,<br>triangle_patch_adjacency, quad_patch_list, iso_line_list |
| dynamics      | 补充说明 | **[]** | An array containing any of the following:<br>viewport, scissor, line_width, depth_bias, blend_constants,<br>depth_bounds, stencil_write_mask, stencil_compare_mask |
| RasterizerState   | 补充说明 |  | See the **RasterizerState** section below for details |
| DepthStencilState | 补充说明 |  | See the **DepthStencilState** section below for details |
| BlendState        | Mixed state of the material | **false** | See the **BlendState** section below for details |

## Properties

Specifies the public interfaces exposed to material instector and runtime API.<br>
It can be a direct mapping to shader uniforms, or specific channels of the uniform:

```yaml
albedo: { value: [1, 1, 1, 1] } # uniform vec4 albedo
roughness: { value: 0.8, target: pbrParams.g } # uniform vec4 pbrParams
offset: { value: [0, 0], target: tilingOffset.zw } # uniform vec4 tilingOffset
# say there is another uniform, vec4 emissive, that doesn't appear here
# so it will be assigned a default value of [0, 0, 0, 0] and will not appear in the inspector
```

Runtime reference is straightforward:

```js
// as long as it is a real uniform
// it doesn't matter whether it is specified in the property list or not
mat.setProperty('emissive', Color.GREY); // this works
mat.setProperty('albedo', Color.RED); // directly set uniform
mat.setProperty('roughness', 0.2); // set certain component
const h = mat.passes[0].getHandle('offset'); // or just take the handle,
mat.passes[0].setUniform(h, new Vec2(0.5, 0.5)); // and use Pass.setUniform interface instead
```

Shader uniforms that are not in the `properties` list will be given a [default value](#default-values).

For quick setup and experiment, the `__metadata__` feature is provided, which will be the 'base class' for all other properties:

```yaml
properties:
  __metadata__: { editor: { visible: false } }
  a: { value: [1, 1, 0, 0] }
  b: { editor: { type: color } }
  c: { editor: { visible: true } }
```

Here `a` and `b` will no longer appear in the inspector, while `c` stays visible.

### Property Parameter List

The configurable parameters in Property are shown in the table below, and any configurable field can be omitted if it is the same as the default value.

| Parameter name | Default value | Options   |  Remark |
| :------------- | :---------- | :------------- | :------- |
| target                    | **undefined** | undefined | Any valid uniform components, no random swizzle |
| value                     |  |  | See the **Default Values** section below for details      |
| sampler.<br>minFilter     | **linear** | none, point, linear, anisotropic |  |
| sampler.<br>magFilter     | **linear** | none, point, linear, anisotropic |  |
| sampler.<br>mipFilter     | **none** | none, point, linear, anisotropic |    |
| sampler.<br>addressU      | **wrap** | wrap, mirror, clamp, border      |    |
| sampler.<br>addressV      | **wrap** | wrap, mirror, clamp, border      |    |
| sampler.<br>addressW      | **wrap** | wrap, mirror, clamp, border      |    |
| sampler.<br>maxAnisotropy | **16**   | 16                               |    |
| sampler.<br>cmpFunc       | **never** | never, less, equal, less_equal, greater, not_equal, greater_equal, always |    |
| sampler.<br>borderColor   | **[0, 0, 0, 0]** | [0, 0, 0, 0]             |    |
| sampler.<br>minLOD        | **0**    | 0     |    |
| sampler.<br>maxLOD        | **0**    | 0     | Remember to override this when enabling mip filter |
| sampler.<br>mipLODBias    | **0**    |       |    |
| editor.<br>displayName    | **\*property name** | \*property name | Any string   |
| editor.<br>type           | **vector** | vector, color           |  |
| editor.<br>visible        | **true** | true, false  |            |
| editor.<br>tooltip        | **\*property name** | \*property name  | Any string |
| editor.<br>range          | **undefined** | undefined, [ min, max, [step] ]  |  |
| editor.<br>deprecated     | **false** | true, false | For any material using this effect, delete the existing data for this property after next saving |

## Migrations

Ideally the public interface of an effect should always be backward-compatible, but occasionally introducing breaking changes might become the only option as the project iterate. A smooth data transition would be much desired during the process, which leads to the migration system.

After an effect with migrations is successfully compiled, all the dependent material assets will be immediately updated, new property will be automatically migrated/generated from existing data using specified rules.

> **Note**: please remember to backup your project before doing any migration attemps!

For a existing effect, declares the following migration rules:

```yaml
migrations:
  # macros: # macros follows the same rule as properties, without the component-wise features
  #   USE_MIAN_TEXTURE: { formerlySerializedAs: USE_MAIN_TEXTURE }
  properties:
    newFloat: { formerlySerializedAs: oldVec4.w }
```

Say we have a dependent material, with the following data:

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

After the effect is compiled, the material will be automatically updated to:

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

And after the next save operation on this material: (say the content is actually not changed)

```json
{
  "newFloat": 0.5
}
```

We are just using the `w` channel here, while in fact arbitrary shuffle is supported too:

```yaml
newColor: { formerlySerializedAs: someOldColor.yxx }
```

Or even based on a target macro:

```yaml
occlusion: { formerlySerializedAs: pbrParams.<OCCLUSION_CHANNEL|z> }
```

This means the new `occlusion` data will be extracted from `pbrParams` data, the specific channel depend on the `OCCLUSION_CHANNEL` macro of current pass, and default to channel `z` if macro data not present.<br>
If `newFloat` property already exists before migration, nothing will happen, unless in force mode:

```yaml
newFloat: { formerlySerializedAs: oldVec4.w! }
```

Then the migration is guaranteed to execute, regardless of the existing data.<br>

> **Note**: migration in force mode will execute in every database event, which is basically every mouse click in editor. So use it as a quick-and-dirty test measure, and be sure not to submit effect files with force mode migrations into version control.

Again here are the bottomline rules about preventing potential data losses:<br>
- Property removal will happen if, and only if, you specify the `removeImmediately` entry explicitly.
- Property override will happen if, and only if, you end the `formerlySerializedAs` entry with `!` (force mode)

## RasterizerState

| Parameter name | Description | Default value | Options |
| :------------- | :-- | :----- | :--- |
| cullMode | 补充说明 | **back** | front, back, none |

## DepthStencilState

| Parameter name | Description | Default value | Options |
| :------------- | :-- | :----- | :--- |
| depthTest        | 补充说明   | **true** | true, false                                                                 |
| depthWrite       | 补充说明   | **true** |true, false                                                                  |
| depthFunc        | 补充说明   | **less** | never, less, equal, less_equal, greater, not_equal, greater_equal, always   |
| stencilTest      | 补充说明   | **false**  | true, false                                                               |
| stencilFunc      | 补充说明   | **always** | never, less, equal, less_equal, greater, not_equal, greater_equal, always |
| stencilReadMask  | 补充说明   | **0xffffffff** | 0xffffffff, `[1, 1, 1, 1]`                                            |
| stencilWriteMask | 补充说明   | **0xffffffff** | 0xffffffff, `[1, 1, 1, 1]`                                            |
| stencilFailOp    | 补充说明   | **keep** | keep, zero, replace, incr, incr_wrap, decr, decr_wrap, invert               |
| stencilZFailOp   | 补充说明   | **keep** | keep, zero, replace, incr, incr_wrap, decr, decr_wrap, invert               |
| stencilPassOp    | 补充说明   | **keep** | keep, zero, replace, incr, incr_wrap, decr, decr_wrap, invert               |
| stencilRef       | 补充说明   | **1**    | 1, `[0, 0, 0, 1]`                                                           |
| stencil\*Front/Back | 补充说明  |        | **\*set above stencil properties for specific side**                        |

## BlendState

| Parameter name | Description | Default value | Options |
| :------------- | :--- | :----- | :--- |
| BlendColor | 补充说明 | **0** | 0, `[0, 0, 0, 0]`  |
| Targets    | 补充说明 | **false** | **false** | true, false  |
| targets[i].<br>blend          | 补充说明 | **false** | true, false                                                               |
| targets[i].<br>blendEq        | 补充说明 | **add** | add, sub, rev_sub                                                           |
| targets[i].<br>blendSrc       | 补充说明 | **one** | one, zero, src_alpha_saturate,<br>src_alpha, one_minus_src_alpha,<br>dst_alpha, one_minus_dst_alpha,<br>src_color, one_minus_src_color,<br>dst_color, one_minus_dst_color,<br>constant_color, one_minus_constant_color,<br>constant_alpha, one_minus_constant_alpha |
| targets[i].<br>blendDst       | 补充说明 | **zero** | one, zero, src_alpha_saturate,<br>src_alpha, one_minus_src_alpha,<br>dst_alpha, one_minus_dst_alpha,<br>src_color, one_minus_src_color,<br>dst_color, one_minus_dst_color,<br>constant_color, one_minus_constant_color,<br>constant_alpha, one_minus_constant_alpha |
| targets[i].<br>blendSrcAlpha  | 补充说明 | **one** | one, zero, src_alpha_saturate,<br>src_alpha, one_minus_src_alpha,<br>dst_alpha, one_minus_dst_alpha,<br>src_color, one_minus_src_color,<br>dst_color, one_minus_dst_color,<br>constant_color, one_minus_constant_color,<br>constant_alpha, one_minus_constant_alpha |
| targets[i].<br>blendDstAlpha  | 补充说明 | **zero** | one, zero, src_alpha_saturate,<br>src_alpha, one_minus_src_alpha,<br>dst_alpha, one_minus_dst_alpha,<br>src_color, one_minus_src_color,<br>dst_color, one_minus_dst_color,<br>constant_color, one_minus_constant_color,<br>constant_alpha, one_minus_constant_alpha |
| targets[i].<br>blendAlphaEq   | 补充说明 | **add** | add, sub, rev_sub                                                           |
| targets[i].<br>blendColorMask | 补充说明 | **all** | all, none, r, g, b, a, rg, rb, ra, gb, ga, ba, rgb, rga, rba, gba           |

## Default Values

| Type        | Default Value | Options                  |
| :---------- | :------------ | :----------------------- |
| int         |    | 0                                        |
| ivec2       |    | [0, 0]                                   |
| ivec3       |    | [0, 0, 0]                                |
| ivec4       |    | [0, 0, 0, 0]                             |
| float       |    | 0                                        |
| vec2        |    | [0, 0]                                   |
| vec3        |    | [0, 0, 0]                                |
| vec4        |    | [0, 0, 0, 0]                             |
| sampler2D   | **default** | black, grey, white, normal, default  |
| samplerCube | **default-cube** | black-cube, white-cube, default-cube |

For defines:
- The default value for the `boolean` type is `false`.
- The default value for the `number` type is `0`, and the value range is `[0, 3]`.
- The default value for the `string` type is the first element of the `options` array.
