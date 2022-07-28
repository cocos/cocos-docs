# 事件
在项目开发过程中用户会遇到很多依赖于XR组件的信号来触发的逻辑。为了方便用户专注于逻辑开发而不用关心两者之间的通知关系，Cocos XR基于传统的事件系统在一部分常被事件依赖的交互组件中封装好了一部分事件信号，用户只需要在特定的信号上绑定一系列想要触发的对象和方法即可。
## 事件信号
交互行为|事件信号|说明
:--|:--|:--
Hover|OnHoverEntered|Hover行为执行的时刻
||OnHoverExited|Hover行为退出的时刻
||OnHoverCanceled|Hover行为取消的时刻
Select|OnSelectEntered|Select行为执行的时刻
||OnSelectExited|Select行为退出的时刻
||OnSelectCanceled|Select行为取消的时刻
Active|OnActivated|激活的时刻
||OnDeactivated|取消激活的时刻

## 交互事件组件
组件名称|事件组|事件触发功能
:--|:--|:--
cc.InteractorEvents|AudioEvents|开启后可以绑定事件触发时播放的音频![](events/audio-event.png)
||HapticEvents|开启后可以绑定事件触发时控制器的震动反馈![](events/haptic-event.png)
||InteractorEvents|开启后可以绑定任意回调函数![](events/interactor-event.png)
cc.InteractableEvents||开启后可以绑定任意回调函数![](events/interactable-event.png)
