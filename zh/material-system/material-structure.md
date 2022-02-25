# 材质系统类图

材质系统控制着每个模型最终的着色流程与顺序，在引擎内相关类间结构如下：

[![Assets](img/material.png "Click to view diagram source")](material.dot)

上述图中的 **Material**（[材质](../asset/material.md)）和 **EffectAsset**（[着色器资源](../shader/index.md)）都属于资源。

- **Material** 负责 EffectAsset 声明的 `Uniform`、宏数据存储以及 Shader 使用和管理，这些信息都会以材质资源的可视化属性的形式展示在 **属性检查器** 面板中。Material 通常是被渲染器组件使用，所有继承自 RenderableComponent 的组件都是渲染器组件，例如 MeshRenderer、Sprite 等。更多内容请参考 [材质资源](../asset/material.md)。

- **EffectAsset** 负责提供属性、宏、Shader 列表定义。每个 EffectAsset 最终都会被编译成引擎内使用的格式，引擎再根据格式进行解析和应用。所有解析后的 EffectAsset 信息都会被注册到引擎内的 ProgramLib 库里，方便用户直接通过代码获取实际引擎所使用的 EffectAsset 资源。更多内容请参考 [着色器](../shader/index.md)。