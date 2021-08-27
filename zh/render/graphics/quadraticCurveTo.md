# quadraticCurveTo

`quadraticCurveTo()` 方法通过使用表示二次贝塞尔曲线的指定控制点，向当前路径添加一个点。

> **注意**：二次贝塞尔曲线需要两个点。第一个点是用于二次贝塞尔计算中的控制点，第二个点是曲线的结束点。曲线的开始点是当前路径中最后一个点。

| 参数 |  说明
| :------------- | :---------- |
| cpx | 贝塞尔控制点的 x 坐标
| cpy | 贝塞尔控制点的 y 坐标
| x | 结束点的 x 坐标
| y | 结束点的 y 坐标

## 实例

```javascript
var ctx = node.getComponent(cc.Graphics);
ctx.moveTo(20, 20);
ctx.quadraticCurveTo(20, 100, 200, 20);
ctx.stroke();
```

![quadraticCurveTo](graphics/quadraticCurveTo.png)

<hr>

返回 [Graphics 组件参考](../../components/graphics.md)
