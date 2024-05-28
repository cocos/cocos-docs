# LabelShadow 组件参考

LabelShadow 组件可以为 Label 组件添加阴影效果。

![label-shadow](label/label-shadow.png)

点击 **属性检查器** 下方的 **添加组件** 按钮，然后从 **UI** 中选择 **LabelShadow**，即可添加 LabelShadow 组件到节点上。

> **注意**：
>
> 1. LabelShadow 只能用于 **系统字体** 或者 **TTF 字体**。
> 2. 当 Label 组件的 **CacheMode** 属性设置为 **CHAR** 时，LabelShadow 不生效。
> 3. LabelShadow 不支持 Windows 和 Mac 原生

LabelShadow 相关脚本接口请参考 [LabelShadow API](%__APIDOC__%/zh/class/LabelShadow)。

## LabelShadow 属性

| 属性 | 说明 |
| :----- | :------------ |
| Color  | 阴影的颜色      |
| Offset | 字体与阴影的偏移 |
| Blur   | 阴影的模糊程度   |
