# Close

The `close()` method is used to create a path from a current point to the beginning point.

## Example

```javascript
var ctx = node.getComponent(Graphics);
ctx.moveTo(20,20);
ctx.lineTo(20,100);
ctx.lineTo(70,100);
ctx.close();
ctx.stroke();
```

<a href="close.png"><img src="close.png"></a>

<hr>

Return to the [Graphics Component Reference](../graphics.md) documentation.
