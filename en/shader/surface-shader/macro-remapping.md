# Macro Remapping

During internal calculations, Surface Shader will use some macro switches, which start with `CC_SURFACES_`.

> **Note**: Macros start with the `CC_SURFACES_` won't appear on the material inspector panel.

The complete macro list is as follows.

| Macro Nam                                                | Type | Meaning                                                         |
| :---------------------------------------------------- | ---- | ------------------------------------------------------------ |
| CC_SURFACES_USE_VERTEX_COLOR                          | BOOL | Use vertex color                                               |
| CC_SURFACES_USE_SECOND_UV                             | BOOL | Use second uv                                                  |
| CC_SURFACES_USE_TWO_SIDED                             | BOOL | Use two-side normal for two-side lighting                               |
| CC_SURFACES_USE_TANGENT_SPACE                         | BOOL | Use tangent space - must be enabled when using normal map or anisotropy ）             |
| CC_SURFACES_TRANSFER_LOCAL_POS                        | BOOL | Access model space position in FS                                 |
| CC_SURFACES_LIGHTING_ANISOTROPIC                      | BOOL | Enable anisotropic material                                         |
| CC_SURFACES_LIGHTING_ANISOTROPIC_ENVCONVOLUTION_COUNT | UINT | Sample count of anisotropic convolution, 0 means convolution is disabled, only valid when anisotropy is enabled  |
| CC_SURFACES_LIGHTING_USE_FRESNEL                      | BOOL | Calculate Fresnel coefficient through relative refractive index ior                        |
| CC_SURFACES_LIGHTING_TRANSMIT_DIFFUSE                 | BOOL | Enable backside penetration diffuse (used for hair, leaves, ears, etc)               |
| CC_SURFACES_LIGHTING_TRANSMIT_SPECULAR                | BOOL | Enable light specular (used for water surface, glass, etc.)                    |
| CC_SURFACES_LIGHTING_TRT                              | BOOL | Enable light reflected from the interior after transmission(used for hair)           |
| CC_SURFACES_LIGHTING_TT                               | BOOL | Enable light diffused from the interior after transmission(used for hair)              |
| CC_SURFACES_USE_REFLECTION_DENOISE                    | BOOL | Enable environmental reflection denoising, only valid under legacy compatibility mode               |
| CC_SURFACES_USE_LEGACY_COMPATIBLE_LIGHTING            | BOOL | Enable legacy compatible lighting mode, the rendering effect can be completely consistent with legacy/standard.effect, convenient for upgrade |

> **Note**： If these macros are not defined, the system will automatically define them as the default value 0.

Search for the `CCProgram macro-remapping` section, and you can see that the content consists of three parts.

![macro-remapping](../img/macro-remapping.png)

## Display Macros on Panel

```glsl
// ui displayed macros not used in this effect file
#pragma define-meta HAS_SECOND_UV
#pragma define-meta USE_TWOSIDE
#pragma define-meta USE_REFLECTION_DENOISE
#pragma define-meta USE_COMPATIBLE_LIGHTING
```

By default, macros starting with `CC_` will not be displayed on the material panel. When we want a macro to be displayed on the material panel, we can do the following.

1. Use `#pragma define-meta` to define a panel macro, we take `HAS_SECOND_UV` as an example.

```glsl
#pragma define-meta HAS_SECOND_UV
```

2. Remap the macro starting with `CC_SURFACES_` to this macro, for example.

```glsl
#define CC_SURFACES_USE_SECOND_UV HAS_SECOND_UV
```

In this way, on the material panel corresponding to this shader, you can control the value of the `CC_SURFACES_USE_SECOND_UV` macro by controlling `HAS_SECOND_UV`.

## Macros Used in Surface Functions

If a macro is used in the shader code and does not start with `CC_`, it will automatically be displayed on the material panel. For example.

```glsl
// ui displayed macros used in this effect file
#define CC_SURFACES_USE_VERTEX_COLOR USE_VERTEX_COLOR
#if IS_ANISOTROPY || USE_NORMAL_MAP
  #define CC_SURFACES_USE_TANGENT_SPACE 1
#endif
```

In this case, `IS_ANISOTROPY` and `USE_NORMAL_MAP` will be displayed on the material panel, and can be switched on and off through the material panel.

## Internal Functionality Macros

For some macros, we don't want to control it on the panel, just define its value directly, for example.

```glsl
// functionality for each effect
#define CC_SURFACES_LIGHTING_ANISOTROPIC_ENVCONVOLUTION_COUNT 31
```

## Hidden Macros

If you have written some macros in your shader but don't want them to appear on the material panel, you can start them with `CC_`.

To differentiate from the internal system macros, user-defined internal macros are recommended to start with `CC_USER_`.

For more details about macros, please see [Macros](../macros.md)。
