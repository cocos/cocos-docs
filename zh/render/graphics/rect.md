# rect

`rect()` 方法用于创建矩形。

| 参数 |   说明
| :------------- | :---------- |
| x | 矩形左下点的 x 坐标。
| y | 矩形左下点的中心的 y 坐标。
| width | 矩形的宽度。
| height | 矩形的高度。

## 实例

```javascript
var ctx = node.getComponent(cc.Graphics);
ctx.rect(20, 20, 150, 100);
ctx.stroke();
```

![rect](graphics/rect.png)

```javascript
var ctx = node.getComponent(cc.Graphics);

// 红色矩形
ctx.lineWidth = 6;
ctx.strokeColor = cc.Color.RED;
ctx.rect(5, 5, 290, 140);
ctx.stroke();

// 绿色矩形
ctx.lineWidth = 4;
ctx.strokeColor = cc.Color.GREEN;
ctx.rect(30, 30, 50, 50);
ctx.stroke();

// 蓝色矩形
ctx.lineWidth = 10;
ctx.strokeColor = cc.Color.BLUE;
ctx.rect(50, 50, 150, 80);
ctx.stroke();
```

![rect](graphics/rect2.png)

<hr>

返回 [Graphics 组件参考](../../components/graphics.md)
