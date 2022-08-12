# Skybox

The skybox in a video game is a cube that wraps around the entire scene and can render and display the entire scene environment very well. The Skybox can also contribute very important IBL ambient lighting the in PBR-based workflow.

## Enabling Skybox

Check the scene root node in the **Hierarchy** panel, then check the **Enabled** property in the **Skybox** component of the **Inspector** panel to enable the skybox.

 ![enable skybox](skybox/enable-skybox.png)

The **Skybox** component properties are as follows:

| Property | Description |
| :---| :--- |
| **Enabled** | Check this option to enable skybox. |
| **Env Lighting Type** | Environment lighting type. Please refer to the **Diffuse Illumination** section below for more information. |
| **UseHDR** | If this option is checked, HDR (High Dynamic Range) will be turned on, if not checked, LDR (Low Dynamic Range) will be used. For details, please refer to the section **Switching HDR/LDR Mode** below. |
| **Envmap** | Environment map, TextureCube type, see below for details on how to set it. <br>When this property is empty, the skybox uses and displays pixel texture by default. |
| **Reflection Convolution** | Click the bake button will generates a low resolution environment map and perform convolution calculation on this map, convolution map will be used for environment reflection. |
| **Reflection Map** | Automatically generated convolutional maps for environmental reflection, currently doesn't support manually editing. Rendering effects, please refer to the section **bake reflection convolution map** below.|
| **DiffuseMap** | The convolution map for advanced diffuse lighting. It's automatically generated and managed by the engine, currently doesn't support manually editing. This option is only shown when **Env Lighting Type** is **DIFFUSEMAP_WITH_REFLECTION**. |
| **Skybox Material** |  Add custom material for the skybox |

## Setting the Environment Map of the Skybox

After enabling the Skybox, it is also necessary to set the environment map, which is used to generate ambient lighting in the scene. Drag and drop the map asset into the **Envmap** property box of the Skybox component, or click the arrow button behind the **Envmap** property box to select the desired map asset. If not set, the Skybox will use and display pixel maps by default.

![envmap](skybox/envmap.png)

The skybox supports the following environment map assets:

1. A single texture of type TextureCube, which can be set in Creator.

    - Cube Cross images

    - PNG or HDR format images

2. CubeMap in the form of image files

3. CubeMap created manually in Creator by combining six texture maps

### By Setting the Texture Assets of TextureCube Type

1. To import a texture asset, drag and drop it directly into the **Assets** panel.

2. Select the imported texture asset, set the **Type** property to **texture cube** in the **Inspector** panel on the right, then click the green checkbox in the upper right corner to save the settings.

    ![Set to TextureCube](skybox/texturecube.png)

3. Check **Scene** in the **Hierarchy** panel, then drag the set texture asset to the **Envmap** property box of the **Skybox** component in the **Inspector** panel.

    ![Set environment map for skybox](skybox/set-envmap.png)

The setup is done. The developer can directly see the set environment map of the skybox in the **Scene** panel. If the map is not displayed correctly, check if the value of **SkyIllum parameter** is too low, or **modify the Clear Flag** of Camera.

### Use engine builtin resources

In the internal database of the Assets Manager Panel, the engine provides some builtin TextureCube resources that developers can use on demand following the same instructions described above.

![builtin skybox](skybox/builtin.png)

#### SkyIllum Property

The SkyIllum property can be found in the **Ambient** component of the **Inspector** panel by selecting the scene root node in the **Hierarchy** panel, with a default value of 20000.

If the SkyIllum property is set **too low**, the environment map of the skybox may not be displayed correctly in the **Scene** panel. General:

- When the SkyIllum property value is less than 300, the environment map of the Skybox will not be displayed properly.

- When the SkyIllum property is 5000, the effect is equivalent to the light intensity of a moonlit night.

#### Modifying ClearFlags of Camera

If the environment map of the skybox is already displayed correctly in the **Scene** panel but still does not take effect after the project is run, you need to change the **ClearFlags** of the **Camera** component to **SKYBOX**:

![skybox-camera](skybox/skybox-camera.png)

### By Setting the CubeMap

A cube map can be generated manually in Creator from six normal maps by following the steps below:

