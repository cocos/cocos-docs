# Canvas（画布）组件参考

![](canvas/canvas.png)

**RenderRoot2D** 组件所在的节点是 2D 渲染组件数据收集的入口，而 **Canvas（画布）** 组件继承自 **RenderRoot2D** 组件，所以 **Canvas** 组件也是数据收集入口。场景中 Canvas 节点可以有多个，**所有 2D 渲染元素都必须作为 RenderRoot2D 的子节点才能被渲染**。

Canvas 节点除了继承自 RenderRoot2D 的数据入口能力，其本身还作为屏幕适配的重要组件，在游戏制作上面对多分辨率适配也起到关键作用，具体请参考 [多分辨率适配方案](../engine/multi-resolution.md)。Canvas 的设计分辨率和适配方案统一通过 **项目设置** 配置。

![](canvas/design-resolution.png)

Canvas 本身和相机并无关系，其更主要的作用是上文叙述的屏幕适配，所以 Canvas 的渲染只取决于和其节点 layer 对应的 camera。所以可以通过控制 camera 的属性来决定 Canvas 下节点的渲染效果。

## Canvas 属性

| 属性           | 功能说明                                                 |
| :------------- | :----------                                            |
| CameraComponent     | Canvas 关联的相机，此相机不一定会渲染 Canvas 下内容，可以与 AlignCanvasWithScreen 属性配合自动改变 Camera 的一些参数使其与 Canvas 对齐
| AlignCanvasWithScreen | Canvas 关联的相机是否要与 Canvas 对齐，如果想要自己控制相机位置请勿勾选此选项（卷轴游戏等）

## 注意事项

如果遇到 UI 渲染出错、花屏、闪屏等现象，请参考 [注意事项](../engine/priority.md#注意事项)。
