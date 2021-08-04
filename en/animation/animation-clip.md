# Animation Clip

An Animation Clip is an animation declaration data, i.e. an asset containing animation data, which is one of the core of the animation system. By attaching an animation clip on the [Animation Component](animation-component.md), this animation data can be applied to the node where the animation component is located.

Currently Creator supports importing skeletal animation assets produced by external art tools, or creating a new animation clip asset directly inside Creator.

## Animations created inside Creator

New animation clips can be created, edited and previewed directly through the **Animation** panel, see [Animation Editor](animation.md) for details.

This can also be done via script, see [Using Animation Curves](use-animation-curve.md) for details.

## Externally imported skeleton animations

Externally imported animations include the following:

1. skeletal animations produced by third-party art tools;

2. skeletal animations that come with the model after it is imported.

    When a model with animation is imported, the animation contained in the model will be imported at the same time. This animation is used in the same way as the internal new assets, and the crop of skeletal animation can be referred to [Introduction to the animation module of model assets](../asset/mesh.md).

For more details about skeletal animation settings, etc., please refer to the [Skeletal Animation](skeletal-animation.md) documentation.

> **Note**: skeletal animations imported externally are not supported to be edited in **Animation** panel, and the nodes are locked, and can only be edited in external art tools.
>
> ![skeletal animation](animation-clip/skeletal-animation.png)
