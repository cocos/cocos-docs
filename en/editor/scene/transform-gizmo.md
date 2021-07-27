# Transform Gizmo

We mainly use the **Transform Tool** on the toolbar which is in the left top of main window to arrange the node in the scene.

## Move transform tool

**Move transform tool** is the default active transform tool. This tool can be activated by clicking the first button on top left corner of main window's tool bar, or press the keyboard shortcut **W** in scene editor.

![position tool](images/position-tool.png)

After you selected a node, You can see three move handle which is made up of red, green, blue arrow and plane in the center(or the anchor position) of the node.

Gizmo refers to a controller that can interactive with mouse and appears in certain editing states in the scene editor. These controllers are only to assist editing without being shown in the game while it is running.

![position gizmo](images/position-gizmo.png)

When the move transform tool is active:
- Press **red, green, blue** arrow and drag mouse, then the node will be moved on the **x, y, z** axis.
- Press **red, green, blue** plane and drag mouse, then the node will be moved freely on **y-z, x-z, x-y** plane.

## Rotate transform tool

Click the second button on the tool bar located at the main window's top left corner or press the keyboard shortcut **E** in scene editor and you can activate **Rotate transform tool**.

![rotation tool](images/rotation-tool.png)

The gizmo of rotate transform tool is made up of three orthogonal circles(an arrow and a circle in 2D view).By dragging arrow or any point in the circle, you can rotate the node and you can see the rotation area on gizmo before you release the mouse.

![rotation gizmo](images/rotation-gizmo.png)

When the move transform tool is active:
- Press **red, green, blue** circle and drag mouse, then the node will be rotated on the **x, y, z** axis.

## Scale transform tool

Click the third button on the tool bar located at main window's top left corner or press the keyboard shortcut **R** in the scene editor and you can activate **scale transform tool**.

![scale tool](images/scale-tool.png)

The gizmo of scale transform tool is made up of red,green,blue cube align the three axis and a gray cube in the center.

![scale gizmo](images/scale-gizmo.png)

When the scale transform tool is active:
- Press **red, green, blue** cube and drag mouse, then the node will be scaled on the **x, y, z** axis.
- Press **gray** cube and drag mouse, then the node will be scaled on all the **x, y, z** axis at the same time.

## Rect transform tool

Click the fourth button on the tool bar located at the main window's top left corner or press the keyboard shortcut **T** in scene editor and you can activate **rect transform tool**.

![rect tool](images/rect-tool.png)

The gizmo of rect transform tool is made up of four conner control point, four edge control point and one center control point.

![rect gizmo](images/rect-gizmo.png)

When the rect transform tool is active:
- Drag any conner control point of the gizmo so you can change the attributes of width and height in node size while the opposite angles end points position keep the same.
- Drag any side control point of the gizmo so you can change the attributes of width and height in node size while the opposite sides position keep the same.

In UI elements layout, **rect transform tool** is always used to precisely control the position and length of the node's dimensions. As to the image elements that must keep original image aspect ratio, the rectangle transform tool is normally not the best choice for size adjustment.

## Transform Snapping
When using the transform tool to manipulate objects, hold down the **Ctrl** key to let the transform tool change the value according to the increment snap value you set.

![transform snap config](images/transform-snap-config.png)

Click the transform snapping config button on the tool bar located at the main window's top left corner, it will pop up a transform snapping config panel.

![transform snap config panel](images/transform-snap-config-panel.png)

The increment snap value for the transform tools can be set, and also open the auto snapping function by toggling the button for the transform tools.

| Icon | Description |
| :-- | :-- |
|  ![position snap](images/position-snap.png)| if toggle on, move transform tool will increase value by increment snap value  |
|  ![rotation snap](images/rotation-snap.png)| if toggle on, rotate transform tool will increase value by increment snap value |
|  ![scale snap](images/scale-snap.png)| if toggle on, scale transform tool will increase value by increment snap value |

## Transform Gizmo Based Point Configure

![position toggles](images/position-toggles.png)

Transform Gizmo Based Point Configure is used to set the position and rotation of transform gizmo.

![pivot local](images/pivot-local.png)
![center global](images/center-global.png)

### Position

Click the **Pivot/Center** button to toggle between **Pivot** and **Center**.

- **Pivot**: use the world position of node.
- **Center**: use the center position of all selected nodes.

### Rotation

Click the **Local/Global** button to toggle between **Local** and **Global**.

- **Local**: use the rotation of node.
- **Global**: use the rotation of world space.
