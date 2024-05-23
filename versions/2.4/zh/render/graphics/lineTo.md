# lineTo

`lineTo()` 方法用于添加一个新点，然后创建从该点到画布中最后指定点的线条。

| 参数 |  说明
| :------------- | :----------- |
| x | 路径的目标位置的 x 坐标
| y | 路径的目标位置的 y 坐标

## 实例

```javascript
var ctx = node.getComponent(cc.Graphics);
ctx.moveTo(20, 100);
ctx.lineTo(20, 20);
ctx.lineTo(70, 20);
ctx.stroke();
```

![lineTo](graphics/lineTo.png)

<hr>

返回 [Graphics 组件参考](../../components/graphics.md)
