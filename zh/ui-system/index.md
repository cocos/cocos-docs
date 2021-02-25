# UI 系统

本章节将详细介绍 Cocos Creator 中的 UI，涉及到以下几个部分：

- [UI 组件](component/index.md)
- [UI 制作策略](production-strategy/index.md)

## UI 介绍

UI 是 User Interface（用户界面）的简称。UI 主要提供软件的人机交互、外观界面设计。通过 UI 可以制作登录界面、购买界面、背包界面等应用所需界面，也可以通过 UI 监测用户操作行为，响应操作逻辑，比如游戏上的按钮、滑动条、滚动条也都是 UI。

在 Cocos Creator 中，UI 主要用于适配和交互，并非渲染。所有的 UI 需要放在 Canvas 节点下，以做出适配行为，同时响应交互事件。如需了解 2D 渲染和 UI 的差异，请参考 [2D 渲染](../2d-object/2d-render/index.md).
