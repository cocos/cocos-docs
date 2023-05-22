# Customize Surface Shader

Indeed, while the Surface Shader provides a lighting model that can adapt to most scene materials, its functionality is relatively fixed.

Sometimes, users need to use completely customized lighting calculations and color calculations. For example, some special, stylized materials require outline lights, additional fill lights, unrealistic environmental lighting, etc.

For such extremely special situations, the Surface Shader also provides customization capabilities.

However, it should be noted that because the surface material data and lighting calculation process are intervened, the rendering effect may produce unexpected.

## 1. Customize VS Output and FS Input

We can define a new varying variable in the VS stage and then calculate and output the value of this variable in a certain Surface function.

After defining a variable with the same name in the FS stage, we can get and use the value of this variable in a certain Surface function.

For details, please refer to [Fragment Shader Input](./fs-input.md).

## 2. Custom Material Data

Add the following code in the VS function.

```glsl
//PBR lighting mode
#include <surfaces/data-structures/standard>
// toon lighting mode
//#include <surfaces/data-structures/toon> 
#define CC_SURFACES_FRAGMENT_MODIFY_SHARED_DATA
void SurfacesFragmentModifySharedData(inout SurfacesMaterialData surfaceData)
{
    // set user-defined data to surfaceData
}
```

The `#include` at the beginning of the function is used to determine the data structure of the surface material. Different `SurfacesMaterialData` structures will be used according to different included files.

For specific content, you can check the **standard.chunk** and **toon.chunk** under the **internal/chunks/surfaces/data-structures/** directory.

After defining the `CC_SURFACES_FRAGMENT_MODIFY_SHARED_DATA` macro, the Shader compiler will choose your own `SurfacesFragmentModifySharedData` to replace the default function.

This function will be called during the vs stage, specifically, you can check the **render-to-scene/vs.chunk** and **render-to-shadowmap/vs.chunk** files under the **internal/chunks/shading-entries/main-functions/** directory.

In this function, we can directly modify the properties in surfaceData to prepare for the lighting stage.

## Customize Lighting Results

With the custom SurfacesMaterialData from above, we also need to work with the lighting stage to achieve the calculation results we want.

In the FS, add the following code.

```glsl
#include <lighting-models/includes/common>
#define CC_SURFACES_LIGHTING_MODIFY_FINAL_RESULT
void SurfacesLightingModifyFinalResult(inout LightingResult result, in LightingIntermediateData lightingData, in SurfacesMaterialData surfaceData, in LightingMiscData miscData)
{
    // use surfaceData and lightingData for customizing lighting result
}
```

This function will be called in fs.chunk.

As we can see, the function has 4 parameters.
- LightingIntermediateData: Data needed for lighting calculation, such as normal, view direction, view distance, etc.
- SurfacesMaterialData: PBR-related parameters, such as color, normal, etc.
- LightingMiscData: Light source data, such as position, direction, color, intensity, etc.
- LightingResult: Used to return lighting results, such as diffuse, specular, shadow, ao, etc.

In this function, you can use lighting and material data to perform the lighting calculations and store them in the result.

For local lights( point light or spotlight), this function will be executed per light. That means if an object is affected by 6 lights, this function will be called 6 times.

If you want to <font color=#ff0000>directly call the built-in lighting module functions within the overloaded function.</font>, you can change lighting-models/includes/common to the header file used by the corresponding lighting model.

For example, if you want to use the built-in lighting functions of the PBR lighting model in the function, you can include the lighting-models/includes/standard header file.

This header file will include lighting-models/model-functions/standard.

All built-in functions related to PBR lighting are here, just call them directly.

## More Customizations

If the above customization mechanism still cannot meet your needs, it is recommended to refer to chunks/shading-entries to build your own main function and control the entire shading process.
