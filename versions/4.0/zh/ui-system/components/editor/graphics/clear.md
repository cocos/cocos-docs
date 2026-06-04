# clear

`clear()` 清空所有路径。

## 实例

```ts
update: function (dt) {
    const ctx = node.getComponent(Graphics);
    ctx.clear();
    ctx.circle(200,200, 200);
    ctx.stroke();
}

```

<hr>

返回 [Graphics 组件参考](../graphics.md)
