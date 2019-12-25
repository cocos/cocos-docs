# Canvas（画布）组件参考

**Canvas（画布）** 组件能够随时获得设备屏幕的实际分辨率并对场景中所有渲染元素进行适当的缩放。场景中的 Canvas 同时只能有一个，建议所有 UI 和可渲染元素都设置为 Canvas 的子节点。

![default](canvas/default.png)

## 选项

选项                | 说明
--                  | --
Design Resolution   | 设计分辨率（内容生产者在制作场景时使用的分辨率蓝本）
Fit Height          | 适配高度（设计分辨率的高度自动撑满屏幕高度）
Fit Width           | 适配宽度（设计分辨率的宽度自动撑满屏幕宽度）

## 适配屏幕尺寸

开发者能通过配合 Widget 组件来对屏幕进行布局适配，下图为对屏幕进行全屏布局的设置

![widget](canvas/widget.png)

反之，只想要固定为设计分辨率，不管屏幕比例如何，开发者可以通过禁用或移除 Widget 组件来实现。

另外旧项目升级到 Cocos Creator v2.3 版本或者添加新 Canvas 组件时，编辑器都会自动添加 Widget 组件，无需用户手动添加。

画布的脚本接口请参考 [Canvas API](../../../api/zh/classes/Canvas.html)。
