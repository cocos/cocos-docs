# Line To

The `lineTo()` method is used to add a new point, and then create a line from the current graphic cursor to that point.

| Parameter | Description |
| --------- | ----------- |
| *x* | The x coordinate of the target location of the path. |
| *y* | The y coordinate of the target position of the path. |

## Example

```ts
const ctx = node.getComponent(Graphics);
ctx.moveTo(20,100);
ctx.lineTo(20,20);
ctx.lineTo(70,20);
ctx.stroke();
```

<img src="./lineTo.png">

<hr>

Return to the [Graphics Component Reference](../graphics.md) documentation.
