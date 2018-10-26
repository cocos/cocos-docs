# 自定义RenderComponent和Assembler

我们在 v2.0 版本中对引擎框架进行了彻底的升级，移除底层 cocos2d-html5 渲染引擎，改为和 3D 引擎共享底层渲染器，同时摒弃渲染树，直接使用节点和渲染组件数据来组装渲染数据。我们抽象了一个新的基础组件类：RenderComponent，所有的直接渲染组件都是继承自这个组件，比如：Sprite、Label、Graphics 等，渲染组件定义组件的颜色混合模式，同时控制组件的渲染状态更新。每个渲染组件都有其对应的Assembler来对其进行渲染数据的组装与填充。具体的流程如下图所示：



## 自定义RenderComponent



