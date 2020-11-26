# 渲染排序说明

## UI 节点排序

UI 的渲染排序采用的是一个广度优先的排序方式，每一个 UITransform 组件身上都有一个 priority 属性，根据 priority 的值来调整节点顺序。排序从根节点下的子节点开始，根据子节点的优先级来确定整体的渲染结构，也就是根节点下的子节点的排序已经决定了最终的渲染顺序。每一个节点下的所有子节点的 priority 则用来确定在当前节点下的渲染顺序。

举个例子：

![priority.png](priority/priority.png)

因此，上图中整体的渲染顺序则是：**B -> b1 -> C -> A -> a1 -> a2**，在屏幕上的呈现状态为：**a2 -> a1 -> A -> C -> b1 -> B**。

## 相机混合排序

UI 相机在最初设计的时候优先级是最高的，也就是所有的 3D 内容绘制完之后 UI 相机内容才开始绘制。但是，这样就会导致一个问题，UI 相机一旦有了背景之类的，就会把 3D 的内容覆盖掉。因此，相机间的混排功能必不可少。

UI 相机与 3D 相机混排的关键因素是在 UI 相机这里。因此，我们在 UI 的根节点，也就是 Canvas 节点上的 Canvas 组件提供了一个叫 `RenderMode` 属性用来区别排序方式。接下来说一下 `RenderMode` 选项的作用：

1. 当选择模式是 `OVERLAY`，则代表 UI 相机始终会往 3D 相机后排，也就是 **始终会覆盖在 3D 相机的渲染内容之上**。多个 UI 相机选择此模式，可以通过属性 `Priority` 来进行 UI 相机之间排序。

    ![overlay](./priority/overlay.png)

2. 当选择模式是 `INTERSPERSE`，则代表此时它可以与 3D 相机进行混排，UI、3D 相机之间的排序方式也是分别通过设置 Canvas/Camera 组件上的 `Priority`。

    ![intersperse](./priority/intersperse.png)

### 注意事项

排序是一个很简单的功能，但是最终的呈现却是根据不同平台提供的渲染能力来的。因此，在这里说明一下，如果遇到了 UI 渲染出错，花屏，闪屏等现象，首先要检查的就是场景里所有相机（Camera 和 Canvas）的 **ClearFlag**，确保 **场景里必须有一个相机要执行 Solid_Color 清屏操作**。

具体如何设置 **ClearFlag**，可参考以下几种情况：

- 如果场景中只有一个 UI Canvas 或者 3D Camera，那么 **ClearFlag** 属性设置为 `Solid_Color`。
- 如果场景中包含 UI 背景层、3D 场景层、 UI 操作层，则：
  - 2D 背景层：**ClearFlag** 属性设置为 `Solid_Color`。
  - 3D 场景层：**ClearFlag** 属性设置为 `Depth_Only`。
  - 2D UI 层：若有模型，**ClearFlag** 属性设置为 `Depth_Only` 以避免出现模型闪屏或者穿透的情况。若没有模型，**ClearFlag** 属性可设置为 `Dont_Clear` 或 `Depth_Only`。

  ![sort](./priority/sort.png)
