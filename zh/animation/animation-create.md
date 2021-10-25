# 创建动画组件和动画剪辑

在使用 **动画编辑器** 制作动画之前需要先在 **层级管理器** 或者 **场景编辑器** 中选择要添加动画的节点，然后添加 [动画组件](./animation-comp.md)，并在组件上挂载 **动画剪辑（Animation Clip）**，便可以编辑动画数据，编辑后的动画数据会保存在当前的动画剪辑中。没有挂载 Clip 的节点是无法编辑动画数据的。

如果当前选中节点没有动画组件，则 **动画编辑器** 的界面上会显示 **添加 Animation 组件** 按钮，点击即可在 **属性检查器** 上添加 **动画组件**。

![add component](./animation-create/add-component.png)

继续点击 **动画编辑器** 中的 **新建 AnimationClip 文件** 按钮并命名（例如 `animation`）：

![add clip](./animation-create/add-clip.png)

便可在 **资源管理器** 中自动创建一个动画剪辑（`animation.anim`）并挂载到 Animation 组件的 `DefaultClip` 属性上：

![mount clip](./animation-create/mount-clip.png)

以上简单介绍了如何在 **动画编辑器** 中创建动画组件和动画剪辑，更多关于动画组件的创建和属性说明请参考 [动画组件参考](./animation-comp.md)。更多创建动画剪辑的方法请参考文末部分的内容。

然后继续点击 **进入动画编辑模式** 即可开始 [编辑动画剪辑](edit-animation-clip.md)。新建的空的动画剪辑在动画编辑器中显示如下：

![empty clip](./animation-create/empty-clip.png)

## 挂载新动画剪辑

一个 Animation 组件可以挂载多份动画剪辑，若需要额外在已有动画剪辑的对象上创建并挂载新的动画剪辑，有以下几种方式：

1. 在 **资源管理器** 中点击左上方的 **+** 按钮，或者右键点击空白区域，然后选择 **Animation Clip**，这时候会在 **资源管理器** 中生成一个动画剪辑文件（默认名为 `animation`）。

    然后在 **层级管理器** 中选中对应节点，在 **属性检查器** 中找到 Animation 组件（`cc.Animation`），修改 `Clips` 属性的数值。例如原本只挂载了一个 clip 文件，现在想要再添加一个，那么就将原本的 **1** 改成 **2**。

    ![add-clip](./animation-create/add-new-clip.png)

    最后将刚刚在 **资源管理器** 中创建的动画剪辑，拖拽到上图中的 `cc.AnimationClip` 选择框中即可。

2. 在 **属性检查器** 中找到 Animation 组件（`cc.Animation`），修改 `Clips` 属性的数值。

    然后点击新出现的空的 `cc.AnimationClip` 选择框后面的查找按钮，在弹出的搜索窗口中点击右上方的 **创建** 按钮，即可自动在 **资源管理器** 中创建动画剪辑并挂载到 `cc.AnimationClip` 选择框中。

    ![add-clip](./animation-create/add-new-clip2.png)

3. 通过脚本动态创建动画剪辑，详情请参考 [程序化编辑动画剪辑](use-animation-curve.md)。

可以在 **动画编辑器** 左上角的 **Clips** 下拉列表切换需要编辑的动画剪辑。
