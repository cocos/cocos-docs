# bezierCurveTo

`bezierCurveTo()` 方法通过使用表示三次贝塞尔曲线的指定控制点，向当前路径添加一个点。

> **注意**：三次贝塞尔曲线需要三个点。前两个点是用于三次贝塞尔计算中的控制点，第三个点是曲线的结束点。曲线的开始点是当前路径中最后一个点。

| 参数 |   说明
| :------------- | :---------- |
| cp1x | 第一个贝塞尔控制点的 x 坐标
| cp1y | 第一个贝塞尔控制点的 y 坐标
| cp2x | 第二个贝塞尔控制点的 x 坐标
| cp2y | 第二个贝塞尔控制点的 y 坐标
| x | 结束点的 x 坐标
| y | 结束点的 y 坐标

## 实例

```javascript
var ctx = node.getComponent(cc.Graphics);
ctx.moveTo(20, 20);
ctx.bezierCurveTo(20, 100, 200, 100, 200, 20);
ctx.stroke();
```

![bezierCurveTo](graphics/bezierCurveTo.png)

<hr>

返回 [Graphics 组件参考](../../components/graphics.md)
