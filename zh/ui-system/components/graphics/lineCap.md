# lineCap

`lineCap` 属性设置或返回线条末端线帽的样式。

| 参数 |   描述
| :-------------- | :----------- |
|Graphics.LineCap.BUTT   | 默认。向线条的每个末端添加平直的边缘。
|Graphics.LineCap.ROUND  | 向线条的每个末端添加圆形线帽。
|Graphics.LineCap.SQUARE | 向线条的每个末端添加正方形线帽。

## 实例

```ts
const ctx = node.getComponent(Graphics);
ctx.lineCap = Graphics.LineCap.ROUND;
ctx.lineWidth = 10;
ctx.moveTo(100, 100);
ctx.lineTo(300, 100);
ctx.stroke();
```

<a href="lineCap.png"><img src="lineCap.png"></a>

<hr>

返回 [Graphics 组件参考](../graphics.md)

