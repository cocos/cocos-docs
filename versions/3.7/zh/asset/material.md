# 材质资源

## 材质创建

在 **资源管理器** 面板中点击右键并选择 **创建 -> 材质**：

![material-create](material/material-create.png)

或者点击 **资源管理器** 左上角的 **+** 号按钮并选择 **材质**：

![material-create-menu](material/material-create-menu.png)

此时便会在 **资源管理器** 中创建一个默认名为 **material** 的材质资源：

![default-material](material/default-material.png)

材质控制着每个模型最终的着色，材质由着色器构成，通过材质和着色器控制最终的着色流程。

## 材质资源属性

| 属性 | 说明 |
| :-- | :-- |
| Effect（着色器） | 当前材质所使用的着色器，默认使用的是内置 PBR 着色器 [builtin-standard.effect](../shader/effect-builtin-pbr.md)。<br>点击 Effect 的下拉框，可以看到当前项目中所有的着色器，开发者可根据需要选择使用。当切换了着色器后其他属性也会同步更新，详情请参考 [着色器](../shader/effect-inspector.md)。<br>点击右侧的 ![image](../material-system/img/locate.png) 按钮，会在 **资源管理器** 中定位当前使用的着色器。|
| Technique | Technique 下拉框会列出当前使用的着色器中所有的 Technique。一个着色器中可能会存在多个 Technique，每个 Technique 适用于不同的情况，例如效果差一点但是性能更好的 Technique 更适合用于手机平台。当切换了 Technique 后 Pass 列表也会同步更新。 |
| USE INSTANCING | 是否启用动态 Instancing。需要注意的是，Instancing 只应该在场景中有大量相同模型的实例时启用，适当合理地应用 Instancing 可以有不错的性能提升，但过度使用反而很可能会因为额外的开销维护导致性能下降 |
| USE BATCHING | 是否启用动态 VB 合并式合批。<br> 在 v3.6.2 中编辑器面板上已移除该选项，如果要合批请使用 **USE_INSTANCING** 选项 |
| Pass | Pass 列表会列出当前使用的 Technique 中所有的 Pass（例如 Pass 0、Pass 1、Pass 2......）。<br>每个 Pass 可能会有不同的属性和定义，开发者可以分别设置这些属性和定义。如果属性是被定义包裹住的，需要先勾上定义才能看到对应的属性。详情请参考 [Pass 可选配置参数](../shader/pass-parameter-list.md) |

在 **属性检查器** 面板右上方还可以选择其他的模型以预览效果：

![image](../material-system/img/preview-model-select.png)

**属性检查器** 会对当前材质的用户数据进行缓存，用户数据是指现在修改的或者之前修改的数据，当切换 `Effect` 或 `Technique` 时，缓存的数据会进行迁移，使用户数据得到维持。

若修改了材质属性，面板右上角会出现 ![image](../material-system/img/save-material.png) 保存和 ![image](../material-system/img/revert-material.png) 重置按钮。重置会将材质属性回退到上一次保存时的设置，而一旦点击保存后便无法再重置。

材质编辑过程中，支持撤销（undo）和重做（redo）的快捷键操作。
在 **属性检查器** 面板获得焦点的情况下，
- undo ：Ctrl/Cmd + Z
- redo ：Ctrl/Cmd + Shift + Z

## 使用材质

一般情况下，3D 模型、2D 对象以及粒子系统都需要指定材质才可以正确渲染出物体表面的外观。

### 在 3D 模型中使用

通过 [网格/蒙皮网格/批量蒙皮网格渲染器组件](../module-map/mesh/) 上的 `Materials` 属性，我们可以指定当前 3D 模型所使用的材质。点击 `Materials` 属性框右侧的箭头图标按钮，可以看到当前项目中所有的材质资源，根据需要选择即可。或者也可以将所需的材质资源从 **资源管理器** 直接拖拽到 `Materials` 属性框中。

#### 导出模型资源中的材质

通常 [模型资源](./model/mesh.md) 都是由第三方工具制作并导出，然后导入到 Creator 中使用的（支持 FBX 和 glTF 格式）。这些模型可能带有材质资源，可在 **资源管理器** 内展开模型文件进行查看。

![fbx-mat](../material-system/img/readonly-material.png)

这些材质可以直接在模型文件内进行编辑，也可以提取后进行编辑。

若要提取这些材质，在 **资源管理器** 中选中模型资源，然后在 **属性检查器** 的 **材质** 分页中勾选 **提取材质**，并设置 **材质提取目录**，最后点击右上角的绿色打钩按钮，即可将模型资源的材质提取到指定目录。详情请参考 [模型资源 - Material 模块](./model/mesh.md#material-%E6%A8%A1%E5%9D%97)。

![导出模型](../material-system/img/dump-material.png)

材质提取完成后，会自动和模型节点的网格渲染器组件中的 `Materials` 属性绑定。例如：

材质提取前：

![材质提取前](../material-system/img/dump-result.png)

材质提取后：

![材质提取后](../material-system/img/post-dump.png)

### 在 2D 以及 UI 渲染组件中使用

2D 对象（包括 2D 渲染和 UI 系统）默认情况下只支持一个单独的自定义材质。若留空则会使用引擎内置的标准材质。

若要进行自定义，在组件 **属性检查器上**，通过选择 `Custom Material` 的下拉框选择相应的材质。

![ui-select-mat](../material-system/img/ui-select.png)

### 在粒子系统中使用

粒子系统渲染模块 Renderer 中的 **ParticleMaterial** 和 **TrailMaterial** 属性分别用于渲染粒子材质和粒子拖尾，将所需的材质资源从 **资源管理器** 直接拖拽到 **渲染器（Renderer）** 相应的属性框中即可。

![img-particle](../material-system/img/particle-material.png)

详情请参考 [粒子渲染模块](../particle-system/renderer.md)。
