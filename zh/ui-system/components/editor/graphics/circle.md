# circle

`circle()` 方法创建圆形。

| 参数 | 描述 |
| :-------------- | :----------- |
| cx | 圆的中心的 x 坐标。|
| cy | 圆的中心的 y 坐标。|
| r | 圆的半径。|

## 实例

```ts
const ctx = node.getComponent(Graphics);
ctx.circle(200,200, 200);
ctx.stroke();
```

<a href="circle.png"><img src="circle.png"></a>

<hr>

返回 [Graphics 组件参考](../graphics.md)
