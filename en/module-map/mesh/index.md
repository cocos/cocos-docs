# Meshes

Meshes are generally used to draw 3D images. Cocos Creator provides the following mesh renderer components to render base meshes, skinned meshes, etc., so that the model can be drawn and displayed:

- [MeshRenderer](../../engine/renderable/model-component.md): used to render static 3D models.
- [SkinnedMeshRenderer](../../animation/skeletal-animation.md): used to render skeletal animations.
- [SkinnedMeshBatchRenderer](../../animation/skeletal-animation.md): used to combine the rendering of all sub-skinned models controlled by the same skeletal animation component.

Also, if the model needs to be applied to actual physical collisions to achieve an effect similar to a bumpy road surface, use the Mesh Collision component, which will generate a collision mesh based on the model shape. Please refer to [using mesh collisions](../../physics/physics-collider.md#realize-the-shape-of-goose-soft-stone) documentation for details.
