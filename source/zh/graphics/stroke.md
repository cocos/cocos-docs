# stroke

`stroke()` 方法会实际地绘制出通过 moveTo() 和 lineTo() 等路径方法定义的路径。默认颜色是黑色。


## 实例

```javascript
var ctx = node.getComponent(cc.Graphics);
ctx.moveTo(20,100);
ctx.stroke(20,20);
ctx.stroke(70,20);
ctx.stroke();
```

<a href="graphics/stroke.png"><img src="graphics/stroke.png"></a>

<hr>

返回 [绘图组件](index.md)
