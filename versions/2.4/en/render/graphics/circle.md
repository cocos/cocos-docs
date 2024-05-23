# circle

The `circle()` method is used to create a circle.

| Parameter | Description
| :------------- | :---------- |
| cx | The x coordinate of the center of the circle.
| cy | The y coordinate of the center of the circle.
| r | Radius of the circle.

## Example

```javascript
var ctx = node.getComponent(cc.Graphics);
ctx.circle(200, 200, 200);
ctx.stroke();
```

![circle](graphics/circle.png)

<hr>

Return to the [Graphics Component Reference](../../components/graphics.md) documentation.
