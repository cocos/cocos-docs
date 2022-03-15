# Cocos Effect 内置 Uniform

要在 Cocos Effect 中使用内置变量 Uniform，需要包含对应的着色器片段（Chunk）。

目前所有的内置变量，按所在着色器片段进行分组，列表如下。

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
| `cc_sphereLitPos[MAX_LIGHTS]` | vec4 | xyz：球面光位置 |
| `cc_sphereLitSizeRange[MAX_LIGHTS]` | vec4 | x：球光尺寸<br>y：球光范围 |
| `cc_sphereLitColor[MAX_LIGHTS]` | vec4 | xyz：球光颜色<br>w：球光强度 |
| `cc_spotLitPos[MAX_LIGHTS]` | vec4 | xyz：聚光灯位置 |
| `cc_spotLitSizeRangeAngle[MAX_LIGHTS]` | vec4 | x：聚光灯尺寸<br>y：聚光灯范围<br>z：聚光灯角度 |
| `cc_spotLitDir[MAX_LIGHTS]` | vec4 | xyz：聚光灯方向 |
| `cc_spotLitColor[MAX_LIGHTS]` | vec4 | xyz：聚光灯颜色<br>w：聚光灯强度 |

## `cc-shadow.chunk`

| Name | Type | Info |
| :-- | :-- | :-- |
| `cc_matLightPlaneProj` | mat4 | 平面阴影的变换矩阵 |
| `cc_shadowColor` | vec4 | 阴影颜色 |
