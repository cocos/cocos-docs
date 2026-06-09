# Move To

The `moveTo()` method sets the starting point of a path.

Parameter | Description |
| :-------------- | :----------- |
| **x** | The x coordinate of the target location of the path. |
| **y** | The y coordinate of the target position of the path. |

## Example

```ts
const ctx = node.getComponent(Graphics);
ctx.moveTo(0,0);
ctx.lineTo(300,150);
ctx.stroke();
```

<img src="./moveTo.png">

<hr>

Return to the [Graphics Component Reference](../graphics.md) documentation.
