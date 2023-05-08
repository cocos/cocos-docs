# 版本历史

## V1.2.0

新增：

- iOS支持基础模式光照估计，华为安卓平台支持基础和HDR模式光照估计。
- 支持将XR应用构建发布至WebXR平台，会话支持inline、immersive-vr、immersive-ar三种模式。
- 屏幕手势交互器新增行为控制功能，可自由选择控制交互物的手势行为。
- 屏幕手势交互器组件放置功能新增放置位置的计算方式，可以基于屏幕交互器固定距离来放置内容。
- 新增合成层（Composition Layer）功能，支持Overlay、Underlay两种渲染方式。
- 新增透视（Pass Through）功能，支持OpenXR标准接口开启一体机视频透视功能，配合合成层可调整透视视频流的渲染方式（Overlay/Underlay）。
- 新增XR Web Preview功能，支持在一体机端浏览web内容。
- XR视频播放器支持解析播放3D视频资源。
- 支持空间音频，允许从各个方向渲染音频，模拟声音在物理世界中的表现，增加沉浸感。
- 新增静态注视点渲染（FFR）调节，支持使用OpenXR标准接口开启FFR并调节渲染等级。
- Snapdragon Spaces SDK支持更新到0.11.1，并新增 RGB Camera 、Meshing 特性的支持。

修复：

- 屏幕手势交互的效果优化。
- 华为VR Glass的手柄震动时间0无效问题。
- 转换AR Camera报错问题修复。

## v1.1.1

新增：

- 适配 Cocos Creator 3.7.2。

## v1.1.0

新增：

- 新增 AR 应用开发模块，可发布 AR 应用至 AREngine、ARCore、ARKit 和 Qualcomm Spaces 平台，提供自动化行为编辑组件来支持快速创建和体验 AR 内容，支持开启设备追踪（AR Camera）/平面追踪/图像追踪/锚点/Mesh 等 AR 特性。
- 新增非缓冲式手柄控制器震动反馈，在 cc.InteractorEvent 的 Haptic Event 中选择想要开启震动的事件类型并调整震动参数。
- XRUI 一键转换功能，传统 2D UI 可以一键转化为的带有空间属性的 XR UI。
- 凝视交互器，根据头戴设备的注视中心位置进行交互行为。
- XR 视频播放器，针对 XR 设备优化了视频渲染管线并支持切换展示窗口、180度、360度多风格的视频。可以满足用户在 3D 场景中浏览全景视频或动态材质的需要。
- XR 内容预览新增无线串流方式，在 Web 浏览器中预览 XR 项目并同步所有来自 XR 设备的信号，无需打包应用至设备即可快速完整地体验所有 XR 项目内容。
- 屏幕手势交互器，使用屏幕手势操作 AR 虚拟对象。
- 新增 Rokid Air 设备支持手机作为 3DOF 空鼠的功能。

修复：

- Huawei VR Glass（6Dof套装）对 6Dof 输入的完整支持；
- Huawei VR Glass配套的 6Dof 手柄在触摸摇杆时也产生随机信号的处理问题；

## v1.0.1

- 支持发布 XR 应用至 Rokid Air、HuaweiVR、Meta Quest/Quest2、Pico Neo3/Pico4、Monado 五类设备。
- 提供设备映射、交互、虚拟移动、XR UI 模块化组件支持 XR 内容创作。
- 支持使用 Web 浏览器预览 XR 内容，可用键鼠操作模拟头显和手柄控制器设备。
