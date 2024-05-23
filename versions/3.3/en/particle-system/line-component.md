# Line Component

The Line component is used to render a line segment connected by a given point in a 3D scene. The line segment rendered by the Line component is wide and always faces the camera, which is similar to the billboard component.

Properties | Features
---|---
**texture** | The map displayed in the line segment.
**worldSpace** | Which coordinate system is used for the coordinates of each point in the line segment, check Use world coordinate system, and deselect use local coordinate system.
**positions** | The coordinates of the end points of each line segment.
**wdith** | The width of the line segment, if a curve is used, it means the change of the curve along the direction of the line segment.
**tile** | Number of texture tiles.
**offset** | The offset of the texture coordinates.
**color** | The color of the line segment. If a gradient color is used, it indicates the color gradient along the direction of the line segment.

To use `Line`, please refer to the [Line API](__APIDOC__/en/#/docs/3.3/en/particle/Class/Line).
