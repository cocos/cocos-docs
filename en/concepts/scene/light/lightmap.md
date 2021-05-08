# Lightmapping

> **Note**: currently, the lightmapping does not support Apple M1 (Silicon) architecture devices, and is expected to be supported in v3.1.

The __baking system__ is the process of finally generating light maps and applying them in the scene by calculating the influence of all light sources on the object in the engine scene. The purpose of this system is to reduce the calculation of real-time light sources, thereby improving the efficiency of the scene.

## Lightmap panel

The baking process is to calculate the generated results according to the parameters set on the panel, as shown below:

![lightmap](./lightmap/lightmap-panel.png)

The following table describes the specific meaning of each parameter:

| Parameter | Description |
| :--- | :--- |
| MSAA | Multisampling. Has the following values: 1, 2, 4, 8 |
| Resolution | Baking map size. Has the following values: 128, 256, 512, 1024, 2048 |
| Gamma      | Gamma correction value |
| GIScale    | Global illumination scaling factor |
| GISamples  | Global illumination sampling coefficient |
| AOLevel    | AO Level |
| AOStrength | AO Strength |
| AORadius   | AO Radius |
| AOColor    | AO Color |

## Baking the lightmaps

The following three steps are required to turn on the baking system:

1. Click the menu button in the top menu bar `Project`, click the `Lightmap` button in the pop-up menu bar to pop up the Lightmap panel.

    ![create lightmap](./lightmap/bake-menu.png)

2. Before baking, you need to set `bakeable` to `true` in the static light attribute of the light source component in the editor.

    > **Note**: currently only one main direction light source is supported.

    ![enable lightbake](./lightmap/light-bakeable.png)

    - **EditorOnly**: When checked, only takes effect in the editor
    - **Bakeable**: When checked, enable bake static lighting
    - **CastShadow**: When checked, enable cast static shadow

3. Set the lightmap properties of the `MeshRenderer` component.

    ![model lighting map settings](./lightmap/meshrenderer-bakeable.png)

    - **Bakeable**: When checked, enable bake lighting
    - **CastShadow**: When checked, enable cast static shadow
    - **ReceiveShadow**: When checked, enable receive static shadow
    - **LightmapSize**: Lightmap size of the model

4. In the lightmap panel that pops up, after setting the corresponding parameters, click the `Lightmap Generate` button and select the corresponding storage folder to generate the lightmap.

    > **Note**: the storage folder must be under `assets`.

    ![create lightmap asset](./lightmap/lightmap-generate.png)

## Using

During the process of generating baked maps, there will be a generated progress prompt. After the generation, you can view it in the `Baked` tab in the `lightmap` panel.

![bake result](./lightmap/lightmap-result.png)

- `Baked result (baked result display panel)` shows the lightmap texture after baking
- `Lightmap clear (clear button)` can delete the generated result of baking
- `information output panel` shows the information of each baked image (file name, size, etc.).

> **Notes**:
> 1. when artists create model resources, they need to include an additional set of UV for the lightmapping, in addition to the UV for the model itself.
> 2. The model’s material needs to enable the **USE LIGHTMAP** rendering option:
>
>     ![materials use lightmap](./lightmap/materials.png)
