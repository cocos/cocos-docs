# Built-in Shader Uniforms

To use built-in shader variables, you need to include the corresponding chunks first.
All currently available built-in uniforms, grouped by the chunks they are located:

## `cc-local.chunk`

| Name | Type | Info |
| :-- | :-- | :-- |
| `cc_matWorld` | mat4 | model to world transform matrix |
| `cc_matWorldIT` | mat4 | inverse-transpose of model to world transform matrix |

## `cc-global.chunk`

| Name | Type | Info |
| :-- | :-- | :-- |
| `cc_time` | vec4 | x: seconds since engine started |
| `cc_screenSize` | vec4 | xy: shading screen size<br>zw: reciprocal of shading screen size |
| `cc_screenScale` | vec4 | xy: screen scale<br>zw: reciprocal of screen scale |
| `cc_nativeSize` | vec4 | xy: canvas size<br>zw: reciprocal of canvas size |
| `cc_matView` | mat4 | view transform matrix |
| `cc_matViewInv` | mat4 | inverse view matrix |
| `cc_matProj` | mat4 | projection transform matrix |
| `cc_matProjInv`  | mat4 | inverse projection transform matrix |
| `cc_matViewProj` | mat4 | view-projection transform matrix |
| `cc_matViewProjInv` | mat4 | inverse view-projection transform matrix |
| `cc_cameraPos` | vec4 | xyz: camera position |
| `cc_exposure` | vec4 | x: camera exposure<br>y: reciprocal of camera exposure<br>z: is HDR enabled w: HDR-LDR scaling factor |
| `cc_mainLitDir` | vec4 | xyz: direction of the main directional light |
| `cc_mainLitColor` | vec4 | xyz: color of the main directional light<br>w: intensity |
| `cc_ambientSky` | vec4 | xyz: ambient sky color<br>w: intensity |
| `cc_ambientGround` | vec4 | xyz: ambient ground color |

## `cc-environment.chunk`

| Name | Type | Info |
| :-- | :-- | :-- |
| `cc_environment` | samplerCube | IBL environment map |

## `cc-forward-light.chunk`

| Name | Type | Info |
| :-- | :-- | :-- |
| `cc_sphereLitPos[MAX_LIGHTS]` | vec4 | xyz: position of spherical lights |
| `cc_sphereLitSizeRange[MAX_LIGHTS]` | vec4 | x: size of spherical lights<br>y: range of spherical lights |
| `cc_sphereLitColor[MAX_LIGHTS]` | vec4 | xyz: color of spherical lights<br>w: intensity |
| `cc_spotLitPos[MAX_LIGHTS]` | vec4 | xyz: position of spotlights |
| `cc_spotLitSizeRangeAngle[MAX_LIGHTS]` | vec4 | x: size of spotlights<br>y: range of spotlights<br>z: angle of spotlights |
| `cc_spotLitDir[MAX_LIGHTS]` | vec4 | xyz: direction of spotlights |
| `cc_spotLitColor[MAX_LIGHTS]` | vec4 | xyz: color of spotlights<br>w: intensity |

## `cc-shadow.chunk`

| Name | Type | Info |
| :-- | :-- | :-- |
| `cc_matLightPlaneProj` | mat4 | planar shadow transform matrix |
| `cc_shadowColor` | vec4 | shadow color |
