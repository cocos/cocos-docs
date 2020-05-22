# Close

The `close()` method is used to create a path from a current point to a beginning point.

## Example

```javascript
var ctx = node.getComponent(cc.Graphics);
ctx.moveTo(20,20);
ctx.lineTo(20,100);
ctx.lineTo(70,100);
ctx.close();
ctx.fill();
```

<a href="graphics/close.png"><img src="graphics/close.png"></a>

<hr>

Return to the [Graphics Component Reference](../../components/graphics.md) documentation..
