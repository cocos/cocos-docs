# LineJoin

`lineJoin` property sets or returns the style of the line end cap.

| Parameter | description
| -------------- | ----------- |
| cc.Graphics.LineJoin.BEVEL | Creates a bevel.
| cc.Graphics.LineJoin.ROUND | Create fillet.
| cc.Graphics.LineJoin.MITER | Default. Create sharp corners.

## Example

```javascript
var ctx = node.getComponent(cc.Graphics);
ctx.lineJoin = cc.Graphics.LineJoin.ROUND;
ctx.moveTo(20,20);
ctx.lineTo(100,50);
ctx.lineTo(20,100);
ctx.stroke();
```

<a href="graphics/lineJoin.png"><img src="graphics/lineJoin.png"></a>

<hr>

Return to [Graphics component](index.md).

