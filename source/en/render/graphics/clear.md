# Clear

Use `clear()` to clear all paths.

## Example

```javascript
update: function (dt) {
    var ctx = node.getComponent(cc.Graphics);
    ctx.clear();
    ctx.circle(200,200, 200);
    ctx.stroke();
}
```

<hr>

Return to [Graphics component](index.md)

