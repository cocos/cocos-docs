# Line Cap

The `lineCap` property represents the style of the line end cap.

| Possible line cap options | Description |
| :-------------- | :----------- |
| **Graphics.LineCap.BUTT**   | Default. Add a straight edge to each end of the line. |
| **Graphics.LineCap.ROUND**  | Add a circular cap to each end of the line. |
| **Graphics.LineCap.SQUARE** | Add a square line cap to each end of the line. |

## Example

```ts
const ctx = node.getComponent(Graphics);
ctx.lineCap = Graphics.LineCap.ROUND;
ctx.lineWidth = 10;
ctx.moveTo(100, 100);
ctx.lineTo(300, 100);
ctx.stroke();
```

<img src="./lineCap.png">

<hr>

Return to the [Graphics Component Reference](../graphics.md) documentation.
