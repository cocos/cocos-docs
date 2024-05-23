# Circles

The `circle()` method is used to create a circle.

| Parameter | Description |
| :-------------- | :----------- |
| **cx** | The x coordinate of the center of the circle. |
| **cy** | The y coordinate of the center of the circle. |
| **r** | Radius of the circle. |

## Example

```ts
const ctx = node.getComponent(Graphics);
ctx.circle(200,200, 200);
ctx.stroke();
```

<img src="./circle.png">

<hr>

Return to the [Graphics Component Reference](../graphics.md) documentation.
