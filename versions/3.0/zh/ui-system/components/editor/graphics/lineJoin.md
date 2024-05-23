# lineJoin

`lineJoin` 属性设置或返回线条末端线帽的样式。

| 参数 |   描述
| :-------------- | :----------- |
|Graphics.LineJoin.BEVEL   | 创建斜角。
|Graphics.LineJoin.ROUND  | 创建圆角。
|Graphics.LineJoin.MITER | 默认。创建尖角。

## 实例

```ts
const ctx = node.getComponent(Graphics);
ctx.lineJoin = Graphics.LineJoin.ROUND;
ctx.moveTo(20,20);
ctx.lineTo(100,50);
ctx.lineTo(20,100);
ctx.stroke();
```

<img src="./lineJoin.png">

<hr>

返回 [Graphics 组件参考](../graphics.md)
