# Ellipse

Use `ellipse()` method to create an ecllipse.

| Parameter | Description
| -------------- | ----------- |
| cx | 圆的中心的 x 坐标。
| cy | 圆的中心的 y 坐标。
| rx | 圆的 x 半径。
| ry | 圆的 y 半径。

## Example

```javascript
var ctx = node.getComponent(cc.Graphics);
ctx.ellipse(100,100, 100,200);
ctx.stroke();
```

<a href="graphics/ellipse.png"><img src="graphics/ellipse.png"></a>

<hr>

Return to [Graphics component](index.md).
