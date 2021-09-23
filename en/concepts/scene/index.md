# Scene Creation Workflow

A scene is an abstract collection of environmental factors in a game, a local unit for creating a game environment. Game developers represent a part of the game's world content by creating a scene in the editor.

![scene world](./scene/world01.jpg)

## Scene Structure

Cocos Creator implements a free scene structure using a node tree and a node component system. The **Node** is responsible for managing the parent-child relationship of the node tree and the spatial matrix transformation **Transform**, so that all entity nodes can be easily managed and placed in the scene.

The component system gives nodes a variety of advanced features, such as **MeshRenderer** component, **Animation** component, **Light** component, **Terrain** component, and more. One of the necessary elements of the 3D scene is the **Camera** component, which represents the player's viewpoint in the game, without which nothing can be seen. Therefore, when creating a scene, the Creator will create a node with the **Camera** component mounted by default.

## Scene Creation Related Workflow

- [Nodes and Components](node-component.md)
- [Coordinate System and Transformations](coord.md)
- [Node Hierarchy and Display Order](node-tree.md)
- [Building a Scene with the Scene Panel](scene-editing.md)
- [Skybox](skybox.md)
- [Global Fog](fog.md)
- [Shadow](./light/shadow.md)
