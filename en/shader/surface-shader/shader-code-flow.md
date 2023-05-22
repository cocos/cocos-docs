# Surface Shader Execution Flow

Surface Shader unifies the shading process and provides a wide range of custom functions for both vertex and fragment shader. Shader writers can override these functions according to their needs.

Please refer to [Surface Shader Built-in Replaceable Functions](./surface-function.md) and [Function Replacement Using Macros](./function-replace.md)。

This main purpose of this article is to help developers familiarize themselves with the execution flow of Surface Shader and understand the timing of function calls.

## Entry Function

Let's first take a look at the CCEffect section in the built-in Surface Shader file.

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

As we can see, each pass doesn't specify specific entry functions for the vertex shader and fragment shader, which means that the default entry function `main` will be used.

From the [Surface Shader Structure](./surface-shader-structure.md), we can learn that during the [Surface Shader Assembly](./shader-assembly.md) phase, each Surface Shader includes different header files based on different [Render Usages](./render-usage.md). These header files serve as our entry functions.

## Main Function for VS

Take the `standard-vs` of the built-in Surface Shader as an example.

```glsl
CCProgram standard-vs %{
    #include <shading-entries/main-functions/render-to-scene/vs>
}%
```

As we can see, it includes the vs.chunk under `render-to-scene` folder.

By opening render-to-scene/vs.chunk, we can see that it only contains one main function, here is the code and comments.

```glsl
void main()
{
    SurfacesStandardVertexIntermediate In;
    CCSurfacesVertexInput(In);
    CCSurfacesVertexAnimation(In);
    In.position.xyz = SurfacesVertexModifyLocalPos(In);
    In.normal.xyz = SurfacesVertexModifyLocalNormal(In);

    #if CC_SURFACES_USE_TANGENT_SPACE
        In.tangent = SurfacesVertexModifyLocalTangent(In);
    #endif

    SurfacesVertexModifyLocalSharedData(In);
    CCSurfacesVertexWorldTransform(In);
    In.worldPos = SurfacesVertexModifyWorldPos(In);
    In.clipPos = cc_matProj * cc_matView * vec4(In.worldPos, 1.0);

    In.clipPos = SurfacesVertexModifyClipPos(In);
    vec3 viewDirect = normalize(cc_cameraPos.xyz - In.worldPos);
    In.worldNormal.w = dot(In.worldNormal.xyz, viewDirect) < 0.0 ? -1.0 : 1.0;

    In.worldNormal.xyz = SurfacesVertexModifyWorldNormal(In);
    SurfacesVertexModifyUV(In);
    SurfacesVertexModifySharedData(In);
    CCSurfacesVertexTransformUV(In);
    CCSurfacesVertexTransferFog(In);
    CCSurfacesVertexTransferShadow(In);
    CCSurfacesVertexTransferLightMapUV(In);

    CCSurfacesVertexOutput(In);
}
```

## Main Function for FS

Similarly, let's take a look at the main function of the fragment shader. In the case of the `standard-fs` of built-in Surface Shader.

```glsl
CCProgram standard-fs %{
  #include <shading-entries/main-functions/render-to-scene/fs>
}%
```

the `render-to-scene/fs.chunk` contains the following content:

```glsl
#if (CC_PIPELINE_TYPE == CC_PIPELINE_TYPE_FORWARD || CC_FORCE_FORWARD_SHADING)
  #include <shading-entries/main-functions/render-to-scene/pipeline/forward-fs>
#elif CC_PIPELINE_TYPE == CC_PIPELINE_TYPE_DEFERRED
  #include <shading-entries/main-functions/render-to-scene/pipeline/deferred-fs>
#endif  
```

As we can see, it distinguishes between the forward and deferred pipelines.

### forward-fs

```glsl
//Define the color output target
layout(location = 0) out vec4 fragColorX;
  
void main()  {
    #if CC_DISABLE_STRUCTURE_IN_FRAGMENT_SHADER
    //Get the base color and transparency, can be replaced by macros
    vec4 color = SurfacesFragmentModifyBaseColorAndTransparency();
    #else
    //Get surface material data
    SurfacesMaterialData surfaceData;
    CCSurfacesFragmentGetMaterialData(surfaceData);
    
    //Compute shadow parameters
    vec2 shadowBias = vec2(0.0);
    ...

        
    //Compute fog parameters
    #if !CC_FORWARD_ADD
        float fogFactor = 1.0;
    #endif

    //Compute lighting
    LightingResult lightingResult;
    CCSurfacesLighting(lightingResult, surfaceData, shadowBias);


    //Rendering debugging related code
    ...

    //Pixel shading calculation
    vec4 color = CCSurfacesShading(surfaceData, lightingResult);

    ...

    //Color output
    #if CC_USE_RGBE_OUTPUT
        fragColorX = packRGBE(color.rgb); // for reflection-map
        return;
    #endif

    //HDR，LinearToSRGB, and other final computations
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

The deferred rendering is divided into two stages: GBuffer and Lighting.

In the GBuffer stage, the main task is to fill the various render targets by collecting the corresponding surface material data.

```glsl
//GBuffer 0，1，2
layout(location = 0) out vec4 fragColor0;
layout(location = 1) out vec4 fragColor1;
layout(location = 2) out vec4 fragColor2;

void main () {
    //Collect surface material data
    SurfacesMaterialData surfaceData;
    CCSurfacesFragmentGetMaterialData(surfaceData);

    //Fill the GBuffer
    fragColor0 = CCSurfacesDeferredOutput0(surfaceData);
    fragColor1 = CCSurfacesDeferredOutput1(surfaceData);
    fragColor2 = CCSurfacesDeferredOutput2(surfaceData);

    //Debug rendering related code
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

In the deferred rendering Lighting stage, it is controlled by the engine's rendering pipeline and performs lighting calculations using the GBuffer. You can refer to `internal/effects/deferred-lighting.effect`.

Similarly, the main functions for other render stage can be found in the `internal/chunks/shading-entries/` folder.

> Note: The code that can be replaced is named using the `Surface###Modify###` format.
