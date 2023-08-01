# 渲染排序说明

## 2D 渲染节点排序

2D 渲染节点可分为在 Canvas 下的节点和不在 Canvas 下的节点两种：

- 在 Canvas 下的节点可参考下文 **UI 节点排序** 部分的内容。

- 不在 Canvas 下的节点，用户可选择通过 [自定义材质](ui-material.md) 来开启深度检测实现和 3D 物体的遮挡显示，开启后会按照物体的 Z 轴坐标进行遮挡渲染（可参考范例 **2d-rendering-in-3d**（[GitHub](https://github.com/cocos/cocos-test-projects/tree/v3.8/assets/cases/2D) | [Gitee](https://gitee.com/mirrors_cocos-creator/test-cases-3d/tree/v3.8/assets/cases/2d-rendering-in-3d)）。

## UI 节点排序

UI 节点特指在 Canvas 节点下的 UI 节点，节点的混合是严格按照节点树进行排序的。UI 的渲染排序采用的是一个深度优先的排序方式，节点树的排序方式即为最终渲染数据提交的顺序。所以用户可以通过设置节点的 siblingIndex 来改变节点在父节点下的顺序，从而改变渲染顺序。

举个例子：

![priority.png](priority/priority.png)

上图中整体的渲染顺序则是：**A -> a1 -> a2 -> B -> b1 -> C**，在屏幕上的呈现状态为：**C -> b1 -> B -> a2 -> a1 -> A** 即 **从上往下**。

setSiblingIndex 的使用说明：此操作是用于变更当前节点在父节点 children 数组中的位置，如果通过脚本在运行时设置，则变更过后的节点树数据不会被序列化。传入的参数如果大于 children 数组的长度，则会设置到数组最后，如果在范围内，则会插入到对应的位置上。所以此操作和节点树的状态实时相关，用户需要知道节点树当前的状态并进行操作才能得到预期的效果。

## 注意事项

排序是一个很简单的功能，但是最终的呈现却是根据不同平台提供的渲染能力来的。因此，在这里说明一下，如果遇到了 UI 渲染出错，花屏，闪屏等现象，首先要检查的就是场景里所有相机（Camera 和 Canvas）的 **ClearFlag**，确保 **场景里必须有一个相机要执行 Solid_Color 清屏操作**。

具体如何设置 **ClearFlag**，可参考以下几种情况：

- 如果场景中只有一个 UI Canvas 或者 3D Camera，那么 **ClearFlag** 属性设置为 `Solid_Color`。
- 如果场景中包含 2D 背景层、3D 场景层、 2D UI 层，则：
    - 2D 背景层：**ClearFlag** 属性设置为 `Solid_Color`。
    - 3D 场景层：**ClearFlag** 属性设置为 `Depth_Only`。
    - 2D UI 层：若有模型，**ClearFlag** 属性设置为 `Depth_Only` 以避免出现模型闪屏或者穿透的情况。若没有模型，**ClearFlag** 属性可设置为 `Dont_Clear` 或 `Depth_Only`。

  ![sort](./priority/sort.png)
