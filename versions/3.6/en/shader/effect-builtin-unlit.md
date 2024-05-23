# Unlit

Unlit is the most basic shading model, under which no light source from the engine can affect the final effect, and is applicable to:

- Objects that are not affected by light sources
- Scenes with low screen requirements or high performance requirements

When switching the shader to the Creator's built-in unlit shader (builtin-unilit.effect) in the material's **Effect** property, the following image is shown:

![unlit](img/unlit-shademode.png)

## Art standards

For technical selection, to work with lighting under a model using the **unlit** material, draw the lighting information on the texture map and then drag the texture map into the **MainTexture** property box of the material.

To use PBR lighting, see: [Physically Based Rendering](effect-builtin-pbr.md)

## Parameters

| parameter | description |
| :--- | :--- |
| mainTexture    | The main textrue |
| tilingOffset   | Scaling and offset of the model UV, xy corresponds to scaling, zw corresponds to offset |
| mainColor      | The main color, which will be processed within the slice shader |
| colorScale     | Multiply with main color to scale the main color |
| alphaThreshold | Used for semi-transparent tests, with USE_ALPHA_TEST enabled, pixels smaller than this value will be discarded |

## Pre-compiled macro definitions

| macro | description |
| :--- | :---- |
| USE_INSTANCING | Whether to enable GPU geometry instancing |
| USE_VERTEX_COLOR | Whether to overlay vertex colors and alpha values |
| USE_TEXTURE      | Whether to use the main texture (`mainTexture)` |
| USE_ALPHA_TEST   | Whether to perform translucency testing (AlphaTest) |
| SAMPLE_FROM_RT   | Whether to sample from the RenderTexture or not, when checked the Y value of the UV will be flipped |
