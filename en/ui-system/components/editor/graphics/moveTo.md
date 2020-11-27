# Move To

The `moveTo()` method sets the starting point of a path.

Parameter | Description |
| -------------- | ----------- |
| *x* | The x coordinate of the target location of the path. |
| *y* | The y coordinate of the target position of the path. |

## Example

```javascript
var ctx = node.getComponent(Graphics);
ctx.moveTo(0,0);
ctx.lineTo(300,150);
ctx.stroke();
```

<a href="moveTo.png"><img src="moveTo.png"></a>

<hr>

Return to the [Graphics Component Reference](../graphics.md) documentation.
