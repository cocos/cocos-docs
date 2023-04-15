# 版本历史

### v1.1.1

新增：

- 适配Cocos Creator 3.7.2。

### v1.1.0

新增：

- 新增AR应用开发模块，可发布AR应用至AREngine、ARCore、ARKit和Qualcomm Spaces平台，提供自动化行为编辑组件来支持快速创建和体验AR内容，支持开启设备追踪（AR Camera）/平面追踪 /图像追踪 /锚点 /Mesh等AR特性。
- 新增非缓冲式手柄控制器震动反馈，在cc.InteractorEvent的Haptic Event中选择想要开启震动的事件类型并调整震动参数。
- XRUI一键转换功能，传统2D UI可以一键转化为的带有空间属性的XR UI。
- 凝视交互器，根据头戴设备的注视中心位置进行交互行为。
- XR视频播放器，针对XR设备优化了视频渲染管线并支持切换展示窗口、180度、360度多风格的视频。可以满足用户在3D场景中浏览全景视频或动态材质的需要。
- XR内容预览新增无线串流方式，在Web浏览器中预览XR项目并同步所有来自XR设备的信号，无需打包应用至设备即可快速完整地体验所有XR项目内容。
- 屏幕手势交互器，使用屏幕手势操作AR虚拟对象。
- 新增Rokid Air设备支持手机作为3DOF空鼠的功能。

修复：

- Huawei VR Glass（6Dof套装）对6Dof输入的完整支持；
- Huawei VR Glass配套的6Dof手柄在触摸摇杆时也产生随机信号的处理问题；

### v1.0.1

- 支持发布XR应用至Rokid Air、HuaweiVR、Meta Quest/Quest2、Pico Neo3/Pico4、Monado五类设备。
- 提供设备映射、交互、虚拟移动、XR UI模块化组件支持XR内容创作。
- 支持使用Web浏览器预览XR内容，可用键鼠操作模拟头显和手柄控制器设备。