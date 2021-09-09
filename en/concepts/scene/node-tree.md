# Node Hierarchy and Rendering Order

Combining Nodes and Components together creates all kinds of images, texts and interactive elements in a scene. When there are more and more elements in the scene, we can use the **Hierarchy** panel to arrange their hierarchy and rendering order to make things organized.

## Hierarchy Panel

When creating and editing nodes, the **Scene** panel can display an intuitive visualization of scene elements. The hierarchical relationships between nodes need to be checked and manipulated using the **Hierarchy** panel. Please refer to the [Hierarchy panel](../../editor/hierarchy/index.md) documentation first to learn how to use it.

## Node Trees

The complete logical relationship between nodes established by the operations of the **Hierarchy** panel or runtime scripts is called a **node tree**.

Using a simple game scenario demonstrates what a node tree is. The following picture includes a background image, a main character (the blob), a title, a springboard, diamonds and a button to start the game.

![rolling-ball](node-tree/rolling-ball.png)

Each visual element is a node. Usually all nodes are not laid flat on the scene, but rather, organized into a node tree according to a certain classification and order (e.g.: according to our own preferences). Example:

![node-tree](node-tree/node-tree.png)

The nodes displayed in the upper level are referred to as parent nodes and those displayed in the lower level are referred to as children. In the **Hierarchy** panel, the node tree in the above figure would look like this:

![in_hierarchy](node-tree/in_hierarchy.png)

In Cocos Creator 3.0, UI nodes require any parent node to have at least one **UITransform** component, if it does not comply with the rules, a Canvas node will be automatically added as its parent, the node tree in the above figure puts all UI nodes under the Canvas node. Next, parent nodes are created according to the category and put nodes of the same category under one parent node to build the node tree.

In real game projects, other methods (such as game logic) can be used to organize the node tree as needed.

## Rendering Order of Nodes

The rendering of 3D nodes is related to the Z-coordinate value of the distance between the node and the camera, transparency, etc.

The rendering and occlusion relationship of UI nodes, on the other hand, is influenced by the node tree, which is rendered in order of node arrangement from top to bottom in the **Hierarchy** panel, meaning that nodes displayed above the list are occluded by the nodes below them in the scene. Therefore, the child nodes will always cover the parent nodes. For details, please refer to the [UI rendering ordering rules](../../ui-system/components/engine/priority.md) documentation.

Other rendering-related references can be found in.

- [Graphics Rendering](../../module-map/graphics.md)
- [Particle Renderer](../../particle-system/renderer.md)
- [Model Group Rendering](../../engine/renderable/model-component.md#model-group-rendering)

## Performance Considerations

> **Note**: although it is said that the parent node can be used to organize logical relationships or even as a container to host child nodes, the scene loading speed will be affected when there are too many nodes, avoid a large number of meaningless nodes when creating a scene and merge nodes with the same function as much as possible.
