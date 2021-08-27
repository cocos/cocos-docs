# ellipse

`ellipse()` 方法用于创建椭圆。

| 参数 |  说明
| :------------- | :---------- |
| cx | 椭圆的中心的 x 坐标。
| cy | 椭圆的中心的 y 坐标。
| rx | 椭圆的 x 半径。
| ry | 椭圆的 y 半径。

## 实例

```javascript
var ctx = node.getComponent(cc.Graphics);
ctx.ellipse(200, 100, 200, 100);
ctx.stroke();
```

![ellipse](graphics/ellipse.png)

<hr>

返回 [Graphics 组件参考](../../components/graphics.md)
