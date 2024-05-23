# lineJoin

`lineJoin` 属性决定了一个形状中两个非零长度的连接段（线、圆弧或曲线）以哪种拐角类型连接在一起。

| 参数 |   描述
| -------------- | ----------- |
| cc.Graphics.LineJoin.BEVEL   | 创建斜角。
| cc.Graphics.LineJoin.ROUND  | 创建圆角。
| cc.Graphics.LineJoin.MITER | 默认。创建尖角。

## 实例

```javascript
var ctx = node.getComponent(cc.Graphics);
ctx.lineJoin = cc.Graphics.LineJoin.ROUND;
ctx.moveTo(20, 20);
ctx.lineTo(100, 50);
ctx.lineTo(20, 100);
ctx.stroke();
```

![lineJoin](graphics/lineJoin.png)

<hr>

返回 [Graphics 组件参考](../../components/graphics.md)
