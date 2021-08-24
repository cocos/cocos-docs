# Layout Component Reference

__Layout__ is a component for UI container nodes. This component provide to the container various layout functionalities to automatically arrange all the children, so that the developer can make list, page, grid container, etc conveniently.

  ![layout](layout/layout.png)

Click the __Add Component__ button at the bottom of the __Inspector__ panel and select __UI -> Layout__ to add the __Layout__ component to the node.

To use `Layout`, please refer to the [Layout API](__APIDOC__/en/classes/ui.layout.html) documentation and the [05.layout example](https://github.com/cocos-creator/test-cases-3d/tree/v3.3/assets/cases/ui/05.layout) of the **test-cases-3d** project.

## Layout Properties

| Property           | Function Explanation      |
| :--------------         | :-----------   |
| __Type__                 | Layout type, including __NONE__, __HORIZONTAL__, __VERTICAL__ and __GRID__. |
| __ResizeMode__           | Resize mode, including __NONE__, __CHILDREN__ and __CONTAINER__. |
| __PaddingLeft__          | The left padding between the children and the container frame. |
| __PaddingRight__         | The right padding between the children and the container frame. |
| __PaddingTop__           | The top padding between the children and the container frame. |
| __PaddingBottom__        | The bottom padding between the children and the container frame. |
| __SpacingX__             | The spacing between children in the horizontal layout. __NONE__ mode doesn't have this property. |
| __SpacingY__             | The spacing between children in the vertical layout. __NONE__ mode doesn't have this property. |
| __HorizontalDirection__  | When it is designated as horizontal layout, this property determines which side(left or right) does the first child node start in the layout. When the __Layout__ type is set to __GRID__, this property along with `Start Axis` property determine the starting horizontal alignment of __GRID__ layout elements. |
| __VerticalDirection__    | When it is designated as vertical layout, this property determines which side(top or bottom) does the first child node start in the layout. When the __Layout__ type is set to __GRID__, this property with `Start Axis` property determines the starting vertical alignment of __GRID__ layout elements. |
| __CellSize__             | This property is only available in __GRID__ layout, __CHILDREN__ resize mode, determines the size of each child node. |
| __StartAxis__            | This property is only available in __GRID__ layout, determines the arrangement direction of children. |
| __AffectedByScale__      | Whether the scale of the child node affects the layout.  |
| __AutoAlignment__      | Auto-alignment, in `Type` type __HORIZONTAL__ or __VERTICAL__ mode, ensures that the other axial value is zero.  |
| __Constraint__      | Layout constraints that constrain the number of alignments in a given direction, supporting __NONE__, __FIXED_ROW__ and __FIXED_COL__.  |
| __ConstraintNum__      | The layout constraint value, valid in `Constraint` of type __FIXED_ROW__ or __FIXED_COL__ mode.  |

## Detailed Explanation

After adding the `Layout` component, the default layout type is __NONE__, you can toggle the container alignment type by modifying `Type` in **Inspector**. The types are **HORIZONTAL**, **VERTICAL** and **GRID** layouts. Also, `ResizeMode` is supported for all layout types except **NONE**.

- The modes of `Resize Mode`:

    - When __Resize Mode__ is __NONE__, the size of the container and children is independent from each other.

    - When __Resize Mode__ is __CHILDREN__, the size of the children will change with the size of the container to make sure all children fit inside the container's bounding box.

    - When __Resize Mode__ is __CONTAINER__, the size of the container will change with the size of the children to make sure the container is large enough to contain all children inside its bounding box.

    All alignments are calculated based on the container size. If the sorting needs to be fixed, set the `Type` to `Grid` and then set the `Constraint` and `ConstraintNum` to fix the sorting.

- The modes of `Constraint`:

    - When __Constraint__ is __NONE__, the layout is free of __Constraint__.

    - When __Constraint__ is __FIXED_ROW__, a fixed number of rows is used with `ConstraintNum`.

    - When __Constraint__ is __FIXED_COL__, a fixed number of columns is used with `ConstraintNum`.

> __Note__: if the __Layout__'s configuration is set in runtime, the results need to be updated until the next frame, unless you manually call `updateLayout` API.

For more layout examples, please refer to the [Auto Layout](../engine/auto-layout.md) documentation for details.
