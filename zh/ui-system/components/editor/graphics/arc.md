# arc

`arc()` 方法创建弧/曲线（用于创建圆或部分圆）。
提示：如需通过 arc() 来创建圆，请把起始角设置为 0，结束角设置为 2*Math.PI。

| 参数 |   描述
| :-------------- | :----------- |
|x | 中心控制点的坐标 x 坐标。
|y | 中心控制点的坐标 y 坐标。
|r | 圆弧弧度。
|startAngle | 开始弧度，从正 x 轴顺时针方向测量。
|endAngle | 结束弧度，从正 x 轴顺时针方向测量。
|counterclockwise | 规定应该逆时针还是顺时针绘图。False = 顺时针，true = 逆时针。默认顺时针

## 实例

```ts
const ctx = node.getComponent(Graphics);
ctx.arc(100,75,50,0,1.5*Math.PI);
ctx.stroke();
```

<a href="arc.png"><img src="arc.png"></a>

<hr>

返回 [Graphics 组件参考](../graphics.md)
