# 绘图系统

本章将详细介绍 Cocos Creator 的绘画组件接口的使用。

## 绘图接口

### 路径

| 方法 |   功能说明
| -------------- | ----------- |
| [moveTo (x, y)](../graphics/moveTo.md)  | 把路径移动到画布中的指定点，不创建线条
| [lineTo (x, y)](../graphics/lineTo.md) | 添加一个新点，然后在画布中创建从该点到最后指定点的线条
| [bezierCurveTo (c1x, c1y, c2x, c2y, x, y)](../graphics/bezierCurveTo.md) | 创建三次方贝塞尔曲线
| [quadraticCurveTo (cx, cy, x, y)](../graphics/quadraticCurveTo.md) | 创建二次贝塞尔曲线
| [arc (cx, cy, r, a0, a1, counterclockwise)](../graphics/arc.md) | 创建弧/曲线（用于创建圆形或部分圆）
| [ellipse (cx, cy, rx, ry)](../graphics/ellipse.md) | 创建椭圆
| [circle (cx, cy, r)](../graphics/circle.md) | 创建圆形
| [rect (x, y, w, h)](../graphics/rect.md) | 创建矩形
| [close ()](../graphics/close.md) | 创建从当前点回到起始点的路径
| [stroke ()](../graphics/stroke.md) | 绘制已定义的路径
| [fill ()](../graphics/fill.md) | 填充当前绘图（路径）
| [clear ()](../graphics/clear.md) | 清除所有路径

### 颜色，样式

| 属性 |   功能说明
| -------------- | ----------- |
| [lineCap](../graphics/lineCap.md) | 设置或返回线条的结束端点样式
| [lineJoin](../graphics/lineJoin.md) | 设置或返回两条线相交时，所创建的拐角类型
| [lineWidth](../graphics/lineWidth.md) | 设置或返回当前的线条宽度
| [miterLimit](../graphics/miterLimit.md) | 设置或返回最大斜接长度
| [strokeColor](../graphics/strokeColor.md) | 设置或返回笔触的颜色
| [fillColor](../graphics/fillColor.md) | 设置或返回填充绘画的颜色

## 第三方库

绘图组件的 api 是参考的 [Canvas](http://www.w3school.com.cn/tags/html_ref_canvas.asp) 的绘图接口，而市面上已经有很多基于 Canvas 绘图接口实现的绘图库，比如 [paper.js](http://paperjs.org/)、[raphael.js](http://dmitrybaranovskiy.github.io/raphael/)。
利用这些基础绘图接口和市面上的这些绘画库，我们也可以在绘图组件上扩展出很多更高级的库。

这里列举了一些基于绘图组件扩展的第三方高级绘图库和相关 demo。

### ccc.raphael

- GitHub：<https://github.com/2youyou2/ccc.raphael>

- demo：[GitHub](https://github.com/cocos-creator/example-raphael-legacy) | [Gitee](https://gitee.com/mirrors_cocos-creator/raphael-example)

- 特性（持续更新中）

  - 线条变形

    <a href="ccc.raphael/animate-line.gif"><img src="ccc.raphael/animate-line.gif" style="height:180px;margin:5px"></a>

  - 线条虚线

    <a href="ccc.raphael/dash-line.gif"><img src="ccc.raphael/dash-line.gif" style="height:180px;margin:5px"></a>

  - 简化路径

    <a href="ccc.raphael/simplify.gif"><img src="ccc.raphael/simplify.gif" style="height:180px;margin:5px"></a>

  - 读取 svg

    <a href="ccc.raphael/tiger.png"><img src="ccc.raphael/tiger.png" style="height:180px;margin:5px"></a>
