# Quadratic Curve To

The `quadraticCurveTo()` method adds a point to the current path by using the specified control point that represents the __Quadratic Bezier curve__.

> __Note__: the **Quadratic Bezier curve** requires two points. The first point is for the control point in the second bessel calculation, and the second point is the end point of the curve. The starting point of the curve is the last point in the current path.

| Parameter | Description |
| :-------------- | :----------- |
| **cpx** | The x coordinate of the Bezier control point. |
| **cpy** | The y coordinate of the Bezier control point. |
| **x** | The x coordinate of the end point. |
| **y** | The y coordinate of the end point. |

## Example

```ts
const ctx = node.getComponent(Graphics);
ctx.moveTo(20,20);
ctx.quadraticCurveTo(20,100,200,20);
ctx.stroke();
```

<img src="./quadraticCurveTo.png">

<hr>

Return to the [Graphics Component Reference](../graphics.md) documentation.
