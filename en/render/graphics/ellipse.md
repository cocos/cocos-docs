# Ellipse

The `ellipse()` method is used to create an ecllipse.

| Parameter | Description
| --------- | ----------- |
| cx | The x coordinate of the center of the circle |
| cy | The y coordinate of the center of the circle |
| rx | The x radius of the circle.|
| ry | The y radius of the circle.|

## Example

```javascript
var ctx = node.getComponent(cc.Graphics);
ctx.ellipse(200,100, 200,100);
ctx.fill();
```

<a href="graphics/ellipse.png"><img src="graphics/ellipse.png"></a>

<hr>

Return to the [Graphics Component Reference](../../components/graphics.md) documentation..
