# 材质操作指南 

本节将主要介绍以下内容：

- 材质的创建和使用
- 属性查看器面板（ Inspector ）

## 创建材质

在编辑器的资源界面点击选择 **创建**->**材质（Material）** 可以创建一个新的材质。

![创建材质](create-material/create.png)

在 v3.x 版本中创建材质会使用内置 PBR 着色器进行创建。

## 使用材质

### 在网格渲染组件中使用

在任何持有 `MeshRenderer` ，`SkeletonMeshRenderer` 等的组件上选择 `Materials` ，通过下拉选择框，选择相应的材质。

也可以直接从 Assets 目录拖拽材质到对应的组件属性查看器上。

![select-material](use-material/select.png)

#### 导出模型资源中的材质

通常模型文件都由外部工具（Maya、Blend 或 3DMax 等）制作并导出为 `FBX` 文件。 

这些资源文件内部可能会带有在外部工具中制作的材质。

当导入引擎后，这些材质处于只读状态。

若要使用这些材质，点击 `FBX` 文件，在右侧的属性查看器内选择 `Material` 栏， 勾选 `Dump materials` 单选框，并选择保存材质则可以将材质提取为单独的文件：

![](inspector/dump-material.png) ![](inspector/gen-material.png)

开发者可查看[模型资源](asset/model/mesh.md)查看更多提取材质的用法。

### 在2D以及UI组件中使用

`UI` 和 `2D` 系统在默认情况下只支持一个单独的自定义材质。若留空则会使用引擎内置的默认材质。

若要进行自定义，在组件属性查看器内，通过选择 `Custom Material` 的下拉框选择相应的材质。

![ui-select-mat](use-material/ui-select.png)

## 属性调整

属性查看器中的可编辑属性都来自于着色器系统。

若要了解更多关于着色器的内容，请查看 [着色器]() 。

在材质内修改属性并不会影响着色器。

### 选择着色器

在属性查看器内的着色器下拉框中，可以选择当前引擎内置的着色器以及用户自定义着色器。

![](inspector/select-effect.png)

对于各着色器以及其内容可查看：[内置着色器](../shader/effect-buildin.md)

### 更改预览材质的模型

在属性查看器的右上角可以选择下拉菜单选择不同的预览模型：

![](inspector/preview-model-select.png)

### 保存和撤回材质

在对材质进行修改后，属性查看器的右上角会出现保存和重置（Reset）的按钮。

其按钮作用与预制体的操作一样

#### 保存材质

在修改材质后，点击右上角的绿色的勾可以将材质资源进行保存。

![](inspector/save-material.png)

#### 重置（Reset）材质

若对修改不满意，则可以点击红色撤回按钮进行撤回。

![](inspector/revert-material.png)


