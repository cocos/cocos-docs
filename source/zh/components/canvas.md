# Canvas（画布）组件参考

**Canvas（画布）**组件能够随时获得设备屏幕的实际分辨率并对场景中所有渲染元素进行适当的缩放。场景中的 Canvas 同时只能有一个，建议所有 UI 和可渲染元素都设置为 Canvas 的子节点。

![default](canvas/default.png)

## 选项

选项                | 说明
--                  | --
Design Resolution   | 设计分辨率（内容生产者在制作场景时使用的分辨率蓝本）
Fit Height          | 适配高度（设计分辨率的高度自动撑满屏幕高度）
Fit Width           | 适配宽度（设计分辨率的宽度自动撑满屏幕宽度）

画布的脚本接口请参考[Canvas API](../api/classes/Canvas.html)。
