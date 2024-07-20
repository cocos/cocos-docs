# Cocos Shader 内置全局 Uniform

要在 Cocos Shader 中使用内置变量 Uniform，需要包含对应的着色器片段（Chunk）即可，如下代码所示：

```ts
//local uniforms
#include <builtin/uniforms/cc-local>
//global uniforms
#include <builtin/uniforms/cc-global>
```

以下是常用内置变量，按所在着色器片段进行分组，列表如下：

## `cc-local.chunk`

| Name | Type | Info |
| :-- | :-- | :-- |
| `cc_matWorld` | mat4 | 模型空间转世界空间矩阵 |
| `cc_matWorldIT` | mat4 | 模型空间转世界空间逆转置矩阵 |

## `cc-global.chunk`

| Name | Type | Info |
| :-- | :-- | :-- |
| `cc_time` | vec4 | x：游戏运行时间（秒）<br> y：帧时间（秒）<br> z：游戏运行帧数 <br>w：未使用 |
| `cc_screenSize` | vec4 | xy：屏幕尺寸<br>zw：屏幕尺寸倒数 |
| `cc_screenScale` | vec4 | xy：屏幕缩放<br>zw：屏幕缩放倒数 |
| `cc_nativeSize` | vec4 | xy：实际着色缓冲的尺寸<br>zw：实际着色缓冲的尺寸倒数 |
| `cc_matView` | mat4 | 视图矩阵 |
| `cc_matViewInv` | mat4 | 视图逆矩阵 |
| `cc_matProj` | mat4 | 投影矩阵 |
| `cc_matProjInv`  | mat4 | 投影逆矩阵 |
| `cc_matViewProj` | mat4 | 视图投影矩阵 |
| `cc_matViewProjInv` | mat4 | 视图投影逆矩阵 |
| `cc_cameraPos` | vec4 | xyz：相机位置<br> w：combineSignY |
| `cc_exposure` | vec4 | x：相机曝光<br>y：相机曝光倒数<br>z：是否启用 HDR<br>w：HDR 转 LDR 缩放参数 |
| `cc_mainLitDir` | vec4 | xyz：主方向光源方向 <br>w：是否启用阴影 |
| `cc_mainLitColor` | vec4 | xyz：主方向光颜色<br>w：主方向光强度 |
| `cc_ambientSky` | vec4 | xyz：天空颜色<br>w：亮度 |
| `cc_ambientGround` | vec4 | xyz：地面反射光颜色<br> w：环境贴图 Mipmap 等级 |

## `cc-environment.chunk`

| Name | Type | Info |
| :-- | :-- | :-- |
| `cc_environment` | samplerCube | IBL 环境贴图 |

## `cc-forward-light.chunk`

| Name | Type | Info |
| :--- | :-- | :-- |
| `cc_lightPos[LIGHTS_PER_PASS]` | vec4 | xyz：光源位置<br> w: 有效的光源类型0: 方向光,1: 球形光,2: 聚光灯,3: 点光源,4: 范围方向光,5: 未知 |
| `cc_lightColor[LIGHTS_PER_PASS]` | vec4 | xyz：球光颜色<br>w：球光强度 |
| `cc_lightSizeRangeAngle[LIGHTS_PER_PASS]` | vec4 | x:光源大小, y:光源范围, z: cos(外半角), w: 启用阴影 |
| `cc_lightDir[LIGHTS_PER_PASS]` | vec4 | xyz: 方向, w: 未使用 |
| `cc_lightBoundingSizeVS[LIGHTS_PER_PASS]` | vec4 | xyz: 范围方向光节点半比例 |

## `cc-shadow.chunk`

| Name | Type | Info |
| :-- | :-- | :-- |
| `cc_matLightPlaneProj` | mat4 | 平面阴影的变换矩阵 |
| `cc_shadowColor` | vec4 | 阴影颜色 |

完整常量列表，请参考 **internal/builtin/uniforms/** 目录。
