# Widget component reference

Widget is a frequently used UI layout component. It can make the current node automatically align to an optional position of the parent object or restrict dimensions to make your game adaptive to different resolution ratios.

![default](widget/widget-default.png)

For API reference please read [Widget API](../../../api/en/classes/Widget.html)

## Property

Property           | Explanation                 | Note
:--                | :--                         | :--
Top                | Upper border alignment      | Once selected, an input field will appear to set the distance between the upper border of the current node and the upper border of the parent object.
Bottom             | Lower border alignment      | Once selected, an input field will appear to set the distance between the lower border of the current node and the lower border of the parent object.
Left               | Left border alignment       | Once selected, an input field will appear to set the distance between the left border of the current node and the left border of the parent object.
Right              | Right border alignment      | Once selected, an input field will appear to set the distance between the right border of the current node and the right border of the parent object.
HorizontalCenter   | Horizontal center alignment |
VerticalCenter     | Vertical center alignment   |
Target             | Align the target            | Specifies an alignment target that can only be one of the parent nodes of the current node. The default value is null, and when null, indicates the current parent.<br>If the parent node is the entire scene, it will be aligned to the visible area of the screen (`visibleRect`), and can be used to dock UI elements to the edge of the screen.
Align Mode         | Specifies the alignment mode of the Widget, which determines when the widget should refresh at runtime | Normally set to `ON_WINDOWS_RESIZE`, only to be initialized and realigned whenever the window size changes.<br>Set to ONCE, will only make alignment when the component is enabled.<br>Set to ALWAYS, will update Widget's alignment every frame. 

## Border alignment

We can place a Widget below Canvas, and perform the following tests:

### Left alignment, left border distance 100 px

![left-100px](widget/widget-left-100px.png)

### Bottom alignment, bottom border distance 50%

The percentage will take the width or height of the parent object as a benchmark

![bottom-0.5](widget/widget-bottom-0.5.png)

### Bottom right alignment, border distance 0 px

![bottom-right-0px](widget/widget-bottom-right-0px.png)

## Center alignment

### Horizontal center alignment

![bottom-right-0px](widget/widget-h-center.png)

### Vertical center alignment and right border distance 50%

![v-center-right-0.5](widget/widget-v-center-right-0.5.png)

## Limit size

If you align the left and right side at the same time, or align the top and bottom at the same time, then the size will be stretched in the corresponding direction.

Let us look at a demonstration. Place two rectangular Sprites in the scene and take the bigger one as the dialog box background and the smaller one as the button on the dialog box. Take the button node as the child node of the dialog box and set the button into Sliced mode so that you can observe the stretch effect.

### Horizontal stretch, left and right margin 10%

![h-stretch](widget/widget-h-stretch.png)

### Vertical stretch, no margins on each end and horizontal center alignment

![v-stretch](widget/widget-v-stretch.png)

### Stretch in the horizontal and vertical directions, margin 50 px

![margin-50px](widget/widget-margin-50px.png)

## Limitation on node position control

If `Align Mode` property is set to `ALWAYS`, Widget will set alignment for current node every frame, overriding node's position and width/height setting. Thus user may not effectively change position or size of the node.

To make sure you can update node's position or size during runtime:

1. set `Align Mode` to `ONCE`, so it will only align during onEnable process.
2. Use Widget's API to update node's position and size, for example updating Widget's `top`, `bottom`, `left`, `right` instead of node's `x`, `y`, `width`, `height`.

## Note

Widget will adjust current node's position and size automatically, but the results after adjustment can not be obtained until the next frame unless you call [updateAlignment](../../../api/en/classes/Widget.html#updatealignment) manually.
