# 无光照

无光照是最基础的着色模型，这种模型下，引擎的任何光源都无法影响其最终效果，适用于：

- 物体不受光源影响
- 画面要求不高或性能要求高的场景

![](img/unlit-shademode.png)  

## 制作标准

在技术选型时，若要在 `unlit` 模型下使用光照，可将光照信息绘制在纹理上。

## 参数

| 参数           | 说明                                                                                |
| :------------- | :---------------------------------------------------------------------------------- |
| mainTexture    | 主纹理                                                                              |
| tilingOffset   | 模型 UV 的平铺和偏移量，xy 对应平铺，zw 对应偏移|
| mainColor      | 主颜色，改颜色会在片元着色器内被处理                                                |
| colorScale     | 和主颜色的叠加                                                                      |
| alphaThreshold | 用于半透明混合测试，启用 USE_ALPHA_TEST 的情况下，小于改值的片元会被抛弃（discard） |

## 宏

| 宏               | 说明                                                              |
| :--------------- | :---------------------------------------------------------------- |
| USE_BATCHING | 是否启用动态 VB 合并式合批 |
| USE_INSTANCING | 是否启用动态 instancing |
| USE_VERTEX_COLOR | 是否叠加顶点缓存内定义的颜色和 Alpha 值                           |
| USE_TEXTURE      | 是否使用主纹理（mainTexture）                                     |
| USE_ALPHA_TEST   | 是否进行半透明测试（AlphaTest）                                   |
| SAMPLE_FROM_RT   | 是否是从 RenderTexture 中采样，这种情况下需要对 uv 的翻转进行考量 |

