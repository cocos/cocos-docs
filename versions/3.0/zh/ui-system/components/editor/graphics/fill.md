# fill

`fill()` 方法填充当前的图像（路径）。默认颜色是白色
注释：如果路径未关闭，那么 fill() 方法会从路径结束点到开始点之间添加一条线，以关闭该路径，然后填充该路径。

## 实例

```ts
const ctx = node.getComponent(Graphics);
ctx.rect(20,20,150,100);
ctx.fillColor = Color.GREEN;
ctx.fill();
```

<img src="./fill.png">

<hr>

返回 [Graphics 组件参考](../graphics.md)
