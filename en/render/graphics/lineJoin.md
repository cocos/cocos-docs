# lineJoin

The `lineJoin` property determines how two connecting segments (lines, arcs or curves) with non-zero lengths in a shape are joined together.

| Parameter | description
| -------------- | ----------- |
| `cc.Graphics.LineJoin.BEVEL` | Creates a bevel.
| `cc.Graphics.LineJoin.ROUND` | Create fillet.
| `cc.Graphics.LineJoin.MITER` | Default. Create sharp corners.

## Example

```javascript
var ctx = node.getComponent(cc.Graphics);
ctx.lineJoin = cc.Graphics.LineJoin.ROUND;
ctx.moveTo(20, 20);
ctx.lineTo(100, 50);
ctx.lineTo(20, 100);
ctx.stroke();
```

![lineJoin](graphics/lineJoin.png)

<hr>

Return to the [Graphics Component Reference](../../components/graphics.md) documentation.
