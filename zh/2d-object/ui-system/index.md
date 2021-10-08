# UI 系统

本章将介绍 Cocos Creator 中强大而灵活的 UI（用户界面）系统，通过组合不同 UI 组件来生产能够适配多种分辨率屏幕的、通过数据动态生成和更新显示内容，以及支持多种排版布局方式的 UI 界面。

## UI 入门

在引擎中界定 UI 和 2D 渲染对象的区别主要在于适配和交互，所有的 UI 需要在 Canvas 节点下，以做出适配行为，而 Canvas 组件本身继承自 `RenderRoot2D` 组件，所以也可以作为数据收集的入口。

UI 是游戏开发的必要交互部分，一般游戏上的按钮、文字、背景等都是通过 UI 来制作的。在开始制作一款 UI 时，首先需要确定当前设计的内容显示区域大小（设计分辨率），可以在菜单栏的 **项目 -> 项目设置 -> 项目数据** 面板中设置：

![resolution-config](resolution_config.png)

设计分辨率设置完成后，开始创建 UI 元素，所有的 UI 元素都包含在 Canvas 节点下。可以在 **层级管理器** 面板中点击左上方的 **+** 按钮，然后选择 **UI Component -> Canvas** 来创建 Canvas 节点。Canvas 节点上有一个 [Canvas](../../ui-system/components/editor/canvas.md) 组件，该组件可以关联一个 camera。

> **注意**：
>
> 1. 在一个场景中可以存在多个 Canvas 节点，但是 Canvas 节点不应该嵌套在另一个 Canvas 节点或其子节点下。
> 2. Canvas 组件并非和 camera 是一一对应关系，它们之前的渲染与否完全取决于 node 的 layer 和 camera 的 Visibility，在多 Canvas 的时候要格外注意 layer 管理以得到想要的渲染效果。

接下来就可以在 Canvas 节点下创建 UI 节点了。编辑器自带的 UI 节点有以下几种：

![create-ui](./create-ui.png)

可以通过选中节点，在 **属性检查器** 面板中点击 **添加组件** 来查看 UI 组件。

![add-ui-component](./add-ui-component.png)

UI 渲染组件的先后顺序采用的是深度排序方案，也就是 Canvas 节点下的子节点的排序就已经决定了之后的整个 [渲染排序](../../ui-system/components/engine/priority.md)。

在一般的游戏开发中，必要的 UI 元素除了 Sprite（精灵图）、Label（文字）、Mask（遮罩）等基础 2D 渲染组件外，还有用于快速搭建界面的 Layout（布局）、Widget（对齐）等。其中 Sprite 和 Label 用于渲染图片和文字。Mask 主要用于限制显示内容，比较常用的地方是一些聊天框和背包等。Layout 主要用于排版，一般用于按钮单一排列，背包内道具整齐排列等。<br>
最后一个比较重要的功能其实是 Widget，主要用于显示对齐。这里可能涉及到另外一个功能，那就是多分辨率适配，在我们设计完 UI 需要发布到不同平台时，势必会出现平台的实际设备分辨率和我们的设计分辨率不符的情况，这个时候为了适配不得不做一些取舍，比如头像框，是不能做缩放的，但是我们又希望它没有很大程度受设备影响，那么我们则需要为它添加上 Widget 组件，并且始终保证它对齐在我们的设计分辨率的左上方，具体参考：[对齐策略](../../ui-system/components/engine/widget-align.md) 和 [对齐](../../ui-system/components/editor/widget.md)。

当我们的界面制作完成之后，可能有人会发现，怎么发布 iPhone 7 和 iPhone X 的显示效果不一样？这个其实也是我们上面提到的设备分辨率的问题。在你以设计分辨率设计，最终以设备分辨率发布的时候，因为不同型号的手机设备分辨率可能不一致，这中间存在像素偏差的问题，因此，还需要做的一道转换工序那就是屏幕适配。<br>
在菜单栏的 **项目 -> 项目设置 -> 项目数据** 页面中可以看到，还有两个选项是 **适配屏幕宽度 / 适配屏幕高度**，按照屏幕适配规则再结合 Widget 组件，就可以实现不同设备的轻松适配。具体适配规则可参考 [多分辨率适配方案](../../ui-system/components/engine/multi-resolution.md)。

## UI 组件

UI 组件大部分自身不具有渲染能力，但持有了 2D 渲染组件用于渲染，其本身更多拥有着快速构成用户交互界面的能力，承担着事件响应，排版适配等功能。各 UI 组件具体说明请参考 [UI 组件](../../ui-system/components/editor/base-component.md)。

## UI 实践指南

- [多分辨率适配方案](../../ui-system/components/engine/multi-resolution.md)
- [对齐策略](../../ui-system/components/engine/widget-align.md)
- [文字排版](../../ui-system/components/engine/label-layout.md)
- [自动布局容器](../../ui-system/components/engine/auto-layout.md)
- [制作动态生成内容的列表](../../ui-system/components/engine/list-with-data.md)
- [制作可任意拉伸的 UI 图像](../../ui-system/components/engine/sliced-sprite.md)
