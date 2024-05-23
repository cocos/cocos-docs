# rect

`rect()` 方法创建矩形。

| 参数 |   描述
| :-------------- | :----------- |
|x | 矩形左下点的 x 坐标。
|y | 矩形左下点的中心的 y 坐标。
|width | 矩形的宽度。
|height | 矩形的高度。

## 实例

```ts
const ctx = node.getComponent(Graphics);
ctx.rect(20,20,150,100);
ctx.stroke();
```

<img src="./rect.png">

```ts
const ctx = node.getComponent(Graphics);

// 红色矩形
ctx.lineWidth = 6;
ctx.strokeColor = Color.RED;
ctx.rect(5,5,290,140);
ctx.stroke();

// 绿色矩形
ctx.lineWidth=4;
ctx.strokeColor = Color.GREEN;
ctx.rect(30,30,50,50);
ctx.stroke();

// 蓝色矩形
ctx.lineWidth = 10;
ctx.strokeColor = Color.BLUE;
ctx.rect(50,50,150,80);
ctx.stroke();
```

<img src="./rect2.png">

<hr>

返回 [Graphics 组件参考](../graphics.md)
