# Surface Shader 执行流程

Surface Shader 统一了着色流程，同时为 vs 和 fs 提供了大量的自定义函数，大家可以根据自己的需求，重写相关函数。

请参考 [Surface Shader 内置函数](./surface-function.md) 和 [使用宏定义实现函数替换](./function-replace.md)。

本文主要目的在于帮助开发者熟悉 Surface Shader 执行流程，弄清楚各函数调用时机。

## 函数入口

我们先看一下内置的 Surface Shader 文件的 CCEffect 部分：

```glsl
CCEffect %{
  techniques:
  - name: opaque
    passes:
    - vert: standard-vs
      frag: standard-fs
    ...
}%
```

可以看到， 每一个 pass 的 vert 和 frag 没有指定专有的入口函数，这就表示，它所用到的 vs 和 fs 的入口函数为 main。

从 [Surface Shader 结构](./surface-shader-structure.md) 中，我们可以了解到， 在 [Surface Shader 组装](./shader-assembly.md) 环节，每一个 Surface Shader 会根据不同的 [渲染用途](./render-usage.md)，引入不同的头文件。 这个头文件就是我们的入口函数。

## VS 主函数

以内置 Surface Shader 的 standard-vs  为例：

```glsl
CCProgram standard-vs %{
    #include <shading-entries/main-functions/render-to-scene/vs>
}%
```

可以看到，它引入的是 render-to-scene 下面的 vs.chunk。

打开 render-to-scene/vs.chunk，可以看到，它只有一个 main 函数。代码和注释如下：

```glsl
void main()
{
    //声明一个表面材质数据结构
    SurfacesStandardVertexIntermediate In;

    //获取顶点基本数据
    CCSurfacesVertexInput(In);
    //获取顶点动画数据
    CCSurfacesVertexAnimation(In);
    // ===== 本地坐标相关 ====
    //处理本地坐标，用户可用宏替换
    In.position.xyz = SurfacesVertexModifyLocalPos(In);
    //处理本地法线，用户可用宏替换
    In.normal.xyz = SurfacesVertexModifyLocalNormal(In);
    //处理本地切线，用户可用宏替换
    #if CC_SURFACES_USE_TANGENT_SPACE
        In.tangent = SurfacesVertexModifyLocalTangent(In);
    #endif
    //进一步处理自定义本地数据，用户可用宏替换
    SurfacesVertexModifyLocalSharedData(In);

    //==== 世界坐标相关======
    //进行世界坐标转换，并填充数据结构
    CCSurfacesVertexWorldTransform(In);
    //额外的处理世界坐标函数，用户可用宏替换
    In.worldPos = SurfacesVertexModifyWorldPos(In);

    //投影空间坐标
    In.clipPos = cc_matProj * cc_matView * vec4(In.worldPos, 1.0);
    //进一步处理投影空间坐标，用户可用宏替换
    In.clipPos = SurfacesVertexModifyClipPos(In);

    //其它一些数据变换
    vec3 viewDirect = normalize(cc_cameraPos.xyz - In.worldPos);
    In.worldNormal.w = dot(In.worldNormal.xyz, viewDirect) < 0.0 ? -1.0 : 1.0;
    //进一步处理世界法线，用户可用宏替换
    In.worldNormal.xyz = SurfacesVertexModifyWorldNormal(In);

    //进一步处理UV，用户可用宏替换
    SurfacesVertexModifyUV(In);
    //进一步处理自定义数据，用户可用宏替换
    SurfacesVertexModifySharedData(In);

    //其它变换
    //UV
    CCSurfacesVertexTransformUV(In);
    //雾效
    CCSurfacesVertexTransferFog(In);
    //阴影
    CCSurfacesVertexTransferShadow(In);
    //光照贴图UV
    CCSurfacesVertexTransferLightMapUV(In);

    //最终输出
    CCSurfacesVertexOutput(In);
}
```

## FS 主函数

同样的，我们以内置 Surface Shader 的 standard-fs  为例：

```glsl
CCProgram standard-fs %{
  #include <shading-entries/main-functions/render-to-scene/fs>
}%
```

render-to-scene/fs.chunk 文件内容如下：

