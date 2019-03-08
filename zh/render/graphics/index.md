# 绘图系统

本章将详细介绍 Cocos Creator 的绘画组件接口的使用。

![](../graphics/graphics/graphics.png)

新建一个空节点，然后点击 **属性检查器** 下方的 **添加组件** 按钮，从 **添加渲染组件** 中选择 **Graphics**，即可添加 Graphics 组件到节点上。

## 绘图接口

### 路径

| 方法 |   功能说明
| -------------- | ----------- |
| [moveTo](../graphics/moveTo.md) (x, y)   | 把路径移动到画布中的指定点，不创建线条
| [lineTo](../graphics/lineTo.md) (x, y)   | 添加一个新点，然后在画布中创建从该点到最后指定点的线条
| [bezierCurveTo](../graphics/bezierCurveTo.md) (c1x, c1y, c2x, c2y, x, y) | 创建三次方贝塞尔曲线
| [quadraticCurveTo](../graphics/quadraticCurveTo.md) (cx, cy, x, y)       | 创建二次贝塞尔曲线
| [arc](../graphics/arc.md) (cx, cy, r, a0, a1, counterclockwise)          | 创建弧/曲线（用于创建圆形或部分圆）
| [ellipse](../graphics/ellipse.md) (cx, cy, rx, ry)                       | 创建椭圆
| [circle](../graphics/circle.md) (cx, cy, r)                              | 创建圆形
| [rect](../graphics/rect.md) (x, y, w, h) | 创建矩形
| [close](../graphics/close.md) ()         | 创建从当前点回到起始点的路径
| [stroke](../graphics/stroke.md) ()       | 绘制已定义的路径
| [fill](../graphics/fill.md) ()           | 填充当前绘图（路径）
| [clear](../graphics/clear.md) ()         | 清除所有路径

### 颜色，样式

| 属性 |   功能说明
| -------------- | ----------- |
| [lineCap](../graphics/lineCap.md)         | 设置或返回线条的结束端点样式
| [lineJoin](../graphics/lineJoin.md)       | 设置或返回两条线相交时，所创建的拐角类型
| [lineWidth](../graphics/lineWidth.md)     | 设置或返回当前的线条宽度
| [miterLimit](../graphics/miterLimit.md)   | 设置或返回最大斜接长度
| [strokeColor](../graphics/strokeColor.md) | 设置或返回笔触的颜色
| [fillColor](../graphics/fillColor.md)     | 设置或返回填充绘画的颜色

## 第三方库

绘图组件的 API 是参考的 [Canvas](http://www.w3school.com.cn/tags/html_ref_canvas.asp) 的绘图接口，而市面上已经有很多基于 Canvas 实现的绘图库，比如 [paper.js](http://paperjs.org/)、[raphael.js](http://dmitrybaranovskiy.github.io/raphael/)。因此如果将这些绘图库的底层对接到绘图组件的 API，我们就可以直接使用这些高级的库的能力。不过要注意的是，绘图组件并没有完整实现 Canvas，而且修改绘图库的底层 backend 需要对绘图库有相当的了解。

<!--
这里列举了一些基于绘图组件扩展的第三方高级绘图库和相关 demo 。
### ccc.raphael
- github：https://github.com/2youyou2/ccc.raphael   
- demo：https://github.com/2youyou2/raphael-example
- 特性（持续更新中）
 - 线条变形   
    <a href="ccc.raphael/animate-line.gif"><img src="ccc.raphael/animate-line.gif" style="height:180px;margin:5px"></a>
 - 线条虚线   
    <a href="ccc.raphael/dash-line.gif"><img src="ccc.raphael/dash-line.gif" style="height:180px;margin:5px"></a>
 - 简化路径   
    <a href="ccc.raphael/simplify.gif"><img src="ccc.raphael/simplify.gif" style="height:180px;margin:5px"></a>
 - 读取 svg   
    <a href="ccc.raphael/tiger.png"><img src="ccc.raphael/tiger.png" style="height:180px;margin:5px"></a>
-->