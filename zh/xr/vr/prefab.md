# XR 预制
在Cocos扩展管理器中开启了xr-plugin之后就可以允许在编辑器中使用传统创建对象的方式创建XR对象。在**层级管理器**右键选择**创建**，选择**XR**分类，右侧会出现当前可以创建的所有XR预制体。选择想要实例化生成的对象即可在场景中创建出来。

![](prefab/prefab.png)

- 预制体的结构说明

  名称|说明|包含组件|
  :--|:--|:--
  XR Agent|现实世界主角相关的信息在虚拟场景中的代理节点，同时具有用于控制虚拟世界中XR主角的生命周期的功能。|cc.TrackingOrigin
  XR HMD|头戴显示器设备在虚拟世界中的抽象节点，基于Camera对象进行改造生成，用于同步现实世界中头戴显示器的输入信号并将引擎渲染结果输出至设备。|cc.Camera <br>cc.AudioSource <br>cc.HMDCtrl <br>cc.MRSight <br>cc.PoseTracker <br>cc.TargetEye
  Ray Interactor|用于进行远距离交互的射线交互器，包含对XR设备手柄控制器的I/O映射以及射线交互功能。|cc.PoseTracker<br>cc.XRController<br>cc.RayInteractor<br>cc.Line
  Direct Interactor|用于进行近距离直接交互的交互器，同时也包含了对XR设备手柄控制器的I/O映射以及交互功能|cc.PoseTracker<br>cc.XRController<br>cc.DirectInteractor
  Locomotion Checker|运动检查器，充当所有虚拟运动驱动访问XR Agent的仲裁者，可以保证固定时间内对唯一的运动状态的维持。|cc.LocomotionChecker
  Teleportable|支持与交互器发生传送交互行为的交互物，可以传送XR Agent到此对象相关的一个位置。|cc.Teleportable <br>cc.InteractableEvents
  Simple Interactable|简易的交互物对象，用户可以在此对象上自定义扩展任意的交互行为|cc.InteractableEvents
  Grab Interactable|支持与交互器发生抓取行为的交互物|cc.RigidBody<br>cc.GrabInteractable<br>cc.InteractableEvents

开启XR的扩展后，在内置资源文件夹中会新增XR预制体、材质、模型等资源，可供用户直接使用。具体位置如下图所示。
- 预制体资源

  ![](prefab/default_prefabs_xr.png)
- 材质资源

  ![](prefab/default_material_xr.png)
- 模型资源

  ![](prefab/default_model_xr.png)

