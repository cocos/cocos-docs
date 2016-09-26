# fill

`fill()` 方法填充当前的图像（路径）。默认颜色是白色   
注释：如果路径未关闭，那么 fill() 方法会从路径结束点到开始点之间添加一条线，以关闭该路径，然后填充该路径。


## 实例

```javascript
var ctx = node.getComponent(cc.Graphics);
ctx.rect(20,20,150,100);
ctx.fillColor = cc.Color.GREEN;
ctx.fill();
```

<a href="graphics/fill.png"><img src="graphics/fill.png"></a>

<hr>

返回 [绘图组件](index.md)
