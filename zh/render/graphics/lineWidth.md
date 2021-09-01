# lineWidth

`lineWidth` 属性用于添加一个新点，然后创建从该点到画布中最后指定点的线条。

| 参数 | 说明
| :----- | :---------- |
| number | 当前线条的宽度，以像素计。

## 实例

```javascript
var ctx = node.getComponent(cc.Graphics);
ctx.lineWidth = 20;
ctx.rect(20, 20, 80, 100);
ctx.stroke();
```

![lineWidth](graphics/lineWidth.png)

<hr>

返回 [Graphics 组件参考](../../components/graphics.md)
