# arc

`arc()` 方法创建弧/曲线（用于创建圆或部分圆）。
提示：如需通过 arc() 来创建圆，请把起始角设置为 0，结束角设置为 2*Math.PI。

| 参数 |   描述
| :-------------- | :----------- |
|x | 圆的中心的 x 坐标。
|y | 圆的中心的 y 坐标。
|r | 圆的半径。
|sAngle | 起始角，以弧度计。（弧的圆形的三点钟位置是 0 度）。
|eAngle | 结束角，以弧度计。
|counterclockwise | 可选。规定应该逆时针还是顺时针绘图。False = 顺时针，true = 逆时针。

## 实例

```ts
const ctx = node.getComponent(Graphics);
ctx.arc(100,75,50,0,1.5*Math.PI);
ctx.stroke();
```

<a href="arc.png"><img src="arc.png"></a>

<hr>

返回 [Graphics 组件参考](../graphics.md)
