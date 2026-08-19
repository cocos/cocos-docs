# Line Join

The `lineJoin` property represents the style of the joint between two line segments.

| Possible line join options | Description |
| :-------------- | :----------- |
| **Graphics.LineJoin.BEVEL** | Creates a bevel |
| **Graphics.LineJoin.ROUND** | Create a fillet |
| **Graphics.LineJoin.MITER** | Default. Create sharp corners |

## Example

```ts
const ctx = node.getComponent(Graphics);
ctx.lineJoin = Graphics.LineJoin.ROUND;
ctx.moveTo(20,20);
ctx.lineTo(100,50);
ctx.lineTo(20,100);
ctx.stroke();
```

<img src="./lineJoin.png">

<hr>

Return to the [Graphics Component Reference](../graphics.md) documentation.
