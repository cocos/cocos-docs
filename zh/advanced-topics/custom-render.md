# 自定义渲染

我们在 v2.0 版本中对引擎框架进行了彻底的升级，移除底层 cocos2d-html5 渲染引擎，改为和 3D 引擎共享底层渲染器，同时摒弃渲染树，直接使用节点和渲染组件数据来组装渲染数据。我们抽象了一个新的基础组件类：RenderComponent，所有的直接渲染组件都是继承自这个组件，比如：Sprite、Label、Graphics 等，渲染组件定义组件的颜色混合模式，同时控制组件的渲染状态更新。每个渲染组件都有其对应的Assembler来对其进行渲染数据的组装与填充。具体的流程如下图所示：

![](/zh/advanced-topics/custom-render/render-component.png)新的渲染流程不仅大大提升了底层的渲染效率，同时渲染组件及Assembler的模块化也使得自定义渲染变得更加方便，有特殊需求的开发者只需要自定义RenderComponent及对应的Assembler，然后添加渲染组件到场景中的节点上，引擎的渲染流程将自动完成节点的渲染。下面将介绍如何自定义RenderComponent及Assembler完成自定义渲染。

## 自定义RenderComponent



