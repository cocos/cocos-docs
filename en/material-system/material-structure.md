# Material System Classes Diagram

The material system controls the final shading process and order of each model, and the related inter-class structures in the engine are as follows:

[![Assets](img/material.png "Click to view diagram source")](material.dot)

The material system controls the final coloring process and order of each model. The related inter-class structures in the engine are as follows: a **Material** ([Material](../asset/material.md)) in the above figure and **EffectAsset** ([Effect](../shader/index.md)) are all assets.

- **Material** is responsible for the `Uniform` declared by EffectAsset, macro data storage, and Shader usage and management, which are displayed in the **Inspector** panel in the form of visual properties of material assets. Material is usually used by renderer components. All components that inherit from RenderableComponent are renderer components, such as MeshRenderer, Sprite, etc. For more information, please refer to [Material Assets](../asset/material.md).

- **EffectAsset** is responsible for providing property, macro, shader list definitions. Each EffectAsset is eventually compiled into the format used in the engine, and the engine parses and applies it according to the format. All parsed EffectAsset information will be registered in the ProgramLib library in the engine, so that users can directly obtain the EffectAsset resources used by the actual engine through the code. See [shaders](../shader/index.md) for more details.
