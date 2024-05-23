# Rect

The `rect()` method is used to create a rectangle.

| Parameter | Description |
| :-------------- | :----------- |
| **x** | The x coordinate of the lower left point of the rectangle. |
| **y** | The y coordinate of the lower left point of the rectangle. |
| **width** | The width of rectangle. |
| **height** | The height of rectangle. |

## Example

```ts
const ctx = node.getComponent(Graphics);
ctx.rect(20,20,150,100);
ctx.stroke();
```

<img src="./rect.png">

```ts
const ctx = node.getComponent(Graphics);

// Red rectangle
ctx.lineWidth = 6;
ctx.strokeColor = Color.RED;
ctx.rect(5,5,290,140);
ctx.stroke();

// Green rectangle
ctx.lineWidth=4;
ctx.strokeColor = Color.GREEN;
ctx.rect(30,30,50,50);
ctx.stroke();

// Blue rectangle
ctx.lineWidth = 10;
ctx.strokeColor = Color.BLUE;
ctx.rect(50,50,150,80);
ctx.stroke();
```

<img src="./rect2.png">

<hr>

Return to the [Graphics Component Reference](../graphics.md) documentation.
