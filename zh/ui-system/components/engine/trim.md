# 图像资源的自动剪裁

导入图像资源后生成的 SpriteFrame 默认会进行自动剪裁，去除原始图片周围的透明像素区域。这样我们在使用 SpriteFrame 渲染 Sprite 时，将会获得有效图像更精确的大小。当 SpriteFrame 为自动剪裁时，下图中自动剪裁的相关信息为置灰状态，不可修改：

![trim inspector](trim/trim_inspector.png)

## Sprite 组件剪裁相关设置详解

和图片裁剪相关的 **Sprite** 组件设置有以下两个：

- `Trim` 勾选后将在渲染 Sprite 图像时去除图像周围的透明像素，我们将看到刚好能把图像包裹住的约束框。取消勾选，Sprite 节点的约束框会包括透明像素的部分。

- `Size Mode` 用来将节点的尺寸设置为原图或原图裁剪透明像素后的大小，通常用于在序列帧动画中保证图像显示为正确的尺寸。有以下几种选择：

    - `TRIMMED` 选择该选项，会将节点的尺寸（size）设置为原始图片裁剪掉透明像素后的大小。

    - `RAW` 选择该选项，会将节点尺寸设置为原始图片包括透明像素的大小。

    - `CUSTOM` 自定义尺寸，用户在使用 **矩形变换工具** 拖拽改变节点的尺寸，或通过修改 `Size` 属性，或在脚本中修改 `width` 或 `height` 后，都会自动将 `Size Mode` 设为 `CUSTOM`。表示用户将自己决定节点的尺寸，而不需要考虑原始图片的大小。

下图中展示了两种常见组合的渲染效果：

![trim compare](trim/trim-compare.png)

## 自带位置信息的序列帧动画

有很多动画师在绘制序列帧动画时，会使用一张较大的画布，然后将角色在动画中的运动直接通过角色在画布上的位置变化表现出来。在使用这种素材时，我们需要将 **Sprite 组件** 的 `Trim` 设为 `false`，将 `Size Mode` 设为 `RAW`。这样动画在播放每个序列帧时，都将使用原始图片的尺寸，并保留图像周围透明像素的信息，这样才能正确显示绘制在动画中的角色位移。

而 `Trim` 设为 `true`，则是在位移完全由角色位置属性控制的动画中，更推荐使用的方式。

## TexturePacker 设置

在制作序列帧动画时，我们通常会使用 [TexturePacker](https://www.codeandweb.com/texturepacker) 这样的工具将序列帧打包成图集，并在导入后通过图集资源下的 `SpriteFrame` 来使用。在 TexturePacker 中输出图集资源时，Sprites 分类下的 **Trim mode** 请选择 `Trim`，一定不要选择 `Crop, flush position`，否则透明像素剪裁信息会丢失，您在使用图集里的资源时也就无法获得原始图片未剪裁的尺寸和偏移信息了。目前建议使用 **4.x** 以上版本进行打包，以防止低版本导出数据不一致造成的导入失败。

![trim texturePacker](trim/trim-texturepacker.png)
