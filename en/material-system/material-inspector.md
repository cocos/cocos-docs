This section covers the following topics:

- Material creation and usage
- Material properties in the Inspector panel

# Creating Material

Under the Assets panel, select **Create**->**Material** to create a new material.

![Material Creation](create-material/create.png)

In v3.x, a new material instance will be created with Cocos Creator’s default PBR shader.

# Using Material

## With Mesh Renderable Components

Select a material from the drop-down menu in parameter `Materials` for any node with the `MeshRenderer` or `SkeletonMeshRenderer` component.

![select-material](use-material/select.png)

### Exporting materials from model assets

Model assets are usually created with external DCCs such as Autodesk Maya, Autodesk 3ds max, Blender, etc. which are exported in `FBX` format.

These assets bring materials created in their respective DCCs at exportation.

After being imported in Cocos Creator, these materials will be switched to read-only status and will only allow write-ins after being exported from Cocos Creator.

To export a material as a separate file. select a `FBX` file in the Assets panel; In the Inspector panel go to the Material tab and enable `Dump materials`.

![](inspector/dump-material.png) ![](inspector/gen-material.png)

## With 2D and UI Renderable Components

Renderable components `UI` and `2D` only allows a single custom material by default. If left unassigned, the renderable component will use the engine’s built-in material.

To assign a custom material, select one from the drop-down menu in the `CustomMaterial` parameter.

![ui-select-mat](use-material/ui-select.png)

# Adjusting properties

All editable properties for a material attainable via the Inspector panel stem from Cocos Creator’s `Effect` system.

For more information on the `Effect` system, please see: [`Effect` System]()

Changing property values in the Inspector panel will not affect `Effect`.

## Selecting `Effect`

To switch to a specific `Effect` file from the engine’s repository or one custom-made, select from the drop-down menu in the `Effect` parameter.

![](inspector/select-effect.png)

For more information on built-in `Effect` files, please see: [Built-in `Effect`]()

For more specifications on the `Effect` system workflow, please see: [`Effect` System]()

## Switching models for material preview

Select from the drop-down menu in the upper right corner of the Inspector panel to select a model for material previews.

![](inspector/preview-model-select.png)

## Saving and Reverting Materials

After property adjustments, buttons for saving and reverting the current material will appear to the upper right of the Inspector panel. These work the same way as those of the Prefabs.

### Saving material

After property adjustments, click the green tick to save changes to the current material.

![](inspector/save-material.png)

### Reverting material

To return the material to the status prior to property changes, click the red revert button to revert the current material.

![](inspector/revert-material.png)
