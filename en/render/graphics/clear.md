# clear

The `clear()` function is used to erase any previously drawn content.

## Example

```javascript
update: function (dt) {
    var ctx = node.getComponent(cc.Graphics);
    ctx.clear();
    ctx.circle(200, 200, 200);
    ctx.stroke();
}
```

<hr>

Return to the [Graphics Component Reference](../../components/graphics.md) documentation.
