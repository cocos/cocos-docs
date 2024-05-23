# rect

The `rect()` method is used to create a rectangle.

| Parameter | Description
| :------------- | :---------- |
| x | The x coordinate of the lower left point of the rectangle.
| y | The y coordinate of the center of the lower left point of the rectangle.
| width  | The width of rectangle.
| height | The height of rectangle.

## Example

```javascript
var ctx = node.getComponent(cc.Graphics);
ctx.rect(20, 20, 150, 100);
ctx.stroke();
```

![rect](graphics/rect.png)

```javascript
var ctx = node.getComponent(cc.Graphics);

// Red rectangle
ctx.lineWidth = 6;
ctx.strokeColor = cc.Color.RED;
ctx.rect(5, 5, 290, 140);
ctx.stroke();

// Green rectangle
ctx.lineWidth = 4;
ctx.strokeColor = cc.Color.GREEN;
ctx.rect(30, 30, 50, 50);
ctx.stroke();

// Blue rectangle
ctx.lineWidth = 10;
ctx.strokeColor = cc.Color.BLUE;
ctx.rect(50, 50, 150, 80);
ctx.stroke();
```

![rect](graphics/rect2.png)

<hr>

Return to the [Graphics Component Reference](../../components/graphics.md) documentation.
