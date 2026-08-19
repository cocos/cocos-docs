# close

`close()` 方法创建从当前点到开始点的路径。


## 实例

```ts
const ctx = node.getComponent(Graphics);
ctx.moveTo(20,20);
ctx.lineTo(20,100);
ctx.lineTo(70,100);
ctx.close();
ctx.stroke();
```

<img src="./close.png">

<hr>

返回 [Graphics 组件参考](../graphics.md)
