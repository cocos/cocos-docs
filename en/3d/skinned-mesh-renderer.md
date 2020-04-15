# Skinned Mesh Renderer Component Reference

> Authors: Xunyi, youyou

Skinned Mesh Renderer component inherits from Mesh Renderer, so Skinned Mesh Renderer component can also specify `mesh` and `textures` properties.

Cocos Creator uses Skinned Mesh Renderer component to render skeletal animation, skeletal animation. Skeletal animation will associate vertices in the mesh with the skeleton (a set of nodes), then the skeletal animation will drive the skeletal in a pre-edited animation, to deform the mesh to achieve animation effects

When importing a model, if there is a skeletal animation in the model, the editor automatically adds the Skinned Mesh Renderer component to the generated Prefab.
