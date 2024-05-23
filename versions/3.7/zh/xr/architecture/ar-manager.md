# AR Manager

Cocos CreatorXR 的 AR 模块提供了一个全局管理器，用于收集当前项目使用到的 AR 特性并进行管理，特性管理器中每个特性的属性都是全局属性，调整参数会修改设备相关的或者项目全局的功能。cc.ARManager 默认挂载在 XR Agent 节点上，当您创建 AR 自动化行为节点时，ARManager 会收集此节点到其对应的特性列表中，方便后续管理和维护所有特性节点。

当前版本针对以支持的 AR 特性提供了对应的全局功能属性：

## 平面追踪特性

当您在场景中创建一个或多个 Plane Tracking 节点，AR Manager 中的 Configuration 会新增 Plane Feature 属性。您可以调整特性下的各项参数，或定位到对应的特性节点。

![plane-tracking-node](ar-manager/plane-tracking-node.png)

<img src="./ar-manager/plane-feature-manager.png" alt="plane-feature-manager" style="zoom:50%;" />

Direction Type 汇集了当前场景所有平面代理需要识别的平面朝向。

Tracking Visualizer 给所有平面代理创建默认的可视化模型。

Tracking Quality Condition 表示当前可追踪的平面代理的最差质量，当稳定性质量小于此值时，平面不被可视化。

Use Plane Shape 开启后可视化效果会根据现实环境中平面的真实物理性状使用多边形绘制，关闭后则使用四边形绘制代替。

Unsupported Event 会在设备不支持平面追踪时触发，用户可以根据需求添加事件。

## 图像追踪特性

当您在场景中创建一个或多个 Image Tracking 节点，AR Manager 中的 Configuration 会新增 Image Feature 属性。您可以调整特性下的各项参数，或定位到对应的特性节点。

![image-feature-node](ar-manager/image-feature-node.png)

<img src="./ar-manager/image-feature-manager.png" alt="image-feature-manager" style="zoom:50%;" />

Max Tracking Number 表示当前镜头内可同时追踪图片的最大数量，可以根据需要动态修改此值。

注：Max Tracking Number 的上限根据设备平台会有差异，目前已知

- ARCore 平台可同时追踪最多 20 张图，单图像库存最多 1000 张。
- ARKit 平台可同时追踪最多 4 张图，单图像库最多 100张。
- AREngine 平台可同时追踪最多 1 张图。

Unsupported Event 会在设备不支持图像追踪时触发，用户可以根据需求添加事件。

## 网格化特性（实验性）

当您在场景中创建一个或多个 Meshing 节点，AR Manager 中的 Configuration 会新增 Meshing Feature 属性。由于 Meshing 功能处于实验性阶段且支持环境重构的设备硬件要求较高，暂不支持对此做特性做参数控制。

<img src="./ar-manager/meshing-manager.png" alt="meshing-manager" style="zoom:50%;" />

Normals 默认开启，可以根据 Mesh 信息获取法线向量。

## APIs

AR Manager 还提供了控制特性开关以及特性可视化开关的接口：

```typescript
public enableFeatureTracking (type: ARTrackingType, enable: boolean);
public showAllVisualizer (type: ARTrackingType);
public hideAllVisualizer (type: ARTrackingType);
```
