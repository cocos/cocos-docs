# 2D Renderable Component Batching Rules

## Batching Condition Description

The rules for batching 2D render components are that the layer of the node, the material used, the blendState and DepthStencilState of the render component are the same, and the map source and map sample are the same.
Refer to the explanation of each of these conditions below:
- Layer of node: since layer is involved in rendering or not, different layers cannot be batched.
- Material: the same material is a necessary requirement for batching, because the material instantiation mechanism is used, the material will be instantiated after the user sets the uniform of the material, and the material after instantiation cannot be batching. After the uniform value is used, reassign the material resource to the component to make the component participate in the batch again (through the CustomMaterial interface).
- BlendState State: for some 2D renderable components, set the BlendState value of the component in the panel.
- DepthStencilState state: this value controls the depth detection and stencil buffering of the component, generally the user does not need to care about the setting of this value, it is automatically controlled by the engine (for the Mask effect)
- Texture Source and Texture Sampling: generally speaking, this condition is the most important one that affects batching, especially for sprites and text, where texture can easily make a difference and prevent batching. The engine provides some methods to achieve better batching, which can be found in the following article.

## Batching Method Description

Combined with the above description of batching conditions, we can use some methods to achieve better batching methods, but it should be noted that the rendering data collection of 2D renderable components is a node-tree-based rendering method, and some components will interrupt the batching. The three middleware components, TiledMap, Spine and DragonBones, follow their own internal batching mechanism, so the above components can't be batched and will interrupt the batching of other components, so users need to manage the node tree layout in modules to achieve better batching.

- For Sprite components, [Auto Atlas](../../../asset/auto-atlas.md) and [Dynamic Atlas](../../../advanced-topics/dynamic-atlas.md) are provided, which can batch by combining image textures if other conditions are met.
- For the Label component, a Bitmap caching method is provided to batch Sprite and Label components by combining the textures of the Label, but please note that the text content of the Label cannot be changed frequently using the Bitmap caching method.
- Generally speaking, the user can achieve a better batching effect by controlling the material and node tree state with the batching method.
