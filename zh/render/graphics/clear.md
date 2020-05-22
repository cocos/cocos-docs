# clear

`clear()` 方法用于清空所有路径。   

## 实例

```javascript
update: function (dt) {
    var ctx = node.getComponent(cc.Graphics);
    ctx.clear();
    ctx.circle(200, 200, 200);
    ctx.fill();
}
```

<hr>

返回 [Graphics 组件参考](../../components/graphics.md)
