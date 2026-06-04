# Clears

The `clear()` function is used to clear all paths.

## Example

```ts
update: function (dt) {
    const ctx = node.getComponent(Graphics);
    ctx.clear();
    ctx.circle(200,200, 200);
    ctx.stroke();
}

```

<hr>

Return to the [Graphics Component Reference](../graphics.md) documentation.
