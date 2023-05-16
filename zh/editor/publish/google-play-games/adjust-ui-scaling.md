# 界面缩放

您可以需要缩放 UI 来确保游戏内容的正确显示。GPG 关于界面缩放的要求 [如下](https://developer.android.com/games/playgames/graphics?hl=zh-cn#ui-scaling)。

竖屏游戏在全屏时会自动添加黑边，横屏时开发者可能需要处理界面缩放的问题，特别是在某些较大的屏幕上，这也是我们本节所关注的内容。

## 界面设计流程

- 在 **项目** 菜单中选择 **项目设置** 中找到 **设计宽度** 和 **设计高度** 设计您的游戏的分辨率
- 参考 [多分辨率适配方案](../../../ui-system/components/engine/multi-resolution.md)
- 参考 [Widget 组件参考](../../../ui-system/components/editor/widget.md) 对子 UI 进行适配

当发布为 GPG 应用后，您可以通过检查对应的里程碑来确定适配是否成功。