# fillColor

`fillColor` 属性用于设置或返回用于填充的颜色。

## 实例

```javascript
var ctx = node.getComponent(cc.Graphics);
ctx.fillColor = new cc.Color().fromHEX('#0000ff');
ctx.rect(20, 20, 250, 200);
ctx.fill();
```

![fillColor](graphics/fillColor.png)

<hr>

返回 [Graphics 组件参考](../../components/graphics.md)
