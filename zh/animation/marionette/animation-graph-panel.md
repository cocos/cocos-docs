# 动画图面板

动画图面板用于查看和编辑动画图资源。当准备好对象所需的骨骼动画后，便可在 **动画图面板** 中将其组装结合成完整的动画流程。

## 打开面板

在 **资源管理器** 中选中动画图资源，然后在 **属性检查器** 中点击 **编辑**：

![open-animation-graph-panel](animation-graph-panel/open-animation-graph-panel.png)

即可打开动画图面板，可以看到动画图面板主要由网格布局区域，以及右侧的 **层级**、**变量** 分页构成：

![animation-graph-panel](animation-graph-panel/animation-graph-panel.png)

<!-- 当存在多个动画图资源时，也可以点击面板右上角的 **编辑其他动画图** 按钮切换其他需要编辑的动画图。 -->

## 层级（Layers）

该分页主要用于创建、查看和编辑动画图的层级，每个层级分别由一个状态机控制，点击 **Layers** 按钮可以进入层级编辑状态。

![Layers](animation-graph-panel/layers.png)

更多关于层级的信息请参考 [动画图层级](animation-graph-layer.md)。

## 网格布局区域

该区域主要展示了 **层级** 分页中所选的层级对应的状态机，用户可以可视化地创建、编辑、排列状态机中各个状态，以及设置状态之间的过渡。在区域内点击右键即可根据需要创建各类状态：

![Edit](animation-graph-panel/edit.png)

当编辑完成后可根据需要在右上角点击 **保存** 或者 **重置**（重置到上一次保存时）。更多操作请参考 [动画状态机](animation-graph-basics.md)。

## 变量（Variables）

该分页主要用于创建、查看和编辑当前动画图层中状态机的变量，用户可在动画图中通过自定义的 **变量** 来操控动画图表达的流程，作用如下：

- 作为状态之间过渡的 **过渡条件**

- 作为混合动画状态的 **输入参数** 来混合不同的动画剪辑

![variables](animation-graph-panel/variables.png)

### 创建变量

以下图为例，操作步骤为：
- 在下拉框中选择变量的 **类型**。支持的变量类型包括 **浮点型**、**布尔类型**、**触发器类型** 和 **整型**，具体说明请查看下文 **变量类型** 部分的内容。
- 在 **名称** 输入框中填写变量名

![add variables](animation-graph-panel/add-variables.png)

鼠标滑过变量时，每个创建好的变量右侧会有一个 **×** 图标按钮，点击即可删除对应变量。设置完成后请不要忘记点击动画图面板右上角的 **保存** 按钮以保存设置。

![delete variables](animation-graph-panel/delete-variable.png)

### 变量类型

目前支持创建的变量类型包括：

- **浮点型**：变量的值可以是任意实数

- **布尔类型**：变量的值可以为真/假

- **整型**：变量的值可以是任意整数

- **触发器类型**：变量为触发器，若勾选则表示值为触发。触发器用于一次性的条件判断，当触发条件满足时，发生状态过渡，过渡完成后，所引用到的所有触发器都会被重置为 **未触发状态**。

  > **注意**：仅当过渡到状态时，触发器才会被重置，若是过渡到“伪状态”，触发器不会被重置。

  例如下图，只要在 ① 中设置触发器 T1 或 T2 一次，状态 A 就能达到子状态机中的状态 B 或者 C，不需要再次设置 ② 和 ③ 中的触发器：

  ![variable](animation-graph-panel/variable-eg.png)

  <!--
  这些图都是用 ProcessOn 进行编辑的，源文件以 POS 格式保存在 zh/animation/marionette 目录下，可将其导入到 ProcessOn 再次编辑。
  -->
  在 v3.5.0 中，我们增加了新的机制 **下一帧重置（Reset on next frame）**，在勾选后，触发器会在动画更新后立即重置。

  ![reset on next frame](animation-graph-panel/reset-on-nextframe.png)

### 通过脚本控制变量

开发者也可以在脚本中通过动画控制器组件获取和修改变量的值，详情请参考 [动画控制器组件参考](animation-controller.md)。

<!-- ## 属性检查器（Inspector）

主要用于设置状态机中各类状态的属性和过渡条件，详情请参考 [动画状态机](animation-graph-basics.md)。

![Inspector](animation-graph-panel/inspector.png) -->
