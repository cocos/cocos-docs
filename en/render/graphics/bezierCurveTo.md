# BezierCurveTo

The `bezierCurveTo()` method adds a point to the current path by using the specified control point that represents the cubic bezier curves.

**Note**: Cubic Bezier curves require three control points. The first two points are for the control points in the cubic Bezier calculation, and the third point is the end point of the curve. The starting point of the curve is the last point in the current path.

| Parameter | Description |
| -------------- | ----------- |
| cp1x | The first Bezier control point of the x coordinate. |
| cp1y | The first Bezier control point of the y coordinate. |
| cp2x | The second Bezier control point of the x coordinate. |
| cp2y | The second Bezier control point of the y coordinate. |
| x | The x coordinate of the end point. |
| y | The y coordinate of the end point. |

## Example

```javascript
var ctx = node.getComponent (cc.Graphics);
ctx.moveTo (20,20);
ctx.bezierCurveTo (20,100,200,100,200,20);
ctx.stroke ();
```

<a href="graphics/bezierCurveTo.png"><img src = "graphics/bezierCurveTo.png"></a>

<Hr>

Return to [Graphics Component Reference](../../components/graphics.md)
