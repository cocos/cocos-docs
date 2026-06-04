# XR 合成层

在 XR 应用开发中，合成层（Composition Layer）是一种常用的技术，通常应用在混合现实场景，将虚拟现实场景和真实世界场景进行混合，合成层将根据用户设定的 layer 深度将不同的 layer 分别渲染到不同的图层中，然后将这些图层进行合成，形成一个完整的XR场景。同时，通过调整图层的透明度和深度，能达到虚拟对象与真实世界对象完美融合的效果。Composition Layer 技术可以实现高质量的XR渲染效果，为 XR 应用的开发和体验提供了很大的帮助和支持。

## 合成层功能

| 属性             | 说明                                                         |
| ---------------- | ------------------------------------------------------------ |
| Layer Setting    | 合成层效果设置。                                             |
| --Type           | 合成层的类型： Overlay：将纹理呈现在 Eye Buffer 前面。 Underlay：将纹理呈现在 Eye Buffer 后面。 |
| --Shape          | 提供两种种形状的合成层： <br />Quad：具有四个顶点的平面纹理，通常用来显示场景中的文本或信息。<br /> Cylinder具有柱面弧度的圆柱形纹理，通常用于显示曲面 UI 界面。 |
| --Redius         | 选择 Cylinder 时出现此项，设置曲面半径。                     |
| --CentralAngle   | 选择 Cylinder 时出现此项，设置中心角大小。                   |
| --Depth          | 定义合成层在场景中的顺序。数值越小，越靠近 Eye Buffer。      |
| TextureSetting   | 材质效果设置。                                               |
| --Texture Type   | 设置纹理类型：<br /> Static：若需要渲染静态内容，需使用静态纹理。<br /> Dynamic：若要将动态内容渲染至该合成层，即为合成层每帧更新纹理，则需要使用动态纹理。例如使用普通摄像机生成的 RenderTexture 图像。 |
| --Static Texture | 绑定静态纹理资源。                                           |
| --Camera         | 用于绑定合成层要获取动态纹理的相机。                         |
| --Width          | 设置相机 RT 的宽。                                           |
| --Height         | 设置相机 RT 的高。                                           |

> **注意**：
> 1. 合成层功能对接 OpenXR 的核心 API 扩展，适用于所有对接 OpenXR 标准的设备。
> 2. 必须将摄像机放置在圆柱内切球内。如果摄像机接近内切球表面，合成层将显示异常。

## 使用合成层

目前合成层功能可以渲染动态纹理，主要应用于渲染 Camera 所采集的画面。

以下案例实现一个 Overlay 表现的镜子对象，可以反射 XR 角色的动作表现。

### 配置步骤

先在场景中创建完整的 XR 代理节点用于设备追踪。并绑定简单的头显/手柄模型。

![](xr-composition-layer/create-xr-actor.png)

场景中添加任意节点，以空节点为例。为其添加合成层组件，在属性检查器面板点击添加组件，找到 **XR > Extra > XRCompositionLayer**，添加组件。

<img src="./xr-composition-layer/add-empty-node.png" style="zoom:50%;" />

<img src="./xr-composition-layer/add-composition-comp.png" alt="add-composition-comp" style="zoom:50%;" />

在场景中创建一个 Camera 节点，并将其位置、朝向调整为需要的表现。

<img src="./xr-composition-layer/add-camera.png" style="zoom:50%;" />

![](xr-composition-layer/change-camera-pos.png)

将 Camera 的 Clear Flags 设置为 SOLID_COLOR，并将 Clear Color 的透明度设置为 0。

<img src="./xr-composition-layer/set-clear-flags.png" style="zoom:50%;" />

将此 Camera 节点挂载到 Node 身上添加的 cc.XRCompositionLayer 组件的 Camera 属性中。并调整其渲染分辨率、Scale 大小和位置，尽量保证 Scale 的长宽比和渲染分辨率的长宽比相同，否则画面会出现拉伸。Layer Setting 的 Type 选为Overlay，Shape选为Quad。

<img src="./xr-composition-layer/config-compositionlayer.png"  style="zoom:50%;" />

打包后效果如下：

![overlay-effect](xr-composition-layer/overlay-effect.gif)

> **注意**：使用合成层功能需要扩展版本 **>=1.2.0**，编辑器版本 **>=3.7.3**。纹理类型的设置需要扩展版本 **>=1.2.1**，编辑器版本 **>=3.8.0**。

