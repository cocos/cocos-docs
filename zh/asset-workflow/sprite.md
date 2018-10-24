# 图像资源（Texture）

图像资源又经常被称作贴图、图片，是游戏中绝大部分图像渲染的数据源。图像资源一般由图像处理软件（比如 Photoshop，Windows 上自带的画图）制作而成并输出成 Cocos Creator 可以使用的文件格式，目前包括 **JPG** 和 **PNG** 两种。

## 导入图像资源

使用默认的资源导入方式就可以将图像资源导入到项目中，之后我们就可以在 **资源管理器** 中看到如下图所示的图像资源。

![imported texture](sprite/imported_texture.png)

图像资源在 **资源管理器** 中会以自身图片的缩略图作为图标。在 **资源管理器** 中选中图像资源后，**属性检查器** 下方会显示该图片的缩略图。目前图像资源的属性设置功能还没有完善，请不要在 **属性检查器** 手动修改图像资源的属性设置。

## Texture 属性

| 属性 | 功能说明 |
| :---: | :--- |
| Premultiply Alpha | 是否开启Alpha预乘，勾选之后表示将RGB通道预先乘上Alpha通道。 |
| Wrap Mode | 寻址模式，包括Clamp\(钳位\)，Repeat\(重复\)两种寻址模式 |
| Filter Mode | 过滤方式，包括Point\(邻近点采样\)，Bilinear\(双线性过滤\)，Trilinear\(三线性过滤\)三种过滤方式。 |

## Premultiply Alpha

Texture的Premultiply Alpha属性的勾选表示是否开启Alpha预乘，两种状态分别表示：

* Premultiply Alpha（预乘Alpha）：表示RGB在存储的时候预先将Alpha通道与RGB相乘，比如透明度为50%的红色，RGB为（255, 0, 0），预乘之后存储的颜色值为（127，0，0，0.5）。
* Non-Premultiply Alpha （非预乘Alpha）：表示RGB不会预先与Alpha通道相乘，那么上面所述的透明度为50%的红色，存储的颜色值为（255，0，0，0.5）。

在图形渲染中的Alpha Blending会对透明图象进行颜色混合，颜色混合

## 寻址模式

一般来说，纹理坐标UV的取值范围为\[0, 1\]，当传递的顶点数据中的纹理坐标取值大于\[0, 1\]的范围时，就可以通过不同的寻址模式来控制超出范围的纹理坐标如何进行纹理映射，目前Texture提供两种寻址模式：

* 钳位寻址模式（Clamp）：将纹理坐标截取在0到1之间，只复制一遍\[0, 1\]的纹理坐标，然后对于\[0, 1\]之外的内容，将使用边缘的纹理坐标内容进行延伸。
* 重复寻址模式（Repeat）：对于超出\[0, 1\]范围的纹理坐标，使用\[0, 1\]的纹理坐标内容进行不断重复，

## 过滤方式

当Texture的原始大小与屏幕映射的纹理图像不一致时，通过不同的纹理过滤方式进行纹理单元到像素的映射会产生不同的效果。Texture支持三种过滤方式。

* 邻近点采样（Point）：使用中心位置距离采样点最近的纹理单元颜色值作为该采样点的颜色值，不考虑其他相邻像素的影响。优点是算法简单，计算量较小。缺点是当图像放大之后重新采样的颜色值不连续，会有明显的马赛克和锯齿。
* 双线性过滤（Bilinear）：使用距离采样点最近的2x2的纹理单元矩阵进行采样，取四个纹理单元颜色值的平均值作为采样点的颜色，像素之间的颜色值过渡更加平滑，但是计算量相比邻近点采样也稍大。
* 三线性过滤（Trilinear）：以双线性过滤为基础，会对像素大小与纹理单元大小最接近的两层Mipmap Level分别进行双线性过滤，然后在对得到的结果进行线性插值最终得到采样点的颜色值。最终的采样结果相比邻近点采样和双线性过滤时最好的，但是计算量也最大。

## Texture 和 SpriteFrame 资源类型

在 **资源管理器** 中，图像资源的左边会显示一个和文件夹类似的三角图标，点击就可以展开看到它的子资源（sub asset），每个图像资源导入后编辑器会自动在它下面创建同名的 SpriteFrame 资源。

![texture spriteframe](sprite/texture_spriteframe.png)

SpriteFrame 是核心渲染组件 **Sprite** 所使用的资源，设置或替换 **Sprite** 组件中的 `spriteFrame` 属性，就可以切换显示的图像。**Sprite** 组件的设置方式请参考[Sprite 组件参考](../components/sprite.md)。

为什么会有 SpriteFrame 这种资源？这样的设置是因为除了每个文件产生一个 SpriteFrame 的图像资源（Texture）之外，我们还有包含多个 SpriteFrame 的图集资源（Atlas）类型。参考[图集资源（Atlas）文档](atlas.md)来了解更多信息。

下面是 Texture 和 SpriteFrame 的 API 接口文档：

* [Texture 资源类型](../../../api/zh/classes/Texture2D.html)
* [SpriteFrame 资源类型](../../../api/zh/classes/SpriteFrame.html)

## 使用 SpriteFrame

直接将 SpriteFrame 或图像资源从 **资源管理器** 中拖拽到 **层级管理器** 或 **场景编辑器** 中，就可以直接用所选的图像在场景中创建 **Sprite** 节点。

之后可以拖拽其他的 SpriteFrame 或图像资源到该 **Sprite** 组件的 `Sprite Frame` 属性栏中，来切换该 Sprite 显示的图像。

在 **动画编辑器** 中也可以拖拽 SpriteFrame 资源到已创建好的 Sprite Frame 动画轨道上，详见[编辑序列帧动画](../animation/sprite-animation.md)文档。

### 性能优化注意事项

使用单独存在的 Texture 作为 Sprite 资源，在预览和发布游戏时，将无法对这些 Sprite 进行批量渲染优化的操作。目前编辑器不支持转换原有的单张 Texture 引用到 Atlas 里的 SpriteFrame 引用，所以在开发正式项目时，应该尽早把需要使用的图片合成 Atlas（图集），并通过 Atlas 里的 SpriteFrame 引用使用。详情请继续阅读下一篇。

