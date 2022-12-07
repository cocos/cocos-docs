# 光照探针组

光照探针旨在为场景内的物体提供高质量的光照信息；同时为需要 LOD 的物体提供光照信息。

在 **主菜单** 选中 **节点** -> **光源** -> **光照探针** 可以在场景内添加光照探针。

![add-component](light-probe/light-probe.png)

## 属性

![property](light-probe/probe-property.png)

| 属性 | 说明|
| :-- | :-- |
| **Generating Method** | 生成方式，目前仅自持内置。|
| **Generating Min Pos** | 生成时的包围盒的最小值|
| **Generating Max Pos** | 生成时的包围盒的最大值|
| **Number Of Probes X** | X 轴上探针的数量 |
| **Number Of Probes Y** | Y 轴上探针的数量 |
| **Number Of Probes Z** | Z 轴上探针的数量 |
| **Edit Area Box**  | 编辑器生成的包围盒 <br> 点击此按钮后在场景内会进入探针包围盒的编辑模式，请参考下方编辑文档获取更详细的信息 <br> 编辑的过程会影响到上述的 **Generating Min Pos** 以及 **Generating Max Pos** 的值 |
| **Generate Probes** | 生成光照探针 <br> 点击按钮后，会重新生成所有的探针，旧的探针会被删除，请谨慎操作 <br> 此时生成的探针是均匀的，如果需要手动调整，请点击下放 **Enter Probe Edit Mode** 按钮 |
| **Enter Probe Edit Mode** | 进入编辑探针模式 <br> 点击此按钮后在场景编辑器内可以通过 **鼠标左键** 选择不同的探针，并通过 **变换工具** 修改探针的位置 |

## 编辑探针

### 编辑探针范围

点击 **Edit Area Box** 可以进行光照探针范围编辑。此时场景内会以 <span style="color:green">**绿色**</span> 包围盒的形式显示，点击包围盒上的绿色 Gizmo 即可调整其大小。

![edit area box](light-probe/edit-area-box.gif)

点击 **Done Edit** 按钮可以退出编辑模式：

![done edit](light-probe/done-edit.png)

之后可以点击 **Generate Probes** 重新生成探针。

## 生成探针

点击 **Generate Probes** 按钮可以生成探针。

![generate probes](light-probe/generate-probes.png)

### 编辑探针位置

生成探针后，可以点击 **Enter Probe Edit Mode** 按钮进入探针编辑模式。

此时场景的探针才可以被选择。

![select](light-probe/select-probe.png)

通过鼠标拖拽这些 Gizmo 可以调整探针的位置。

![edit](light-probe/edit-probe.gif)

## 启用探针

在节点的 **属性检查器** 内勾选 **使用光照探针（Use Light Probe）** 并将节点的 **Mobility** 属性设置为 **Movable** 可启用节点探针。

![mobility](light-probe/mobility.png)

![use light probe](light-probe/use-light-probe.png)

启用后在 **层级管理器** 内选中节点，可查看节点受那些探针影响：

![probes](light-probe/node-probes.png)

## 烘焙光照探针

在编辑好光照探针后，可以选择 **项目** -> **光照烘焙** -> **光照探针** 打开 **光照探针** 的烘焙面板。

![bake panel](light-probe/bake-panel.png)

此时点击 **Bake Light Probe** 可以烘焙光照探针，点击 **Clear Result** 回清除烘焙的结果。

烘焙过程中可以点击 **Cancel** 取消烘焙。

![result](light-probe/result.png)

搭配 [光照贴图](../lightmap.md) 以获取更真实的光照效果。

![result](light-probe/probe.png)