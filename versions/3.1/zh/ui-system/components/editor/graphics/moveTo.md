# moveTo

`moveTo` 表示一条路径的起点。

| 参数 |   描述
| :-------------- | :----------- |
| x | 路径的目标位置的 x 坐标
| y | 路径的目标位置的 y 坐标

## 实例

```ts
const ctx = node.getComponent(Graphics);
ctx.moveTo(0,0);
ctx.lineTo(300,150);
ctx.stroke();
```

<img src="./moveTo.png">

<hr>

返回 [Graphics 组件参考](../graphics.md)
