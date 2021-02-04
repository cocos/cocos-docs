# Camera

The __Camera__ in a game is the main tool used to capture __Scenes__. The visible range of the __Camera__ is controlled by adjusting camera-related parameters. The __Camera__ is represented as follows in the __Cocos Creator__ editor:

![camera](camera/camera.jpg)

The __Camera__'s visual range is composed of __6__ planes forming a **Frustum**, a **Near Plane**, and a **Far Plane** to control the visible distance and range of near and far distance, at the same time, they also constitute the size of the viewport.

![camera view](camera/camera-view.gif)

To use `Camera`, please refer to the [Camera API](../../../api/en/classes/component_camera.camera.html).

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

### The Visibility property of the camera is set

Set which tiers should be observed by this camera and which tiers should not be observed.

Note: From version 3.0 of the Creator, the rendering of 2d elements (such as Sprite) also follows the Layer and Visibility judgement, so you can adjust the layer and visibility as required.

The Visibility property is calculated from the value of multiple layer ` | ` operations when the user has checked more than one layer as the basis for visibility of the camera.

The image below shows the layer used by the camera.

![camera visibility gizmo](camera-visibility-gizmo.png)

In this case the Visibility property of the camera is ` 1 << 23 | 1 << 30 = 1820327937 `.

For details on the implementation of layers, see [Layer](../../concepts/scene/layer.md) documentation.

### Visibility calculations for the camera

The camera itself can set one or more visible Visibility properties, and has its own layer values on the node, which is a 2^32^ integer, one for each visible layer, using bitwise operations to support up to 32 different layer labels (one bit for each layer value, i.e. 2^layer^). When culling the camera, the ` & ` operation is performed with the camera based on the layer value of each node, and if the Visibility property of the camera contains this layer, then the current node should be visible to the camera. If the camera's Visibility property contains this layer, then the current node should be visible to the camera.
