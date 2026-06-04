# Programmatically Create Meshes

Meshes can be created through the API when the model created by the DCC (Digital Content Creation) software or by the in-engine terrain editor does not meet the needs. If you need to create some kind of snake that can grow at runtime, edit the model dynamically, or implement certain surfaces, you can create the mesh programmatically.

## Create Mesh

The engine supports two kinds of meshes: **static meshes** and **dynamic meshes** for different scenarios, which developers can use on demand.

- Static mesh, created with `utils.MeshUtils.createMesh`, once created successfully, the geometry inside the mesh is not editable.
- Dynamic mesh: created with `utils.MeshUtils.createDynamicMesh`, once created, the geometry inside the mesh can still be modified.

The return value is the `Mesh` component, so it is convenient to assign it to the `mesh` property of the `MeshRenderer` so that it can be displayed on the screen.

## API

API please refer to [MeshUtils](%__APIDOC__%/zh/class/utils.MeshUtils).

## Example

![dynamic mesh](./mesh/dynamic-mesh.gif)

See [GitHub](https://github.com/cocos/cocos-test-projects/tree/v3.8) for an example of a dynamic mesh.
