# MoveTo

Use `moveTo` method set the starting point of a path.

Parameter | description
| -------------- | ----------- |
| X | The x coordinate of the target location of the path
| Y | The y coordinate of the target position of the path

## example

```javascript
var ctx = node.getComponent(cc.Graphics);
ctx.moveTo(0,0);
ctx.lineTo(300,150);
ctx.stroke();
```

<a href="graphics/moveTo.png"><img src="graphics/moveTo.png"></a>

<hr>

Return to [Graphics component](index.md).
