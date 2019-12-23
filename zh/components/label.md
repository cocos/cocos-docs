# Label 组件参考

Label 组件用来显示一段文字，文字可以是系统字体，TrueType 字体或者 BMFont 字体和艺术数字。另外，Label 还具有排版功能。

![label-property](./label/label-property.png)

点击 **属性检查器** 下面的 **添加组件** 按钮，然后从 **渲染组件** 中选择 **Label**，即可添加 Label 组件到节点上。

文字的脚本接口请参考 [Label API](../../../api/zh/classes/Label.html)。

## Label 属性

| 属性 |   功能说明
| -------------- | ----------- |
| String           | 文本内容字符串。
| Horizontal Align | 文本的水平对齐方式。可选值有 LEFT，CENTER 和 RIGHT。
| Vertical Align   | 文本的垂直对齐方式。可选值有 TOP，CENTER 和 BOTTOM。
| Font Size        | 文本字体大小。
| Line Height      | 文本的行高。
| Overflow         | 文本的排版方式，目前支持 CLAMP，SHRINK 和 RESIZE_HEIGHT。详情见下方的 [Label 排版](#label-%E6%8E%92%E7%89%88)。
| Enable Wrap Text | 是否开启文本换行。（在排版方式设为 CLAMP、SHRINK 时生效）
| SpacingX         | 文本字符之间的间距。（使用 BMFont 位图字体时生效）
| Font             | 指定文本渲染需要的字体文件，如果使用系统字体，则此属性可以为空。
| Font Family      | 文字字体名字。在使用系统字体时生效。
| Cache Mode       | 文本缓存类型（v2.0.9 中新增），仅对 **系统字体** 或 **ttf** 字体有效，BMFont 字体无需进行这个优化。包括 **NONE**、**BITMAP**、**CHAR** 三种模式。详情见下方的 [文本缓存类型](#%E6%96%87%E6%9C%AC%E7%BC%93%E5%AD%98%E7%B1%BB%E5%9E%8B%EF%BC%88cache-mode%EF%BC%89)。
| Use System Font  | 布尔值，是否使用系统字体。

## Label 排版

| 属性 |   功能说明
| -------------- | ----------- |
|CLAMP| 文字尺寸不会根据 Bounding Box 的大小进行缩放，Wrap Text 关闭的情况下，按照正常文字排列，超出 Bounding Box 的部分将不会显示。Wrap Text 开启的情况下，会试图将本行超出范围的文字换行到下一行。如果纵向空间也不够时，也会隐藏无法完整显示的文字。
|SHRINK| 文字尺寸会根据 Bounding Box 大小进行自动缩放（不会自动放大，最大显示 Font Size 规定的尺寸），Wrap Text 开启时，当宽度不足时会优先将文字换到下一行，如果换行后还无法完整显示，则会将文字进行自动适配 Bounding Box 的大小。如果 Wrap Text 关闭时，则直接按照当前文字进行排版，如果超出边界则会进行自动缩放。**注意**：这个模式在文本刷新的时候可能会占用较多 CPU 资源。
|RESIZE_HEIGHT| 文本的 Bounding Box 会根据文字排版进行适配，这个状态下用户无法手动修改文本的高度，文本的高度由内部算法自动计算出来。

## 文本缓存类型（Cache Mode）

| 属性 |   功能说明
| -------------- | ----------- |
| NONE | 默认值，Label 中的整段文本将生成一张位图。
|BITMAP| 选择后，Label 中的整段文本仍将生成一张位图，但是会尽量参与 [动态合图](../advanced-topics/dynamic-atlas.md)。只要满足动态合图的要求，就会和动态合图中的其它 Sprite 或者 Label 合并 Draw Call。由于动态合图会占用更多内存，**该模式只能用于文本不常更新的 Label**。**补充**：和 NONE 模式一样，BITMAP 模式会强制给每个 Label 组件生成一张位图，不论文本内容是否等同。如果场景中有大量相同文本的 Label，建议使用 CHAR 模式以复用内存空间。
| CHAR | 原理类似 BMFont，Label 将以“字”为单位将文本缓存到全局共享的位图中，相同字体样式和字号的每个字符将在全局共享一份缓存。能支持文本的频繁修改，对性能和内存最友好。不过目前该模式还存在如下限制，我们将在后续的版本中进行优化：<br>1、**该模式只能用于字体样式和字号固定（通过记录字体的 fontSize、fontFamily、color、outline 为关键信息，以此进行字符的重复使用，其他有使用特殊自定义文本格式的需要注意），并且不会频繁出现巨量未使用过的字符的 Label**。这是为了节约缓存，因为全局共享的位图尺寸为 2048*2048，只有场景切换时才会清除，一旦位图被占满后新出现的字符将无法渲染。<br>2、不能参与动态合图（同样启用 CHAR 模式的多个 Label 在渲染顺序不被打断的情况下仍然能合并 Draw Call）

**注意**：

- Cache Mode 对所有平台都有优化效果。
- BITMAP 模式取代了原先的 Batch As Bitmap 选项，旧项目如启用了 Batch As Bitmap 将自动迁移至该选项。
- 使用缓存模式时不能剔除 **项目 -> 项目设置 -> 模块设置** 面板中的 **RenderTexture** 模块。

## 详细说明

Label 组件可以通过往 **属性检查器** 里的 **Font** 属性拖拽 TTF 字体文件和 BMFont 字体文件来修改渲染的字体类型。如果不想继续使用字体文件，可以通过勾选 **Use System Font** 来重新启用系统字体。

使用艺术数字字体需要创建 [艺术数字资源](../asset-workflow/label-atlas.md)，参考链接中的文档设置好艺术数字资源的属性之后，就可以像使用 BMFont 资源一样来使用艺术数字了。

### UI 渲染批次合并指南

更多关于 Label 渲染批次处理的内容请参考 [UI 渲染批次合并指南](../advanced-topics/ui-auto-batch.md)
