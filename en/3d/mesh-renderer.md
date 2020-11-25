# Mesh Renderer Component Reference

> Authors: Xunyi, youyou

Mesh Renderer is used to draw mesh resource. If there are multiple submeshes in the mesh resource, then the corresponding number of textures are needed in the Mesh Renderer to correctly draw the mesh.

## Mesh Renderer property

![](img/mesh_renderer.png)

- mesh  

Specify the mesh resource used for rendering

- textures  

Mesh resource allow for the use of multiple texture resources, and all texture resources are stored in the `textures` array.<br>

If there are multiple submeshes in the mesh resource, the Mesh Renderer will obtain the corresponding texture from the `textures` array to render the submesh.

## Debug

The vertex data of the mesh is generally abstract, and it is hard to see how the triangles are distributed in the mesh. At this time the user can turn on wireframe mode, and use the line segment to connect the vertices and other vertices according to the distribution of the triangles, so that it is easier to see the number and distribution of the mesh vertices.

```javascript
cc.macro.SHOW_MESH_WIREFRAME = true;
```
