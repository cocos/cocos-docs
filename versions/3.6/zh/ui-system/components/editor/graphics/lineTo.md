# lineTo

`lineTo()` 方法添加一个新点，然后创建从该点到画布中最后指定点的线条。

| 参数 |   描述
| :-------------- | :----------- |
| x | 路径的目标位置的 x 坐标
| y | 路径的目标位置的 y 坐标

## 实例

```ts
const ctx = node.getComponent(Graphics);
ctx.moveTo(20,100);
ctx.lineTo(20,20);
ctx.lineTo(70,20);
ctx.stroke();
```

<img src="./lineTo.png">

<hr>

返回 [Graphics 组件参考](../graphics.md)
