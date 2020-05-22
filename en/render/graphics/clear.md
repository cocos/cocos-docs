# clear

The `clear()` function is used to clear all paths.

## Example

```javascript
update: function (dt) {
    var ctx = node.getComponent(cc.Graphics);
    ctx.clear();
    ctx.circle(200, 200, 200);
    ctx.fill();
}
```

<hr>

Return to the [Graphics Component Reference](../../components/graphics.md) documentation.
