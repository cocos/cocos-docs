# Arc

The `arc()` method creates an arc/curve (used to create circles or partial circles).

> __Note__: to create a circle with `arc()`, set the start angle to `0` and the end angle to `2 * Math.PI`.

| Parameter | Description |
| -------------- | ----------- |
| *x* | The x coordinate of the center of the circle. |
| *y* | The y coordinate of the center of the circle. |
| *r* | Radius of the circle. |
| *sAngle* | Start angle in radians (The arc's three o'clock position is 0 degrees). |
| *eAngle* | End angle in radians. |
| *counterclockwise* | Optional. Specifies whether draw the arc counterclockwise or clockwise. False = clockwise, true = counterclockwise. |

## Example

```javascript
var ctx = node.getComponent(Graphics);
ctx.arc(100,75,50,0,1.5 * Math.PI);
ctx.stroke();
```

<a href="arc.png"><img src="arc.png"></a>

<hr>

Return to the [Graphics Component Reference](../graphics.md) documentation.
