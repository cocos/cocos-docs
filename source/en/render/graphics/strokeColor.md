# StrokeColor

The `strokeColor` property sets or returns the color used for the stroke.

## Example

```javascript
var ctx = node.getComponent(cc.Graphics);
ctx.lineWidth = 2;
ctx.strokeColor = cc.hexToColor('#0000ff');
ctx.rect(20,20,250,200);
ctx.stroke();
```

<a href="graphics/strokeColor.png"><img src="graphics/strokeColor.png"></a>

<hr>

Return to [Graphics component](index.md).
