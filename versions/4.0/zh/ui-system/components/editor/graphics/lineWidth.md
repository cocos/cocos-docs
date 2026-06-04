# lineWidth

`lineWidth()` 方法添加一个新点，然后创建从该点到画布中最后指定点的线条。

| 参数 |   描述
| :-------------- | :----------- |
|number | 当前线条的宽度，以像素计。

## 实例

```ts
const ctx = node.getComponent(Graphics);
ctx.lineWidth = 20;
ctx.rect(20,20,80,100);
ctx.stroke();
```

<img src="./lineWidth.png">

<hr>

返回 [Graphics 组件参考](../graphics.md)
