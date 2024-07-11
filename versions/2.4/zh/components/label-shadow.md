# LabelShadow 组件参考

LabelShadow 组件可以为 Label 组件添加阴影效果，但只能用于系统字体或者 TTF 字体。

![label-shadow](label/label-shadow.png)

点击 **属性检查器** 下面的 **添加组件** 按钮，然后从 **渲染组件** 中选择 **LabelShadow**，即可添加 LabelShadow 组件到节点上。

LabelShadow 组件在 Label 组件的 Cache Mode 属性设置为 CHAR 时不生效，除了原生平台，但是原生平台也只有在使用 TTF 字体时是生效的。

描边脚本接口请参考 [LabelShadow API](%__APIDOC__%/zh/classes/LabelShadow.html)。

## LabelShadow 属性

| 属性 | 功能说明 |
| -------- | -------- |
| Color  | 阴影的颜色      |
| Offset | 字体与阴影的偏移 |
| Blur   | 阴影的模糊程度   |
