# 2D 对象概述

[2d-image](2d-image.png)

所有的 2D 元素都是 2D 对象，2D 对象包含 [2D 渲染对象](2d-render/index.md)、2D 非渲染对象（包括用户界面 User-interface ([UI](../../ui-system/index.md))）。2D 渲染对象提供渲染数据，UI 则更多的承担着用户交互的能力。**所有的 2D 对象都需要存放在 2D 对象根节点下**。2D 对象根节点分为 RenderRoot 节点（带有 RenderRoot2D 组件）和 Canvas 节点（带有 Canvas 组件）。如果需要有布局、适配功能，则放在 Canvas 节点下，Canvas 节点可以持有一个相机的引用，以便适配不同设备的同时也相对应的调整相机视野。反之，可以放在 RenderRoot 节点下。RenderRoot 和 Canvas 节点因为都是 2D 对象根节点，所以不可以嵌套。
