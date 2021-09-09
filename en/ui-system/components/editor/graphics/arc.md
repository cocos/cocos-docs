# Arc

The `arc()` method creates an arc/curve (used to create circles or partial circles).

> __Note__: to create a circle with `arc()`, set the start angle to `0` and the end angle to `2 * Math.PI`.

| Parameter | Description |
| :-------------- | :----------- |
| **x** | The x coordinate of the center control point. |
| **y** | The y coordinate of the center control point. |
| **r** |Arc radian. |
| **startAngle** | Start radian, measured clockwise from positive x axis. |
| **endAngle** | End radian, measured clockwise from positive x axis. |
| **counterclockwise** | If true, draw counterclockwise between the two angles. Clockwise by default. |

## Example

```ts
const ctx = node.getComponent(Graphics);
ctx.arc(100,75,50,0,1.5 * Math.PI);
ctx.stroke();
```

<a href="arc.png"><img src="arc.png"></a>

<hr>

Return to the [Graphics Component Reference](../graphics.md) documentation.
