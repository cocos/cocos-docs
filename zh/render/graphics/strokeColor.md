# strokeColor

`strokeColor` 属性用于设置或返回用于笔触的颜色。

## 实例

```javascript
var ctx = node.getComponent(cc.Graphics);
ctx.lineWidth = 2;
ctx.strokeColor = new cc.Color().fromHEX('#0000ff');
ctx.rect(20, 20, 250, 200);
ctx.stroke();
```

![strokeColor](graphics/strokeColor.png)

<hr>

返回 [Graphics 组件参考](../../components/graphics.md)
