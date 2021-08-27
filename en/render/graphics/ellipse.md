# ellipse

The `ellipse()` method is used to create an ecllipse.

| Parameter | Description
| :-------- | :---------- |
| cx | The x coordinate of the center of the ecllipse. |
| cy | The y coordinate of the center of the ecllipse. |
| rx | The x radius of the ecllipse.|
| ry | The y radius of the ecllipse.|

## Example

```javascript
var ctx = node.getComponent(cc.Graphics);
ctx.ellipse(200, 100, 200, 100);
ctx.stroke();
```

![ellipse](graphics/ellipse.png)

<hr>

Return to the [Graphics Component Reference](../../components/graphics.md) documentation..
