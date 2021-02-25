# 材质系统

![material-show](material-show.png)

在真实世界里，所有的物体都会与光交互。比如一个小球应该是玻璃球还是塑料球，一个箱子是普通的木头箱子还是铁皮箱，它们在受光情况下的明暗表现、光点、光反射、光散射等效果，所有的表现最终在设备上的呈现都是通过着色器（Shader）来实现。而材质则是着色器的数据集，方便可视化的调整。

## 材质系统结构

材质系统控制着每个模型最终的着色流程与顺序，在引擎内相关类间结构如下：

[![Assets](material.png "Click to view diagram source")](material.dot)

其中，Material 和 EffectAsset 属于资源。Material 负责 EffectAsset 声明的 Uniform、宏数据存储以及 Shader 使用和管理。编辑器可根据该数据提供可视化材质面板。Material 通常是被渲染组件使用，所有继承自 RenderableComponent 的组件都是渲染组件，MeshRenderer、Sprite 等都继承自 RenderableComponent。EffectAsset 负责提供属性、宏、Shader 列表定义。每个 EffectAsset 最终都会被编译成引擎内使用的格式，引擎根据该格式解析以及应用。所有解析后的 EffectAsset 信息都会被注册近引擎内的 ProgramLib 库里，方便用户直接通过代码获取实际引擎所使用的 EffectAsset 资源。
