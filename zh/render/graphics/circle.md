# circle

`circle()` 方法创建圆形。

| 参数 | 描述 |
| -------------- | ----------- |
| cx | 圆的中心的 x 坐标。|
| cy | 圆的中心的 y 坐标。|
| r | 圆的半径。|

## 实例

```javascript
var ctx = node.getComponent(cc.Graphics);
ctx.circle(200, 200, 200);
ctx.stroke();
```

![graphics/circle.png](graphics/circle.png)

返回 [绘图组件](index.md)
