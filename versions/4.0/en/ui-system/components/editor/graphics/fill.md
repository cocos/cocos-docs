# Fill

The `fill()` method is used to fill the current image (path). The color used is [`fillColor`](./fillColor.md).

> __Note__: if the path is not closed, the `fill()` method adds a line from the end of the path to the start point to close the path and then fills the path.

## Example

```ts
const ctx = node.getComponent(Graphics);
ctx.rect(20,20,150,100);
ctx.fillColor = Color.GREEN;
ctx.fill();
```

<img src="./fill.png">

<hr>

Return to the [Graphics Component Reference](../graphics.md) documentation.
