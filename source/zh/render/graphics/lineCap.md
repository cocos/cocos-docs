# lineCap

`lineCap` 属性设置或返回线条末端线帽的样式。

| 参数 |   描述
| -------------- | ----------- |
|cc.Graphics.LineCap.BUTT   | 默认。向线条的每个末端添加平直的边缘。
|cc.Graphics.LineCap.ROUND  | 向线条的每个末端添加圆形线帽。
|cc.Graphics.LineCap.SQUARE | 向线条的每个末端添加正方形线帽。

## 实例

```javascript
var ctx = node.getComponent(cc.Graphics);
ctx.lineCap = cc.Graphics.LineCap.ROUND;
ctx.lineWidth = 10;
ctx.moveTo(100, 100);
ctx.lineTo(300, 100);
ctx.stroke();
```

<a href="graphics/lineCap.png"><img src="graphics/lineCap.png"></a>

<hr>

返回 [绘图组件](index.md)