```glsl
#if (CC_PIPELINE_TYPE == CC_PIPELINE_TYPE_FORWARD || CC_FORCE_FORWARD_SHADING)
  #include <shading-entries/main-functions/render-to-scene/pipeline/forward-fs>
#elif CC_PIPELINE_TYPE == CC_PIPELINE_TYPE_DEFERRED
  #include <shading-entries/main-functions/render-to-scene/pipeline/deferred-fs>
#endif  
```

可以看到它区分了 forward 和 deferred 管线。

### forward-fs

```glsl
//定义颜色输出目标
layout(location = 0) out vec4 fragColorX;
  
void main()  {
    #if CC_DISABLE_STRUCTURE_IN_FRAGMENT_SHADER
    //获取基本颜色和透明度，用户可用宏替换
    vec4 color = SurfacesFragmentModifyBaseColorAndTransparency();
    #else
    //获取表面材质数据
    SurfacesMaterialData surfaceData;
    CCSurfacesFragmentGetMaterialData(surfaceData);
    
    //计算阴影参数
    vec2 shadowBias = vec2(0.0);
    ...

        
    //计算雾效参数
    #if !CC_FORWARD_ADD
        float fogFactor = 1.0;
    #endif

    //计算光照
    LightingResult lightingResult;
    CCSurfacesLighting(lightingResult, surfaceData, shadowBias);


    //渲染调试相关
    ...

    //像素着色计算
    vec4 color = CCSurfacesShading(surfaceData, lightingResult);

    ...

    //颜色输出
    #if CC_USE_RGBE_OUTPUT
        fragColorX = packRGBE(color.rgb); // for reflection-map
        return;
    #endif

    //HDR，LinearToSRGB 等最终运算
    #if CC_USE_HDR
        #if CC_USE_DEBUG_VIEW == CC_SURFACES_DEBUG_VIEW_COMPOSITE_AND_MISC && CC_SURFACES_ENABLE_DEBUG_VIEW
        if (IS_DEBUG_VIEW_COMPOSITE_ENABLE_TONE_MAPPING)
        #endif
        color.rgb = ACESToneMap(color.rgb);
    #endif
    #if CC_USE_DEBUG_VIEW == CC_SURFACES_DEBUG_VIEW_COMPOSITE_AND_MISC
        if (IS_DEBUG_VIEW_COMPOSITE_ENABLE_GAMMA_CORRECTION)
    #endif
    color.rgb = LinearToSRGB(color.rgb);
    
    #if !CC_FORWARD_ADD && CC_USE_FOG != CC_FOG_NONE
        CC_APPLY_FOG_BASE(color, fogFactor);
    #endif

    fragColorX = CCSurfacesDebugDisplayInvalidNumber(color);
}
```

### deferred-fs

延迟渲染由于分成两个阶段：GBuffer 和 Lighting。

在 GBuffer 阶段主要是填充各个渲染目标，只需要收集对应的材质表面数据即可，代码如下：

```glsl
//GBuffer 0，1，2
layout(location = 0) out vec4 fragColor0;
layout(location = 1) out vec4 fragColor1;
layout(location = 2) out vec4 fragColor2;

void main () {
    //收集表面材质数据
    SurfacesMaterialData surfaceData;
    CCSurfacesFragmentGetMaterialData(surfaceData);

    //填充 GBuffer
    fragColor0 = CCSurfacesDeferredOutput0(surfaceData);
    fragColor1 = CCSurfacesDeferredOutput1(surfaceData);
    fragColor2 = CCSurfacesDeferredOutput2(surfaceData);

    //调试渲染相关
    #if CC_USE_DEBUG_VIEW == CC_SURFACES_DEBUG_VIEW_SINGLE && CC_SURFACES_ENABLE_DEBUG_VIEW
        vec4 debugColor = vec4(0.0, 0.0, 0.0, 1.0);
        CCSurfacesDebugViewMeshData(debugColor);
        CCSurfacesDebugViewSurfaceData(debugColor, surfaceData);
        if (IS_DEBUG_VIEW_ENABLE_WITH_CAMERA) {
        fragColor0 = debugColor;
        }
    #endif
}
```

延迟渲染的 Lighting 阶段，是受引擎渲染管线控制的，会统一使用 GBuffer 进行光照计算，可参考 internal/effects/deferred-lighting.effect。

其余的渲染用途主函数同理，可以到 internal/chunks/shading-entries/ 目录下查看。

> 提示：可以被替换的代码，都以 Surface###Modify### 方式命名。
