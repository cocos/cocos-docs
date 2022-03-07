# Graphics 组件参考

Graphics 组件提供了一系列绘画接口，这些接口参考了 Canvas 的绘画接口来进行实现。

![graphics](graphics/graphics.png)

新建一个空节点，然后点击 **属性检查器** 下方的 **添加组件** 按钮，从 **UI/Render** 中选择 **Graphics**，即可添加 Graphics 组件到节点上。

Graphics 脚本接口请参考 [Graphics API](https://docs.cocos.com/creator/3.4/api/zh/#/docs/3.4/zh/ui/Class/Graphics)。

关于使用可以参考范例 **Graphics**（[GitHub](https://github.com/cocos-creator/test-cases-3d/tree/v3.4/assets/cases/ui/14.graphics) | [Gitee](https://gitee.com/mirrors_cocos-creator/test-cases-3d/tree/v3.4/assets/cases/ui/14.graphics)）。

## Graphics 组件属性

| 属性 |   功能说明 |
| :------------- | :---------- |
| [CustomMaterial](../engine/ui-material.md)| 自定义材质，可用于实现溶解、外发光等渲染效果。 |
| [LineWidth](graphics/lineWidth.md) | 设置或返回当前的线条宽度 |
| [LineJoin](graphics/lineJoin.md)             | 设置或返回两条线相交时，所创建的拐角类型 |
| [LineCap](graphics/lineCap.md)               | 设置或返回线条的结束端点样式 |
| [StrokeColor](graphics/strokeColor.md)       | 设置或返回笔触的颜色 |
| [FillColor](graphics/fillColor.md)           | 设置或返回填充绘画的颜色 |
| [MiterLimit](graphics/miterLimit.md)         | 设置或返回最大斜接长度 |

## 绘图接口

### 路径

| 方法 |   功能说明  |
| :------------- | :---------- |
| [moveTo](graphics/moveTo.md) (x, y) | 把路径移动到画布中的指定点，不创建线条 |
| [lineTo](graphics/lineTo.md) (x, y) | 添加一个新点，然后在画布中创建从该点到最后指定点的线条 |
| [bezierCurveTo](graphics/bezierCurveTo.md) (c1x, c1y, c2x, c2y, x, y) | 创建三次方贝塞尔曲线 |
| [quadraticCurveTo](graphics/quadraticCurveTo.md) (cx, cy, x, y) | 创建二次贝塞尔曲线 |
| [arc](graphics/arc.md) (cx, cy, r, startAngle, endAngle, counterclockwise) | 创建弧/曲线（用于创建圆形或部分圆） |
| [ellipse](graphics/ellipse.md) (cx, cy, rx, ry) | 创建椭圆 |
| [circle](graphics/circle.md) (cx, cy, r) | 创建圆形 |
| [rect](graphics/rect.md) (x, y, w, h) | 创建矩形 |
| [close](graphics/close.md) () | 创建从当前点回到起始点的路径 |
| [stroke](graphics/stroke.md) () | 绘制已定义的路径 |
| [fill](graphics/fill.md) () | 填充当前绘图（路径） |
| [clear](graphics/clear.md) () | 清除所有路径 |

### 通过脚本代码设置绘制图案

```ts
import { _decorator, Component, Graphics } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Example')
export class Example extends Component {
    start () {
        const g = this.getComponent(Graphics);
        g.lineWidth = 10;
        g.fillColor.fromHEX('#ff0000');
        g.moveTo(-40, 0);
        g.lineTo(0, -80);
        g.lineTo(40, 0);
        g.lineTo(0, 80);
        g.close();
        g.stroke();
        g.fill();
    }
}
```
