# LineCap

The `lineCap` property sets or returns the style of the line end cap.

| Parameter | Description
| -------------- | ----------- |
| cc.Graphics.LineCap.BUTT | default. Add a straight edge to each end of the line.
| cc.Graphics.LineCap.ROUND | Add a circular cap to each end of the line.
| cc.Graphics.LineCap.SQUARE | Add a square line cap to each end of the line.

## Example

```javascript
var ctx = node.getComponent(cc.Graphics);
ctx.lineCap = cc.Graphics.LineCap.ROUND;
ctx.lineWidth = 10;
ctx.moveTo(100, 100);
ctx.lineTo(300, 100);
ctx.fill();
```

<a href="graphics/lineCap.png"><img src="graphics/lineCap.png"></a>

<hr>

Return to [Graphics Component Reference](../../components/graphics.md).
