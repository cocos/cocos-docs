# clear

`clear()` 方法用于清除之前绘制的任何内容。

## 实例

```javascript
update: function (dt) {
    var ctx = node.getComponent(cc.Graphics);
    ctx.clear();
    ctx.circle(200, 200, 200);
    ctx.stroke();
}
```

<hr>

返回 [Graphics 组件参考](../../components/graphics.md)
