# 渐变色编辑器

**渐变色编辑器** 支持设置粒子系统中部分属性颜色随时间发生渐变。属性默认都是以固定颜色（Color）的形式显示，点击属性框右侧的 ![menu-button](img/menu-button.png) 按钮，可以看到有以下几种编辑模式：

![set-color](gradient-editor/set-color.png)

根据选择的编辑模式不同，属性框的显示也有一定的差异：

- **Color**（默认）：设定的颜色在属性整个生命周期内不会发生变化；

    ![color](gradient-editor/color.png)

- **Gradient**：属性切换为渐变色编辑形式，点击属性框即可打开渐变色编辑器。属性的颜色变化由设置的颜色渐变图指定；

    ![gradient](gradient-editor/gradient.png)

- **TwoColors**：设置的两个固定颜色定义了颜色的上限和下限，实际颜色会随着时间的推移在两个边界之间进行插值；

    ![two-colors](gradient-editor/two-colors.png)

- **TwoGradients**：两个渐变图定义了属性颜色在生命周期内某一点的渐变上限和下限，当前颜色在两个边界之间进行插值；

    ![two-gradients](gradient-editor/two-gradients.png)

- **RadomColor**：取 **Gradient** 模式下的渐变图中的随机颜色。

    ![radom-color](gradient-editor/radom-color.png)

然后点击属性框，即可打开相应的颜色编辑器。

接下来我们以 **Gradient** 模式为例，看一下渐变色编辑器具体的操作步骤。

## 渐变色编辑

选择 **Gradient** 模式后点击属性框，即可打开渐变色编辑器。初始界面如下：

![gradient_editor](gradient-editor/gradient-editor.png)

可将其大致分为上下两部分，上方的三条色带区域为颜色渐变图，下方区域为颜色选择器。

- 上方的色带用于插入 Alpha 关键帧；下方的色带用于插入 RGB 关键帧；中间的色带用于显示关键帧影响下的最终颜色，最终颜色的计算方式可在 **Mode** 选项中设置，详情请参考下文说明。

- 选中关键帧即可在下方的颜色选择器中设置 Alpha 或 RGB 值。设置时可在左侧直接选择颜色，也可以在右侧通过数值进行设置；

- 拖动关键帧 **上下移动** 可以 **删除** 关键帧。

- 拖动关键帧 **左右移动** 可以 **调节关键帧位置**，也可以在 **Location** 中通过设置百分比数值进行调节。

    ![gradient_editor](gradient-editor/edit-gradient.gif)

- **Mode** 用于设置渐变色的计算方式，支持以下两种：

    - **Blend** 模式（默认）：会按照当前时刻相邻的两个关键帧进行插值得到当前帧的颜色；

    - **Fixed** 模式：会直接使用当前时刻的前一个关键帧颜色，没有渐变。

    编辑器中默认使用 **Blend** 模式，可通过代码进行切换，代码示例如下：

    ```ts
    // 切换为 Fixed 模式
    startColor.gradient.mode = Mode.Fixed;

    // 切换为 Blend 模式
    startColor.gradient.mode = Mode.Blend;
    ```
