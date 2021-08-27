# circle

`circle()` 方法用于创建椭圆。

| 参数 |   说明
| :------------- | :---------- |
| cx | 圆的中心的 x 坐标。
| cy | 圆的中心的 y 坐标。
| r  | 圆的半径。

## 实例

```javascript
var ctx = node.getComponent(cc.Graphics);
ctx.circle(200, 200, 200);
ctx.stroke();
```

![circle](graphics/circle.png)

<hr>

返回 [Graphics 组件参考](../../components/graphics.md)
