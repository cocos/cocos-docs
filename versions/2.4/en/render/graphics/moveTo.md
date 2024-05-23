# moveTo

The `moveTo()` method is used to set the starting point of a path.

| Parameter | Description
| :------------- | :---------- |
| x | The x coordinate of the target location of the path
| y | The y coordinate of the target position of the path

## example

```javascript
var ctx = node.getComponent(cc.Graphics);
ctx.moveTo(0, 0);
ctx.lineTo(300, 150);
ctx.stroke();
```

![moveTo](graphics/moveTo.png)

<hr>

Return to the [Graphics Component Reference](../../components/graphics.md) documentation..
