# strokeColor

`strokeColor` 属性设置或返回用于笔触的颜色。

## 实例

```ts
const ctx = node.getComponent(Graphics);
ctx.lineWidth = 2;
ctx.strokeColor = hexToColor('#0000ff');
ctx.rect(20,20,250,200);
ctx.stroke();
```

<a href="strokeColor.png"><img src="strokeColor.png"></a>


<hr>

返回 [Graphics 组件参考](../graphics.md)
