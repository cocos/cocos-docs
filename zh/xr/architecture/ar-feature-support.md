# 支持的平台 AR 特性

当前版本 AR 插件支持以下几种 AR 特性。

| AR 特性         | 描述                                                         |
| :-------------- | :----------------------------------------------------------- |
| AR Session      | 在目标平台上启用、禁用和配置 AR Session，以控制 AR 应用的生命周期。 |
| Device Tracking | 跟踪设备在物理空间中的位移和旋转。                           |
| AR Camera       | 渲染设备相机传输的视频流背景图像并可以根据环境进行光照估计。 |
| Plane Tracking  | 检测和跟踪物理世界中的平面。                                 |
| Image Tracking  | 检测和跟踪物理世界中的图像。                                 |
| Hit Detection   | 支持使用射线（Ray cast）与跟踪实体进行命中检测。             |
| Anchors         | 跟踪场景空间中的固定点。                                     |
| Meshing         | 将物理世界网格化。                                           |
| Light Estimate  | 光照估计。                                                   |

Cocos CreatorXR v1.1.0 对各平台的AR特性支持如下：

| AR 特性\平台    | ARKit | ARCore | AREngine | Spaces |
| :-------------- | :---- | :----- | :------- | :----- |
| AR Session      | ✓     | ✓      | ✓        | ✓      |
| Device Tracking | ✓     | ✓      | ✓        | ✓      |
| AR Camera       | ✓     | ✓      | ✓        | ✓      |
| Plane Tracking  | ✓     | ✓      | ✓        | ✓      |
| Image Tracking  | ✓     | ✓      | ✓        | ✓      |
| Hit Detection   | ✓     | ✓      | ✓        |        |
| Anchors         | ✓     | ✓      | ✓        |        |
| Meshing         | ✓     |        |          |        |
| Light Estimate  |       | ✓      | ✓        |        |
