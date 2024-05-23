# lineTo

The `lineTo()` method is used to add a new point, and then create a line from that point to the last specified point in the canvas.

| Parameter | Description
| :------------- | :---------- |
| x | The x coordinate of the target location of the path
| y | The y coordinate of the target position of the path

## Example

```javascript
var ctx = node.getComponent(cc.Graphics);
ctx.moveTo(20, 100);
ctx.lineTo(20, 20);
ctx.lineTo(70, 20);
ctx.stroke();
```

![lineTo](graphics/lineTo.png)

<hr>

Return to the [Graphics Component Reference](../../components/graphics.md) documentation..
