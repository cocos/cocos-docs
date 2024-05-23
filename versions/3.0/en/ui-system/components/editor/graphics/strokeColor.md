# Stroke Color

The `strokeColor` defines the color used for the [`stroke`](./stroke.md) function.

## Example

```ts
const ctx = node.getComponent(Graphics);
ctx.lineWidth = 2;
ctx.strokeColor = hexToColor('#0000ff');
ctx.rect(20,20,250,200);
ctx.stroke();
```

<img src="./strokeColor.png">

<hr>

Return to the [Graphics Component Reference](../graphics.md) documentation.
