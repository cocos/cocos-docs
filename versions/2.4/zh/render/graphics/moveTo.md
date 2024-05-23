# moveTo

`moveTo()` 用于表示一条路径的起点。

| 参数 |  说明
| :------------- | :---------- |
| x | 路径的目标位置的 x 坐标
| y | 路径的目标位置的 y 坐标

## 实例

```javascript
var ctx = node.getComponent(cc.Graphics);
ctx.moveTo(0, 0);
ctx.lineTo(300, 150);
ctx.stroke();
```

![moveTo](graphics/moveTo.png)

<hr>

返回 [Graphics 组件参考](../../components/graphics.md)
