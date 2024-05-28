# Line 组件

Line 组件用于渲染 3D 场景中给定的点连成的线段。Line 组件渲染的线段是有宽度的，并且总是面向摄像机，这与 billboard 组件相似。

## 属性与说明

![line-component](./line/line-component.png)

属性| 功能
---|---
**texture**    | 线段中显示的贴图。
**worldSpace** | 线段中各个点的坐标采用哪个坐标系，勾选使用世界坐标系，不选使用本地坐标系。
**positions**  | 每个线段端点的坐标。
**width**      | 线段宽度，如果采用曲线，则表示沿着线段方向上的曲线变化。
**tile**       | 贴图平铺次数。
**offset**     | 贴图坐标的偏移。
**color**      | 线段颜色，如果采用渐变色，则表示沿着线段方向上的颜色渐变。

### 线段宽度

在 **线段宽度** 的右侧点击下拉按钮可以修改宽度的类型。其可选项如下：

![line-curve](./line/line-curve.png)

| 属性 | 说明 |
| :--  | :-- |
| **Constant** | 线段宽度由常量组成 |
| **Curve** | 由曲线组成，此时可点击 **Width** 后的输入框对曲线进行编辑 |
| **TwoCurves** | 由两条曲线组成 |
| **TwoConstants** | 由两个常量组成 |

#### 曲线

曲线编辑和粒子曲线编辑器类似，详情可参考 [粒子曲线编辑器 - 曲线编辑面板](editor/curve-editor.md/#%E6%9B%B2%E7%BA%BF%E7%BC%96%E8%BE%91%E9%9D%A2%E6%9D%BF)。

![curve-editor](line/line-curve-editor.png)

编辑效果如下：

![curve-sample](line/curve-sample.png)

当选择为两条曲线时，线段的宽度将由两条曲线共同作用。

![two-curves](line/two-curves.png)

#### 常量

![two-constant](line/two-constants.png)

当宽度的类型选择为 **TwoConstants** 时，可以通过输入 **ConstantMin**，**ConstantMax** 调整线段的宽度。

### 线段颜色

![line-color](./line/line-color.png)

点击 **颜色** 属性的右侧的下拉按钮可以对线段的着色方式进行更新更改，其可选项如下：

| 属性 | 说明 |
| :-- | :-- |
| **Color** |  使用纯色 |
| **Gradient** | 使用渐变色，通过 [渐变色编辑器](editor/gradient-editor.md) 可以对颜色进行调整 |
| **TwoColors**  | 使用两个颜色 |
| **TwoGradients** | 使用两个渐变颜色 |
| **RandomColor** | 使用随机的颜色 |

Line 组件接口请参考 [Line API](%__APIDOC__%/zh/class/Line)。
