# strokeColor

The `strokeColor` property sets or returns the color used for the stroke.

## Example

```javascript
var ctx = node.getComponent(cc.Graphics);
ctx.lineWidth = 2;
ctx.strokeColor = new cc.Color().fromHEX('#0000ff');
ctx.rect(20, 20, 250, 200);
ctx.stroke();
```

![strokeColor](graphics/strokeColor.png)

<hr>

Return to the [Graphics Component Reference](../../components/graphics.md) documentation..