1. Select all the six prepared texture assets in the **Assets** panel, and then set the **Type** property of these texture assets to **texture** in the **Inspector** panel, and click the green checkbox in the upper right corner.

   ![cubeMap-texture-type](skybox/cubemap-texture-type.png)

2. Create a new CubeMap asset. Select the folder where you want to store CubeMap in the **Assets** panel, click the **+** button in the upper left corner, and then select **CubeMap**. Or you can right-click the folder where you want to store the CubeMap, and select **New -> CubeMap**.

   ![create CubeMap](skybox/create-cubemap.png)

3. Drag and drop the six images you just set as texture type into the corresponding property box of the CubeMap, and click the green tick button on the top right then you are done.

    ![Set CubeMap](skybox/cubemap-properties.png)

    > **Notes**:
    >
    > 1. The property boxes in CubeMap that do not have a texture asset yet will be populated using the default asset.
    > 2. The six property boxes in CubeMap **do not use the same texture**, otherwise they will not be displayed properly for some platforms.

## Diffuse Illumination

Creator supports the following three types of ambient diffuse lighting, which can be select in the pull-down menu of **Env Lighting Type**.

![type](skybox/sky-box-type.png)

The types are described as follows:

1. **Hemisphere Diffuse**: when the **Env Lighting Type** options is **HEMISPHERE_DIFFUSE**, hemispheric light diffusion will be used. This method is controlled by the **SkyLightingColor** and **GroundLightingColor** properties in the **Ambient** component, and has higher rendering performance, but less detail and poor lighting directionality. **The properties are manually adjustable, but may become inconsistent with the environment map**.

    ![ambient-diffuse](skybox/hemisphere.png)

2. **Hemisphere Diffuse And Environment Reflection**: when the **Env Lighting Type** options is **AUTOGEN_HEMISPHERE_DIFFUSE_WITH_REFLECTION**, diffuse reflection is controlled by the **SkyLightingColor** and **GroundLightingColor** properties in the **Ambient** component. It also reflects the specular reflection generated by the environment map.

    ![autogen-hemisphere](skybox/autogen-hemisphere.png)

3. **Diffuse Convolution Map And Environment Reflection**: when the **Env Lighting Type** options is **DIFFUSEMAP_WITH_REFLECTION**, the convolution map diffuse will be used. This method is advanced diffuse reflection, which can correctly express the diffuse lighting generated by environment map, with better lighting directionality and details. However, the convolution map in the **DiffuseMap** property is automatically generated for diffuse reflection and does not allow manual editing.

    ![apply-diffuseMap](skybox/diffuse-map-with-reflection.png)

The comparison between the **AUTOGEN_HEMISPHERE_DIFFUSE_WITH_REFLECTION** and **DIFFUSEMAP_WITH_REFLECTION** is more obvious from the GIF below，when the **Env Lighting Type** is **DIFFUSEMAP_WITH_REFLECTION** The backlight is dark, highlighting the overall sense of layering, light and shade contrast details are also greatly improved.

![Compare](skybox/compare.gif)

> **NOTICE**: When replacing the environment map in the **Envmap** property, Creator will automatically calculate the corresponding ambient lighting information, as well as the diffuse lighting (only CubeMap in the form of image files is supported, manually created CubeMap is not supported).

## Toggling HDR/LDR mode

The **UseHDR** option in the Skybox component is used to toggle the HDR/LDR mode, which is used when checked.

![use-hdr](skybox/use-hdr.png)

- HDR (High Dynamic Range): High dynamic range, with **photometric intensity of the lights** and **exposure parameters of the camera** to achieve a more realistic level of contrast between light and dark. If this mode is used, the intensity of all lights (including parallel light, point light, spot light, etc.) **will become photometric physical units** and ambient light cube map should use **HDR format images** to provide a high dynamic range data source.

- LDR (Low Dynamic Range): Low dynamic range. If this mode is used, the **lights intensity becomes unitless** and no longer has any connection to photometry or camera exposure. This mode is suitable for scenarios where you want the original map color to be reflected without any color tinting. Ambient light cube map can be done using images in formats such as **PNG**.

## Bake Reflection Convolution Map

The generated environment reflection convolution map will fill to the mipmaps for TextureCube, Sampling mipmap in the shader based on material roughness, thus providing a more realistic IBL effect, You can clearly see the comparison effect by the following GIF image.

![Compare](skybox/convolution-map.gif)
