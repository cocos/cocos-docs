# Toon Shading

Non-Photorealistic Rendering (NPR), as opposed to Physical Based Rendering ([PBR](effect-builtin-pbr.md)), achieves a completely different art representation from the real world through feature-based rendering.

Toon Shading is one of the common effects of non-realistic rendering.

Usually cartoon rendering contains the following basic components:

- Stroke objects
- Reducing the number of color gradations and simulating color gradation discontinuities
- Separation of light and dark tones
- Shade shape interference, etc.

![toon](img/toon.png)

## Passes

Creator provides a built-in toon rendering shader `builtin-toon.effect`, as an example, we switch the shader in the **Effect** property to `builtin-toon.effect` in the material resource, we can see that the toon rendering consists of two rendering passes.

![toon pass](img/toon-pass.png)

- Pass 0: used for stroking, not enabled by default, can be enabled by checking **USE_OUTLINE_PASS** on the right side.
- Pass 1: normal rendering of the model

### Pass 0

Pass 0 selects the culling mode in the rasterization state to frontal culling (`CullMode = FRONT`) and expands the model's vertices along the normals, resulting in a larger monochrome model than the original model, after which **Pass 1** renders the model once normally and masks the rendering of **Pass 0**, leaving a solid color edge to form a stroke since the model size of **Pass 1** is smaller than that of **Pass 0**.

![cull-front](img/cull-front.png)

**Pass 0** can be turned on or off by checking **USE_OUTLINE_PASS**.

When **USE_OUTLINE_PASS** is checked to turn on the stroke function for **Pass 0**, the effect is as follows.

![USE_OUTLINE_PASS on](img/outline-on.png)

If you need to adjust the depth effect of the stroke, you can do so with the **DepthBias** property.

![DepthBias](img/toon-depth-bias.png)

When **USE_OUTLINE_PASS** is unchecked to turn off the stroke function for **Pass 0**, the effect is as follows.

![USE_OUTLINE_PASS off](img/outline-off.png)

### Pass 1

The core idea of cartoon rendering is to simulate the Celluloid painting style in cartoons by reducing the number of color gradations.

Reduces the color scale to three shades in the shader and is composed by three colors:

- **baseColor**：Basic colors
- **shadeColor1**：First-order coloring of colors
- **shadeColor2**：Second-order coloring of colors

The color corresponds to the editor material properties as follows：

![toon-shade-color](img/shade-color.png)

If **USE_1ST_SHADE_MAP** and **USE_2ND_SHADE_MAP** are checked, the texture is used externally to simulate the color scale discontinuity.

![shade map](img/shade-map.png)

The parameters of the surface shader (`ToonSurface`) are calculated by the shader's `surf` method, and the final shading is calculated by the `CCToonShading` method.

![surf code](img/toon-surf.png)

## Parameters and pre-compiled macro definitions

### Pass 0

| Properties     | Description                                                       |
| :------------- | :---------------------------------------------------------------- |
| lineWidth | The width of the stroke
| depthBias | Depth shift adjustment factor for stroke
| baseColor | Stroke base color

### Pass 1

| Properties     | Description                                                       |
| :------------- | :---------------------------------------------------------------- |
| tilingOffset   | Scaling and offset of the model UV, xy corresponds to scaling, zw corresponds to offset |
| mainColor      | The primary color, which will be used as the initial color gradient |
| colorScale     | Color scaling, multiplying RGB channels for primary, first-order and second-order colors |
| alphaThreshold | Set the Alpha test threshold. Pixels with Alpha values below the set value will be discarded. This item is only displayed when **USE_ALPHA_TEST** is checked |
| shadeColor1    | First order color. This color will be used as an intermediate color for cartoon coloring |
| shadeColor2    | Secondary order color. This color will be used as the last color scale of the cartoon coloring |
| specular       | specular color |
| baseStep       | Step size for first-order coloring |
| baseFeather    | First-order shading and primary color mixing factor, and **BaseStep** property to adjust the proportion of first-order shading and the form of mixing  |
| shadeStep      | Step size for second-order color |
| shadeFeather   | Blending factor for second-order shading and first-order shading, and **ShadeStep** property to adjust the proportion of second-order shades and the form of blending |
| shadowCover    | Shadow covering factor |
| emissive       | Self-emitting colors, independent of lighting calculation, directly emitted by the model itself |
| emissiveScale  | Self-emitting intensity, used to control the weight of the impact of self-emitting color on the final color |
| normalStrength  | Normal scaling<br>The xy axis of the normal can only be adjusted and scaled if **USE_NORMAL_MAP** is enabled |
| normalMap      | Normal mapping <br>can only be adjusted if **USE_NORMAL_MAP** is enabled |
| mainTexture    | The main texture, which defines the base texture of the object.<br> Is displayed in the editor as **baseColorMap** and can only be adjusted if the **USE_BASE_COLOR_MAP** macro is enabled |
| shadeMap1 | The first-order color texture, if specified, will be multiplied by the set ShadeColor1. This item is only shown when **USE 1ST SHADER MAP** is checked.
| shadeMap2 | Second-order color texture, if specified, it will be multiplied by the set ShadeColor2. This item is only shown when **USE 2ND SHADER MAP** is checked.
| specularMap | The highlight map, if specified, will be multiplied with the highlight color. This item is only shown when **USE SPECULAR MAP** is checked.
| emissiveMap | Self-Emitting map, if specified, it will be multiplied by the self-emitting color, so you need to turn up the RGBA in the self-emitting color (default is black) to get the effect. This item is only shown when **USE EMISSIVE MAP** is checked.

## Pre-compiled Macro Definition

| macro                          | description                      |
| :---------------------------- | :------------------------ |
| USE_INSTANCING | Whether to enable dynamic gpu instancing |
| USE_OUTLINE_PASS              | Whether to enable strokes Pass |
| USE_NORMAL_MAP | Whether to use normal mapping |
| USE_BASE_COLOR_MAP | Whether to use base color maps|
| USE_1ST_SHADE_MAP | Whether to use the map as a first-order color scale|
| USE_2ND_SHADE_MAP | Whether to use a texture as a second-order color map|
| USE_EMISSIVE_MAP | Whether to use self-emitting maps|
| USE_ALPHA_TEST | Whether to perform alpha tests|
| USE_SPECULAR_MAP | Whether to use the highlight map|
| BASE_COLOR_MAP_AS_SHADE_MAP_1 | Use baseColorMap as first-order shading |
| BASE_COLOR_MAP_AS_SHADE_MAP_2 | Use baseColorMap as second-order shading |
| SHADE_MAP_1_AS_SHADE_MAP_2 | Whether second-order coloring is overlaid with first-order coloring |
