# Import Model

> Authors: Xunyi, youyou

Currently Cocos Creator supports importing 3D models using a very wide range of **.fbx** formats, and basically all 3D modeling software supports exporting this format.

The process of importing is simple, just drag the **.fbx** model resource into the **Assets**, and wait a moment to complete the import work. After the import is complete, you can see that the imported model resource is an expandable folder in **Assets**. When importing the model, the editor will automatically parses the contents of the model and generates resources such as **Prefab**, **Meshes**, and **Skeleton animations**.

![import-model](./img/import-model.png)

- **1** is the model resource
- **2** is the mesh resource
- **3** is the prefab resource<br>
    **Attention**: When importing, those automatically generated Prefab resources cannot be modified. If you need to modify them, you can drag the generated prefab into the **Scene** for editing. After editing, drag and drop it into the **Asset** to generate a new Prefab, and use this as your own Prefab.
- **4** is the skeleton animation resource

## Associated texture resources

Most models will have texture resources. When importing the model, these texture resources need to be placed in the specified location before they are found by the import system and associated with the Mesh Renderer

The import system will first search for the corresponding texture from the model folder. If it is not found, then go to **textures** or **Textures** under the model folder for look up.

**Attention**: The correct search for the texture needs to satisfy that the texture be imported before imported model, or to be imported with the model at the same time

## Associated skeleton animation resource

The skeleton animation clip can be placed in the model along with the mesh resource, or it can be placed separately in another model and named after the **Model name@Animation name** name. A separately stored skeleton animation clip will be named with the specified name when it is imported.

![skeleton-animation-clip-name](./img/skeleton-animation-clip-name.png)

If there is skeleton animation in the model, the import system will automatically add a [skeleton animation component](skeleton-animation.md) to the Prefab of the model

When you click the **Search Animation Clips** button in the component, the component will search for the model named after the **Model name@Animation name** format under the current model folder, and associate with the skeleton animation clips in it.

![search-skeleton-animation](./img/search-skeleton-animation.png)

## Configuring model parameters

After importing the model, you can set the model import parameters in the **Properties** by selecting the model in the **Assets**.

### Model

![](img/scale.png)

**Scale Factor**: Set the scale of the imported model root node. The default is **1**.

### Animation

![](img/animation.png)

- **Precompute Joint Matrix**

  When loading skeleton animation data, the matrix of each skeleton at each time point will be calculated in advance, which saves the steps of dynamically calculating the skeleton matrix and greatly improves the efficiency. The default is **Unchecked**.

  **Note: The model with this option turned on must match the model on the SkeletonAnimation component.**

- **Animation Frame Rate**

  Adjusting the animation pre-calculates the frame rate of the generated animation clip, reducing the frame rate can reduce memory consumption. Only takes effect when the **Precompute Joint Matrix** option is checked. The default is **30 FPS**.
