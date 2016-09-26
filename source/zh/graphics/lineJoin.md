# lineJoin

`lineJoin` 属性设置或返回线条末端线帽的样式。

| 参数 |   描述
| -------------- | ----------- |
|cc.Graphics.LineJoin.BEVEL   | 创建斜角。
|cc.Graphics.LineJoin.ROUND  | 创建圆角。
|cc.Graphics.LineJoin.MITER | 默认。创建尖角。

## 实例

```javascript
var ctx = node.getComponent(cc.Graphics);
ctx.lineJoin = cc.Graphics.LineJoin.ROUND;
ctx.moveTo(20,20);
ctx.lineTo(100,50);
ctx.lineTo(20,100);
ctx.stroke();
```

<a href="graphics/lineJoin.png"><img src="graphics/lineJoin.png"></a>


<hr>

返回 [绘图组件](index.md)

