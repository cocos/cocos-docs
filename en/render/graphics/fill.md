# fill

The `fill()` method is used to fill the current image (path). The default color is **white**.

**Note**: If the path is not closed, the `fill()` method adds a line from the end of the path to the start point to close the path and then fill the path.

## Example

```javascript
var ctx = node.getComponent(cc.Graphics);
ctx.rect (20, 20, 150, 100);
ctx.fillColor = cc.Color.GREEN;
ctx.fill();
```

<a href="graphics/fill.png"><img src = "graphics/fill.png"></a>

<hr>

Return to the [Graphics Component Reference](../../components/graphics.md) documentation.
