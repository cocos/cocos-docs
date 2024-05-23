# Miter Limit

The `miterLimit` represents the maximum miter length. The miter length refers to the distance between the inner and outer corners of the intersection of the two lines.

> __Note__: `miterLimit` is valid only if the `lineJoin` property is `miter`.

When the angle of the corners is smaller, the length of the miter is greater. To avoid miter length getting too long, we can use the `miterLimit` property.

If the miter length exceeds the value of `miterLimit`, the corners are displayed with the `bevel` type of `lineJoin`.

| Parameter | Description |
| :-------------- | :----------- |
| **number** | Positive number. Specifies the maximum miter length. If the miter length exceeds the value of `miterLimit`, the corners are displayed with the `bevel` type of `lineJoin`. |

## Example

```ts
const ctx = node.getComponent(Graphics);
ctx.miterLimit = 10;
ctx.moveTo(20,20);
ctx.lineTo(100,50);
ctx.lineTo(20,100);
ctx.stroke();
```

<img src="./miterLimit.png">

<hr>

Return to the [Graphics Component Reference](../graphics.md) documentation.
