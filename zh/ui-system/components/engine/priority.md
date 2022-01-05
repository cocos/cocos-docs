# 渲染排序说明

## 2D 渲染节点排序

2D 渲染节点可分为在 Canvas 下的节点和不在 Canvas 下的节点两种：

- 在 Canvas 下的节点可参考下文 **UI 节点排序** 部分的内容。

- 不在 Canvas 下的节点，用户可选择通过 [自定义材质](ui-material.md) 来开启深度检测实现和 3D 物体的遮挡显示，开启后会按照物体的 Z 轴坐标进行遮挡渲染（可参考范例 **2d-rendering-in-3d**（[GitHub](https://github.com/cocos-creator/test-cases-3d/tree/v3.0/assets/cases/2d-rendering-in-3d) | [Gitee](https://gitee.com/mirrors_cocos-creator/test-cases-3d/tree/v3.0/assets/cases/2d-rendering-in-3d)）。<br>若未开启深度检测，则数据提交依旧会按照节点树顺序提交，也就意味着节点树靠下的节点会后渲染。

## UI 节点排序

UI 节点特指在 Canvas 节点下的 UI 节点，这些节点并未开启深度测试，所以节点的混合是严格按照节点树进行排序的。UI 的渲染排序采用的是一个深度优先的排序方式，每一个 UITransform 组件身上都有一个 priority 属性，根据 priority 的值来调整节点顺序。排序从根节点下的子节点开始，根据子节点的优先级来确定整体的渲染结构，也就是根节点下的子节点的排序已经决定了最终的渲染顺序。每一个节点下的所有子节点的 priority 则用来确定在当前节点下的渲染顺序。直接修改了 priority 也会直接改变节点树顺序。

举个例子：

![priority.png](priority/priority.png)

因此，上图中整体的渲染顺序则是：**B -> b1 -> C -> A -> a1 -> a2**，在屏幕上的呈现状态为：**a2 -> a1 -> A -> C -> b1 -> B**。

## 注意事项

排序是一个很简单的功能，但是最终的呈现却是根据不同平台提供的渲染能力来的。因此，在这里说明一下，如果遇到了 UI 渲染出错，花屏，闪屏等现象，首先要检查的就是场景里所有相机（Camera 和 Canvas）的 **ClearFlag**，确保 **场景里必须有一个相机要执行 Solid_Color 清屏操作**。

具体如何设置 **ClearFlag**，可参考以下几种情况：

- 用于 3D 场景渲染的摄像机，请确保第一个渲染的摄像机是 `Solid_Color`，其余摄像机可以根据项目需求决定 [ClearFlags](../../../editor/components/camera-component.md#%E7%9B%B8%E6%9C%BA%E7%BB%84%E4%BB%B6) 属性。
- 用于 UI渲染（Canvas 内）的摄像机，需要将属性设置为 `Depth_Only`。
- 如果某个摄像机的设置了 [targetTexture](../../../editor/components/camera-component.md#%E7%9B%B8%E6%9C%BA%E7%BB%84%E4%BB%B6) 属性，请设置为 `Solid_Color`。
- 如果场景中只有一个 UI Canvas 或者 3D Camera，那么 **ClearFlag** 属性设置为 `Solid_Color`

![sort](./priority/sort.png)
