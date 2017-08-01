# Label 组件参考

Label 组件用来显示一段文字，文字可以是系统字体，TrueType 字体或者 BMFont 字体和艺术数字，另外，Label 还具有排版功能。

![label](./label/label.png)

![label-property](./label/label-property.png)

点击**属性检查器**下面的`添加组件`按钮，然后从`添加渲染组件`中选择`Label`，即可添加 Label 组件到节点上。

文字的脚本接口请参考[Label API](../api/classes/Label.html)。

## Label 属性

| 属性 |   功能说明
| -------------- | ----------- |
|String| 文本内容字符串。
|Horizontal Align| 文本的水平对齐方式。可选值有 LEFT，CENTER 和 RIGHT。
|Vertical Align| 文本的垂直对齐方式。可选值有 TOP，CENTER 和 BOTTOM。
|Font Size| 文本字体大小。
|Line Height| 文本的行高。
|Overflow| 文本的排版方式，目前支持 CLAMP，SHRINK 和 RESIZE_HEIGHT。详情见[Label 排版](#label--2)。
|Enable Wrap Text| 是否开启文本换行。
|SpacingX| 文本字符之间的间距 （只有 BMFont 字体可以设置）
|Font| 指定文本渲染需要的字体文件，如果使用系统字体，则此属性可以为空。
|Use System Font| 布尔值，是否使用系统字体。

## Label 排版

| 属性 |   功能说明
| -------------- | ----------- |
|CLAMP| 文字尺寸不会根据 Bounding Box 的大小进行缩放，Wrap Text 关闭的情况下，按照正常文字排列，超出 Bounding Box 的部分将不会显示。Wrap Text 开启的情况下，会试图将本行超出范围的文字换行到下一行。如果纵向空间也不够时，也会隐藏无法完整显示的文字。
|SHRINK| 文字尺寸会根据 Bounding Box 大小进行自动缩放（不会自动放大，最大显示 Font Size 规定的尺寸），Wrap Text 开启时，当宽度不足时会优先将文字换到下一行，如果换行后还无法完整显示，则会将文字进行自动适配 Bounding Box 的大小。如果 Wrap Text 关闭时，则直接按照当前文字进行排版，如果超出边界则会进行自动缩放。
|RESIZE_HEIGHT| 文本的 Bounding Box 会根据文字排版进行适配，这个状态下用户无法手动修改文本的高度，文本的高度由内部算法自动计算出来。

## 详细说明

Label 组件可以通过往`属性检查器`里的 `File` 属性拖拽 TTF 字体文件和 BMFont 字体文件来修改渲染的字体类型。如果不想继续使用字体文件，可以通过勾选`Use System Font`来重新启用系统字体。

使用艺术数字字体需要创建[艺术数字资源](../asset-workflow/label-atlas.md)，参考链接中的文档设置好艺术数字资源的属性之后，就可以像使用 BMFont 资源一样来使用艺术数字了。

### BMFont 与 UI 合图自动批处理
 从 Creator 1.4 版本开始， BMFont 支持与 UI 一起合图进行批量渲染。
 理论上，如果你的游戏 UI 没有使用系统字体或者 TTF 字体，并且所有的 UI 图片资源都可以合在一张图上，那么 UI 是可以只用一个 Draw Call 来完成的。
 更多关于 BMFont 与 UI 合图自动批处理的内容，请参考 [BMFont 与 UI 合图自动批处理](../advanced-topics/ui-auto-batch.md)
