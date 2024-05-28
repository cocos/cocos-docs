# ScrollBar Component Reference

The ScrollBar allows the user to scroll by dragging a sliding block. It's a bit similar to the __Slider__ component, but it is mostly used as a part of the __ScrollView__ while __Slider__ is used independently to set values.

![scrollbar.png](scroll/scrollbar.png)

Click the __Add Component__ button at the bottom of the __Inspector__ panel and select __UI/ScrollBar__ to add the ScrollBar component to the node.

Please refer to the [ScrollBar API](%__APIDOC__%/en/class/ScrollBar).

## ScrollBar Properties

| Property | Function Explanation |
| :-------------- | :----------- |
| **AutoHideTime** | Time to hide the __ScrollBar__ automatically, need to set `Enable Auto Hide` to true for it to take effect |
| **Direction** | Scroll direction, including __HORIZONTAL__ and __VERTICAL__
| **EnableAutoHide** | Enable or disable auto hide. If this property is enabled, the __ScrollBar__ will automatically disappear after actions stopped for __AutoHideTime__. |
| **Handle** | ScrollBar foreground picture. The length/width will be calculated according to the content size of ScrollView and the dimensions of the actual display area |

## Detailed Explanation

The ScrollBar normally is used together with `ScrollView` instead of being used alone. Also, ScrollBar needs to assign a `Sprite` component, i.e. `Handle` in the Inspector panel.

Normally we will also designate a background image to ScrollBar. This can be used to indicate the length or width of the whole ScrollBar.
