# Lightmapping

> **Note**: the Lightmapping feature is not currently supported on Apple M1 (Silicon) architecture devices and is expected to be supported in v3.2.1.

The **Baking System** pre-calculates the lighting, shadows, etc. that a static object with a stable light will receive. The result of this calculation is stored in a texture map, which is called a **lightmap**.

Cocos Creator automatically processes and uses the generated lightmap at runtime. In scenes with fixed lights, using lightmaps instead of real-time lighting calculations can reduce resource consumption and thus increase the efficiency of the scene.

## Lightmapping Panel

Click **Project -> Lightmapping** in the editor menu bar to open the Lightmapping panel. The panel consists of two pages, **Scene** and **Baked**.

![bake result](./lightmap/lightmap-panel.png)

- **Scene**: mainly used to configure the parameters related to generating the lightmap.
- **Baked**: mainly used to display the generated lightmap and its related information.

For details, please see the **Generating Lightmaps** section below.

### Property Description

The description of each property on the **Scene** page is as follows:

| Property | Description |
| :--- | :--- |
| MSAA | Multiple Sampling, optional values include: 1, 2, 4, 8 |
| Resolution | The resolution of the generated lightmap, optional values are 128, 256, 512, 1024, 2048 |
| Gamma | Gamma correction value |
| GIScale | Global lighting scaling factor |
| GISamples | Global illumination sampling factor |
| AOLevel | AO (Ambient Occlusion) level |
| AOStrength | AO intensity |
| AORadius | AO radius |
| AOColor | AO color |

## Generating lightmaps

1. Select the node with light component in the **Hierarchy** panel, then set the **StaticSettings** of the light component in the **Inspector** panel, and check the `Bakeable` property (currently multiple [Directional Lights](./lightType/dir-light.md) are not supported).

    ![enable lightbake](./lightmap/light-bakeable.png)

    - **EditorOnly**: whether to take effect only in the editor

    - **Bakeable**: whether to bake static lighting

    - **CastShadow**: whether to cast static shadows

2. Select the node with the [MeshRenderer component](./../../../engine/renderable/model-component.md) in the **Hierarchy** panel to generate the lightmap, then set **LightmapSettings** in the **Inspector** panel and check the `Bakeable` property.

    ![model lightmap settings](./lightmap/meshrenderer-bakeable.png)

    - **Bakeable**: whether to bake static lighting

    - **CastShadow**: whether to cast static shadows

    - **ReceiveShadow**: whether to receive static shadows

    - **LightmapSize**: the size of the model lightmap

    > **Note**: to generate lightmaps for a model, there are two requirements:
    >
    > 1. When the artist creates a model resource, in addition to the UVs of the model itself, another set of UVs for lightmapping needs to be included.
    > 
    > 2. The model's Materials need to have the **USE LIGHTMAP** rendering option turned on, for example:
    >
    > ![materials use lightmap](./lightmap/materials.png)

3. Open the **Lightmapping** panel and set the corresponding parameters. Then click the **Lightmap Generate** button, a file storage dialog will pop up, you need to specify a folder (must be in the `assets` directory) to store the generated lightmap data information. Notice the baking progress log at the bottom of the **Lightmapping** panel.

    ![bake param](./lightmap/lightmap-generate.png)

4. After baking, the generated lightmap, as well as the file name, size and other related information can be viewed on the **Baked** page of the **Lightmapping** panel. The generated lightmaps are automatically processed by the engine and do not need to be manipulated by the developer.

    ![bake result](./lightmap/lightmap-result.png)

    1. **Bake result**: shows the generated lightmap after baking.
    2. **Lightmap clear**: used to delete the generated lightmap and related information.
    3. **Information output panel**: displays the generated lightmap file name, size and other related information.
 