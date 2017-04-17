# Stroke

The `stroke()` method actually draws a path defined by a path method such as `moveTo()` and `lineTo()`. The default color is black.

## Example

```javascript
var ctx = node.getComponent(cc.Graphics);
ctx.moveTo(20,100);
ctx.stroke(20,20);
ctx.stroke(70,20);
ctx.stroke();
```

<a href="graphics/stroke.png"><img src="graphics/stroke.png"></a>

<hr>

Return to [Graphics component](index.md).
