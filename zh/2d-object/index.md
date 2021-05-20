# 2D 对象概述

![2d-image](2d-image.png)

2D 对象包含 [2D 渲染对象](2d-render/index.md) 和用户交互对象 ([UI](../ui-system/index.md))）。2D 渲染对象提供渲染数据，UI 则更多的承担与用户交互的能力。

**所有的 2D 对象都要放在 2D 对象根节点下** 才能参与渲染，2D 对象根节点包括 **RenderRoot2D** 节点（带有 RenderRoot2D 组件）和 **Canvas** 节点（带有 Canvas 组件）。如果需要使用布局、适配等功能，可以选择 Canvas 节点，Canvas 节点下默认自带了一个 Camera 节点，以便在适配不同设备的同时相对应地调整相机视野。反之，可以放在 RenderRoot2D 节点下。

> **注意**：RenderRoot2D 和 Canvas 节点都是 2D 对象根节点，不支持嵌套使用。
