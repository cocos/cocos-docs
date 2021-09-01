# Graphics 组件参考

Graphics 组件提供了一系列绘画接口，这些接口参考了 Canvas 的绘画接口来进行实现。

![graphics](../render/graphics/graphics/graphics.png)

在 **层级管理器** 中选中一个节点，然后点击 **属性检查器** 下方的 **添加组件** 按钮，从 **渲染组件** 中选择 **Graphics**，即可添加 Graphics 组件到节点上。

## Graphics 组件属性

| 属性 |   功能说明
| :------------- | :---------- |
| [lineWidth](../render/graphics/lineWidth.md)     | 设置或返回当前的线条宽度
| [lineJoin](../render/graphics/lineJoin.md)       | 设置或返回两条线相交时，所创建的拐角类型
| [lineCap](../render/graphics/lineCap.md)         | 设置或返回线条的结束端点样式
| [strokeColor](../render/graphics/strokeColor.md) | 设置或返回笔触的颜色
| [fillColor](../render/graphics/fillColor.md)     | 设置或返回填充绘画的颜色
| [miterLimit](../render/graphics/miterLimit.md)   | 设置或返回最大斜接长度

## 绘图接口

### 路径

| 方法 |   功能说明
| :------------- | :---------- |
| [moveTo](../render/graphics/moveTo.md) (x, y)      | 把路径移动到画布中的指定点，不创建线条
| [lineTo](../render/graphics/lineTo.md) (x, y)      | 添加一个新点，然后在画布中创建从该点到最后指定点的线条
| [bezierCurveTo](../render/graphics/bezierCurveTo.md) (c1x, c1y, c2x, c2y, x, y) | 创建三次方贝塞尔曲线
| [quadraticCurveTo](../render/graphics/quadraticCurveTo.md) (cx, cy, x, y) | 创建二次贝塞尔曲线
| [arc](../render/graphics/arc.md) (cx, cy, r, a0, a1, counterclockwise)    | 创建弧/曲线（用于创建圆形或部分圆）
| [ellipse](../render/graphics/ellipse.md) (cx, cy, rx, ry)                 | 创建椭圆
| [circle](../render/graphics/circle.md) (cx, cy, r) | 创建圆形
| [rect](../render/graphics/rect.md) (x, y, w, h)    | 创建矩形
| [close](../render/graphics/close.md) ()            | 创建从当前点回到起始点的路径
| [stroke](../render/graphics/stroke.md) ()          | 绘制已定义的路径
| [fill](../render/graphics/fill.md) ()              | 填充当前绘图（路径）
| [clear](../render/graphics/clear.md) ()            | 清除所有路径
