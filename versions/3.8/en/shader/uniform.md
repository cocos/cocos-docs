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
| `cc_lightPos[LIGHTS_PER_PASS]`            | vec4 | xyz: light source position<br> w: valid light source type 0: directional light, 1: spherical light, 2: spotlight, 3: point light, 4: range directional light, 5: unknown |
| `cc_lightColor[LIGHTS_PER_PASS]`          | vec4 | xyz: spherical light color<br>w: spherical light intensity                                                                                                               |
| `cc_lightSizeRangeAngle[LIGHTS_PER_PASS]` | vec4 | x: light source size, y: light source range, z: cos(outer half-angle), w: enable shadow                                                                                  |
| `cc_lightDir[LIGHTS_PER_PASS]`            | vec4 | xyz: direction, w: unused                                                                                                                                                |
| `cc_lightBoundingSizeVS[LIGHTS_PER_PASS]` | vec4 | xyz: range directional light node half-scale

## `cc-shadow.chunk`

| Name | Type | Info |
| :-- | :-- | :-- |
| `cc_matLightPlaneProj` | mat4 | planar shadow transform matrix |
| `cc_shadowColor` | vec4 | shadow color |
