# miterLimit

`miterLimit` 属性设置或返回最大斜接长度。斜接长度指的是在两条线交汇处内角和外角之间的距离。

**注意**：只有当 lineJoin 属性为 `miter` 时，miterLimit 才有效。

边角的角度越小，斜接长度就会越大。为了避免斜接长度过长，我们可以使用 miterLimit 属性。如果斜接长度超过 miterLimit 的值，边角会以 lineJoin 的 `bevel` 类型来显示

| 参数 |   描述
| :-------------- | :----------- |
|number | 正数。规定最大斜接长度。如果斜接长度超过 miterLimit 的值，边角会以 lineJoin 的 `bevel` 类型来显示。 |

## 实例

```ts
const ctx = node.getComponent(Graphics);
ctx.miterLimit = 10;
ctx.moveTo(20,20);
ctx.lineTo(100,50);
ctx.lineTo(20,100);
ctx.stroke();
```

<a href="miterLimit.png"><img src="miterLimit.png"></a>


<hr>

返回 [Graphics 组件参考](../graphics.md)
