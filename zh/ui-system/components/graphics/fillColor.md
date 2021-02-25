# fillColor

`fillColor` 属性设置或返回用于填充的颜色。

## 实例

```ts
const ctx = node.getComponent(Graphics);
ctx.fillColor = new Color().fromHEX('#0000ff');
ctx.rect(20,20,250,200);
ctx.stroke();
```

![](fillColor.png)

<hr>

返回 [Graphics 组件参考](../graphics.md)
