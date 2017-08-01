# Auto Layout Container

The layout component can be mounted to any node, making the node into a container with the auto layout function. The so-called auto layout container can automatically array the subnodes according to certain rules and adjust the container type nodes of its own size according to the sum total of bounding boxes of the node content.

## Layout Type

Auto layout components have several basic layout types. These can be set up by the `Layout Type` property, which includes the following types.

### Horizontal Layout

![horizontal](auto-layout/horizontal.jpg)

When `Layout Type` is set as `Horizontal`, all the subnodes will automatically be arrayed horizontally, and the width of the Layout node will be set up according to the sum total of the subnodes' `Width` .Then the two Label nodes included in the picture above will automatically be arrayed horizontally.

In the horizontal layout type, the Layout component will not interfere with the position or height properties of the node on the y axis. The subnode can even be put outside the maximal height of the layout node's bounding box. If subnodes need to be aligned upward along the y axis, you can add the Widget component to the subnodes and open the alignment mode of the Top or Bottom.

### Vertical Layout

![vertical](auto-layout/vertical.jpg)

When `Layout Type` is set as `Vertical`, all the subnodes will automatically be arrayed vertically and the height of the Layout node will be set up according to the sum total of the subnodes' `Height`.

In the vertical layout type, the Layout component will not modify the position or width properties of the node on the x axis. Subnodes can only be neatly arrayed by adding the Widget and opening the Left or Right alignment mode.

## Node Direction

The Layout arrays' subnodes are based on the display order of subnodes in **Node Tree** and refers to the array directions set up by the `Vertical Direction` or `Horizontal Direction` properties.

### Horizontal Direction

You can set up two directions:  `Left to Right` or `Right to Left`. The former will array the nodes from left to right according to their display order in **Node Tree**; the later will array the nodes from right to left according to their display order in **Node Tree**.

### Vertical Direction

You can set up two directions:  `Top to Bottom` or `Bottom to Top`. The former will array the nodes from top to bottom according to their display order in **Node Tree**; the later will array the nodes from bottom to top according to their display order in **Node Tree**.

## Other layout types are coming soon

We will update this part of the document in the next edition.

For the properties of other Layout components, please check [Layout](../components/layout.md) document.

<hr>

Continue on to read about [List with Data](list-with-data.md).
