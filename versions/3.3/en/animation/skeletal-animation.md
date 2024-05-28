# Skeletal Animation

Skeletal animation is a common but special type of animation. We provide two systems, **pre-baked skeletal animation** and **realtime computed skeletal animation**, optimized for different directions.

The only switch between these two systems is the `useBakedAnimation` property in the **SkeletalAnimation** component, which can also be switched seamlessly at runtime.

- When `useBakedAnimation` is enabled, the pre-baked skeletal animation system is used.
- When `useBakedAnimation` is disabled, the real-time computed skeletal animation system will be used.

For the component interface of skeletal animation, please refer to the [SkeletalAnimation API](%__APIDOC__%/en/#/docs/3.3/en/animation/Class/SkeletalAnimation).

## Pre-baked Skeletal Animation System

The overriding purpose of this system is performance, so some of the sacrifice of expressiveness is considered acceptable. We have targeted a number of underlying optimizations, and the current runtime flow is roughly as follows:

- All animation data is pre-sampled and baked in advance to a globally reused skeletal animation texture ensemble at a specified frame rate.
- Depending on whether the runtime platform supports floating point textures or not, an alternate scheme in **RGBA32F** or **RGBA8** format is used (this step of the process is of no concern to the user and will have no impact on the final performance, but is only a final underwriting strategy for low-end platforms).
- Each skeletal animation component (**SkeletalAnimation**) is responsible for maintaining the current playback progress, stored as a UBO (a Vec4).
- Each skinning model component (**SkinnedMeshRenderer**) holds the pre-baked skinning model class (BakedSkinningModel), calculates culling based on the same pre-baked wrap-around box information, updates the UBO, and finishes skinning by fetching the current data from within the texture ensemble on the GPU.

## Real-time Computed Skeletal Animation System

The overwhelming purpose of this system is expressiveness, ensuring that all details are displayed correctly, and complete programmatic control.

The current runtime flow is roughly as follows:

- All animation data is dynamically interpolated and calculated based on the current global time.
- Animation data is exported to the skeletal node tree of the scene.
- The user and any other system can have an effect on the skinning effect by manipulating this skeleton node tree.
- Each skinning model component (SkinnedMeshRenderer) holds the common skinning model class (SkinningModel), extracts the skeleton node tree information each frame to calculate culling, uploads the complete skeleton transformation information of the current frame to UBO, and finishes skinning inside the GPU. For more information about skinning, please refer to the **Skinning Algorithm** section below.

This provides the most basic support for all the following functions:

- blendshape support
- Blending and masking of an arbitrary number of animation clips
- IK, secondary physical effects
- purely procedural control of joint positions

## Selection of two systems and best practices

Currently all model assets are imported with **pre-baking system** in Prefab by default for best performance. It is recommended to use the **real-time computing system** only when it becomes apparent that the performance of the pre-baking system is not up to par.

> **Note**: although the two systems can be switched seamlessly at runtime, try not to do that at high frequencies, as each switch involves the reconstruction of the underlying rendering data.

## Skinning Algorithms

Creator provides two common standard skinning algorithms built-in, which have similar performance and only have an impact on the final performance.

1. **LBS (Linear Blending Skinning)**: skeletal information is stored as a **3 x 4** matrix, and skinning is achieved by direct linear interpolation of the matrix. Currently there are typical known issues such as volume loss.
2. **DQS (Dual Quaternion Skinning)**: skeletal information is interpolated as **Dual Quaternion**, which is more accurate and natural for skeletal animations that do not contain scaling transformations, but has approximate simplification for all scaling animations for performance reasons.

The engine uses LBS by default, and the masking algorithm can be switched by modifying the `updateJointData` function reference in the engine `skeletal-animation-utils.ts` and the header file reference in `cc-skinning.chunk`.

It is recommended that projects with high quality skinning animations try to enable DQS, but since there is no `fma` instruction until GLSL 400, operations such as `cross` cannot bypass the floating point offset problem on some GPUs and have large errors, which may introduce some visible defects.

## Socket System

If you need to attach some external nodes to a given skeletal joint, you need to use the **Socket System** of the skeletal animation component.

- Create a new child node under the skeletal animation component to be docked (the immediate parent node should be the node where the animation component is located).
- Add an array element to the `sockets` property of the skeletal animation component, select the `path` of the skeleton to be attached from the drop-down list (note that the defaultClip of the skeletal animation component must have a value, the options in the drop-down list depend on this property), and specify the child node just created as the `target`.
- This child node becomes the target socket, any external node can be put under this child node and will follow the transformation of the specified skeleton.

The socket model in the **FBX** or **glTF** asset will automatically interface to the socket system without any manual operation.

## About Dynamic Instancing

Based on the framework design of the **pre-baking system**, instancing of the skinned model is also within reach, but there is some more underlying information that needs to be collected to ensure correctness.

The fundamental problem here is that each model within the same drawcall must use the same skeleton texture, if not, the display will be completely misaligned. So how the animation data is assigned to each skeleton texture becomes a user-defined piece of information that can be configured in the [Joint Texture Layout](joint-texture-layout.md) panel in the editor menu bar **Panel -> Animation**.

> **Notes**:
>
> 1. Instancing is only supported under the **pre-baking system**. we have not strictly forbidden to enable instancing under the **real-time computation framework** (only in-editor warnings), but the animation effect will definitely be problematic, depending on the actual material assignment of the model. In the best case, the animation will be identical from instance to instance, in the worst case it will cause the model to be completely misaligned.
> 2. For models with instancing enabled in the material, the planar shading system will automatically draw with instancing as well. In particular, shading batches of skinned models require a higher level of joint texture layout, since the pipeline state of shading is uniform, and **all animations of skinned models with shadow enabled** need to be on the same texture (as opposed to drawing the model itself, which only requires consistent joint textures between instances within the same Drawcall).

## Skinned Mesh Batch Renderer

Currently, the joint textures uploaded to GPU on the bottom layer has been automatically batched and reused globally, and the upper layer data can now be combined by using the **SkinnedMeshBatchRenderer** component to merge all sub-skinned models controlled by the same skeletal animation component:

![batched-skinning-model](./animation/batched-skinning-model-component.png)

The batched version of effect is a bit more complicated to write, but basically it can be based on the normal effect used for sub-materials, with some relatively straightforward preprocessing and interface changes. See `builtin-unlit` in the editor's built-in asset (`util/batched-unlit`).

> **Note**: only the pre-baked system can guarantee correctness when using the batch skinned model component, although it can be used in the real-time computing framework, there will be rendering problems when the number of merged skeletons exceeds 30 (the maximum number of Uniform arrays).

### SkinnedMeshBatchRenderer component properties

| Property | Description |
| :--- | :-- |
| Operation | Any changes will not take effect until **Cook** button is clicked to recalculate and apply.
| Materials | Custom effect is needed for this final material - the shader code should handle all the intricacies of the batching process.
| LightmapSettings | Used for lightmapping, please refer to [Lightmapping](.../../../concepts/scene/light/lightmap.md) for details.
| ShadowCastingMode | Specifies whether the current model will cast shadows, which needs to [enable shadow effect](.../../../concepts/scene/light/shadow.md#enable-shadow-effect) in the scene first.
| ReceiveShadow | Specifies whether the current model will receive and display shadow effects generated by other objects, which needs to [enable shadow effect](.../../../concepts/scene/light/shadow.md#enable-shadow-effect) in the scene first. This property takes effect only when the type of shadows is ShadowMap.
| SkinningRoot | The root node of the skeletal skin, usually the node where the SkeletalAnimationComponent is located.
| AtlasSize | The side length of the generated final atlas.
| BatchableTextureNames | The properties of the textures in the material that are actually involved in the atlas, and those are not involved use the texture of the first unit uniformly.
| Units | The sub-model infos before batching, which is the main source of data.
| Mesh | The model data of the current sub-model, usually from glTF or FBX.
| Skeleton | The skeletal data of the current sub-model, usually from glTF or FBX.
| Material | The "sub-material" used by the current sub-model is a non-batched version of the normal effect, and the effect used by different sub-models should be consistent.
| Offset | The offset of the current sub-model's textures inside the atlas, with the top-left corner of the atlas as the origin, in the range [0, 1], e.g.: the data in the figure represents that the sub-texture overlaps with the top-left corner of the atlas.
| Size | The size occupied by the current sub-model's textures inside the atlas, in the range [0, 1], e.g.: the data in the figure represents that the sub-texture occupies 1/2 of the entire atlas.
| CopyFrom | The target properties (except offset and size) can be copied automatically by dragging in the SkinningModelComponent for easy operation.
