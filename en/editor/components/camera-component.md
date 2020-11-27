# Camera

The __Camera__ in a game is the main tool used to capture __Scenes__. The visible range of the __Camera__ is controlled by adjusting camera-related parameters. The __Camera__ is represented as follows in the __Cocos Creator__ editor:

![camera](camera/camera.jpg)

The __Camera__'s visual range is composed of __6__ planes forming a **Frustum**, a **Near Plane**, and a **Far Plane** to control the visible distance and range of near and far distance, at the same time, they also constitute the size of the viewport.

![camera view](camera/camera-view.gif)

To use `Camera`, please refer to the [Camera API](https://docs.cocos.com/creator3d/api/en/classes/component_camera.camera.html).

## Camera components

The __Camera Component__ is an important functional component that we use to present a __Scene__.

![camera component](camera/camera-comp.jpg)

| Parameter | Description |
|:-------:|:---:|
| *ClearFlags* | Camera clear logo. Contains: <br> **DONT_CLEAR**: not clear; <br> **DEPTH_ONLY**: only clear the depth; <br> **SLOD_COLOR**: clear the color, depth and template buffer|
| *Color* | Clear the specified color |
| *Depth* | Clear the specified depth |
| *Stencil* | Clear the specified template buffer |
| *Far* | Far cutting distance |
| *Near* | Near cutting distance |
| *Fov* | Angle of view |
| *OrthoHeight* | The height of the orthogonal __Camera__ |
| *Priority* | Priority. High-priority __Camera__s will be rendered first in the rendering process |
| *Projection* | Projection mode. Divided into **perspective projection (PERSPECTIVE)** and **orthogonal projection (ORTHO)** |
| *Rect* | Viewport size of __Camera__ |
| *Visibility* | The visibility of the __Camera__. Used to control the visibility of different models in the same __Camera__. |

## Camera group rendering

The __Camera__'s group rendering function works with the [Model Component](../../engine/renderable) through the __Visibility__ property of the [Camera Component](../../editor/components/camera-component.md). The user can set the __Visibility__ value through code to complete the group rendering. It should be noted that the __Visibility__ value is **bitwise comparison**, and the user can manipulate the **top 20 bits of Visibility** through **bit operations** to complete the grouping.

The __Camera__ and models provided by default are all __rendered without grouping__. You do not need to change this value if the game has no special requirements to do so.
