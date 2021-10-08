# 内置渲染管线

Cocos Creator 的内置渲染管线目前使用的是 **builtin-forward**（前向渲染管线）。渲染管线可通过编辑器主菜单中的 **项目 -> 项目设置 -> 项目数据 -> 渲染管线** 进行设置，设置完成之后 **重启编辑器** 即可生效。

![setting](./image/setting.png)

在内置渲染管线中，一个场景只会有一个平行光生效，每个物体只能接受 2 个球面光和 2 个聚光灯，如果超出范围，则会按距离对光源进行排序，取最近的两个光源。

## 前向渲染管线

前向渲染会依次渲染场景中的每个物体，在渲染每个物体时计算其光照。

前向渲染管线包含一个 **ForwardFlow**，**ForwardFlow** 中包含一个 **ForwardStage**。在 **ForwardStage** 里设置了以下两个 **RenderQueue**：

- 第一个 **RenderQueue** 用于渲染 **不透明物体**，按离摄像机 **从近到远** 排序
- 第二个 **RenderQueue** 用于渲染 **半透明物体**，按离摄像机 **从远到近** 排序。

前向渲染管线可用于控制场景的渲染流程，例如对于光照管理的应用请参考 [基于多 Pass 的多光源支持](../concepts/scene/light/additive-per-pixel-lights.md)。
